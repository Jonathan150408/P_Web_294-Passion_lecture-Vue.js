import { CategorieFactory } from '#database/factories/categorie_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await CategorieFactory.createMany(10)
  }
}
