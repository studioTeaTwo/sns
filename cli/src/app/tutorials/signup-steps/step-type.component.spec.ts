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
import { StepTypeComponent } from './step-type.component';
import { MockAccountService } from 'testing/api';
import { FormatToJapaneseDatePipe } from 'app/shared/pipes';

describe('StepTypeComponent', () => {
  let component: StepTypeComponent;
  let fixture: ComponentFixture<StepTypeComponent>;

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
        StepTypeComponent,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
