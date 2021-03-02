import express from "express";
import BaseController from "../utils/BaseController";
import { catsService } from "../services/CatsService";
import { FakeDb } from "../db/FakeDb";
import { toASCII } from "punycode";

export class CatsController extends BaseController {
  constructor() {
    super("api/cats");
    this.router
      .get("", this.getAll)
      .post("", this.create)
      .delete("/:id", this.release)
      .put("/:id", this.edit);
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
      res.status(201).send(cat);
    } catch (error) {
      next(error);
    }
  }

  async release(req, res, next) {
    try {
      const id = req.params.id
      const cat = catsService.release(id)
      res.status(202).send({message: "Cat released...", data: cat, count: FakeDb.cats.length})
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
      try {
      const cat = catsService.edit(req.body, req.params.id)
      res.send(cat)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(catsService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
