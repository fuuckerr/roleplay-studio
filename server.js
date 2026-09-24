import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const characters = [
  {id:"maya", name:"Maya", tag:"Rival • Sharp", icon:"⚡", intro:"A fiercely competitive rival who respects persistence."},
  {id:"dante", name:"Dante", tag:"Bully • School Drama", icon:"🦂", intro:"A provocative school rival. Conflict stays fictional and non-violent."},
  {id:"aria", name:"Aria", tag:"Former Spouse • Drama", icon:"🥀", intro:"A former spouse trying to reopen an old chapter. The story focuses on choices and boundaries."},
  {id:"vivian", name:"Vivian", tag:"Wealth • Business Drama", icon:"💎", intro:"A powerful spouse whose cold treatment pushes the protagonist toward independence and entrepreneurship."},
  {id:"leo", name:"Leo", tag:"Street-to-Business", icon:"📈", intro:"A determined young businessman building a company from very little."},
  {id:"kael", name:"Kael", tag:"War Survivor • Epic", icon:"🛡️", intro:"A fictional soldier from a poor family facing loss and rebuilding his life. Violence is kept non-graphic."},
  {id:"nora", name:"Nora", tag:"Detective • Mystery", icon:"🔎", intro:"A clever investigator who turns every conversation into a puzzle."},
  {id:"riven", name:"Riven", tag:"Fantasy • Exile", icon:"🌙", intro:"An exiled warrior in a fictional kingdom, searching for purpose."}
];

const scenarios = [
  {id:"rivals", title:"Rivals → Respect", text:"Two rivals are forced to cooperate on a high-stakes project."},
  {id:"bully", title:"School Power Struggle", text:"A student faces a provocative bully and learns to stand up for himself without escalating violence."},
  {id:"ex", title:"Old Chapter", text:"A former spouse returns asking to reconnect. The protagonist decides what boundaries and future he wants."},
  {id:"tycoon", title:"From Rejected to Tycoon", text:"A protagonist channels relationship frustration into building a legitimate business empire."},
  {id:"war", title:"Ashes & Dawn", text:"A soldier from a poor family survives a fictional war and begins rebuilding after losing his home and family."},
  {id:"mystery", title:"The Missing Ledger", text:"A detective and an unlikely partner investigate a missing financial ledger."},
  {id:"fantasy", title:"Exile of the Moon Kingdom", text:"An exiled warrior crosses a fantasy realm looking for allies and a new purpose."}
];

app.get("/api/health", (_,res)=>res.json({ok:true,service:"roleplay-studio"}));
app.get("/api/characters", (_,res)=>res.json(characters));
app.get("/api/scenarios", (_,res)=>res.json(scenarios));

app.post("/api/chat", (req,res)=>{
  const {characterId, scenarioId, message} = req.body || {};
  const c = characters.find(x=>x.id===characterId);
  const s = scenarios.find(x=>x.id===scenarioId);
  if(!c || !s || !message) return res.status(400).json({error:"Choose a character, scenario, and message."});

  // Safe local demo response. Replace this function with your preferred model API.
  const replies = [
    `${c.name}: "Interesting move. In ${s.title}, that changes the direction of the story."`,
    `${c.name}: "Then let's see what happens next. ${s.text}"`,
    `${c.name}: "I didn't expect that. Your next decision could change everything."`
  ];
  const reply = replies[Math.floor(Math.random()*replies.length)];
  res.json({reply});
});

app.get("*", (_,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(process.env.PORT || 3000, ()=>console.log(`Roleplay Studio running at http://localhost:${process.env.PORT || 3000}`));
