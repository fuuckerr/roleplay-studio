const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Serve the website files from the repository root
app.use(express.static(__dirname));

const characters = [
  { id: "maya", name: "Maya", role: "Rival • Sharp" },
  { id: "dante", name: "Dante", role: "Bully • School Drama" },
  { id: "aria", name: "Aria", role: "Former Spouse • Drama" },
  { id: "vivian", name: "Vivian", role: "Wealth • Business Drama" },
  { id: "leo", name: "Leo", role: "Street-to-Business" },
  { id: "kael", name: "Kael", role: "War Survivor • Epic" },
  { id: "nora", name: "Nora", role: "Detective • Mystery" },
  { id: "riven", name: "Riven", role: "Fantasy • Exile" }
];

const scenarios = [
  { id: "rivals", name: "Rivals → Respect" },
  { id: "school", name: "School Power Struggle" },
  { id: "chapter", name: "Old Chapter" },
  { id: "tycoon", name: "From Rejected to Tycoon" },
  { id: "ashes", name: "Ashes & Dawn" },
  { id: "ledger", name: "The Missing Ledger" },
  { id: "exile", name: "Exile of the Moon Kingdom" }
];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/characters", (req, res) => {
  res.json(characters);
});

app.get("/api/scenarios", (req, res) => {
  res.json(scenarios);
});

app.post("/api/chat", (req, res) => {
  const replies = [
    "Interesting. I didn't expect you to say that.",
    "You really think that's going to change the situation?",
    "Fine. Let's see where this goes.",
    "That's one way of looking at it.",
    "I have a feeling this story is just getting started."
  ];

  res.json({
    reply: replies[Math.floor(Math.random() * replies.length)]
  });
});

// Send index.html for the main page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Roleplay Studio running on port ${PORT}`);
});
