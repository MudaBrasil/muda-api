import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty()
  name: string

  @Prop()
  @ApiProperty()
  age: number

  @Prop()
  @ApiProperty()
  firstName: string

  @Prop()
  @ApiProperty()
  middleName: string

  @Prop()
  @ApiProperty()
  lastName: string

  @Prop()
  @ApiProperty()
  email: string

  @Prop()
  @ApiProperty()
  phoneNumber: string
}

export const UserSchema = SchemaFactory.createForClass(User).set('timestamps', true)
