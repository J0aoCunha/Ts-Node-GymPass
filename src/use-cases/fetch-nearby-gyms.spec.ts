import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyUseCase } from './fetch-nearby-gyms';

let GymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyUseCase;

describe('Fetch check is history use-case', () => {
	beforeEach(async () => {
		GymsRepository = new InMemoryGymsRepository();
		sut = new FetchNearbyUseCase(GymsRepository);
	});

	it('should be able to search for gyms', async () => {
		await GymsRepository.create({
			title: 'near gym',
			description: null,
			phone: null,
			latitude: -20.3113452,
			longitude: -40.2986506,
		});
		await GymsRepository.create({
			title: 'far gym',
			description: null,
			phone: null,
			latitude: -20.0873452,
			longitude: -43.2986506,
		});

		const { gyms } = await sut.execute({
			userLatitude: -20.3113452,
			userLongitude: -40.2986506,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'near gym' })]);
	});
});
