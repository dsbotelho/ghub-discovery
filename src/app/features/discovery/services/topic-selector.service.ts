import { Injectable, signal } from '@angular/core';
import { Topic, topicsInitialState } from '../models/topic.model';

@Injectable({ providedIn: 'root' })
export class TopicSelectorService {
  private topicsSignal = signal<Topic[]>(topicsInitialState);

  readonly topics = this.topicsSignal.asReadonly();

  updateTopic(data: Topic): void {
    this.topicsSignal.update((topics) =>
      topics.map((topic) =>
        topic.name === data.name
          ? { ...topic, isSelected: !data.isSelected }
          : topic
      )
    );
  }
}
