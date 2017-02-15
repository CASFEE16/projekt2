import {Routes, CanActivate} from '@angular/router';
import { HomeComponent, AboutComponent, LoginComponent, RegisterComponent } from './front';

export const ROUTE_CONFIG: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
