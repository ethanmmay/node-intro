import express from "express";
import BaseController from "../utils/BaseController";
import { catsService } from "../services/CatsService";
import { FakeDb } from "../db/FakeDb";

export class CatsController extends BaseController {
  constructor() {
    super("api/cats");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .post("", this.create)
      .delete("/:id", this.delete)
      .put("/:id", this.edit)
  }

  async getOne(req, res, next) {
    try {
      res.send(catsService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let editedCat = req.body
      const cat = catsService.edit(editedCat, req.params.id)
      res.send(cat)
    } catch (error) {
      next(error)
    }
  }
  
  async getAll(req, res, next) {
      try {
        const cats = catsService.getAll()
      res.send(cats);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let newCat = req.body
      const cat = catsService.create(newCat)
      res.status(201).send({data: cat, message:"Cat adopted", count: FakeDb.cats.length});
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id
      catsService.release(id)
      res.send("Cat released")
    } catch (error) {
      next(error)
    }
  }
}
