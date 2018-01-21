import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SignupComponent } from './signup.component';

import { SharedModule } from 'app/shared/shared.module';
import { Store } from 'app/shared/store/store';
import {
  AccountService,
  ChatService,
 } from 'app/shared/services/api';
import { StepNameComponent } from 'app/tutorials/signup-steps/step-name.component';
import { StepTypeComponent } from 'app/tutorials/signup-steps/step-type.component';
import { StepSymptomComponent } from 'app/tutorials/signup-steps/step-symptom.component';
import { StepEmailComponent } from 'app/tutorials/signup-steps/step-email.component';
import { StepGoalComponent } from 'app/tutorials/signup-steps/step-goal.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [
        SignupComponent,
        StepNameComponent,
        StepTypeComponent,
        StepSymptomComponent,
        StepEmailComponent,
        StepGoalComponent,
      ],
      providers: [
        Store,
        AccountService,
        ChatService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
