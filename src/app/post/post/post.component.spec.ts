import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import {TestModule} from "../../../test/test.module";
import {ContentService} from "../../core/content/content.service";
import {YoutubeService} from "../../core/youtube/youtube.service";
import {SpotifyService} from "../../core/spotify/spotify.service";
import {PostUtils} from "../shared/post-utils.service";
import {PostListService} from "../shared/post-list.service";

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        ContentService,
        YoutubeService,
        SpotifyService,
        PostUtils,
        PostListService
      ],
      declarations: [
        PostComponent
      ]
    }));
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
