export class Post {

  public Post() {
    this.text = '';
    this.type = PostType.Note;
  }

  id: number;
  text: string;
  type?: PostType;
  date?: string;
  user?: string;
  ts?: number;
  sortKey?: number;
  show_id?: number;
}

export enum PostType {
  Note,
  Album,
  Movie,
  MusicVideo,
  Web
}

export interface PostTypeEntry {
  value: string;
  label: string;
}

export class PostTypes {

  static icon(type: PostType): string {
    switch (type) {
      case PostType.Album:
        return 'album';
      case PostType.Movie:
        return 'movie';
      case PostType.MusicVideo:
        return 'music_video';
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
