import { TestBed, inject } from '@angular/core/testing';

import { ApiBaseService } from './api-base.service';

import { Store } from 'app/core/store/store';

describe('ApiBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Store,
        ApiBaseService,
      ]
    });
  });

  it('should be created', inject([ApiBaseService], (service: ApiBaseService) => {
    expect(service).toBeTruthy();
  }));
});
