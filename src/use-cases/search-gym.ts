import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gym-repository';

interface SearchGymsUseCaseRequest {
  search: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
	constructor(private GymsRepository: GymsRepository) {}

	async execute({
		search,
		page,
	}: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
		const gyms = await this.GymsRepository.searchMany(search, page);

		return { gyms };
	}
}
