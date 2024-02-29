import { describe, it, beforeEach, expect, afterEach, vi } from 'vitest';
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { ValidateCheckInUseCase } from './validate-check-in';
import ResourceNotFoundError from './errors/resource-not-found-error';
import LateCheckInValidateError from './errors/late-check-in-validate-error';

let CheckInRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe('validate check in  use-case', () => {
	beforeEach(async () => {
		CheckInRepository = new InMemoryCheckInRepository();
		sut = new ValidateCheckInUseCase(CheckInRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to validate the check in', async () => {
		const createdCheckIn = await CheckInRepository.create({
			gym_id: 'gym 01',
			user_id: 'user 01',
		});

		const { checkIn } = await sut.execute({
			checkInId: createdCheckIn.id,
		});

		expect(checkIn.is_validated).toEqual(expect.any(Date));
		expect(CheckInRepository.items[0].is_validated).toEqual(expect.any(Date));
	});

	it('should be not able to validate an inexistent  check in', async () => {
		await expect(() =>
			sut.execute({
				checkInId: 'inexistent-check-in-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should be not able to validate the check-in after 20 minutes of its creation', async () => {
		vi.setSystemTime(new Date(2023, 2, 23, 22, 0));

		const createdCheckIn = await CheckInRepository.create({
			gym_id: 'gym 01',
			user_id: 'user 01',
		});

		const twentyOneMinutesInMs = 1000 * 60 * 21;

		vi.advanceTimersByTime(twentyOneMinutesInMs);

		await expect(() =>
			sut.execute({
				checkInId: createdCheckIn.id,
			}),
		).rejects.toBeInstanceOf(LateCheckInValidateError);
	});
});
