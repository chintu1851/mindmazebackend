const express = require('express');
const mongoose = require('mongoose');

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

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});
// GET /getres: Fetch all data
app.get("/getres", async (req, res) => {
 console.log("reqqqq--->", req);
 console.log("ressss--->", res);
 try {
  const allData = await Data.find({}).lean();
  console.log("All data:", allData);
  res.json({ data: allData });
  console.log("ressss 111 --->", res);
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Error fetching data" });
 }
});

// POST /postdata: Create new data
app.post("/postdata", async (req, res) => {
 try {
  const newData = req.body;
  const createdData = await Data.create(newData);
  res.json({ createdData });
 } catch (error) {
  console.error(error);
  res.status(400).json({ message: "Error creating data" }); // Specific error message
 }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
 console.log(`Backend server is running on port ${PORT}`);
});
