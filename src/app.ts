import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { ZodError } from 'zod';
import { Env } from './env';
import { userRoutes } from './http/controllers/users/user-Routes';
import { checkInRoutes } from './http/controllers/check-ins/checkIns-Routes';
import { gymsRoutes } from './http/controllers/gyms/gyms-Routes';

export const app = fastify();

app.register(fastifyJwt, {
	secret: Env.JWT_SECRET,
});

app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkInRoutes);

app.setErrorHandler((error, _req, reply) => {
	if (error instanceof ZodError) {
		reply
			.status(400)
			.send({ message: 'erro na validacao dos dados', issues: error.format() });
	}

	if (Env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// todo: fix error logging
	}

	return reply.status(500).send();
});
// #F301 17. Testes E2E de rotas de check-ins