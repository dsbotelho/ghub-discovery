import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { NavigationBarComponent } from './features/navigation-bar/navigation-bar.component';
import { DiscoveryContainerComponent } from './features/discovery/components/discovery-container/discovery-container.component';
import { RepositoryContainerComponent } from './features/discovery/components/repo-container/repo-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationBarComponent,
    DiscoveryContainerComponent,
    RepositoryContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
