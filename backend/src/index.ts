import dotenv from "dotenv";
dotenv.config();

import app from "./config/express";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI!;
const port = process.env.PORT!;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Db connected !");
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to DB:", err));
