import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { RepositoryContainerComponent } from '../components/repo-container/repo-container.component';
import { Repository } from '../models/repository.model';
import { BookmarkService } from '../services/bookmark.service';
import { BookmarkConfigDirective } from './bookmark-config.directive';

describe('BookmarkConfigDirective', () => {
  let directive: BookmarkConfigDirective;
  let bookmarkService: BookmarkService;
  let component: RepositoryContainerComponent;
  let fixture: ComponentFixture<RepositoryContainerComponent>;

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
      declarations: [BookmarkConfigDirective, RepositoryContainerComponent],
      providers: [SessionStorageService],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });

    bookmarkService = TestBed.inject(BookmarkService);
    fixture = TestBed.createComponent(RepositoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    directive = new BookmarkConfigDirective(bookmarkService, component);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(directive.bookmarksTitle).toEqual('My Bookmarks');
  });

  it('should set bookmark data', () => {
    directive.bookmarkData = [repository];
    expect(component._repositoryData).toEqual([repository]);
  });

  it('should handle on init', waitForAsync(() => {
    jest.spyOn(bookmarkService, 'removeBookmark').mockImplementation(jest.fn());

    directive.ngOnInit();
    expect(component.title).toEqual(directive.bookmarksTitle);
    component.bookmarkChanged.subscribe((item) => {
      expect(bookmarkService.removeBookmark).toHaveBeenCalledWith(repository);
    });

    component.bookmarkChanged.emit(repository);
  }));

  it('should handle on destroy', () => {
    jest.spyOn(bookmarkService, 'saveBookmarks').mockImplementation(jest.fn());

    directive.ngOnDestroy();
    expect(bookmarkService.saveBookmarks).toHaveBeenCalled();
  });
});
