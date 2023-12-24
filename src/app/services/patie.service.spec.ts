import { TestBed } from '@angular/core/testing';

import { PatieService } from './patie.service';

describe('PatieService', () => {
  let service: PatieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
