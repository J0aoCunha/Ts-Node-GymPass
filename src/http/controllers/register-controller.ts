import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const register = async (req: FastifyRequest, reply: FastifyReply) => {

	const usersBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	});

	const {name, email, password} = usersBodySchema.parse(req.body);

	await prisma.user.create({
		data:{
			name, 
			email, 
			password_hash: password
		}
	});

	return reply.status(201).send();

};