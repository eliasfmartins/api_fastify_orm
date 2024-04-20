import { register } from './controllers/register';
import { FastifyInstance } from 'fastify';

export async function AppRoutes(app:FastifyInstance) {
	app.post('/users', register);
}
