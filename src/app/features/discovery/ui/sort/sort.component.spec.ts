import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SortableRequest } from '../../../../utils/http/request-data.model';
import { SortComponent } from './sort.component';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortComponent],
      imports: [NzDropDownModule],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle on init', () => {
    component.ngOnInit();
    expect(component.sortData).toEqual([
      {
        sort: 'stars',
        order: undefined,
      },
      {
        sort: 'forks',
        order: undefined,
      },
      {
        sort: 'updated',
        order: undefined,
      },
    ]);
  });

  it('should handle sort clicked when sort order is undefined', () => {
    jest.spyOn(component.sortChanged, 'emit').mockImplementation(jest.fn());
    const sortMock: SortableRequest = {
      sort: 'name',
      order: undefined,
    };
    component.sortData = [sortMock];

    component.sortClicked(sortMock);
    expect(component.sortData).toEqual([
      {
        ...sortMock,
        order: 'asc',
      },
    ]);
    expect(component.sortChanged.emit).toHaveBeenCalledWith({
      ...sortMock,
      order: 'asc',
    });
  });

  it('should handle sort clicked when sort order is asc', () => {
    jest.spyOn(component.sortChanged, 'emit').mockImplementation(jest.fn());
    const sortMock: SortableRequest = {
      sort: 'name',
      order: 'asc',
    };
    component.sortData = [sortMock];

    component.sortClicked(sortMock);
    expect(component.sortData).toEqual([
      {
        ...sortMock,
        order: 'desc',
      },
    ]);
    expect(component.sortChanged.emit).toHaveBeenCalledWith({
      ...sortMock,
      order: 'desc',
    });
  });

  it('should handle sort clicked when sort order is desc', () => {
    jest.spyOn(component.sortChanged, 'emit').mockImplementation(jest.fn());
    const sortMock: SortableRequest = {
      sort: 'name',
      order: 'desc',
    };
    component.sortData = [sortMock];

    component.sortClicked(sortMock);
    expect(component.sortData).toEqual([
      {
        ...sortMock,
        order: 'asc',
      },
    ]);
    expect(component.sortChanged.emit).toHaveBeenCalledWith({
      ...sortMock,
      order: 'asc',
    });
  });
});
