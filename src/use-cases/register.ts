import { prisma } from '@/lib/prisma';
import prismaUsersRepository from '@/repositories/prisma-users-repository';
import { hash } from 'bcryptjs';


interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string
}

export const registerUseCase =async ({
	name, 
	email, 
	password
}:RegisterUseCaseRequest) => {
	const password_hash = await hash(password, 6);

	const userWithSameEmail = await prisma.user.findUnique({
		where: {
			email
		}
	});


	if(userWithSameEmail){
		throw new Error('email ja cadastrado!!');
	}

	await prismaUsersRepository.create({
		name,
		email, 
		password_hash
	});

};

