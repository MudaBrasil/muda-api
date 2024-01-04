import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './users/user.module'
import { TagModule } from './tags/tag.module'
import { TaskModule } from './tasks/task.module'
import { ListModule } from './lists/list.module'
import { SpaceModule } from './spaces/space.module'
import { AuthModule } from './auth/auth.module'
import { RoleModule } from './roles/role.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('DB_URI')
			}),
			inject: [ConfigService]
		}),
		AuthModule,
		RoleModule,
		UserModule,
		TaskModule,
		ListModule,
		SpaceModule,
		TagModule
	]
})
export class AppModule {}
