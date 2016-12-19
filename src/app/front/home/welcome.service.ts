import { Injectable } from '@angular/core';
import {BackendService} from "../../core/firebase/backend.service";
import {Observable} from "rxjs";

@Injectable()
export class WelcomeService {

  constructor(private backendService: BackendService) { }

  public getWelcomeMessages(): Observable<string[]> {
    return this.backendService.list('/items');
  }

}
