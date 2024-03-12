import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const validate = async (req: FastifyRequest, reply: FastifyReply) => {
	const validateCheckInsParamsSchema = z.object({
		checkInsId: z.string().cuid()
	});

	const { checkInsId } = validateCheckInsParamsSchema.parse(req.params);

	
	const validateCheckInUseCase = makeValidateCheckInsUseCase();

	await validateCheckInUseCase.execute({
		checkInId: checkInsId
	});

	return reply.status(204).send();
};
