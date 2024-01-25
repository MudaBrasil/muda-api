import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY, Role } from './role.decorator'
import { UserService } from '../users/user.service'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (!requiredRoles) return true

		const request = context.switchToHttp().getRequest()

		const response = await this.userService.findByAuthId(request.user.uid).then(user => {
			if (!user && requiredRoles.length == 1 && requiredRoles[0] == 'user') return true // Bypass to new user can create a new account using login and don't have User role yet

			// TODO: On logout save the authTime to verify next time if the token is old
			request.roleUserId = user?.id // TODO: Verificar se aqui é o melhor lugar para acessar o usuário pra salvar o UserId no request

			return user?.roles ? requiredRoles.some(role => user.roles.includes(role)) : false
		})

		return response
	}
}
