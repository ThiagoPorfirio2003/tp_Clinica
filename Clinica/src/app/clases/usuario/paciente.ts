import { UsuarioBase } from "./usuarioBase";

export class Paciente extends UsuarioBase
{
    //finn : 123456
    //korexe9289@eazenity.com
    
    private obraSocial : string;
    private listUrlImagen : Array<string>;
    private listPathImagen : Array<string>;

    constructor(id : string, nombre : string, apellido : string, edad : number, dni : string,mail : string,
        obraSocial : string, listPathImagen : Array<string> = [], listUrlImagen : Array<string> = [])
    {
        super(id, nombre, apellido, edad, dni, mail, 1);
        this.obraSocial = obraSocial;
        this.listUrlImagen = listUrlImagen;
        this.listPathImagen = listPathImagen;
    }

    public get ObraSocial() : string
    {
        return this.obraSocial;
    }

    public get ListUrlImagen() : Array<string>
    {
        return this.listUrlImagen;
    }

    public get ListPathImagen() : Array<string>
    {
        return this.listPathImagen;
    }

    public static getDefaultPaciente() : Paciente
    {
        return new Paciente('','','',0,'','','', [],[]);
    }
}