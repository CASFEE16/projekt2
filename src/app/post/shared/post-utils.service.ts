import { Injectable } from '@angular/core';
import {Post, PostType, PostTypes} from "./post.model";
import {YoutubeUtils} from "../../core/youtube/YoutubeUtils";
import {SpotifyUtils} from "../../core/spotify/SpotifyUtils";

@Injectable()
export class PostUtils {

  youtubeURL(post: Post) {
    let url = YoutubeUtils.getEmbedUrl(YoutubeUtils.getId(post.text));
    if (url) {
      return url;
    }
    url = YoutubeUtils.getEmbedUrl(YoutubeUtils.getId(post.content));
    return url;
  }

  spotifyURL(post: Post) {
    let url = SpotifyUtils.getEmbedUrl(SpotifyUtils.getId(post.content));
    if (url) {
      url = url + '&theme=white&view=coverart';
    }
    return url;
  }

  webURL(post: Post) {
    if (post.type == PostType.Web) {
      return post.content;
    }
    return null;
  }

  getIcon(obj: Post) {
    return PostTypes.icon(obj.type);
  }
}
