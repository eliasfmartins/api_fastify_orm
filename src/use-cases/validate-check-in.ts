import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { ResourceNotFOundError } from './errors/resource-nof-found-error';

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

		await this.CheckInsRepository.save(checkIn);
		return { checkIn };
	}
}
