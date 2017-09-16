import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { TutorialsModule } from 'app/tutorials/tutorials.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    TutorialsModule,
  ],
  declarations: [SignupComponent]
})
export class AuthModule { }
