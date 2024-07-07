import express from "express";
import {getAlldata,getFilteredData, getNameSuggestions} from "../controllers/search.controller.js"

const app = express.Router();

//To get all Products with filters  - /api/v1/product/all
app.get("/all", getAlldata);
app.get("/filter-all", getFilteredData);
app.get("/name",getNameSuggestions)


export default app;
