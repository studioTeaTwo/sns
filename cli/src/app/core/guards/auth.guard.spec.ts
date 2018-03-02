import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

import { Store } from '../store/store';
import { ApiBaseService, AccountService } from '../services/api';
import { MockAccountService } from 'testing/api';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthGuard,
        Store,
        ApiBaseService,
        {
          provide: AccountService,
          useClass: MockAccountService,
        },
      ],
    });
  });

  it(
    'should ...',
    inject([AuthGuard], (guard: AuthGuard) => {
      expect(guard).toBeTruthy();
    }),
  );
});
