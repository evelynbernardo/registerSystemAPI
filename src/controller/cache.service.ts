import { isArray } from 'lodash'
import * as Redis from 'ioredis'
import { PinoLogger } from 'nestjs-pino'

import { Injectable } from '@nestjs/common'

@Injectable()
export class CacheService {
  private readonly config: Redis.RedisOptions
  readonly client: Redis.Redis

  constructor (
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(CacheService.name)
    this.client = this.connect()
  }

  connect (): Redis.Redis {
    const client = new Redis(this.config)

    client.on('connect', () => {
      this.logger.info(this.config, 'cache connected')
    })
    client.on('error', error => {
      this.logger.error({ ...this.config, ...error }, `cache error: ${error.message}`)
    })

    return client
  }

  get (key: string): Promise<any> {
    return this.client.get(key)
  }

  set (key: string, value = ''): Promise<string> {
    return this.client.set(key, value)
  }

  del (key: string): Promise<string> {
    return this.client.del(key)
  }

  async has(keyPattern: string): Promise<boolean> {
    const keys = await this.client.keys(keyPattern)
    return isArray(keys) && keys.length > 0
  }
}
