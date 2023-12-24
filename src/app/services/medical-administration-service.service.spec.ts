import { TestBed } from '@angular/core/testing';

import { MedicalAdministrationServiceService } from './medical-administration-service.service';

describe('MedicalAdministrationServiceService', () => {
  let service: MedicalAdministrationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalAdministrationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
