import { CreateGymUseCase } from '../create-gym';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeCreateGymUseCase() {
	const GymsRepository = new PrismaGymsRepository();
	const UseCase = new CreateGymUseCase(GymsRepository);

	return UseCase;
}
