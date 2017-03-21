import { Injectable } from '@angular/core';
import {Post, PostType, PostTypes} from './post.model';
import {YoutubeUtils} from '../../core/youtube/YoutubeUtils';
import {SpotifyUtils} from '../../core/spotify/SpotifyUtils';

@Injectable()
export class PostUtils {

  public youtubeURL(post: Post) {
    let url = YoutubeUtils.getEmbedUrl(YoutubeUtils.getId(post.text));
    if (url) {
      return url;
    }
    url = YoutubeUtils.getEmbedUrl(YoutubeUtils.getId(post.content));
    return url;
  }

  public spotifyURL(post: Post) {
    let url = SpotifyUtils.getEmbedUrl(SpotifyUtils.getId(post.content));
    if (url) {
      url = url + '&theme=white&view=coverart';
    }
    return url;
  }

  public webURL(post: Post) {
    if (post && post.type === PostType.Web) {
      return post.content;
    }
    return null;
  }

  public getIcon(post: Post) {
    if (!post) {
      return PostTypes.icon(PostType.Note);
    }
    return PostTypes.icon(post.type);
  }

  public getContentTypeString(post: Post): [string, string] {
    let postContentType = null;
    let postContent = null;
    if (post) {
      postContentType = 'youtube';
      postContent = this.youtubeURL(post);
      if (!postContent) {
        postContentType = 'spotify';
        postContent = this.spotifyURL(post);
        if (!postContent) {
          postContentType = 'web';
          postContent = this.webURL(post);
          if (!postContent) {
            postContentType = 'text';
            postContent = post.content;
          }
        }
      }
    }
    return [postContentType, postContent];
  }

}
