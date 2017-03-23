import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAirComponent } from './show-air.component';
import {ShowDetailsService} from '../show-details/show-details.service';
import {ShowPostsService} from '../shared/show-posts.service';
import {TestModule} from '../../../test/test.module';
import {ShowService} from '../shared/show.service';
import {PostAirComponent} from '../../post/post-air/post-air.component';
import {PostUtils} from '../../post/shared/post-utils.service';

import 'rxjs/add/observable/throw';

describe('ShowAirComponent', () => {
  let component: ShowAirComponent;
  let fixture: ComponentFixture<ShowAirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TestModule.forTest({
      imports: [],
      providers: [
        ShowService,
        ShowDetailsService,
        ShowPostsService,
        PostUtils
      ],
      declarations: [
        ShowAirComponent,
        PostAirComponent
      ]
    }));
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
