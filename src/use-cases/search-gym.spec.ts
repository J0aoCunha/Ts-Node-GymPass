import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gym';

let GymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Fetch nearby gyms use-case', () => {
	beforeEach(async () => {
		GymsRepository = new InMemoryGymsRepository();
		sut = new SearchGymsUseCase(GymsRepository);
	});

	it('should be able to search for gyms', async () => {
		await GymsRepository.create({
			title: 'javasCript gym',
			description: null,
			phone: null,
			latitude: -20.3113452,
			longitude: -40.2986506,
		});
		await GymsRepository.create({
			title: 'typeCript gym',
			description: null,
			phone: null,
			latitude: -20.3113452,
			longitude: -40.2986506,
		});

		const { gyms } = await sut.execute({
			search: 'javasCript ',
			page: 1,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'javasCript gym' })]);
	});

	it('should be able to fetch paginated gym search', async () => {
		for (let i = 1; i <= 22; i++) {
			await GymsRepository.create({
				title: `javasCript gym ${i}`,
				description: null,
				phone: null,
				latitude: -20.3113452,
				longitude: -40.2986506,
			});
		}

		const { gyms } = await sut.execute({
			search: 'javasCript',
			page: 2,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'javasCript gym 21' }),
			expect.objectContaining({ title: 'javasCript gym 22' }),
		]);
	});
});
