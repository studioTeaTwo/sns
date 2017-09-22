import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MasterDataService } from './master-data.service';

import { Store } from 'app/shared/store/store';

describe('MasterDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        Store,
        MasterDataService,
      ]
    });
  });

  it('should be created', inject([MasterDataService], (service: MasterDataService) => {
    expect(service).toBeTruthy();
  }));
});
