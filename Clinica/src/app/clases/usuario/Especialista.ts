import { UsuarioBase } from "./usuarioBase";
/*
"* Botones de Acceso rápido
 - Debe ser botones favbutton
 - Debe tener la imagen de perfil del usuario
 - Debe estar en la esquina inferior derecha de la pantalla login. 6 usuarios. (3 pacientes, 2 especialistas, 1 admin) ngFor
 Componente boton login(usuario elegido)

* Registro de usuarios
 - Al ingresar a la página solo se deben ver 2 botones con la imagen que represente un paciente o especialista, según esa elección mostrará el formulario correspondiente.
 - Estas imagenes tienen que estar en botones redondos uno al abajo del otro.

 Agregar edicion de foto
*/
export class Especialista extends UsuarioBase
{
    //msa5c078aq@rentforsale7.com
    //123456
    private urlImagen : string; 
    private pathImagen : string;
    private especialidad : string

    constructor(id: string, nombre : string, apellido : string, edad : number, dni : string,mail : string,
        estaHabilitado : boolean, especialidad : string, pathImagen : string='',  urlImagen : string='')
    {
        super(id, nombre, apellido, edad, dni, mail, 2, estaHabilitado);
        this.urlImagen = urlImagen;
        this.pathImagen = pathImagen;
        this.especialidad = especialidad;
    }

    public get Especialidad() : string
    {
        return this.especialidad;
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

    public static getDefaultEspecialista() : Especialista
    {
        return new Especialista('','','',0,'','',false,'','','');
    }
}