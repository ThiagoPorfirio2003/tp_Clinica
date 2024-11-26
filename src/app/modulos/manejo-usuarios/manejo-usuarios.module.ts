import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoUsuariosComponent } from '../../componentes/listado-usuarios/listado-usuarios.component';

@NgModule({
  declarations: [
    ListadoUsuariosComponent
  ],
  imports: [
    CommonModule
  ],
  exports:
  [
    ListadoUsuariosComponent
  ]
})
export class ManejoUsuariosModule { }
