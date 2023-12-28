import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
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

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Ant
    NzSpinModule,
    NzButtonModule,
    NzToolTipModule,
    NzEmptyModule,
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
