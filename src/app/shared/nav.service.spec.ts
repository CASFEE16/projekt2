import { TestBed, inject } from '@angular/core/testing';

import { NavService } from './nav.service';
import {TestModule} from "../../test/test.module";

describe('NavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        NavService
      ],
      declarations: [
      ]
    }));
  });

  it('should ...', inject([NavService], (service: NavService) => {
    expect(service).toBeTruthy();
  }));
});
