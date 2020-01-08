import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';


@NgModule({
  declarations: [
    WebComponent,
    ProfesionalesComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule
  ]
})
export class WebModule { }
