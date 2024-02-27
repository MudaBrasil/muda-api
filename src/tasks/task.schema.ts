import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsBoolean, IsDate, IsObject, IsEnum } from 'class-validator'
import { Types } from 'mongoose'
import { Cell, CellReference } from 'src/cells/cell.schema'
import { List } from 'src/lists/list.schema'
import { Status } from 'src/enums/status.enum'

const taskReferenceExample = {
	_id: '654172253b44c11359e9ee1b',
	name: 'Task A',
	active: true,
	status: 'running'
} as TaskReference

@Schema({ timestamps: false })
export class TaskReference extends CellReference {
	@Prop({ type: String, enum: Status })
	@IsEnum(Status)
	@ApiProperty({ description: 'The status of task' })
	status?: Status
}

export const TaskReferenceSchema = SchemaFactory.createForClass(TaskReference)

@Schema({ collection: 'tasks', timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' } })
export class Task extends Cell {
	// #region Cell properties
	@ApiProperty({ example: 'Task A', description: 'The name of task' })
	declare name

	@ApiProperty({ description: 'The active status of task' })
	declare active

	@ApiProperty({ description: 'The archived status of task' })
	declare archived

	@ApiProperty({ description: 'The deleted status of task' })
	declare deleted

	@ApiProperty({ example: 'Task criada para cativar eu a correr mais.', description: 'The description of task' })
	declare description?

	@ApiProperty({ description: 'The status of task' })
	declare status? // TODO: Criar Enum para status

	@ApiProperty({ description: 'The priority of task' })
	declare priority? // TODO: Criar Enum para priority

	@Prop({ type: [TaskReferenceSchema], ref: 'TaskReference' })
	@ApiProperty({ example: [taskReferenceExample], description: 'The children are subtasks of the task' })
	declare children: TaskReference[]

	@ApiProperty({ description: 'The owner is the user who created the task or has been granted the ownership' })
	declare owner?

	@ApiProperty({ description: 'The assignees are the users have been assigned to do the task' })
	declare assignees?

	@ApiProperty({ example: 'http://muda.education/task/A', description: 'The url of task', uniqueItems: true })
	declare url?

	@ApiProperty({ description: 'The tags of task' })
	declare tags?
	// #endregion

	// TODO: Criar Subtasks ou checklists
	// TODO: Colocar valor default

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: true, description: 'The public status of task' })
	public: boolean

	@Prop()
	@IsNumber()
	@ApiProperty({ required: false, example: 1, description: 'The priority index value' })
	orderIndex?: number

	@Prop()
	@IsDate()
	@ApiProperty({ required: false, example: '1911-12-20T14:34:50.085Z', description: 'The date the task was completed' })
	dateDone?: Date

	@Prop()
	@IsDate()
	@ApiProperty({
		required: false,
		example: '1911-12-20T14:34:50.085Z',
		description: 'The date the task was completed and moved to a type of archived status to be hidden from actual view'
	})
	dateClosed?: Date

	@Prop()
	@IsDate()
	@ApiProperty({
		required: false,
		example: '1911-12-20T14:34:50.085Z',
		description: 'The date the task is scheduled to start'
	})
	startDate?: Date

	@Prop()
	@IsBoolean()
	@ApiProperty({
		required: false,
		example: false,
		description: 'The started status of task, if the task has been started'
	})
	started?: boolean

	@Prop()
	@IsDate()
	@ApiProperty({
		required: false,
		example: '1911-12-20T14:34:50.085Z',
		description: 'The finally date the task is scheduled to be done or will start to be set as late'
	})
	dueDate?: Date

	@Prop()
	@IsBoolean()
	@ApiProperty({
		required: false,
		example: false,
		description: 'The late status of task, if the task is late to be done'
	})
	lated?: boolean

	@Prop()
	@IsNumber()
	@ApiProperty({ required: false, example: 1, description: 'The time estimate in minutes to do the task' })
	timeEstimate?: number

	@Prop()
	@IsNumber()
	@ApiProperty({ required: false, example: 1, description: 'The time spent in minutes to do the task' })
	timeSpent?: number

	@Prop()
	@IsObject({ each: true })
	@ApiProperty({
		required: false,
		example: [],
		description: 'The time tracked in minutes grouped by pomodoro cycle or other type of cycle'
	})
	timeTracked?: object[] // Criar tipagem do time tracked

	@Prop({ type: Types.ObjectId, ref: 'List' })
	@ApiProperty({
		required: false,
		example: '654172253b44c11359e9ee1b',
		description: 'The parent is the task, list or space that have this task inside'
	})
	parent?: { type: Types.ObjectId; ref: 'List' }
}

export const TaskSchema = SchemaFactory.createForClass(Task)
