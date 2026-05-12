import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'belongs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      //default
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      //fields

      //relations
      table.integer('categorie_id').notNullable().unsigned()
      table.foreign('categorie_id').references('id').inTable('categories')
      
      table.integer('book_id').notNullable().unsigned()
      table.foreign('book_id').references('id').inTable('books')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}