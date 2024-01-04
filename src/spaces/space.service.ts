import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Space } from './space.schema'

@Injectable()
export class SpaceService {
	constructor(@InjectModel(Space.name) private readonly spaceModel: Model<Space>) {}

	async create(spaceData: Partial<Space>): Promise<Space> {
		const space = new this.spaceModel(spaceData)
		return space.save()
	}

	async findAll(name: string): Promise<Space[]> {
		return this.spaceModel.find({ name: new RegExp(name, 'i') })
	}

	async findOne(name: string): Promise<Space | null> {
		return this.spaceModel.findOne({ name }).exec()
	}

	async update(id: string, spaceData: Partial<Space>): Promise<Space | null> {
		await this.spaceModel.findByIdAndUpdate(id, spaceData).exec()
		return this.findOne(id)
	}

	async remove(id: string): Promise<void> {
		await this.spaceModel.findByIdAndDelete(id).exec()
	}
}
