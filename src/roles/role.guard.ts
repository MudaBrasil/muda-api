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
    if (!requiredRoles) {
      return true
    }
    const request = context.switchToHttp().getRequest()

    return this.userService.findByAuthId(request.user.uid).then(user => {
      return user?.roles ? requiredRoles.some(role => user.roles.includes(role)) : true
    })
  }
}
