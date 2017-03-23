/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostListService } from './post-list.service';
import {TestModule} from '../../../test/test.module';
import {ContentService} from '../../core/content/content.service';
import {YoutubeService} from '../../core/youtube/youtube.service';
import {SpotifyService} from '../../core/spotify/spotify.service';

describe('PostService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        ContentService,
        YoutubeService,
        SpotifyService,
        PostListService
      ],
      declarations: [
      ]
    }));
  });

  it('should ...', inject([PostListService], (service: PostListService) => {
    expect(service).toBeTruthy();
  }));
});
