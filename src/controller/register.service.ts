import { Injectable } from '@nestjs/common'

import { Users } from './register.interface'
import { UserNotFound } from './register.errors'

import { CacheService } from './cache.service'

@Injectable()
export class RegisterService {

  private readonly cacheService: CacheService

  private async saveUser(user: Users): Promise<Record<string, any>> {
    
    await this.saveUser(user)
    return user

  }

  async getUser(cpf: string): Promise<void> {
    const exists = await this.cacheService.has(cpf)
    if (!exists) throw new UserNotFound()

    return this.cacheService.get(cpf)

  }

  async createUser(user: Users): Promise<Users> {

    await this.saveUser(user)

    return user
  }

  async updateUser(cpf: string, user: Users): Promise<Users> {
    
    const exists = await this.cacheService.has(cpf)
    if (!exists) throw new UserNotFound()

    await this.saveUser(user)

    return user
  }

  async deleteUser(cpf: string): Promise<void> {
    const exists = await this.cacheService.has(cpf)
    if (!exists) throw new UserNotFound()

    this.cacheService.del(cpf)

  }
}