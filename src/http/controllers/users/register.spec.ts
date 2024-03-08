import {afterEach, beforeAll, describe, expect,it} from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('register controller',()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterEach(async ()=>{
		await app.close();
	});


	it('should be able to register', async () =>{
		const response = await request(app.server).post('/users').send({
			name: 'john doe',
			email: 'johndoe@example.com',
			password: '123456'
		});


		expect(response.statusCode).toEqual(201);
	});

});