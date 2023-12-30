import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DiscoveryContainerComponent } from './components/discovery-container/discovery-container.component';
import { RepositoryContainerComponent } from './components/repo-container/repo-container.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { RepoItemMetricsComponent } from './components/repo-metrics/repo-metrics.component';
import { TopicSelectorComponent } from './components/topic-selector/topic-selector.component';
import { BookmarkConfigDirective } from './directives/bookmark-config.directive';
import { RepositoryConfigDirective } from './directives/repository-config.directive';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { SortComponent } from './ui/sort/sort.component';

@NgModule({
  imports: [
    CommonModule,

    // Ant
    NzSpinModule,
    NzButtonModule,
    NzToolTipModule,
    NzEmptyModule,
    NzDropDownModule,
  ],
  exports: [],
  declarations: [
    DiscoveryContainerComponent,
    RepoItemComponent,
    RepoItemMetricsComponent,
    RepositoryContainerComponent,
    TopicSelectorComponent,
    RepositoryConfigDirective,
    ShortNumberPipe,
    BookmarkConfigDirective,
    SortComponent,
  ],
})
export class DiscoveryModule {}
