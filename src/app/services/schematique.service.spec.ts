import { TestBed } from '@angular/core/testing';

import { SchematiqueService } from './schematique.service';

describe('SchematiqueService', () => {
  let service: SchematiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchematiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
