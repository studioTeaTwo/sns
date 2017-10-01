import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StepHealthComponent } from './step-health.component';

import { SharedModule } from 'app/shared/shared.module';
import { Store } from 'app/shared/store/store';
import {
  AccountService,
  ChatService,
  DailyLogService,
 } from 'app/shared/services/api';

describe('DailyLogHealthComponent', () => {
  let component: StepHealthComponent;
  let fixture: ComponentFixture<StepHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [ StepHealthComponent ],
      providers: [
        Store,
        AccountService,
        ChatService,
        DailyLogService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
