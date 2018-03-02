import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import {
  AccountService,
  ChatService,
 } from 'app/core/services/api';
import { StepEmailComponent } from './step-email.component';
import { MockAccountService } from 'testing/api';
import { FormatToJapaneseDatePipe } from 'app/shared/pipes';

declare var window: any;

describe('StepEmailComponent', () => {
  let component: StepEmailComponent;
  let fixture: ComponentFixture<StepEmailComponent>;

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
        StepEmailComponent,
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
    fixture = TestBed.createComponent(StepEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
