import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessHomeModulComponent } from './access-home-modul.component';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { RegisterComponent } from 'src/app/componentes/register/register.component';

const routes: Routes = 
[
  { path: '', component: AccessHomeModulComponent, 
    children:
    [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessHomeModulRoutingModule { }
