import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'app/shared/shared.module';
import { Store } from 'app/shared/store/store';
import {
  AccountService,
  ChatService,
 } from 'app/shared/services/api';
import { StepSymptomComponent } from './step-symptom.component';
import { MockAccountService } from 'app/mock/api/mock-account-service';

describe('StepSymptomComponent', () => {
  let component: StepSymptomComponent;
  let fixture: ComponentFixture<StepSymptomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [ StepSymptomComponent ],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});