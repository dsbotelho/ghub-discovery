import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscoveryModule } from './features/discovery/discovery.module';
import { NavigationBarComponent } from './features/navigation-bar/navigation-bar.component';
import { LoaderInterceptor } from './utils/interceptors/loader.interceptor';

@NgModule({
  declarations: [AppComponent, NavigationBarComponent],
  imports: [
    //Common
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxWebstorageModule.forRoot({
      prefix: 'gHub',
      caseSensitive: true,
    }),

    // Dependencies
    DiscoveryModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: 'WEB_API_URL',
      useValue: 'https://api.github.com/search/',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
