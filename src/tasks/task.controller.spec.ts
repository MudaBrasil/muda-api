import { Test, TestingModule } from '@nestjs/testing'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'

describe('TasksController', () => {
  let tasksController: TaskController

  beforeEach(async () => {
    const tasks: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService]
    }).compile()

    tasksController = tasks.get<TaskController>(TaskController)
  })

  describe('root', () => {
    it('should create a tasks', () => {
      expect(tasksController.create({ name: 'test' })).toBe('This action adds a new tasks')
    })
  })
})
