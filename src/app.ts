import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugins";
import { MongoDataBase } from "./data/mongo";
import { ServerApp } from "./presentation/server-app";


// FUNCION ANONIMA ASYNCRONA AUTOINVOCADA
(async() => {
    main()
})();



async function main() { // Punto de entrada de la applicacion

    await MongoDataBase.connect({ // Conecta la DB de mongo
        mongoUrl: envs.MONGO_URL,
        // dbName: envs.MONGO_DB_NAME,
    });


    ServerApp.start();
    // console.log( envs );
    
}