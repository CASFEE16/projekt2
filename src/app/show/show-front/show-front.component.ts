import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../core/firebase/backend.service";
import {ShowService} from "../shared/show.service";
import {Observable} from "rxjs";
import {Show} from "../shared/show.model";

@Component({
  selector: 'app-show-front',
  templateUrl: './show-front.component.html',
  styleUrls: ['./show-front.component.css'],
  providers: [ShowService]
})
export class ShowFrontComponent implements OnInit {

  shows: Observable<Show[]> = null;
  loading: boolean = true;

  constructor(private showService: ShowService) { }

  ngOnInit() {
    this.shows = this.showService.findFront()
      .do(each => this.loading = false);
  }

}
