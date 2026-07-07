import express from "express";
import OpenAI from "openai";

const app = express();

app.use(express.json());
app.use(express.static("."));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/ai", async (req, res) => {
  const completion = await openai.responses.create({
    model: "gpt-5.5",
    input: req.body.message
  });

  res.json({
    reply: completion.output_text
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
