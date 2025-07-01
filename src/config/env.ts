import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number,
    database_url: string
}

export const config: Config = {
    port: Number(process.env.PORT),
    database_url: process.env.DATABASE_URL!,
}