import { TestBed } from '@angular/core/testing';

import { SgmmLevel3IssuesService } from './sgmm-level3-issues.service';

describe('SgmmLevel3IssuesService', () => {
  let service: SgmmLevel3IssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgmmLevel3IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
