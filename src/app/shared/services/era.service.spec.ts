import { TestBed } from '@angular/core/testing';

import { EraService } from './era.service';

describe('EraService', () => {
  let service: EraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
