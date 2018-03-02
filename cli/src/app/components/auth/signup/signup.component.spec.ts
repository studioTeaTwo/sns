import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import {
  AccountService,
  ChatService,
 } from 'app/core/services/api';
import { StepNameComponent } from 'app/tutorials/signup-steps/step-name.component';
import { StepTypeComponent } from 'app/tutorials/signup-steps/step-type.component';
import { StepSymptomComponent } from 'app/tutorials/signup-steps/step-symptom.component';
import { StepEmailComponent } from 'app/tutorials/signup-steps/step-email.component';
import { StepGoalComponent } from 'app/tutorials/signup-steps/step-goal.component';
import { FormatToJapaneseDatePipe } from 'app/shared/pipes';
import { MockAccountService } from 'testing/api';

declare var window: any;

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        FormsModule,
        MaterialModule,
      ],
      declarations: [
        SignupComponent,
        StepNameComponent,
        StepTypeComponent,
        StepSymptomComponent,
        StepEmailComponent,
        StepGoalComponent,
        FormatToJapaneseDatePipe,
      ],
      providers: [
        Store,
        {
          provide: AccountService,
          useClass: MockAccountService
        },
        ChatService,
      ]
    })
    .compileComponents();
    window.ga = jasmine.createSpy('ga');
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
