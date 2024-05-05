import { UserRepository } from '@/repositories/users-repository';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { ResourceNotFOundError } from '../errors/resource-nof-found-error';

interface GetUserProfileUseCaseRequest {
	userId:string
}
interface GetUserProfileUseCaseResponse {
    user:User
}

export class GetUserProfileUseCase {
	constructor(private usersRepository: UserRepository) {}
	async execute({
        userId
	}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		//authenticate
		const user = await this.usersRepository.findById(userId);
		if (!user) {
			throw new ResourceNotFOundError();
		}
	
		return { user };
	}
}
