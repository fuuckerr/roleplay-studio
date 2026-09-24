let chars=[],scens=[],characterId=null,scenarioId=null;
const $=id=>document.getElementById(id);
async function init(){
 chars=await (await fetch("/api/characters")).json();
 scens=await (await fetch("/api/scenarios")).json();
 renderChars(); renderScens();
}
function renderChars(){$("characters").innerHTML=chars.map(c=>`<div class="item" data-id="${c.id}" onclick="pickChar('${c.id}')"><span class="icon">${c.icon}</span><b>${c.name}</b><small>${c.tag}</small></div>`).join("")}
function renderScens(){$("scenarios").innerHTML=scens.map(s=>`<div class="item" data-id="${s.id}" onclick="pickScen('${s.id}')"><b>${s.title}</b><small>${s.text}</small></div>`).join("")}
function pickChar(id){characterId=id; document.querySelectorAll("#characters .item").forEach(x=>x.classList.toggle("active",x.dataset.id===id)); update();}
function pickScen(id){scenarioId=id; document.querySelectorAll("#scenarios .item").forEach(x=>x.classList.toggle("active",x.dataset.id===id)); update();}
function update(){let c=chars.find(x=>x.id===characterId),s=scens.find(x=>x.id===scenarioId);if(c&&s){$("hero").style.display="none";$("input").placeholder=`Chat with ${c.name}…`;if(!$("messages").children.length)add(`${c.name}: ${c.intro} Scenario: ${s.text}`,"ai")}}
function add(t,who){let d=document.createElement("div");d.className="msg "+who;d.textContent=t;$("messages").appendChild(d);$("messages").scrollTop=$("messages").scrollHeight}
$("form").addEventListener("submit",async e=>{e.preventDefault();let input=$("input"),m=input.value.trim();if(!m)return;if(!characterId||!scenarioId){add("Choose a character and scenario first.","ai");return}add(m,"user");input.value="";let r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({characterId,scenarioId,message:m})});let j=await r.json();add(j.reply||j.error,"ai")});
init();