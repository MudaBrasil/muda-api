import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import firebaseAdmin from 'firebase-admin'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor() {
		const credential =
			process.env.NODE_ENV === 'production'
				? firebaseAdmin.credential.applicationDefault()
				: firebaseAdmin.credential.cert(require(process.env.CERT))

		firebaseAdmin.initializeApp({ credential })
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)

		if (!token) throw new UnauthorizedException('Invalid token')

		await firebaseAdmin
			.auth()
			.verifyIdToken(token)
			.then(decodedToken => (request.user = decodedToken))
			.catch(error => {
				if (error?.errorInfo?.code) {
					const { code: firebaseCode, message } = error.errorInfo
					throw new UnauthorizedException({ error: 'Unauthorized', statusCode: 401, firebaseCode, message })
				}
				throw new UnauthorizedException()
			})

		return true
	}

	private extractTokenFromHeader(request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
