import {Routes, CanActivate} from '@angular/router';
import { HomeComponent, AboutComponent, LoginComponent, RegisterComponent, SearchComponent, UserMenuComponent } from './front';
import {AuthGuard} from './core/auth/AuthGuard';
import {NotAuthGuard} from './core/auth/NotAuthGuard';
import {StartedGuard} from './core/auth/StartedGuard';
import {UserListComponent} from './user/user-list/user-list.component';
import {PostFrontComponent} from './post/post-front/post-front.component';

export const ROUTE_CONFIG: Routes = [
  { path: '', component: PostFrontComponent, canActivate: [StartedGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [StartedGuard]},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserMenuComponent, canActivate: [AuthGuard]}
];
