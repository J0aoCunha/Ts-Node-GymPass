import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchUserCheckInsUseCase } from '../fetch-user-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase() {
	const CheckInsRepository = new PrismaCheckInsRepository();
	const UseCase = new FetchUserCheckInsUseCase(CheckInsRepository);

	return UseCase;
}
