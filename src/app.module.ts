import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CatModule } from './cats/cat.module'
import { UserModule } from './users/user.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    CatModule,
    UserModule
  ]
})
export class AppModule {}
