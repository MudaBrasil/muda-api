import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { User } from './user.schema'
import { Space } from '../spaces/space.schema'
import { List } from '../lists/list.schema'
import { Task } from '../tasks/task.schema'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		@InjectModel(Space.name) private readonly spaceModel: Model<Space>,
		@InjectModel(List.name) private readonly listModel: Model<List>,
		@InjectModel(Task.name) private readonly taskModel: Model<Task>
	) {}

	// TODO: Continuar implementacao ou salvar no firestore
	async addDeviceLoggedIn(userId: ObjectId, deviceId: ObjectId): Promise<User> {
		return this.userModel.findByIdAndUpdate(userId, { $push: { devicesLoggedIn: deviceId } })
	}

	// TODO: Continuar implementacao ou salvar no firestore
	async addDeviceLoggedOut(userId: ObjectId, deviceId: ObjectId): Promise<User> {
		return this.userModel.findByIdAndUpdate(userId, { $push: { devicesLoggedOut: deviceId } })
	}

	// TODO: Continuar implementacao ou salvar no firestore
	async updateLastVisited(userId: ObjectId, date: Date): Promise<User> {
		return this.userModel.findByIdAndUpdate(userId, { lastVisited: date })
	}

	async create(userData: Partial<User>): Promise<User> {
		const user = new this.userModel(userData)
		return user.save().then(user => user.toObject())
	}

	async find(name: string): Promise<User[]> {
		return this.userModel.find({ name: new RegExp(name, 'i') })
	}

	async findOne(id: ObjectId): Promise<User> {
		return this.userModel.findById(id)
	}

	async findByAuthId(authId: string): Promise<User> {
		return this.userModel.findOne({ authId: authId })
	}

	async update(id: ObjectId, userData: Partial<User>): Promise<User> {
		await this.userModel.findByIdAndUpdate(id, userData)
		return this.findOne(id)
	}

	async delete(id: ObjectId): Promise<void> {
		await this.userModel.findByIdAndUpdate(id, { active: false, status: 'deleted' })
	}

	//#region Spaces
	async createSpace(userId: ObjectId, spaceData: Partial<Space>): Promise<Space> {
		const space = new this.spaceModel(spaceData)

		return this.userModel
			.findByIdAndUpdate(userId)
			.then(user => user.spaces.push(space) && user.save().then(user => user.spaces.id(space.id)))
	}

	async findSpace(userId: ObjectId): Promise<Space[]> {
		return this.userModel.findById(userId).then(user => user.spaces)
	}

	async findOneSpace(userId: ObjectId, spaceId: ObjectId): Promise<Space> {
		return this.userModel.findById(userId).then(user => user.spaces.id(spaceId))
	}

	async updateSpace(userId: ObjectId, spaceId: ObjectId, spaceData: Partial<Space>): Promise<Space> {
		return this.userModel
			.findById(userId)
			.then(user => user.spaces.id(spaceId).set(spaceData) && user.save().then(user => user.spaces.id(spaceId)))
	}

	async removeSpace(userId: ObjectId, spaceId: ObjectId): Promise<void> {
		await this.userModel.findByIdAndUpdate(userId, { $pull: { spaces: { _id: spaceId } } })
	}
	//#endregion

	//#region Spaces Lists
	async createSpaceList(userId: ObjectId, spaceId: ObjectId, listData: Partial<List>): Promise<List> {
		const list = new this.listModel(listData)

		return this.userModel
			.findByIdAndUpdate(userId)
			.then(
				user =>
					user.spaces.id(spaceId).lists.push(list) && user.save().then(user => user.spaces.id(spaceId).lists.id(list))
			)
	}

	async findSpaceList(userId: ObjectId, spaceId: ObjectId): Promise<List[]> {
		return this.userModel.findById(userId).then(user => user.spaces.id(spaceId).lists)
	}

	async findOneSpaceList(userId: ObjectId, spaceId: ObjectId, listId: ObjectId): Promise<List> {
		return this.userModel.findById(userId).then(user => user.spaces.id(spaceId).lists.id(listId))
	}

	async updateSpaceList(userId: ObjectId, spaceId: ObjectId, listId: ObjectId, listData: Partial<List>): Promise<List> {
		return this.userModel
			.findById(userId)
			.then(
				user =>
					user.spaces.id(spaceId).lists.id(listId).set(listData) &&
					user.save().then(user => user.spaces.id(spaceId).lists.id(listId))
			)
	}

	async removeSpaceList(userId: ObjectId, spaceId: ObjectId, listId: ObjectId): Promise<void> {
		await this.userModel.findByIdAndUpdate(
			userId,
			{ $pull: { 'spaces.$[space].lists': { _id: listId } } },
			{ arrayFilters: [{ 'space._id': spaceId }] }
		)
	}
	//#endregion

	//#region Spaces Lists Tasks
	async createSpaceListTask(
		userId: ObjectId,
		spaceId: ObjectId,
		listId: ObjectId,
		taskData: Partial<Task>
	): Promise<Task> {
		const task = new this.taskModel(taskData)

		return this.userModel
			.findByIdAndUpdate(userId)
			.then(
				user =>
					user.spaces.id(spaceId).lists.id(listId).tasks.push(task) &&
					user.save().then(user => user.spaces.id(spaceId).lists.id(listId).tasks.id(task.id))
			)
	}

	async findSpaceListTask(userId: ObjectId, spaceId: ObjectId, listId: ObjectId): Promise<Task[]> {
		return this.userModel.findById(userId).then(user => user.spaces.id(spaceId).lists.id(listId).tasks)
	}

	async findOneSpaceListTask(
		userId: ObjectId,
		spaceId: ObjectId,
		listId: ObjectId,
		taskId: ObjectId
	): Promise<Task | null> {
		return this.userModel.findById(userId).then(user => user.spaces.id(spaceId).lists.id(listId).tasks.id(taskId))
	}

	async updateSpaceListTask(
		userId: ObjectId,
		spaceId: ObjectId,
		listId: ObjectId,
		taskId: ObjectId,
		taskData: Partial<Task>
	): Promise<Task> {
		return this.userModel
			.findById(userId)
			.then(
				user =>
					user.spaces.id(spaceId).lists.id(listId).tasks.id(taskId).set(taskData) &&
					user.save().then(user => user.spaces.id(spaceId).lists.id(listId).tasks.id(taskId))
			)
	}

	async removeSpaceListTask(userId: ObjectId, spaceId: ObjectId, listId: ObjectId, taskId: ObjectId): Promise<void> {
		await this.userModel.findByIdAndUpdate(
			userId,
			{ $pull: { 'spaces.$[space].lists.$[list].tasks': { _id: taskId } } },
			{ arrayFilters: [{ 'space._id': spaceId }, { 'list._id': listId }] }
		)
	}
	//#endregion
}
