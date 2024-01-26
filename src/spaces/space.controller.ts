import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { ValidateObjectId } from '../pipes/validation.pipe'
import { Roles, Role } from '../roles/role.decorator'
import { SpaceService } from './space.service'
import { Space } from './space.schema'

@ApiBearerAuth()
@ApiTags('Spaces')
@Roles(Role.User)
@Controller({ path: 'spaces', version: '1' })
export class SpaceController {
	constructor(private readonly spaceService: SpaceService) {}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiBody({ type: Space })
	create(@Body() spaceData: Partial<Space>): Promise<Space> {
		return this.spaceService.create(spaceData)
	}

	@Get()
	@ApiQuery({ name: 'name', type: String, required: false })
	async find(@Query('name') name: string): Promise<Space[]> {
		return this.spaceService.find(name)
	}

	@Get(':id')
	async findOne(@Param('id', ValidateObjectId) id: ObjectId): Promise<Space | null> {
		return this.spaceService.findOne(id)
	}

	@Put(':id')
	@ApiBody({ type: Space })
	async update(@Param('id', ValidateObjectId) id: ObjectId, @Body() spaceData: Partial<Space>): Promise<Space | null> {
		return this.spaceService.update(id, spaceData)
	}

	@Delete(':id')
	async remove(@Param('id', ValidateObjectId) id: ObjectId): Promise<void> {
		return this.spaceService.remove(id)
	}
}
