import { Inject, Injectable } from '@nestjs/common'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsBoolean } from 'class-validator'
import { Document, Types } from 'mongoose'
import { User } from 'src/users/user.schema'

@Schema({ collection: 'tags', timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' } })
export class Tag extends Document {
	@Prop()
	@IsString()
	@ApiProperty({ example: 'Vamos Mudar O Mundo', description: 'The tag title' })
	name: string

	@Prop()
	@IsString()
	@ApiProperty({ example: 'VamosMudarOMundo', description: 'The tag title without spaces' })
	label: string

	@Prop()
	@IsString()
	@ApiProperty({
		example: 'vamosmudaromundo',
		description: 'The tag title without spaces, accents and transformed to lowercase'
	})
	value: string

	@Prop()
	@IsNumber()
	@ApiProperty({ required: false, example: 1, description: 'The priority index value' })
	orderIndex?: number

	@Prop()
	@IsNumber()
	@ApiProperty({ required: false, example: 10, description: 'The number of times this tag has been used' })
	timesCalled?: number

	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'Tag criada para cativar pessoas a mudarem o mundo',
		description: 'The description of tag'
	})
	description?: string

	@Prop({ type: () => Types.ObjectId, ref: 'User' })
	@ApiProperty({
		required: false,
		example: '654172253b44c11359e9ee1b',
		description: 'The owner is the user who created the tag'
	})
	owner?: () => User
}

export const TagSchema = SchemaFactory.createForClass(Tag)
