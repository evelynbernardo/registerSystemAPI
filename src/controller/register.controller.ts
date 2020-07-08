import { Response } from 'express'

import { Controller, Param, Post, Put, Res, Body, Delete, HttpStatus, Get } from '@nestjs/common'
import { Users } from './register.interface'
import { UserNotFound } from './register.errors'
import { RegisterService } from './register.service'

@Controller('users')
export class usersController {

  private readonly registerService: RegisterService

  @Get(':id')
  async get(@Param('id') id: string, @Body() users: Users, @Res() res: Response): Promise<any> {
    try {

      await this.registerService.getUser(id)

      return res.status(HttpStatus.OK).send(users)

    } catch (error) {
      
      if (error instanceof UserNotFound) return res.status(HttpStatus.NOT_FOUND).send(error.message)      
      else return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message)

    }
}

  @Post()
  async create(@Body() users: Users, @Res() res: Response): Promise<Response> {
    try {

      await this.registerService.createUser(users)

      return res.status(HttpStatus.CREATED).send(users)

    } catch (error) {

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() users: Users, @Res() res: Response): Promise<any> {
    try {

      this.registerService.updateUser(id, users)

      return res.status(HttpStatus.OK).send(users)

    } catch (error) {
      
      if (error instanceof UserNotFound) return res.status(HttpStatus.NOT_FOUND).send(error.message)      
      else return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message)

    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      
      await this.registerService.deleteUser(id)

      return res.status(HttpStatus.NO_CONTENT).send({ deleted: true })

    } catch (error) {
      if (error instanceof UserNotFound) return res.status(HttpStatus.NOT_FOUND).send(error.message)
      else return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
  }
}