import {prismaUsersRepository} from '@/repositories/prisma/prisma-users-repository';
import UserEmailExistsError  from '@/use-cases/errors/user-email-exists-error';
import { RegisterUseCase } from '@/use-cases/register';
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

		const UserRepository = new prismaUsersRepository();
		const registerUseCase = new RegisterUseCase(UserRepository);
		
		await registerUseCase.execute({
			name, 
			email, 
			password
		});
	} catch (error) {
		if(UserEmailExistsError){
			return reply.status(409).send({message: error});
		}
		
	}

	return reply.status(201).send();

};