iimport express from "express";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    status: "Dripline backend running"
  });
});

app.post("/webhook", (req, res) => {
  const incoming = (req.body.Body || "").toLowerCase();

  console.log("Incoming SMS:", req.body.Body);

  const twiml = new twilio.twiml.MessagingResponse();

  if (incoming.includes("menu")) {
    twiml.message(
      "🔥 Detroit Seafood Spot 🔥\n2 for $60 Seafood Boils\nPretty Girls Happy Hour 5PM-10PM\nOrder now:\nhttps://detroitseafoodspot.com"
    );
  } else if (incoming.includes("hours")) {
    twiml.message(
      "Detroit Seafood Spot is open today. Order online:\nhttps://detroitseafoodspot.com"
    );
  } else {
    twiml.message(
      "Thanks for texting Detroit Seafood Spot! Reply MENU for specials or HOURS for today’s info."
    );
  }

  res.type("text/xml");
  res.send(twiml.toString());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});