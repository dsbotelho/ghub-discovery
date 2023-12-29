import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Repository } from '../../models/repository.model';
import { RepoItemComponent } from './repo-item.component';

describe('RepoItemComponent', () => {
  let component: RepoItemComponent;
  let fixture: ComponentFixture<RepoItemComponent>;

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
      declarations: [RepoItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;
    component.repository = repository;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.repository).toBeDefined();
    expect(component.bookmarkChanged).toBeDefined();
  });

  it('should update bookmark()', () => {
    jest.spyOn(component.bookmarkChanged, 'emit');

    component.updateBookmark();
    expect(component.bookmarkChanged.emit).toHaveBeenCalledWith(
      component.repository
    );
  });
});
