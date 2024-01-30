import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error('❌invalid enviroment variables', _env.error.format());
	throw new Error('❌invalid enviroment variables');
}

export const Env = _env.data;