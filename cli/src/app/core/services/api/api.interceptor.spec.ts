import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiInterceptor } from './api.interceptor';
import { Store } from 'app/core/store/store';
import { ApiBaseService } from 'app/core/services/api/api-base.service';

describe('ApiInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ApiInterceptor, Store, ApiBaseService],
    });
  });

  it(
    'should be created',
    inject([ApiInterceptor], (service: ApiInterceptor) => {
      expect(service).toBeTruthy();
    }),
  );
});
