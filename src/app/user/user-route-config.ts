import {Routes} from "@angular/router";
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailsComponent} from './user-details/user-details.component';

export const USER_ROUTE_CONFIG: Routes = [
  {
    path: 'user',
    component: UserListComponent
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent
    }
];
