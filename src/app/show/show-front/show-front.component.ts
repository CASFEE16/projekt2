import { Component, OnInit } from '@angular/core';
import {ShowListService, ShowWithPosts} from '../shared/show-list.service';
import {Show} from '../shared/show.model';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../../core/firebase/session.service';
import {Router} from '@angular/router';
import {ShowPostsService} from '../shared/show-posts.service';
import {PostUtils} from '../../post/shared/post-utils.service';

@Component({
  selector: 'app-show-front',
  templateUrl: './show-front.component.html',
  styleUrls: ['./show-front.component.css'],
  providers: [ShowListService, ShowPostsService]
})
export class ShowFrontComponent implements OnInit {

  shows: Observable<Show[]> = null;
  loading = true;
  loggedIn: Observable<boolean>;

  constructor(
    private showService: ShowListService,
    private sessionService: SessionService,
    public postUtils: PostUtils,
    private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.sessionService.watchLoggedIn();
    this.shows = this.showService.findUpcoming()
      .do(each => this.loading = false);
  }

  onEdit(obj: Show) {
    this.router.navigate(['/show', obj['$key']]);
  }

  onAir(obj: Show) {
    this.router.navigate(['/air', obj['$key']]);
  }

}
