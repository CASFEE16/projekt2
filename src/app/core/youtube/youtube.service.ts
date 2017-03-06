/// <reference types="gapi" />
/// <reference types="gapi.youtube" />

import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable, Observer} from "rxjs";
import {ContentInfo} from "../shared/content.model";
import {YoutubeUtils} from "./YoutubeUtils";
import {ContentImplService} from "../shared/content-impl.service";

function _window(): any {
  // return the global native browser window object
  return window;
}

function _gapi(): any {
  return _window().gapi;
}

@Injectable()
export class YoutubeService implements ContentImplService {

  constructor(private http: Http) {
    if (_gapi() && !_gapi().client) {
      this.loadClientApi();
    } else if (_gapi() && _gapi().client) {
      this.loadYoutubeApi();
    }
  }

  loadClientApi() {
    _gapi().load('client', this.loadYoutubeApi);
  }

  loadYoutubeApi(): void {
    _gapi().client.load('youtube', 'v3', () => {
      _gapi().client.setApiKey('AIzaSyCNjUMHsV_64Qgh0LM5xUrHf1RMNJ97PGw');
      console.log('Youtube API loaded');
    })
  }

  public getTitle(url: string) {
    return this
      .getVideoSnippet(YoutubeUtils.getId(url))
      .map( (snippet) => snippet.title);
  }

  getVideoSnippet(id: string): Observable<any> {
    if (!_gapi() || !_gapi().client || !_gapi().client.youtube) {
      return Observable.of({});
    }
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
