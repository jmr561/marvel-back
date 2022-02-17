const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
require("dotenv").config();

const apiKey = process.env.API_KEY;
const apiAddress = process.env.API_ADDRESS;

app.get("/comics", async (req, res) => {
  try {
    try {
      let pageNo = Number(req.query.currentpage);
      let toSkip = (pageNo - 1) * 100;
      const data = await axios.get(
        `${apiAddress}/comics?apiKey=${apiKey}&skip=${toSkip}`
      );
      res.status(200).json(data.data);
    } catch (error) {
      const data = await axios.get(`${apiAddress}/comics?apiKey=${apiKey}`);
      res.status(200).json(data.data);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/comics/:searchText", async (req, res) => {
  console.log(req.params);

  try {
    let searchTerms = req.params.searchText;
    const data = await axios.get(
      `${apiAddress}/comics?apiKey=${apiKey}&title=${searchTerms}`
    );
    res.status(200).json(data.data);
    console.log(data.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    try {
      let pageNo = Number(req.query.currentpage);
      let toSkip = (pageNo - 1) * 100;
      const data = await axios.get(
        `${apiAddress}/characters?apiKey=${apiKey}&skip=${toSkip}`
      );
      res.status(200).json(data.data);
    } catch (error) {
      const data = await axios.get(`${apiAddress}/characters?apiKey=${apiKey}`);
      res.status(200).json(data.data);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/characters/:searchText", async (req, res) => {
  console.log(req.params);

  try {
    let searchTerms = req.params.searchText;
    const data = await axios.get(
      `${apiAddress}/characters?apiKey=${apiKey}&name=${searchTerms}`
    );
    res.status(200).json(data.data);
    console.log(data.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/character/appearances/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const data = await axios.get(
      `${apiAddress}/character/${id}?apiKey=${apiKey}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/character/appearances/comics/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const data = await axios.get(`${apiAddress}/comics/${id}?apiKey=${apiKey}`);
    console.log(data);
    res.status(200).json(data.data.comics);
    console.log("success");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
