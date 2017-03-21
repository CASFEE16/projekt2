import { TestBed, inject } from '@angular/core/testing';

import { SpotifyService } from './spotify.service';
import {TestModule} from "../../../test/test.module";

describe('SpotifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        SpotifyService
      ],
      declarations: []
    }));
  });

  it('should ...', inject([SpotifyService], (service: SpotifyService) => {
    expect(service).toBeTruthy();
  }));
});
