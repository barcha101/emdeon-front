import { TestBed } from '@angular/core/testing';

import { CptService } from './cpt.service';

describe('CptService', () => {
  let service: CptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
