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


@NgModule({
  declarations: [
    PanelComponent,
    LoginComponent, 
    MenuComponent, ProfesionalesComponent, OpinionesComponent, HeaderComponent
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
