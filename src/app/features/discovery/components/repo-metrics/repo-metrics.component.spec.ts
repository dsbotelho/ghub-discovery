import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Repository } from '../../models/repository.model';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';
import { RepoItemMetricsComponent } from './repo-metrics.component';

describe('RepoItemMetricsComponent', () => {
  let component: RepoItemMetricsComponent;
  let fixture: ComponentFixture<RepoItemMetricsComponent>;

  const repository: Repository = {
    description: 'description',
    forks: 10,
    id: 1,
    full_name: 'name',
    isBookmark: false,
    stargazers_count: 10,
    topics: [],
    updated_at: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoItemMetricsComponent, ShortNumberPipe],
    });

    fixture = TestBed.createComponent(RepoItemMetricsComponent);
    component = fixture.componentInstance;
    component.repository = repository;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.repository).toBeDefined();
  });
});
