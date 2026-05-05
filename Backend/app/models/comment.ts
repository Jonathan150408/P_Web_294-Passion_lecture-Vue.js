import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Comment extends BaseModel {
  //default
  @column({ isPrimary: true })
  declare id: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //fields
  @column()
  declare content: String
  @column()
  declare rating: number

  //relations
  @column()
  declare bookId: number
  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>

  @column()
  declare userId: number
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
