import Belong from '#models/belong'
import Book from '#models/book'
import Categorie from '#models/categorie'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
      //get all data
      const books = await Book.all()
      const numberOfBooks = books.length
      const categories = await Categorie.all()
      const numberOfCategories = categories.length
  
      //each book receive a t_editor record
      for (let i = 0; i < numberOfBooks; i++){
        let bookId = books[i].id
        //give from 0 to 3 categories per book
        for (let i = 0; i < Math.round(Math.random() * 4); i++){
          await Belong.create({ bookId, categoryId: categories[(Math.floor(Math.random() * numberOfCategories))].id })
        }
      }
    }
}