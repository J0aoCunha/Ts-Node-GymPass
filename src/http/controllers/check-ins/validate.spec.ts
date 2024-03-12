import {afterEach, beforeAll, describe, expect,it} from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('validate check in controller e2e',()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterEach(async ()=>{
		await app.close();
	});


	it('should be able to validate a check in', async () =>{

		const {token} = await createAndAuthenticateUser(app);

		const user  = await prisma.user.findFirstOrThrow();

		const gym = 	await prisma.gym.create({
			data:{
				title: 'javakjansnd',			
				latitude: -20.3113452,
				longitude: -40.2986506,
			}
		});

		let checkins = await prisma.checkIn.create({
			data:{
				gym_id: gym.id,
				user_id: user.id
			}
		});

		console.log(checkins.id);


		const response = await request(app.server).patch(`/check-ins/${checkins.id}/validate`).set('Authorization', `Bearer ${token}`).send();


		expect(response.statusCode).toEqual(204);

		checkins = await prisma.checkIn.findUniqueOrThrow({
			where:{
				id: checkins.id
			}
		});

		expect(checkins.is_validated).toEqual(expect.any(Date));

	});

});