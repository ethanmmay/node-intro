import { FakeDb } from "../db/FakeDb"

class DogsService {
    getAll() {
        return FakeDb.dogs
    }

    create(newDog) {
        newDog.id = FakeDb.dogs.length
        FakeDb.dogs.push(newDog)
        return newDog
    }

    release(id) {
        findDog(id)
        FakeDb.dogs = FakeDb.dogs.filter(c => c.id != id)
    }

    edit(editedDog, id) {
        const foundDog = findDog(id)
        Object.keys(editedDog).forEach(key => {
            foundDog[key] = editedDog[key]
        })
        return foundDog
    }

    getOne(id) {
        const foundDog = findDog(id)
        return foundDog
    }
}

function findDog(id) {
    let foundDog = FakeDb.dogs.find(c => c.id == id)
    if (!foundDog) { throw new Error("invalid id") }
    return foundDog
}

export const dogsService = new DogsService()