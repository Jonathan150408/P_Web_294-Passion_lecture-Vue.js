import Categorie from '#models/categorie'
import vine from '@vinejs/vine'

const BelongValidator = vine.compile(
    vine.object({
        categorieId : vine.number().positive().exists(async( db, value ) => {
            //return true if found, false if not existing
            return !!await Categorie.query().where('id', value).first()
        })
        //we don't need to validate the bookId because when created, we use the new id
    })
)

export { BelongValidator }