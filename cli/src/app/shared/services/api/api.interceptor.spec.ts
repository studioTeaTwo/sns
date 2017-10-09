import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiInterceptor } from './api.interceptor';
import { Store } from 'app/shared/store/store';
import { ApiBaseService } from 'app/shared/services/api/api-base.service';

describe('ApiInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        ApiInterceptor,
        Store,
        ApiBaseService,
      ]
    });
  });

  it('should be created', inject([ApiInterceptor], (service: ApiInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
