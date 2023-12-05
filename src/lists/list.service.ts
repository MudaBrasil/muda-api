import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { List } from './list.schema'

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private readonly listModel: Model<List>) {}

  async create(listData: Partial<List>): Promise<List> {
    const list = new this.listModel(listData)
    return list.save()
  }

  async findAll(name: string): Promise<List[]> {
    if (name?.length > 4) {
      return this.listModel.find({ $text: { $search: name } })
    }
    return this.listModel.find({ name: new RegExp(name, 'i') })
  }

  async findOne(name: string): Promise<List | null> {
    return this.listModel.findOne({ name }).exec()
  }

  async update(id: string, listData: Partial<List>): Promise<List | null> {
    await this.listModel.findByIdAndUpdate(id, listData).exec()
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.listModel.findByIdAndDelete(id).exec()
  }
}
