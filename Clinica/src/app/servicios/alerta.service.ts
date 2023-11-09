import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertaService 
{
  constructor() 
  { }

  //icon 0 = question
  //icon 1 = success
  //invertirColores: Si es true, el voton de cancelar en azul y el de aceptar es rojo
  public alertaAceptarCancelar(title : string, icon : number, text : string, confirmButtonText : string, 
    cancelButtonText : string, invertirColores : boolean)
  {
    let colorOk : string = '#3085d6';
    let colorCancel : string = '#d33';

    if(invertirColores)
    {
      colorOk = '#d33'
      colorCancel = '#3085d6';
    }

    switch(icon)
    {
      case 0: 
      return Swal.fire(
        {
          title: title,
          text: text,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: colorOk,
          cancelButtonColor: colorCancel,
          confirmButtonText: confirmButtonText,
          cancelButtonText: cancelButtonText
        })

      case 1: 
        return Swal.fire(
          {
            title: title,
            text: text,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: colorOk,
            cancelButtonColor: colorCancel,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
          })

      default: 
      return Swal.fire(
        {
          title: title,
          text: text,
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: colorOk,
          cancelButtonColor: colorCancel,
          confirmButtonText: confirmButtonText,
          cancelButtonText: cancelButtonText
        })
    }
  }

  public alertaWarning(mensaje : string) : void
  {
    Swal.fire
    (
      {
        icon: 'warning',
        title: mensaje
      }
    )
  }

  public alertaExito(mensaje : string) : void
  {
    Swal.fire
    (
      {
        icon: 'success',
        title: mensaje
      }
    )
  }

  public alertaError(mensaje : string) : void
  {
    Swal.fire
    (
      {
        icon: 'error',
        title: mensaje
      }
    )
  }

  public alertaErrorFirebase(mensaje : string)
  {
    let mensajeTraducido : any = this.traducirMensajeError(mensaje);
    Swal.fire
    (
      {
        icon: mensajeTraducido.icon,
        title: mensajeTraducido.title
      }
    )
  }

  private traducirMensajeError(mensajeError : string) : any
  {
    let title : string;
    let icon : string;
    
    switch(mensajeError)
    {
      case "auth/invalid-email": 
      
        //title= "";
        title = "El mail no es valido";
        icon = "warning";
      break;

      case "auth/email-already-in-use": 
        title = "El mail ya pertenece a otro usuario";
        icon = "warning";
      break;

      case "auth/weak-password":       
        title = "La contraseña debe de tener mas de 6 caracteres";
        icon = "warning";
      break;

      case "auth/missing-password": 
        title = "No se ingreso la clave";
        icon = "error";
      break;

      case "auth/invalid-login-credentials": 
        title = "Los datos no pertenecen ningun usuario";
        icon = "warning";
      break;

      default:
        title = mensajeError;
        icon = "warning";
      break;
    }
    return {title, icon};
  }
}
