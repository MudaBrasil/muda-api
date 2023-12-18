import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from '@fastify/helmet'

const { version } = require('./../package.json')

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  )
  const apiPort = process.env.PORT || 3000
  const apiPrefix = process.env.API_PREFIX || 'api'
  const apiVersionPrefix = `${apiPrefix}/v${version.split('.')[0]}`

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle(`Muda API`)
    .addServer(apiVersionPrefix)
    .addBearerAuth()
    .setDescription('Muda API description')
    .setVersion(version)
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
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
        scriptSrc: ["'self'", "https: 'unsafe-inline'"]
      }
    }
  })

  const isProduction = process.env.NODE_ENV === 'production'
  const enabledOrigins = isProduction ? 'https://muda.education' : 'http://localhost:8080'

  app.enableCors({
    origin: enabledOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, Content-Type, Accept, Authorization, Cross-Origin-Resource-Policy',
    credentials: true
  })

  app.setGlobalPrefix(apiVersionPrefix, { exclude: ['healthcheck'] })

  app.getHttpAdapter().get('/healthcheck', (_req, res) => res.send('OK'))

  try {
    const server = await app.listen(apiPort, '0.0.0.0')
    server.on('error', e => console.error('Error: ', e))
  } catch (err) {
    console.log(`ERROR: IS NOT RUNNING ON ${apiPort}`)
    process.exit(1)
  }

  console.log(`Muda(${version}) is running on: ${await app.getUrl()}/${apiPrefix}`)
}
bootstrap()
