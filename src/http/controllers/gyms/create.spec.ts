import {afterEach, beforeAll, describe, expect,it} from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user';

describe('create gyms controller e2e',()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterEach(async ()=>{
		await app.close();
	});


	it('should be able to create a gym', async () =>{

		const {token} = await createAndAuthenticateUser(app);

		const response = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			title: 'javakjansnd',
			description:'sadasdasdasd',
			phone:'1213123123',
			latitude: -20.3113452,
			longitude: -40.2986506,
		});

		expect(response.statusCode).toEqual(201);

	});

});