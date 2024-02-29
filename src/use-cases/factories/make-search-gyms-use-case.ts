import { SearchGymsUseCase } from '../search-gym';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeSearchGymsUseCase() {
	const GymsRepository = new PrismaGymsRepository();
	const UseCase = new SearchGymsUseCase(GymsRepository);

	return UseCase;
}
