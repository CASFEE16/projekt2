import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Album, Track} from './spotify.model';
import {ContentImplService} from '../shared/content-impl.service';
import {SpotifyUtils} from './SpotifyUtils';

@Injectable()
export class SpotifyService implements ContentImplService {

  constructor(private http: Http) { }

  private spotifyBaseApiUrl() {
    return 'https://api.spotify.com/v1';
  }

  public getAlbum(id: string): Observable<Album> {
    return this.http
      .get(this.spotifyBaseApiUrl() + '/albums/' + id)
      .map((response) => <Album>response.json());
  }

  public getTrack(id: string): Observable<Track> {
    return this.http
      .get(this.spotifyBaseApiUrl() + '/tracks/' + id)
      .map((response) => <Track>response.json());
  }

  public getTitle(url: string): Observable<string> {
    const uri = SpotifyUtils.getUri(url);
    if (uri.type === 'album') {
      return this.getAlbum(uri.id).map( (album) => album.name + ' / ' + album.artists[0].name + ' / ' + album.release_date);
    }
    if (uri.type === 'track') {
      return this.getTrack(uri.id).map( (track) => track.name);
    }
    return Observable.of(null);
  }

}
