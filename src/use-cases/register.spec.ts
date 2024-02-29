import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import InMemoryUsersRepository from '@/repositories/in-memory/in-memory-users-repository';
import UserEmailExistsError from './errors/user-email-exists-error';

let UserRepository: typeof InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register use-case', () => {
	beforeEach(() => {
		UserRepository = InMemoryUsersRepository;
		sut = new RegisterUseCase(UserRepository);
	});

	it('should be able register', async () => {
		const { user } = await sut.execute({
			name: 'john doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should hash user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'john doe',
			email: 'teste1@example.com',
			password: '123456',
		});

		const isPasswordCorretlyHashed = await compare('123456', user.password_hash);

		expect(isPasswordCorretlyHashed).toBe(true);
	});

	it('should not be able to register with same email twice', async () => {
		const email = 'existing@email.com';

		// Registra um usuário com o e-mail
		await sut.execute({ name: 'john doe', email, password: '123456' });

		// Tenta registrar outro usuário com o mesmo e-mail
		await expect(
			sut.execute({ name: 'john doe', email, password: '123456' }),
		).rejects.toBeInstanceOf(UserEmailExistsError);
	});
});
