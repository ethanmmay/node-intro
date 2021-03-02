import express from "express";
import BaseController from "../utils/BaseController";
import { dogsService } from "../services/DogsService";
import { FakeDb } from "../db/FakeDb";

export class DogsController extends BaseController {
  constructor() {
    super("api/dogs");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .post("", this.create)
      .delete("/:id", this.delete)
      .put("/:id", this.edit)
  }

  async getOne(req, res, next) {
    try {
      res.send(dogsService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let editedDogs = req.body
      const dog = dogsService.edit(editedDogs, req.params.id)
      res.send(dog)
    } catch (error) {
      next(error)
    }
  }
  
  async getAll(req, res, next) {
    try {
      res.send(dogsService.getAll());
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let newDog = req.body
      const dog = dogsService.create(newDog)
      res.status(201).send({data: dog, message:"Dog adopted", count: FakeDb.dogs.length});
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id
      dogsService.release(id)
      res.send("Dog released")
    } catch (error) {
      next(error)
    }
  }
}
