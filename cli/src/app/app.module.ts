import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from 'environments/environment';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './components/navigations/top/top.component';
import { HeaderComponent } from './components/navigations/header/header.component';
import { GlobalMenuComponent } from './components/navigations/global-menu/global-menu.component';
import { ContactComponent } from './components/navigations/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    HeaderComponent,
    GlobalMenuComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    CoreModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
