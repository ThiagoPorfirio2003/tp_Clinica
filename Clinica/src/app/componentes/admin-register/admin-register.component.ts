import { Component,Input,EventEmitter,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { DataBaseService } from 'src/app/servicios/data-base.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {

  public tipoUsuarioNumerico : number;
  public especialidades : Array<any>;
  public txtLabelImagenes : string
  public tipoUsuarioTXT : string;
  public imagenes : Array<any>;
  @Input() tipoUsuarioLogueado : number;
  @Output() pasarDatosRegistroEvent : EventEmitter<any>; 

  public formularioInscripcionGeneral : FormGroup;
  public formularioInscripcionPaciente : FormGroup;
  public formularioInscripcionEspecialista : FormGroup;

  public constructor(public servicioFormBuilder : FormBuilder, private servicioDB : DataBaseService, 
    private servicioAlerta : AlertaService)
  {
    this.especialidades = new Array<any>();
    this.pasarDatosRegistroEvent = new EventEmitter<any>();
    this.imagenes = new Array<any>();

    this.tipoUsuarioNumerico = 1;
    this.tipoUsuarioTXT = 'paciente';
    this.txtLabelImagenes = '2 imagenes de perfil';

    this.tipoUsuarioLogueado = 3;

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
    const observableEspecialidades = this.servicioDB.EspecialidadesCollectionData;

    observableEspecialidades.subscribe((especialidadesLeidas) =>
      {
        this.especialidades = especialidadesLeidas as Array<any>
      }
    )
  }

  public agregarEspecialidad()
  {
    let nuevaEspecialidad = (<HTMLInputElement> document.getElementById('nuevaEspecialidad')).value;
    if(nuevaEspecialidad != '')
    {
      this.servicioDB.guardarDatosEspecialidad(nuevaEspecialidad);
    }
  }

  public cambiarTipoUsuario(id_Selector : string)
  {
    this.tipoUsuarioNumerico = parseInt((<HTMLInputElement> document.getElementById(id_Selector)).value);
    
    switch(this.tipoUsuarioNumerico)
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

  public pasarDatosRegistro()
  {
    let formularioEsValido : boolean = false;
  
    if(this.formularioInscripcionGeneral.valid)
    {
      let datosUsuarioTXT : any =
      {
        nombre: this.formularioInscripcionGeneral.controls['nombre'].value,
        apellido: this.formularioInscripcionGeneral.controls['apellido'].value,
        edad: this.formularioInscripcionGeneral.controls['edad'].value,
        dni: this.formularioInscripcionGeneral.controls['dni'].value,
        mail: this.formularioInscripcionGeneral.controls['mail'].value,
        clave: this.formularioInscripcionGeneral.controls['clave'].value,
        tipo : this.tipoUsuarioNumerico
      }

      let datosRegistro : any =
      {
        datosUsuarioTXT : datosUsuarioTXT,
        imagenesUsuario: this.imagenes,
      }
  
      switch(this.tipoUsuarioNumerico)
      {
        case 1:
          if(this.formularioInscripcionPaciente.valid && this.imagenes.length == 2)
          {
            datosUsuarioTXT.obraSocial = this.formularioInscripcionPaciente.controls['obraSocial'].value;
            formularioEsValido = true;
          }
          break;
  
        case 2:
          if(this.formularioInscripcionEspecialista.valid && this.imagenes.length == 1)
          {
            datosUsuarioTXT.especialidad =this.formularioInscripcionEspecialista.controls['especialidad'].value;
            datosUsuarioTXT.estaHabilitado = false
            formularioEsValido = true;
          }
          break;
  
        case 3:
          if(this.imagenes.length == 1)
          {
            formularioEsValido = true;
          }
          break;
      }
  
      if(formularioEsValido)
        {
          this.pasarDatosRegistroEvent.emit(datosRegistro);
        }
    }
    if(!formularioEsValido)
    {
      this.servicioAlerta.alertaWarning('Hay campos que no cumplen las condiciones');
    }
  }
}

