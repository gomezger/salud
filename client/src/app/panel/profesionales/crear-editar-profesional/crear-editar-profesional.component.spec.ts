import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarProfesionalComponent } from './crear-editar-profesional.component';

describe('CrearEditarProfesionalComponent', () => {
  let component: CrearEditarProfesionalComponent;
  let fixture: ComponentFixture<CrearEditarProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
