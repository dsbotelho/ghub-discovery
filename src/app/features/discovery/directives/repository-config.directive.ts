import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepositoryContainerComponent } from '../components/repo-container/repo-container.component';
import { RepositoryRequestData } from '../models/api/repository-http.model';
import { Repository } from '../models/repository.model';
import { GithubHttpService } from '../services/api/github-http.service';

@Directive({
  selector: '[ghubRepositoryConfig]',
})
export class RepositoryConfigDirective implements OnInit, OnDestroy {
  private subscription = new Subscription();
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
    private readonly gitHubHttpService: GithubHttpService
  ) {}

  ngOnInit(): void {
    this.defaultRequestData.filter = {
      ...this.defaultRequestData.filter,
      language: this.language,
    };

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData(): void {
    this.subscription = this.gitHubHttpService
      .getRepoListByLanguage(this.defaultRequestData)
      .subscribe((item) => {
        console.log(item);
        this.data = item ?? [];
        this.repositoryContainer.repoData = this.data;
      });
  }
}
