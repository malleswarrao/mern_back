import express from "express";
const router = express.Router();
import { Book } from "../models/bookmodel.js";

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishyear
    ) {
      response.status(400).send({ message: "send all the details" });
    }
    const newbook = {
      title: request.body.title,
      author: request.body.author,
      publishyear: request.body.publishyear,
    };
    console.log("book creation");
    const book = Book.create(newbook);
    return response.status(201).json({ message: { book } });
    console.log("done");
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishyear
    ) {
      response.status(400).send({ message: "send all the details" });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "book not found" });
    } else {
      return response
        .status(200)
        .json({ message: "book updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    console.log("error occured");
    response.status(500).send({ message: error.message });
  }
});
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "book not found" });
    } else {
      return response
        .status(200)
        .json({ message: "book deleted successfully" });
    }
  } catch (error) {
    console.log(error.message);
    console.log("error occured");
    response.status(500).send({ message: error.message });
  }
});
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
  }
});
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
