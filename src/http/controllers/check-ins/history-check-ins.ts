import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const history = async (req: FastifyRequest, reply: FastifyReply) => {
	const checkInsHistoryQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1)
	});

	const { page } = checkInsHistoryQuerySchema.parse(req.query);

	const searchGymUseCase = makeFetchUserCheckInsHistoryUseCase();

	const { checkIns } =	await searchGymUseCase.execute({
		page,
		userId: req.user.sub
	});

	return reply.status(200).send({ checkIns });
};
