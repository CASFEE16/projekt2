/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import {AppComponent} from './app.component';

import {RouterModule} from '@angular/router';
import {ROUTE_CONFIG} from './route-config';

import {ShowListService} from './show/shared/show-list.service';
import {ShowListMockService} from '../test/show/shared/show-list-mock.service';
import {ShowFrontComponent} from "./show/show-front/show-front.component";
import {PostFrontComponent} from "./post/post-front/post-front.component";
import {AboutComponent} from './front/about/about.component';
import {LoginComponent} from "./front/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {SearchComponent} from "./post/post-search/post-search.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {UserMenuComponent} from "./user/user-menu/user-menu.component";
import {ShowComponent} from "./show/show/show.component";
import {PostComponent} from "./post/post/post.component";
import {UserComponent} from "./user/user/user.component";
import {PostUtils} from "./post/shared/post-utils.service";
import {TestModule} from "../test/test.module";

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


  /*
  it(`should have set a window`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.window);
  }));


  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-toolbar-row').textContent).toContain('Radio App');
  }));
  */
});
