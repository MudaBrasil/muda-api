import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData)
    return user.save()
  }

  async findAll(name: string): Promise<User[]> {
    if (name?.length > 4) {
      return this.userModel.find({ $text: { $search: name } })
    }
    return this.userModel.find({ name: new RegExp(name, 'i') })
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec()
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    await this.userModel.findByIdAndUpdate(id, userData).exec()
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec()
  }
}
