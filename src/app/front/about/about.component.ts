import { Component, OnInit } from '@angular/core';
import {BuildInfoService, BuildInfo} from '../../core/build/build-info.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  buildInfo: BuildInfo;

  constructor(private buildInfoService: BuildInfoService) { }

  ngOnInit() {
    this.buildInfoService.load().subscribe(
      (buildInfo) => this.buildInfo = buildInfo
    );
  }

}
