const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const TOKEN = "8722082752:AAGI8l0YkX7sYIEIvQ5PtdMk8OzLw0d775Q";

// Stock initial
let stock = {
  b1: "dispo"
};

// Endpoint webhook Telegram
app.post("/webhook", async (req, res) => {
  const message = req.body.message;
  if (!message || !message.text) return res.sendStatus(200);

  const chatId = message.chat.id;
  const text = message.text;

  let reply = "";

  // Commandes stock
  if (text === "/stock") {
    reply = `Stock actuel : b1 = ${stock.b1}`;
  } else if (text === "/soldout b1") {
    stock.b1 = "soldout";
    reply = "b1 est maintenant sold out ✅";
  } else if (text === "/dispo b1") {
    stock.b1 = "dispo";
    reply = "b1 est maintenant disponible ✅";
  } 
  // Commandes classiques
  else if (text === "/start") {
    reply = "Bot actif ✅";
  } else if (text === "/help") {
    reply = "Commandes disponibles : /start, /help, /stock, /soldout b1, /dispo b1";
  } else {
    reply = "Commande inconnue ❌";
  }

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

// Page test
app.get("/", (req, res) => {
  res.send("Bot actif");
});

// Port dynamique pour Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
