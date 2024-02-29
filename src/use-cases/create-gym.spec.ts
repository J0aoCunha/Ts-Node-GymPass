import { describe, beforeEach, it, expect } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create gym use-case', () => {
	beforeEach(() => {
		gymRepository = new InMemoryGymsRepository();
		sut = new CreateGymUseCase(gymRepository);
	});

	it('should be able register', async () => {
		const { gym } = await sut.execute({
			title: 'JavaScript Gym',
			description: null,
			phone: null,
			latitude: -20.3113452,
			longitude: -40.2986506,
		});

		expect(gym.id).toEqual(expect.any(String));
	});
});
