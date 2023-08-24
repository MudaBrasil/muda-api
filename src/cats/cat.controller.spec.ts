import { Test, TestingModule } from '@nestjs/testing'
import { CatController } from './cat.controller'
import { CatService } from './cat.service'

describe('UserController', () => {
  let catController: CatController

  beforeEach(async () => {
    const cat: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [CatService]
    }).compile()

    catController = cat.get<CatController>(CatController)
  })

  describe('root', () => {
    it('should create a Cat', () => {
      expect(catController.create({ name: 'test', age: 20, breed: 'kitest' })).toBe(
        'This action adds a new Cat'
      )
    })
  })
})
