import { FakeDb } from "../db/FakeDb"

class CatsService {
    getAll() {
        return FakeDb.cats
    }

    create(newCat) {
        newCat.id = FakeDb.cats.length
        FakeDb.cats.push(newCat)
        return newCat
    }

    release(id) {
        FakeDb.cats = FakeDb.cats.filter(c => c.id != id)
    }

    edit(editedCat, id) {
        let foundCat = FakeDb.cats.find(c=> c.id == id)
        if (!foundCat) {
            throw new Error("Invalid Cat ID on catsService.edit(editedCat, id)")
        }
        Object.keys(editedCat).forEach(key => { // Changes Cat in DB's keys to editedCat's keys
            foundCat[key] = editedCat[key]
        })
    }

    getOne(id) {
        return FakeDb.cats.find(c => c.id == id)
    }
}

export const catsService = new CatsService()