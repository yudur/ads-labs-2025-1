import 'dotenv/config';
import { z } from 'zod';


const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string()
});


const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error('❌ Invalid environment variables:', env.error.format());
    throw new Error('Invalid configuration');
}

export const config = {
  port: env.data.PORT,
  database_url: env.data.DATABASE_URL
};