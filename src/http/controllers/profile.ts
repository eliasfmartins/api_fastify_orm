import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
	await request.jwtVerify();
	console.log(request.user.sub);

	return reply.status(200).send();
}
