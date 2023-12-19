import { Injectable } from '@angular/core';
import { RepositoryHttpResponse } from '../../../models/api/repository-http.model';
import { Repository } from '../../../models/repository.model';

@Injectable({ providedIn: 'root' })
export class RepositoryHandlerService {
  constructor() {}

  mapRepositoryHttpResponse(response: RepositoryHttpResponse): Repository[] {
    return response.items.map(
      (item) =>
        <Repository>{
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
