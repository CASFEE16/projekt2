import {Observable} from 'rxjs/Observable';
export interface ContentImplService {
  getTitle(url: String): Observable<string>;
}
