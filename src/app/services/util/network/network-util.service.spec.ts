import { TestBed } from '@angular/core/testing';

import { NetworkUtilService } from './network-util.service';

describe('NetworkUtilService', () => {
  let service: NetworkUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
