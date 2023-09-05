import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from '@fastify/helmet'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  )
  const apiPort = process.env.PORT || 3000
  const apiPrefix = process.env.API_PREFIX || 'api'
  const apiPathVersion = process.env.API_PATH_VERSION || '2'
  const apiMinorVersion = process.env.API_MINOR_VERSION || '0'
  const apiMajorVersion = process.env.API_MAJOR_VERSION || 'v1'
  const apiVersionPrefix = `${apiPrefix}/${apiMajorVersion}`
  const apiFullVersion =
    process.env.API_FULL_VERSION || `${apiMajorVersion}.${apiMinorVersion}.${apiPathVersion}`

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle(`Muda API - ${apiFullVersion}`)
    .addServer(apiVersionPrefix)
    .setDescription('Muda API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(apiPrefix, app, document, {
    swaggerOptions: {
      showRequestDuration: true
    }
  })

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

  // @Body parser

  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   allowedHeaders: 'Content-Type, Accept, Authorization'
  // })

  // app.getHttpAdapter().get('/', (_req, res) => {
  //   res.redirect(apiPrefix)
  // })

  app.setGlobalPrefix(apiVersionPrefix, { exclude: ['healthcheck'] })

  app.getHttpAdapter().get('/healthcheck', (_req, res) => {
    res.send('OK')
  })

  // Run the server!
  try {
    const server = await app.listen(apiPort, '0.0.0.0')
    server.on('error', e => console.error('Error', e))
  } catch (err) {
    console.log(`ERROR: IS NOT RUNNING ON ${apiPort}`)
    process.exit(1)
  }

  console.log(`Application is running on: ${await app.getUrl()}/${apiPrefix}`)
}
bootstrap()
