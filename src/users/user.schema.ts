import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDate, IsEmail, IsPhoneNumber } from 'class-validator'

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
    description: 'The authUID from Google Authentication',
    uniqueItems: true
  })
  authUID: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Lucrécio da Silva', description: 'The name of the Person' })
  name: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'lucrecio1911',
    description: 'The username of Person to be linked using @lucrecio1911',
    uniqueItems: true
  })
  username: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Lucré', description: 'The show name of the Person' })
  alternateName: string

  @Prop()
  @IsDate()
  @ApiProperty({ example: '1911-12-20T14:34:50.085Z', description: 'The birth date of the Person' })
  birthDate: Date

  @Prop()
  @IsEmail()
  @ApiProperty({
    example: 'lucrecio@muda.education',
    description: 'The email of the Person',
    uniqueItems: true
  })
  email: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'http://muda.education/lucrecio',
    description: 'The url of the Person',
    uniqueItems: true
  })
  url: string

  @Prop()
  @IsPhoneNumber()
  @ApiProperty({ example: '+55 13 99999-9999', description: 'The phone number of the Person' })
  telephone: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'http://www.image.com/example-user.png',
    description: 'The profile photo of the Person'
  })
  profilePhoto: string

  @Prop()
  @IsString()
  @ApiProperty({
    example:
      'Eu me chamo Lucrécio e sou professor de filosofia. Gosto de Tai-Chi e de cultivar plantas.',
    description: 'The description of the Person'
  })
  description: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'male', description: 'The gender of the Person' })
  gender: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Brasil', description: 'The nationality of the Person' })
  nationality: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Professor', description: 'The job title of the Person' })
  jobTitle: string

  @Prop()
  @IsString()
  @ApiProperty({ example: 'Muda', description: 'The organization the Person works for' })
  worksFor: string

  @Prop()
  @IsString()
  @ApiProperty({
    example: 'Teologia, Tai-Chi e Cultivo de plantas',
    description: 'The things the Person knows'
  })
  knowsAbout: string

  @Prop()
  @IsString({ each: true })
  @ApiProperty({ example: ['pt-BR', 'en-US'], description: 'The languages the Person knows' })
  knowsLanguage: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['rennan96', 'carol95'],
    description: 'The people that Person follows'
  })
  follows: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['rennan96', 'carol95'],
    description: 'The Person followers'
  })
  followers: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['Muda', 'Cannan'],
    description: 'The thing Person provide funding or sponsorship'
  })
  funding: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['Google', 'carol95'],
    description: 'A person or organization that supports the Person'
  })
  sponsor: string[]

  @Prop()
  @IsString({ each: true })
  @ApiProperty({
    example: ['Best International Teacher of 2023'],
    description: 'The awards of the Person'
  })
  award: string[]

  @Prop()
  @IsString()
  @ApiProperty({
    example: ['google'],
    description: 'The authentication method of+ the Person'
  })
  source: string

  @Prop()
  @IsDate()
  @ApiProperty({ example: '1911-12-20T14:34:50.085Z', description: 'The last visit of the Person' })
  lastVisited: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
