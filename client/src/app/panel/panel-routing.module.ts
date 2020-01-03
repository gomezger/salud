import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { LoginComponent } from './login/login.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { CrearEditarProfesionalComponent } from './profesionales/crear-editar-profesional/crear-editar-profesional.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { TipoProfesionalesComponent } from './tipo-profesionales/tipo-profesionales.component';



const routes: Routes = [
	{path: 'login', component: LoginComponent },
	{
	  path: '',
	  component: PanelComponent,
	  children: [
		{path: 'profesionales', component: ProfesionalesComponent },
		{path: 'profesionales/crear', component: CrearEditarProfesionalComponent },
		{path: 'profesionales/:id', component: CrearEditarProfesionalComponent },
		{path: 'opiniones', component: OpinionesComponent },
		{path: 'tipo-profesionales', component: TipoProfesionalesComponent }
	  ]
	},
	{ path: '**',  component: PanelComponent }

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
