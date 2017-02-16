import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {CoreModule} from "../core/core.module";
import {RouterModule} from "@angular/router";
import {SHOW_ROUTE_CONFIG} from './show-route-config';
import {ShowListComponent} from "./show-list/show-list.component";
import { ShowFrontComponent } from './show-front/show-front.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CoreModule,
    RouterModule.forChild(SHOW_ROUTE_CONFIG)
  ],
  exports: [
    RouterModule,
    ShowFrontComponent
  ],
  declarations: [ShowListComponent, ShowFrontComponent, ShowDetailsComponent]
})
export class ShowModule { }
