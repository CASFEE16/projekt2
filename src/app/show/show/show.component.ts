import {Component, OnInit, Input} from '@angular/core';
import {Show} from '../shared/show.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {SessionService} from '../../core/firebase/session.service';
import {MdSnackBar} from '@angular/material';
import {MdDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Post} from '../../post/shared/post.model';
import {ShowPostsService} from '../shared/show-posts.service';
import {PostUtils} from '../../post/shared/post-utils.service';
import {ShowService} from '../shared/show.service';
import {DialogService} from '../../shared/dialog.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  providers: [ShowService, ShowPostsService]
})
export class ShowComponent implements OnInit {

  @Input() show: Show = null;
  @Input() live = false;
  posts: Observable<Post[]> = null;
  loggedIn: Observable<boolean> = null;
  postWithFocus: Post = null;
  subscription: Subscription;

  constructor(
    private showService: ShowService,
    private showPostsService: ShowPostsService,
    public  postUtils: PostUtils,
    private sessionService: SessionService,
    private snackbar: MdSnackBar,
    private dialogService: DialogService,
    private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.sessionService.watchLoggedIn();
    this.onPostRefresh();
  }

  onPostRefresh() {
    if (this.live) {
      this.posts = this.showPostsService.findPostsForShow(this.show);
    } else {
      this.showPostsService.findPostsForShow(this.show)
        .first()
        .subscribe(
          result => {
            this.posts = Observable.of(result);
          },
          error => {
            this.snackbar.open(error.message, null, {duration: 2000});
          }
        );
    }
  }

  onDelete(obj: Show) {
    const dialogRef = this.dialogService.confirmDelete(obj.title).subscribe(dialogResult => {
    if (dialogResult) {
        this.showService.delete(obj)
          .first()
          .subscribe(
          result => this.snackbar.open('Show deleted', null, {duration: 2000}),
          error => this.snackbar.open(error.message, null, {duration: 2000})
        );
      }
    });
  }

  onEdit(obj: Show) {
    console.log('EDIT', obj);
    this.router.navigate(['/show', obj['$key']]);
  }

  onAir(obj: Show) {
    this.router.navigate(['/air', obj['$key']]);
  }

  onPostEdit(obj: Post) {
    // this.router.navigate(['/post', editPost['$key']]);
  }

  onPostRemove(obj: Post) {
    const dialogRef = this.dialogService.confirm('Confirm', 'Remove "' + obj.text + '"?').subscribe(dialogResult => {
      if (dialogResult) {
        this.subscription =  this.showPostsService.removeFromShow(obj, this.show)
          .first()
          .subscribe(
          result => {
            console.log('ShowPostsService.removeFromShow', result);
            if (!this.live) {
              this.onPostRefresh();
            }
            this.snackbar.open('Post removed', null, {duration: 2000});
          },
          error => this.snackbar.open(error.message, null, {duration: 2000}),
          () => {
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
          }
        );
      }
    });
  }

  // TODO: What is the best way to show/hide elements on mouse enter/over?

  onMouseEnter(obj: Post) {
    if (this.sessionService.isLoggedIn()) {
      this.postWithFocus = obj;
    }
  }

  onMouseLeave(obj: Post) {
    this.postWithFocus = null;
  }

  showPostActions(obj: Post) {
    return this.postWithFocus === obj;
  }

}
