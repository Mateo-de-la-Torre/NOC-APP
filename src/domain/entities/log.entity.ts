// ENTIDAD: nos va a permitir crear instancias del LogEntity y va a gobernar la app

// Con esta entidad buscamos poder tener nuestro sistema de logs,
// para poder guardarlo en fileSystem, o dataBase sin cambiar todo el codigo

export enum LogSeverityLevel { // los valores que puede tener el level
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}


export class LogEntity { // 

    public level    : LogSeverityLevel; // Declara una propiedad para almacenar los niveles del log
    public message  : string; // Declara una propiedad para almacenar el mensaje del log
    public createdAt: Date; // Declara una propiedad para almacenar la fecha de creación del log

    constructor( message: string, level: LogSeverityLevel ) {

        this.message   = message; // Inicializa la propiedad con el valor pasado como argumento al constructor
        this.level     = level;   //      ""              ""              ""              ""
        this.createdAt = new Date(); // Inicializa la propiedad con la fecha y hora actuales
    }

    // "{ "level": "high", "message": "Hola Mundo", "createdAt":"123456789"}"
    static fromJson = ( json: string): LogEntity => {

       const { message, level, createdAt } = JSON.parse(json); // convertir la cadena JSON en un objeto JavaScript

       const log = new LogEntity( message, level); // crear una nueva instancia 
       log.createdAt = new Date(createdAt); // nueva fecha

       return log; // devuelve la instancia creada
    }
}