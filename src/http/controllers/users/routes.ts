import { authenticate } from './authenticate';
import { profile } from './profile';
import { register } from './register';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { aP } from 'vitest/dist/reporters-LqC_WI4d';
import { refresh } from './refresh';

export async function userRoutes(app: FastifyInstance) {
	app.post('/users', register);
	app.post('/sessions', authenticate);

	app.patch('/token/refresh', refresh);
	//  Authenticated
	app.get('/me', { onRequest: [verifyJWT] }, profile);
}
