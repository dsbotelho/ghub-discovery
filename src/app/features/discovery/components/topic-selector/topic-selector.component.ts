import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Pipe, PipeTransform, inject, signal } from '@angular/core';
import { TopicSelectorService } from '../../services/topic-selector.service';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'ghub-topic-selector',
  templateUrl: './topic-selector.component.html',
  styleUrl: './topic-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicSelectorComponent {
  readonly topicsService = inject(TopicSelectorService);
  selectedTopics = this.topicsService.topics;

  updateTopicList(topic: Topic): void {
    this.topicsService.updateTopic(topic);
  }
}
