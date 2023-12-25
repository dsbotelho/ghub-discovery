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
  @Input() set repoData(data: Repository[]) {
    this._repoData = [...data];
    this.cdr.detectChanges();
  }

  @Output() bookmarkChanged = new EventEmitter<Repository>();
  @Output() loadClicked = new EventEmitter<void>();

  _repoData: Repository[] = [];

  constructor(
    readonly loaderService: LoaderService,
    private readonly cdr: ChangeDetectorRef
  ) {}
}
