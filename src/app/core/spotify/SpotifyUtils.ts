
import {SpotifyUri} from "./spotify.model";

export class SpotifyUtils {

  static regex = /http[s]*:\/\/open.spotify.com\/([a-zA-Z\/]+)\/([0-9a-zA-Z]+)/i;

  // https://open.spotify.com/user/spotify_germany/playlist/3OpgAAPHJRk2rSCz3jTcpp
  // https://open.spotify.com/album/3T4tUhGYeRNVUGevb0wThu
  // https://open.spotify.com/track/7oolFzHipTMg2nL7shhdz2
  public static getUri(text: string): SpotifyUri {
    if (!text) return null;
    let match = SpotifyUtils.regex.exec(text);
    if (!match) {return null;}
    switch(match[1]) {
      case 'album':
        return new SpotifyUri('album', match[2]);
      case 'track':
        return new SpotifyUri('track', match[2]);
    }
    return null;
  }

  public static getId(text: string): string {
    let uri = SpotifyUtils.getUri(text);
    if (!uri) return null;
    return uri.toString();
  }

  // Return Spotify URL for embedded player
  public static getEmbedUrl(id: string) {
    if (!id) {return null;}
    return 'https://embed.spotify.com/?uri=' + id;
  }

  public static getUrl(text: string): string {
    if (!text) return null;
    let match = SpotifyUtils.regex.exec(text);
    if (!match) {return null;}
    return match[0];
  }

}
