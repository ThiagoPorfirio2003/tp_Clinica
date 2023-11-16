import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';

const routes: Routes = 
[
  { path: 'bienvenido', component: BienvenidoComponent},
  { path: 'home', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule) },
  { path: 'access', loadChildren: () => import('./modulos/access-home-modul/access-home-modul.module').then(m => m.AccessHomeModulModule) },
  { path: '', redirectTo: "bienvenido", pathMatch: "full"},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
