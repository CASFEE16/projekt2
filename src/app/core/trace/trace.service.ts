import { Injectable } from '@angular/core';

@Injectable()
export class TraceService {

  enabled = true;

  constructor() { }

  public log(cmp: string, msg: string, ...params) {
    if (this.enabled) {
      console.log('[' + cmp + '] ' + msg, params);
    }
  }

}
