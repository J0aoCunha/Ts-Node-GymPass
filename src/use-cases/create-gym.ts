import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gym-repository';

interface CreateGymUseCaseResponse {
  gym: Gym
}

interface CreateGymUseCaseRequest {
  title: string
  description?: string | null
  phone: string | null
  longitude: number
  latitude: number
}

export class CreateGymUseCase {
	constructor(private GymsRepository: GymsRepository) {}

	async execute({
		phone,
		title,
		description,
		latitude,
		longitude,
	}: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
		const gym = await this.GymsRepository.create({
			phone,
			title,
			description,
			latitude,
			longitude,
		});

		return { gym };
	}
}
