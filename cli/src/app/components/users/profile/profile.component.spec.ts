import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileComponent } from './profile.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import { AccountService, UserService, ChatService } from 'app/core/services/api';
import { MockAccountService, MockUserService } from 'testing/api';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule],
        declarations: [ProfileComponent],
        providers: [
          Store,
          {
            provide: AccountService,
            useClass: MockAccountService,
          },
          {
            provide: UserService,
            useClass: MockUserService,
          },
          ChatService,
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
