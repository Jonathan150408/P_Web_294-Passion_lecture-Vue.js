import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Book from './book.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  //default
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  //fields
  @column()
  declare username: string

  @column()
  declare role: string

  @column({ serializeAs: null })
  declare password: string

  //relations
  @hasMany(() => Book)
  declare books: HasMany<typeof Book>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  //others
  static accessTokens = DbAccessTokensProvider.forModel(User)
}
