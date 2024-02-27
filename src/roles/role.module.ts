import { Module } from '@nestjs/common'
import { RoleGuard } from './role.guard'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from '../users/user.module'

@Module({
	imports: [UserModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: RoleGuard
		}
	]
})
export class RoleModule {}
