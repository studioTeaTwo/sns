import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminGuard } from './admin.guard';
import { AccountService } from 'app/core/services/api';
import { MockAccountService } from 'testing/api';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AdminGuard,
        {
          provide: AccountService,
          useClass: MockAccountService,
        },
      ],
    });
  });

  it(
    'should ...',
    inject([AdminGuard], (guard: AdminGuard) => {
      expect(guard).toBeTruthy();
    }),
  );
});
