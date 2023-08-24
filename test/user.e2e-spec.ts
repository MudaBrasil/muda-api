import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { UserModule } from '../src/users/user.module'

describe('UserController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200)
  })
})
