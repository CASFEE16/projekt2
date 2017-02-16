import { Component, OnInit } from '@angular/core';
import {ShowService} from "../shared/show.service";
import {BackendService} from "../../core/firebase/backend.service";
import {Show} from "../shared/show.model";
import {Observable} from "rxjs";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-show-edit',
  templateUrl: 'shows.component.html',
  styleUrls: ['shows.component.css'],
  providers: [BackendService, ShowService]
})
export class ShowsComponent implements OnInit {

  newShow: Show = null;
  shows: Observable<Show[]> = null;
  loading: boolean = true;

  constructor(private showService: ShowService, private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.newShow = this.showService.newDefault();
    this.shows = this.showService.findAll()
      .do(each => this.loading = false);
  }

  onSubmit() {
    this.showService.add(this.newShow).subscribe(
      result => {this.newShow = this.showService.newDefault()},
      error => {this.snackbar.open(error.message)}
    );
  }

  onDelete(obj: Show) {
    this.showService.delete(obj).subscribe(
      result => console.log(result),
      error => this.snackbar.open(error.message)
    );
  }

  onEdit(obj: Show) {

  }

}
