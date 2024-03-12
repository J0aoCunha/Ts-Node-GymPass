import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
	const createCheckInBodySchema = z.object({
		latitude: z.number().refine(value => {
			return Math.abs(value)<= 90;
		}),
		longitude: z.number().refine(value => {
			return Math.abs(value)<= 180;
		})
	});


	const createCheckInParamsSchema = z.object({
		gymId: z.string().cuid()
	});

	const { latitude, longitude } = createCheckInBodySchema.parse(req.body);
	const { gymId } = createCheckInParamsSchema.parse(req.params);

	
	const createCheckInUseCase = makeCheckInUseCase();

	await createCheckInUseCase.execute({
		gymId, 
		userLatitude: latitude,
		userLongitude: longitude,
		userId: req.user.sub
	});

	return reply.status(201).send();
};
