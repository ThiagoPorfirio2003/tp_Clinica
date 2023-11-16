import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessHomeModulRoutingModule } from './access-home-modul-routing.module';
import { AccessHomeModulComponent } from './access-home-modul.component';
import { RegisterComponent } from 'src/app/componentes/register/register.component';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccessHomeModulComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AccessHomeModulRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccessHomeModulModule { }
