import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Cat } from './cat.schema'

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(catData: Cat): Promise<Cat> {
    const cat = new this.catModel(catData)
    return cat.save()
  }

  async findAll(age: number): Promise<Cat[]> {
    if (age) {
      return this.catModel.find().where('age').gte(age).exec()
    }
    return this.catModel.find().exec()
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findById(id).exec()
  }

  async update(id: string, catData: Cat): Promise<Cat> {
    await this.catModel.findByIdAndUpdate(id, catData).exec()
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.catModel.findByIdAndRemove(id).exec()
  }
}
