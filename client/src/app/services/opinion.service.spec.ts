import { TestBed } from '@angular/core/testing';

import { OpinionService } from './opinion.service';

describe('OpinionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpinionService = TestBed.get(OpinionService);
    expect(service).toBeTruthy();
  });
});
