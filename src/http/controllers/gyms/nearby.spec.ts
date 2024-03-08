import {afterEach, beforeAll, describe, expect,it} from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user';

describe('search gyms controller e2e',()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterEach(async ()=>{
		await app.close();
	});


	it('should be able to list nearby gyms ', async () =>{

		const {token} = await createAndAuthenticateUser(app);

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'javakjansnd',
				description:'',
				phone:'',
				latitude: -20.3113452,
				longitude: -40.2986506,
			});

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'typekjansnd',
				description:'',
				phone:'',
				latitude: -20.0873452,
				longitude: -43.2986506,
			});

		const response = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: -20.3113452,
				longitude: -40.2986506,
			})
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'javakjansnd'
			})
		]);

	});

});