import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
const firebaseServiceAccountKey = require('../../firebaseServiceAccount.json')
import firebaseAdmin from 'firebase-admin'
const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccountKey)
})

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Invalid token')
    }
    try {
      await firebase
        .auth()
        .verifyIdToken(token)
        .then(decodedToken => {
          if (decodedToken.aud !== 'muda-education') {
            throw new UnauthorizedException('Invalid token: google aud is not from muda')
          }

          request.user = decodedToken
          // TODO: Criar Guard ou midleware para verificar e inserir a role dele em um customToken
        })
        .catch(error => {
          throw new UnauthorizedException(error)
        })
    } catch (error) {
      throw new UnauthorizedException(error)
    }
    return true
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
