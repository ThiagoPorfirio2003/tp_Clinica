import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { async } from 'rxjs';
import { Especialista } from 'src/app/clases/usuario/Especialista';
import { Administrador } from 'src/app/clases/usuario/administrador';
import { Paciente } from 'src/app/clases/usuario/paciente';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent 
{
  public tipoUsuarioARegistrar : number;
  public tipoUsuarioTXT : string;
  public txtLabelImagenes : string

  public especialidades : Array<string>;
  public imagenes : Array<File>;

  public formularioInscripcionGeneral : FormGroup;
  public formularioInscripcionPaciente : FormGroup;
  public formularioInscripcionEspecialista : FormGroup;

//#region constructor
  public constructor(public servicioFormBuilder : FormBuilder, private servicioDB : DataBaseService, 
    private servicioAuth: AuthService, private servicioStorage : StorageService, 
    private servicioAlerta : AlertaService)
  {
    this.tipoUsuarioARegistrar = 0;
    this.tipoUsuarioTXT = 'paciente';
    this.txtLabelImagenes = '2 imagenes de perfil';

    this.especialidades = new Array<any>();
    this.imagenes = new Array<any>();

    this.formularioInscripcionPaciente = this.servicioFormBuilder.group
    (
      {
        obraSocial :
        [
          '',
          [
            Validators.min(20000000),
            Validators.required,
            Validators.pattern("^[0-9]*$")
          ]
        ]
      }
    )

    this.formularioInscripcionEspecialista = this.servicioFormBuilder.group
    (
      {
        especialidad :
        [
          null,
          [
            Validators.required,
          ]
        ]
      }
    )

    this.formularioInscripcionGeneral = this.servicioFormBuilder.group(
      {
        nombre : 
        ['',
          [
            Validators.minLength(2),
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern("[a-zA-Z ]*"),
          ]
        ],
        apellido : 
        [
          '',
          [
            Validators.minLength(2),
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern("[a-zA-Z ]*"),
          ]
        ],
        edad :
        [
          '',
          [
            Validators.min(18),
            Validators.required,
            Validators.pattern("^[0-9]*$")
          ]
        ],
        dni :
        [
          '',
          [
            Validators.min(20000000),
            Validators.required,
            Validators.pattern("^[0-9]*$")
          ]
        ],
        mail : 
        [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        clave : 
        [
          '',
          [
            Validators.minLength(6),
            Validators.required,
          ]
        ],
        imagenes :
        [
          null,
          [
            Validators.required,
          ]
        ]
      }
    )
  }

  //#endregion
  
  ngOnInit() 
  {
    this.cargarEspecialidades()
  }

  public recibirArchivos(archivos : any)
  {
    this.imagenes = archivos.target.files;
  }

  private cargarEspecialidades()
  {
    const especialidadesQuery = this.servicioDB.especialidadesQuery;

    onSnapshot(especialidadesQuery, 
      (respuesta)=>
      {
        respuesta.docChanges().forEach((change)=>
        {
          let especialidad = change.doc.data()
          this.especialidades.push(especialidad['nombre']);
        })
      })
  }

  public agregarEspecialidad()
  {
    let nuevaEspecialidad = (<HTMLInputElement> document.getElementById('nuevaEspecialidad')).value;
    if(nuevaEspecialidad != '')
    {
      this.servicioDB.guardarDatosEspecialidad(nuevaEspecialidad);
    }
  }

  public cambiarTipoUsuarioARegistrar(nuevotipoUsuarioARegistrar : number)
  {
    this.tipoUsuarioARegistrar = nuevotipoUsuarioARegistrar;
    
    switch(this.tipoUsuarioARegistrar)
    {
      case 1:
        this.txtLabelImagenes='2 imagenes de perfil';
        this.tipoUsuarioTXT= 'paciente';
        break;

      case 2:
        this.txtLabelImagenes = '1 imagen de perfil';
        this.tipoUsuarioTXT= 'especialista';
        break;

      case 3:
        this.txtLabelImagenes = '1 imagen de perfil';
          this.tipoUsuarioTXT= 'administrador';
        break;
    }
  }

  private async existeElDNI(dni : string) : Promise<boolean| string>
  {
    let retorno : boolean = false;
    let entroAlThen : boolean = false;
    let mensajeError : string;

    await this.servicioDB.getDocRef(this.servicioDB.NombreDnisCollection, dni)
    .then((doc)=>
    {
      entroAlThen = true;
      retorno = doc.exists();
    })
    .catch((error)=>
    {
      mensajeError = JSON.stringify(error);
    })

    return new Promise<boolean| string>((resolve, reject)=>
    {
      if(entroAlThen)
      {
        resolve(retorno)
      }
      else
      {
        reject(mensajeError)
      }
    })
  }

  private async existeLaObraSocial(obraSocial : string) : Promise<boolean| string>
  {
    let retorno : boolean = false;
    let entroAlThen : boolean = false;
    let mensajeError : string;

    await this.servicioDB.getDocRef(this.servicioDB.NombreObrasSocialesCollection, obraSocial)
    .then((doc)=>
    {
      entroAlThen = true;
      retorno = doc.exists();
    })
    .catch((error)=>
    {
      mensajeError = JSON.stringify(error);
    })

    return new Promise<boolean| string>((resolve, reject)=>
    {
      if(entroAlThen)
      {
        resolve(retorno)
      }
      else
      {
        reject(mensajeError)
      }
    })
  }

  private registrarPaciente()
  {
    let datosInscripcion : any = this.formularioInscripcionGeneral.value
    let datosInscripcionEspecifico : any = this.formularioInscripcionPaciente.value;
    let usuarioActual : User | null = this.servicioAuth.usuarioActual;
    let nuevoPaciente : Paciente;

    this.servicioAuth.crearUsuario(datosInscripcion.mail, datosInscripcion.clave)
    .then((credencialUsuario)=>
    {
      nuevoPaciente = new Paciente(credencialUsuario.user.uid, datosInscripcion.nombre, datosInscripcion.apellido,
        datosInscripcion.edad, datosInscripcion.dni.toString(), datosInscripcion.mail, datosInscripcionEspecifico.obraSocial.toString())

      this.servicioAuth.enviarMailVerificacion(credencialUsuario.user)
      .then(()=>
      {
        for(let i : number = 0; i< this.imagenes.length; i++)
        {
          nuevoPaciente.ListPathImagen.push(this.servicioStorage.calcularNombreFotoUsuario(this.imagenes[i].name, 
            this.servicioStorage.PacienteImgCarpetaPath, nuevoPaciente.DNI));
            
          this.servicioStorage.guardarUsuarioImagen(this.imagenes[i], nuevoPaciente.ListPathImagen[i])
          .then((urlImagen)=>
          {
            nuevoPaciente.ListUrlImagen.push(urlImagen);

            if(nuevoPaciente.ListPathImagen.length == nuevoPaciente.ListUrlImagen.length)
            {
              this.servicioDB.guardarDatosPaciente(nuevoPaciente)
              .then(()=>
              {
                this.servicioDB.guardarTipoUsuario(nuevoPaciente.Tipo, nuevoPaciente.Id)
                .catch((error) => console.log(error));
                
                this.servicioDB.guardarDatosDNI(nuevoPaciente.DNI)
                .catch((error) => console.log(error));

                this.servicioDB.guardarDatosObraSocial(nuevoPaciente.ObraSocial)
                .catch((error) => console.log(error));

                this.servicioAlerta.alertaExito('El paciente ha sido creado con exito, ahora verifica tu cuenta desde tu mail');
              });
            }
          })
          .catch(error=> console.log(error));
        }
      })
      .catch(error=> console.log(error))

      if(usuarioActual != null)
      {
        this.servicioAuth.cambiarUsuarioActual(usuarioActual);
      }
    })
    .catch(error=> this.servicioAlerta.alertaErrorFirebase(error.code));
  }

  private registrarEspecialista()
  {
    let datosInscripcion : any = this.formularioInscripcionGeneral.value
    let usuarioActual : User | null = this.servicioAuth.usuarioActual;
    let nuevoEspecialista : Especialista;

    this.servicioAuth.crearUsuario(datosInscripcion.mail, datosInscripcion.clave)
    .then((credencialUsuario)=>
    {
      nuevoEspecialista = new Especialista(credencialUsuario.user.uid, datosInscripcion.nombre, datosInscripcion.apellido,
        parseInt(datosInscripcion.edad), datosInscripcion.dni.toString(), datosInscripcion.mail, datosInscripcion.especialidad, false)

      this.servicioAuth.enviarMailVerificacion(credencialUsuario.user)
      .then(()=>
      {
        nuevoEspecialista.PathImagen = this.servicioStorage.calcularNombreFotoUsuario(this.imagenes[0].name, 
          this.servicioStorage.EspecialistaImgCarpetaPath, nuevoEspecialista.DNI)
  
        this.servicioStorage.guardarUsuarioImagen(this.imagenes[0], nuevoEspecialista.PathImagen)
        .then((urlImagen)=>
        {
          nuevoEspecialista.UrlImagen = urlImagen;
          this.servicioDB.guardarDatosEspecialista(nuevoEspecialista)
          .then(()=>
          {
            this.servicioDB.guardarTipoUsuario(nuevoEspecialista.Tipo, nuevoEspecialista.Id)
            .catch((error) => console.log(error));

            this.servicioDB.guardarDatosDNI(nuevoEspecialista.DNI)
            .catch((error) => console.log(error))

            this.servicioAlerta.alertaExito('El especialista ha sido creado con exito, ahora verifica tu cuenta desde tu mail y espera ' +
            'a que un admin autorize tu cuenta');
          });
        })
        .catch(error=> console.log(error));
      })
      .catch(error=> console.log(error))

      if(usuarioActual != null)
      {
        this.servicioAuth.cambiarUsuarioActual(usuarioActual);
      }
    })
    .catch(error=> this.servicioAlerta.alertaErrorFirebase(error.code));
  }

  private registrarAdministrador()
  {
    let datosInscripcion : any = this.formularioInscripcionGeneral.value
    let usuarioActual : User | null = this.servicioAuth.usuarioActual;
    let nuevoAdmin : Administrador;

    this.servicioAuth.crearUsuario(datosInscripcion.mail, datosInscripcion.clave)
    .then((credencialUsuario)=>
    {
      nuevoAdmin = new Administrador(credencialUsuario.user.uid, datosInscripcion.nombre, datosInscripcion.apellido,
        parseInt(datosInscripcion.edad), datosInscripcion.dni.toString(), datosInscripcion.mail)

      this.servicioAuth.enviarMailVerificacion(credencialUsuario.user)
      .then(()=>
      {
        nuevoAdmin.PathImagen = this.servicioStorage.calcularNombreFotoUsuario(this.imagenes[0].name, this.servicioStorage.AdministradorImgCarpetaPath,
          nuevoAdmin.DNI)
  
        this.servicioStorage.guardarUsuarioImagen(this.imagenes[0], nuevoAdmin.PathImagen)
        .then((urlImagen)=>
        {
          nuevoAdmin.UrlImagen = urlImagen;
          this.servicioDB.guardarDatosAdministrador(nuevoAdmin)
          .then(()=>
          {
            this.servicioDB.guardarTipoUsuario(nuevoAdmin.Tipo, nuevoAdmin.Id)
            .catch((error) => console.log(error));

            this.servicioDB.guardarDatosDNI(nuevoAdmin.DNI)
            .catch((error) => console.log(error));

            this.servicioAlerta.alertaExito('El nuevo admin ha sido creado con exito, ahora debe verificarlo desde el mail');
          });
        })
        .catch(error=> console.log(error));
      })
      .catch(error=> console.log(error))

       this.servicioAuth.cambiarUsuarioActual(usuarioActual);
    })
    .catch(error=> this.servicioAlerta.alertaErrorFirebase(error.code));
  }

  public registrarUsuario()
  {
    let todosLosFormlariosSonValidos : boolean = false;

    if(this.formularioInscripcionGeneral.valid)
    {
      this.existeElDNI(this.formularioInscripcionGeneral.controls['dni'].value.toString())
      .then((respuesta)=>
      {
        if(!respuesta)
        {
          switch(this.tipoUsuarioARegistrar)
          {
            case 1:
              if(this.formularioInscripcionPaciente.valid)
              {
                todosLosFormlariosSonValidos = true;

                this.existeLaObraSocial(this.formularioInscripcionPaciente.controls['obraSocial'].value.toString())
                .then((existeObraSocial)=>
                {
                  if(!existeObraSocial)
                  {
                    this.registrarPaciente();
                  }
                  else
                  {
                    this.servicioAlerta.alertaError('La obra social corresponde a otro usuario');
                  }
                })
                .catch(error => console.log(error));
              }
              break;
    
            case 2:
              if(this.formularioInscripcionEspecialista.valid)
              {
                todosLosFormlariosSonValidos = true
                this.registrarEspecialista();
              }
              break;
    
            case 3:
              todosLosFormlariosSonValidos = true
              this.registrarAdministrador();
              break;
          }

          if(!todosLosFormlariosSonValidos)
          {
            this.servicioAlerta.alertaError('Hay datos que faltan completar o no cumplen con las condiciones');
          }
        }
        else
        {
          this.servicioAlerta.alertaError('El DNI le pertenece a otro usuario, ingrese alguno que NO este usado');
        }
      })
      .catch((error)=> console.log('Error:\n' + error))
    }
    else
    {
      this.servicioAlerta.alertaError('Hay datos que faltan completar o no cumplen con las condiciones');
    }
  }
}