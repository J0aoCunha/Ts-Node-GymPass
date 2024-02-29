import { CheckIn } from '@prisma/client';
import { CheckInRepository } from '@/repositories/check-ins.repository';
import ResourceNotFoundError from './errors/resource-not-found-error';
import dayjs from 'dayjs';
import LateCheckInValidateError from './errors/late-check-in-validate-error';

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
	constructor(private CheckInRepository: CheckInRepository) {}

	async execute({
		checkInId,
	}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
		const checkIn = await this.CheckInRepository.findById(checkInId);

		if (!checkIn) {
			throw new ResourceNotFoundError();
		}

		const distanceInMinutresFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.creted_at,
			'minutes',
		);

		if (distanceInMinutresFromCheckInCreation > 20) {
			throw new LateCheckInValidateError();
		}

		checkIn.is_validated = new Date();

		await this.CheckInRepository.save(checkIn);

		return { checkIn };
	}
}
