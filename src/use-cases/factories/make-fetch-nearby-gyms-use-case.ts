import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { FetchNearbyUseCase } from '../fetch-nearby-gyms';

export function makefetchNearbygymsUseCase() {
	const GymsRepository = new PrismaGymsRepository();
	const UseCase = new FetchNearbyUseCase(GymsRepository);

	return UseCase;
}
