import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'ghub-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrl: './repo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoItemComponent {
  @Input() repository!: Repository;
  @Output() bookmarkChanged = new EventEmitter<Repository>();

  updateBookmark(): void {
    this.bookmarkChanged.emit(this.repository);
  }
}
