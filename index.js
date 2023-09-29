import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from "./Routes/booksRoute.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
  console.log("listening on port 5555");
});
app.use("/books", booksRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to the database successfully");
    app.get("/", (request, response) => {
      console.log(request);
      return response.status(234).send("hi");
    });
  })
  .catch((error) => {
    console.log(error);
  });
