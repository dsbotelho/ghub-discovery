import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Repository } from '../../models/repository';

@Component({
  selector: 'ghub-repository-container',
  templateUrl: './repo-container.component.html',
  styleUrl: './repo-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryContainerComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) set repoData(data: Repository[]) {
    if (!data) {
      this._bookmarkData = [];
      return;
    }

    this._bookmarkData = data;
  }

  _bookmarkData: Repository[] = [];

  removeBookmark(repository: Repository): void {
    this._bookmarkData.splice(this._bookmarkData.findIndex(it => it.id === repository.id), 1);
  }
}
