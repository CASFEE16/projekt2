import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MdSnackBarConfig} from '@angular/material';
import {PostUtils} from '../shared/post-utils.service';

@Component({
  selector: 'app-post-air',
  templateUrl: 'post-air.component.html',
  styleUrls: ['post-air.component.css']
})
export class PostAirComponent implements OnInit {

  @Input() post: any = null;
  loggedIn: Observable<boolean> = null;
  snackbarConfig: MdSnackBarConfig = new MdSnackBarConfig();
  done = false;
  action = 'check';

  constructor(public postUtils: PostUtils) { }

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
