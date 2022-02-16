const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());

// Remember to put this is process .env
const apiKey = "A1NA1Hw9ifSjgU3x";

app.get("/comics", async (req, res) => {
  try {
    try {
      let pageNo = Number(req.query.currentpage);
      let toSkip = (pageNo - 1) * 100;
      const data = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&skip=${toSkip}`
      );
      res.status(200).json(data.data);
    } catch (error) {
      const data = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`
      );
      res.status(200).json(data.data);
    }
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
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&skip=${toSkip}`
      );
      res.status(200).json(data.data);
    } catch (error) {
      const data = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
      );
      res.status(200).json(data.data);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/character/appearances/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const data = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${apiKey}`
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
    const data = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${apiKey}`
    );
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

app.listen(3100, () => {
  console.log("Server has started");
});
