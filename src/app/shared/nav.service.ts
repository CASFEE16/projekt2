import { Injectable } from '@angular/core';
import {SessionService} from "../core/firebase/session.service";

export interface NavLink {
  link: string;
  label: string;
  icon?: string;
}

@Injectable()
export class NavService {

  public navLinks: NavLink[] = [
    {
      link: '/',
      label: 'Posts',
      icon: 'home'
    }, {
      link: '/show',
      label: 'Shows',
      icon: 'radio'
    }, {
      link: '/search',
      label: 'Search',
      icon: 'search'
    }, {
      link: '/about',
      label: 'About',
      icon: 'info'
    }];

  public userLinks: NavLink[] = [ {
    link: '/login',
    label: 'Login',
    icon: 'login'
  }, {
    link: '/register',
    label: 'Register',
    icon: 'register'
  }];

  public toolbarNavLinks: NavLink[] = [];

  constructor(private sessionService: SessionService) { }

  public toggleMedium() {
    this.toolbarNavLinks = [];
    if (!this.sessionService.isLoggedIn()) {
      this.toolbarNavLinks = this.userLinks;
    }
  }

  public toggleSmall() {
    this.toolbarNavLinks = [];
    this.toolbarNavLinks.push(...this.navLinks);
    if (!this.sessionService.isLoggedIn()) {
      this.toolbarNavLinks.push(...this.userLinks);
    }
  }

  public toggleUsers(enable: boolean) {
    if (enable) {
      const link = this.navLinks.find(each => each.link === '/users');
      if (!link) {
        this.navLinks.push({
          link: '/users',
          label: 'Users',
          icon: 'supervisor_account'
        });
      }
    } else {
      this.navLinks = this.navLinks.filter(each => each.link !== '/users');
    }
  }

}
