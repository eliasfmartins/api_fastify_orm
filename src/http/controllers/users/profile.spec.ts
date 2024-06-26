import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-use';

describe('Profile (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});
	afterAll(async () => {
		await app.close();
	});
	it('slould be able to get user profile', async () => {
		const { token } = await createAndAuthenticateUser(app);
		const profileResponse = await request(app.server)
			.get('/me')
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(profileResponse.statusCode).toEqual(200);
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({
				email: 'johndoe@example.com',
			})
		);
	});
});
