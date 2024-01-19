import { Controller, Get, Post, Put, Delete, Param, Body, Patch, Query, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.schema'
import { Space } from '../spaces/space.schema'
import { List } from '../lists/list.schema'
import { Task } from '../tasks/task.schema'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { Roles, Role } from '../roles/role.decorator'

// TODO: Ao invés de usar "Users", ver de usar "CurrentUser"  ou "Me" para pegar o usuário logado e o path da rota ficar (GET /me/spaces/:id)
@ApiBearerAuth()
@ApiTags('Users')
@Roles(Role.Admin)
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
	async find(@Query('name') name: string): Promise<User[]> {
		return this.userService.find(name)
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<User | null> {
		return this.userService.findOne(id)
	}

	@Put(':id')
	@ApiBody({ type: User })
	async update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User | null> {
		return this.userService.update(id, userData)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		this.userService.remove(id)
	}

	//#region Spaces
	@Post('spaces')
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiBody({ type: Space })
	createSpace(@Body() spaceData: Partial<Space>, @Request() req): Promise<Space> {
		return this.userService.createSpace(req.userId, spaceData)
	}

	@Get('spaces')
	async findSpace(@Request() req): Promise<Space[]> {
		return this.userService.findSpace(req.userId)
	}

	@Get('spaces/:spaceId')
	async findOneSpace(@Param('spaceId') spaceId: string, @Request() req): Promise<Space | null> {
		return this.userService.findOneSpace(req.userId, spaceId)
	}

	@Put('spaces/:spaceId')
	@ApiBody({ type: Space })
	async updateSpace(
		@Param('spaceId') spaceId: string,
		@Body() spaceData: Partial<Space>,
		@Request() req
	): Promise<Space | null> {
		return this.userService.updateSpace(req.userId, spaceId, spaceData)
	}

	@Delete('spaces/:spaceId')
	async removeSpace(@Param('spaceId') spaceId: string, @Request() req): Promise<void> {
		this.userService.removeSpace(req.userId, spaceId)
	}
	//#endregion

	//#region Spaces Lists
	@Post('spaces/:spaceId/lists')
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiBody({ type: List })
	createSpaceList(@Param('spaceId') spaceId: string, @Body() listData: Partial<List>, @Request() req): Promise<List> {
		return this.userService.createSpaceList(req.userId, spaceId, listData)
	}

	@Get('spaces/:spaceId/lists')
	async findSpaceList(@Param('spaceId') spaceId: string, @Request() req): Promise<List[]> {
		return this.userService.findSpaceList(req.userId, spaceId)
	}

	@Get('spaces/:spaceId/lists/:listId')
	async findOneSpaceList(
		@Param('spaceId') spaceId: string,
		@Param('listId') listId: string,
		@Request() req
	): Promise<List | null> {
		return this.userService.findOneSpaceList(req.userId, spaceId, listId)
	}

	@Put('spaces/:spaceId/lists/:listId')
	@ApiBody({ type: List })
	async updateSpaceList(
		@Param('spaceId') spaceId: string,
		@Param('listId') listId: string,
		@Body() listData: Partial<List>,
		@Request() req
	): Promise<List | null> {
		return this.userService.updateSpaceList(req.userId, spaceId, listId, listData)
	}

	@Delete('spaces/:spaceId/lists/:listId')
	async removeSpaceList(
		@Param('spaceId') spaceId: string,
		@Param('listId') listId: string,
		@Request() req
	): Promise<void> {
		this.userService.removeSpaceList(req.userId, spaceId, listId)
	}

	//#endregion

	//#region Spaces Lists Tasks
	@Post('spaces/:spaceId/lists/:listId/tasks')
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiBody({ type: Task })
	createSpaceListTask(
		@Param('spaceId') spaceId: string,
		@Param('listId') listId: string,
		@Body() listData: Partial<Task>,
		@Request() req
	): Promise<Task> {
		return this.userService.createSpaceListTask(req.userId, spaceId, listId, listData)
	}

	@Get('spaces/:spaceId/lists/:listId/tasks')
	async findSpaceListTask(
		@Param('spaceId') spaceId: string,
		@Param('listId') listId: string,
		@Request() req
	): Promise<Task[]> {
		return this.userService.findSpaceListTask(req.userId, spaceId, listId)
	}

	@Get('spaces/:spaceId/lists/:listId/tasks/:taskId')
	async findOneSpaceListTask(
		@Param('spaceId') spaceId: string,
		@Param('listId') listId: string,
		@Param('taskId') taskId: string,
		@Request() req
	): Promise<Task | null> {
		return this.userService.findOneSpaceListTask(req.userId, spaceId, listId, taskId)
	}

	@Put('spaces/:spaceId/lists/:listId/tasks/:taskId')
	@ApiBody({ type: Task })
	async updateSpaceListTask(
		@Param('spaceId') spaceId: string,
		@Param('listId') listId: string,
		@Param('taskId') taskId: string,
		@Body() listData: Partial<Task>,
		@Request() req
	): Promise<Task | null> {
		return this.userService.updateSpaceListTask(req.userId, spaceId, listId, taskId, listData)
	}

	@Delete('spaces/:spaceId/lists/:listId/tasks/:taskId')
	async removeSpaceListTask(
		@Param('spaceId') spaceId: string,
		@Param('listId') listId: string,
		@Param('taskId') taskId: string,
		@Request() req
	): Promise<void> {
		this.userService.removeSpaceListTask(req.userId, spaceId, listId, taskId)
	}
	//#endregion
}
