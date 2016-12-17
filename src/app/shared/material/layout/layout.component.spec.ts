/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {RouterModule, Router} from "@angular/router";
import { MaterialModule } from '@angular/material';
import {LayoutComponent} from "./layout.component";
import {ROUTE_CONFIG} from "../../../route-config";
import {FrontModule} from "../../../front/front.module";
import {APP_BASE_HREF} from '@angular/common';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule.forRoot(), RouterModule.forRoot(ROUTE_CONFIG), FrontModule],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],
      declarations: [ LayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
