import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

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

    let file = '/public/build.json';
    if (environment.production) {
      file = '/build.json';
    }

    return this.http
      .get(file)
      .map((result) => {
        this.cache = result.json();
        return this.cache;
      });
  }

}
