import { Component, OnInit } from '@angular/core';
import {ShowService} from "../shared/show.service";
import {Show, SHOWS_RESOURCE_PATH} from "../shared/show.model";
import {Observable} from "rxjs";
import {MdSnackBar, MdDialog} from "@angular/material";
import {SessionService} from "../../core/firebase/session.service";

@Component({
  selector: 'app-show-edit',
  templateUrl: 'show-list.component.html',
  styleUrls: ['show-list.component.css'],
  providers: [ShowService]
})
export class ShowListComponent implements OnInit {

  newShow: Show = null;
  shows: Observable<Show[]> = null;
  loading: boolean = true;
  loggedIn: Observable<boolean> = null;

  constructor(
    private showService: ShowService,
    private sessionService: SessionService,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.loggedIn = this.sessionService.watchLoggedIn();
    if (this.loggedIn) {
      this.newShow = this.showService.newDefault();
    }
    this.shows = this.showService.findAll()
      .do(each => this.loading = false);
  }

  onSubmit() {
    this.showService.add(this.newShow).subscribe(
      result => {this.newShow = this.showService.newDefault()},
      error => {this.snackbar.open(error.message)}
    );
  }

}
