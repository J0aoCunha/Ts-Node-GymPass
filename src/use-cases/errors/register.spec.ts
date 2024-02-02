import { expect, describe, it} from 'vitest';
import { RegisterUseCase } from '../register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
// import UserEmailExistsError from './user-email-exists-error';


describe('Register use-case',()=>{
	it('should be able register', async () => {

		const UserRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(UserRepository);

		const { user } = await registerUseCase.execute({
			name:'john doe', 
			email: 'johndoe@example.com',
			password: '123456'
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should hash user password upon registration', async () => {

		const UserRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(UserRepository);

		const { user } = await registerUseCase.execute({
			name:'john doe', 
			email: 'johndoe@example.com',
			password: '123456'
		});


		const isPasswordCorretlyHashed = await compare(
			'123456',
			user.password_hash
		);

		expect(isPasswordCorretlyHashed);
	});

	it('should not be able to register with same email twice', async () => {
		const UserRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(UserRepository);
		
		await registerUseCase.execute({
			name:'john doe', 
			email:'teste@example.com',
			password: '123456'
		});

		expect(()=>
			registerUseCase.execute({
				name:'john doe', 
				email:'teste@example.com',
				password: '123456'
			})
		).rejects;
	});
});