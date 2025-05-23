import { User } from '@/domain/enterprise/entities/user'

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract findById(id: string): Promise<User | null>
  abstract create(user: User): Promise<void>
  abstract delete(user: User): Promise<void>
  abstract updatePlan(userID: string, plan: string): Promise<void>
  abstract save(user: User): Promise<void>
}
