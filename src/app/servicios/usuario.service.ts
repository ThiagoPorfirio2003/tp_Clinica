import { Injectable } from '@angular/core';
import { UsuarioBase } from '../clases/usuario/usuarioBase';
import { Paciente } from '../clases/usuario/paciente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuarioLogueado : UsuarioBase;
  private estaLogueado : boolean;

  constructor() 
  {
    this.usuarioLogueado = Paciente.getDefaultPaciente();
    this.estaLogueado = false;
  }

  public get EstaLogueado() : boolean
  {
    return this.estaLogueado
  }
  
  public loguearUsuario(usuario : UsuarioBase) : void
  {
    this.usuarioLogueado = usuario;
    this.estaLogueado = true;
  }
  
  public desLoguearUsuario() : void
  {
    this.usuarioLogueado = Paciente.getDefaultPaciente();
    this.estaLogueado = false;
  }
/*
  public get EstaLogueado() : boolean
  {
    return this.estaLogueado;
  }
  */
}
