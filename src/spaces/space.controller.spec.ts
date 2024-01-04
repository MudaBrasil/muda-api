import { Test, TestingModule } from '@nestjs/testing'
import { SpaceController } from './space.controller'
import { SpaceService } from './space.service'

describe('SpacesController', () => {
	let spacesController: SpaceController

	beforeEach(async () => {
		const spaces: TestingModule = await Test.createTestingModule({
			controllers: [SpaceController],
			providers: [SpaceService]
		}).compile()

		spacesController = spaces.get<SpaceController>(SpaceController)
	})

	describe('root', () => {
		it('should create a spaces', () => {
			expect(spacesController.create({ name: 'test' })).toBe('This action adds a new spaces')
		})
	})
})
