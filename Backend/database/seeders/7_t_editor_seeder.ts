import Book from '#models/book'
import Editor from '#models/editor'
import TEditor from '#models/t_editor'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    //get all data
    const books = await Book.all()
    const numberOfBooks = books.length
    const numberOfEditors = (await Editor.all()).length

    //each book receive a t_editor record
    for (let i = 0; i < numberOfBooks; i++){
      let editorId = Math.floor(Math.random() * numberOfEditors)
      let bookId = books[i].id
      TEditor.create({ bookId, editorId })
    }
  }
}