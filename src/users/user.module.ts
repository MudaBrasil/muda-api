import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User, UserSchema } from './user.schema'
import { Space, SpaceSchema } from '../spaces/space.schema'
import { List, ListSchema } from '../lists/list.schema'
import { Task, TaskSchema } from '../tasks/task.schema'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		MongooseModule.forFeature([{ name: Space.name, schema: SpaceSchema }]),
		MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
		MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
