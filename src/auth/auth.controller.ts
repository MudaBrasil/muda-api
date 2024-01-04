import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	Response,
	UseGuards
} from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard)
	@Post('login/google')
	@ApiResponse({ status: 200, description: 'The record has been successfully validated.' })
	async googleLogin(@Request() request, @Response() response) {
		const responseUser = await this.authService.googleLogin(request.user)
		return response
			.status(responseUser._newUser ? HttpStatus.CREATED : HttpStatus.OK)
			.send(responseUser)
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Post('logout/google')
	googleLogout(@Request() request) {
		return this.authService.googleLogout(request.user)
	}
}
