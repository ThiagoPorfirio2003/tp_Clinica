import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegistroAdminModule } from '../registro-admin/registro-admin.module';

const routes: Routes = 
[
  { path: '', component: HomeComponent,
  children: 
  [
    { path: 'listaUsuarios', loadChildren: () => import('../listado-usuarios/listado-usuarios.module').then(m => m.ListadoUsuariosModule) },
    { path: 'registerAdmin', loadChildren: () => import('../registro-admin/registro-admin.module').then(m => m.RegistroAdminModule)}
  ] 
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
