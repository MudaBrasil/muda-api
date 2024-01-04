import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Task } from './task.schema'

@Injectable()
export class TaskService {
	constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

	async create(taskData: Partial<Task>): Promise<Task> {
		const task = new this.taskModel(taskData)
		return task.save()
	}

	async findAll(name: string): Promise<Task[]> {
		return this.taskModel.find({ name: new RegExp(name, 'i') })
	}

	async findOne(name: string): Promise<Task | null> {
		return this.taskModel.findOne({ name }).exec()
	}

	async update(id: string, taskData: Partial<Task>): Promise<Task | null> {
		await this.taskModel.findByIdAndUpdate(id, taskData).exec()
		return this.findOne(id)
	}

	async remove(id: string): Promise<void> {
		await this.taskModel.findByIdAndDelete(id).exec()
	}
}
