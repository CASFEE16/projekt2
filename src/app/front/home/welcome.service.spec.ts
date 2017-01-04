/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WelcomeService } from './welcome.service';
import {Observable} from "rxjs";
import {BackendService} from "../../core/firebase/backend.service";

const data: any = [{1: 'Test'}];

class MockBackendService {
  public list(resource: string): Observable<any> {
    return Observable.of(data);
  }
}

describe('WelcomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: BackendService, useClass: MockBackendService},
        WelcomeService
      ]
    });
  });

  it('should ...', inject([WelcomeService, BackendService], (service: WelcomeService) => {
    expect(service).toBeTruthy();
  }));
});
