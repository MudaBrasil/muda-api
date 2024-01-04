import { Controller, Get, Post, Put, Delete, Param, Body, Patch, Query } from '@nestjs/common'
import { TagService } from './tag.service'
import { Tag } from './tag.schema'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('Tags')
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
	async findAll(@Query('name') name: string): Promise<Tag[]> {
		return this.tagService.findAll(name)
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Tag | null> {
		return this.tagService.findOne(id)
	}

	@Put(':id')
	@ApiBody({ type: Tag })
	@ApiQuery({ name: 'name', type: String })
	async update(@Param('id') id: string, @Body() tagData: Partial<Tag>): Promise<Tag | null> {
		return this.tagService.update(id, tagData)
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() tagData: Partial<Tag>): Promise<Tag | null> {
		return this.tagService.update(id, tagData)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return this.tagService.remove(id)
	}
}
