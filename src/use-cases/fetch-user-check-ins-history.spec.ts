import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { FetchUserCheckInsUseCase } from './fetch-user-check-ins-history';

let CheckInRepository: InMemoryCheckInRepository;
let sut: FetchUserCheckInsUseCase;

describe('Fetch check is history use-case', () => {
	beforeEach(async () => {
		CheckInRepository = new InMemoryCheckInRepository();
		sut = new FetchUserCheckInsUseCase(CheckInRepository);
	});

	it('should be able to fetch check ins history', async () => {
		await CheckInRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});
		await CheckInRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		});

		const { checkIns } = await sut.execute({
			userId: 'user-01',
			page: 1,
		});

		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-01' }),
			expect.objectContaining({ gym_id: 'gym-02' }),
		]);
	});

	it('should be able to fetch paginated check in history', async () => {
		for (let i = 1; i <= 22; i++) {
			await CheckInRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-01',
			});
		}

		const { checkIns } = await sut.execute({
			userId: 'user-01',
			page: 2,
		});

		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-21' }),
			expect.objectContaining({ gym_id: 'gym-22' }),
		]);
	});
});
