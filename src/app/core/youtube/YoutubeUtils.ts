/*
 * Parse text for Youtube IDs:
 * - https://www.youtube.com/watch?v=f2nuBKeRoeM
 */
export class YoutubeUtils {

  public static getId(text: string): string {
    if (!text) return null;

    let regex = /www.youtube.com\/watch\?v=([0-9a-zA-Z]+)/i;
    let match = regex.exec(text);
    if (match) {
      return match[1];
    }

    regex = /youtu.be\/([0-9a-zA-Z]+)/i;
    match = regex.exec(text);
    if (match) {
      return match[1];
    }

    return null;
  }

  public static getEmbedUrl(id: string) {
    if (!id) {
      return null;
    }
    return 'https://www.youtube.com/embed/' + id;
  }

  public static getUrl(text: string): string {
    if (!text) return null;
    let regex = /(http[s]*:\/\/www.youtube.com\/watch\?v=[0-9a-zA-Z]+)/i;
    let match = regex.exec(text);
    if (match) {
      return match[1];
    }
    regex = /(http[s]*:\/\/youtu.be\/[0-9a-zA-Z]+)/i;
    match = regex.exec(text);
    if (match) {
      return match[1];
    }
    return null;
  }

}
