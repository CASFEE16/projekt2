import {Routes} from '@angular/router';
import {ShowListComponent} from './show-list/show-list.component';
import {ShowDetailsComponent} from './show-details/show-details.component';
import {ShowAirComponent} from './show-air/show-air.component';
import {AuthGuard} from '../core/auth/AuthGuard';

export const SHOW_ROUTE_CONFIG: Routes = [
  {
    path: 'show',
    component: ShowListComponent
  },
  {
    path: 'show/:id',
    component: ShowDetailsComponent,
    canActivate: [AuthGuard]
    },
  {
    path: 'air/:id',
    component: ShowAirComponent,
    canActivate: [AuthGuard]
  }
];
