import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common'
import { isValidObjectId } from 'mongoose'

@Injectable()
export class ValidateObjectId implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (!isValidObjectId(value)) throw new BadRequestException(`Invalid ${metadata.data}`)
		return value
	}
}
