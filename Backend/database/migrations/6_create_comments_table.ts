import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      //default
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      //fields
      table.string('content').notNullable()
      table.tinyint('rating').notNullable()

      //relations
      table.integer('book_id').unsigned().notNullable()
      table.foreign('book_id').references('id').inTable('books')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
