import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {

  
  constructor(private ruteo : Router) 
  { 

  }

  public cambiarRuta(ruta : string) : void
  {
    this.ruteo.navigate([ruta]);
  }

  public get RutaActual() : string
  {
    return this.ruteo.url;
  }
}
