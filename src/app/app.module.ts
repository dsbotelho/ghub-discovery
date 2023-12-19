import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { DiscoveryContainerComponent } from './features/discovery/components/discovery-container/discovery-container.component';
import { RepositoryContainerComponent } from './features/discovery/components/repo-container/repo-container.component';
import { RepoItemComponent } from './features/discovery/components/repo-item/repo-item.component';
import { TopicSelectorComponent } from './features/discovery/components/topic-selector/topic-selector.component';
import { RepositoryConfigDirective } from './features/discovery/directives/repository-config.directive';
import { ShortNumberPipe } from './features/discovery/pipes/short-number.pipe';
import { NavigationBarComponent } from './features/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationBarComponent,
    DiscoveryContainerComponent,
    RepositoryContainerComponent,
    RepoItemComponent,
    TopicSelectorComponent,
    RepositoryConfigDirective,
    ShortNumberPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, NzButtonModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
