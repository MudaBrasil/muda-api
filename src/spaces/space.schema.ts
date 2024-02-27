import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsBoolean, IsObject } from 'class-validator'
import { Document, HydratedDocument, Types } from 'mongoose'
import { List, ListSchema } from '../lists/list.schema'
import { Cell } from 'src/cells/cell.schema'
import { User } from 'src/users/user.schema'

@Schema({ collection: 'spaces', timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' } })
export class Space extends Cell {
	// #region Cell properties
	@ApiProperty({ example: 'Minha saúde', description: 'The space title' })
	declare name

	@ApiProperty({ description: 'The active status of space' })
	declare active

	@ApiProperty({ description: 'The archived status of space' })
	declare archived

	@ApiProperty({ description: 'The deleted status of space' })
	declare deleted

	@ApiProperty({ example: 'Espaço criado para eu evoluir minha saúde', description: 'The description of space' })
	declare description?

	@ApiProperty({ description: 'The status of space' })
	declare status?

	@ApiProperty({ description: 'The priority of space' })
	declare priority?

	@ApiProperty({ description: 'The owner is the user who created the space' })
	declare owner?

	@ApiProperty({ description: 'The assignees are the users have been assigned by the owner to help in this space' })
	declare assignees?

	@ApiProperty({ description: 'The children are lists and tasks inside this space' })
	declare children?

	@ApiProperty({
		example: 'http://muda.education/space/654172253b44c11359e9ee1b',
		description: 'The url of space',
		uniqueItems: true
	})
	declare url?

	@ApiProperty({ description: 'The tags of space' })
	declare tags?
	// #endregion

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: false, description: 'The public status of list' })
	public: boolean

	@Prop()
	@IsString()
	@ApiProperty({ example: 'https://muda.education/image/space01.png', description: 'The avatar image of space' })
	avatar?: string

	@Prop()
	@IsString()
	@ApiProperty({ example: '#red', description: 'The color of space' })
	color?: string

	@Prop()
	@IsString()
	@ApiProperty({
		example: 'Não aceitamos pessoas que repreendem pessoas na frente de outras',
		description: 'The terms to be accepted by users to be a member'
	})
	terms?: string

	@Prop()
	@IsString({ each: true })
	@ApiProperty({ example: ['First rule: be lovely'], description: 'The rules of space' })
	rules?: string[]

	@Prop({ type: Types.ObjectId, ref: 'User' })
	@ApiProperty({ example: ['654172253b44c11359e9ee1b'], description: 'The list of users and their type of membership' })
	members?: User[]

	@Prop({ type: [ListSchema] })
	@ApiProperty({ example: [], description: 'The lists of user' })
	lists?: HydratedDocument<List[]>
}

export const SpaceSchema = SchemaFactory.createForClass(Space)
