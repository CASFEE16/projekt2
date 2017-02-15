import {Routes} from "@angular/router";
import {ShowsComponent} from './shows/shows.component';

export const SHOW_ROUTE_CONFIG: Routes = [
  {
    path: 'shows',
    component: ShowsComponent

    /*
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
    */
  }
];
