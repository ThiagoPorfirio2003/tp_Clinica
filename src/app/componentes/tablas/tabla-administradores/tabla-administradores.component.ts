import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Administrador } from 'src/app/clases/usuario/administrador';

@Component({
  selector: 'app-tabla-administradores',
  templateUrl: './tabla-administradores.component.html',
  styleUrls: ['./tabla-administradores.component.css']
})
export class TablaAdministradoresComponent 
{
 // @Output() pasarAdministradorEvent : EventEmitter<Administrador>;
  @Input() administradores : Array<Administrador>;

  constructor()
  {
    this.administradores = new Array<Administrador>();
  //  this.pasarAdministradorEvent = new EventEmitter<Administrador>();
  }

  /*
  public pasarAdministrador(administrador : Administrador)
  {
    this.pasarAdministradorEvent.emit(administrador);
  }
  */
}
