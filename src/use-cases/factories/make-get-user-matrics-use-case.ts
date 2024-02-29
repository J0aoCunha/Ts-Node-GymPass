import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { GetUserMetricsUseCase } from '../get-users-metrics';

export function makeGetUserMetricsUseCase() {
	const CheckInsRepository = new PrismaCheckInsRepository();
	const UseCase = new GetUserMetricsUseCase(CheckInsRepository);

	return UseCase;
}
