/// <reference types="gapi" />
/// <reference types="gapi.youtube" />

import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable, Observer} from "rxjs";

function _window(): any {
  // return the global native browser window object
  return window;
}

function _gapi(): any {
  return _window().gapi;
}

@Injectable()
export class YoutubeService {

  youtubeApiLoaded: boolean = false;

  constructor(private http: Http) {
    console.log(_window());
    console.log(_gapi());
    _gapi().client.setApiKey('AIzaSyCNjUMHsV_64Qgh0LM5xUrHf1RMNJ97PGw');
    _gapi().client.load('youtube', 'v3', () => {
      this.youtubeApiLoaded = true;
      console.log('Youtube API loaded');
    });
  }

  public getVideoInfo(id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
    _gapi().client.youtube.videos.list({part: 'snippet', id: id})
      .then(
        (response) => {
          observer.next(response.result.items[0].snippet);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  handleResult(response: Response): any {
    let formData = response.text()
      .split('&')
      .map(each => each.split('='))
      .map(each => {
        let result = {};
        each.forEach(data => result[data[0]] = data[1]);
        return result;
      });
    console.log(response, formData);
    return formData;
  }

}
