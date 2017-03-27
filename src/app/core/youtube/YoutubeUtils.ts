/*
 * Parse text for Youtube IDs:
 * - https://www.youtube.com/watch?v=f2nuBKeRoeM
 */
export class YoutubeUtils {


  // Extract Youtube ID from Youtube URL
  public static getId(text: string): string {
    if (!text) {
      return null;
    }

    let regex = /www.youtube.com\/watch\?v=([_0-9a-zA-Z-]+)/i;
    let match = regex.exec(text);
    if (match) {
      return match[1];
    }

    regex = /youtu.be\/([_0-9a-zA-Z]+)/i;
    match = regex.exec(text);
    if (match) {
      return match[1];
    }

    return null;
  }

  // Geht the Youtube URL for embedded player for an id
  public static getEmbedUrl(id: string) {
    if (!id) {
      return null;
    }
    return 'https://www.youtube.com/embed/' + id;
  }

  // Look for Youtube URLS in a text
  public static getUrl(text: string): string {
    if (!text) {
      return null;
    }
    let regex = /(http[s]*:\/\/www.youtube.com\/watch\?v=[_0-9a-zA-Z-]+)/i;
    let match = regex.exec(text);
    if (match) {
      return match[1];
    }
    regex = /(http[s]*:\/\/youtu.be\/[_0-9a-zA-Z-]+)/i;
    match = regex.exec(text);
    if (match) {
      return match[1];
    }
    return null;
  }

  public static isTrusted(url: string): boolean {
    return (url && typeof url === 'string' && url.indexOf('https://www.youtube.com/embed/') === 0);
  }

}
