import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'app/shared/shared.module';
import { Store } from 'app/shared/store/store';
import {
  AccountService,
  ChatService,
 } from 'app/shared/services/api';
import { SignupComponent } from './signup.component';
import { StepNameComponent } from 'app/tutorials/signup-steps/step_name.component';
import { StepTypeComponent } from 'app/tutorials/signup-steps/step_type.component';
import { StepSymptomComponent } from 'app/tutorials/signup-steps/step_symptom.component';
import { StepEmailComponent } from 'app/tutorials/signup-steps/step_email.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [
        SignupComponent,
        StepNameComponent,
        StepTypeComponent,
        StepSymptomComponent,
        StepEmailComponent,
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
