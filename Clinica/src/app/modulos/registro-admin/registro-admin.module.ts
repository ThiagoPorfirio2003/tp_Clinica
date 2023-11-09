import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroAdminRoutingModule } from './registro-admin-routing.module';
import { RegistroAdminComponent } from './registro-admin.component';
import { AdminRegisterComponent } from '../../componentes/admin-register/admin-register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: 
  [
    RegistroAdminComponent,
    AdminRegisterComponent
  ],
  imports: [
    CommonModule,
    RegistroAdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegistroAdminModule { }
