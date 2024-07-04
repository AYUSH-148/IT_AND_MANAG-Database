import express from "express";
import {getAlldata} from "../controllers/search.controller.js"

const app = express.Router();

//To get all Products with filters  - /api/v1/product/all
app.get("/all", getAlldata);


export default app;
