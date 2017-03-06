import {Observable} from "rxjs";
export interface ContentImplService {
  getTitle(url: String): Observable<string>;
}
