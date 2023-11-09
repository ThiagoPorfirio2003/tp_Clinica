import { Component } from '@angular/core';
import { NavegacionService } from 'src/app/servicios/navegacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public servicioUsuario : UsuarioService, public servicioNavegacion : NavegacionService)
  {
    
  }
}
