import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Topic } from '../../models/topic.model';
import { LoaderService } from '../../services/loader.service';
import { TopicSelectorService } from '../../services/topic-selector.service';

@Component({
  selector: 'ghub-topic-selector',
  templateUrl: './topic-selector.component.html',
  styleUrl: './topic-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicSelectorComponent {
  private readonly topicsService = inject(TopicSelectorService);
  readonly loaderService = inject(LoaderService);

  selectedTopics = this.topicsService.topics;

  updateTopicList(topic: Topic): void {
    this.topicsService.updateTopic(topic);
  }
}
