import { Component } from '@angular/core';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { NavegacionService } from 'src/app/servicios/navegacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent {
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
  }*/

  private validarPaciente(paciente : any) :boolean
  { 
    let retorno : boolean = true;

    for(let i : number =0; i < this.usuariosLeidos.length;i++)
    {
      if(this.usuariosLeidos[i].datosUsuario.dni == paciente.dni || this.usuariosLeidos[i].datosUsuario.obraSocial == paciente.obraSocial)
      {
        retorno = false;
        break;
      }
    }

    return retorno;
  }

  private validarsNoPaciente(noPaciente : any) :boolean
  { 
    let retorno : boolean = true;

    for(let i : number =0; i < this.usuariosLeidos.length;i++)
    {
      if(this.usuariosLeidos[i].datosUsuario.dni == noPaciente.dni)
      {
        retorno = false;
        break;
      }
    }

    return retorno;
  }

  /*
  private async guardarDatosUsuario(datosRegistro : any)
  {
    let urlImagenes : Array<string> = new Array<string>();
    let todoBien : boolean = true;

    for(let i : number =0;i<datosRegistro.imagenesUsuario.length;i++)
    {
      await this.servicioDB.guardarUsuarioImagen(datosRegistro.imagenesUsuario[i], datosRegistro.datosUsuarioTXT.dni)
      .then(urlImagen=> urlImagenes.push(urlImagen))
      .catch((respuesta)=>
      { 
        console.log(respuesta)
        todoBien = false;
      });
    }

    if(todoBien)
    {
      if(urlImagenes.length ==1)
      {
        datosRegistro.datosUsuarioTXT.urlImagen = urlImagenes[0];
      }
      else
      {
        datosRegistro.datosUsuarioTXT.urlsImagenes = urlImagenes;
      }
      return this.servicioDB.guardarDatosUsuario(datosRegistro.datosUsuarioTXT)
    }
  }

  public async crearUsuario(datosRegistro : any)
  {
    let usuarioOriginal : any = this.servicioDB.auth.currentUser;
    let validacionesUsuario : boolean;
    let mensajeError : string;

    if(datosRegistro.datosUsuarioTXT.tipo == 1)
    {
      validacionesUsuario = this.validarPaciente(datosRegistro.datosUsuarioTXT);
      mensajeError = 'El dni u obra social pertenece a otro usuario';
    }
    else
    {
      validacionesUsuario = this.validarsNoPaciente(datosRegistro.datosUsuarioTXT);
      mensajeError = 'El dni pertenece a otro usuario';
    }

    if(validacionesUsuario)
    {
      await this.servicioDB.crearUsuario(datosRegistro.datosUsuarioTXT)
      .then((retorno)=>
      {
        if(usuarioOriginal != null)
        {
          this.servicioDB.auth.updateCurrentUser(retorno.user);
        }

        this.servicioDB.enviarMailVerificacion(retorno.user)
        .then(()=> 
        {
          this.guardarDatosUsuario(datosRegistro)
          .then(()=>
          { 
            this.servicioAlerta.alertaExito('Te has registrado correctamente')
            this.quiereRegistrarse = false;
          });
        })

      })
      .catch(error=> this.servicioAlerta.alertaErrorFirebase(error.code));

    }
    else
    {
      this.servicioAlerta.alertaError(mensajeError);
    }
  }
  */
}
