import {Routes} from "@angular/router";
import {ShowListComponent} from './show-list/show-list.component';
import {ShowDetailsComponent} from './show-details/show-details.component';

export const SHOW_ROUTE_CONFIG: Routes = [
  {
    path: 'show',
    component: ShowListComponent
  },
  {
    path: 'show/:id',
    component: ShowDetailsComponent
    }
];
