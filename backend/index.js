import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";

import * as DictionaryController from "./controllers/DictionaryController";
import { getWord } from "./controllers/WordController";

mongoose
  .connect(
    "mongodb+srv://asharaev:RVQfDtENCsMdrzP2@dictionary.ntixggo.mongodb.net/dictionary?retryWrites=true&w=majority"
    // "mongodb+srv://asharaev:MEF8wn3Uf6mOpL0h@dictionary.ntixggo.mongodb.net/dictionary?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log("error", err);
  });

const app = express();

app.use(express.json());
app.use(cors());
app.post("/auth/login", loginValidation, UserController.login);

app.post("/word", getWord);

app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/dictionary", DictionaryController.addWord);
// app.delete("/dictionary", DictionaryController.deleteWord);
// app.get("/dictionary", DictionaryController.getAll);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok");
});
