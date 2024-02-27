import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDate, IsEmail, IsPhoneNumber, IsBoolean, IsEnum, IsNumber } from 'class-validator'
import { HydratedDocument, Types } from 'mongoose'
import { SpaceSchema, Space } from '../spaces/space.schema'
import { Cell, CellReference, UserReferenceSchema } from 'src/cells/cell.schema'
import { Role } from '../roles/role.enum'

@Schema({ timestamps: false })
export class UserReference extends CellReference {
	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'lucrecio1911',
		description: 'The username of user to be linked using @ (Ex: @lucrecio1911)',
		uniqueItems: true
	})
	username?: string

	@Prop()
	@IsString()
	@ApiProperty({ required: false, example: 'Lucré', description: 'The display name of user' })
	alias?: string

	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'http://www.image.com/required:false,example-user.png',
		description: 'The profile photo of user'
	})
	profilePhoto?: string
}

@Schema({ collection: 'users', timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' } })
export class User extends Cell {
	// #region Cell properties
	@ApiProperty({ example: 'Lucrécio da Silva', description: 'The name of user' })
	declare name

	@ApiProperty({ description: 'The active status of user' })
	declare active

	@ApiProperty({ description: 'The archived status of user' })
	declare archived

	@ApiProperty({ description: 'The deleted status of user' })
	declare deleted

	@ApiProperty({
		example: 'Eu me chamo Lucrécio e sou professor de filosofia. Gosto de Tai-Chi e de cultivar plantas.',
		description: 'The description of user'
	})
	declare description?

	@ApiProperty({ description: 'The status of user' })
	declare status?

	@ApiProperty({ description: 'The priority of user' })
	declare priority?

	@ApiProperty({ description: 'The owner is the user who manages this user' })
	declare owner?

	@ApiProperty({ description: 'The assignees are the users have been assigned by the owner to help this user too' })
	declare assignees?

	@Prop({ type: [UserReferenceSchema], ref: 'UserReference' })
	@ApiProperty({ example: [], description: 'The person who is below user' })
	declare children?: UserReference[]

	@ApiProperty({ example: 'http://muda.education/user/lucrecio', description: 'The url of user', uniqueItems: true })
	declare url?

	@ApiProperty({ description: 'The tags of user' })
	declare tags?
	// #endregion

	// #region User required properties

	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'lucrecio1911',
		description: 'The username of user to be linked using @ (Ex: @lucrecio1911)',
		uniqueItems: true
	})
	username?: string

	@Prop()
	@IsString()
	@ApiProperty({ required: false, example: 'Lucré', description: 'The display name of user' })
	alias?: string

	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'http://www.image.com/required:false,example-user.png',
		description: 'The profile photo of user'
	})
	profilePhoto?: string

	@Prop()
	@ApiProperty({
		example: 'fGEidHfM4uTqYhkNqV2CQEUrALi2',
		description: 'The id from authentication provider',
		uniqueItems: true
	})
	authId: string

	@Prop()
	@IsString({ each: true })
	@ApiProperty({ example: ['google', 'email'], description: 'The authentication sources of user' })
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
	@ApiProperty({ example: [], description: 'The authentication devices of user logged out (Visited)' })
	devicesLoggedOut: string[]

	@Prop()
	@IsNumber()
	@ApiProperty({ example: 'America/Sao_Paulo', description: 'The timezone of user`s device' })
	timeZone: string

	@Prop({ type: [{ type: String, enum: Role }] })
	@IsEnum(Role, { each: true })
	@ApiProperty({ example: ['admin', 'user'], description: 'The user roles for authorization' })
	roles: Role[]

	@Prop()
	@IsDate()
	@ApiProperty({ example: '1911-12-20T14:34:50.085Z', description: 'The last visit of user' })
	lastVisited: Date

	@Prop()
	@IsBoolean()
	@ApiProperty({ example: false, description: 'Defines if the user prefer stay in private mode' })
	public: boolean

	@Prop()
	@IsEmail()
	@ApiProperty({ example: 'lucrecio@muda.education', description: 'The email of user' })
	email: string
	// #endregion

	// #region User optional properties
	@Prop()
	@IsDate()
	@ApiProperty({ required: false, example: '1911-12-20T14:34:50.085Z', description: 'The birth date of user' })
	birthDate?: Date

	@Prop()
	@IsPhoneNumber()
	@ApiProperty({ required: false, example: '+55 13 99999-9999', description: 'The phone number of user' })
	telephone?: string

	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'http://lucrecio.com.br',
		description: 'The personal website of user',
		uniqueItems: true
	})
	website?: string

	@Prop()
	@IsString()
	@ApiProperty({ required: false, example: 'male', description: 'The gender of user' })
	gender?: string

	@Prop()
	@IsString()
	@ApiProperty({ required: false, example: 'Brasil', description: 'The nationality of user' })
	nationality?: string

	@Prop()
	@IsString()
	@ApiProperty({ required: false, example: 'Professor', description: 'The job of user' })
	jobTitle?: string

	@Prop()
	@IsString()
	@ApiProperty({ required: false, example: 'Muda', description: 'The organization user works for' })
	worksFor?: string

	@Prop()
	@IsString()
	@ApiProperty({ required: false, example: 'Respeito, Altruísmo e Amor', description: 'The things user believes in' })
	ideals?: string

	@Prop()
	@IsString()
	@ApiProperty({
		required: false,
		example: 'Teologia, Tai-Chi e Cultivo de plantas',
		description: 'The things user knows'
	})
	knowsAbout?: string

	@Prop()
	@IsString({ each: true })
	@ApiProperty({ required: false, example: ['pt-BR', 'en-US'], description: 'The languages user knows' })
	knowsLanguage?: string[]

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	@ApiProperty({
		required: false,
		example: ['654172253b44c11359e9ee1b'],
		description: 'The people that user is following'
	})
	following?: User[]

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	@ApiProperty({
		required: false,
		example: ['654172253b44c11359e9ee1b'],
		description: 'The people that are following user'
	})
	followers?: User[]

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	@ApiProperty({
		required: false,
		example: ['654172253b44c11359e9ee1b'],
		description: 'The closest friends of user that will support him/her'
	})
	allies?: User[]

	@Prop()
	@IsString({ each: true })
	@ApiProperty({
		required: false,
		example: ['Muda', 'Cannan'],
		description: 'The user provides funding or sponsorship'
	})
	funding?: string[]

	@Prop()
	@IsString({ each: true })
	@ApiProperty({
		required: false,
		example: ['Google', 'carol95'],
		description: 'A person or organization that supports user'
	})
	sponsors?: string[]

	@Prop()
	@IsString({ each: true })
	@ApiProperty({ required: false, example: ['Best International Teacher of 2023'], description: 'The awards of user' })
	awards?: string[]

	@Prop({ type: Types.ObjectId, ref: 'User' })
	@ApiProperty({
		required: false,
		example: '654172253b44c11359e9ee1b',
		description: 'The mentor is the person who is helping the user'
	})
	mentor?: User

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	@ApiProperty({
		required: false,
		example: ['654172253b44c11359e9ee1b'],
		description: 'The mentees are users that are being helped by this user'
	})
	mentees?: User[]

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	@ApiProperty({
		required: false,
		example: ['654172253b44c11359e9ee1b'],
		description: 'The users that user is helping'
	})
	helping?: User[]

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	@ApiProperty({
		required: false,
		example: ['654172253b44c11359e9ee1b'],
		description: 'The users that user is helping'
	})
	helpedBy?: User[]

	@Prop()
	@IsString()
	@ApiProperty({ required: false, example: 'MUDA96', description: 'The invite code of user', uniqueItems: true })
	inviteCode?: string

	@Prop({ type: Types.ObjectId, ref: 'User' })
	@ApiProperty({ required: false, example: '654172253b44c11359e9ee1b', description: 'The user that invited this user' })
	invitingUser?: User

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	@ApiProperty({ required: false, example: ['654172253b44c11359e9ee1b'], description: 'The users that user invited' })
	invitedUsers?: User[]
	// TODO: Set the type of User for this and other properties that uses UserId

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	@ApiProperty({
		required: false,
		example: ['654172253b44c11359e9ee1b'],
		description: 'The users that send loves to the user'
	})
	loves?: User[]

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Cell' }] })
	@ApiProperty({ required: false, example: ['654172253b44c11359e9ee1b'], description: 'The things that user loved' })
	loved?: Cell[]

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Cell' }] })
	@ApiProperty({ required: false, example: ['654172253b44c11359e9ee1b'], description: 'The things that user liked' })
	liked?: Cell[]

	@Prop({ type: [SpaceSchema] })
	@ApiProperty({ required: false, example: [], description: 'The spaces of user' })
	spaces?: HydratedDocument<Space[]>
	// #endregion
}

export const UserSchema = SchemaFactory.createForClass(User)
