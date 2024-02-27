import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsBoolean, IsObject } from 'class-validator'
import { HydratedDocument, Types } from 'mongoose'
import { Task, TaskSchema } from '../tasks/task.schema'
import { Cell } from 'src/cells/cell.schema'
import { User } from 'src/users/user.schema'

@Schema({ collection: 'lists', timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' } })
export class List extends Cell {
	// #region Cell properties
	@ApiProperty({ example: 'Compras', description: 'The list title' })
	declare name

	@ApiProperty({ description: 'The active status of list' })
	declare active

	@ApiProperty({ description: 'The archived status of list' })
	declare archived

	@ApiProperty({ description: 'The deleted status of list' })
	declare deleted

	@ApiProperty({ example: 'Espaço criado para eu evoluir minha saúde', description: 'The description of list' })
	declare description?

	@ApiProperty({ description: 'The status of list' })
	declare status?

	@ApiProperty({ description: 'The priority of list' })
	declare priority?

	@ApiProperty({ description: 'The owner is the user who created the list' })
	declare owner?

	@ApiProperty({ description: 'The assignees are the users have been assigned by the owner to help in this list' })
	declare assignees?

	@ApiProperty({ description: 'The children are lists and tasks inside this list' })
	declare children?

	@ApiProperty({
		example: 'http://muda.education/list/654172253b44c11359e9ee1b',
		description: 'The url of list',
		uniqueItems: true
	})
	declare url?

	@ApiProperty({ description: 'The tags of list' })
	declare tags?
	// #endregion

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: false, description: 'The public status of list' })
	public: boolean

	@Prop()
	@IsString()
	@ApiProperty({
		example: '654172253b44c11359e9ee1b',
		description: 'The parent is the space that have this list inside'
	})
	parent?: string

	@Prop()
	@IsNumber()
	@ApiProperty({ example: 1, description: 'The priority index value' })
	orderIndex?: number

	@Prop()
	@IsNumber()
	@ApiProperty({ example: 10, description: 'The total of (primary) tasks inside of this list' })
	taskCount?: number

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	@ApiProperty({ example: [], description: 'The list of users and their granted permissions' })
	grantedPermissions?: User[]

	@Prop({ type: [TaskSchema] })
	@ApiProperty({ description: 'The tasks of user' })
	tasks?: HydratedDocument<Task[]>
}

export const ListSchema = SchemaFactory.createForClass(List)
