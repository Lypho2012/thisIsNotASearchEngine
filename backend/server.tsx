const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/scrape", async (req, res) => {
  const url = req.query.url;
  try {
    const response = await axios.get(url);
    const html = response.data;
    console.log(url,html)
    const $ = cheerio.load(html);
    const data = [];
    $("p").each((index, element) => {
      data.push({
        text: $(element).text()
      });
    });
    console.log(data)
    res.json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error accessing the URL" });
  }
});