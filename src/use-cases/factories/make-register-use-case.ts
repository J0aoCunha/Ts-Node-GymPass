import { prismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUseCase } from '../register';

export function makeRegisterUseCase(){
	const UserRepository = new prismaUsersRepository();
	const registerUseCase = new RegisterUseCase(UserRepository);


	return registerUseCase;
}