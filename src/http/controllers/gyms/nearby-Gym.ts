import { makefetchNearbygymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const nearby = async (req: FastifyRequest, reply: FastifyReply) => {
	const nearbyGymQuerySchema = z.object({
		latitude: z.coerce.number().refine(value => {
			return Math.abs(value)<= 90;
		}),
		longitude: z.coerce.number().refine(value => {
			return Math.abs(value)<= 180;
		})
	});

	const { latitude, longitude } = nearbyGymQuerySchema.parse(req.query);

	const fetchNearbyGymUseCase = makefetchNearbygymsUseCase();

	const { gyms } =	await fetchNearbyGymUseCase.execute({
		userLatitude: latitude,
		userLongitude:longitude,
	});

	return reply.status(200).send({ gyms }); 
};
