import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-use';
import { prisma } from '@/lib/prisma';

describe('Create Check-in   (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});
	afterAll(async () => {
		await app.close();
	});
	it('slould be able to create a chek-in ', async () => {
		const { token } = await createAndAuthenticateUser(app);
		const gym = await prisma.gym.create({
			data: {
				latitude: -27.2092052,
				longitude: -49.6401091,
				title: 'JavaScript Gym',
				phone: '91524512',
			},
		});

		const response = await request(app.server)
			.post(`/gyms/${gym.id}/check-ins`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -27.2092052,
				longitude: -49.6401091,
			});

		expect(response.statusCode).toEqual(201);
	});
});
