import { Controller, HttpCode, HttpStatus, Post, Request, Response, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Roles, Role } from '../roles/role.decorator'

@ApiBearerAuth()
@Roles(Role.User)
@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login/google')
	@ApiResponse({ status: 200, description: 'The record has been successfully validated.' })
	async googleLogin(@Request() request, @Response() response) {
		return request.roleUserId
			? response.status(HttpStatus.OK).send(await this.authService.googleLogin(request.roleUserId))
			: response.status(HttpStatus.CREATED).send(await this.authService.googleCreate(request.user))
	}

	@HttpCode(HttpStatus.OK)
	@Post('logout/google')
	async googleLogout(@Request() request) {
		if (!request.roleUserId) throw new UnauthorizedException('No user found from google')

		this.authService.googleLogout(request.roleUserId)
		return true
	}
}
