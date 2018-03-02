import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FeedService } from './feed.service';

import { Store } from 'app/core/store/store';

describe('FeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedService, Store],
    });
  });

  it(
    'should be created',
    inject([FeedService], (service: FeedService) => {
      expect(service).toBeTruthy();
    }),
  );
});
