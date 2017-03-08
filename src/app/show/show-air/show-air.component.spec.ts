import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAirComponent } from './show-air.component';

describe('ShowAirComponent', () => {
  let component: ShowAirComponent;
  let fixture: ComponentFixture<ShowAirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAirComponent ]
    })
    .compileComponents();
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
