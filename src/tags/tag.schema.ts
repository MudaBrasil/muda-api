import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

@Schema({
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v
    }
  },
  collection: 'tags'
})
export class Tag {
  @Prop()
  @IsString()
  @ApiProperty({ example: 'Vamos Mudar O Mundo', description: 'The tag title' })
  name: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'VamosMudarOMundo', description: 'The tag title without spaces' })
  shortName: string

  @Prop()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'The priority index value' })
  orderIndex: number

  @Prop()
  @IsNumber()
  @ApiProperty({ example: 10, description: 'The number of times this tag has been used' })
  timesCalled: number

  @Prop()
  @IsString()
  @ApiProperty({
    example: '654172253b44c11359e9ee1b',
    description: 'The owner is the person who created the tag'
  })
  owner: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'Tag criada para cativar pessoas a mudarem o mundo',
    description: 'The description of tag'
  })
  description: string
}

export const TagSchema = SchemaFactory.createForClass(Tag)
