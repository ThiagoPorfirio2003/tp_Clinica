import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioBase } from 'src/app/clases/usuario/usuarioBase';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})

export class ListadoUsuariosComponent 
{
  @Input() usuarios : Array<any>;
  @Output() cambiarHabilitacionUsuarioEvent : EventEmitter<any>
  @Output() irAPerfilUsuarioEvent : EventEmitter<any>

  constructor()
  {
    this.usuarios = Array<any>();
    this.cambiarHabilitacionUsuarioEvent = new EventEmitter<UsuarioBase>();
    this.irAPerfilUsuarioEvent = new EventEmitter<any>();
  }

  
}
