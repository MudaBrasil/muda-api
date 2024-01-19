import { Controller, Get, Post, Put, Delete, Param, Body, Patch, Query } from '@nestjs/common'
import { ListService } from './list.service'
import { List } from './list.schema'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('Lists')
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
	async findOne(@Param('id') id: string): Promise<List | null> {
		return this.listService.findOne(id)
	}

	@Put(':id')
	@ApiBody({ type: List })
	@ApiQuery({ name: 'name', type: String })
	async update(@Param('id') id: string, @Body() listData: Partial<List>): Promise<List | null> {
		return this.listService.update(id, listData)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return this.listService.remove(id)
	}
}
