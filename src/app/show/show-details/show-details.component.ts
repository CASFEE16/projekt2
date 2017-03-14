import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Show} from '../shared/show.model';
import {ShowDetailsService} from './show-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {Post} from '../../post/shared/post.model';
import {ShowPostsService} from '../shared/show-posts.service';
import {PostUtils} from '../../post/shared/post-utils.service';
import {CanComponentDeactivate} from '../../shared/can-deactivate-guard.service';
import {Observable} from 'rxjs/Observable';
import {DialogService} from '../../shared/dialog.service';

@Component({
  selector: 'app-show-edit',
  templateUrl: 'show-details.component.html',
  styleUrls: ['show-details.component.css'],
  providers: [ShowDetailsService, ShowPostsService]
})
export class ShowDetailsComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  show: Show = null;
  posts: Post[] = [];
  postsToRemove: Post[] = [];
  routeSubscription = null;
  dirty = false;

  @ViewChild('form') form: any;

  constructor(
    private showDetailsService: ShowDetailsService,
    private showPostsService: ShowPostsService,
    public postUtils: PostUtils,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.show = new Show();
    this.routeSubscription = this.route.params.subscribe(params => {
      this.showDetailsService.get(params['id']).subscribe(show => {
        // Only get the data we want to edit
        this.show.date = show.date;
        this.show.title = show.title;
        this.show.description = show.description;
        this.showPostsService.findPostsForShow(show).take(1).subscribe(result => this.posts = result);
      });
    });
    this.form.valueChanges.subscribe((value: any) => {
      if (this.form.dirty) {
        this.dirty = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    this.showDetailsService.save(this.show)
      .subscribe(
        (result) => {
          this.snackbar.open('Show saved', null, {duration: 2000});
          this.showDetailsService.updatePosts(this.posts, this.postsToRemove).subscribe(
            (updatePostsResult) => {
              this.snackbar.open('Posts updated', null, {duration: 2000});
            },
            (error) => {
              this.snackbar.open(error.message, null, {duration: 2000});
            },
            () => {
              // this.location.back();
            }
          );
        },
        (error) => this.snackbar.open(error.message, null, {duration: 2000})
      );
  }

  public onCancel() {
    this.location.back();
  }

  public onRemovePost(post: Post) {
    if (this.postsToRemove.indexOf(post) >= 0) {
      this.postsToRemove.splice(this.postsToRemove.indexOf(post), 1);
    } else {
      this.postsToRemove.push(post);
    }
    this.dirty = true;
  }

  public onMovePostUp(post: Post) {
    const idx = this.posts.findIndex(each => each === post);
    if (idx < 0 || idx === 0) {
      return;
    }
    const previousPost = this.posts[idx - 1];
    this.posts[idx - 1] = post;
    this.posts[idx] = previousPost;
    this.dirty = true;
  }

  public onMovePostDown(post: Post) {
    const idx = this.posts.findIndex(each => each === post);
    if (idx < 0 || idx >= this.posts.length - 1) {
      return;
    }
    const nextPost = this.posts[idx + 1];
    this.posts[idx + 1] = post;
    this.posts[idx] = nextPost;
    this.dirty = true;
  }

  public getPostClass(post): string {
    if (this.postsToRemove.indexOf(post) >= 0) {
      return 'post-removed';
    }
    return '';
  }


  public canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.dirty) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirmDiscardChanges();
  }

}
