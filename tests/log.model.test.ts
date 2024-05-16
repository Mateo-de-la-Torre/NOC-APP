import { MongoDataBase } from "../src/data/mongos/init";
import { envs } from "../src/config/plugins/envs.plugins";
import mongoose from "mongoose";
import { LogModel } from "../src/data/mongos/index";

describe('log.model.test.ts', () => {

    beforeAll(async() =>{ // antes de todo nos conectamos a la DB de Mongo
        await MongoDataBase.connect({
            mongoUrl: envs.MONGO_URL,

        }) 
    })

    afterAll(async() => { // despues de las pruebas cierra la conexion con la DB
        mongoose.connection.close();
    })
    
    it('should return LogModel', async() => {

        const logDataTest = { // log de prueba
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low',
        }
        const log = await LogModel.create( logDataTest ); // creamos el obj del log de prueba
        // console.log(log);
        
        expect(log).toEqual( expect.objectContaining({ // espera que el obj contenga
            ...logDataTest, // toda la data que pusismos
            createdAt: expect.any(Date), // espera cualquier fecha de creacion
            id: expect.any(String), // espera cualquier string como ID
        }));

        await LogModel.findByIdAndDelete( log.id ); // eliminamos el log despues de la prueba 
    });


    it('should return the schemaobject', () => {
        
        const schema = LogModel.schema.obj;

        // console.log(schema);        
    
        expect(schema).toEqual(expect.objectContaining( // espera que el schema contenga todos esos datos
            {
                message: { type: expect.any(Function), require: true },
                origin: { type: expect.any(Function) },    
                level: {
                  type: expect.any(Function),
                  enum: [ 'low', 'medium', 'high' ],     
                  default: 'low'
                },
                createdAt: expect.any(Object)
            }
        ));
    });

});