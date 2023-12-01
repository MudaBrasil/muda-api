import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Tag } from './tag.schema'

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {}

  async create(tagData: Partial<Tag>): Promise<Tag> {
    const tag = new this.tagModel(tagData)
    return tag.save()
  }

  async findAll(name: string): Promise<Tag[]> {
    return this.tagModel.find({ $text: { $search: name } })
  } //.findOne({"username" : /.*son.*/i});

  async findOne(name: string): Promise<Tag | null> {
    return this.tagModel.findOne({ name }).exec()
  }

  async update(id: string, tagData: Partial<Tag>): Promise<Tag | null> {
    await this.tagModel.findByIdAndUpdate(id, tagData).exec()
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.tagModel.findByIdAndRemove(id).exec()
  }
}
