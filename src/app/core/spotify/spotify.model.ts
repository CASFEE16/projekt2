/*
 * This is only a selection of all types and properties that Spotify does support.
 * See https://developer.spotify.com/web-api
 */

export class SpotifyUri {

  app = 'spotify';
  type: string;
  id: string;

  constructor(type: string, id: string) {
    this.type = type;
    this.id = id;
  }

  toString(): string {
    return this.app + ':' + this.type + ':' + this.id;
  }

}

export interface Spotify {
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Artist extends Spotify {
  name: string;
}

export interface Album extends Spotify {
  name: string;
  artists: Artist[];
  album_type: string;
  release_date: string;
}

export interface Track extends Spotify {
  name: string;
  album: Album;
  artists: Artist[];
  disc_number: number;
  track_number: number;
  explicit: boolean;
}

