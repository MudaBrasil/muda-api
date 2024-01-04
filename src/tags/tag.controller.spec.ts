import { Test, TestingModule } from '@nestjs/testing'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'

describe('TagController', () => {
	let tagController: TagController

	beforeEach(async () => {
		const tag: TestingModule = await Test.createTestingModule({
			controllers: [TagController],
			providers: [TagService]
		}).compile()

		tagController = tag.get<TagController>(TagController)
	})

	describe('root', () => {
		it('should create a tag', () => {
			expect(tagController.create({ name: 'test' })).toBe('This action adds a new tag')
		})
	})
})
