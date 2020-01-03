import { TestBed } from '@angular/core/testing';

import { TipoProfesionalService } from './tipo-profesional.service';

describe('TipoProfesionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoProfesionalService = TestBed.get(TipoProfesionalService);
    expect(service).toBeTruthy();
  });
});
