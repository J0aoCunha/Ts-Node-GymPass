import { prismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '../authenticate';


export function makeAuthenticateUseCase(){
	const UserRepository = new prismaUsersRepository();
	const authenticateUseCase = new AuthenticateUseCase(UserRepository);


	return authenticateUseCase;
}