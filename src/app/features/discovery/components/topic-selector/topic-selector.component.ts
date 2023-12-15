import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Pipe, PipeTransform, signal } from '@angular/core';
import { TopicSelectorService } from '../../services/topic-selector.service';

@Pipe({
  name: 'topicClass'
})
export class TopicClassSelector implements PipeTransform {
  constructor(private readonly service: TopicSelectorService) { }

  // Em vez de usar um pipe, criar array de Objectos custom, que tenham o titulo da linguagem e se estão selecionados
  transform(value: string): string {
    console.log('oi')
    return this.service.topics().includes(value) ? 'selected' : '';
  }
}

@Component({
  selector: 'ghub-topic-selector',
  templateUrl: './topic-selector.component.html',
  styleUrl: './topic-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicSelectorComponent implements OnInit {
  readonly topics = ['Angular', 'Vue', 'TypeScript', 'CSS'];
  selectedTopics: string[] = [];

  constructor(private readonly topicsService: TopicSelectorService, private readonly cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectedTopics = this.topicsService.topics();
    console.log(this.selectedTopics);
  }

  updateTopicList(topic: string): void {
    this.topicsService.updateTopicList(topic);
    console.log(this.topicsService.topics());
    this.cdr.markForCheck();
  }

  booli(value: string): string {
    return this.topicsService.topics().includes(value) ? 'selected' : '';
  }
}
