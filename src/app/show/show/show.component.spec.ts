import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowComponent } from './show.component';
import {TestModule} from "../../../test/test.module";
import {ShowService} from "../shared/show.service";
import {ShowPostsService} from "../shared/show-posts.service";
import {PostUtils} from "../../post/shared/post-utils.service";

describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        ShowService,
        ShowPostsService,
        PostUtils
      ],
      declarations: [
        ShowComponent
      ]
    }));
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
