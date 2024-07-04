import express from "express";
import { connectDB } from "./db.js";
import { config } from "dotenv";
import cors from "cors";

// Importing Routes
import SearchRoute from "./routes/search.route.js"

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI||"" ;

connectDB(mongoURI);

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

// Using Routes
app.use("/api/colleges", SearchRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});
