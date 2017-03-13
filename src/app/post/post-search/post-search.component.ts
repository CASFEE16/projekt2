import { Component, OnInit } from '@angular/core';
import {PostType, PostTypes, Post} from '../shared/post.model';
import {PostListService} from "../shared/post-list.service";
import {Observable} from 'rxjs/Observable';
import {PostShowListEntry} from "../shared/post-show.model";

interface Search {
  text: string;
  type: PostType;
}

@Component({
  selector: 'app-post-search',
  templateUrl: 'post-search.component.html',
  styleUrls: ['post-search.component.css'],
  providers: [PostListService]
})
export class SearchComponent implements OnInit {

  search: Search;
  typeList: PostType[];
  posts: Observable<PostShowListEntry[]> = null;
  loading = false;

  constructor(private postService: PostListService) { }

  ngOnInit() {
    this.search = {
      text: '',
      type: PostType.Note
    };
    this.typeList = PostTypes.list();
    this.onSubmit();
  }

  onTextChanged(event: string) {

  }

  onTypeChanged(event: any) {
    this.onSubmit();
  }

  onSubmit() {
    this.loading = true;
    this.posts = this.postService.findQuery({
      limitToLast: 100,
      orderByChild: 'type',
      equalTo: this.search.type
    })
      .do(each => this.loading = false)
      .first()
      .map(result => this.filter(result));
  }

  filter(queryResult: PostShowListEntry[]): PostShowListEntry[] {
    if (this.search.text) {
      return queryResult.filter(each => each.post.text.indexOf(this.search.text) >= 0 ? true : false);
    }
    return queryResult;
  }

}
