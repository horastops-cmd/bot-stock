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
// Middleware pour parser le JSON envoyé par Telegram
app.use(bodyParser.json());

// Endpoint webhook Telegram
app.post("/webhook", async (req, res) => {
  const message = req.body.message;
  if (!message || !message.text) return res.sendStatus(200);

  const chatId = message.chat.id;
  const text = message.text;

  let reply = "";
  if (text === "/start") reply = "Bot actif ✅";
  else if (text === "/help") reply = "Commandes disponibles : /start, /help";
  else reply = "Commande inconnue ❌";

  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: reply
    });
  } catch (error) {
    console.error("Erreur en envoyant le message :", error.response?.data || error.message);
  }

  res.sendStatus(200); // très important
});
