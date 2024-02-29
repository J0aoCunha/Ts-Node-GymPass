import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  countByUserId(userId: string): Promise<number>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findByUserIdOnDAte(userId: string, date: Date): Promise<CheckIn | null>
  findById(Id: string): Promise<CheckIn | null>
}
