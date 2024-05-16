// Procesos a ejecutar antes de levantar la app

import { config } from "dotenv";

config({ // cambia la direccion al env de prueba
    path: '.env.test'
})



// en jest.config hay q configurar para cuando se levante, se ejecute este archivo primero
// setupFiles: [
//     "<rootDir>/tests/setupTests.ts"
//   ],