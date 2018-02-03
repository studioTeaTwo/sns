import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from 'app/components/home/home/home.component';
import { TipsComponent } from 'app/components/home/tips/tips.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    TipsComponent,
  ]
})
export class HomeModule { }
