import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { BookmarkService } from '../../services/bookmark.service';
import { TopicSelectorService } from '../../services/topic-selector.service';
import { DiscoveryContainerComponent } from './discovery-container.component';

describe('DiscoveryContainerComponent', () => {
  let component: DiscoveryContainerComponent;
  let fixture: ComponentFixture<DiscoveryContainerComponent>;
  let topicService: TopicSelectorService;
  let bookmarkService: BookmarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoveryContainerComponent],
      providers: [SessionStorageService],
    });

    topicService = TestBed.inject(TopicSelectorService);
    bookmarkService = TestBed.inject(BookmarkService);
    fixture = TestBed.createComponent(DiscoveryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.selectedTopics).toEqual(topicService.topics);
    expect(component.bookmarks).toEqual(bookmarkService.bookmarks);
  });
});
