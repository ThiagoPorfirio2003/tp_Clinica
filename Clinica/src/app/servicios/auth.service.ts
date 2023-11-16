import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, user } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : Auth) 
  { }

  public get usuarioActual() : User | null
  {
    return this.auth.currentUser
  }

  public crearUsuario(mail : string, clave : string)
  {
    return createUserWithEmailAndPassword(this.auth, mail, clave);
  }

  public enviarMailVerificacion(user : User)
  {
    return sendEmailVerification(user);
  }

  public iniciarSesion(mail : string, clave : string)
  {
    return signInWithEmailAndPassword(this.auth, mail, clave);
  }

  public cerrarSesion()
  {
    return signOut(this.auth);
  }

  public cambiarUsuarioActual(nuevoUsuario : User | null)
  {
    return this.auth.updateCurrentUser(nuevoUsuario)
  }
}
