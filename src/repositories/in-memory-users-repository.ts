import { Prisma } from '@prisma/client';

export class ImMemoryUsersRepository {
	public users: any[] = [];
	async create(data: Prisma.UserCreateInput) {
		this.users.push(data);
	}
}
