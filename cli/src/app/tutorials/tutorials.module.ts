import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ChatsModule } from 'app/components/chats/chats.module';
import { SignupComponent } from './signup/signup.component';
import { StepNameComponent } from './signup/step/step_name.component';
import { StepTypeComponent } from './signup/step/step_type.component';
import { StepSymptomComponent } from './signup/step/step_symptom.component';
import { StepEmailComponent } from './signup/step/step_email.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatsModule,
  ],
  declarations: [
    SignupComponent,
    StepNameComponent,
    StepTypeComponent,
    StepSymptomComponent,
    StepEmailComponent,
  ]
})
export class TutorialsModule { }
