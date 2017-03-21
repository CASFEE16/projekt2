/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SessionService } from './session.service';
import {TestModule} from "../../../test/test.module";

describe('SessionService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        SessionService
      ],
      declarations: []
    }));
  });

  it('should ...', inject([SessionService], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));
});
