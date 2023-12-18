import { Controller, Get, Post, Put, Delete, Param, Body, Patch, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.schema'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: User })
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData)
  }

  @Get()
  @ApiQuery({ name: 'name', type: String, required: false })
  async findAll(@Query('name') name: string): Promise<User[]> {
    return this.userService.findAll(name)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id)
  }

  @Put(':id')
  @ApiBody({ type: User })
  @ApiQuery({ name: 'name', type: String })
  async update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User | null> {
    return this.userService.update(id, userData)
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User | null> {
    return this.userService.update(id, userData)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }
}
