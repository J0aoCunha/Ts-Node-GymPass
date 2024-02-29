import { Gym, Prisma } from '@prisma/client';
import { GymsRepository, findManyNearbyParams } from '../gym-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordenate';

export class InMemoryGymsRepository implements GymsRepository {
	public items: Gym[] = [];

	async findManyNearby(params: findManyNearbyParams) {
		return this.items.filter((item) => {
			const distance = getDistanceBetweenCoordinates(
				{
					latitude: params.latitude,
					longitude: params.longitude,
				},
				{
					latitude: item.latitude.toNumber(),
					longitude: item.longitude.toNumber(),
				},
			);

			return distance < 10;
		});
	}

	async searchMany(search: string, page: number) {
		return this.items
			.filter((item) => item.title.includes(search))
			.slice((page - 1) * 20, page * 20);
	}

	async findById(id: string) {
		const gym = this.items.find((item) => item.id === id);

		if (!gym) {
			return null;
		}

		return gym;
	}

	async create(data: Prisma.GymCreateInput) {
		const gym = {
			id: data.id ?? 'user_1',
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
			created_at: new Date(),
		};

		this.items.push(gym);

		return gym;
	}
}
