import { Component } from '@angular/core';
import { onSnapshot } from 'firebase/firestore';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { ListadoUsuariosComponent } from 'src/app/componentes/listado-usuarios/listado-usuarios.component';

@Component({
  selector: 'app-mostrar-totalidad-usuarios',
  templateUrl: './mostrar-totalidad-usuarios.component.html',
  styleUrls: ['./mostrar-totalidad-usuarios.component.css']
})
export class MostrarTotalidadUsuariosComponent 
{
  public usuarios : Array<any>;
  
  constructor(public servicioBD : DataBaseService)
  {
    this.usuarios = new Array<any>();
  }
  
  ngOnInit()
  {
    this.cargarUsuarios();
  }

  
  private cargarUsuarios()
  {
  }
  

  private cargarPacientes()
  {
    const pacientesQuery = this.servicioBD.pacientesQuery;

    onSnapshot(pacientesQuery, 
      (respuesta)=>
      {
        respuesta.docChanges().forEach((change)=>
        {
          this.usuarios.push(change.doc.data());
        })
      }) 
  }

  private cargarEspecialistas()
  {
    const especialistasQuery = this.servicioBD.especialistasQuery;

    onSnapshot(especialistasQuery, 
      (respuesta)=>
      {
        respuesta.docChanges().forEach((change)=>
        {
          this.usuarios.push(change.doc.data());
        })
      })
  }

  private cargarAdmins()
  {
    const administradoresQuery = this.servicioBD.administradoresQuery;

    onSnapshot(administradoresQuery, 
      (respuesta)=>
      {
        respuesta.docChanges().forEach((change)=>
        {
          this.usuarios.push(change.doc.data());
        })
      })
  }
}
