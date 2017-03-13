import {DateUtils} from '../../shared/DateUtils';

export class Show {
  title: string;    // Title of the show
  description?: string; // Description
  user?: string;    // User who created the show
  date?: string;    // Date of the show in ISO format for storing in database
  ts?: number;      // Timestamp the show was created
  sortKey?: number; // Special sort key for Firebase for sorting by descending date
  // posts: string[];  // Keys of posts for this show (currently this is implemented on posts !!!)

  static newDefault(): Show {
    const show: Show = new Show();
    show.date = DateUtils.todayISOString();
    show.ts = Date.now();
//    show.posts = [];
    return show;
  }

}


export const SHOWS_RESOURCE_PATH = '/shows';

