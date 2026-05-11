import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'edits'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      //default
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      //fields

      //relations
      table.integer("editor_id").unsigned().notNullable()
      table.foreign("editor_id").references("id").inTable("editors")

      table.integer("book_id").unsigned().notNullable()
      table.foreign("book_id").references("id").inTable("books")
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}