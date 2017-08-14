import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import './shared/rxjs-operators';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './components/top/top.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
