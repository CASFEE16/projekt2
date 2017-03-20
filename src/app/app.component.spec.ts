/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {APP_BASE_HREF} from '@angular/common';

import {RouterModule} from '@angular/router';
import {ROUTE_CONFIG} from './route-config';

import {UserModule} from './user/user.module';
import {CoreModule} from './core/core.module';
import {FrontModule} from './front/front.module';
import {PostModule} from './post/post.module';
import {ShowModule} from './show/show.module';

import {SessionService} from './core/firebase/session.service';
import {SessionMockService} from './test/core/firebase/session-mock.service';
import {BackendService} from './core/firebase/backend.service';
import {BackendMockService} from './test/core/firebase/backend-mock.service';

fdescribe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        MaterialModule,
        RouterModule.forRoot(ROUTE_CONFIG),
        SharedModule,
        UserModule,
        FrontModule,
        PostModule,
        ShowModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: SessionService, useClass: SessionMockService},
        {provide: BackendService, useClass: BackendMockService},
      ],
      declarations: [
        AppComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it(`should have set a window`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.window);
  }));


  /*
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-toolbar-row').textContent).toContain('Radio App');
  }));
  */
});
