/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostFrontComponent } from './post-front.component';
import {TestModule} from "../../../test/test.module";
import {PostComponent} from "../post/post.component";
import {ContentService} from "../../core/content/content.service";
import {YoutubeService} from "../../core/youtube/youtube.service";
import {SpotifyService} from "../../core/spotify/spotify.service";

describe('PostFrontComponent', () => {
  let component: PostFrontComponent;
  let fixture: ComponentFixture<PostFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        ContentService,
        YoutubeService,
        SpotifyService
      ],
      declarations: [
        PostFrontComponent,
        PostComponent
      ]
    }));
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
