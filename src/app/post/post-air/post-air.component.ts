import {Component, OnInit, Input} from '@angular/core';
import {Post, PostType, PostTypes} from "../shared/post.model";
import {Observable} from "rxjs";
import {MdSnackBarConfig} from "@angular/material";
import {PostUtils} from "../shared/post-utils.service";

@Component({
  selector: 'app-post-air',
  templateUrl: 'post-air.component.html',
  styleUrls: ['post-air.component.css']
})
export class PostAirComponent implements OnInit {

  @Input() post: any = null;
  loggedIn: Observable<boolean> = null;
  snackbarConfig: MdSnackBarConfig = new MdSnackBarConfig();
  done: boolean = false;
  action: string = 'check';

  constructor(private postUtils: PostUtils) { }

  ngOnInit() {
  }

  onClear() {
    if (this.done) {
      this.done = false;
      this.action = 'check';
    } else {
      this.done = true;
      this.action = 'expand_more';
    }
  }

}
