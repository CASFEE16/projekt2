import { Component, OnInit } from '@angular/core';
import {PostType, PostTypes, Post} from '../shared/post.model';
import {PostListService} from '../shared/post-list.service';
import {Observable} from 'rxjs/Observable';
import {PostShowListEntry} from '../shared/post-show.model';
import {Show} from '../../show/shared/show.model';
import {ShowListService} from '../../show/shared/show-list.service';

interface Search {
  text: string;
  type: PostType;
  state: string;
}

@Component({
  selector: 'app-post-search',
  templateUrl: 'post-search.component.html',
  styleUrls: ['post-search.component.css'],
  providers: [PostListService, ShowListService]
})
export class SearchComponent implements OnInit {

  search: Search;
  typeList: PostType[];
  posts: Observable<PostShowListEntry[]> = null;
  shows: Observable<Show[]> = null;
  loading = false;

  constructor(private postService: PostListService, private showService: ShowListService) { }

  ngOnInit() {
    this.search = {
      text: '',
      type: PostType.Note,
      state: 'all'
    };
    this.typeList = PostTypes.list();

    this.showService.findAll()
      .subscribe(result => {
        this.shows = Observable.of(result);
      });

    this.onSubmit();
  }

  onTextChanged(event: string) {

  }

  onTypeChanged(event: any) {
    this.onSubmit();
  }

  onStateChanged(event: any) {
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
      .map(result => this.filterByState(this.filterByText(result)));
  }

  filterByText(queryResult: PostShowListEntry[]): PostShowListEntry[] {
    if (this.search.text) {
      return queryResult.filter(each => each.post.text.toLowerCase().indexOf(this.search.text.toLowerCase()) >= 0 ? true : false);
    }
    return queryResult;
  }

  filterByState(queryResult: PostShowListEntry[]): PostShowListEntry[] {
    if (this.search.state && this.search.state !== 'all') {
      if (this.search.state === 'notscheduled') {
        return queryResult.filter(each => !each.post.show || !each.post.show.key);
      } else {
        return queryResult.filter(each => each.post.show && each.post.show.key);
      }
    }
    return queryResult;
  }

}
