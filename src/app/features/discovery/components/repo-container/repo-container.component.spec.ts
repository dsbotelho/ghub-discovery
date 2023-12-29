import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Repository } from '../../models/repository.model';
import { RepositoryContainerComponent } from './repo-container.component';

describe('RepositoryContainerComponent', () => {
  let component: RepositoryContainerComponent;
  let fixture: ComponentFixture<RepositoryContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryContainerComponent],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(RepositoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.showLoadButton).toBeFalsy();
    expect(component._repositoryData).toEqual([]);
    expect(component.bookmarkChanged).toBeDefined();
    expect(component.loadClicked).toBeDefined();
  });

  it('should set repository data', () => {
    const data: Repository = {
      description: 'description',
      forks: 10,
      id: 1,
      full_name: 'name',
      isBookmark: false,
      stargazers_count: 10,
      topics: [],
      updated_at: new Date(),
    };

    component.repositoryData = [data];
    expect(component._repositoryData).toEqual([data]);
  });
});
