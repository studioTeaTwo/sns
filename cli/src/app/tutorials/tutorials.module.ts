import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ChatsModule } from 'app/components/chats/chats.module';
import { Tutorial1Component } from './tutorial1/tutorial1.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatsModule,
  ],
  declarations: [Tutorial1Component]
})
export class TutorialsModule { }
