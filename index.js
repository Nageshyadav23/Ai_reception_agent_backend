// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);



// PUT /update-status
// PUT /update-status
app.put("/update-status", async (req, res) => {
  try {
    const { callId, status, reply } = req.body;

    if (!callId || !status) {
      return res
        .status(400)
        .json({ success: false, error: "callId and status are required" });
    }

    const { data, error } = await supabase
      .from("calls")
      .update({ status, reply }) // reply can be null or empty
      .eq("id", callId);

    if (error) throw error;

    res.json({ success: true, updatedCall: data[0] });
  } catch (err) {
    console.error("Failed to update status and reply:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});




// --------------------
// Route: Process Text Message
// --------------------
app.post("/process-call", async (req, res) => {
  try {
    const { text, caller_name } = req.body;
    if (!text) return res.status(400).json({ success: false, error: "Text is required" });

    // GPT-4o-mini: classify intent & sentiment
    const prompt = `Classify the following message into:
- intent (support, HR, appointment, general inquiry)
- sentiment (positive, neutral, negative)

Message: "${text}"

Respond ONLY in JSON like this:
{
  "intent": "support",
  "sentiment": "positive"
}`;

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    let result;
    try {
      result = JSON.parse(gptResponse.choices[0].message.content);
    } catch {
      result = { intent: "general inquiry", sentiment: "neutral" };
    }

    // Store in Supabase
    const { error } = await supabase
      .from("calls")
      .insert([{
        caller_name: caller_name || null,
        message: text,
        intent: result.intent,
        sentiment: result.sentiment
      }]);

    if (error) throw error;

    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --------------------
// Route: Get All Call Logs
// --------------------
app.get("/calls", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("calls")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
