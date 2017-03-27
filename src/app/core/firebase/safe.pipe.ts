import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import {YoutubeUtils} from '../youtube/YoutubeUtils';
import {SpotifyUtils} from '../spotify/SpotifyUtils';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    if (YoutubeUtils.isTrusted(url) || SpotifyUtils.isTrusted(url)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return url;
  }
}
