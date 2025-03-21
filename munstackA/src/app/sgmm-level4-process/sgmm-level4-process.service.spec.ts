import { TestBed } from '@angular/core/testing';

import { SgmmLevel4ProcessService } from './sgmm-level4-process.service';

describe('SgmmLevel4ProcessService', () => {
  let service: SgmmLevel4ProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgmmLevel4ProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
