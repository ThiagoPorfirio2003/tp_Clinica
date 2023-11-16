import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MostrarTotalidadUsuariosRoutingModule } from './mostrar-totalidad-usuarios-routing.module';
import { MostrarTotalidadUsuariosComponent } from './mostrar-totalidad-usuarios.component';
import { ManejoUsuariosModule } from '../manejo-usuarios/manejo-usuarios.module';


@NgModule({
  declarations: [
    MostrarTotalidadUsuariosComponent
  ],
  imports: [
    ManejoUsuariosModule,
    CommonModule,
    MostrarTotalidadUsuariosRoutingModule,
  ]
})
export class MostrarTotalidadUsuariosModule { }
