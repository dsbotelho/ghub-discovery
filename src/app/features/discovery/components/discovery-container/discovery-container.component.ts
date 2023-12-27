import { Component } from '@angular/core';
import { BookmarkService } from '../../services/bookmark.service';
import { TopicSelectorService } from '../../services/topic-selector.service';

@Component({
  selector: 'ghub-discovery-container',
  templateUrl: './discovery-container.component.html',
  styleUrl: './discovery-container.component.scss',
})
export class DiscoveryContainerComponent {
  selectedTopics = this.topicsService.topics;
  bookmarks = this.bookmarkService.bookmarks;

  constructor(
    private readonly topicsService: TopicSelectorService,
    private readonly bookmarkService: BookmarkService
  ) {}
}
