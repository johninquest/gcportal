import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotholetrackerComponent } from './potholetracker.component';

describe('PotholetrackerComponent', () => {
  let component: PotholetrackerComponent;
  let fixture: ComponentFixture<PotholetrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotholetrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotholetrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
