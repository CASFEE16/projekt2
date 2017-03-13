import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {CoreModule} from '../core/core.module';
import {RouterModule} from '@angular/router';
import {SHOW_ROUTE_CONFIG} from './show-route-config';
import {ShowListComponent} from './show-list/show-list.component';
import { ShowFrontComponent } from './show-front/show-front.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ShowComponent } from './show/show.component';
import {SharedModule} from '../shared/shared.module';
import { ShowAirComponent } from './show-air/show-air.component';
import {PostModule} from '../post/post.module';
import {ShowPostsService} from './shared/show-posts.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild(SHOW_ROUTE_CONFIG),
    PostModule
  ],
  exports: [
    RouterModule,
    ShowFrontComponent
  ],
  declarations: [ShowListComponent, ShowFrontComponent, ShowDetailsComponent, ShowComponent, ShowAirComponent],
  providers: [ShowPostsService]
})
export class ShowModule { }
