import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { TutorialsModule } from 'app/tutorials/tutorials.module';
import { LifeLogsRoutingModule } from './life-logs-routing.module';
import { ListComponent } from './daily-logs/list/list.component';
import { LoggingComponent } from './daily-logs/logging/logging.component';
import { CreateComponent } from './daily-logs/create/create.component';
import { DetailComponent } from './daily-logs/detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TutorialsModule,
    LifeLogsRoutingModule
  ],
  declarations: [
    ListComponent,
    LoggingComponent,
    CreateComponent,
    DetailComponent
  ]
})
export class LifeLogsModule { }
