import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { StepPictureComponent } from './step-picture.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import { AccountService, ChatService, DailyLogService } from 'app/core/services/api';
import { MockAccountService } from 'testing/api';
import { FormatToJapaneseDatePipe } from 'app/shared/pipes';

declare var window: any;

describe('StepPictureComponent', () => {
  let component: StepPictureComponent;
  let fixture: ComponentFixture<StepPictureComponent>;

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
        declarations: [StepPictureComponent, FormatToJapaneseDatePipe],
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
    fixture = TestBed.createComponent(StepPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
