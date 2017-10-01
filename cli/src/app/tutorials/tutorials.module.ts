import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ChatsModule } from 'app/components/chats/chats.module';
import { StepNameComponent } from './signup-steps/step_name.component';
import { StepTypeComponent } from './signup-steps/step_type.component';
import { StepSymptomComponent } from './signup-steps/step_symptom.component';
import { StepEmailComponent } from './signup-steps/step_email.component';
import { StepHealthComponent } from './daily-log-steps/step-health.component';
import { StepPictureComponent } from './daily-log-steps/step-picture.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChatsModule,
  ],
  declarations: [
    StepNameComponent,
    StepTypeComponent,
    StepSymptomComponent,
    StepEmailComponent,
    StepHealthComponent,
    StepPictureComponent,
  ],
  exports: [
    StepNameComponent,
    StepTypeComponent,
    StepSymptomComponent,
    StepEmailComponent,
    StepHealthComponent,
    StepPictureComponent,
  ]
})
export class TutorialsModule { }
