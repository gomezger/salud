import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarTipoComponent } from './crear-editar-tipo.component';

describe('CrearEditarTipoComponent', () => {
  let component: CrearEditarTipoComponent;
  let fixture: ComponentFixture<CrearEditarTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
