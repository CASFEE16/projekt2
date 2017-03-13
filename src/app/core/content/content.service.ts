import { Injectable } from '@angular/core';
import {SpotifyService} from '../spotify/spotify.service';
import {YoutubeService} from '../youtube/youtube.service';
import {Observable} from 'rxjs/Observable';
import {ContentInfo} from '../shared/content.model';
import {YoutubeUtils} from '../youtube/YoutubeUtils';
import {SpotifyUtils} from '../spotify/SpotifyUtils';
import {ContentImplService} from '../shared/content-impl.service';

export class UrlService implements ContentImplService {

  static MAXLEN = 20;

  public getTitle(url: string): Observable<string> {
    if (!url) {
      return Observable.of(null);
    }
    const regex = /http[s]*:\/\/([a-zA-Z0-9_.\-]+)\//i;
    const match = regex.exec(url);
    if (match) {
      return Observable.of(match[1]);
    }
    return Observable.of(url.substr(0, UrlService.MAXLEN) + '...' );
  }
}

export class TextService implements ContentImplService {
  public getTitle(url: string): Observable<string> {
    if (!url) {
      return Observable.of(null);
    }
    return Observable.of(url.substr(0, UrlService.MAXLEN) + '...' );
  }
}

@Injectable()
export class ContentService {

  constructor(
    private youtube: YoutubeService,
    private spotify: SpotifyService
  ) { }

  public getInfo(text: string): Observable<ContentInfo> {

    const contentInfo: ContentInfo = {
      title: null,
      contentUrl: null
    };

    // Find out what content we have to deal with
    let contentService: ContentImplService = null;
    let url: string = null;
    if (text) {
      url = YoutubeUtils.getUrl(text);
      if (url) {
        contentService = this.youtube;
      } else {
        url = SpotifyUtils.getUrl(text);
        if (url) {
          contentService = this.spotify;
        } else {
         if (text && (text.indexOf('http://') >= 0 || text.indexOf('https://')) >= 0) {
           url = text;
          contentService = new UrlService();
         } else {
           url = text;
           contentService = new TextService();
         }
        }
      }
    }

    // Call the content specific service
    if (contentService) {
      return contentService.getTitle(url)
          .map(result => {
            contentInfo.contentUrl = url;
            contentInfo.title = result;
            return contentInfo;
          });
    }

    return Observable.of(contentInfo);
  }

}
