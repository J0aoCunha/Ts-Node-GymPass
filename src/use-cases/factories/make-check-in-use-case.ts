import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { CheckInUseCase } from '../check-In';

export function makeCheckInUseCase() {
	const CheckInsRepository = new PrismaCheckInsRepository();
	const GymsRepository = new PrismaGymsRepository();
	const UseCase = new CheckInUseCase(CheckInsRepository, GymsRepository);

	return UseCase;
}
