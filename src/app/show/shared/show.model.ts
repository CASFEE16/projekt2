export class Show {
  id: number;
  title: string;
  user?: string;
  ts?: any;
  dt?: string;
  sortKey?: number;

  get date(): string {
    return this.dt;
  }
}

export class ShowContent {
  id: number;
  post_id: number;
}

