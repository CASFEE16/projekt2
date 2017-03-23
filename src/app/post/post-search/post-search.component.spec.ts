/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchComponent } from './post-search.component';
import {TestModule} from '../../../test/test.module';
import {PostComponent} from '../post/post.component';
import {ContentService} from '../../core/content/content.service';
import {YoutubeService} from '../../core/youtube/youtube.service';
import {SpotifyService} from '../../core/spotify/spotify.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        ContentService,
        YoutubeService,
        SpotifyService
      ],
      declarations: [
        SearchComponent,
        PostComponent
      ]
    }));
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
