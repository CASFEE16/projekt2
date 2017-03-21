import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ShowListService} from "../../../app/show/shared/show-list.service";
import {Show} from "../../../app/show/shared/show.model";
import {BackendService} from "../../../app/core/firebase/backend.service";
import {SessionService} from "../../../app/core/firebase/session.service";

@Injectable()
export class ShowListMockService extends ShowListService {

  constructor(backend: BackendService, session: SessionService) {
    super(backend, session);
  }

  public add(show: Show): Observable<Show> {
    return Observable.of(show);
  }

  public delete(show: Show): Observable<Show> {
    return Observable.of(show);
  }

}
