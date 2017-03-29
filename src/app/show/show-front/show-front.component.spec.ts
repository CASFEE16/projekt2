/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ShowListService} from '../shared/show-list.service';
import {ShowListMockService} from '../../../test/show/shared/show-list-mock.service';
import {ShowComponent} from '../show/show.component';

import { ShowFrontComponent } from './show-front.component';
import {PostUtils} from '../../post/shared/post-utils.service';
import {PostComponent} from '../../post/post/post.component';
import {CommentComponent} from '../../post/comment/comment.component';
import {CommentService} from '../../post/shared/comment.service';

import {TestModule} from '../../../test/test.module';

describe('ShowFrontComponent', () => {
  let component: ShowFrontComponent;
  let fixture: ComponentFixture<ShowFrontComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule(TestModule.forTest({
      imports: [
      ],
      providers: [
        PostUtils,
        CommentService
      ],
      declarations: [
        ShowFrontComponent,
        ShowComponent,
        PostComponent,
        CommentComponent
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
