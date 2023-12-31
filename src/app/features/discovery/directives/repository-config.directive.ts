import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepositoryContainerComponent } from '../components/repo-container/repo-container.component';
import { RepositoryRequestData } from '../models/api/repository-http.model';
import { Repository } from '../models/repository.model';
import { GithubHttpService } from '../services/api/github-http.service';
import { BookmarkService } from '../services/bookmark.service';

/**
 * Directive responsible for handling the logic related to each repository container.
 * Some of its responsabilities:
 * - Fetches data based on a selected language.
 * - Handles adding/removing from bookmarks
 * - Handles loading additional repositories
 * - Handles sort logic
 */
@Directive({
  selector: '[ghubRepositoryConfig]',
})
export class RepositoryConfigDirective implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private readonly defaultPerPage = 10;
  private readonly defaultStars = 1000;
  private readonly defaultPage = 1;
  private readonly defaultRequestData: RepositoryRequestData = {
    per_page: this.defaultPerPage,
    page: this.defaultPage,
    filter: {
      stars: this.defaultStars,
    },
  };

  @Input() language!: string;

  data: Repository[] = [];
  requestData: RepositoryRequestData = {
    ...this.defaultRequestData,
  };

  constructor(
    private readonly repositoryContainer: RepositoryContainerComponent,
    private readonly gitHubHttpService: GithubHttpService,
    private readonly bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.repositoryContainer.showLoadButton = true;
    this.repositoryContainer.isSortVisible = true;
    this.repositoryContainer.title = `Top ${this.language}`;
    this.requestData.filter = {
      ...this.requestData.filter,
      language: this.language,
    };

    this.loadData();
    this.setupBookmarkChanged();
    this.setupBookmarkDeleted();
    this.setupLoadClicked();
    this.setupSortChanged();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * Fetches top repositories for this directive language.
   * @param isSorting If it's not a sorting request > concat data to the existing array.
   */
  loadData(isSorting: boolean = false): void {
    this.subscriptions.push(
      this.gitHubHttpService
        .getRepoListByLanguage$(this.requestData)
        .subscribe((item) => {
          this.data = isSorting ? item ?? [] : this.data.concat(item ?? []);
          this.repositoryContainer.repositoryData = this.data;
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
   * Listens for changes on the bookmark list. If an element is removed, updates its current data.
   */
  setupBookmarkDeleted(): void {
    this.subscriptions.push(
      this.bookmarkService.bookmarkRemoved$.subscribe((repository) =>
        this.updateData(repository)
      )
    );
  }

  /**
   * Listens for button click to load additional data to the current repository list.
   */
  setupLoadClicked(): void {
    this.repositoryContainer.loadClicked.subscribe(() => {
      this.requestData = {
        ...this.requestData,
        page: this.requestData.page + 1,
      };

      this.loadData();
    });
  }

  /**
   * Listens for sort changes.
   * Resets the request data to default values in order to avoid unwanted behavior.
   * TODO: Refactor/Improve this behavior .
   */
  setupSortChanged(): void {
    this.repositoryContainer.sortChanged.subscribe((item) => {
      this.requestData = {
        ...this.requestData,
        per_page: this.defaultPerPage,
        page: this.defaultPage,
        sort: item.sort,
        order: item.order,
      };
      this.loadData(true);
    });
  }

  private updateData(repository: Repository): void {
    this.data = this.data.map((item) =>
      item.id === repository.id ? repository : item
    );
    this.repositoryContainer.repositoryData = this.data;
  }
}
