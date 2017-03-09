import { Component, OnInit } from '@angular/core';
import {ShowListService, ShowWithPosts} from "../shared/show-list.service";
import {Show} from '../shared/show.model';
import {Observable} from "rxjs";
import {SessionService} from "../../core/firebase/session.service";
import {Router} from "@angular/router";
import {ShowPostsService} from "../shared/show-posts.service";
import {PostUtils} from "../../post/shared/post-utils.service";

@Component({
  selector: 'app-show-front',
  templateUrl: './show-front.component.html',
  styleUrls: ['./show-front.component.css'],
  providers: [ShowListService, ShowPostsService]
})
export class ShowFrontComponent implements OnInit {

  shows: Observable<ShowWithPosts[]> = null;
  loading: boolean = true;
  loggedIn: Observable<boolean>;

  constructor(
    private showService: ShowListService,
    private sessionService: SessionService,
    private postUtils: PostUtils,
    private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.sessionService.watchLoggedIn();
    this.shows = this.showService.findFront()
      .do(each => this.loading = false)
      .do(each => {
          each.forEach(showWithPosts => showWithPosts.posts.do(eachPost => eachPost.sort((a, b) => a.show.index - b.show.index)))
      });
  }

  onEdit(obj: Show) {
    if (!obj) {
      return;
    }
    this.router.navigate(['/show', obj['$key']]);
  }

  onAir(obj: Show) {
    if (!obj) {
      return;
    }
    this.router.navigate(['/air', obj['$key']]);
  }

}
