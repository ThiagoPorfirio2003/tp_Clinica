import { UsuarioBase } from "./usuarioBase";

export class Administrador extends UsuarioBase
{
    //ysckha0grj@myinfoinc.com
    private urlImagen : string; 

    constructor(id : string, nombre : string, apellido : string, edad : number, dni : number,mail : string, urlImagen : string)
    {
        super(id, nombre, apellido, edad, dni, mail, 3);
        this.urlImagen = urlImagen;
    }

    public get UrlImagen() : string
    {
        return this.urlImagen;
    }
}