import { Injectable, signal } from "@angular/core";
import { Topic, topicsInitialState } from "../models/topic.model";

@Injectable({ providedIn: 'root' })
export class TopicSelectorService {
  private readonly topicsSignal = signal<Topic[]>(topicsInitialState);

  readonly topics = this.topicsSignal.asReadonly();

  // addTopic(value: Topic): void {
  //   this.topicsSignal.update(topics => [...topics, value]);
  // }

  // removeTopic(value: Topic): void {
  //   this.topicsSignal.update(topics => topics.filter(topic => topic.name !== value.name));
  // }

  updateTopic(data: Topic): void {
    this.topicsSignal.update(topics =>
      topics.map(topic => topic.name === data.name ?
        { ...topic, isSelected: !data.isSelected } : topic))
  }
}