import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDate, IsEmail, IsPhoneNumber, IsBoolean } from 'class-validator'
import { Document } from 'mongoose'

class Cell extends Document {
  @Prop()
  @IsString()
  @ApiProperty({ example: 'Lucrécio da Silva', description: 'The name of user' })
  name: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'blocked', description: 'The status of user' })
  status: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'high', description: 'The priority of user' })
  priority: string

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The assignees are the users have been assigned by the owner to help this user too'
  })
  assignees: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({ example: ['football', 'kids'], description: 'The tags of user' })
  tags: string[]

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'http://muda.education/user/lucrecio',
    description: 'The url of user',
    uniqueItems: true
  })
  url: string

  @Prop()
  @IsString()
  @ApiProperty({
    example:
      'Eu me chamo Lucrécio e sou professor de filosofia. Gosto de Tai-Chi e de cultivar plantas.',
    description: 'The description of user'
  })
  description: string

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'The active status of user' })
  active: boolean

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'The archived status of user' })
  archived: boolean

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'The deleted status of user' })
  deleted: boolean
}

@Schema({
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v
    }
  },
  timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' },
  collection: 'users'
})
export class User extends Cell {
  @Prop()
  @ApiProperty({
    example: 'fGEidHfM4uTqYhkNqV2CQEUrALi2',
    description: 'The id from authentication provider',
    uniqueItems: true
  })
  authId: string

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
  devicesLoggedIn: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: [''],
    description: 'The authentication devices of user logged out (Visited)'
  })
  devicesLoggedOut: string[]

  @Prop()
  @IsDate()
  @ApiProperty({ example: '1911-12-20T14:34:50.085Z', description: 'The last visit of user' })
  lastVisited: Date

  @Prop()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'Defines if the user prefer stay in private mode' })
  public: boolean

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
  alias: string

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
    example: 'http://lucrecio.com.br',
    description: 'The personal website of user',
    uniqueItems: true
  })
  website: string

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
    example: ['rennan96', 'carol95'],
    description: 'The closest friends of user that will support him/her'
  })
  allies: string[]

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
  sponsors: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['Best International Teacher of 2023'],
    description: 'The awards of user'
  })
  awards: string[]

  @Prop()
  @IsString()
  @ApiProperty({
    example: '654172253b44c11359e9ee1b',
    description: 'The mentor is the person who is helping the user'
  })
  mentor: string

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The mentees are users that are being helped by this user'
  })
  mentees: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The users that user is helping'
  })
  helping: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The users that user is helping'
  })
  helpedBy: string[]

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'MUDA96',
    description: 'The invite code of user',
    uniqueItems: true
  })
  inviteCode: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: '654172253b44c11359e9ee1b',
    description: 'The user that invited this user'
  })
  invitingUser: string

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The users that user invited'
  })
  invitedUsers: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The users that send loves to the user'
  })
  loves: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['654172253b44c11359e9ee1b'],
    description: 'The things that user loved'
  })
  loved: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
