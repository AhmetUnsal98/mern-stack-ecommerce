import dotenv from "dotenv";
import config from "./config.js";
import express from "express";
import logger from "morgan";
import https from "https";
import fs from "fs";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";

import routes from "./routes/index";
const envPath = config?.production ? "./env/.prod" : "./env/.dev";

dotenv.config({
  path: envPath,
});
//Begin mongodb connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => console.log(err));

const app = express();
const router = express.Router();

app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(logger(process.env.LOGGER));

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(express.urlencoded({ extended: true }));

routes.forEach((routeFn, index) => {
  routeFn(router);
});
app.use("/api", router);

if (process.env.HTTPS_ENABLED === "true") {
  const key = fs
    .readFileSync(path.join(__dirname, "./certs/key.pem"))
    .toString();
  const cert = fs
    .readFileSync(path.join(__dirname, "./certs/cert.pem"))
    .toString();

  const server = https.createServer({ key: key, cert: cert }, app);

  server.listen(process.env.PORT, () => {
    console.log(
      "Express uygulamamız ",
      process.env.PORT,
      "Üzerinden çalışmakta"
    );
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(
      "Express uygulamamız ",
      process.env.PORT,
      "Üzerinden çalışmakta"
    );
  });
}
