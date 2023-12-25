import { Directive, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { RepositoryContainerComponent } from '../components/repo-container/repo-container.component';
import { Repository } from '../models/repository.model';
import { BookmarkService } from '../services/bookmark.service';

@Directive({
  selector: '[ghubBookmarkConfig]',
})
export class BookmarkConfigDirective implements OnInit, OnDestroy {
  private readonly bookmarkService = inject(BookmarkService);
  private readonly repositoryContainer = inject(RepositoryContainerComponent);

  @Input() set bookmarkData(bookmarks: Repository[]) {
    this.repositoryContainer.repoData = bookmarks;
  }

  // bookmarkData = this.bookmarkService.bookmarks;

  ngOnInit(): void {
    this.repositoryContainer.title = 'My Bookmarks';

    this.repositoryContainer.bookmarkChanged.subscribe((repository) =>
      this.bookmarkService.removeBookmark({ ...repository, isBookmark: false })
    );
  }

  ngOnDestroy(): void {
    console.log('onDestroy');
    this.bookmarkService.saveBookmarks();
  }
}
