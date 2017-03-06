
import {YoutubeUtils} from "../../core/youtube/YoutubeUtils";
import {SpotifyUtils} from "../../core/spotify/SpotifyUtils";
export class Post {

  public Post() {
    this.text = '';
    this.type = PostType.Note;
  }

  text: string;
  content?: string;
  type?: PostType;
  note?: string;
  rating?: number = 0;
  date?: string;
  user?: string;
  ts?: number;
  sortKey?: number;
  show_key?: number;

}

export const POSTS_RESOURCE_PATH: string = '/posts';

export enum PostType {
  Note,
  Music,
  Movie,
  Web
}

export interface PostTypeEntry {
  value: string;
  label: string;
}

export class PostTypes {

  static icon(type: PostType): string {
    switch (type) {
      case PostType.Music:
        return 'album';
      case PostType.Movie:
        return 'movie';
      case PostType.Web:
        return 'web';
      default:
        return 'note';
    }
  }

  static list(): any[] {
    let types: any[] = [];
    for(let n in PostType) {
      if(typeof PostType[n] === 'number') types.push({
        value: PostType[n],
        label: n
      });
    }
    return types;
  }

}

export class ContentDetector {

  getType(text: string): PostType {
    if (ContentDetector.isMovie(text)) {
      return PostType.Movie;
    }
    if (ContentDetector.isMusic(text)) {
      return PostType.Music;
    }
    if (ContentDetector.isWeb(text)) {
      return PostType.Web;
    }
    return PostType.Note;
  }

  static isMovie(text: string): boolean {
    return !!YoutubeUtils.getId(text);
  }

  static isWeb(text: string): boolean {
    return (text.indexOf('http://') >= 0 || text.indexOf('https://') >= 0);
  }

  static isMusic(text: string): boolean {
    return !!SpotifyUtils.getId(text);
  }

}
