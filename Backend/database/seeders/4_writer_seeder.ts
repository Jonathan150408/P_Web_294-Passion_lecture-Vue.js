import { WriterFactory } from '#database/factories/writer_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await WriterFactory.createMany(10)
  }
}
