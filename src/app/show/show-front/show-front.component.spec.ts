/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {APP_BASE_HREF} from '@angular/common';

import {RouterModule} from '@angular/router';

import {SessionService} from '../../core/firebase/session.service';
import {SessionMockService} from '../../../test/core/firebase/session-mock.service';
import {BackendService} from '../../core/firebase/backend.service';
import {BackendMockService} from '../../../test/core/firebase/backend-mock.service';
import {ShowListService} from '../shared/show-list.service';
import {ShowListMockService} from '../../../test/show/shared/show-list-mock.service';
import {ShowComponent} from '../show/show.component';
import {TraceService} from '../../core/trace/trace.service';
import {ShowPostsService} from '../shared/show-posts.service';

import { ShowFrontComponent } from './show-front.component';
import {PostUtils} from '../../post/shared/post-utils.service';
import {PostComponent} from '../../post/post/post.component';

import {TestModule} from '../../../test/test.module';

describe('ShowFrontComponent', () => {
  let component: ShowFrontComponent;
  let fixture: ComponentFixture<ShowFrontComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule(TestModule.forTest({
      imports: [
      ],
      providers: [
        PostUtils
      ],
      declarations: [
        ShowFrontComponent,
        ShowComponent,
        PostComponent
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
