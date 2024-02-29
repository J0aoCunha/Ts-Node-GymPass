import { CheckIn } from '@prisma/client';
import { CheckInRepository } from '@/repositories/check-ins.repository';
import { GymsRepository } from '@/repositories/gym-repository';
import ResourceNotFoundError from './errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordenate';
import MaxNumberOfCheckInsError from './errors/max-number-of-check-ins-error';
import MaxDistanceError from './errors/max-distance-error';

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(
    private CheckInRepository: CheckInRepository,
    private GymsRepository: GymsRepository,
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.GymsRepository.findById(gymId);

		if (!gym) {
			throw new ResourceNotFoundError();
		}

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		);

		const MAX_DISTANCE_IN_KILOMETERS = 0.1;

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new MaxDistanceError();
		}

		const checkInOnSameDate = await this.CheckInRepository.findByUserIdOnDAte(
			userId,
			new Date(),
		);

		if (checkInOnSameDate) {
			throw new MaxNumberOfCheckInsError();
		}

		const checkIn = await this.CheckInRepository.create({
			gym_id: gymId,
			user_id: userId,
		});

		return { checkIn };
	}
}
