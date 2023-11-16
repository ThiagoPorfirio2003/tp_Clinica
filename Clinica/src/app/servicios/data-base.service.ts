import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, getDoc, query } from '@angular/fire/firestore';
import { Administrador } from '../clases/usuario/administrador';
import { Paciente } from '../clases/usuario/paciente';
import { Especialista } from '../clases/usuario/Especialista';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private nombrePacientesCollection : string;
  private nombreEspecialistasCollection : string;
  private nombreAdministradoresCollection : string;
  private nombreEspecialidadesCollection : string;
  private nombreDnisCollection : string;
  private nombreObrasSocialesCollection : string;
  private nombreTipoUsuariosCollection : string;


  private pacientesCollection;
  private especialistasCollection
  private administradoresCollection;
  private especialidadesCollection;
  private dnisCollection;
  private tipoUsuariosCollection;

  constructor(private firestore : Firestore) 
  { 
    this.nombrePacientesCollection = 'pacientes';
    this.nombreEspecialistasCollection = 'especialistas';
    this.nombreAdministradoresCollection = 'administradores';
    this.nombreEspecialidadesCollection = 'especialidades';
    this.nombreDnisCollection = 'dnis';
    this.nombreObrasSocialesCollection = 'obrasSociales';
    this.nombreTipoUsuariosCollection = 'tipoUsuarios'
    
    this.pacientesCollection = collection(this.firestore, this.nombrePacientesCollection);
    this.especialistasCollection = collection(this.firestore, this.nombreEspecialistasCollection);
    this.administradoresCollection = collection(this.firestore, this.nombreAdministradoresCollection);
    this.especialidadesCollection = collection(this.firestore, this.nombreEspecialidadesCollection);
    this.dnisCollection = collection(this.firestore, this.nombreDnisCollection);
    this.tipoUsuariosCollection = collection(this.firestore, this.nombreTipoUsuariosCollection)
  }

  //#region get NombreCollection

  public get NombrePacientesCollection() : string
  {
    return this.nombrePacientesCollection;
  }

  public get NombreEspecialistasCollection() : string
  {
    return this.nombreEspecialistasCollection;
  }

  public get NombreAdministradoresCollection() : string
  {
    return this.nombreAdministradoresCollection;
  }

  public get NombreEspecialidadesCollection() : string
  {
    return this.nombreEspecialidadesCollection;
  }

  public get NombreDnisCollection() : string
  {
    return this.nombreDnisCollection;
  }

  public get NombreObrasSocialesCollection() : string
  {
    return this.nombreObrasSocialesCollection;
  }

  public get NombreTipoUsuariosCollection() : string
  {
    return this.nombreTipoUsuariosCollection;
  }

  //#endregion

  //#region getQuery

  public get administradoresQuery()
  {
    return query(this.administradoresCollection);
  }

  public get pacientesQuery()
  {
    return query(this.pacientesCollection);
  }

  public get especialistasQuery()
  {
    return query(this.especialistasCollection);
  }

  public get especialidadesQuery()
  {
    return query(this.especialidadesCollection);
  }

  public get dnisQuery()
  {
    return query(this.dnisCollection);
  }
  //#endregion

  //#region guardadoDatos
  public guardarDatosPaciente(paciente : Paciente)
  {
   //El id del admin sera el mismo que el uid del auth.currentUser
    return setDoc(doc(this.firestore, this.nombrePacientesCollection, paciente.Id),
    {
      id: paciente.Id,
      tipo : paciente.Tipo,
      nombre: paciente.Nombre,
      apellido: paciente.Apellido,
      edad: paciente.Edad,
      dni: paciente.DNI,
      mail: paciente.Mail,
      obraSocial : paciente.ObraSocial,
      listPathImagen : paciente.ListPathImagen,
      listUrlImagen : paciente.ListUrlImagen
    }
    )
  }

  public guardarDatosEspecialista(especialista : Especialista)
  {
   //El id del admin sera el mismo que el uid del auth.currentUser
    return setDoc(doc(this.firestore, this.nombreEspecialistasCollection, especialista.Id),
    {
      id: especialista.Id,
      tipo : especialista.Tipo,
      nombre: especialista.Nombre,
      apellido: especialista.Apellido,
      edad: especialista.Edad,
      dni: especialista.DNI,
      mail: especialista.Mail,
      pathImagen : especialista.PathImagen,
      urlImagen : especialista.UrlImagen,
      especialidad : especialista.Especialidad,
      estaHabilitado : especialista.EstaHabilitado
    }
    )
  }

  public guardarDatosAdministrador(admin : Administrador)
  {
   //El id del admin sera el mismo que el uid del auth.currentUser
    return setDoc(doc(this.firestore, this.nombreAdministradoresCollection, admin.Id),
    {
      id: admin.Id,
      tipo : admin.Tipo,
      nombre: admin.Nombre,
      apellido: admin.Apellido,
      edad: admin.Edad,
      dni: admin.DNI,
      mail: admin.Mail,
      pathImagen : admin.PathImagen,
      urlImagen : admin.UrlImagen
    }
    )
  }

  public guardarDatosEspecialidad(nombreEspecialidad : string)
  {
    const documentoEspecialidad = doc(this.especialidadesCollection);

    return setDoc(documentoEspecialidad,
    {
      nombre : nombreEspecialidad
    })
  }

  public guardarDatosDNI(dni : string)
  {
    return setDoc(doc(this.firestore, this.nombreDnisCollection, dni),
    {
      dni : dni
    }
    )
  }

  public guardarDatosObraSocial(obraSocial : string)
  {
    return setDoc(doc(this.firestore, this.nombreObrasSocialesCollection, obraSocial),
    {
      numero : obraSocial
    }
    )  
  }

  public guardarTipoUsuario(tipoUsuario : number, id_Usuario : string)
  { 
    return setDoc(doc(this.firestore, this.nombreTipoUsuariosCollection, id_Usuario),
    {
      tipo : tipoUsuario
    }
    )  
  }
  //#endregion
  
  public getDocRef(nombreCollection : string, idDoc : string)
  {
    return getDoc(doc(this.firestore, nombreCollection, idDoc));
  }

  public actualizarHabilitadoEspecialista(especialista : Especialista)
  {
    const docRef = doc(this.firestore, this.nombreEspecialidadesCollection, especialista.Id);

    return updateDoc(docRef, 
      {
        estaHabilitado : especialista.EstaHabilitado
      });
  }
}
