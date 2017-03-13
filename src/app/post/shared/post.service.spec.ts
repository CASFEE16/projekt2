/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostListService } from './post-list.service';

describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostListService]
    });
  });

  it('should ...', inject([PostListService], (service: PostListService) => {
    expect(service).toBeTruthy();
  }));
});
