import { Controller, Get, Post, Put, Delete, Param, Body, Query, Request } from '@nestjs/common'
import { ApiTags, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { ValidateObjectId } from '../pipes/validation.pipe'
import { Roles, Role } from '../roles/role.decorator'
import { Timelines, UserService } from './user.service'
import { User } from './user.schema'
import { Task } from '../tasks/task.schema'
import { List } from '../lists/list.schema'
import { Space } from '../spaces/space.schema'

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
	@ApiParam({ name: 'id' })
	async findOne(@Param('id', ValidateObjectId) id: ObjectId): Promise<User | null> {
		return this.userService.findOne(id)
	}

	// @Put(':id')
	// @ApiBody({ type: User })
	// async update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User | null> {
	// 	return this.userService.update(id, userData)
	// }

	// @Delete(':id')
	// async remove(@Param('id') id: string): Promise<void> {
	// 	this.userService.remove(id)
	// }
}

@ApiBearerAuth()
@ApiTags('Me')
@Roles(Role.User)
@Controller({ path: 'me', version: '1' })
export class MeController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findOne(@Request() req): Promise<User | null> {
		return this.userService.findOne(req.roleUserId)
	}

	@Put()
	@ApiBody({ type: User })
	async update(@Request() req, @Body() userData: Partial<User>): Promise<User | null> {
		return this.userService.update(req.roleUserId, userData)
	}

	// @Delete()
	@Put('inactivate')
	async inactivate(@Request() req): Promise<void> {
		this.userService.delete(req.roleUserId)
	}

	@Get('tasks')
	@ApiQuery({ name: 'startFrom', required: false })
	@ApiQuery({ name: 'startTo', type: Date, required: false })
	@ApiQuery({ name: 'sort', type: Boolean, required: false })
	async getTasks(
		@Request() req,
		@Query('startFrom') startFrom,
		@Query('startTo') startTo,
		@Query('sort') sort = true
	): Promise<Task[]> {
		return this.userService.getTasks(req.roleUserId, { sort, startTo, startFrom })
	}

	@Get('timelines')
	@ApiQuery({ name: 'daysToSplit', type: [String], required: false })
	@ApiQuery({ name: 'startFrom', type: Date, required: false })
	@ApiQuery({ name: 'startTo', type: Date, required: false })
	async getTimelines(
		@Request() req,
		@Query('daysToSplit') daysToSplit,
		@Query('startFrom') startFrom,
		@Query('startTo') startTo
	): Promise<Timelines> {
		return this.userService.getTimelines(req.roleUserId, { startTo, startFrom, daysToSplit })
	}

	//#region Spaces
	@Post('spaces')
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiBody({ type: Space })
	createSpace(@Body() spaceData: Partial<Space>, @Request() req): Promise<Space> {
		return this.userService.createSpace(req.roleUserId, spaceData)
	}

	@Get('spaces')
	async findSpace(@Request() req): Promise<Space[]> {
		return this.userService.findSpace(req.roleUserId)
	}

	@Get('spaces/:spaceId')
	@ApiParam({ name: 'spaceId' })
	async findOneSpace(@Param('spaceId', ValidateObjectId) spaceId: ObjectId, @Request() req): Promise<Space | null> {
		return this.userService.findOneSpace(req.roleUserId, spaceId)
	}

	@Put('spaces/:spaceId')
	@ApiParam({ name: 'spaceId' })
	@ApiBody({ type: Space })
	async updateSpace(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Body() spaceData: Partial<Space>,
		@Request() req
	): Promise<Space | null> {
		return this.userService.updateSpace(req.roleUserId, spaceId, spaceData)
	}

	@Delete('spaces/:spaceId')
	@ApiParam({ name: 'spaceId' })
	async removeSpace(@Param('spaceId', ValidateObjectId) spaceId: ObjectId, @Request() req): Promise<void> {
		this.userService.removeSpace(req.roleUserId, spaceId)
	}
	//#endregion

	//#region Spaces Lists
	@Post('spaces/:spaceId/lists')
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'spaceId' })
	@ApiBody({ type: List })
	createSpaceList(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Body() listData: Partial<List>,
		@Request() req
	): Promise<List> {
		return this.userService.createSpaceList(req.roleUserId, spaceId, listData)
	}

	@Get('spaces/:spaceId/lists')
	@ApiParam({ name: 'spaceId' })
	async findSpaceList(@Param('spaceId', ValidateObjectId) spaceId: ObjectId, @Request() req): Promise<List[]> {
		return this.userService.findSpaceList(req.roleUserId, spaceId)
	}

	@Get('spaces/:spaceId/lists/:listId')
	@ApiParam({ name: 'spaceId' })
	@ApiParam({ name: 'listId' })
	async findOneSpaceList(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Param('listId', ValidateObjectId) listId: ObjectId,
		@Request() req
	): Promise<List | null> {
		return this.userService.findOneSpaceList(req.roleUserId, spaceId, listId)
	}

	@Put('spaces/:spaceId/lists/:listId')
	@ApiParam({ name: 'spaceId' })
	@ApiParam({ name: 'listId' })
	@ApiBody({ type: List })
	async updateSpaceList(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Param('listId', ValidateObjectId) listId: ObjectId,
		@Body() listData: Partial<List>,
		@Request() req
	): Promise<List | null> {
		return this.userService.updateSpaceList(req.roleUserId, spaceId, listId, listData)
	}

	@Delete('spaces/:spaceId/lists/:listId')
	@ApiParam({ name: 'spaceId' })
	@ApiParam({ name: 'listId' })
	async removeSpaceList(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Param('listId', ValidateObjectId) listId: ObjectId,
		@Request() req
	): Promise<void> {
		this.userService.removeSpaceList(req.roleUserId, spaceId, listId)
	}

	//#endregion

	//#region Spaces Lists Tasks
	@Post('spaces/:spaceId/lists/:listId/tasks')
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'spaceId' })
	@ApiParam({ name: 'listId' })
	@ApiBody({ type: Task })
	createSpaceListTask(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Param('listId', ValidateObjectId) listId: ObjectId,
		@Body() listData: Partial<Task>,
		@Request() req
	): Promise<Task> {
		return this.userService.createSpaceListTask(req.roleUserId, spaceId, listId, listData)
	}

	@Get('spaces/:spaceId/lists/:listId/tasks')
	@ApiParam({ name: 'spaceId' })
	@ApiParam({ name: 'listId' })
	async findSpaceListTask(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Param('listId', ValidateObjectId) listId: ObjectId,
		@Request() req
	): Promise<Task[]> {
		return this.userService.findSpaceListTask(req.roleUserId, spaceId, listId)
	}

	@Get('spaces/:spaceId/lists/:listId/tasks/:taskId')
	@ApiParam({ name: 'spaceId' })
	@ApiParam({ name: 'listId' })
	@ApiParam({ name: 'taskId' })
	async findOneSpaceListTask(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Param('listId', ValidateObjectId) listId: ObjectId,
		@Param('taskId', ValidateObjectId) taskId: ObjectId,
		@Request() req
	): Promise<Task | null> {
		return this.userService.findOneSpaceListTask(req.roleUserId, spaceId, listId, taskId)
	}

	@Put('spaces/:spaceId/lists/:listId/tasks/:taskId')
	@ApiParam({ name: 'spaceId' })
	@ApiParam({ name: 'listId' })
	@ApiParam({ name: 'taskId' })
	@ApiBody({ type: Task })
	async updateSpaceListTask(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Param('listId', ValidateObjectId) listId: ObjectId,
		@Param('taskId', ValidateObjectId) taskId: ObjectId,
		@Body() listData: Partial<Task>,
		@Request() req
	): Promise<Task | null> {
		return this.userService.updateSpaceListTask(req.roleUserId, spaceId, listId, taskId, listData)
	}

	@Delete('spaces/:spaceId/lists/:listId/tasks/:taskId')
	@ApiParam({ name: 'spaceId' })
	@ApiParam({ name: 'listId' })
	@ApiParam({ name: 'taskId' })
	async removeSpaceListTask(
		@Param('spaceId', ValidateObjectId) spaceId: ObjectId,
		@Param('listId', ValidateObjectId) listId: ObjectId,
		@Param('taskId', ValidateObjectId) taskId: ObjectId,
		@Request() req
	): Promise<void> {
		this.userService.removeSpaceListTask(req.roleUserId, spaceId, listId, taskId)
	}
	//#endregion
}
