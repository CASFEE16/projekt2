import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit} from "@angular/core";

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() rating: number;
  @Input() disabled: boolean = false;
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

  get ratingClass(): string {
    if (this.disabled) {
      return 'rating disabled';
    } else {
      return 'rating enabled';
    }
  }

  ngOnInit() {
  }

  onClick(rating: number): void {
    if (!this.disabled) {
      this.rating = rating;
      this.onChanged.emit(this.rating);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes['rating'].currentValue);
  }

}
