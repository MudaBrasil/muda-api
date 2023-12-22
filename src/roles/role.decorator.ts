import { SetMetadata } from '@nestjs/common'
import { Role } from './role.enum'

const ROLES_KEY = 'roles'
const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)

export { Role, Roles, ROLES_KEY }
