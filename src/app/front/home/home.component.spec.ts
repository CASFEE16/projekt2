/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import {Observable} from 'rxjs/Observable';

const data: any = ['Test'];

class MockWelcomeService {
  public getWelcomeMessages(): Observable<string> {
    return Observable.of(data);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      providers: [
      ],
      declarations: [ HomeComponent ]
    }).overrideComponent(HomeComponent, {
      set: {
        providers: [
        ]
      }})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
