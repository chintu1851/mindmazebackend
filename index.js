const express = require('express');
const mongoose = require('mongoose');

// Mongoose connection options (handle deprecation warnings)
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB database (defer data fetching)
mongoose.connect("mongodb+srv://chintandaxeshpatel:ZNEwFL1cklpV49Wl@cluster0.r1ze08e.mongodb.net/players", connectionOptions)
  .then(async () => {
    console.log('Database Connected');
    // Define data schema
    const dataSchema = new mongoose.Schema({
      name: String,
      score: Number,
    });

    const Data = mongoose.model("Datas", dataSchema);

    const app = express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // GET /getres: Fetch all data
    app.get("/getres", async (req, res) => {
      try {
        const allData = await Data.find({});
        console.log("All data:", allData);
        res.json({ data: allData });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching data" });
      }
    });

    // POST /postdata: Create new data (optional, not included here)
    // ... implement POST endpoint for creating data if needed

    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => {
      console.log(`Backend server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error(error));
