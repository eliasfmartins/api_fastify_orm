import fastify from 'fastify';
import { AppRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();
app.register(AppRoutes);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
        .status(400)
        .send({message:'Validate error.', issues: error.format()})
	}
    if(env.NODE_ENV!== 'production'){
        console.error(error)
    }else{
        //TODO: here we shold log to an external tool like Datadog
    }
    return reply.status(500).send({message:'Internal server error.'})
});
