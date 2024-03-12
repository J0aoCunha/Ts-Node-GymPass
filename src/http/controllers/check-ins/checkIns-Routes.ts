import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { create } from './create-Check-ins';
import { validate } from './validate-check-ins';
import { history } from './history-check-ins';
import { metrics } from './metrics-check-ins';


export const checkInRoutes = async (app: FastifyInstance) => {
	app.addHook('onRequest', verifyJWT);

	app.post('/gyms/:gymId/check-ins', create);
	app.patch('/check-ins/:checkInsId/validate', validate);
	app.get('/check-ins/history', history);
	app.get('/check-ins/metrics', metrics
	);
};
