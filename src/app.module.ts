import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CatModule } from './cats/cat.module'
import { UserModule } from './users/user.module'

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
    CatModule,
    UserModule
  ]
})
export class AppModule {}
