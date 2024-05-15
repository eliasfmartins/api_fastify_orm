import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { date } from 'zod';
import { GymsRepository } from '@/repositories/gyms-repository';
import { ResourceNotFOundError } from './errors/resource-nof-found-error';
import { getDistanceBetweenCoordinates } from './utils/get-distance-between-coordinates';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
	userLatitude: number;
	userLongitude: number;
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
		userLatitude,
		userLongitude,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymRepository.findById(gymId);
		if (!gym) {
			throw new ResourceNotFOundError();
		}
		// calculate distance between user and gym
		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
		);

		const MAX_DISTANCE_IN_KILOMETERS =  0.1

		if(distance > MAX_DISTANCE_IN_KILOMETERS){
			throw new MaxDistanceError()
		}
		//authenticate
		const checkInOnSameDay = await this.CheckInsRepository.findByUserIdOnDate(
			userId,
			new Date()
		);
		if (checkInOnSameDay) {
			throw new MaxNumberOfCheckInsError();
		}
		const checkIn = await this.CheckInsRepository.create({
			gym_id: gymId,
			user_id: userId,
		});
		return { checkIn };
	}
}
