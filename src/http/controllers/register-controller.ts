import UserEmailExistsError  from '@/use-cases/errors/user-email-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';


export const register =  async (req: FastifyRequest, reply: FastifyReply) => {

	const usersBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	});

	const {name, email, password} = usersBodySchema.parse(req.body);

	try {

		const registerUseCase = makeRegisterUseCase();
		
		await registerUseCase.execute({
			name, 
			email, 
			password
		});
	} catch (error) {
		if(error instanceof UserEmailExistsError){
			return reply.status(409).send({message: error.message});
		}
		
		throw error;
	}

	return reply.status(201).send();

};