import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { SettingComponent } from './setting.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import { User } from 'app/interfaces/api-models';
import { AccountService } from 'app/core/services/api';
import { MockAccountService } from 'testing/api';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;
  const initialState: User = {
    id: 0, // int32
    email: '',
    name: '',
    selfIntroduction: '',
    rank: 0, // int32
    titleOfHonor: 0, // int32
    classification: 0, // int32
    atopic: false,
    asthma: false,
    rhinitis: false,
    pollen: false,
    gastroenteritis: false,
    conjunctivitis: false,
    avatarUrl: '',
    accessToken: '',
  };

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
        declarations: [SettingComponent],
        providers: [
          Store,
          {
            provide: AccountService,
            useClass: MockAccountService,
          },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    component.account = initialState;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
