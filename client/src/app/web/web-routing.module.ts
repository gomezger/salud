import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web.component';
import { InicioComponent } from './inicio/inicio.component';


const routes: Routes = [
  { 
    path: '', 
    component: WebComponent,
    children: [
      {path: '', component: InicioComponent }
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
