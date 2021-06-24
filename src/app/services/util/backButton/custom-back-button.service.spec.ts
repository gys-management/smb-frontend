import { TestBed } from '@angular/core/testing';

import { CustomBackButtonService } from './custom-back-button.service';

describe('CustomBackButtonService', () => {
  let service: CustomBackButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomBackButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
