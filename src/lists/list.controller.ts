import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { ValidateObjectId } from '../pipes/validation.pipe'
import { Roles, Role } from '../roles/role.decorator'
import { ListService } from './list.service'
import { List } from './list.schema'

@ApiBearerAuth()
@ApiTags('Lists')
@Roles(Role.User)
@Controller({ path: 'lists', version: '1' })
export class ListController {
	constructor(private readonly listService: ListService) {}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiBody({ type: List })
	create(@Body() listData: Partial<List>): Promise<List> {
		return this.listService.create(listData)
	}

	@Get()
	@ApiQuery({ name: 'name', type: String, required: false })
	async find(@Query('name') name: string): Promise<List[]> {
		return this.listService.find(name)
	}

	@Get(':id')
	@ApiParam({ name: 'id' })
	async findOne(@Param('id', ValidateObjectId) id: ObjectId): Promise<List | null> {
		return this.listService.findOne(id)
	}

	@Put(':id')
	@ApiParam({ name: 'id' })
	@ApiBody({ type: List })
	async update(@Param('id', ValidateObjectId) id: ObjectId, @Body() listData: Partial<List>): Promise<List | null> {
		return this.listService.update(id, listData)
	}

	@Delete(':id')
	@ApiParam({ name: 'id' })
	async remove(@Param('id', ValidateObjectId) id: ObjectId): Promise<void> {
		return this.listService.remove(id)
	}
}
