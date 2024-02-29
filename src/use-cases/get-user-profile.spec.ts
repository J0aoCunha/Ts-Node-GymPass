import { expect, describe, it, beforeEach } from 'vitest';
import InMemoryUsersRepository from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile';
import ResourceNotFoundError from './errors/resource-not-found-error';

let UserRepository: typeof InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Authenticate use-case', () => {
	beforeEach(() => {
		UserRepository = InMemoryUsersRepository;
		sut = new GetUserProfileUseCase(UserRepository);
	});

	it('should be able to get user profile', async () => {
		const createdUser = await UserRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
		});

		const { user } = await sut.execute({
			userId: createdUser.id,
		});

		expect(user.name).toEqual('john doe');
	});

	it('should be able to get user profile with wrong id', async () => {
		await expect(() =>
			sut.execute({
				userId: 'non-exists-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
