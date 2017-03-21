/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {RegistrationService} from './registration.service';
import {TestModule} from "../../../test/test.module";

describe('RegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        RegistrationService
      ],
      declarations: [
      ]
    }));
    TestBed.compileComponents();
  });

  it('should ...', inject([RegistrationService], (service: RegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
