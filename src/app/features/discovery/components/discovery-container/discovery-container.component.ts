import { Component } from '@angular/core';
import { Repository } from '../../models/repository';

@Component({
  selector: 'ghub-discovery-container',
  templateUrl: './discovery-container.component.html',
  styleUrl: './discovery-container.component.scss'
})
export class DiscoveryContainerComponent {
  readonly bookmarksTitle = 'My Bookmarks';
  readonly bookmarksData: Repository[] = [
    {
      id: 1,
      title: 'Repo 1',
      stars: 3
    },
    {
      id: 2,
      title: 'Repo 2',
      stars: 3
    },
    {
      id: 3,
      title: 'Repo 3',
      stars: 3
    }
  ]
}
