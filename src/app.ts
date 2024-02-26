import { envs } from "./config/plugins/envs.plugins";
import { ServerApp } from "./presentation/server-app";


// FUNCION ANONIMA ASYNCRONA AUTOINVOCADA
(async() => {
    main()
})();



function main() { // Punto de entrada de la applicacion
    ServerApp.start();
    // console.log( envs );
    
}