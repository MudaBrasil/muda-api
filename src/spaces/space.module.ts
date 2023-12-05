import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SpaceController } from './space.controller'
import { SpaceService } from './space.service'
import { Space, SpaceSchema } from './space.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Space.name, schema: SpaceSchema }])],
  controllers: [SpaceController],
  providers: [SpaceService]
})
export class SpaceModule {}
