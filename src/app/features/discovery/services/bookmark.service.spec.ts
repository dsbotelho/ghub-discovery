import { TestBed, waitForAsync } from '@angular/core/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { Repository } from '../models/repository.model';
import { BookmarkService } from './bookmark.service';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let sessionStorage: SessionStorageService;

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
    jest.spyOn(sessionStorage, 'store').mockImplementation(jest.fn());

    service.addBookmark(repository);
    expect(service.bookmarks()).toEqual([repository]);
    expect(sessionStorage.store).toHaveBeenCalledWith('bookmarks', [
      repository,
    ]);
  });

  it('should remove a bookmark', waitForAsync(() => {
    jest.spyOn(sessionStorage, 'store').mockImplementation(jest.fn());
    service.addBookmark(repository);

    service.bookmarkRemoved$.subscribe((item) => {
      expect(item).toEqual(repository);
    });

    service.removeBookmark(repository);
    expect(service.bookmarks()).toEqual([]);
    expect(sessionStorage.store).toHaveBeenCalledWith('bookmarks', []);
  }));

  it('should check if repository is a bookmark', () => {
    jest.spyOn(sessionStorage, 'store').mockImplementation(jest.fn());
    const invalidId = -1;
    service.addBookmark(repository);

    expect(service.isBookmark(repository.id)).toBeTruthy();
    expect(service.isBookmark(invalidId)).toBeFalsy();
  });
});
