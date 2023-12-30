import { Directive, Input, OnInit } from '@angular/core';
import { RepositoryContainerComponent } from '../components/repo-container/repo-container.component';
import { Repository } from '../models/repository.model';
import { BookmarkService } from '../services/bookmark.service';

@Directive({
  selector: '[ghubBookmarkConfig]',
})
export class BookmarkConfigDirective implements OnInit {
  readonly bookmarksTitle = 'My Bookmarks';

  @Input() set bookmarkData(bookmarks: Repository[]) {
    this.repositoryContainer.repositoryData = bookmarks;
  }

  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly repositoryContainer: RepositoryContainerComponent
  ) {}

  ngOnInit(): void {
    this.repositoryContainer.title = this.bookmarksTitle;

    this.repositoryContainer.bookmarkChanged.subscribe((repository) =>
      this.bookmarkService.removeBookmark({ ...repository, isBookmark: false })
    );
  }
}
