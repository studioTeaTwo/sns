import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

import { Store } from 'app/shared/store/store';
import {
  ApiBaseService,
  AccountService,
} from 'app/shared/services/api';
import { MockAccountService } from 'app/mock/api/mock-account-service';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        AuthGuard,
        Store,
        ApiBaseService,
        {
          provide: AccountService,
          useClass: MockAccountService
        },
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
