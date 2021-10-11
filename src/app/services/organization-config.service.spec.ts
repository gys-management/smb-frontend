import { TestBed } from '@angular/core/testing';

import { OrganizationConfigService } from './organization-config.service';

describe('OrganizationConfigService', () => {
  let service: OrganizationConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
