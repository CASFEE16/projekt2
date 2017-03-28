import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface BuildInfo {
  build?: number;
  commit?: string;
  datetime?: string;
  version?: string;
  angular?: string;
  cli?: string;
}

@Injectable()
export class BuildInfoService {

  private cache: BuildInfo = null;

  constructor(private http: Http) { }

  public load(): Observable<BuildInfo> {
    if (this.cache) {
      return Observable.of(this.cache);
    }
    return this.http
      .get('/public/build.json')
      .map((result) => {
        this.cache = result.json();
        return this.cache;
      });
  }

}
