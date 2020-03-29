import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadsafetyComponent } from './roadsafety.component';

describe('RoadsafetyComponent', () => {
  let component: RoadsafetyComponent;
  let fixture: ComponentFixture<RoadsafetyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadsafetyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadsafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
