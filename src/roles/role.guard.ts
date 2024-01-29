import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from './role.decorator'
import { UserService } from '../users/user.service'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()])

		if (!requiredRoles) return true

		const request = context.switchToHttp().getRequest()
		const user = await this.userService.findByAuthId(request.user.uid)

		if (!user && request.user.uid && request.url.includes('auth/login/google')) return true // Has firebase account but don't have a mongo account yet. This is the first login

		request.role = { user: { id: user?.id, timeZone: user?.timeZone } }

		// TODO: On logout save the authTime to verify here next time if the token is old
		// TODO: Verificar se aqui é o melhor lugar para acessar o usuário pra salvar o UserId no request
		const hasAllRoles = requiredRoles.every(role => user?.roles?.includes(role))

		if (hasAllRoles) return true

		throw new UnauthorizedException(`User (roles: ${user.roles}) does not have the required roles: ${requiredRoles}.`)
	}
}
