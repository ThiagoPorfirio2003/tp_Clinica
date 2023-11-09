import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroAdminRoutingModule } from './registro-admin-routing.module';
import { RegistroAdminComponent } from './registro-admin.component';
import { RegisterComponent } from 'src/app/componentes/register/register.component';


@NgModule({
  declarations: [
    RegistroAdminComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegistroAdminRoutingModule
  ]
})
export class RegistroAdminModule { }
