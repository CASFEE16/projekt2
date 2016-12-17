/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { HomeComponent } from './home.component';
import {Observable} from 'rxjs';

const data: any = [{1: 'Test'}];

class MockAngularFireDatabase {
  public list(url: string): Observable<any[]> {
    return Observable.of(data);
  }
}

class MockAngularFire {
  database: any = new MockAngularFireDatabase();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFire, useClass: MockAngularFire}
      ],
      declarations: [ HomeComponent ]
    })
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
