import express from "express";
import cors from "cors";

var express = require('express')
const mongoose = require('mongoose')
const mongoString = "mongodb+srv://chintandaxeshpatel:ZNEwFL1cklpV49Wl@cluster0.r1ze08e.mongodb.net/players"
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(mongoString);
db = mangoose.connection

db.once('connected', () => {
   console.log('Database Connected')
})

const dataSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

const Data = mongoose.model("Data", dataSchema);

app.get("/getres", async (req, res) => {
    const allData = await Data.find({}).lean();
    console.log("All data:", allData);
    const data = {data:allData}
    res.json(data);
});

app.post("/postdata", async (req, res) => {
  const newData = req.body;
    const createdData = await Data.create(newData);
    res.json({ createdData });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
