import { Prisma, CheckIn } from '@prisma/client';
import { CheckInRepository } from '../check-ins.repository';
import dayjs from 'dayjs';

export class InMemoryCheckInRepository implements CheckInRepository {
	public items: CheckIn[] = [];
	async save(checkIn: CheckIn) {
		const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);

		if (checkInIndex >= 0) {
			this.items[checkInIndex] = checkIn;
		}

		return checkIn;
	}

	async findById(Id: string) {
		const checkIn = this.items.find((item) => item.id === Id);

		if (!checkIn) {
			return null;
		}

		return checkIn;
	}

	async countByUserId(userId: string) {
		return this.items.filter((item) => item.user_id === userId).length;
	}

	async findByUserIdOnDAte(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkInOnSameDate = this.items.find((checkIn) => {
			const checkInDate = dayjs(checkIn.creted_at);
			const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

			return checkIn.user_id === userId && isOnSameDate;
		});

		if (!checkInOnSameDate) {
			return null;
		}

		return checkInOnSameDate;
	}

	async findManyByUserId(userId: string, page: number) {
		return this.items
			.filter((item) => item.user_id === userId)
			.slice((page - 1) * 20, page * 20);
	}

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = {
			id: 'data.id',
			user_id: data.user_id,
			gym_id: data.gym_id,
			is_validated: data.is_validated ? new Date(data.is_validated) : null,
			creted_at: new Date(),
		};

		this.items.push(checkIn);

		return checkIn;
	}
}
