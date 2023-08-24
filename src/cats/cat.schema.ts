import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export type CatDocument = HydratedDocument<Cat>

@Schema()
export class Cat {
  @Prop()
  @IsString()
  @ApiProperty({ example: 'Kitty', description: 'The name of the Cat' })
  name: string

  @Prop()
  @IsInt()
  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  age: number

  @Prop()
  @IsString()
  @ApiProperty({ example: 'KitCat', description: 'The breed of the Cat' })
  breed: string
}

export const CatSchema = SchemaFactory.createForClass(Cat).set('timestamps', true)
