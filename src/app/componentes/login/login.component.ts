import { Component, EventEmitter, Output,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { Especialista } from 'src/app/clases/usuario/Especialista';
import { Administrador } from 'src/app/clases/usuario/administrador';
import { Paciente } from 'src/app/clases/usuario/paciente';
import { UsuarioBase } from 'src/app/clases/usuario/usuarioBase';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { NavegacionService } from 'src/app/servicios/navegacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
{
  public formularioLogin : FormGroup;
  public usuariosPreCargados : Array<any>; 

  public constructor(private servicioFormBuilder : FormBuilder, private servicioBD : DataBaseService, private servicioAuth : AuthService, 
    private servicioUsuario : UsuarioService, private servicioNavegacion : NavegacionService,private servicioAlerta : AlertaService)
  {
    this.usuariosPreCargados = 
    [
      {mail:'nezikellalle-2438@yopmail.com', clave:'123456' , url:'https://firebasestorage.googleapis.com/v0/b/clinica-b0de2.appspot.com/o/imagenes%2Fadministradores%2F20000000.1700096818119.jpg?alt=media&token=c7fec5f0-7a99-40b1-a72e-ac819f2cfb67'},
      {mail:'jalolimauzi-5619@yopmail.com', clave:'123456', url: 'https://firebasestorage.googleapis.com/v0/b/clinica-b0de2.appspot.com/o/imagenes%2Fpacientes%2F20000002.1700013529628.jpg?alt=media&token=68844008-395a-4f5d-b95a-05b87106d0f2'},
      {mail:'cikoifroimmawi-6597@yopmail.com', clave:'123456', url:'https://firebasestorage.googleapis.com/v0/b/clinica-b0de2.appspot.com/o/imagenes%2Fpacientes%2F20000001.1700013301725.png?alt=media&token=efef7efc-a528-44c6-9e54-b0297002df50'},
      {mail:'dopresaunacei-7753@yopmail.com', clave:'123456', url: 'https://firebasestorage.googleapis.com/v0/b/clinica-b0de2.appspot.com/o/imagenes%2Fpacientes%2F20000003.1700013735845.png?alt=media&token=98c24c63-7535-460a-9be3-a88928bfd539'}
    ]
    this.formularioLogin = servicioFormBuilder.group(
      {
        mail:
        [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        clave:
        [
          '',
          [
            Validators.minLength(6),
            Validators.required,
          ]
        ]
      }
    )
  }

  private cargarUsuario(usuario : UsuarioBase) : void
  {
    this.servicioUsuario.loguearUsuario(usuario);
    this.servicioNavegacion.cambiarRuta("/home");
  }

  public ingresarDatos()
  {
    let usuarioLeido : UsuarioBase;
    let usuarioEstaHabilitado : boolean = true;
    let documentData : DocumentData | undefined;
    let documentoUsuario :  DocumentData | undefined;

    if(this.formularioLogin.valid)
    {
      this.servicioAuth.iniciarSesion(this.formularioLogin.controls['mail'].value, this.formularioLogin.controls['clave'].value)
      .then((credenciales)=>
      {
        if(credenciales.user.emailVerified)
        {
          this.servicioBD.getDocRef(this.servicioBD.NombreTipoUsuariosCollection, credenciales.user.uid)
          .then((doc)=>
          {
            documentData = doc.data();
            if(documentData != undefined)
            {
              this.obtenerUsuarioDeBD(documentData['tipo'], credenciales.user.uid)
              .then((docUsuario)=>
              {
                documentoUsuario = docUsuario.data();

                if(documentoUsuario != null)
                {
                  switch(documentoUsuario['tipo'])
                  {
                    case 1:
                      usuarioLeido = new Paciente(documentoUsuario['id'], documentoUsuario['nombre'], documentoUsuario['apellido'],
                      documentoUsuario['edad'], documentoUsuario['dni'], documentoUsuario['mail'], documentoUsuario['obraSocial'],
                      documentoUsuario['listPathImagen'], documentoUsuario['listUrlImagen']);
                      break;

                    case 2:
                      if(documentoUsuario['tipo']==2)
                      {
                        usuarioEstaHabilitado = documentoUsuario['estaHabilitado'];
                        usuarioLeido = new Especialista(documentoUsuario['id'], documentoUsuario['nombre'], documentoUsuario['apellido'],
                        documentoUsuario['edad'], documentoUsuario['dni'], documentoUsuario['mail'], documentoUsuario['especialidad'],
                        documentoUsuario['estaHabilitado'], documentoUsuario['pathImagen'], documentoUsuario['urlImagen']);
                      }
                      break;

                    case 3:
                      usuarioLeido = new Administrador(documentoUsuario['id'], documentoUsuario['nombre'], documentoUsuario['apellido'],
                      documentoUsuario['edad'], documentoUsuario['dni'], documentoUsuario['mail'], documentoUsuario['pathImagen'], 
                      documentoUsuario['urlImagen']);
                      break
                      
                    default:
                      usuarioLeido = Paciente.getDefaultPaciente();
                      break;
                  }

                  if(usuarioEstaHabilitado)
                  {
                    this.cargarUsuario(usuarioLeido)
                  }
                  else
                  {
                    this.servicioAlerta.alertaWarning('El administrador no te habilita el acceso');
                  }
                }
              })
              .catch(error=> console.log(error));
            }
            
          })
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
    else
    {
      this.servicioAlerta.alertaError('Hay datos incompletos o invalidos');
    }
  }

  private obtenerUsuarioDeBD(tipo : number, id : string)
  {
    switch(tipo)
    {
      case 1:
        return this.servicioBD.getDocRef(this.servicioBD.NombrePacientesCollection, id);

      case 2:
        return this.servicioBD.getDocRef(this.servicioBD.NombreEspecialistasCollection, id);

      default:
        return this.servicioBD.getDocRef(this.servicioBD.NombreAdministradoresCollection, id);
    }
  }

  public cargarUsuarioPrecargado(mail : string, clave : string)
  {
    this.formularioLogin.controls['mail'].setValue(mail);
    this.formularioLogin.controls['clave'].setValue(clave);
  }
}

