import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BuildInfo} from '../../../app/core/build/build-info.service';

@Injectable()
export class MockBuildInfoService {

  private cache: BuildInfo = {
    version: '0.0.0',
    build: 0
  };

  constructor(private http: Http) { }

  public load(): Observable<BuildInfo> {
      return Observable.of(this.cache);
  }

}
