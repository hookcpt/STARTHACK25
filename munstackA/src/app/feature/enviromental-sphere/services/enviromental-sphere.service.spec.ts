import { TestBed } from '@angular/core/testing';

import { EnviromentalSphereService } from './enviromental-sphere.service';

describe('EnviromentalSphereService', () => {
  let service: EnviromentalSphereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviromentalSphereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
