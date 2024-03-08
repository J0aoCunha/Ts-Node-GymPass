import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';
import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';

export const profile = async (req: FastifyRequest, reply: FastifyReply) => {

	const getUserProfile = makeGetUserProfileUseCase();

	const { user } = await getUserProfile.execute({
		userId: req.user.sub,
	});

	return reply.status(200).send({
		user: {
			...user,
			password_hash: undefined,
		},
	});
};
