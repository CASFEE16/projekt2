import {Component, OnInit, Input} from '@angular/core';
import {Show} from '../shared/show.model';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../../core/firebase/session.service';
import {MdSnackBar} from '@angular/material';
import {MdDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Post} from '../../post/shared/post.model';
import {SubmitDialogComponent} from '../../shared/submit-dialog/submit-dialog.component';
import {ShowPostsService} from '../shared/show-posts.service';
import {PostUtils} from '../../post/shared/post-utils.service';
import {ShowService} from '../shared/show.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  providers: [ShowService, ShowPostsService]
})
export class ShowComponent implements OnInit {

  @Input() show: Show = null;
  posts: Post[] = [];
  loggedIn: Observable<boolean> = null;

  constructor(
    private showService: ShowService,
    private showPostsService: ShowPostsService,
    public  postUtils: PostUtils,
    private sessionService: SessionService,
    private snackbar: MdSnackBar,
    private dialog: MdDialog,
    private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.sessionService.watchLoggedIn();
    this.showPostsService.findPostsForShow(this.show)
      .take(1)
      .subscribe(
        result => {
          console.log('RESULT', result);
          this.posts = result;
        },
        error => {
          console.log('ERROR', error);
          this.snackbar.open(error.message, null, {duration: 5000});
        }
      );
  }

  onDelete(obj: Show) {
    const dialogRef = this.dialog.open(SubmitDialogComponent);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === 'ok') {
        this.showService.delete(obj).subscribe(
          result => this.snackbar.open('Show deleted', null, {duration: 5000}),
          error => this.snackbar.open(error.message, null, {duration: 5000})
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

}
