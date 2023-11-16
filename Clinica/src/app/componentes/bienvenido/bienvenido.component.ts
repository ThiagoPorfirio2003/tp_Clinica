import { Component } from '@angular/core';
import { Especialista } from 'src/app/clases/usuario/Especialista';
import { Administrador } from 'src/app/clases/usuario/administrador';
import { Paciente } from 'src/app/clases/usuario/paciente';
import { UsuarioBase } from 'src/app/clases/usuario/usuarioBase';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { NavegacionService } from 'src/app/servicios/navegacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent 
{
  public quiereRegistrarse : boolean
  public usuariosLeidos : Array<any>;

  constructor(private servicioDB : DataBaseService, private servicioAlerta : AlertaService, public servicioUsuario : UsuarioService,
    private servicioNavegacion : NavegacionService)
  { 
    this.quiereRegistrarse = false;
    this.usuariosLeidos = new Array<any>();
  }
/*
  ngOnInit()
  {
    this.cargarUsuarios();
  }

  private cargarUsuarios()
  {
    const observableUsuario = this.servicioDB.UsuariosCollectionData;

    observableUsuario.subscribe((usuariosLeidos) =>
    this.usuariosLeidos = usuariosLeidos as Array<any>)
  }

  private iniciarSesion(usuario : UsuarioBase) : void
  {
    this.servicioUsuario.loguearUsuario(usuario);
    this.servicioNavegacion.cambiarRuta("/home");
  }

  public ingresarDatos({mail, clave} : any)
  {
    let usuarioLeido : UsuarioBase;
    let usuarioEstaHabilitado : boolean = true;

    this.servicioDB.iniciarSesion({mail, clave})
    .then((credenciales)=>
    {
      if(credenciales.user.emailVerified)
      {
        usuarioLeido = this.recuperarUsuario(mail);
        if(usuarioLeido.Tipo==2)
        {
          usuarioEstaHabilitado = (<Especialista>usuarioLeido).EstaHabilitado;
        }

        if(usuarioEstaHabilitado)
        {
          this.iniciarSesion(usuarioLeido);
        }
        else
        {
          this.servicioAlerta.alertaWarning('El administrador no te habilita el acceso');
        }
      }
      else
      {
        this.servicioAlerta.alertaWarning('El mail no esta verificado');
      }
    }
    )
    .catch((fracaso)=>
    {
      this.servicioAlerta.alertaErrorFirebase(fracaso.code);
    });
    }
  
    private recuperarUsuario(mail : string) : UsuarioBase
    {
      let usuarioRecuperado : UsuarioBase = Paciente.getDefaultPaciente();
      let tipoUsuario : number=0;
      let posicionUsuario : number=0;

      for(let index = 0; index < this.usuariosLeidos.length; index++) 
      {
        if(this.usuariosLeidos[index].datosUsuario.mail === mail)
        {
          tipoUsuario = this.usuariosLeidos[index].datosUsuario.tipo
          posicionUsuario = index;
          break;
        }
      }
*/





/*
      switch(tipoUsuario)
      {
        case 1:
          usuarioRecuperado = new Paciente(this.usuariosLeidos[posicionUsuario].datosUsuario.id,
            this.usuariosLeidos[posicionUsuario].datosUsuario.nombre, 
            this.usuariosLeidos[posicionUsuario].datosUsuario.apellido,
            this.usuariosLeidos[posicionUsuario].datosUsuario.edad, this.usuariosLeidos[posicionUsuario].datosUsuario.dni, 
            this.usuariosLeidos[posicionUsuario].datosUsuario.mail, this.usuariosLeidos[posicionUsuario].datosUsuario.obraSocial,
            this.usuariosLeidos[posicionUsuario].datosUsuario.urlsImagenes);
          break;
        
        case 2:
          usuarioRecuperado = new Especialista(this.usuariosLeidos[posicionUsuario].datosUsuario.id,
            this.usuariosLeidos[posicionUsuario].datosUsuario.nombre, this.usuariosLeidos[posicionUsuario].datosUsuario.apellido,
            this.usuariosLeidos[posicionUsuario].datosUsuario.edad, this.usuariosLeidos[posicionUsuario].datosUsuario.dni, 
            this.usuariosLeidos[posicionUsuario].datosUsuario.mail, this.usuariosLeidos[posicionUsuario].datosUsuario.urlImagen,
            this.usuariosLeidos[posicionUsuario].datosUsuario.especialidad, this.usuariosLeidos[posicionUsuario].datosUsuario.estaHabilitado);
          break;

        case 3:
          usuarioRecuperado = new Administrador(this.usuariosLeidos[posicionUsuario].datosUsuario.id,
            this.usuariosLeidos[posicionUsuario].datosUsuario.nombre, this.usuariosLeidos[posicionUsuario].datosUsuario.apellido,
            this.usuariosLeidos[posicionUsuario].datosUsuario.edad, this.usuariosLeidos[posicionUsuario].datosUsuario.dni, 
            this.usuariosLeidos[posicionUsuario].datosUsuario.mail,this.usuariosLeidos[posicionUsuario].datosUsuario.urlImagen);
          break;
      }
      

      return usuarioRecuperado;
    }
    */
}
