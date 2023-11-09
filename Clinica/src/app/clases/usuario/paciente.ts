import { UsuarioBase } from "./usuarioBase";

export class Paciente extends UsuarioBase
{
    //finn : 123456
    //korexe9289@eazenity.com
    
    private obraSocial : number;
    private urlsImagenes : Array<string>;

    constructor(id : string, nombre : string, apellido : string, edad : number, dni : number,mail : string,
        obraSocial : number, urlsImagenes : Array<string>)
    {
        super(id, nombre, apellido, edad, dni, mail, 1);
        this.obraSocial = obraSocial;
        this.urlsImagenes = urlsImagenes;
    }

    public get ObraSocial() : number
    {
        return this.obraSocial;
    }

    public get UrlsImagenes() : Array<string>
    {
        return this.urlsImagenes;
    }

    public static getDefaultPaciente() : Paciente
    {
        return new Paciente('','','',0,0,'',0, []);
    }
}