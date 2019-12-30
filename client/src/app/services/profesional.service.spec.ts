import { TestBed } from '@angular/core/testing';

import { ProfesionalService } from './profesional.service';

describe('ProfesionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfesionalService = TestBed.get(ProfesionalService);
    expect(service).toBeTruthy();
  });
});
