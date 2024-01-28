import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { ValidateObjectId } from '../pipes/validation.pipe'
import { Roles, Role } from '../roles/role.decorator'
import { TaskService } from './task.service'
import { Task } from './task.schema'

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
	@ApiParam({ name: 'id' })
	async findOne(@Param('id', ValidateObjectId) id: ObjectId): Promise<Task | null> {
		return this.taskService.findOne(id)
	}

	@Put(':id')
	@ApiParam({ name: 'id' })
	@ApiBody({ type: Task })
	async update(@Param('id', ValidateObjectId) id: ObjectId, @Body() taskData: Partial<Task>): Promise<Task | null> {
		return this.taskService.update(id, taskData)
	}

	@Delete(':id')
	@ApiParam({ name: 'id' })
	async remove(@Param('id', ValidateObjectId) id: ObjectId): Promise<void> {
		return this.taskService.remove(id)
	}
}
