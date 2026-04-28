import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    User.createMany([
      {
        username: 'root',
        role: 'admin',
        password: 'root',
      },
      {
        username: 'JohnTheRipper',
        role: 'user',
        password: 'Ubuntu123',
      },
    ])
  }
}
