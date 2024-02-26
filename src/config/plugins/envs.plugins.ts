import 'dotenv/config';
import * as env from 'env-var';


export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    EMAIL: env.get('EMAIL').required().asEmailString(),
    SECRET_KEY: env.get('SECRET_KEY').required().asString(),
    PROD: env.get('PROD').required().asBool(),
}