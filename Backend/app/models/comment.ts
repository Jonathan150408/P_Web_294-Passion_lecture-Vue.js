import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

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
  declare user: BelongsTo<typeof Book>
}