import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
  const incomingMessage = req.body.Body || "No message received";

  console.log("Incoming SMS:", incomingMessage);

  const reply = `
<Response>
  <Message>Dripline received your message: ${incomingMessage}</Message>
</Response>`;

  res.type("text/xml");
  res.send(reply);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});