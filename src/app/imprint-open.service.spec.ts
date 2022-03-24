import { TestBed } from '@angular/core/testing';

import { ImprintOpenService } from './imprint-open.service';

describe('ImprintOpenService', () => {
  let service: ImprintOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImprintOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
