const express = require("express");
const app = express();

app.use(express.json());

let stock = {
  b1: "dispo"
};

app.post("/webhook", (req, res) => {
  const message = req.body.message?.text;

  if (message === "/stock") {
    console.log(stock);
  }

  if (message === "/soldout b1") {
    stock.b1 = "soldout";
    console.log("b1 sold out");
  }

  if (message === "/dispo b1") {
    stock.b1 = "dispo";
    console.log("b1 dispo");
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Bot actif");
});

app.listen(3000, () => console.log("Server running"));