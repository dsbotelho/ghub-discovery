import { Injectable, signal } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { Repository } from '../models/repository.model';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private readonly sessionStorageKey = 'bookmarks';
  private readonly bookmarksSignal = signal<Repository[]>([]);

  // This subject is used to inform its subscribers (a repository container) that a bookmark was removed.
  private bookmarkRemovedSubject = new Subject<Repository>();

  readonly bookmarks = this.bookmarksSignal.asReadonly();
  readonly bookmarkRemoved$ = this.bookmarkRemovedSubject.asObservable();

  constructor(private readonly sessionStorage: SessionStorageService) {
    // Not ideal.
    // Since I don't have a way to persist bookmarks in a dedicated API, I'm using the browser session storage as a temp solution.
    this.bookmarksSignal.set(
      this.sessionStorage.retrieve(this.sessionStorageKey) as Repository[]
    );
  }

  /**
   * Add a repository to the bookmark list.
   *
   * @param repository The repository to be added
   */
  addBookmark(repository: Repository): void {
    this.bookmarksSignal.update((bookmarks) => [...bookmarks, repository]);
    this.saveBookmarks();
  }

  /**
   * Removes a given repository from the list
   * Emits an event so its subscribers can update their data accordingly
   *
   * @param repository The repository to be removed
   */
  removeBookmark(repository: Repository): void {
    this.bookmarksSignal.update((bookmarks) =>
      bookmarks.filter((repo) => repo.id !== repository.id)
    );

    this.bookmarkRemovedSubject.next(repository);
    this.saveBookmarks();
  }

  /**
   * Checks if a given repository exists in the current bookmark list.
   *
   * @param repoId The repository identifier
   * @returns True if the repository is bookmarked, false otherwise.
   */
  isBookmark(repoId: number): boolean {
    return (
      this.bookmarksSignal().find((item) => item.id === repoId) !== undefined
    );
  }

  /**
   * Saves the current bookmarks in the browser session storage.
   */
  private saveBookmarks(): void {
    this.sessionStorage.store(this.sessionStorageKey, this.bookmarksSignal());
  }
}
