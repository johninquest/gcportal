import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WuedataComponent } from './wuedata.component';

describe('WuedataComponent', () => {
  let component: WuedataComponent;
  let fixture: ComponentFixture<WuedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WuedataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WuedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
