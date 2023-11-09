import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoUsuariosRoutingModule } from './listado-usuarios-routing.module';
import { ListadoUsuariosComponent } from './listado-usuarios.component';
import { TablaAdministradoresComponent } from 'src/app/componentes/tablas/tabla-administradores/tabla-administradores.component';
import { TablaPacientesComponent } from 'src/app/componentes/tablas/tabla-pacientes/tabla-pacientes.component';
import { TablaEspecialistasComponent } from 'src/app/componentes/tablas/tabla-especialistas/tabla-especialistas.component';


@NgModule({
  declarations: [
    ListadoUsuariosComponent,
    TablaAdministradoresComponent,
    TablaPacientesComponent,
    TablaEspecialistasComponent
    ],
  imports: [
    CommonModule,
    ListadoUsuariosRoutingModule
  ]
})
export class ListadoUsuariosModule 
{ 
  
}
