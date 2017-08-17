import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatsRoutingModule
  ],
  declarations: [ChatsComponent]
})
export class ChatsModule { }
