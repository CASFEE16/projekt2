import {Component, OnInit, OnDestroy} from '@angular/core';
import {Show} from "../shared/show.model";
import {ShowDetailsService} from "./show-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {Post} from "../../post/shared/post.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-show-edit',
  templateUrl: 'show-details.component.html',
  styleUrls: ['show-details.component.css'],
  providers: [ShowDetailsService]
})
export class ShowDetailsComponent implements OnInit, OnDestroy {

  show: Show = null;
  posts: Observable<Post[]> = null;
  postsToRemove: Post[] = [];
  routeSubscription = null;

  constructor(private showDetailsService: ShowDetailsService, private route: ActivatedRoute, private router: Router, private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.show = new Show();
    this.routeSubscription = this.route.params.subscribe(params => {
      this.showDetailsService.get(params['id']).subscribe(show => {
        // Only get the data we want to edit
        this.show.date = show.date;
        this.show.title = show.title;
        this.posts = this.showDetailsService.findPostsForShow(show);
      });
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

    this.showDetailsService.save(this.show)
      .subscribe(
        (result) => {
          this.snackbar.open('Show saved', null, {duration: 2000})
          this.router.navigate(['/show'])
          },
        (error) => this.snackbar.open(error.message, null, {duration: 2000})
      );
  }

  public onCancel() {
    this.router.navigate(['/show']);
  }

  public onRemovePost(post: Post) {
    if (this.postsToRemove.indexOf(post) >= 0) {
      this.postsToRemove.splice(this.postsToRemove.indexOf(post), 1);
    } else {
      this.postsToRemove.push(post);
    }
  }

  public getPostClass(post): string {
    if (this.postsToRemove.indexOf(post) >= 0) {
      return 'post-removed';
    }
    return '';
  }

}
