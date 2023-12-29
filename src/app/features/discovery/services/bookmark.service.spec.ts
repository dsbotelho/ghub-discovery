import { TestBed, waitForAsync } from '@angular/core/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { Repository } from '../models/repository.model';
import { BookmarkService } from './bookmark.service';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let sessionStorage: SessionStorageService;

  const repository: Repository = {
    id: 1,
    description: 'description',
    forks: 10,
    full_name: 'name',
    isBookmark: false,
    stargazers_count: 10,
    topics: [],
    updated_at: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService],
    });

    sessionStorage = TestBed.inject(SessionStorageService);
    jest.spyOn(sessionStorage, 'retrieve').mockReturnValue([]);
    service = TestBed.inject(BookmarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.bookmarks()).toEqual([]);
  });

  it('should add a bookmark', () => {
    service.addBookmark(repository);
    expect(service.bookmarks()).toEqual([repository]);
  });

  it('should remove a bookmark', waitForAsync(() => {
    service.addBookmark(repository);

    service.bookmarkRemoved$.subscribe((item) => {
      expect(item).toEqual(repository);
    });

    service.removeBookmark(repository);
    expect(service.bookmarks()).toEqual([]);
  }));

  it('should check if repository is a bookmark', () => {
    const invalidId = -1;
    service.addBookmark(repository);

    expect(service.isBookmark(repository.id)).toBeTruthy();
    expect(service.isBookmark(invalidId)).toBeFalsy();
  });

  it('should save bookmarks to the session storage', () => {
    jest.spyOn(sessionStorage, 'store').mockImplementation(jest.fn());

    service.saveBookmarks();
    expect(sessionStorage.store).toHaveBeenCalledWith('bookmarks', []);
  });
});
