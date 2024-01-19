import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsBoolean, IsObject } from 'class-validator'
import { Document, HydratedDocument } from 'mongoose'
import { List, ListSchema } from '../lists/list.schema'

class Cell extends Document {
	@Prop()
	@IsString()
	@ApiProperty({ example: 'Minha saúde', description: 'The space title' })
	name: string

	@Prop()
	@IsString()
	@ApiProperty({
		example: '654172253b44c11359e9ee1b',
		description: 'The owner is the user who created the space'
	})
	owner: string

	@Prop()
	@IsString()
	@ApiProperty({ example: 'blocked', description: 'The status of the space' })
	status: string

	@Prop()
	@IsString()
	@ApiProperty({ example: 'high', description: 'The priority of the space' })
	priority: string

	@Prop()
	@IsString({ each: true })
	@ApiProperty({
		example: ['654172253b44c11359e9ee1b'],
		description: 'The children are lists and tasks inside this space'
	})
	children: string[]

	@Prop()
	@IsString({ each: true })
	@ApiProperty({
		example: ['654172253b44c11359e9ee1b'],
		description: 'The assignees are the users have been assigned to help others users in the space'
	})
	assignees: string[]

	@Prop()
	@IsString({ each: true })
	@ApiProperty({ example: ['football', 'kids'], description: 'The tags of space' })
	tags: string[]

	@Prop()
	@IsString()
	@ApiProperty({
		example: 'http://muda.education/space/654172253b44c11359e9ee1b',
		description: 'The url of space',
		uniqueItems: true
	})
	url: string

	@Prop()
	@IsString()
	@ApiProperty({
		example: 'Espaço criado para eu evoluir minha saúde',
		description: 'The description of space'
	})
	description: string

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: true, description: 'The active status of space' })
	active: boolean

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: false, description: 'The archived status of space' })
	archived: boolean

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: false, description: 'The deleted status of space' })
	deleted: boolean
}

@Schema({
	// toJSON: { transform: function (doc, ret) { delete ret.__v } },
	timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' },
	collection: 'spaces',
	id: true
})
export class Space extends Cell {
	@Prop()
	@IsString()
	@ApiProperty({
		example: 'https://muda.education/image/space01.png',
		description: 'The avatar image of space'
	})
	avatar: string

	@Prop()
	@IsString()
	@ApiProperty({
		example: '#red',
		description: 'The color of space'
	})
	color: string

	@Prop()
	@IsString()
	@ApiProperty({
		example: 'Não aceitamos pessoas que repreendem pessoas na frente de outras',
		description: 'The terms to be accepted by users to be a member'
	})
	terms: string

	@Prop()
	@IsString({ each: true })
	@ApiProperty({
		example: ['First rule: be lovely'],
		description: 'The rules of space'
	})
	rules: string[]

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
		example: [],
		description: 'The list of users and their type of membership'
	})
	members: object[]

	@Prop({ type: [ListSchema] })
	@ApiProperty({ example: [], description: 'The lists of user' })
	lists: HydratedDocument<List[]>
}

export const SpaceSchema = SchemaFactory.createForClass(Space)
