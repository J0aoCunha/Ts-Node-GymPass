import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { ValidateCheckInUseCase } from '../validate-check-in';

export function makeValidateCheckInsUseCase() {
	const CheckInsRepository = new PrismaCheckInsRepository();
	const UseCase = new ValidateCheckInUseCase(CheckInsRepository);

	return UseCase;
}
