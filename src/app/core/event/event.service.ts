import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';

export interface IEvent {
  name: string;
  data: any;
}

@Injectable()
export class EventService {

  public event: ReplaySubject<IEvent> = new ReplaySubject();

  constructor() { }

  public send(name: string, data?: any) {
    this.event.next({name: name, data: data});
  }

}
