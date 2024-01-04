import { Test, TestingModule } from '@nestjs/testing'
import { ListController } from './list.controller'
import { ListService } from './list.service'

describe('ListsController', () => {
	let listsController: ListController

	beforeEach(async () => {
		const lists: TestingModule = await Test.createTestingModule({
			controllers: [ListController],
			providers: [ListService]
		}).compile()
		listsController = lists.get<ListController>(ListController)
	})

	describe('root', () => {
		it('should create a lists', () => {
			expect(listsController.create({ name: 'test' })).toBe('This action adds a new list')
		})
	})
})
