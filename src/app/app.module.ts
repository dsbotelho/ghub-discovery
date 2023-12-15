import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { DiscoveryContainerComponent } from './features/discovery/components/discovery-container/discovery-container.component';
import { RepositoryContainerComponent } from './features/discovery/components/repo-container/repo-container.component';
import { NavigationBarComponent } from './features/navigation-bar/navigation-bar.component';
import { RepoItemComponent } from './features/discovery/components/repo-item/repo-item.component';
import { TopicClassSelector, TopicSelectorComponent } from './features/discovery/components/topic-selector/topic-selector.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationBarComponent,
    DiscoveryContainerComponent,
    RepositoryContainerComponent,
    RepoItemComponent,
    TopicSelectorComponent,
    TopicClassSelector

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
