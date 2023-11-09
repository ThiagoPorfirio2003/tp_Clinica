import { Component } from '@angular/core';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { NavegacionService } from 'src/app/servicios/navegacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public servicioUsuario : UsuarioService, private servicioNavegacion : NavegacionService,
    private servicioBD : DataBaseService, private servicioAlerta : AlertaService)
  {
    
  }

 public preguntarCerrarSesion() : void
  {
    this.servicioAlerta.alertaAceptarCancelar('¿Seguro que quiere cerrar la sesion?', 0, 'Tu salud nos importa',
    "Si, quiero salir", "No, aun tengo algo que hacer", false)
    .then((respuesta)=>
    {
      if(respuesta.isConfirmed)
      {
        this.cerrarSesion();
      }
    })
    .catch()
  }
  
  private cerrarSesion()
  {
    this.servicioBD.cerrarSesion()
    .then(()=>
    {
      this.servicioUsuario.desLoguearUsuario();
      this.servicioNavegacion.cambiarRuta('/bienvenido')
    });
  }
}
