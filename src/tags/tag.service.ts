import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Tag } from './tag.schema'

@Injectable()
export class TagService {
	constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {}

	async create(tagData: Partial<Tag>): Promise<Tag> {
		const tag = new this.tagModel(tagData)
		return tag.save()
	}

	async find(name: string): Promise<Tag[]> {
		return this.tagModel.find({ name: new RegExp(name, 'i') })
	}

	async findOne(id: ObjectId): Promise<Tag | null> {
		return this.tagModel.findOne(id).exec()
	}

	async update(id: ObjectId, tagData: Partial<Tag>): Promise<Tag | null> {
		await this.tagModel.findByIdAndUpdate(id, tagData).exec()
		return this.findOne(id)
	}

	async remove(id: ObjectId): Promise<void> {
		await this.tagModel.findByIdAndDelete(id).exec()
	}
}
