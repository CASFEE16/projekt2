import { Injectable } from '@angular/core';
import {SpotifyService} from "../spotify/spotify.service";
import {YoutubeService} from "../youtube/youtube.service";
import {Observable} from "rxjs";
import {ContentInfo} from "../shared/content.model";
import {YoutubeUtils} from "../youtube/YoutubeUtils";
import {SpotifyUtils} from "../spotify/SpotifyUtils";
import {ContentImplService} from "../shared/content-impl.service";

@Injectable()
export class ContentService {

  constructor(
    private youtube: YoutubeService,
    private spotify: SpotifyService
  ) { }

  public getInfo(text: string): Observable<ContentInfo> {

    let contentInfo: ContentInfo = {
      title: null,
      contentUrl: null
    };

    // Find out what content we have to deal with
    let contentService: ContentImplService = null;
    let url = YoutubeUtils.getUrl(text);
    if (url) {
      contentService = this.youtube;
    } else {
      url = SpotifyUtils.getUrl(text);
      if (url) {
        contentService = this.spotify;
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
