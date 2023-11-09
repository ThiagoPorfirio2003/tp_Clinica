import { Component, Input } from '@angular/core';
import { Paciente } from 'src/app/clases/usuario/paciente';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css']
})
export class TablaPacientesComponent {
  @Input() pacientes : Array<Paciente>;

  constructor()
  {
    this.pacientes = new Array<Paciente>();
  //  this.pasarAdministradorEvent = new EventEmitter<Administrador>();
  }
}
