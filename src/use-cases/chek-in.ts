import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { date } from 'zod';

interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
}
interface CheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class CheckInUseCase {
	constructor(private CheckInsRepository: CheckInsRepository) {}
	async execute({
		userId,
		gymId,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		//authenticate
		const checkInOnSameDay = await this.CheckInsRepository.findByUserIdOnDate(
			userId,
			new Date
		);
		if (checkInOnSameDay){
			throw new Error()
		}
		const checkIn = await this.CheckInsRepository.create({
			gym_id: gymId,
			user_id: userId,
		});
		return { checkIn };
	}
}
