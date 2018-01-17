import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoggingComponent } from './logging.component';

import { SharedModule } from 'app/shared/shared.module';
import { Store } from 'app/shared/store/store';
import {
  AccountService,
  ChatService,
  DailyLogService,
 } from 'app/shared/services/api';
import { StepHealthComponent } from 'app/tutorials/daily-log-steps/step-health.component';
import { StepMedicinaComponent } from 'app/tutorials/daily-log-steps/step-medicina.component';
import { StepPictureComponent } from 'app/tutorials/daily-log-steps/step-picture.component';
import { MockAccountService } from 'app/mock/api/mock-account-service';

describe('LoggingComponent', () => {
  let component: LoggingComponent;
  let fixture: ComponentFixture<LoggingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [
        LoggingComponent,
        StepHealthComponent,
        StepMedicinaComponent,
        StepPictureComponent,
      ],
      providers: [
        Store,
        {
          provide: AccountService,
          useClass: MockAccountService
        },
        ChatService,
        DailyLogService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
