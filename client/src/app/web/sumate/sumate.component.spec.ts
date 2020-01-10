import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumateComponent } from './sumate.component';

describe('SumateComponent', () => {
  let component: SumateComponent;
  let fixture: ComponentFixture<SumateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
