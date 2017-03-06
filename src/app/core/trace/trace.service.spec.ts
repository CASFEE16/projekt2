import { TestBed, inject } from '@angular/core/testing';

import { TraceService } from './trace.service';

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TraceService]
    });
  });

  it('should ...', inject([TraceService], (service: TraceService) => {
    expect(service).toBeTruthy();
  }));
});
