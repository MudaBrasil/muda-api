import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Space } from './space.schema'

@Injectable()
export class SpaceService {
	constructor(@InjectModel(Space.name) private readonly spaceModel: Model<Space>) {}

	async create(spaceData: Partial<Space>): Promise<Space> {
		const space = new this.spaceModel(spaceData)
		return space.save()
	}

	async find(name: string): Promise<Space[]> {
		return this.spaceModel.find({ name: new RegExp(name, 'i') })
	}

	async findOne(id: ObjectId): Promise<Space | null> {
		return this.spaceModel.findOne(id).exec()
	}

	async update(id: ObjectId, spaceData: Partial<Space>): Promise<Space | null> {
		await this.spaceModel.findByIdAndUpdate(id, spaceData).exec()
		return this.findOne(id)
	}

	async remove(id: ObjectId): Promise<void> {
		await this.spaceModel.findByIdAndDelete(id).exec()
	}
}
