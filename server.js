import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/ai", async (req, res) => {
  try {
    const text = String(req.body?.text || "").trim();

    if (!text) {
      return res.json({ answer: "" });
    }

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Réponds simplement, directement, sans introduction, sans explication de ton rôle, sans conclusion forcée. Ne conserve rien."
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7
    });

    res.json({
      answer: completion.choices?.[0]?.message?.content || ""
    });
  } catch (error) {
    res.status(500).json({ answer: "" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`True Business disponible sur le port ${port}`);
});
