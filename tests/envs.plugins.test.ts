import { envs } from "../src/config/plugins/envs.plugins";


describe('envs.plugins.ts', () => {

    it('should return env options', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'mateo.delatorre@gmail.com',
            MAILER_SECRET_KEY: 'syybefvueshtomaa',
            MAILER_SERVICE: 'gmail',
            PROD: true,
            MONGO_URL: 'mongodb://127.0.0.1:27017/NOC',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'mateo',
            MONGO_PASS: '123456789'
        });
    });


    it('should return error if not found env', async() => {
    
        jest.resetModules(); // Para que no afecte a este caso de prueba los cambios en los modulos de los casos de prueba anteriores.
        process.env.PORT = 'abc' // PRUEBA: la variable de entorno no tiene el valor esperado.
        
        try {
            await import('../src/config/plugins/envs.plugins'); // se espera que lanze el error del port
            expect(true).toBe(false); // falla intencionalmente


        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer'); // espera que el mensaje de error contenga el port debe ser un entero
        
        }
    });

});

