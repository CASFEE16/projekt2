/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YoutubeService } from './youtube.service';
import {TestModule} from '../../../test/test.module';

describe('YoutubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        YoutubeService
      ],
      declarations: []
    }));
  });

  it('should ...', inject([YoutubeService], (service: YoutubeService) => {
    expect(service).toBeTruthy();
  }));
});
