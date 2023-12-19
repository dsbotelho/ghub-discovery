import { Component } from '@angular/core';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'ghub-discovery-container',
  templateUrl: './discovery-container.component.html',
  styleUrl: './discovery-container.component.scss',
})
export class DiscoveryContainerComponent {
  readonly bookmarksTitle = 'My Bookmarks';
  readonly bookmarksData: Repository[] = [
    {
      id: 1,
      full_name: 'facebook/react',
      description: '',
      forks: 10,
      topics: [],
      isBookmark: false,
      updated_at: new Date(),
      stargazers_count: 3,
    },
    {
      id: 2,
      full_name: 'facebook/react',
      description: '',
      forks: 10,
      topics: [],
      isBookmark: false,
      updated_at: new Date(),
      stargazers_count: 3,
    },
    {
      id: 3,
      full_name: 'facebook/react',
      description: '',
      forks: 10,
      topics: [],
      isBookmark: false,
      updated_at: new Date(),
      stargazers_count: 3,
    },
  ];
}
