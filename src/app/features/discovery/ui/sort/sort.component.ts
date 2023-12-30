import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { SortableRequest } from '../../../../utils/http/request-data.model';

@Component({
  selector: 'ghub-sort',
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent implements OnInit {
  @Output() sortChanged = new EventEmitter<SortableRequest>();

  sortData: SortableRequest[] = [];

  ngOnInit(): void {
    this.sortData = [
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
    ];
  }

  sortClicked(sort: SortableRequest): void {
    sort = this.updateData(sort);
    this.sortChanged.emit(sort);
  }

  private updateData(sort: SortableRequest): SortableRequest {
    switch (sort.order) {
      case 'asc':
        sort = { ...sort, order: 'desc' };
        break;
      case 'desc':
      case undefined:
        sort = { ...sort, order: 'asc' };
        break;
    }

    this.sortData = this.sortData.map((item) =>
      item.sort === sort.sort ? sort : { ...item, order: undefined }
    );

    return sort;
  }
}
