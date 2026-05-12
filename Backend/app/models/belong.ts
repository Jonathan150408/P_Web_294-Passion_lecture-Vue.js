import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Categorie from './categorie.js'
import Book from './book.js'

export default class Belong extends BaseModel {
  //default
  @column({ isPrimary: true })
  declare id: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //fields
  //relations
  @column()
  declare categorieId : Number
  @belongsTo(() => Categorie)
  declare categorie : BelongsTo<typeof Categorie>

  @column()
  declare bookId : Number
  @belongsTo(() => Book)
  declare book : BelongsTo<typeof Book>
}