import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartdialogComponent } from './startdialog.component';

describe('StartdialogComponent', () => {
  let component: StartdialogComponent;
  let fixture: ComponentFixture<StartdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
