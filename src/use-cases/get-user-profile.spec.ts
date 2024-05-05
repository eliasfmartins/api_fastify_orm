import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './factories/get-user-profile';
import { ResourceNotFOundError } from './errors/resource-nof-found-error';

let usersRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe('Get User profile Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUserRepository();
		sut = new GetUserProfileUseCase(usersRepository);
	});

	it(' should be able to get user profile', async () => {
		const createuser = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
		});
		const { user } = await sut.execute({
			userId: createuser.id,
		});

		expect(user.name).toEqual('John Doe');
	});

	it('should not be able to get user profile with  wrong id', async () => {
		expect(() =>
			sut.execute({
				userId:'nom-existing-id'
			})
		).rejects.toBeInstanceOf(ResourceNotFOundError);
	});
});
