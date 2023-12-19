import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'ghub-repository-container',
  templateUrl: './repo-container.component.html',
  styleUrl: './repo-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryContainerComponent implements OnInit {
  @Input({ required: true }) title!: string;
  @Input() set repoData(data: Repository[]) {
    this._repoData = data;
    this.cdr.detectChanges();
    console.log(this._repoData);
  }

  _repoData: Repository[] = [];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('RepoContainer');
  }

  removeBookmark(repository: Repository): void {
    this._repoData.splice(
      this._repoData.findIndex((it) => it.id === repository.id),
      1
    );
  }
}
