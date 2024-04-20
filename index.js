var express = require('express')
const mongoose = require('mongoose')
// const mongoString = "mongodb+srv://chintandaxeshpatel:ZNEwFL1cklpV49Wl@cluster0.r1ze08e.mongodb.net/players"

mongoose.connect("mongodb+srv://chintandaxeshpatel:ZNEwFL1cklpV49Wl@cluster0.r1ze08e.mongodb.net/players");
const db = mongoose.connection

db.on('error', (error) => {
   console.log(error)
})

db.once('connected', () => {
   console.log('Database Connected')
})

const dataSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

const Data = mongoose.model("Data", dataSchema);

var app = express()
var bodyParser = require('body-parser')
app.use( bodyParser.json() )       
app.use(bodyParser.urlencoded({     
  extended: true
}))

app.get("/getres", async function(req, res) {
    const allData = await Data.find({});
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
