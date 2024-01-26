import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { ValidateObjectId } from '../pipes/validation.pipe'
import { Roles, Role } from '../roles/role.decorator'
import { TagService } from './tag.service'
import { Tag } from './tag.schema'

@ApiBearerAuth()
@ApiTags('Tags')
@Roles(Role.User)
@Controller({ path: 'tags', version: '1' })
export class TagController {
	constructor(private readonly tagService: TagService) {}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiBody({ type: Tag })
	create(@Body() tagData: Partial<Tag>): Promise<Tag> {
		return this.tagService.create(tagData)
	}

	@Get()
	@ApiQuery({ name: 'name', type: String, required: false })
	async find(@Query('name') name: string): Promise<Tag[]> {
		return this.tagService.find(name)
	}

	@Get(':id')
	async findOne(@Param('id', ValidateObjectId) id: ObjectId): Promise<Tag | null> {
		return this.tagService.findOne(id)
	}

	@Put(':id')
	@ApiBody({ type: Tag })
	async update(@Param('id', ValidateObjectId) id: ObjectId, @Body() tagData: Partial<Tag>): Promise<Tag | null> {
		return this.tagService.update(id, tagData)
	}

	@Delete(':id')
	async remove(@Param('id', ValidateObjectId) id: ObjectId): Promise<void> {
		return this.tagService.remove(id)
	}
}
