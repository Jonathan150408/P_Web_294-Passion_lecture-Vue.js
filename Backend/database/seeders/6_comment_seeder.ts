import { CommentFactory } from '#database/factories/comment_factory'
import Book from '#models/book'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await CommentFactory.createMany((await Book.all()).length * 10)
  }
}