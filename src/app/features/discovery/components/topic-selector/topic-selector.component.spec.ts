import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Topic } from '../../models/topic.model';
import { TopicSelectorService } from '../../services/topic-selector.service';
import { TopicSelectorComponent } from './topic-selector.component';

describe('TopicSelectorComponent', () => {
  let component: TopicSelectorComponent;
  let fixture: ComponentFixture<TopicSelectorComponent>;
  let topicService: TopicSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicSelectorComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    topicService = TestBed.inject(TopicSelectorService);
    fixture = TestBed.createComponent(TopicSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.selectedTopics).toEqual(topicService.topics);
  });

  it('should update topic list', () => {
    jest.spyOn(topicService, 'updateTopic').mockImplementation(jest.fn());
    const topic: Topic = {
      name: 'name',
      isSelected: true,
    };

    component.updateTopicList(topic);
    expect(topicService.updateTopic).toHaveBeenCalledWith(topic);
  });
});
