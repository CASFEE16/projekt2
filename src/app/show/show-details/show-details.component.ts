import {Component, OnInit, OnDestroy} from '@angular/core';
import {Show} from "../shared/show.model";
import {ShowDetailsService} from "./show-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-show-edit',
  templateUrl: 'show-details.component.html',
  styleUrls: ['show-details.component.css'],
  providers: [ShowDetailsService]
})
export class ShowDetailsComponent implements OnInit, OnDestroy {

  show: Show = null;
  routeSubscription = null;

  constructor(private showDetailsService: ShowDetailsService, private route: ActivatedRoute, private router: Router, private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.show = new Show();
    this.routeSubscription = this.route.params.subscribe(params => {
      this.showDetailsService.get(params['id']).subscribe(show => {
        // Only get the data we want to edit
        this.show.date = show.date;
        this.show.title = show.title;
      });
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    this.showDetailsService.save(this.show)
      .subscribe(
        (result) => this.router.navigate(['/show']),
        (error) => this.snackbar.open(error.message)
      );
  }

  public onCancel() {
    this.router.navigate(['/show']);
  }

}
