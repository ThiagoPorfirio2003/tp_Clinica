export class UsuarioBase
{
    //0=No hay
    //1=Paciente
    //2=Especialista
    //3=Admin

    /*
    admin1234
    
    */

    private nombre : string;
    private apellido : string;
    private edad : number;
    private dni : string;
    private mail : string;
  //  private fechaDeCreacion : Date;
    private tipo : number;
    private id : string;
    private estaHabilitado : boolean;

    protected constructor(id : string, nombre : string, apellido : string, edad : number, dni : string,mail : string, tipo : number, estaHabilitado : boolean)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.tipo = tipo;
        this.estaHabilitado = estaHabilitado;
    }

    public obtenerDefaultUsuario()
    {
        return new UsuarioBase('','','',0,'','',0, true)
    }

    public get Id() : string
    {
        return this.id;
    }

    public get Nombre() : string
    {
        return this.nombre;
    }
    
    public get Apellido() : string
    {
        return this.apellido;
    }

    public get Edad() : number
    {
        return this.edad;
    }

    public get DNI() : string
    {
        return this.dni;
    }

    public get Mail() : string
    {
        return this.mail;
    }

    public get Tipo() : number
    {
        return this.tipo;
    }

    public get EstaHabilitado() : boolean
    {
        return this.estaHabilitado;
    }

    public set EstaHabilitado(estaHabilitado : boolean)
    {
        this.estaHabilitado = estaHabilitado;
    }
}