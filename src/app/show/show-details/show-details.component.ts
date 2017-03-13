import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Show} from '../shared/show.model';
import {ShowDetailsService} from './show-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {Post} from '../../post/shared/post.model';
import {ShowPostsService} from '../shared/show-posts.service';
import {PostUtils} from '../../post/shared/post-utils.service';

@Component({
  selector: 'app-show-edit',
  templateUrl: 'show-details.component.html',
  styleUrls: ['show-details.component.css'],
  providers: [ShowDetailsService, ShowPostsService]
})
export class ShowDetailsComponent implements OnInit, OnDestroy {

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

    this.postsToRemove.forEach(
      (each) =>
        this.showDetailsService.removePost(each)
          .subscribe(
            (result) => this.snackbar.open('Post removed', null, {duration: 2000}),
            (error) => this.snackbar.open(error.message, null, {duration: 2000})
          )
    );

    this.showDetailsService.updatePosts(this.posts);

    this.showDetailsService.save(this.show)
      .subscribe(
        (result) => {
          this.snackbar.open('Show saved', null, {duration: 2000});
          this.router.navigate(['/show']);
          },
        (error) => this.snackbar.open(error.message, null, {duration: 2000})
      );

    this.location.back();
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

}
