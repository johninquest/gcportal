import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastanmeldungComponent } from './gastanmeldung.component';

describe('GastanmeldungComponent', () => {
  let component: GastanmeldungComponent;
  let fixture: ComponentFixture<GastanmeldungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastanmeldungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastanmeldungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
