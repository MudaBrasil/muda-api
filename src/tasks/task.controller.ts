import { Controller, Get, Post, Put, Delete, Param, Body, Patch, Query } from '@nestjs/common'
import { TaskService } from './task.service'
import { Task } from './task.schema'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { Roles, Role } from '../roles/role.decorator'

@ApiBearerAuth()
@ApiTags('Tasks')
@Roles(Role.User)
@Controller({ path: 'tasks', version: '1' })
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiBody({ type: Task })
	create(@Body() taskData: Partial<Task>): Promise<Task> {
		return this.taskService.create(taskData)
	}

	@Get()
	@ApiQuery({ name: 'name', type: String, required: false })
	async find(@Query('name') name: string): Promise<Task[]> {
		return this.taskService.find(name)
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Task | null> {
		return this.taskService.findOne(id)
	}

	@Put(':id')
	@ApiBody({ type: Task })
	@ApiQuery({ name: 'name', type: String })
	async update(@Param('id') id: string, @Body() taskData: Partial<Task>): Promise<Task | null> {
		return this.taskService.update(id, taskData)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return this.taskService.remove(id)
	}
}
