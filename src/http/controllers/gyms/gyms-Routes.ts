import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { search } from './search-Gym';
import { nearby } from './nearby-Gym';
import { create } from './create-gyms';


export const gymsRoutes = async (app: FastifyInstance) => {
	app.addHook('onRequest', verifyJWT);

	app.get('/gyms/search', search);
	app.get('/gyms/nearby', nearby);
	app.post('/gyms', create);
};
