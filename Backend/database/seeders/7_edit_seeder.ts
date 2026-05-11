import Book from '#models/book'
import Edit from '#models/edit'
import Editor from '#models/editor'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    //get all data
    const books = await Book.all()
    const numberOfBooks = books.length
    const editors = await Editor.all()
    const numberOfEditors = editors.length

    //each book receive a t_editor record
    for (let i = 0; i < numberOfBooks; i++){
      let editorId = editors[(Math.floor(Math.random() * numberOfEditors))].id
      let bookId = books[i].id
      await Edit.create({ bookId, editorId })
    }
  }
}