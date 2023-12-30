import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SortableRequest } from '../../../../utils/http/request-data.model';
import { Repository } from '../../models/repository.model';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'ghub-repository-container',
  templateUrl: './repo-container.component.html',
  styleUrl: './repo-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(200)]),
      transition(':leave', animate(400, style({ opacity: 0 }))),
    ]),
  ],
})
export class RepositoryContainerComponent {
  @Input() title!: string;
  @Input() showLoadButton = false;
  @Input() isSortVisible = false;
  @Input() set repositoryData(data: Repository[]) {
    this._repositoryData = [...data];
    this.cdr.detectChanges();
  }

  @Output() bookmarkChanged = new EventEmitter<Repository>();
  @Output() loadClicked = new EventEmitter<void>();
  @Output() sortChanged = new EventEmitter<SortableRequest>();

  _repositoryData: Repository[] = [];

  constructor(
    readonly loaderService: LoaderService,
    private readonly cdr: ChangeDetectorRef
  ) {}
}
