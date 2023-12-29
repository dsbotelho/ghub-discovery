import { Injectable } from '@angular/core';
import { RepositoryHttpResponse } from '../../../models/api/repository-http.model';
import { Repository } from '../../../models/repository.model';
import { BookmarkService } from '../../bookmark.service';

@Injectable({ providedIn: 'root' })
export class RepositoryHandlerService {
  constructor(private readonly bookMarkService: BookmarkService) {}

  mapRepositoryHttpResponse(response: RepositoryHttpResponse): Repository[] {
    return response.items.map(
      (item) =>
        <Repository>{
          description: item.description,
          forks: item.forks,
          full_name: item.full_name,
          id: item.id,
          stargazers_count: item.stargazers_count,
          watchers_count: item.watchers_count,
          html_url: item.html_url,
          topics: item.topics,
          updated_at: item.updated_at,
          owner: item.owner,
          isBookmark: this.bookMarkService.isBookmark(item.id),
        }
    );
  }
}
