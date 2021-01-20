import { TestBed } from '@angular/core/testing';

import { DatabseService } from './databse.service';

describe('DatabseService', () => {
  let service: DatabseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
