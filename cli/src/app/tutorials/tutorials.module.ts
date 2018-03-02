import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ChatsModule } from 'app/components/chats/chats.module';
import { StepNameComponent } from './signup-steps/step-name.component';
import { StepTypeComponent } from './signup-steps/step-type.component';
import { StepSymptomComponent } from './signup-steps/step-symptom.component';
import { StepEmailComponent } from './signup-steps/step-email.component';
import { StepGoalComponent } from './signup-steps/step-goal.component';
import { StepHealthComponent } from './daily-log-steps/step-health.component';
import { StepMedicinaComponent } from './daily-log-steps/step-medicina.component';
import { StepPictureComponent } from './daily-log-steps/step-picture.component';

@NgModule({
  imports: [CommonModule, SharedModule, ChatsModule],
  declarations: [
    StepNameComponent,
    StepTypeComponent,
    StepSymptomComponent,
    StepEmailComponent,
    StepGoalComponent,

    StepHealthComponent,
    StepMedicinaComponent,
    StepPictureComponent,
  ],
  exports: [
    StepNameComponent,
    StepTypeComponent,
    StepSymptomComponent,
    StepEmailComponent,
    StepGoalComponent,

    StepHealthComponent,
    StepMedicinaComponent,
    StepPictureComponent,
  ],
})
export class TutorialsModule {}
