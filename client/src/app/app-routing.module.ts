import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: 'panel', loadChildren: './panel/panel.module#PanelModule' },
	{ path: '', loadChildren: './web/web.module#WebModule' },
	{ path: '**', loadChildren: './web/web.module#WebModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
