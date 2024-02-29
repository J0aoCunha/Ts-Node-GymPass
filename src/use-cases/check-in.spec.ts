import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest';
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-In';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import MaxDistanceError from './errors/max-distance-error';
import MaxNumberOfCheckInsError from './errors/max-number-of-check-ins-error';

let CheckInRepository: InMemoryCheckInRepository;
let GymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('check-in use-case', () => {
	beforeEach(async () => {
		CheckInRepository = new InMemoryCheckInRepository();
		GymsRepository = new InMemoryGymsRepository();
		sut = new CheckInUseCase(CheckInRepository, GymsRepository);

		await GymsRepository.create({
			id: 'gymId-01',
			title: 'academia do javaScript',
			description: '',
			phone: '',
			latitude: -20.3113452,
			longitude: -40.2986506,
		});

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: 'gymId-01',
			userId: 'userId-01',
			userLatitude: -20.3113452,
			userLongitude: -40.2986506,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not to be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2023, 0, 12, 8, 0, 0));

		await sut.execute({
			gymId: 'gymId-01',
			userId: 'userId-01',
			userLatitude: -20.3113452,
			userLongitude: -40.2986506,
		});

		await expect(() =>
			sut.execute({
				gymId: 'gymId-01',
				userId: 'userId-01',
				userLatitude: -20.3113452,
				userLongitude: -40.2986506,
			}),
		).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
	});

	it('should be able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2023, 0, 12, 8, 0, 0));

		await sut.execute({
			gymId: 'gymId-01',
			userId: 'userId-01',
			userLatitude: -20.3113452,
			userLongitude: -40.2986506,
		});

		vi.setSystemTime(new Date(2023, 0, 13, 8, 0, 0));

		const { checkIn } = await sut.execute({
			gymId: 'gymId-01',
			userId: 'userId-01',
			userLatitude: -20.3113452,
			userLongitude: -40.2986506,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not to be able to check in on distant gym', async () => {
		GymsRepository.items.push({
			id: 'gymId-02',
			title: 'academia do javaScript',
			description: '',
			phone: '',
			latitude: new Decimal(-20.332544),
			longitude: new Decimal(-40.38656),
		});

		await expect(() =>
			sut.execute({
				gymId: 'gymId-02',
				userId: 'userId-01',
				userLatitude: -20.3123903,
				userLongitude: -40.3104284,
			}),
		).rejects.toBeInstanceOf(MaxDistanceError);
	});
});
