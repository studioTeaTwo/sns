import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { StepMedicinaComponent } from './step-medicina.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import { AccountService, ChatService, DailyLogService } from 'app/core/services/api';
import { MockAccountService } from 'testing/api';
import { FormatToJapaneseDatePipe } from 'app/shared/pipes';

declare var window: any;

describe('StepMedicinaComponent', () => {
  let component: StepMedicinaComponent;
  let fixture: ComponentFixture<StepMedicinaComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          NoopAnimationsModule,
          FormsModule,
          MaterialModule,
        ],
        declarations: [StepMedicinaComponent, FormatToJapaneseDatePipe],
        providers: [
          Store,
          {
            provide: AccountService,
            useClass: MockAccountService,
          },
          ChatService,
          DailyLogService,
        ],
      }).compileComponents();
      window.ga = jasmine.createSpy('ga');
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StepMedicinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
