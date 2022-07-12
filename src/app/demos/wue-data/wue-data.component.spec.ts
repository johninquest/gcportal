import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WueDataComponent } from './wue-data.component';

describe('WueDataComponent', () => {
  let component: WueDataComponent;
  let fixture: ComponentFixture<WueDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WueDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WueDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
