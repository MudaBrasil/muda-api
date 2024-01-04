import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsBoolean, IsObject } from 'class-validator'
import { Document } from 'mongoose'

class Cell extends Document {
	@Prop()
	@IsString()
	@ApiProperty({ example: 'Compras', description: 'The list title' })
	name: string

	@Prop()
	@IsString()
	@ApiProperty({
		example: '654172253b44c11359e9ee1b',
		description: 'The owner is the user who created the list'
	})
	owner: string

	@Prop()
	@IsString()
	@ApiProperty({ example: 'blocked', description: 'The status of the list' })
	status: string

	@Prop()
	@IsString()
	@ApiProperty({ example: 'high', description: 'The priority of the list' })
	priority: string

	@Prop()
	@IsString({ each: true })
	@ApiProperty({
		example: ['654172253b44c11359e9ee1b'],
		description: 'The children could be lists and tasks'
	})
	children: string[]

	@Prop()
	@IsString({ each: true })
	@ApiProperty({
		example: ['654172253b44c11359e9ee1b'],
		description: 'The assignees are the users have been assigned to do the list'
	})
	assignees: string[]

	@Prop()
	@IsString({ each: true })
	@ApiProperty({ example: ['food', 'clean'], description: 'The tags of list' })
	tags: string[]

	@Prop()
	@IsString()
	@ApiProperty({
		example: 'http://muda.education/list/654172253b44c11359e9ee1b',
		description: 'The url of list',
		uniqueItems: true
	})
	url: string

	@Prop()
	@IsString()
	@ApiProperty({
		example: 'Lista criada para comprar as coisas que faltam',
		description: 'The description of list'
	})
	description: string

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: true, description: 'The active status of list' })
	active: boolean

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: false, description: 'The archived status of list' })
	archived: boolean

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: false, description: 'The deleted status of list' })
	deleted: boolean
}

@Schema({
	toJSON: {
		transform: function (doc, ret) {
			delete ret.__v
		}
	},
	timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' },
	collection: 'lists'
})
export class List extends Cell {
	@Prop()
	@IsString()
	@ApiProperty({
		example: '654172253b44c11359e9ee1b',
		description: 'The parent is the list or space that have this list inside'
	})
	parent: string

	@Prop()
	@IsNumber()
	@ApiProperty({ example: 1, description: 'The priority index value' })
	orderIndex: number

	@Prop()
	@IsNumber()
	@ApiProperty({ example: 10, description: 'The total of (primary) tasks inside of this list' })
	taskCount: number

	@Prop()
	@IsBoolean()
	@ApiProperty({
		example: false,
		description: 'The private status of list'
	})
	private: boolean

	@Prop()
	@IsObject({ each: true })
	@ApiProperty({
		example: [{}],
		description: 'The list of users and their granted permissions'
	})
	grantedPermissions: object[]
}

export const ListSchema = SchemaFactory.createForClass(List)
