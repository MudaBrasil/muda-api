import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsBoolean, IsDate, IsObject } from 'class-validator'

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
    example: 'http://muda.education/task/654172253b44c11359e9ee1b',
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
  @ApiProperty({ example: true, description: 'The active status of task' })
  active: boolean

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'The archived status of task' })
  archived: boolean

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'The deleted status of task' })
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
export class Task extends Cell {
  @Prop()
  @IsString()
  @ApiProperty({
    example: '654172253b44c11359e9ee1b',
    description: 'The parent is the task, list or space that have this task inside'
  })
  parent: string

  @Prop()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'The priority index value' })
  orderIndex: number

  @Prop()
  @IsDate()
  @ApiProperty({
    example: '1911-12-20T14:34:50.085Z',
    description: 'The date the task was completed'
  })
  dateDone: Date

  @Prop()
  @IsDate()
  @ApiProperty({
    example: '1911-12-20T14:34:50.085Z',
    description:
      'The date the task was completed and moved to a type of archived status to be hidden from actual view'
  })
  dateClosed: Date

  @Prop()
  @IsDate()
  @ApiProperty({
    example: '1911-12-20T14:34:50.085Z',
    description: 'The date the task is scheduled to start'
  })
  startDate: Date

  @Prop()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'The started status of task, if the task has been started'
  })
  started: boolean

  @Prop()
  @IsDate()
  @ApiProperty({
    example: '1911-12-20T14:34:50.085Z',
    description: 'The finally date the task is scheduled to be done or will start to be set as late'
  })
  dueDate: Date

  @Prop()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'The late status of task, if the task is late to be done'
  })
  lated: boolean

  @Prop()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The time estimate in minutes to do the task'
  })
  timeEstimate: number

  @Prop()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The time spent in minutes to do the task'
  })
  timeSpent: number

  @Prop()
  @IsObject({ each: true })
  @ApiProperty({
    example: [{}],
    description: 'The time tracked in minutes grouped by pomodoro cycle or other type of cycle'
  })
  timeTracked: object[]
}

export const TaskSchema = SchemaFactory.createForClass(Task)
