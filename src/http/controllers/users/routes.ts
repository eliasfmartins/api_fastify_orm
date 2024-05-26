import { authenticate } from './authenticate';
import { profile } from './profile';
import { register } from './register';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';

export async function userRoutes(app: FastifyInstance) {
	app.post('/users', register);
	app.post('/sessions', authenticate);
	//  Authenticated
	app.get('/me', { onRequest: [verifyJWT] }, profile);
}