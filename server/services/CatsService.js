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
        findCat(id)
        FakeDb.cats = FakeDb.cats.filter(c => c.id != id)
    }

    edit(editedCat, id) {
        const foundCat = findCat(id)
        Object.keys(editedCat).forEach(key => {
            foundCat[key] = editedCat[key]
        })
        return foundCat
    }

    getOne(id) {
        const foundCat = findCat(id)
        return foundCat
    }
}

function findCat(id) {
    let foundCat = FakeDb.cats.find(c => c.id == id)
    if (!foundCat) { throw new Error("invalid id") }
    return foundCat
}

export const catsService = new CatsService()