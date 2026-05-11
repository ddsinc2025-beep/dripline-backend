const express = require("express");
const twilio = require("twilio");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dripline backend running");
});

app.post("/webhook", (req, res) => {
  const incoming = req.body.Body?.toLowerCase() || "";

  console.log("Incoming SMS:", incoming);

  const twiml = new twilio.twiml.MessagingResponse();

  if (incoming.includes("menu")) {
    twiml.message(
      "🔥 Detroit Seafood Spot Menu:\nhttps://detroitseafoodspot.com"
    );
  } else if (incoming.includes("hours")) {
    twiml.message(
      "⏰ Open Daily • Happy Hour 5PM-10PM"
    );
  } else {
    twiml.message(
      "👋 Welcome to Detroit Seafood Spot! Reply MENU or HOURS."
    );
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});