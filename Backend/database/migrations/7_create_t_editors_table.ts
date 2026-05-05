import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 't_editors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      //default
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      //fields

      //relations
      table.integer("editorId").unsigned().notNullable()
      table.foreign("editorId").references("id").inTable("editors")

      table.integer("bookId").unsigned().notNullable()
      table.foreign("bookId").references("id").inTable("books")
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}