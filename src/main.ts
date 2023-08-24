import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from '@fastify/helmet'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  const port = process.env.PORT || 3000

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Muda API')
    .setDescription('Muda API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
      }
    }
  })

  await app.listen(port)

  console.log(`Application is running on: ${await app.getUrl()}/api`)
}
bootstrap()
