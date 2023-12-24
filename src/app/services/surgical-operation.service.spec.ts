import { TestBed } from '@angular/core/testing';

import { SurgicalOperationService } from './surgical-operation.service';

describe('SurgicalOperationService', () => {
  let service: SurgicalOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurgicalOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
