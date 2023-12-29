import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import firebaseAdmin from 'firebase-admin'

const credential =
  process.env.NODE_ENV === 'production'
    ? firebaseAdmin.credential.applicationDefault()
    : firebaseAdmin.credential.cert(require('../../firebaseServiceAccount.json'))

const firebase = firebaseAdmin.initializeApp({ credential })

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
