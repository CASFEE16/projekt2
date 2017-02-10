import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/post.service";
import {Observable} from "rxjs";
import {Post} from "../shared/post.model";
import {FirebaseListObservable} from "angularfire2";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-post-front',
  templateUrl: './post-front.component.html',
  styleUrls: ['./post-front.component.css'],
  providers: [PostService]
})
export class PostFrontComponent implements OnInit {

  post: Post = new Post();
  posts: Observable<Post[]> = null;
  loading: boolean = true;

  constructor(private postService: PostService, private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.post.text = '';
    this.posts = this.postService.findFront()
      .do(each => this.loading = false);
  }

  onSubmit() {
    let obs: FirebaseListObservable<Post[]> = <FirebaseListObservable<Post[]>>this.posts;
    obs.push(this.post)
      .catch(error => {
        this.snackbar.open(error.message);
      })
      .then(result => console.log(result));
  }

  onDelete(deletePost: Post) {
    let obs: FirebaseListObservable<Post[]> = <FirebaseListObservable<Post[]>>this.posts;
    obs.remove(deletePost['$key'])
      .catch(error => {
        this.snackbar.open(error.message);
      })
      .then(result => console.log(result));
  }

}
