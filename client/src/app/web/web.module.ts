import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { SumateComponent } from './sumate/sumate.component';
import { ContactoComponent } from './contacto/contacto.component';
import { NgForm, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WebComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    ProfesionalesComponent,
    SumateComponent,
    ContactoComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    FormsModule
  ]
})
export class WebModule { }
