import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { inMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: inMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
	beforeEach(() => {
		gymsRepository = new inMemoryGymsRepository();
		sut = new CreateGymUseCase(gymsRepository);
	});
	
	it('should be able to create gym', async () => {
		const { gym } = await sut.execute({
			title: 'JavaScript Gym',
            description: null,
            phone:null,
            latitude: -27.2092052,
            longitude: -49.6401091,

		});

		expect(gym.id).toEqual(expect.any(String));
	});


});

