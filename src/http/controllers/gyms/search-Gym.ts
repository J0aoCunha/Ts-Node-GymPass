import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
	const searchGymQuerySchema = z.object({
		search: z.string(),
		page: z.coerce.number().min(1).default(1)
	});

	const { search, page } = searchGymQuerySchema.parse(req.query);

	const searchGymUseCase = makeSearchGymsUseCase();

	const { gyms } =	await searchGymUseCase.execute({
		search, page
	});

	return reply.status(200).send({ gyms });
};
