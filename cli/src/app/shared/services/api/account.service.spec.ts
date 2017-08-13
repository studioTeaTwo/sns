import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';

import { HttpClientModule } from '@angular/common/http';

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AccountService
      ]
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
