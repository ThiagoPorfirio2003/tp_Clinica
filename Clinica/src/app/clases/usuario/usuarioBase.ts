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
    private dni : number;
    private mail : string;
    private fechaDeCreacion : Date;
    private tipo : number;
    private id : string;

    protected constructor(id : string, nombre : string, apellido : string, edad : number, dni : number,mail : string, tipo : number)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.fechaDeCreacion = new Date();
        this.tipo = tipo;
    }

    public obtenerDefaultUsuario()
    {
        return new UsuarioBase('','','',0,0,'',0)
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

    public get DNI() : number
    {
        return this.dni;
    }

    public get Mail() : string
    {
        return this.mail;
    }

    public get FechaCreacion() : Date
    {
        return this.fechaDeCreacion;
    }

    public get Tipo() : number
    {
        return this.tipo;
    }
    //admin1234
    //normal1234
    //thiago1234
    //mauro1234

    /*
    public constructor(nombre : string, apellido : string, nombreUsuario : string, mail : string, fechaDeCreacion : Date, tipo : number)//, ultimaConexion : Date)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.mail = mail;
        this.fechaDeCreacion = fechaDeCreacion;
        this.tipo = tipo;
    }
    
    public static getDefaultUser() : Usuario
    {
        return new Usuario("","","","",new Date(), 1);
    }

    
    */
}