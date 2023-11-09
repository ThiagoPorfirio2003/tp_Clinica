import { Component } from '@angular/core';
import { Especialista } from 'src/app/clases/usuario/Especialista';
import { Administrador } from 'src/app/clases/usuario/administrador';
import { Paciente } from 'src/app/clases/usuario/paciente';
import { DataBaseService } from 'src/app/servicios/data-base.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent {

  public pacientes : Array<Paciente>;
  public administradores : Array<Administrador>;
  public especialistas : Array<any>;
  
  constructor(public servicioBD : DataBaseService)
  {
    this.pacientes = new Array<Paciente>();
    this.administradores = new Array<Administrador>();
    this.especialistas = new Array<any>();
  }

  ngOnInit()
  {
    this.cargarUsuarios();
  }

  private cargarUsuarios()
  {
    const observableUsuario = this.servicioBD.UsuariosCollectionData;

    observableUsuario.subscribe((usuariosLeidos) =>
    {
      console.log(usuariosLeidos);
      this.separarUsuarios(usuariosLeidos)
    })
  }

  private separarUsuarios(usuarios : Array<any>)
  {
    this.administradores = new Array<Administrador>();
    this.especialistas = new Array<any>();
    this.pacientes = new Array<Paciente>();

    usuarios.forEach((usuario)=>
    {
      switch(usuario.datosUsuario.tipo)
      {
        case 1:
          this.pacientes.push(new Paciente(usuario.datosUsuario.id, usuario.datosUsuario.nombre, usuario.datosUsuario.apellido,
          usuario.datosUsuario.edad, usuario.datosUsuario.dni, 
          usuario.datosUsuario.mail, usuario.datosUsuario.obraSocial,
          usuario.datosUsuario.urlsImagenes));
          break;

        case 2:
          this.especialistas.push(
            {
              id: usuario.datosUsuario.id,
              nombre: usuario.datosUsuario.nombre,
              apellido: usuario.datosUsuario.apellido,
              edad: usuario.datosUsuario.edad,
              dni: usuario.datosUsuario.dni,
              mail: usuario.datosUsuario.mail, 
              urlImagen : usuario.datosUsuario.urlImagen,
              especialidad: usuario.datosUsuario.especialidad,
              estaHabilitado: usuario.datosUsuario.estaHabilitado,
              tipo : usuario.datosUsuario.tipo
            })
          break;

        case 3:
          this.administradores.push(new Administrador(usuario.datosUsuario.id, usuario.datosUsuario.nombre, usuario.datosUsuario.apellido,
            usuario.datosUsuario.edad, usuario.datosUsuario.dni, 
            usuario.datosUsuario.mail,usuario.datosUsuario.urlImagen));
          break;
      }
    })
  }

  public actualizarEspecialista(especialista : any)
  {
    this.servicioBD.habilitarEspecialista(especialista)
    .then(()=>
    {

    });
  }
}
