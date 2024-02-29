import { User, Prisma } from '@prisma/client';
import { UsersRepository } from '../users-repository';

class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = [];

	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async findById(id: string) {
		const user = this.items.find((item) => item.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: 'user_1',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			creted_at: new Date(),
		};

		this.items.push(user);

		return user;
	}
}

export default new InMemoryUsersRepository();
