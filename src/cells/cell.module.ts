import { Module } from '@nestjs/common'
import { Cell, CellReference, CellReferenceSchema, CellSchema, UserReference, UserReferenceSchema } from './cell.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Cell.name, schema: CellSchema }]),
		MongooseModule.forFeature([{ name: CellReference.name, schema: CellReferenceSchema }]),
		MongooseModule.forFeature([{ name: UserReference.name, schema: UserReferenceSchema }])
	]
})
export class CellModule {}
