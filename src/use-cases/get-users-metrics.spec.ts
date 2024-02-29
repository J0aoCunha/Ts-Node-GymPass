import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsUseCase } from './get-users-metrics';

let CheckInRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsUseCase;

describe('get user metrics use-case', () => {
	beforeEach(async () => {
		CheckInRepository = new InMemoryCheckInRepository();
		sut = new GetUserMetricsUseCase(CheckInRepository);
	});

	it('should be able to check ins count metrics', async () => {
		await CheckInRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});
		await CheckInRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		});

		const { checkInsCount } = await sut.execute({
			userId: 'user-01',
		});

		expect(checkInsCount).toEqual(2);
	});
});
