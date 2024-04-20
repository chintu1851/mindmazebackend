const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose connection options (handle deprecation warnings)
const connectionOptions = {
 useNewUrlParser: true,
 useUnifiedTopology: true
};

// Connect to MongoDB database
mongoose.connect("mongodb+srv://chintandaxeshpatel:ZNEwFL1cklpV49Wl@cluster0.r1ze08e.mongodb.net/players", connectionOptions)
 .then(() => console.log('Database Connected'))
 .catch(error => console.error(error));

const db = mongoose.connection;

// Define Data Schema
const dataSchema = new mongoose.Schema({
 name: String,
 score: Number,
});

const Data = mongoose.model("Datas", dataSchema);

// GET /getres: Fetch all data
app.get("/getres", async (req, res) => {
 try {
  const allData = await Data.find({}).lean();
  console.log("All data:", allData);
  res.json({ data: allData });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Error fetching data" });
 }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
 console.log(`Backend server is running on port ${PORT}`);
});
