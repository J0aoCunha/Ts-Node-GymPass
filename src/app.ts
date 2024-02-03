import fastify from 'fastify';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { Env } from './env';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _req, reply)=>{

	if( error instanceof ZodError){
		reply.status(400).send({message: 'erro na validacao dos dados', issues: error.format()});
	}

	if(Env.NODE_ENV !== 'production'){
		console.error(error);
	}else{
		//todo: fix error logging
	}

	return reply.status(500).send();
});