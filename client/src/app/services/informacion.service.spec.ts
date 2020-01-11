import { TestBed } from '@angular/core/testing';

import { InformacionService } from './informacion.service';

describe('InformacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformacionService = TestBed.get(InformacionService);
    expect(service).toBeTruthy();
  });
});
