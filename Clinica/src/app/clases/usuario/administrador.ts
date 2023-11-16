import { UsuarioBase } from "./usuarioBase";

export class Administrador extends UsuarioBase
{
    private urlImagen : string; 
    private pathImagen : string;

    constructor(id : string, nombre : string, apellido : string, edad : number, dni : string, mail : string, estaHabilitado : boolean
        ,pathImagen : string='', urlImagen : string='')
    {
        super(id, nombre, apellido, edad, dni, mail, 3, estaHabilitado);
        this.urlImagen = urlImagen;
        this.pathImagen = pathImagen;
    }

    public get UrlImagen() : string
    {
        return this.urlImagen;
    }
    
    public get PathImagen() : string
    {
        return this.pathImagen;
    }

    public set UrlImagen(nuevaUrl : string)
    {
        this.urlImagen = nuevaUrl;
    }

    public set PathImagen(nuevoPath : string)
    {
        this.pathImagen = nuevoPath;
    }
}