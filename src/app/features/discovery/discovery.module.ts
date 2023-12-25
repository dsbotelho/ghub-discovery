import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DiscoveryContainerComponent } from './components/discovery-container/discovery-container.component';
import { RepositoryContainerComponent } from './components/repo-container/repo-container.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { RepoItemMetricsComponent } from './components/repo-metrics/repo-metrics.component';
import { TopicSelectorComponent } from './components/topic-selector/topic-selector.component';
import { BookmarkConfigDirective } from './directives/bookmark-config.directive';
import { RepositoryConfigDirective } from './directives/repository-config.directive';
import { ShortNumberPipe } from './pipes/short-number.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    // Ant
    NzSpinModule,
    NzButtonModule,
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
  ],
})
export class DiscoveryModule {}
