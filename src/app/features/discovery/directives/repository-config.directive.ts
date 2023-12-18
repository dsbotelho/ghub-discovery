import { Directive, Input, OnInit } from '@angular/core';
import { RepositoryContainerComponent } from '../components/repo-container/repo-container.component';
import { GithubHttpService } from '../services/api/github-http.service';
import { RepositoryRequestData } from '../models/api/repository-http.model';

@Directive({
  selector: '[ghubRepositoryConfig]'
})
export class RepositoryConfigDirective implements OnInit {
  private readonly defaultPerPage = 5;
  private readonly defaultStars = 1000;

  @Input() language!: string;

  defaultRequestData: RepositoryRequestData = {
    per_page: this.defaultPerPage,
    page: 1,
    filter: {
      stars: this.defaultStars
    }
  }

  constructor(private readonly repositoryContainer: RepositoryContainerComponent, private readonly gitHubHttpService: GithubHttpService) { }

  ngOnInit(): void {
    this.defaultRequestData.filter = {
      ...this.defaultRequestData.filter,
      language: this.language
    }

    this.loadData();
  }

  loadData(): void {
    this.gitHubHttpService.getRepoListByLanguage(this.defaultRequestData);
  }
}
