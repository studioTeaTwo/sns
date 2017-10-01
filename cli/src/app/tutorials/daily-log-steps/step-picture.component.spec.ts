import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StepPictureComponent } from './step-picture.component';

import { SharedModule } from 'app/shared/shared.module';
import { Store } from 'app/shared/store/store';
import {
  AccountService,
  ChatService,
  DailyLogService,
 } from 'app/shared/services/api';

describe('StepPictureComponent', () => {
  let component: StepPictureComponent;
  let fixture: ComponentFixture<StepPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [ StepPictureComponent ],
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
    fixture = TestBed.createComponent(StepPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
