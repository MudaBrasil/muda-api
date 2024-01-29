import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { User } from './user.schema'
import { Space } from '../spaces/space.schema'
import { List } from '../lists/list.schema'
import { Task } from '../tasks/task.schema'

type Day = string

export class Timelines {
	[key: Day]: Task[]
}

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

	async getTasks(userId: ObjectId, options = { sort: null, startFrom: null, startTo: null }): Promise<Task[]> {
		const validateTask = (task: Task) => {
			if (options.startFrom) {
				if (options.startTo) {
					return task.startDate >= options.startFrom && task.startDate <= options.startTo
				} else {
					return task.startDate >= options.startFrom
				}
			}
			return true
		}

		// TODO: Verify if copilot or chatgpt has a mongoose solution for this

		const [privateTasks, publicTasks] = await Promise.all([
			this.userModel.findById(userId).then(user =>
				user.spaces.flatMap(space =>
					space.lists.flatMap(list =>
						list.tasks.filter(task => {
							if (!validateTask(task)) return false
							task.parent = list.id
							task.public = false
							return true
						})
					)
				)
			),
			this.taskModel
				.find({ assignees: { $in: [userId] } })
				.then(tasks => tasks.filter(task => (task.public = validateTask(task))))
		])

		const tasks = [...privateTasks, ...publicTasks]

		if (options.sort) {
			tasks.sort((a, b) => {
				if (a.startDate && b.startDate) return a.startDate.getTime() - b.startDate.getTime()
				if (a.startDate) return -1
				if (b.startDate) return 1
				return 0
			})
		}

		return tasks
	}

	async getTimelines(
		userId: ObjectId,
		options = { daysToSplit: [], startFrom: null, startTo: null, timeZone: null }
	): Promise<Timelines> {
		const tasks = await this.getTasks(userId, { ...options, sort: false })
		const dateToString = (date: Date = new Date(), timeZone = options.timeZone) => {
			return date.toLocaleString('sv', { timeZone }).substring(0, 10)
		}

		options.daysToSplit = options.daysToSplit || [dateToString()]

		const tasksSplitted: Timelines = {}

		tasks.forEach(task => {
			if (!task.startDate) return false

			const startDateString = dateToString(task.startDate)

			if (tasksSplitted[startDateString]?.length) {
				const findIndexToInsert = (task: Task, list = tasksSplitted[startDateString]) => {
					const insertIndex = list.findIndex(i => task.startDate < i.startDate)
					return insertIndex !== -1 ? insertIndex : list.length
				}

				return tasksSplitted[startDateString].splice(findIndexToInsert(task), 0, task)
			}
			if (options.daysToSplit.includes(startDateString)) return (tasksSplitted[startDateString] = [task])
		})
		// TODO: Maybe need to sort tasksSplitted keys

		return tasksSplitted
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
