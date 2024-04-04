// ENTIDAD: nos va a permitir crear instancias del LogEntity y va a gobernar la app

// Con esta entidad buscamos poder tener nuestro sistema de logs,
// para poder guardarlo en fileSystem, o dataBase sin cambiar todo el codigo

export enum LogSeverityLevel { // los valores que puede tener el level
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}

export interface LogEntityOptions {
    level    : LogSeverityLevel
    message  : string;
    origin   : string;
    createdAt?: Date; 
    
}


export class LogEntity { // clase que crea al log

    public level    : LogSeverityLevel; // Declara una propiedad para almacenar los niveles del log
    public message  : string; // Declara una propiedad para almacenar el mensaje del log
    public createdAt: Date; // Declara una propiedad para almacenar la fecha de creación del log
    public origin   : string;

    constructor( options: LogEntityOptions ) {

        const { level, message, origin, createdAt = new Date() } = options;
        this.message   = message; // Inicializa la propiedad con el valor pasado como argumento al constructor
        this.level     = level;   //      ""              ""              ""              ""
        this.origin    = origin;
        this.createdAt = createdAt; // Inicializa la propiedad con la fecha y hora actuales
    }

    // "{ "level": "high", "message": "Hola Mundo", "createdAt":"123456789"}"
    // Para el FileSistem
    static fromJson = ( json: string): LogEntity => { // crear una instancia de LogEntity a partir de una cadena JSON. Para el FileSistem

        json = ( json === '' ) ? '{}': json; // si viene vacio que mande un obj vacio
       const { message, level, createdAt, origin } = JSON.parse(json); // convertir la cadena JSON en un objeto JavaScript

       const log = new LogEntity({ // crear una nueva instancia 
            message, 
            level, 
            origin,
            createdAt,
        });

       return log; // devuelve la instancia creada
    }

    // PARA LA BD MONGO
    static fromObject = (object: { [key: string]: any}): LogEntity => { // crear una instancia de LogEntity a partir de un objeto

        const { message, level, createdAt, origin } = object

        const log = new LogEntity({
            message, level, createdAt, origin
        });

        return log;
    }
}