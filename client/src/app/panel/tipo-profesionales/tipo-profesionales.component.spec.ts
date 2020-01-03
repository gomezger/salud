import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProfesionalesComponent } from './tipo-profesionales.component';

describe('TipoProfesionalesComponent', () => {
  let component: TipoProfesionalesComponent;
  let fixture: ComponentFixture<TipoProfesionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoProfesionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
