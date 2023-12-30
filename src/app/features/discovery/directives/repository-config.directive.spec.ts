import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { RepositoryContainerComponent } from '../components/repo-container/repo-container.component';
import { Repository } from '../models/repository.model';
import { GithubHttpService } from '../services/api/github-http.service';
import { BookmarkService } from '../services/bookmark.service';
import { RepositoryConfigDirective } from './repository-config.directive';

describe('RepositoryConfigDirective', () => {
  let directive: RepositoryConfigDirective;
  let gitHubHttpService: GithubHttpService;
  let bookmarkService: BookmarkService;
  let component: RepositoryContainerComponent;
  let fixture: ComponentFixture<RepositoryContainerComponent>;
  let sessionStorage: SessionStorageService;

  const language = 'language';
  const repository: Repository = {
    description: 'description',
    forks: 10,
    id: 1,
    full_name: 'name',
    isBookmark: false,
    html_url: '',
    watchers_count: 10,
    stargazers_count: 10,
    topics: [],
    updated_at: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryConfigDirective, RepositoryContainerComponent],
      providers: [
        SessionStorageService,
        { provide: 'WEB_API_URL', useValue: '' },
      ],
      imports: [HttpClientTestingModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });

    sessionStorage = TestBed.inject(SessionStorageService);
    jest.spyOn(sessionStorage, 'retrieve').mockReturnValue([]);
    gitHubHttpService = TestBed.inject(GithubHttpService);
    bookmarkService = TestBed.inject(BookmarkService);
    fixture = TestBed.createComponent(RepositoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    directive = new RepositoryConfigDirective(
      fixture.componentInstance,
      gitHubHttpService,
      bookmarkService
    );

    directive.language = language;
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
    expect(directive.requestData).toEqual({
      per_page: 10,
      page: 1,
      order: undefined,
      filter: {
        stars: 1000,
        language: undefined,
      },
    });
  });

  it('should handle on init', () => {
    jest.spyOn(directive, 'loadData').mockImplementation(jest.fn());
    jest.spyOn(directive, 'setupBookmarkChanged').mockImplementation(jest.fn());
    jest.spyOn(directive, 'setupBookmarkDeleted').mockImplementation(jest.fn());
    jest.spyOn(directive, 'setupLoadClicked').mockImplementation(jest.fn());

    directive.ngOnInit();
    expect(component.showLoadButton).toBeTruthy();
    expect(directive.requestData.filter).toEqual({
      language,
      stars: 1000,
    });
    expect(directive.loadData).toHaveBeenCalled();
    expect(directive.setupBookmarkChanged).toHaveBeenCalled();
    expect(directive.setupBookmarkDeleted).toHaveBeenCalled();
    expect(directive.setupLoadClicked).toHaveBeenCalled();
  });

  it('should load data', waitForAsync(() => {
    jest
      .spyOn(gitHubHttpService, 'getRepoListByLanguage$')
      .mockReturnValue(of([repository]));

    directive.loadData();
    gitHubHttpService
      .getRepoListByLanguage$(directive.requestData)
      .subscribe((item) => {
        expect(item).toBeDefined();
        expect(directive.data).toEqual(item ?? []);
        expect(component._repositoryData).toEqual(item ?? []);
      });
  }));

  it('should handle bookmark changes when repository is not in bookmarks', waitForAsync(() => {
    directive.data = [repository];
    jest.spyOn(bookmarkService, 'isBookmark').mockReturnValue(false);
    jest.spyOn(bookmarkService, 'addBookmark').mockImplementation(jest.fn());

    directive.setupBookmarkChanged();
    component.bookmarkChanged.subscribe((item) => {
      expect(bookmarkService.isBookmark).toHaveBeenCalledWith(repository.id);
      expect(bookmarkService.addBookmark).toHaveBeenCalledWith({
        ...repository,
        isBookmark: true,
      });
      expect(directive.data).toEqual([
        {
          ...repository,
          isBookmark: true,
        },
      ]);
    });

    component.bookmarkChanged.emit(repository);
  }));

  it('should handle bookmark changes when repository is in bookmarks', waitForAsync(() => {
    directive.data = [repository];
    jest.spyOn(bookmarkService, 'isBookmark').mockReturnValue(true);
    jest.spyOn(bookmarkService, 'removeBookmark').mockImplementation(jest.fn());

    directive.setupBookmarkChanged();
    component.bookmarkChanged.subscribe((item) => {
      expect(bookmarkService.isBookmark).toHaveBeenCalledWith(repository.id);
      expect(bookmarkService.removeBookmark).toHaveBeenCalledWith(repository);
      expect(directive.data).toEqual([repository]);
    });

    component.bookmarkChanged.emit(repository);
  }));

  it('should setup bookmark deleted', waitForAsync(() => {
    jest.spyOn(sessionStorage, 'store').mockImplementation(jest.fn());
    directive.data = [{ ...repository, isBookmark: true }];

    directive.setupBookmarkDeleted();
    bookmarkService.bookmarkRemoved$.subscribe(() =>
      expect(directive.data).toEqual([repository])
    );

    bookmarkService.removeBookmark({ ...repository, isBookmark: false });
  }));

  it('should setup load clicked', waitForAsync(() => {
    jest.spyOn(directive, 'loadData').mockImplementation(jest.fn());

    directive.setupLoadClicked();
    component.loadClicked.subscribe(() => {
      expect(directive.requestData).toEqual({
        ...directive.requestData,
        page: 2,
      });
      expect(directive.loadData).toHaveBeenCalled();
    });

    component.loadClicked.emit();
  }));
});
