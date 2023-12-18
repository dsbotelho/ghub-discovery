import { Injectable } from '@angular/core';
import { RepositoryHttpResponse } from '../../../models/api/repository-http.model';
import { RepositoryV2 } from '../../../models/repository.model';

@Injectable({ providedIn: 'root' })
export class RepositoryHandlerService {
  constructor() {}

  mapRepositoryHttpResponse(response: RepositoryHttpResponse): RepositoryV2[] {
    return response.items.map(
      (item) =>
        <RepositoryV2>{
          description: item.description,
          forks: item.forks,
          full_name: item.full_name,
          id: item.id,
          stargazers_count: item.stargazers_count,
          topics: item.topics,
          updated_at: item.updated_at,
          owner: item.owner,
          isBookmark: false,
        }
    );
  }
}
