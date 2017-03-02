import { Component, OnInit } from '@angular/core';
import {PostType, PostTypes} from "../../post/shared/post.model";

interface Search {
  text: string;
  type: PostType;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: Search;
  typeList: PostType[];

  constructor() { }

  ngOnInit() {
    this.search = {
      text: '',
      type: null
    };
    this.typeList = PostTypes.list();
  }

  onTextChanged(event: string) {

  }

  onSubmit() {

  }

}
