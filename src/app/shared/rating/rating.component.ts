import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit} from "@angular/core";

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() rating: number;
  @Input() readonly: boolean = false;
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }
  onClick(rating: number): void {
    this.rating = rating;
    if (!this.readonly) {
      this.onChanged.emit(this.rating);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes['rating'].currentValue);
  }

}
