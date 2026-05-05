import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Writer from './writer.js'
import Comment from './comment.js'

export default class Book extends BaseModel {
  //default
  @column({ isPrimary: true })
  declare id: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //fields
  @column()
  declare title: string
  @column()
  declare numberOfPages: number
  @column()
  declare pdfLink: string
  @column()
  declare abstract: string
  @column()
  declare editionYear: number
  @column()
  declare imagePath: string

  //relations
  @column()
  declare userId: number
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare writerId: number
  @belongsTo(() => Writer)
  declare writer: BelongsTo<typeof Writer>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
}
