import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'writers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      //default
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      //fields
      table.string('firstname').notNullable()
      table.string('lastname')

      //no relation(s)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
