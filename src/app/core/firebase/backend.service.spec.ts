/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackendService } from './backend.service';
import {Observable} from "rxjs";
import { AngularFire } from 'angularfire2';

const data: any = [{1: 'Test'}];

class MockAngularFireDatabase {
  public list(url: string): Observable<any[]> {
    return Observable.of(data);
  }
}

class MockAngularFire {
  database: any = new MockAngularFireDatabase();
}

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService,
        {provide: AngularFire, useClass: MockAngularFire}]
    });
  });

  it('should ...', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
