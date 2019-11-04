import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceguideComponent } from './priceguide.component';

describe('PriceguideComponent', () => {
  let component: PriceguideComponent;
  let fixture: ComponentFixture<PriceguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
