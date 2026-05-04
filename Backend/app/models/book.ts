import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Writer from './writer.js'

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
}
