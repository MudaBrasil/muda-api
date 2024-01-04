import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.schema'

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async create(userData: Partial<User>): Promise<User> {
		const user = new this.userModel(userData)
		return user.save().then(user => user.toObject())
	}

	async findAll(name: string): Promise<User[]> {
		return this.userModel.find({ name: new RegExp(name, 'i') })
	}

	async findOne(id: string): Promise<User | null> {
		return this.userModel.findById(id).exec()
	}

	async findByAuthId(authId: string): Promise<User | null> {
		return this.userModel.findOne({ authId: authId }).exec()
	}

	async update(id: string, userData: Partial<User>): Promise<User | null> {
		await this.userModel.findByIdAndUpdate(id, userData).exec()
		return this.findOne(id)
	}

	async remove(id: string): Promise<void> {
		await this.userModel.findByIdAndDelete(id).exec()
	}
}
