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
})
export class RepositoryContainerComponent {
  @Input() title!: string;
  @Input() set repoData(data: Repository[]) {
    this._repoData = [...data];
    this.cdr.detectChanges();
  }

  @Output() bookmarkChanged = new EventEmitter<Repository>();

  _repoData: Repository[] = [];

  constructor(
    readonly loaderService: LoaderService,
    private readonly cdr: ChangeDetectorRef
  ) {}
}
