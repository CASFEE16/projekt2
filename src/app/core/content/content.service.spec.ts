import { TestBed, inject } from '@angular/core/testing';

import { ContentService } from './content.service';
import {TestModule} from "../../../test/test.module";
import {YoutubeService} from "../youtube/youtube.service";
import {SpotifyService} from "../spotify/spotify.service";

describe('ContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        ContentService,
        YoutubeService,
        SpotifyService
      ],
      declarations: []
    }));
  });

  it('should ...', inject([ContentService], (service: ContentService) => {
    expect(service).toBeTruthy();
  }));
});
