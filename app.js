import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan, { format } from "morgan";
import cookieParser from "cookie-parser";
import r from "./router/authrouter.js";
import cardr from "./router/cardrouter.js";
import question from "./router/questionrouter.js";
import questionrouter from "./router/questionrouter.js";
import { rateLimit } from "express-rate-limit";

dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan(format));
app.use(r);
app.use(questionrouter);
app.use(cardr);
app.get("*", (req, res) => {
  res.send(`<h1>Hello World! From Express Server</h1>`);
});
export default app;
