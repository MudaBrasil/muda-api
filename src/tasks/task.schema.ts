import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsBoolean } from 'class-validator'

class Cell {
  @Prop()
  @IsString()
  @ApiProperty({ example: 'Correr 3Km', description: 'The task title' })
  name: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: '654172253b44c11359e9ee1b',
    description: 'The owner is the user who created the task'
  })
  owner: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'blocked', description: 'The status of the task' })
  status: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'high', description: 'The priority of the task' })
  priority: string

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The children are subtasks of the task'
  })
  children: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The assignees are the users have been assigned to do the task'
  })
  assignees: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({ example: ['football', 'kids'], description: 'The tags of task' })
  tags: string[]

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'http://muda.education/user/lucrecio',
    description: 'The url of task',
    uniqueItems: true
  })
  url: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'Task criada para cativar eu a correr mais',
    description: 'The description of task'
  })
  description: string

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'The active status of user' })
  active: boolean

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'The archived status of user' })
  archived: boolean

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'The deleted status of user' })
  deleted: boolean
}


@Schema({
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v
    }
  },
  timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' },
  collection: 'tasks'
})
export class Task {
  @Prop()
  @IsString()
  @ApiProperty({ example: 'Vamos Mudar O Mundo', description: 'The task title' })
  name: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'VamosMudarOMundo', description: 'The task title without spaces' })
  shortName: string

  @Prop()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'The priority index value' })
  orderIndex: number

  @Prop()
  @IsNumber()
  @ApiProperty({ example: 10, description: 'The number of times this task has been used' })
  timesCalled: number

  @Prop()
  @IsString()
  @ApiProperty({
    example: '654172253b44c11359e9ee1b',
    description: 'The owner is the person who created the task'
  })
  owner: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'Task criada para cativar pessoas a mudarem o mundo',
    description: 'The description of task'
  })
  description: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)
