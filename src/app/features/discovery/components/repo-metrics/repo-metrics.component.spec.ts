import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoItemMetricsComponent } from './repo-metrics.component';

describe('RepoItemMetricsComponent', () => {
  let component: RepoItemMetricsComponent;
  let fixture: ComponentFixture<RepoItemMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoItemMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoItemMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
