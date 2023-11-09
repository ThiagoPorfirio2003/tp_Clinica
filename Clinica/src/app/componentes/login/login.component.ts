import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertaService } from 'src/app/servicios/alerta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
{
  @Output() pasarDatosInicioEvent : EventEmitter<any>; 
  public formularioLogin : FormGroup;

  public constructor(private servicioFormBuilder : FormBuilder, private servicioAlerta : AlertaService)
  {
    this.pasarDatosInicioEvent = new EventEmitter<any>();

    this.formularioLogin = servicioFormBuilder.group(
      {
        mail:
        [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        clave:
        [
          '',
          [
            Validators.minLength(6),
            Validators.required,
          ]
        ]
      }
    )
  }

  public pasarDatosLogIn()
  {
    if(this.formularioLogin.valid)
    {
      let datosRegistro : any =
      {
        mail: this.formularioLogin.controls['mail'].value,
        clave: this.formularioLogin.controls['clave'].value,
      }
        
      this.pasarDatosInicioEvent.emit(datosRegistro);
    }
    else
    {
      this.servicioAlerta.alertaWarning('Hay campos que no cumplen las condiciones');
    }
  }

  public cargarPaciente()
  {
    this.formularioLogin.controls['mail'].setValue('korexe9289@eazenity.com');
    this.formularioLogin.controls['clave'].setValue('123456');
  }

  public cargarEspecialista()
  {
    this.formularioLogin.controls['mail'].setValue('msa5c078aq@rentforsale7.com');
    this.formularioLogin.controls['clave'].setValue('123456');
  }

  public cargarAdmin()
  {
    this.formularioLogin.controls['mail'].setValue('ysckha0grj@myinfoinc.com');
    this.formularioLogin.controls['clave'].setValue('123456');
  }
}
