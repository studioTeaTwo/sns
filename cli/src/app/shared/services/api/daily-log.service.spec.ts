import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DailyLogService } from './daily-log.service';

import { Store } from 'app/shared/store/store';

describe('DailyLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        DailyLogService,
        Store,
      ]
    });
  });

  it('should be created', inject([DailyLogService], (service: DailyLogService) => {
    expect(service).toBeTruthy();
  }));
});
