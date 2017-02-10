export class Post {
  id: number;
  text: string;
  user?: string;
  ts?: any;
  dt?: string;
  sortKey?: number;

  get date(): Date {
    return new Date(Date.parse(this.dt));
  }
}
