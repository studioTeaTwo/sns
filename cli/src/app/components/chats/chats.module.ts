import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ChatsRoutingModule } from './chats-routing.module';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';

@NgModule({
  imports: [CommonModule, SharedModule, ChatsRoutingModule],
  declarations: [ChatComponent, ChatListComponent],
})
export class ChatsModule {}
