import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyLogsComponent } from './daily-logs/daily-logs.component';
import { LoggingComponent } from './daily-logs/logging/logging.component';

const routes: Routes = [
  {
    path: 'daily',
    children: [
      {
        path: 'list',
        component: DailyLogsComponent,
      },
      {
        path: 'create',
        component: LoggingComponent,
      },
      {
        path: ':id',
        component: DailyLogsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeLogsRoutingModule { }
