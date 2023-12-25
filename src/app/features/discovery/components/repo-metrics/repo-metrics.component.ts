import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'ghub-repo-metrics',
  templateUrl: './repo-metrics.component.html',
  styleUrl: './repo-metrics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoItemMetricsComponent {
  @Input({ required: true }) repository!: Repository;
}
