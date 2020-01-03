import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PanelComponent } from './panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { HeaderComponent } from './componentes/header/header.component';
import { CrearEditarProfesionalComponent } from './profesionales/crear-editar-profesional/crear-editar-profesional.component';
import { TipoProfesionalesComponent } from './tipo-profesionales/tipo-profesionales.component';
import { CrearEditarTipoComponent } from './tipo-profesionales/crear-editar-tipo/crear-editar-tipo.component';


@NgModule({
  declarations: [
    PanelComponent,
    LoginComponent, 
    MenuComponent, 
    ProfesionalesComponent, 
    OpinionesComponent, 
    HeaderComponent, 
    CrearEditarProfesionalComponent, TipoProfesionalesComponent, CrearEditarTipoComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PanelModule { }
