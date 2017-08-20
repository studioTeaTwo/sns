import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatListComponent } from 'app/components/chats/chat-list/chat-list.component';
import { ChatComponent } from 'app/components/chats/chat/chat.component';

const routes: Routes = [
  {
    path: 'list',
    component: ChatListComponent,
  },
  {
    path: ':id',
    component: ChatComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
