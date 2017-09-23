import { TestBed, inject } from '@angular/core/testing';

import { ApiInterceptor } from './api.interceptor';
import { Store } from 'app/shared/store/store';

describe('ApiInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiInterceptor,
        Store,
      ]
    });
  });

  it('should be created', inject([ApiInterceptor], (service: ApiInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
