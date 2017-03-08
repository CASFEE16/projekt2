import {Component, OnInit, OnDestroy} from '@angular/core';
import {Show} from "../shared/show.model";
import {ShowDetailsService} from "../show-details/show-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {Post} from "../../post/shared/post.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-show-air',
  templateUrl: './show-air.component.html',
  styleUrls: ['./show-air.component.css'],
  providers: [ShowDetailsService]
})
export class ShowAirComponent implements OnInit {


  show: Show = null;
  posts: Observable<Post[]> = null;
  onAir: boolean = false;
  currentDateTime: Date = new Date();
  routeSubscription = null;

  constructor(private showDetailsService: ShowDetailsService, private route: ActivatedRoute, private router: Router, private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.showDetailsService.get(params['id']).subscribe(show => {
        this.show = show;
        this.posts = this.showDetailsService.findPostsForShow(show);
      });
    });
    setInterval(() => {
      this.currentDateTime =  new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    this.onAir = true;
  }

  public onCancel(event: Event) {
    event.preventDefault();
    this.onAir = false;
  }

  public onDonePost(post: Post) {

  }

}
