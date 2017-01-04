/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "./shared/material/layout/layout.component";
import {ROUTE_CONFIG} from "./route-config";
import {FrontModule} from "./front/front.module";
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule.forRoot(), RouterModule.forRoot(ROUTE_CONFIG), FrontModule],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],
      declarations: [
        LayoutComponent,
        AppComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Projekt2'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Projekt2');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-toolbar-row').textContent).toContain('Radio App');
  }));
});
