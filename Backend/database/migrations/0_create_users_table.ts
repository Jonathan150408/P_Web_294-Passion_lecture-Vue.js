import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      //default
      table.increments('id').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      //fields
      table.string('username').nullable().unique()
      table.string('role').notNullable().defaultTo('user')
      table.string('password').notNullable()

      //relations
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
