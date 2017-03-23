import { TestBed, inject } from '@angular/core/testing';

import { ShowService } from './show.service';
import {TestModule} from '../../../test/test.module';
import {ShowPostsService} from './show-posts.service';

describe('ShowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        ShowService,
        ShowPostsService
      ],
      declarations: [
      ]
    }));
  });

  it('should ...', inject([ShowService], (service: ShowService) => {
    expect(service).toBeTruthy();
  }));
});
