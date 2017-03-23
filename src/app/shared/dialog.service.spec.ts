import { TestBed, inject } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import {TestModule} from '../../test/test.module';

describe('DialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        DialogService
      ],
      declarations: [
      ]
    }));
  });

  it('should ...', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));
});
