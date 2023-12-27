import { TestBed } from '@angular/core/testing';
import { Topic } from '../models/topic.model';
import { TopicSelectorService } from './topic-selector.service';

describe('TopicSelectorService', () => {
  let service: TopicSelectorService;
  const initialState: Topic[] = [
    {
      name: 'name',
      isSelected: true,
    },
  ];

  beforeEach(() => {
    service = TestBed.inject(TopicSelectorService);

    // This is not a good pratice.
    // TODO: Find a better way to handle this in future improvements.
    service['topicsSignal'].set(initialState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.topics()).toEqual(initialState);
  });

  it('should update topics when topic exists', () => {
    service.updateTopic(initialState[0]);
    expect(service.topics()).toEqual([
      {
        name: 'name',
        isSelected: false,
      },
    ]);
  });

  it('should not update topics when topic does not exists', () => {
    const topic: Topic = {
      name: 'topic',
      isSelected: true,
    };

    service.updateTopic(topic);
    expect(service.topics()).toEqual(initialState);
  });
});
