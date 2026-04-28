import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Editor extends BaseModel {
  //default
  @column({ isPrimary: true })
  declare id: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //fields
  @column()
  declare name: string

  //relations
  //belongsto -> book
}
