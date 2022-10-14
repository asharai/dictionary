import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import { getWord } from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://asharaev:MEF8wn3Uf6mOpL0h@dictionary.ntixggo.mongodb.net/dictionary?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log("error", err);
  });

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.use(cors());
app.post("/word", getWord);

app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok");
});
