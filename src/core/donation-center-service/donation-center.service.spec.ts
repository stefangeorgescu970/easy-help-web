import { TestBed } from '@angular/core/testing';

import { DonationCenterService } from './donation-center.service';

describe('DonationCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonationCenterService = TestBed.get(DonationCenterService);
    expect(service).toBeTruthy();
  });
});
