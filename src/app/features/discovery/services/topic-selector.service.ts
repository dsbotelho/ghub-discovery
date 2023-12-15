import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TopicSelectorService {
  private readonly topicsSignal = signal(['Angular']);

  readonly topics = this.topicsSignal.asReadonly();

  addTopic(value: string): void {
    this.topicsSignal.update(topics => [...topics, value]);
  }

  removeTopic(value: string): void {
    this.topicsSignal.update(topics => topics.filter(topic => topic !== value));
  }

  updateTopicList(value: string): void {
    if (this.topicsSignal().includes(value)) {
      console.log(this.topics());
      this.removeTopic(value);
      console.log(this.topics());
      return;
    }

    this.addTopic(value);
    console.log(this.topics());
  }
}