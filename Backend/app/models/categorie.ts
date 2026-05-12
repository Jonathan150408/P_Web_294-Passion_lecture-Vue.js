import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Belong from './belong.js'

export default class Categorie extends BaseModel {
  //default
  @column({ isPrimary: true })
  declare id: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //fields
  @column()
  declare label: string

  //relations
  @hasMany(() => Belong)
  declare belong : HasMany<typeof Belong>
}
