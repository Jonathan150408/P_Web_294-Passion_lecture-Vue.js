import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Editor from './editor.js'
import Book from './book.js'

export default class Edit extends BaseModel {
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
  declare editorId : number
  @belongsTo(() => Editor)
  declare editor : BelongsTo<typeof Editor>

  @column()
  declare bookId : number
  @belongsTo(() => Book)
  declare book : BelongsTo<typeof Book>
}