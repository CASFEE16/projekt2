/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackendService } from './backend.service';
import {Observable} from "rxjs";
import { AngularFire } from 'angularfire2';
import {RegistrationService} from "./registration.service";

describe('RegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationService]
    });
  });

  it('should ...', inject([RegistrationService], (service: RegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
