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
    this.postService.add(this.post).subscribe(
      result => console.log(result),
      error => this.snackbar.open(error.message)
    );
  }

  onDelete(deletePost: Post) {
    this.postService.delete(deletePost).subscribe(
        result => console.log(result),
        error => this.snackbar.open(error.message)
      );
  }

}
