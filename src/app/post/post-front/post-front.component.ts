import { Component, OnInit } from '@angular/core';
import {PostService, PostShowListEntry} from "../shared/post.service";
import {Observable} from "rxjs";
import {Post, PostTypes, PostType} from "../shared/post.model";
import {FirebaseListObservable} from "angularfire2";
import {MdSnackBar} from "@angular/material";
import {BackendService} from "../../core/firebase/backend.service";
import {ShowService} from "../../show/shared/show.service";
import {Show} from "../../show/shared/show.model";

@Component({
  selector: 'app-post-front',
  templateUrl: './post-front.component.html',
  styleUrls: ['./post-front.component.css'],
  providers: [PostService, ShowService]
})
export class PostFrontComponent implements OnInit {

  post: Post = null;
  posts: Observable<PostShowListEntry[]> = null;
  shows: Observable<Show[]> = null;
  loading: boolean = true;
  typeList: any[];

  constructor(private postService: PostService, private showService: ShowService, private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.post = new Post();
    this.post.type = PostType.Note;
    this.typeList = PostTypes.list();

    this.showService.findUpcoming()
      .subscribe(result => {
        this.shows = Observable.of(result);
      });

    this.posts = this.postService.findFront()
      .do(each => this.loading = false);

  }

  getIcon(obj: Post) {
    return PostTypes.icon(obj.type);
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

  onSelectShow(post: Post, show: Show) {
    this.postService.setShow(post, show).subscribe(
      result => console.log(result),
      error => this.snackbar.open(error.message)
    );
  }

}
