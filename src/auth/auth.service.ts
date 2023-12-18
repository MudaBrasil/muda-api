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
      const newUser = await this.userService.create({
        active: false, // TODO: change to active when the Muda app is ready to use
        authId: requestUser.uid,
        email: requestUser.email,
        name: requestUser.name,
        mentor: '657a6cb64a462a5bbe45b197',
        invitingUser: '657a6cb64a462a5bbe45b197',
        priority: 'high',
        profilePhoto: requestUser.picture,
        status: 'offline',
        tags: ['pioneer'],
        authSources: [requestUser.firebase.sign_in_provider || 'google.com'],
        lastVisited: new Date(),
        public: false,
        username: requestUser.name.split(' ').join('') || requestUser.email.split('@')[0] || '',
        alias: requestUser.name.split(' ')[0] || ''
      })
      return { ...newUser, _newUser: true }
    }
    return user
  }

  async googleLogout(requestUser): Promise<any> {
    if (!requestUser || !requestUser.uid) {
      throw new UnauthorizedException('No user found from google')
    }

    const user = await this.userService.findByAuthId(requestUser.uid)

    if (user) {
      this.userService.update(user._id, { lastVisited: new Date() })
    }
    return user
  }
}
