import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './chek-in';
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: inMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
	beforeEach(() => {

		checkInsRepository = new InMemoryCheckInsRepository();
		gymsRepository =new inMemoryGymsRepository();
		sut = new CheckInUseCase(checkInsRepository,gymsRepository );

		gymsRepository.items.push({
			id: 'gym-01',
			title: 'JavaScript Gym',
			description: '',
			phone: '',
			latitude: new Decimal(0),
			longetude: new Decimal(0),
		});

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongetude: 0,
		});
		console.log(checkIn.created_at);

		expect(checkIn.id).toEqual(expect.any(String));
	});
	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0));

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongetude: 0,
		});
		await expect(() =>
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: 0,
				userLongetude: 0,
			})
		).rejects.toBeInstanceOf(Error);
	});

	it('should  be able to check in different day', async () => {
		vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0));

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongetude: 0,
		});

		vi.setSystemTime(new Date(2022, 0, 23, 8, 0, 0));
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongetude: 0,
		});
		expect(checkIn.id).toEqual(expect.any(String));
	});
});
