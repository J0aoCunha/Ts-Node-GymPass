import { FastifyInstance } from 'fastify';
import { register } from './register-controller';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJWT } from '@/http/middlewares/verify-jwt';


export const userRoutes = async (app: FastifyInstance) => {
	app.post('/users', register);
	app.post('/sessions', authenticate);

	app.get('/me',{onRequest: [ verifyJWT ]},profile);
};
