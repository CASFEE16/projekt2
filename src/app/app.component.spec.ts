/* tslint:disable:no-unused-variable */
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import {AppComponent} from './app.component';

import {RouterModule} from '@angular/router';
import {ROUTE_CONFIG} from './route-config';

import {ShowListService} from './show/shared/show-list.service';
import {ShowListMockService} from '../test/show/shared/show-list-mock.service';
import {ShowFrontComponent} from './show/show-front/show-front.component';
import {PostFrontComponent} from './post/post-front/post-front.component';
import {AboutComponent} from './front/about/about.component';
import {LoginComponent} from './front/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {SearchComponent} from './post/post-search/post-search.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserMenuComponent} from './user/user-menu/user-menu.component';
import {ShowComponent} from './show/show/show.component';
import {PostComponent} from './post/post/post.component';
import {UserComponent} from './user/user/user.component';
import {PostUtils} from './post/shared/post-utils.service';
import {TestModule} from '../test/test.module';
import {SessionService} from './core/firebase/session.service';

describe('AppComponent', () => {
  beforeEach(() => {

    TestBed.configureTestingModule(TestModule.forTest({
      imports: [
      ],
      providers: [
        PostUtils
      ],
      declarations: [
        AppComponent,
        ShowFrontComponent,
        PostFrontComponent,
        AboutComponent,
        LoginComponent,
        RegisterComponent,
        SearchComponent,
        UserListComponent,
        UserMenuComponent,
        ShowComponent,
        PostComponent,
        UserComponent
      ]
    }));

    TestBed.overrideComponent(ShowFrontComponent, {
      set: {
        providers: [
          {provide: ShowListService, useClass: ShowListMockService}
        ]
      }
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-toolbar-row').textContent).toContain('Radio App');
  }));

  it('should enable user menus on login', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#auth-menu')).toBeTruthy();
    expect(compiled.querySelector('#user-menu')).toBeFalsy();

    const sessionService: SessionService = TestBed.get(SessionService);
    sessionService.loginCredentials({email: 'test@test.com', password: '1234'}).subscribe(
      (result) => null,
      (error) => null,
      () => {
        fixture.detectChanges();
        expect(compiled.querySelector('#auth-menu')).toBeFalsy();
        expect(compiled.querySelector('#user-menu')).toBeTruthy();
      }
    );
  }));

});
