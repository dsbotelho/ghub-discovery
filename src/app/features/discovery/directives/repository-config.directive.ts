import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepositoryContainerComponent } from '../components/repo-container/repo-container.component';
import { RepositoryRequestData } from '../models/api/repository-http.model';
import { Repository } from '../models/repository.model';
import { GithubHttpService } from '../services/api/github-http.service';
import { BookmarkService } from '../services/bookmark.service';

@Directive({
  selector: '[ghubRepositoryConfig]',
})
export class RepositoryConfigDirective implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private readonly defaultPerPage = 10;
  private readonly defaultStars = 1000;

  @Input() language!: string;

  data: Repository[] = [];
  defaultRequestData: RepositoryRequestData = {
    per_page: this.defaultPerPage,
    page: 1,
    filter: {
      stars: this.defaultStars,
    },
  };

  constructor(
    private readonly repositoryContainer: RepositoryContainerComponent,
    private readonly gitHubHttpService: GithubHttpService,
    private readonly bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.defaultRequestData.filter = {
      ...this.defaultRequestData.filter,
      language: this.language,
    };

    this.loadData();
    this.setupBookmarkChanged();
    this.setupBookmarkDeleted();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * Fetches top repositories for this directive language.
   */
  loadData(): void {
    this.subscriptions.push(
      this.gitHubHttpService
        .getRepoListByLanguage$(this.defaultRequestData)
        .subscribe((item) => {
          this.data = item ?? [];
          this.repositoryContainer.repoData = this.data;
        })
    );
  }

  /**
   * Responsible to deal with a star button click
   *
   * If the repository is already in the bookmarks, remove it from the bookmark list.
   * If not, add it to the bookmark list.
   */
  setupBookmarkChanged(): void {
    this.repositoryContainer.bookmarkChanged.subscribe((repository) => {
      repository = this.bookmarkService.isBookmark(repository.id)
        ? { ...repository, isBookmark: false }
        : { ...repository, isBookmark: true };

      if (this.bookmarkService.isBookmark(repository.id)) {
        this.bookmarkService.removeBookmark(repository);
        this.updateData(repository);
      } else {
        this.bookmarkService.addBookmark(repository);
        this.updateData(repository);
      }
    });
  }

  /**
   *
   */
  setupBookmarkDeleted(): void {
    this.subscriptions.push(
      this.bookmarkService.bookmarkRemoved$.subscribe((repository) =>
        this.updateData(repository)
      )
    );
  }

  private updateData(repository: Repository): void {
    this.data = this.data.map((item) =>
      item.id === repository.id ? repository : item
    );
    this.repositoryContainer.repoData = this.data;
  }

  private handleBookmarkChange(repository: Repository): void {
    if (repository.isBookmark) {
      this.bookmarkService.removeBookmark(repository);
    }
  }
}
