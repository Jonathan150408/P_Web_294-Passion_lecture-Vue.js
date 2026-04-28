import { EditorFactory } from '#database/factories/editor_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await EditorFactory.createMany(10)
  }
}
