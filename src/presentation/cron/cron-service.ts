// PATRON ADAPTADOR

import { CronJob } from 'cron';

//CREAR UN NUEVO TPO DE DATO 
type CronTime = string | Date;
type OnTick = () => void; // funcion que no emite nada

export class CronService {

    static createJob( cronTime: CronTime, onTick: OnTick): CronJob {

        //TAREAS QUE SE EJECUTAN PERIODICAMENTE
        const job = new CronJob( cronTime, onTick );
        
        job.start();

        return job;
    }
}




