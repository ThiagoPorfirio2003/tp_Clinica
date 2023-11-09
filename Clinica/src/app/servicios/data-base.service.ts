import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private collectionEspecialidades;
  private collectionUsuarios;
  private pathUsuarioImg : string;

  constructor(private firestore : Firestore, private storage : Storage, public auth : Auth) 
  { 
    this.pathUsuarioImg = 'imagenes/usuarios/'

    this.collectionEspecialidades = collection(this.firestore, 'especialidades');
    this.collectionUsuarios = collection(this.firestore, 'usuarios');
  }

  public get EspecialidadesCollectionData()
  {
    return collectionData(this.collectionEspecialidades);
  }

  public get UsuariosCollectionData()
  {
    return collectionData(this.collectionUsuarios);
  }

  public crearUsuario({mail, clave} : any)
  {
    return createUserWithEmailAndPassword(this.auth, mail, clave);
  }

  public enviarMailVerificacion(user : User)
  {
    return sendEmailVerification(user);
  }

  public iniciarSesion({mail, clave} : any)
  {
    return signInWithEmailAndPassword(this.auth ,mail,clave);
  }

  public cerrarSesion()
  {
    return signOut(this.auth);
  }

  public habilitarEspecialista(datosUsuario : any)
  {
    const docRef = doc(this.firestore, 'usuarios', datosUsuario.id);

    return updateDoc(docRef, 
      {datosUsuario });
  }

  public guardarDatosEspecialidad(nombreEspecialidad : string)
  {
    const documentoEspecialidad = doc(this.collectionEspecialidades);

    return setDoc(documentoEspecialidad,
    {
      nombre : nombreEspecialidad
    })
  }

  private calcularNombreFotoUsuario(imagen : any, dniUsuario : number) : string
  {
    return this.pathUsuarioImg + dniUsuario + "." + Date.now() + "." + imagen.name.split(".").pop();
  }

  public async guardarUsuarioImagen(imagen : any, dniUsuario : number) : Promise<string>
  {
    let pathCompleto = this.calcularNombreFotoUsuario(imagen, dniUsuario);
    let imgRef = ref(this.storage, pathCompleto)
    let todoBien : boolean = false;
    let mensajeRetorno : string= '';

    await uploadBytes(imgRef, imagen)
      .then(
      ()=>getDownloadURL(imgRef)
      .then((url) =>
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

  public guardarDatosUsuario(datosUsuario : any)
  {
    const documentoUsuario = doc(this.collectionUsuarios);
    datosUsuario.id = documentoUsuario.id;

    return setDoc(documentoUsuario,
    {
      datosUsuario
    })
  }
}
