import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDate, IsEmail, IsPhoneNumber, IsBoolean } from 'class-validator'

export type UserDocument = HydratedDocument<User>

@Schema({
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v
    }
  },
  timestamps: true,
  collection: 'users'
})
export class User {
  @Prop()
  @ApiProperty({
    example: 'fGEidHfM4uTqYhkNqV2CQEUrALi2',
    description: 'The authID from authentication source',
    uniqueItems: true
  })
  authID: string

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['google', 'email'],
    description: 'The authentication sources of user'
  })
  authSources: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The authentication devices of user logged in (Online)'
  })
  authDevicesLoggedIn: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: [''],
    description: 'The authentication devices of user logged out (Visited)'
  })
  authDevicesLoggedOut: string[]

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'The account status of user' })
  isActive: boolean

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'The deleted status of user' })
  isDeleted: boolean

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Lucrécio da Silva', description: 'The name of user' })
  name: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'lucrecio1911',
    description: 'The username of user to be linked using @ (Ex: @lucrecio1911)',
    uniqueItems: true
  })
  username: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Lucré', description: 'The display name of user' })
  alternateName: string

  @Prop()
  @IsDate()
  @ApiProperty({ example: '1911-12-20T14:34:50.085Z', description: 'The birth date of user' })
  birthDate: Date

  @Prop()
  @IsEmail()
  @ApiProperty({
    example: 'lucrecio@muda.education',
    description: 'The email of user'
  })
  email: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'http://muda.education/lucrecio',
    description: 'The url of user',
    uniqueItems: true
  })
  url: string

  @Prop()
  @IsPhoneNumber()
  @ApiProperty({ example: '+55 13 99999-9999', description: 'The phone number of user' })
  telephone: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'http://www.image.com/example-user.png',
    description: 'The profile photo of user'
  })
  profilePhoto: string

  @Prop()
  @IsString()
  @ApiProperty({
    example:
      'Eu me chamo Lucrécio e sou professor de filosofia. Gosto de Tai-Chi e de cultivar plantas.',
    description: 'The description of user'
  })
  description: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'male', description: 'The gender of user' })
  gender: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Brasil', description: 'The nationality of user' })
  nationality: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Professor', description: 'The job of user' })
  jobTitle: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Muda', description: 'The organization user works for' })
  worksFor: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'Teologia, Tai-Chi e Cultivo de plantas',
    description: 'The things user knows'
  })
  knowsAbout: string

  @Prop()
  @IsString({ each: true })
  @ApiProperty({ example: ['pt-BR', 'en-US'], description: 'The languages user knows' })
  knowsLanguage: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['rennan96', 'carol95'],
    description: 'The people that user is following'
  })
  following: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['rennan96', 'carol95'],
    description: 'The people that are following user'
  })
  followers: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['Muda', 'Cannan'],
    description: 'The user provides funding or sponsorship'
  })
  funding: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['Google', 'carol95'],
    description: 'A person or organization that supports user'
  })
  sponsor: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['Best International Teacher of 2023'],
    description: 'The awards of user'
  })
  award: string[]

  @Prop()
  @IsDate()
  @ApiProperty({ example: '1911-12-20T14:34:50.085Z', description: 'The last visit of user' })
  lastVisited: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
