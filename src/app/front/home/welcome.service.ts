import { Injectable } from '@angular/core';
import {BackendService} from "../../core/firebase/backend.service";
import {Observable} from "rxjs";
import {FirebaseListObservable} from "angularfire2";

@Injectable()
export class WelcomeService {

  constructor(private backendService: BackendService) { }

  public getWelcomeMessages(): FirebaseListObservable<string[]> {
    return this.backendService.list('/items');
  }

}
