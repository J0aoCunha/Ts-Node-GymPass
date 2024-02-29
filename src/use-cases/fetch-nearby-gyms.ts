import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gym-repository';

interface FetchNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyUseCase {
	constructor(private GymsRepository: GymsRepository) {}

	async execute({
		userLatitude,
		userLongitude,
	}: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseResponse> {
		const gyms = await this.GymsRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		});

		return { gyms };
	}
}
