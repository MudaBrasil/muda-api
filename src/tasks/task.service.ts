import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Task } from './task.schema'

@Injectable()
export class TaskService {
	constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

	async create(taskData: Partial<Task>): Promise<Task> {
		const task = new this.taskModel(taskData)
		return task.save()
	}

	async find(name: string): Promise<Task[]> {
		return this.taskModel.find({ name: new RegExp(name, 'i') })
	}

	async findOne(id: ObjectId): Promise<Task | null> {
		return await this.taskModel.findOne(id).exec() // TODO: Precisa do await?
		//.populate('parent', ['name', 'active', 'status']).exec()
	}

	async update(id: ObjectId, taskData: Partial<Task>): Promise<Task | null> {
		await this.taskModel.findByIdAndUpdate(id, taskData).exec()
		return this.findOne(id)
	}

	async remove(id: ObjectId): Promise<void> {
		await this.taskModel.findByIdAndDelete(id).exec()
	}
}
