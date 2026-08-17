const CASES = [
  {
    id: 1,
    title: "New Beginnings",
    teaser: "Starting fresh. Finding your place.",
    name: "Alex",
    pronoun:"he", objectPronoun:"him", possessive:"his",
    age: 16,
    traits: ["thoughtful","creative","quiet at first"],
    intro: "Alex has just started at a new school. Everyone seems friendly, but most students already have their own groups. Alex wants to make friends but does not know how to start.",
    lines: [
      {t:"Alex usually spends breaks alone.", e:true},
      {t:"Alex enjoys photography and basketball.", e:false},
      {t:"Two classmates invited Alex to join a school club.", e:true},
      {t:"Alex wants to make friends but feels uncomfortable starting conversations.", e:true},
      {t:"Alex has a new backpack.", e:false}
    ],
    challenge:"How can Alex feel more confident and find his place in the new school?",
    surprise:[
      "Which solution should Alex try first, and why?",
      "What might happen if Alex does nothing for the next month?",
      "Which piece of evidence influenced your advice most?"
    ]
  },
  {
    id: 2,
    title: "Taking the Lead",
    teaser: "Leader or boss? Finding the balance.",
    name: "Mia",
    pronoun:"she", objectPronoun:"her", possessive:"her",
    age: 16,
    traits:["organised","ambitious","confident"],
    intro:"Mia is leading a school project. She wants the result to be excellent, but lately she has started making most decisions herself. Two team members have stopped sharing ideas.",
    lines:[
      {t:"Mia often says, “It’s quicker if I do it myself.”", e:true},
      {t:"The deadline is close.", e:false},
      {t:"One teammate has a creative idea but has not shared it.", e:true},
      {t:"Mia wants the project to be excellent.", e:false},
      {t:"Two team members have stopped sharing ideas.", e:true}
    ],
    challenge:"How can Mia lead the team without controlling it?",
    surprise:[
      "What is the difference between being a leader and being a boss?",
      "Which team rule would help most?",
      "How could Mia react if the team rejects her idea?"
    ]
  },
  {
    id:3,
    title:"One Message, Two Meanings",
    teaser:"What did Sam really mean?",
    name:"Sam’s Group",
    pronoun:"they", objectPronoun:"them", possessive:"their",
    age:16,
    traits:["direct","social","hard to read online"],
    intro:"In the class group chat, Sam writes: “Great. Thanks for telling me.” One friend thinks Sam is genuinely grateful. Another thinks Sam is annoyed because nobody told Sam about a change of plans earlier.",
    lines:[
      {t:"There are no emojis in the message.", e:true},
      {t:"The message can sound positive or sarcastic.", e:true},
      {t:"Sam likes music.", e:false},
      {t:"There is no follow-up message.", e:true},
      {t:"Two friends interpret the message differently.", e:true}
    ],
    challenge:"How can the group avoid reacting to assumptions and clarify what Sam really means?",
    surprise:[
      "What new information could completely change your interpretation?",
      "Why are messages sometimes harder to understand than face-to-face speech?",
      "What would be a safe reply if you were unsure about Sam’s tone?"
    ]
  },
  {
    id:4,
    title:"Different Minds, One Project",
    teaser:"Different people, stronger together.",
    name:"Team Delta",
    pronoun:"they", objectPronoun:"them", possessive:"their",
    age:16,
    traits:["different work styles","strong opinions","good ideas"],
    intro:"Leo wants everything planned early. Eva gets her best ideas at the last minute. Max talks a lot during meetings. Nora is quieter but often notices problems others miss. The deadline is in three days.",
    lines:[
      {t:"Leo prefers planning everything early.", e:true},
      {t:"Eva often develops strong ideas late.", e:true},
      {t:"Max talks a lot during meetings.", e:true},
      {t:"Nora notices problems others miss.", e:true},
      {t:"The team uses blue folders.", e:false}
    ],
    challenge:"How can different personalities become a team advantage instead of a conflict?",
    surprise:[
      "Whose role would you change first if the deadline were tomorrow?",
      "Which personality difference could become the team’s biggest strength?",
      "What rule could prevent one person from dominating the group?"
    ]
  },
  {
    id:5,
    title:"Always Connected",
    teaser:"Online all the time... but not together?",
    name:"The Friend Group",
    pronoun:"they", objectPronoun:"them", possessive:"their",
    age:16,
    traits:["sociable","always connected","tech-loving"],
    intro:"Four friends meet after school. They have been looking forward to seeing each other all week, but during the first twenty minutes almost everyone keeps checking messages and notifications.",
    lines:[
      {t:"Phones help them stay connected with other people.", e:false},
      {t:"During the first twenty minutes, almost everyone keeps checking notifications.", e:true},
      {t:"One friend says, “We’re all here, but nobody is really here.”", e:true},
      {t:"Some messages may actually be important.", e:false},
      {t:"Nobody intentionally ignores anyone.", e:false}
    ],
    challenge:"How can the group stay connected online without losing their real-life time together?",
    surprise:[
      "Would a total phone ban be realistic? Why or why not?",
      "Which rule would be easiest for teenagers to follow?",
      "How could technology itself help solve this problem?"
    ]
  }
];

const STATE_VERSION = 10;
const STORAGE_KEY = "tv_final_state_v10";
const DEFAULT_STATE = {
  version:STATE_VERSION, step:0, teamSize:4, roles:["","","",""], selectedCase:null,
  evidence:[], evidenceChecked:false, hypothesis:"", feelings:"", viewpoint:"",
  solutions:["","",""], reasons:["","",""], bigIdea:"",
  reviewChecks:[false,false,false,false], review:{strength:"",suggestion:""},
  revisionTarget:"", revisionNote:"", revisionComplete:false, speakerIndex:null, surpriseQuestion:"",
  pitchEndAt:null, pitchDone:false, huddleEndAt:null, huddleDone:false, reflection:"", readiness:0, completed:false
};
const STEPS=["Briefing","Team","Cases","Profile","Evidence","Hypothesis","Solutions","Feature","Review","Revision","Speaker","On Air","Challenge","Reflect","Published"];
let timerHandle=null;
function cloneDefault(){return JSON.parse(JSON.stringify(DEFAULT_STATE))}
function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw) return cloneDefault();
    const parsed=JSON.parse(raw);
    if(parsed.version!==STATE_VERSION) return cloneDefault();
    return Object.assign(cloneDefault(),parsed);
  }catch(e){return cloneDefault()}
}
let state=loadState();
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function newTeam(){
  const ok=window.confirm("Start a new mission? Current progress on this device will be cleared.");
  if(!ok)return;
  if(timerHandle){clearInterval(timerHandle);timerHandle=null}
  localStorage.removeItem(STORAGE_KEY);
  state=cloneDefault();
  render();window.scrollTo({top:0,behavior:"smooth"});
}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function c(){return CASES.find(x=>x.id===state.selectedCase)}
function progress(){return Math.round((state.step/(STEPS.length-1))*100)}
function shell(content){
  document.getElementById("app").innerHTML=`<div class="topbar">
    <div class="brand"><div class="brand-mark">TV</div>Teen Voices Studio</div><button class="new-team-btn" onclick="newTeam()">New Team</button>
    <div class="progress-wrap"><div class="progress-track"><div class="progress-bar" style="width:${progress()}%"></div></div><div class="progress-label">${STEPS[state.step]} • ${progress()}%</div></div>
  </div>${content}`;
}
const strip=`<div class="editor-strip"><span class="editor-label">NEWSROOM</span><span>CASE DESK • EVIDENCE • SOLUTIONS • FINAL PITCH</span></div>`;
function go(n){if(timerHandle){clearInterval(timerHandle);timerHandle=null}state.step=n;save();render();window.scrollTo({top:0,behavior:"smooth"})}
function back(){return state.step?`<button class="btn btn-secondary" onclick="go(${state.step-1})">← Back</button>`:""}
function newsroom(content){return `<main class="screen">${strip}${content}</main>`}
function render(){
  if(state.step===0)return briefing(); if(state.step===1)return team(); if(state.step===2)return cases();
  if(state.step===3)return profile(); if(state.step===4)return evidence(); if(state.step===5)return hypothesis();
  if(state.step===6)return solutions(); if(state.step===7)return feature(); if(state.step===8)return review();
  if(state.step===9)return revision(); if(state.step===10)return speaker(); if(state.step===11)return onAir();
  if(state.step===12)return challenge(); if(state.step===13)return reflect(); return published();
}
function briefing(){shell(newsroom(`<section class="hero"><span class="kicker">FINAL MISSION</span><h1>THE REAL TEEN GUIDE</h1>
<p class="lead"><b>A real teen. A real problem. Your newsroom’s solution.</b></p>
<p class="lead">Investigate a teen’s situation, verify evidence, create realistic solutions and publish a Teen Voices feature that could actually help someone.</p>
<div class="grid grid-4"><div class="step-box"><div class="step-num">1</div><p><b>INVESTIGATE</b><br>Understand the case.</p></div><div class="step-box"><div class="step-num">2</div><p><b>VERIFY</b><br>Use evidence, not guesses.</p></div><div class="step-box"><div class="step-num">3</div><p><b>CREATE</b><br>Build specific solutions.</p></div><div class="step-box"><div class="step-num">4</div><p><b>GO LIVE</b><br>Pitch and face a challenge.</p></div></div>
<div class="cta-row"><button class="btn btn-primary" onclick="go(1)">Enter the Newsroom →</button></div></section>`))}
function team(){
 const roles=[["🔎","CASE DETECTIVE","Find and verify evidence."],["💡","IDEA BUILDER","Develop realistic solutions."],["💬","LANGUAGE COACH","Support clear, accurate English."],["🎙️","VOICE EDITOR","Shape the final pitch."]];
 shell(newsroom(`<h2>Build Your Newsroom Team</h2><p class="lead">Everyone contributes. One speaker will present the final edition later.</p>
 <div class="team-size"><b>Team size:</b><button class="chip ${state.teamSize===3?"active":""}" onclick="state.teamSize=3;save();render()">3 students</button><button class="chip ${state.teamSize===4?"active":""}" onclick="state.teamSize=4;save();render()">4 students</button></div>
 <div class="grid grid-4">${roles.map((r,i)=>`<div class="card role-card"><div class="icon-circle">${r[0]}</div><h3>${r[1]}</h3><p class="sublead">${r[2]}</p><div class="field"><label>${state.teamSize===3&&i===3?"Combined with Language Coach":"Student name"}</label><input type="text" ${state.teamSize===3&&i===3?"disabled":""} value="${state.teamSize===3&&i===3?esc(state.roles[2]):esc(state.roles[i])}" oninput="state.roles[${i}]=this.value;save()"></div></div>`).join("")}</div>
 <div class="footer-actions">${back()}<button class="btn btn-primary" onclick="go(2)">Team Ready →</button></div>`))}
function chooseCase(id){state.selectedCase=id;state.evidence=[];state.evidenceChecked=false;state.surpriseQuestion="";save();render()}
function cases(){shell(newsroom(`<h2>Newsroom Case Archive</h2><p class="lead">Choose one confidential story file for your editorial team.</p>
<div class="grid grid-5">${CASES.map(x=>`<div class="case-card ${state.selectedCase===x.id?"selected":""}"><div class="case-tab"></div><div class="case-no">CASE #0${x.id} • CONFIDENTIAL</div><div class="case-title">${x.title.toUpperCase()}</div><div class="case-teaser">${x.teaser}</div><button class="btn ${state.selectedCase===x.id?"btn-green":"btn-secondary"}" onclick="chooseCase(${x.id})">${state.selectedCase===x.id?"Assigned ✓":"Open file"}</button></div>`).join("")}</div>
<div class="footer-actions">${back()}<button class="btn btn-primary" ${state.selectedCase?"":"disabled"} onclick="${state.selectedCase?"go(3)":""}">Investigate Case →</button></div>`))}
function profile(){let x=c();shell(newsroom(`<span class="kicker">CASE #0${x.id}</span><h2>${x.title}</h2><div class="card profile"><div><div class="avatar">CASE<br>FILE</div><p class="lead" style="text-align:center"><b>${x.name}, ${x.age}</b></p></div><div><h3>Story Brief</h3><div class="badges">${x.traits.map(t=>`<span class="badge">${t}</span>`).join("")}</div><p class="case-text">${x.intro}</p><div class="notice notice-warn"><b>Editorial challenge:</b> ${x.challenge}</div></div></div><div class="footer-actions">${back()}<button class="btn btn-primary" onclick="go(4)">Open Evidence Board →</button></div>`))}
function toggleEvidence(i){if(state.evidenceChecked)return;if(state.evidence.includes(i))state.evidence=state.evidence.filter(v=>v!==i);else if(state.evidence.length<2)state.evidence.push(i);save();render()}
function checkEvidence(){if(state.evidence.length===2){state.evidenceChecked=true;save();render()}}
function retryEvidence(){state.evidence=[];state.evidenceChecked=false;save();render()}
function evidence(){let x=c(),good=state.evidence.length===2&&state.evidence.every(i=>x.lines[i].e);shell(newsroom(`<h2>Editor’s Evidence Board</h2><p class="lead">Select <b>two details</b> that best explain the real problem. Then verify your evidence.</p><div class="grid grid-2"><div class="card">${x.lines.map((l,i)=>{let cl=state.evidence.includes(i)?"chosen":"";if(state.evidenceChecked&&state.evidence.includes(i))cl+=l.e?" correct":" incorrect";return `<button class="evidence-line ${cl}" onclick="toggleEvidence(${i})">${l.t}${state.evidenceChecked&&state.evidence.includes(i)?(l.e?" ✓":" ↻"):""}</button>`}).join("")}</div><div class="card"><h3>Selected Evidence</h3>${state.evidence.length?state.evidence.map((i,j)=>`<div class="notice ${state.evidenceChecked?(x.lines[i].e?"notice-good":"notice-warn"):"notice-info"}"><b>Clue ${j+1}:</b> ${x.lines[i].t}</div><br>`).join(""):`<div class="notice notice-warn">Choose two clues.</div>`}${state.evidenceChecked?(good?`<div class="notice notice-good"><b>Verified ✓</b> These clues support your investigation.</div>`:`<div class="notice notice-warn"><b>Look again.</b> Does every clue really explain the problem?</div>`):""}</div></div><div class="footer-actions">${back()}${!state.evidenceChecked?`<button class="btn btn-primary" ${state.evidence.length===2?"":"disabled"} onclick="checkEvidence()">Verify Evidence ✓</button>`:good?`<button class="btn btn-primary" onclick="go(5)">Build Hypothesis →</button>`:`<button class="btn btn-secondary" onclick="retryEvidence()">Try Again ↻</button>`}</div>`))}
function hypReady(){return state.hypothesis.trim().length>0&&state.feelings.trim().length>0}
function caseScaffold(){
  const id=c().id;
  const data={
    1:{reason:"Think about what makes starting at a new school difficult.",feel:"Think about how Alex might feel during breaks or new conversations.",view:"How might classmates interpret Alex’s quiet behaviour?",solution:"Choose one small action Alex could realistically try at school.",why:"Explain how that action could make meeting people easier."},
    2:{reason:"Think about why Mia may be making most decisions herself.",feel:"How might Mia and the quieter team members feel?",view:"Could Mia and her teammates understand ‘good leadership’ differently?",solution:"Suggest one action that could help Mia include more team voices.",why:"Explain how it could improve both teamwork and the project."},
    3:{reason:"Think about why the same short message can have different meanings online.",feel:"How might Sam and the friends reading the message feel?",view:"What other interpretation of the message is possible?",solution:"Suggest one safe action the group could take before reacting.",why:"Explain how it could reduce assumptions or misunderstanding."},
    4:{reason:"Think about how different work styles can create tension.",feel:"How might different members of Team Delta feel during meetings?",view:"Could the same personality trait be both useful and difficult?",solution:"Suggest one team rule or action that uses different strengths.",why:"Explain how it could make collaboration more effective."},
    5:{reason:"Think about why notifications compete with face-to-face attention.",feel:"How might the friends feel when everyone keeps checking phones?",view:"Could some phone use during a meeting still be reasonable?",solution:"Suggest one realistic rule the friends could agree on together.",why:"Explain how it could protect real-life time without banning technology."}
  };
  return data[id]||data[1];
}
function updateFieldFeedback(id,value,emptyText){
  const el=document.getElementById(id);
  if(!el)return;
  const ok=value.trim().length>0;
  el.classList.toggle("done",ok);
  el.textContent=ok?"✓ Idea added":emptyText;
}

function hypothesis(){
 const s=caseScaffold();
 shell(newsroom(`<h2>Build the Story Hypothesis</h2>
<p class="lead">Understand the problem before giving advice. Write your team’s ideas in the two required boxes.</p>
<div class="grid grid-2">
  <div class="card">
    <div class="field">
      <label>Why might this be happening? <span class="required-mark">Required</span></label>
      <textarea placeholder="${esc(s.reason)}" oninput="state.hypothesis=this.value;save();updateFieldFeedback('hypHelp',this.value,'Add one clear idea to continue.');renderHypButtonOnly()">${esc(state.hypothesis)}</textarea>
      <div id="hypHelp" class="field-help ${state.hypothesis.trim().length?"done":""}">${state.hypothesis.trim().length?"✓ Idea added":"Add one clear idea to continue."}</div>
    </div>
    <div class="field">
      <label>How might the people involved feel? <span class="required-mark">Required</span></label>
      <textarea placeholder="${esc(s.feel)}" oninput="state.feelings=this.value;save();updateFieldFeedback('feelHelp',this.value,'Add one clear idea to continue.');renderHypButtonOnly()">${esc(state.feelings)}</textarea>
      <div id="feelHelp" class="field-help ${state.feelings.trim().length?"done":""}">${state.feelings.trim().length?"✓ Idea added":"Add one clear idea to continue."}</div>
    </div>
    <div class="field">
      <label>Could someone see the situation differently? <span class="optional-mark">Optional challenge</span></label>
      <textarea placeholder="${esc(s.view)}" oninput="state.viewpoint=this.value;save()">${esc(state.viewpoint)}</textarea>
      <div class="field-help">Use this box if your team can think of another point of view.</div>
    </div>
  </div>
  <div class="card toolkit">
    <h3>Language Desk</h3>
    <p class="case-text">This might be happening because…<br>The evidence suggests that…<br>From another point of view…<br>However, … might feel…</p>
    <div class="notice notice-info"><b>Think short. Think specific.</b> One meaningful sentence is enough.</div>
  </div>
</div>
<div class="footer-actions">${back()}<button id="hypNext" class="btn btn-primary" ${hypReady()?"":"disabled"} onclick="${hypReady()?"go(6)":""}">Send to Solution Desk →</button></div>`))}
function renderHypButtonOnly(){
  const btn=document.getElementById("hypNext");
  if(!btn)return;
  const ready=hypReady();
  btn.disabled=!ready;
  btn.onclick=ready?()=>go(6):null;
}
function subjectPronoun(){
  const x=c();
  if(x.pronoun)return x.pronoun;
  return x.name;
}
function objectPronoun(){
  const x=c();
  if(x.objectPronoun)return x.objectPronoun;
  return x.name;
}
function solReady(){return state.solutions.every(v=>v.trim().length>0)&&state.reasons.every(v=>v.trim().length>0)}
function updateSolutionField(i,type,value){
  const id=(type==="solution"?"solHelp":"reasonHelp")+i;
  updateFieldFeedback(id,value,type==="solution"?"Add one specific action.":"Explain why this action could help.");
  const btn=document.getElementById("buildFeatureBtn");
  if(btn){
    const ready=solReady();
    btn.disabled=!ready;
    btn.onclick=ready?()=>go(7):null;
  }
}
function solutionHelp(i,type){
  const value=(type==="solution"?state.solutions[i]:state.reasons[i]).trim();
  const id=(type==="solution"?"solHelp":"reasonHelp")+i;
  return `<div id="${id}" class="field-help ${value?"done":""}">${value?"✓ Idea added":type==="solution"?"Add one specific action.":"Explain why this action could help."}</div>`;
}
function solutions(){
 const s=caseScaffold();
 shell(newsroom(`<h2>Solution Desk</h2>
<p class="lead">Create <b>3 practical recommendations</b>. Each recommendation must add a <b>new idea</b>.</p>
<div class="notice notice-info"><b>Newsroom brief:</b> One meaningful sentence in each required box is enough. All six boxes must be completed.</div>
<div class="grid grid-3">${[0,1,2].map(i=>`<div class="card solution-card">
<h3>Recommendation ${i+1}</h3>
<div class="field">
<label>What should ${subjectPronoun()} do? <span class="required-mark">Required</span></label>
<textarea placeholder="${esc(s.solution)}" oninput="state.solutions[${i}]=this.value;save();updateSolutionField(${i},'solution',this.value)">${esc(state.solutions[i])}</textarea>
${solutionHelp(i,"solution")}
</div>
<div class="field">
<label>Why could it work? <span class="required-mark">Required</span></label>
<textarea placeholder="${esc(s.why)}" oninput="state.reasons[${i}]=this.value;save();updateSolutionField(${i},'reason',this.value)">${esc(state.reasons[i])}</textarea>
${solutionHelp(i,"reason")}
</div>
</div>`).join("")}</div>
<div class="notice notice-warn"><b>Editorial rule:</b> Be specific, realistic and avoid repeating the same idea in different words.</div>
<div class="footer-actions">${back()}<button id="buildFeatureBtn" class="btn btn-primary" ${solReady()?"":"disabled"} onclick="${solReady()?"go(7)":""}">Build Feature →</button></div>`))}

function normalizeText(s){
  return String(s||"").toLowerCase().replace(/[^a-z0-9а-яё\s]/gi," ").replace(/\s+/g," ").trim();
}
function similarText(a,b){
  const A=normalizeText(a), B=normalizeText(b);
  if(!A||!B)return false;
  if(A===B)return true;
  const aw=new Set(A.split(" ").filter(w=>w.length>2));
  const bw=new Set(B.split(" ").filter(w=>w.length>2));
  if(!aw.size||!bw.size)return false;
  let common=0; aw.forEach(w=>{if(bw.has(w))common++});
  const score=common/Math.max(aw.size,bw.size);
  return score>=0.8;
}
function solutionQualityIssues(){
  const issues=[];
  for(let i=0;i<3;i++){
    if(similarText(state.solutions[i],state.reasons[i])){
      issues.push(`Recommendation ${i+1}: the action and the reason are too similar.`);
    }
  }
  for(let i=0;i<3;i++){
    for(let j=i+1;j<3;j++){
      if(similarText(state.solutions[i],state.solutions[j])){
        issues.push(`Recommendations ${i+1} and ${j+1} look too similar.`);
      }
    }
  }
  return issues;
}
function finalValidationIssues(){
  const issues=[];
  if(!state.hypothesis.trim())issues.push("THE STORY is empty.");
  state.solutions.forEach((v,i)=>{if(!v.trim())issues.push(`Recommendation ${i+1} is empty.`)});
  state.reasons.forEach((v,i)=>{if(!v.trim())issues.push(`Reason ${i+1} is empty.`)});
  if(!state.bigIdea.trim())issues.push("OUR TAKE / BIG IDEA is empty.");
  issues.push(...solutionQualityIssues());
  return issues;
}
function finalFeatureReady(){
  return finalValidationIssues().length===0;
}
function updateFeatureUI(){
  const btn=document.getElementById("sendEditorBtn");
  const help=document.getElementById("ourTakeHelp");
  if(help){
    help.classList.toggle("done",state.bigIdea.trim().length>0);
    help.textContent=state.bigIdea.trim().length
      ?"✓ Final message added"
      :"Required • Add your team’s final message to continue.";
  }
  const warn=document.getElementById("solutionQualityWarning");
  if(warn){
    const issues=solutionQualityIssues();
    warn.innerHTML=issues.length
      ? `<div class="notice notice-warn"><b>Editor’s note:</b><br>${issues.map(x=>"• "+esc(x)).join("<br>")}<br><br>Add three different actions and explain why each one could work.</div>`
      : `<div class="notice notice-good"><b>Editor’s check ✓</b> Your three recommendations are distinct enough to continue.</div>`;
  }
  if(btn){
    const ready=finalFeatureReady();
    btn.disabled=!ready;
    btn.onclick=ready?()=>go(8):null;
  }
}

function featureMarkup(editable=true){
  let x=c();
  return `<div class="feature">
    <div class="masthead">
      <div class="edition">SPECIAL EDITION • CASE #0${x.id}</div>
      <div class="paper-name">TEEN VOICES</div>
      <div>${x.title.toUpperCase()}</div>
    </div>
    <div class="feature-grid">
      <div>
        <div class="feature-section"><h3>THE STORY</h3><p class="case-text">${esc(state.hypothesis||"—")}</p></div>
        <div class="feature-section"><h3>WHAT THE EVIDENCE SHOWS</h3>${state.evidence.map(i=>`<p class="case-text">• ${esc(x.lines[i].t)}</p>`).join("")}</div>
      </div>
      <div>
        <div class="feature-section"><h3>THE EDITORIAL TEAM RECOMMENDS</h3>
          ${state.solutions.map((s,i)=>`<p class="case-text"><b>${i+1}. ${esc(s||"—")}</b></p><p class="reason">Why: ${esc(state.reasons[i]||"—")}</p>`).join("")}
        </div>
      </div>
    </div>
    <div class="feature-section"><h3>OUR TAKE</h3>
      ${editable
        ? `<p class="case-text">Write one sentence that sums up your team’s most important message.</p>
           <textarea aria-label="Our Big Idea" placeholder="Our team believes that…" oninput="state.bigIdea=this.value;save();updateFeatureUI()">${esc(state.bigIdea)}</textarea>
           <div id="ourTakeHelp" role="status" aria-live="polite" class="field-help ${state.bigIdea.trim().length?"done":""}">${state.bigIdea.trim().length?"✓ Final message added":"Required • Add your team’s final message to continue."}</div>`
        : `<p class="big-idea">${esc(state.bigIdea||"—")}</p>`}
    </div>
  </div>`
}
function feature(){
  const issues=solutionQualityIssues();
  shell(newsroom(`<h2>Build Your Teen Voices Feature</h2>
  <p class="lead">Turn your investigation into a publishable newsroom feature.</p>
  ${featureMarkup(true)}
  <div id="solutionQualityWarning" role="status" aria-live="polite" style="margin-top:16px">
    ${issues.length
      ? `<div class="notice notice-warn"><b>Editor’s note:</b><br>${issues.map(x=>"• "+esc(x)).join("<br>")}<br><br>Add three different actions and explain why each one could work.</div>`
      : `<div class="notice notice-good"><b>Editor’s check ✓</b> Your three recommendations are distinct enough to continue.</div>`}
  </div>
  <div class="footer-actions">${back()}
    <button id="sendEditorBtn" class="btn btn-primary" ${finalFeatureReady()?"":"disabled"} onclick="${finalFeatureReady()?"go(8)":""}">Send to Editor →</button>
  </div>`))
}
function setCheck(i,v){state.reviewChecks[i]=v;save();render()}
function reviewReady(){return state.reviewChecks.every(Boolean)&&state.review.strength.trim().length>0&&state.review.suggestion.trim().length>0}
function review(){shell(newsroom(`<h2>Editor’s Desk Check</h2><p class="lead">Another team reviews your draft before publication.</p><div class="review-grid"><div class="card">${["The problem is supported by evidence.","The solutions are specific and realistic.","The reasoning is clear.","The Big Idea is useful for other teenagers."].map((t,i)=>`<label class="check-row"><input type="checkbox" ${state.reviewChecks[i]?"checked":""} onchange="setCheck(${i},this.checked)"> ${t}</label>`).join("")}</div><div class="card"><div class="field"><label>⭐ One strength</label><textarea oninput="state.review.strength=this.value;save()">${esc(state.review.strength)}</textarea></div><div class="field"><label>💡 One suggestion</label><textarea oninput="state.review.suggestion=this.value;save()">${esc(state.review.suggestion)}</textarea></div></div></div><div class="footer-actions">${back()}<button class="btn btn-primary" ${reviewReady()?"":"disabled"} onclick="${reviewReady()?"go(9)":""}">Revise the Edition →</button></div>`))}
function chooseRevisionTarget(target){state.revisionTarget=target;state.revisionComplete=false;save();render()}
function revisionEditor(){
  const t=state.revisionTarget;
  if(!t)return `<div class="notice notice-warn"><b>Choose one area to improve.</b> Use the editor’s suggestion to decide where revision is most useful.</div>`;
  if(t==="story")return `<div class="field"><label>Revise THE STORY</label><textarea oninput="state.hypothesis=this.value;save();updateRevisionFinalUI()">${esc(state.hypothesis)}</textarea></div>`;
  if(t==="recommendations")return `<div>${[0,1,2].map(i=>`<div class="field"><label>Recommendation ${i+1}</label><textarea oninput="state.solutions[${i}]=this.value;save();updateRevisionFinalUI()">${esc(state.solutions[i])}</textarea></div>`).join("")}</div>`;
  if(t==="reasoning")return `<div>${[0,1,2].map(i=>`<div class="field"><label>Reason ${i+1}</label><textarea oninput="state.reasons[${i}]=this.value;save();updateRevisionFinalUI()">${esc(state.reasons[i])}</textarea></div>`).join("")}</div>`;
  return `<div class="field"><label>Revise OUR TAKE / BIG IDEA</label><textarea oninput="state.bigIdea=this.value;save();updateRevisionFinalUI()">${esc(state.bigIdea)}</textarea></div>`;
}
function revisionReady(){
  return !!state.revisionTarget &&
    state.revisionComplete &&
    (state.revisionNote||"").trim().length>0 &&
    finalValidationIssues().length===0;
}
function revisionCheckMarkup(){
  const issues=finalValidationIssues();
  return issues.length
    ? `<div class="notice notice-warn" role="status" aria-live="polite"><b>Editor’s final check:</b><br>${issues.map(x=>"• "+esc(x)).join("<br>")}<br><br>Fix these points before approving the final edition.</div>`
    : `<div class="notice notice-good" role="status" aria-live="polite"><b>Editor’s final check ✓</b> Your revised edition is complete and ready for publication.</div>`;
}
function revision(){
 shell(newsroom(`<h2>Editor’s Revision Desk</h2>
 <p class="lead">Use the editor’s suggestion and make <b>one meaningful improvement</b> before publication.</p>
 <div class="notice notice-info"><b>Editor’s suggestion:</b> ${esc(state.review.suggestion)}</div>
 <div class="card revision-targets">
   <h3>What do you want to improve?</h3>
   <div class="revision-buttons">
     ${[["story","THE STORY"],["recommendations","RECOMMENDATIONS"],["reasoning","REASONING"],["bigIdea","BIG IDEA"]].map(([v,l])=>`<button class="chip ${state.revisionTarget===v?"active":""}" onclick="chooseRevisionTarget('${v}')">${l}</button>`).join("")}
   </div>
 </div>
 <div class="grid grid-2" style="margin-top:16px">
   <div class="card"><span class="editor-label">REVISION WORKSPACE</span><br><br>${revisionEditor()}</div>
   <div class="card"><h3>Revision Check</h3>
     <p class="case-text">Explain what you changed and why it improves the feature.</p>
     <div class="field"><label>What did you improve? <span class="required-mark">Required</span></label>
       <textarea oninput="state.revisionNote=this.value;save();updateRevisionFinalUI()">${esc(state.revisionNote||"")}</textarea>
     </div>
     <label class="check-row"><input type="checkbox" ${state.revisionComplete?"checked":""} onchange="state.revisionComplete=this.checked;save();updateRevisionFinalUI()"> We made a meaningful revision.</label>
     <div id="revisionFinalCheck" style="margin-top:14px">${revisionCheckMarkup()}</div>
   </div>
 </div>
 <div class="footer-actions">${back()}<button id="revisionNext" class="btn btn-primary" ${revisionReady()?"":"disabled"} onclick="${revisionReady()?"go(10)":""}">Approve Final Edition ✓</button></div>`))}
function updateRevisionFinalUI(){
  const box=document.getElementById("revisionFinalCheck");
  if(box)box.innerHTML=revisionCheckMarkup();
  const btn=document.getElementById("revisionNext");
  if(btn){
    const ready=revisionReady();
    btn.disabled=!ready;
    btn.onclick=ready?()=>go(10):null;
  }
}
function teamNames(){let n=state.teamSize===3?state.roles.slice(0,3):state.roles.slice(0,4);return n.map((x,i)=>x.trim()||`Student ${i+1}`)}
function chooseSpeaker(i){
  if(state.speakerIndex!==i){
    state.speakerIndex=i;
    state.pitchEndAt=null;state.pitchDone=false;
    state.surpriseQuestion="";state.huddleEndAt=null;state.huddleDone=false;
  }
  save();render();
}
function speaker(){let names=teamNames();shell(newsroom(`<h2>Choose Your Newsroom Speaker</h2><p class="lead">The feature belongs to the whole team. Choose <b>one representative</b> to present your shared work.</p><div class="speaker-grid">${names.map((n,i)=>`<button class="speaker-btn ${state.speakerIndex===i?"selected":""}" onclick="chooseSpeaker(${i})">🎙️ ${esc(n)}${state.speakerIndex===i?" ✓":""}</button>`).join("")}</div><div class="notice notice-info" style="margin-top:16px"><b>Everyone still contributes:</b> the team prepares the evidence, reasoning and response together.</div><div class="footer-actions">${back()}<button class="btn btn-primary" ${state.speakerIndex!==null?"":"disabled"} onclick="${state.speakerIndex!==null?"go(11)":""}">Go On Air →</button></div>`))}
function pitchRemaining(){
  return state.pitchEndAt?Math.max(0,Math.ceil((state.pitchEndAt-Date.now())/1000)):60;
}
function startPitch(){
  state.pitchEndAt=Date.now()+60000;
  state.pitchDone=false;
  save();
  render();
}
function updatePitchTimer(){
  const el=document.getElementById("pitchTimer");
  if(!el)return;
  const r=pitchRemaining();
  el.textContent=r;
  el.classList.toggle("urgent",r<=10);
  if(r<=0){
    clearInterval(timerHandle);timerHandle=null;
    state.pitchDone=true;save();
    const status=document.getElementById("pitchStatus");
    if(status)status.innerHTML='<div class="notice notice-good"><b>Pitch complete ✓</b> Your newsroom is ready for the final challenge.</div>';
    const challengeBtn=document.getElementById("challengeBtn");
    if(challengeBtn){challengeBtn.disabled=false;challengeBtn.onclick=()=>go(12)}
  }
}
function onAir(){
  let name=teamNames()[state.speakerIndex],r=pitchRemaining();
  if(state.pitchEndAt&&r<=0&&!state.pitchDone){state.pitchDone=true;save()}
  shell(newsroom(`<span class="kicker">ON AIR</span><h1>60-SECOND NEWSROOM PITCH</h1>
  <div class="onair-layout">
    <div class="card speaker-stage">
      <div class="live-badge">● LIVE</div>
      <h2>🎙️ ${esc(name)}</h2>
      <p class="lead">One speaker. One team voice.</p>
      <div class="pitch-outline">
        <div><b>1. STORY</b><span>What is the real problem?</span></div>
        <div><b>2. EVIDENCE</b><span>Which clues matter most?</span></div>
        <div><b>3. RECOMMENDATIONS</b><span>What should ${subjectPronoun()} do — and why?</span></div>
        <div><b>4. BIG IDEA</b><span>What should the audience remember?</span></div>
      </div>
      ${!state.pitchEndAt&&!state.pitchDone
        ? `<button class="btn btn-primary" onclick="startPitch()">Start 60-Second Pitch ▶</button>`
        : state.pitchDone
          ? `<div id="pitchStatus"><div class="notice notice-good"><b>Pitch complete ✓</b> Your newsroom is ready for the final challenge.</div></div>`
          : `<div class="timer pitch-timer" id="pitchTimer">${r}</div>
             <div id="pitchStatus" class="notice notice-info"><b>ON AIR:</b> Speak naturally. Do not read every sentence.</div>
             <p class="case-text"><b>Keep going until the timer ends.</b> If you finish your main points early, add one example or explain your strongest reason.</p>`}
    </div>
    <div class="card pitch-notes">
      <span class="editor-label">PITCH NOTES</span>
      <h3>${esc(c().title)}</h3>
      <p class="case-text"><b>Problem:</b> ${esc(state.hypothesis||"—")}</p>
      <p class="case-text"><b>Evidence:</b><br>${state.evidence.map(i=>`• ${esc(c().lines[i].t)}`).join("<br>")}</p>
      <p class="case-text"><b>Top recommendations:</b><br>${state.solutions.map((s,i)=>`${i+1}. ${esc(s||"—")}`).join("<br>")}</p>
      <p class="case-text"><b>Big Idea:</b> ${esc(state.bigIdea||"—")}</p>
    </div>
  </div>
  <div class="footer-actions">${back()}<button id="challengeBtn" class="btn btn-red" ${state.pitchDone?"":"disabled"} onclick="${state.pitchDone?"go(12)":""}">Reveal Final Challenge →</button></div>`))
  if(state.pitchEndAt&&!state.pitchDone){
    if(timerHandle)clearInterval(timerHandle);
    timerHandle=setInterval(updatePitchTimer,250);
  }
}
function drawQuestion(){
  let x=c();
  state.surpriseQuestion=x.surprise[Math.floor(Math.random()*x.surprise.length)];
  state.huddleEndAt=null;state.huddleDone=false;save();render();
}
function startHuddle(){
  state.huddleEndAt=Date.now()+20000;state.huddleDone=false;save();render();
}
function remaining(){
  return state.huddleEndAt?Math.max(0,Math.ceil((state.huddleEndAt-Date.now())/1000)):20;
}
function updateHuddleTimer(){
  const el=document.getElementById("huddleTimer");
  if(!el)return;
  const r=remaining();
  el.textContent=r;
  el.classList.toggle("urgent",r<=5);
  if(r<=0){
    clearInterval(timerHandle);timerHandle=null;
    state.huddleDone=true;save();
    const area=document.getElementById("huddleArea");
    if(area){
      const name=teamNames()[state.speakerIndex];
      area.innerHTML=`<div class="card scaffold"><span class="editor-label">YOU'RE LIVE</span><h2>🎙️ ${esc(name)} — Your Turn!</h2><p class="case-text"><b>Our team thinks…</b><br><b>The strongest evidence is…</b><br><b>This matters because…</b></p></div>`;
    }
    const done=document.getElementById("answerDoneBtn");
    if(done){done.disabled=false;done.onclick=()=>go(13)}
  }
}
function challenge(){
 let name=teamNames()[state.speakerIndex],r=remaining();
 if(state.huddleEndAt&&r<=0&&!state.huddleDone){state.huddleDone=true;save()}
 shell(newsroom(`<h2>Final Challenge</h2>
 ${!state.surpriseQuestion
   ? `<div class="card challenge-reveal"><span class="editor-label">EDITOR'S CHALLENGE</span><h3>One question. No swapping.</h3><p class="lead">Your team will see one unexpected question after the pitch.</p><button class="btn btn-red" onclick="drawQuestion()">🎲 Reveal the Final Question</button></div>`
   : `<div class="question-card"><span class="editor-label">CHALLENGE REVEALED</span><br><br>${esc(state.surpriseQuestion)}</div>
      <div id="huddleArea">
      ${!state.huddleEndAt
        ? `<div class="cta-row"><button class="btn btn-primary" onclick="startHuddle()">Start 20-Second Team Huddle</button></div><div class="notice notice-info"><b>Everyone thinks. Everyone contributes.</b> Discuss one strong answer before ${esc(name)} speaks.</div>`
        : !state.huddleDone
          ? `<div class="timer" id="huddleTimer">${r}</div><div class="notice notice-info"><b>TEAM HUDDLE:</b> Help ${esc(name)} choose evidence and explain why.</div>`
          : `<div class="card scaffold"><span class="editor-label">YOU'RE LIVE</span><h2>🎙️ ${esc(name)} — Your Turn!</h2><p class="case-text"><b>Our team thinks…</b><br><b>The strongest evidence is…</b><br><b>This matters because…</b></p></div>`}
      </div>`}
 <div class="footer-actions">${back()}<button id="answerDoneBtn" class="btn btn-primary" ${state.huddleDone?"":"disabled"} onclick="${state.huddleDone?"go(13)":""}">Answer Complete ✓</button></div>`));
 if(state.huddleEndAt&&!state.huddleDone){
   if(timerHandle)clearInterval(timerHandle);
   timerHandle=setInterval(updateHuddleTimer,250);
 }
}
function reflect(){shell(newsroom(`<h2>Newsroom Debrief</h2><p class="lead">Reflect on the team’s thinking, not only the final product.</p><div class="grid grid-4"><div class="card"><h3>🔎 Analyse</h3><p class="sublead">We used evidence.</p></div><div class="card"><h3>💡 Create</h3><p class="sublead">We built realistic solutions.</p></div><div class="card"><h3>💬 Explain</h3><p class="sublead">We supported our ideas in English.</p></div><div class="card"><h3>🤝 Collaborate</h3><p class="sublead">We made team decisions.</p></div></div><div class="card" style="margin-top:16px"><div class="field"><label>What was your team’s strongest idea?</label><textarea oninput="state.reflection=this.value;save()">${esc(state.reflection)}</textarea></div><label>How ready was your team?</label><div class="team-size"><button class="chip ${state.readiness===1?"active":""}" onclick="state.readiness=1;save();render()">★ More practice</button><button class="chip ${state.readiness===2?"active":""}" onclick="state.readiness=2;save();render()">★★ Almost there</button><button class="chip ${state.readiness===3?"active":""}" onclick="state.readiness=3;save();render()">★★★ Mission accomplished</button></div></div><div class="footer-actions">${back()}<button class="btn btn-primary" ${state.reflection.trim().length>0&&state.readiness?"":"disabled"} onclick="${state.reflection.trim().length>0&&state.readiness?"publishEdition()":""}">Publish Edition →</button></div>`))}
function publishEdition(){state.completed=true;state.step=14;save();render()}
function printFinalFeature(){
  window.print();
}
function published(){
 shell(newsroom(`
 <div class="complete no-print">
   <div class="complete-stamp">EDITION PUBLISHED ✓</div>
   <h1>MISSION ACCOMPLISHED</h1>
   <p class="lead">Your Teen Voices Special Edition is ready.</p>
   <div class="card"><p class="case-text">✓ Case investigated<br>✓ Evidence verified<br>✓ Solutions explained<br>✓ Feature revised<br>✓ Live challenge completed</p></div>
   <div class="cta-row" style="justify-content:center">
     <button class="btn btn-secondary" onclick="printFinalFeature()">Print / Save Final Feature as PDF</button>
     <button class="btn btn-primary" onclick="go(7)">View Final Feature</button>
     <button class="btn btn-secondary" onclick="resetMission()">New Mission</button>
   </div>
 </div>
 <section id="printEdition" class="print-only" aria-label="Final Teen Voices Edition">
   ${featureMarkup(false)}
 </section>`))
}
function resetMission(){localStorage.removeItem(STORAGE_KEY);state=cloneDefault();render()}
window.addEventListener("load",render);
window.addEventListener("beforeunload",save);
