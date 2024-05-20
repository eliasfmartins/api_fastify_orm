import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { ResourceNotFOundError } from './errors/resource-nof-found-error';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './errors/late-check-in-validation-error';

interface ValidateCheckInUseCaseRequest {
	checkInId: string;
}
interface ValidateCheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
	constructor(private CheckInsRepository: CheckInsRepository) {}
	async execute({
		checkInId,
	}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
		const checkIn = await this.CheckInsRepository.findById(checkInId);
		if (!checkIn) {
			throw new ResourceNotFOundError();
		}
		checkIn.validated_at = new Date();
		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			'minutes'
		);

		if (distanceInMinutesFromCheckInCreation > 20){
			throw new LateCheckInValidationError()
		}

		await this.CheckInsRepository.save(checkIn);
		return { checkIn };
	}
}
