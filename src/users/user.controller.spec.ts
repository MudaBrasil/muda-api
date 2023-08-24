import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
  let userController: UserController

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile()

    userController = user.get<UserController>(UserController)
  })

  describe('root', () => {
    it('should create a user', () => {
      expect(userController.create({ name: 'test', age: 20 })).toBe('This action adds a new user')
    })
  })
})
