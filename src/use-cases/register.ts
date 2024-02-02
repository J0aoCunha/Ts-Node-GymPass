import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import UserEmailExistsError from './errors/user-email-exists-error';
import { User } from '@prisma/client';



interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string
}

interface UserRegisterUseCase{
	user: User
}

export class RegisterUseCase {
	
	constructor(private usersRepository: UsersRepository){}

	async	execute(
		{ 
			name, 
			email, 
			password 
		} :RegisterUseCaseRequest): Promise<UserRegisterUseCase> {
		const password_hash = await hash(password, 6);
	
		const userWithSameEmail = await this.usersRepository.findByEmail(email);
	
		if(userWithSameEmail){
			throw UserEmailExistsError;
		}
	
		const user = await this.usersRepository.create({
			name,
			email, 
			password_hash
		});
		
		return { user };
	}
}
