import { UsuarioBase } from "./usuarioBase";

export class Especialista extends UsuarioBase
{
    //msa5c078aq@rentforsale7.com
    //123456
    private urlImagen : string; 
    private especialidad : string
    private estaHabilitado : boolean;

    constructor(id: string, nombre : string, apellido : string, edad : number, dni : number,mail : string, urlImagen : string,
        especialidad : string, estaHabilitado : boolean)
    {
        super(id, nombre, apellido, edad, dni, mail, 2);
        this.urlImagen = urlImagen;
        this.especialidad = especialidad;
        this.estaHabilitado = estaHabilitado;
    }

    public get Especialidad() : string
    {
        return this.especialidad;
    }

    public get UrlImagen() : string
    {
        return this.urlImagen;
    }

    public get EstaHabilitado() : boolean
    {
        return this.estaHabilitado;
    }

    public set EstaHabilitado(estaHabilitado : boolean)
    {
        this.estaHabilitado = estaHabilitado;
    }

    public static getDefaultEspecialista() : Especialista
    {
        return new Especialista('','','',0,0,'', '','', false);
    }
}