import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { LoginComponent } from './login/login.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { OpinionesComponent } from './opiniones/opiniones.component';



const routes: Routes = [  
	{path: 'login', component: LoginComponent },
	{ 
	  path: '', 
	  component: PanelComponent,
	  children: [ 
		{path: 'profesionales', component: ProfesionalesComponent }, 
		{path: 'opiniones', component: OpinionesComponent } 
	  ]  
	},
	{ path: '**',  component: PanelComponent }
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
