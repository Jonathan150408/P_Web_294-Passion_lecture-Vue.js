import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      //default
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      //fields
      table.string('label').notNullable().unique()
      //relations
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
