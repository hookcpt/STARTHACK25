import { TestBed } from '@angular/core/testing';

import { ExploreInsightsService } from './explore-insights.service';

describe('ExploreInsightsService', () => {
  let service: ExploreInsightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreInsightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
