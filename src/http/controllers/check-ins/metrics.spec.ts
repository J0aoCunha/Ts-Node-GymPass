import {afterEach, beforeAll, describe, expect,it} from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('get metrics controller e2e',()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterEach(async ()=>{
		await app.close();
	});


	it('should be able to het the total count fo check-ins', async () =>{

		const {token} = await createAndAuthenticateUser(app);

		const user  = await prisma.user.findFirstOrThrow();

		const gym = 	await prisma.gym.create({
			data:{
				title: 'javakjansnd',			
				latitude: -20.3113452,
				longitude: -40.2986506,
			}
		});
		
		await prisma.checkIn.createMany({
			data:[{
				gym_id: gym.id,
				user_id: user.id
			}, 
			{
				gym_id: gym.id,
				user_id: user.id
			}]
		});

		const response = await request(app.server).get('/check-ins/metrics').set('Authorization', `Bearer ${token}`).send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.checkInsCount).toEqual(2);

	});

});