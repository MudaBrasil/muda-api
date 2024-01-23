import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../users/user.service'

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async googleLogin(requestUser): Promise<any> {
		if (!requestUser || !requestUser.uid) {
			throw new UnauthorizedException('No user found from google')
		}

		const user = await this.userService.findByAuthId(requestUser.uid)
		const IS_NEW_USER = !user

		if (IS_NEW_USER) {
			// TODO: create a event to send to me all users created and that need to be approved
			const newUser = await this.userService.create({
				active: false, // TODO: change to active when the Muda app is ready to use
				alias: requestUser.name.split(' ')[0] || '',
				authId: requestUser.uid,
				authSources: [requestUser.firebase.sign_in_provider || 'google.com'],
				email: requestUser.email,
				lastVisited: new Date(),
				name: requestUser.name,
				profilePhoto: requestUser.picture,
				status: 'created',
				username: requestUser.name.split(' ').join('') || requestUser.email.split('@')[0] || ''
				// roles: ['user'], // TODO: Enable again when the Muda app is ready to use
				// invitingUser: '657a6cb64a462a5bbe45b197',
				// mentor: '657a6cb64a462a5bbe45b197',
				// priority: 'high',
				// public: false,
				// tags: ['pioneer'],
			})
			return { ...newUser, _newUser: true }
		}
		return user
	}

	async googleLogout(requestUser): Promise<any> {
		if (!requestUser || !requestUser.uid) {
			throw new UnauthorizedException('No user found from google')
		}

		//TODO: remover essa consulta e atualizar direto
		const user = await this.userService.findByAuthId(requestUser.uid)

		if (user) {
			this.userService.update(user.id, { lastVisited: new Date() })
		}
		return user
	}
}
