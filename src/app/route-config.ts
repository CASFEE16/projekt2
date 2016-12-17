import {Routes, CanActivate} from '@angular/router';
import { HomeComponent } from './front/home/home.component';
import { AboutComponent } from './front/about/about.component';

export const ROUTE_CONFIG: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];
