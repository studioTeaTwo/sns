import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsComponent } from 'app/components/chats/chats.component';

const routes: Routes = [
  {
    path: '',
    component: ChatsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
