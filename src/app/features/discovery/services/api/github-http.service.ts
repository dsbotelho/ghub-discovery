import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpParamsBuilder } from '../../../../utils/http/http-params-builder.model';
import {
  RepositoryHttpResponse,
  RepositoryRequestData,
} from '../../models/api/repository-http.model';
import { Repository } from '../../models/repository.model';
import { RepositoryHandlerService } from './handlers/repository-handler.service';

@Injectable({ providedIn: 'root' })
export class GithubHttpService {
  readonly gitHubUrl = 'https://api.github.com/search/repositories?q=';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly handler: RepositoryHandlerService
  ) {}

  getRepoListByLanguage$(
    requestData: RepositoryRequestData
  ): Observable<Repository[] | undefined> {
    const params = new HttpParamsBuilder()
      .paginatedRequest(requestData)
      .sortableRequest(requestData)
      .build();

    // This is not supposed to be here and it is not a good pratice.
    // In future improvements, the user will be able to customize this information.
    // When that happens, this code will be moved to its own method with its own logic.
    const string = encodeURIComponent(
      `language:${requestData.filter.language} stars:>${requestData.filter.stars}`
    );

    if (params == null) {
      return of(undefined);
    }

    return this.httpClient
      .get<RepositoryHttpResponse>(`${this.gitHubUrl}${string}`, { params })
      .pipe(map((item) => this.handler.mapRepositoryHttpResponse(item)));
  }
}
