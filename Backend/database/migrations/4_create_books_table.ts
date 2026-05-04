import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      //default
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      //fields
      table.string('title').notNullable().unique()
      table.integer('number_of_pages').unsigned().notNullable()
      table.string('pdf_link')
      table.string('abstract')
      table.integer('edition_year')
      table.string('image_path')

      //relations
      table.foreign('user_id').references('user_id').inTable('users')
      table.foreign('writer_id').references('writer_id').inTable('writers')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
