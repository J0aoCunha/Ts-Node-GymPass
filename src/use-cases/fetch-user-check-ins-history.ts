import { CheckIn } from '@prisma/client';
import { CheckInRepository } from '@/repositories/check-ins.repository';

interface FetchUserCheckInsUseCaseRequest {
  userId: string
  page: number
}
interface FetchUserCheckInsUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCase {
	constructor(private CheckInsRepository: CheckInRepository) {}

	async execute({
		userId,
		page,
	}: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
		const checkIns = await this.CheckInsRepository.findManyByUserId(
			userId,
			page,
		);

		return {
			checkIns,
		};
	}
}
