import { Injectable, signal } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { Repository } from '../models/repository.model';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private readonly sessionStorageKey = 'bookmarks';
  private readonly bookmarksSignal = signal<Repository[]>([]);
  // Add subject here to deal with removing a bookmark.
  // Everytime we remove a repository from bookmarks, .next(repoId) on the remove method
  // The repo directive should then subscribe to this observable and check which item changed
  private bookmarkRemovedSubject = new Subject<Repository>();

  readonly bookmarks = this.bookmarksSignal.asReadonly();
  readonly bookmarkRemoved$ = this.bookmarkRemovedSubject.asObservable();

  constructor(private readonly sessionStorage: SessionStorageService) {}

  addBookmark(repository: Repository): void {
    this.bookmarksSignal.update((bookmarks) => [...bookmarks, repository]);
  }

  removeBookmark(repository: Repository): void {
    this.bookmarksSignal.update((bookmarks) =>
      bookmarks.filter((repo) => repo.id !== repository.id)
    );

    this.bookmarkRemovedSubject.next(repository);
  }

  isBookmark(repoId: number): boolean {
    return (
      this.bookmarksSignal().find((item) => item.id === repoId) !== undefined
    );
  }

  saveBookmarks(): void {
    this.sessionStorage.store(this.sessionStorageKey, this.bookmarksSignal());
  }
}
