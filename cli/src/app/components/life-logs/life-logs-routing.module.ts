import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './daily-logs/list/list.component';
import { LoggingComponent } from './daily-logs/logging/logging.component';
import { DetailComponent } from './daily-logs/detail/detail.component';

const routes: Routes = [
  {
    path: 'daily',
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'logging/:id',
        component: LoggingComponent,
      },
      {
        path: 'create',
        component: DetailComponent,
      },
      {
        path: ':id',
        component: DetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeLogsRoutingModule { }
