import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsBoolean, IsEnum, isArray } from 'class-validator'
import { Document, HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { Priority } from 'src/enums/priority.enum'
import { Status } from 'src/enums/status.enum'
import { Tag, TagSchema } from 'src/tags/tag.schema'
import { User } from 'src/users/user.schema'

@Schema({ timestamps: false })
export class CellReference extends Document {
	@Prop()
	@IsString()
	@ApiProperty({ example: 'Célula A', description: 'The name status of cell' })
	name: string

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: true, description: 'The active status of cell' })
	active: boolean
}
@Schema({ timestamps: false })
export class UserReference extends CellReference {
	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'lucrecio1911',
		description: 'The username of user to be linked using @ (Ex: @lucrecio1911)'
	})
	username?: string

	@Prop()
	@IsString()
	@ApiProperty({ required: false, example: 'Lucré', description: 'The display name of user' })
	alias?: string

	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'http://www.image.com/required:false,example-user.png',
		description: 'The profile photo of user'
	})
	profilePhoto?: string
}

export const CellReferenceSchema = SchemaFactory.createForClass(CellReference)
export const UserReferenceSchema = SchemaFactory.createForClass(UserReference)

@Schema({ timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' } })
export class Cell extends CellReference {
	@ApiProperty({ example: 'Célula A', description: 'Cell title' })
	declare name

	@ApiProperty({ example: true, description: 'The active status of cell' })
	declare active

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: false, description: 'The archived status of cell' })
	archived: boolean

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: false, description: 'The deleted status of cell' })
	deleted: boolean

	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'Célula criada para descobrir o sentido da vida',
		description: 'The description of cell'
	})
	description?: string

	@Prop({ type: String, enum: Status })
	@IsEnum(Status)
	@ApiProperty({ required: false, example: 'blocked', description: 'The status of cell' })
	status?: Status

	@Prop({ type: String, enum: Priority })
	@IsEnum(Priority)
	@ApiProperty({ required: false, example: 'high', description: 'The priority of cell' })
	priority?: Priority

	@Prop({ type: Types.ObjectId, ref: 'User' })
	@ApiProperty({
		required: false,
		example: '654172253b44c11359e9ee1b',
		description: 'The owner or parent is the user who created the cell or has been granted the ownership'
	})
	owner?: { type: Types.ObjectId; ref: 'User' }

	@Prop({ type: [Types.ObjectId], ref: 'User' })
	@ApiProperty({
		required: false,
		example: ['654172253b44c11359e9ee1b', '754172253b44c11359e9ee1c'],
		description: 'The assignees are the users have been assigned to work on cell',
		isArray: true
	})
	assignees?: [{ type: Types.ObjectId; ref: 'User' }]

	@Prop({ type: [CellReferenceSchema], ref: 'CellReference' })
	@ApiProperty({
		required: false,
		example: [{ _id: '654172253b44c11359e9ee1b', name: 'Célula X', active: true }],
		description: 'The children of cell'
	})
	children?: CellReference[]

	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'http://muda.education/cell/654172253b44c11359e9ee1b',
		description: 'The url of cell',
		uniqueItems: true
	})
	url?: string

	@Prop({ type: [TagSchema], ref: 'tag', refPath: 'tags' }) // TODO: Verificar um jeito de salvar tags em um único documento e pegar a referencia pra ca
	@ApiProperty({ required: false, example: [], description: 'The tags of cell' })
	tags?: Tag[]
}

export const CellSchema = SchemaFactory.createForClass(Cell)
