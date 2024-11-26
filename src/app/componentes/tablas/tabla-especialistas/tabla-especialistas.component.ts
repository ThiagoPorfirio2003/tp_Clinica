import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Especialista } from 'src/app/clases/usuario/Especialista';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.css']
})
export class TablaEspecialistasComponent 
{
  @Output() pasarEspecialistaEvent : EventEmitter<any>;
  @Input() especialistas : Array<any>;

  constructor()
  {
    this.especialistas = new Array<Especialista>();
    this.pasarEspecialistaEvent = new EventEmitter<Especialista>();
  }
 
  public pasarEspecialista(especialista : any)
  {
    especialista.estaHabilitado = !especialista.estaHabilitado;
    this.pasarEspecialistaEvent.emit(especialista);
  }
 
}
