import {YoutubeUtils} from '../../core/youtube/YoutubeUtils';
import {SpotifyUtils} from '../../core/spotify/SpotifyUtils';
import {Model} from '../../core/firebase/model';

export interface ShowRef {
  key: string;
  index: number;
}

export class Post extends Model {
  text: string;
  content?: string;
  type?: PostType;
  note?: string;
  rating? = 0;
  date?: string;
  user?: string;
  ts?: number;
  sortKey?: number;
  show?: ShowRef;

  public constructor() {
    super();
    this.text = '';
    this.type = PostType.Note;
  }

}

export const POSTS_RESOURCE_PATH = '/posts';

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
    const types: any[] = [];
    for (const n in PostType) {
      if (typeof PostType[n] === 'number') {
        types.push({
          value: PostType[n],
          label: n
        });
      }
    }
    return types;
  }

}

export class ContentDetector {

  static isMovie(text: string): boolean {
    return !!YoutubeUtils.getId(text);
  }

  static isWeb(text: string): boolean {
    return (text.indexOf('http://') >= 0 || text.indexOf('https://') >= 0);
  }

  static isMusic(text: string): boolean {
    return !!SpotifyUtils.getId(text);
  }

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

}

export const COMMENTS_RESOURCE_PATH = '/comments';

export class Comment extends Model {
  comment: string;
  date?: string;
  user?: string;
  username?: string;
  ts?: number;
  sortKey?: number;
  post_key: string;

  public constructor(post: Post, comment: string) {
    super();
    this.comment = comment;
    if (post) {
      this.post_key = post['$key'];
    }
  }

}
