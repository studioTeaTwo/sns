import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ChatsModule } from 'app/components/chats/chats.module';
import { SignupComponent } from './signup/signup.component';
import { Step1Component } from './signup/step/step1.component';
import { Step2Component } from './signup/step/step2.component';
import { Step3Component } from './signup/step/step3.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatsModule,
  ],
  declarations: [
    SignupComponent,
    Step1Component,
    Step2Component,
    Step3Component,
  ]
})
export class TutorialsModule { }
