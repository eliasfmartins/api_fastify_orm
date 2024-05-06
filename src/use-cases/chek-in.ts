import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { date } from 'zod';
import { GymsRepository } from '@/repositories/gyms-repository';
import { ResourceNotFOundError } from './errors/resource-nof-found-error';

interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
	userLatitude: number;
	userLongetude: number;
}
interface CheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class CheckInUseCase {
	constructor(
		private CheckInsRepository: CheckInsRepository,
		private gymRepository: GymsRepository
	) {}
	async execute({
		userId,
		gymId,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymRepository.findById(gymId)
		if (!gym){
			throw new ResourceNotFOundError()
		}
		// calculate distance between user and gym
		
		//authenticate
		const checkInOnSameDay = await this.CheckInsRepository.findByUserIdOnDate(
			userId,
			new Date()
		);
		if (checkInOnSameDay) {
			throw new Error();
		}
		const checkIn = await this.CheckInsRepository.create({
			gym_id: gymId,
			user_id: userId,
		});
		return { checkIn };
	}
}
