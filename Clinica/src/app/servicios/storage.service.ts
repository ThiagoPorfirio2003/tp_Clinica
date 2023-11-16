import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private pacienteImgCarpetaPath : string;
  private especialistaImgCarpetaPath : string;
  private administradorImgCarpetaPath : string;

  constructor(private storage : Storage) 
  { 
    this.pacienteImgCarpetaPath = 'imagenes/pacientes/';
    this.especialistaImgCarpetaPath = 'imagenes/especialistas/'
    this.administradorImgCarpetaPath = 'imagenes/administradores/';
  }

  public get PacienteImgCarpetaPath() : string
  {
    return this.pacienteImgCarpetaPath;
  }

  public get EspecialistaImgCarpetaPath() : string
  {
    return this.especialistaImgCarpetaPath;
  }

  public get AdministradorImgCarpetaPath() : string
  {
    return this.administradorImgCarpetaPath;
  }

  public calcularNombreFotoUsuario(nombreOriginalImagen : string, pathCarpeta : string, dniUsuario : string) : string
  {
    return pathCarpeta + dniUsuario + "." + Date.now() + "." + nombreOriginalImagen.split(".").pop();
  }

  public async guardarUsuarioImagen(imagen : File, pathAGuardar : string) : Promise<string>
  {
    let imgRef = ref(this.storage, pathAGuardar);
    let todoBien : boolean = false;
    let mensajeRetorno : string= '';

    await uploadBytes(imgRef, imagen).then(
      (exito)=>getDownloadURL(imgRef)
      .then(
      (url) =>
      {
        mensajeRetorno = url;
        todoBien = true;
      })
      .catch(fracaso=> mensajeRetorno = JSON.stringify(fracaso))
    )
    .catch(fracaso=> mensajeRetorno = JSON.stringify(fracaso))

    return new Promise<string>((resolve, reject)=>
    {
      if(todoBien)
      {
        resolve(mensajeRetorno)
      }
      else
      {
        reject(mensajeRetorno)
      }
    })
  }
}
