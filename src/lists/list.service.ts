import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { List } from './list.schema'

@Injectable()
export class ListService {
	constructor(@InjectModel(List.name) private readonly listModel: Model<List>) {}

	async create(listData: Partial<List>): Promise<List> {
		const list = new this.listModel(listData)
		return list.save()
	}

	async find(name: string): Promise<List[]> {
		return this.listModel.find({ name: new RegExp(name, 'i') })
	}

	async findOne(id: ObjectId): Promise<List | null> {
		return this.listModel.findOne(id).exec()
	}

	async update(id: ObjectId, listData: Partial<List>): Promise<List | null> {
		await this.listModel.findByIdAndUpdate(id, listData).exec()
		return this.findOne(id)
	}

	async remove(id: ObjectId): Promise<void> {
		await this.listModel.findByIdAndDelete(id).exec()
	}
}
