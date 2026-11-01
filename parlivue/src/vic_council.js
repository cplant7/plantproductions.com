/* ================= CITY OF VICTORIA: COUNCIL CHAMBER (provincial chamber design) =================
   Mayor in the chair, eight councillors elected at large. Desk positions are illustrative: the City doesn't
   publish a seating plan. Data reuse: VIC_S / VIC_IN / VIC_OUT (bcvic_data.js), VSC_PEOPLE (vic_scorecard.js). */
const VCC_S={...VIC_S, mla:VIC_S.elec, cab:VIC_S.elec, buzz:["Victoria Buzz, Oct 17 2026 (preliminary counts)","https://victoriabuzz.com/2026/10/marianne-alto-re-elected-victoria-mayor-as-council-results-bring-new-faces/"],
  e22:["2022 Declaration of Official Results","https://www.victoria.ca/media/file/declaration-official-results-2022pdf"],
  amal:["Daily Hive, Oct 27 2026","https://dailyhive.com/vancouver/victoria-saanich-october-2026-amalgamation-plebiscite-election-results"]};
const VCC_SEATS={"Marianne Alto":[-385,-205],
  "Stephen Hammond":[-520,-110],"Matt Dell":[-520,-20],"Jeremy Caradonna":[-520,70],"Jack Sandor":[-445,165],
  "Marg Gardiner":[-325,165],"Melissa Cseszko":[-250,70],"Wendy Bowkett":[-250,-20],"Dave Thompson":[-250,-110]};
const VCC_PEOPLE={}; VSC_PEOPLE.forEach(p=>VCC_PEOPLE[p[0]]=p);
CH.victoria={id:"victoria",title:"Victoria City Council",fr:"",kicker:"",rows:1,memberNoun:"Councillor",placeNoun:"Elected",
  groups:{inc:{name:"Returning member",short:"RETURNING",color:"var(--p-ind)"},new:{name:"New to Council",short:"NEW",color:"var(--brass)"}},
  order:["inc","new"],govSide:["inc","new"],oppSide:[],speaker:"Marianne Alto",majority:5,
  tileWord:"group",bodyWord:"Council",breakFn:x=>x.name==="Marianne Alto"?"Mayor":"Councillors",src:VIC_S.elec};
CH.victoria.members=[["Marianne Alto","inc"],...VIC_IN.filter(n=>n.role==="vic_council"||n.role==="councillor").map(n=>[n.name,n.isNew?"new":"inc"])]
  .map(([n,g],i)=>({i,name:n,sort:n,group:g,place:"Citywide (at large)",hon:false}));
CH.victoria.summary=(c,total)=>[
  `<div class="hsub"><span class="majtag">Council of ${total}</span> majority is 5</div>`,
  `<div class="majbtn static"><span class="kicker">Voter turnout</span><span class="bign">41.4%</span><span class="src">31,281 ballots on Oct 17, 2026 (preliminary). The new term begins Nov 5, 2026.</span></div>
   <dl class="kv"><dt>Mayor</dt><dd>Marianne Alto · 44.69%</dd><dt>City Manager</dt><dd>Jocelyn Jenkyns</dd><dt>2026 budget</dt><dd>$394.1M operating · $160.1M capital</dd></dl>`];
const VCC_OUT=[{id:"cow",abbr:"Council",name:"Council as a whole",heads:[],budget:945240},
  ...VIC_OUT.filter(o=>o.kind!=="advisory")];
const VCC_MIN=VIC_IN.filter(n=>n.role==="vic_council"||n.role==="councillor").map(n=>({id:n.id,name:n.name,title:n.isNew?"Councillor (new)":"Councillor",links:[]}));
const VCC_BOARDS=[
  {role:"Victoria and Esquimalt Police Board",name:null,what:"Oversees the Victoria Police Department under the Police Act and prepares its budget.",src:VIC_S.pb,k:"o_vicpd"},
  {role:"Greater Victoria Public Library Board",name:null,what:"Governs the regional library the City helps fund.",src:VIC_S.fp,k:"o_gvpl"},
  ...VIC_OUT.filter(o=>o.kind==="advisory").map(o=>({role:o.name,name:null,what:o.desc||"Advises Council. See its page for mandate and membership.",src:VIC_S[o.src]}))];
const VCC_LOG=[
  ["2026-10-17","ret","Chris Coleman","Citywide (at large)","inc",null,"Did not seek re-election"],
  ["2026-10-17","def","Susan Kim","Citywide (at large)","inc",null,"Ran for re-election; not elected"],
  ["2026-10-17","def","Krista Loughton","Citywide (at large)","inc",null,"Ran for re-election; finished 9th, 20 votes behind 8th"],
  ["2026-10-17","new","Jack Sandor","Citywide (at large)",null,"new","Elected to Council for the first time"],
  ["2026-10-17","new","Melissa Cseszko","Citywide (at large)",null,"new","Elected to Council for the first time"],
  ["2026-10-17","new","Wendy Bowkett","Citywide (at large)",null,"new","Elected to Council for the first time"]];
const vccFmt=n=>n==null?"—":n.toLocaleString("en-CA");
const vccMoney=n=>"$"+(n>=1e7?(n/1e6).toFixed(1)+"M":(n/1e6).toFixed(2)+"M");
const vccScoreBtn=(tab,label)=>`<button class="chipbtn vcc-score" data-tab="${tab}">${label} →</button>`;
function vccPerson(m,D,G){
  const p=VCC_PEOPLE[m.name]||[], mayor=m.name==="Marianne Alto", gr=G[m.group];
  const head=`<div class="pband" style="--pc:${gr.color}"></div><div class="who"><div class="ava" style="--pc:${gr.color}" aria-hidden="true">${initials(m.name)}</div><div class="who-t"><div class="kicker">${mayor?"Mayor of Victoria · chairs Council":"Councillor"}${m.group==="new"?' <span class="newtag">NEW</span>':""}</div><h2>${m.name}</h2><div class="party"><i style="background:${gr.color}"></i><span>No party label (municipal) · elected citywide</span></div></div></div>`;
  const stats=`<div class="statgrid"><div class="stat"><b>${vccFmt(p[3])}</b><span>2026 votes</span></div><div class="stat"><b>${vccFmt(p[2])}</b><span>2022 votes</span></div><div class="stat"><b>${p[4]||"—"}</b><span>2026 result</span></div></div>`;
  const role=mayor?ROLE.vic_mayor.text:ROLE.vic_council.text;
  return head+stats+(p[5]?`<div class="note">${p[5]}</div>`:"")
    +`<div class="role"><div class="kicker">About this role</div><p>${role}</p>${srcA(mayor?VIC_S.roles:VIC_S.roles)}</div>`
    +(mayor?`<h3>Also sits on</h3><ul class="list"><li class="item"><span class="nm">Capital Regional District Board</span><span class="rl">Automatic appointment</span></li></ul>`:"")
    +`<div class="note">Council decides as a body. The scorecard reports on Council's progress on the 2023–2026 Strategic Plan as a whole.</div>`
    +vccScoreBtn("card","Council Scorecard 2024–2026")+srcA(VCC_S.buzz)+(p[2]?srcA(VCC_S.e22):"");
}
function vccPanel(key,D){
  const G=D.G, deptLink=o=>`<li class="item"><button class="linkbtn" data-k="o_${o.id}">${o.name}</button><span class="rl">${o.heads[0]?o.heads[0].name+" · ":""}${o.budget?vccMoney(o.budget)+" in 2026":""}</span></li>`;
  if(!key) return `<div class="kicker">Start here</div><details class="flowdd"><summary><span><h2>How power flows in Victoria</h2><span class="ddhint">Click to see the five steps</span></span><span class="ddarrow" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6l4 4 4-4"/></svg></span></summary>
    <ol class="steps"><li><b>Voters</b> citywide elect a Mayor and eight councillors every four years. There are no wards and no parties. The last election was October 17, 2026.</li>
     <li>The <b>Mayor</b> chairs Council and is the City's chief executive officer, but casts one vote like every councillor. Council decides by majority.</li>
     <li><b>Council</b> sets policy, service levels, taxes and the Financial Plan. Councillors don't run departments.</li>
     <li>Council appoints the <b>City Manager</b>, its only direct employee, who runs the City's departments through their directors.</li>
     <li>The <b>Police Board</b>, not Council, oversees the Victoria Police Department. Council funds it.</li></ol></details>
    <h3>Key roles</h3><ul class="list"><li class="item"><button class="linkbtn" data-k="premier">Marianne Alto</button><span class="rl">Mayor</span></li><li class="item"><button class="linkbtn" data-k="sec">Jocelyn Jenkyns</button><span class="rl">City Manager</span></li><li class="item"><button class="linkbtn" data-k="lg">Victoria voters</button><span class="rl">Elect the Mayor and Council</span></li></ul>
    <div class="note">Hover or tap anything. Pick a department to see who runs it and its 2026 budget.</div>${vccScoreBtn("card","Council Scorecard 2024–2026")}${srcA(VCC_S.elec)}`;
  if(key==="premier") return vccPerson(D.prem,D,G);
  if(/^m\d+$/.test(key)) return vccPerson(D.mpps[+key.slice(1)],D,G);
  const mn=D.mins.find(x=>x.id===key); if(mn) return vccPerson(mn.mpp,D,G);
  if(key==="lg") return `<div class="kicker">Who Council answers to</div><h2>Victoria voters</h2><div class="lede">Every eligible voter in the city votes for the Mayor and for up to eight councillors. There are no wards.</div>
    <div class="statgrid"><div class="stat"><b>41.44%</b><span>Turnout, Oct 17 2026</span></div><div class="stat"><b>31,281</b><span>Ballots cast</span></div><div class="stat"><b>62%</b><span>Yes to amalgamation with Saanich (non-binding)</span></div></div>
    <div class="note">Saanich voters said no (68%), so amalgamation isn't proceeding on this vote.</div>${srcA(VCC_S.elec)}${srcA(VCC_S.amal)}`;
  if(key==="sec") return `<div class="kicker">Public service · appointed by Council</div><h2>Jocelyn Jenkyns</h2><div class="lede">${ROLE.vic_cm.text}</div>
    <div class="statgrid" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="stat"><b>${D.ministries.filter(o=>!["vicpd","gvpl"].includes(o.id)).length}</b><span>Departments</span></div><div class="stat"><b>$1.28M</b><span>City Manager's Office, 2026</span></div></div>
    <h3>Oversees</h3><ul class="list">${D.ministries.filter(o=>!["vicpd","gvpl"].includes(o.id)).map(deptLink).join("")}</ul>
    <div class="note">Public servants are non-partisan, so there is no colour here.</div>${srcA(VIC_S.cao)}${srcA(VIC_S.ar)}`;
  if(key==="officers") return `<div class="kicker">Oversight and advice</div><h2>Boards & committees</h2><div class="lede">Two governing boards the City funds, and the advisory bodies that report to Council.</div>
    <ul class="list">${VCC_BOARDS.map(b=>`<li class="item">${b.k?`<button class="linkbtn" data-k="${b.k}">${b.role}</button>`:`<span class="nm">${b.role}</span>`}<span class="rl">${b.what}</span>${srcA(b.src)}</li>`).join("")}</ul>`;
  if(key.startsWith("o_")){ const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key); if(!o) return null;
    if(o.id==="cow") return `<div class="kicker">Council</div><h2>Council as a whole</h2><div class="lede">The Mayor and all eight councillors deciding together. Council directs the City Manager as a body, not member by member.</div>
      <div class="statgrid" style="grid-template-columns:minmax(0,1fr)"><div class="stat"><b>$945,240</b><span>2026 Council budget</span></div></div>
      <h3>Appoints and directs</h3><ul class="list"><li class="item"><button class="linkbtn" data-k="sec">Jocelyn Jenkyns</button><span class="rl">City Manager</span></li></ul>${srcA(VIC_S.fp)}`;
    const board=o.id==="vicpd"?"Victoria and Esquimalt Police Board":o.id==="gvpl"?"Greater Victoria Public Library Board":null;
    return `<div class="kicker">${board?"Funded by the City · governed by a board":"City department · reports to the City Manager"}</div><h2>${o.name}</h2>
      ${o.budget?`<div class="statgrid" style="grid-template-columns:minmax(0,1fr)"><div class="stat"><b>${moneyFull(o.budget)}</b><span>2026 operating budget${board?" (City of Victoria share)":""}</span></div></div>`:""}
      ${o.lines?`<div class="bars">${o.lines.map(l=>`<div class="bar"><span>${l[0]}</span><span class="amt">${vccMoney(l[1])}</span><div class="track"><div class="fill" style="width:${(l[1]/o.budget*100).toFixed(1)}%"></div></div></div>`).join("")}</div>`:""}
      <h3>${o.heads.length>1?"Leadership":"Head"}</h3>${o.heads.length?`<ul class="list">${o.heads.map(x=>`<li class="item"><span class="nm">${x.name}</span><span class="rl">${x.role}</span>${x.also?`<span class="src">${x.also}</span>`:""}</li>`).join("")}</ul>`:`<p class="muted">Not covered by the sources used here.</p>`}
      <h3>Answers to</h3><ul class="list"><li class="item">${board?`<button class="linkbtn" data-k="officers">${board}</button>`:`<button class="linkbtn" data-k="sec">Jocelyn Jenkyns</button><span class="rl">City Manager</span>`}</li></ul>
      ${o.note?`<div class="note">${o.note}</div>`:""}${vccScoreBtn("y26","All 2026 budget lines")}${srcA(VIC_S.fp)}${srcA(VIC_S.ar)}`; }
  return null;
}
const VCC_CFG={id:"victoria",pre:"vc",region:"Victoria",capital:"Victoria City Hall",gov:"inc",govName:"Council",
  MIN:VCC_MIN,OUT:VCC_OUT,execId:"cow",execLabel:"Council as a whole",
  LG:{name:"Victoria voters",title:"Elect the Mayor and eight councillors every four years",src:VIC_S.elec},crown:"Victoria voters",crownSub:"ELECT ALL 9",crownLbl:"Elect, every four years",
  OFFICERS:VCC_BOARDS,offLbl:"Boards & committees",offSub:"OVERSIGHT AND ADVICE",S:VCC_S,
  minTitle:"Departments & services",minNoun:"Department",minSub:"Run by directors who report to the City Manager. Police and library are governed by boards.",
  dirLbl:"Council directs staff through the City Manager",cabTitle:"Council",cabCount:"councillors",
  cabSub:"Elected citywide. Council decides as a body; councillors don't run departments.",
  premier:{name:"Marianne Alto",place:"Citywide",lede:""},headWord:"Mayor",choosesLbl:["Chairs","Council"],
  confLbl:["Elected citywide;","chairs Council"],spkWord:"MAYOR · CHAIR",
  sec:{name:"Jocelyn Jenkyns",title:"City Manager (Chief Administrative Officer)",l1:"City Manager",l2:"COUNCIL APPOINTS",src:VIC_S.cao,lede:""},
  title:"Victoria City Council",sub:"Mayor and 8 councillors, elected at large",
  seats:VCC_SEATS,T:(x,y)=>[x,y],isGov:()=>true,rowOf:()=>1,chair:VCC_SEATS["Marianne Alto"],spkLabel:"above",spkLabelSide:-1,
  aisle:[-470,-300,-150,120],table:[-385,-20],noSides:true,cx:-385,titleX:-385,titleY:-330,bot:225,lineX:[-575,-195],deskW:56,deskH:48,
  confPath:(m,px,py)=>({d:`M${m.px+28},${m.py} C${m.px+120},${m.py} ${px-150},${py} ${px-76},${py}`,lx:-330,ly:-232}),
  noPlan:true,planNote:"Desk positions are illustrative: the City doesn't publish a seating plan. Outlined desks are new members.",
  foldNote:"Council from the Oct 17, 2026 preliminary results. Departments and budgets from the 2026–2030 Financial Plan and the 2025 Annual Report.",
  searchPh:"Search a councillor, department or director",memberWord:"Councillor",
  foldLeft:[["The room on the left","is Victoria City Council. Each dot is an elected member. The Mayor sits in the chair; outlined desks are new members."],
    ["The Mayor","chairs Council and is the City's chief executive officer, with one vote like each councillor."],
    ["Council","sets policy, taxes and the budget as a body. Councillors don't run departments."],
    ["Departments","are run by directors who report to the City Manager, Council's only direct employee."]],
  foldRight:[["Point at","or tap any dot, name or box to see who it is."],["Click a department","to see its head, 2026 budget and who it answers to."],["Click the City Manager","to trace every department that reports to her."],["Search","for any councillor, department or director."]],
  focusMap:{hub:"premier",cm:"sec",cow:"o_cow",pboard:"officers",lboard:"officers",crd:"premier",adp:"officers",hap:"officers",bov:"officers",aac:"officers",rac:"officers",wca:"officers",aipp:"officers",o_adp:"officers",o_hap:"officers",o_bov:"officers",o_aac:"officers",o_rac:"officers",o_wca:"officers",o_aipp:"officers"},
  deptRel:o=>o.id==="vicpd"||o.id==="gvpl"?["officers"]:["sec"],
  tipHTML:(d,D)=>{ if(d.type==="mpp"||d.type==="minister"){ const m=d.type==="mpp"?d.m:d.m.mpp, p=VCC_PEOPLE[m.name]||[]; return `<b>${m.name}</b><span>${m.name==="Marianne Alto"?"Mayor":"Councillor"} · ${vccFmt(p[3])} votes in 2026</span><span>${p[4]||""}</span>`; }
    if(d.type==="premier") return `<b>Marianne Alto</b><span>Mayor of Victoria · chairs Council</span>`;
    if(d.type==="lg") return `<b>Victoria voters</b><span>41.44% turnout on Oct 17, 2026</span>`;
    if(d.type==="officers") return `<b>Boards & committees</b><span>Police Board, Library Board and ${VCC_BOARDS.length-2} advisory bodies</span>`;
    if(d.type==="ministry") return `<b>${d.o.name}</b><span>${d.o.heads.length?d.o.heads.map(x=>x.name).join(", "):""}${d.o.budget?" · "+vccMoney(d.o.budget)+" in 2026":""}</span>`;
    return ""; },
  panelHTML:vccPanel,
  afterPanel:el=>el.querySelectorAll(".vcc-score").forEach(b=>b.onclick=()=>vicGoScore(b.dataset.tab)),
  aboutHTML:`<section class="nsec"><div class="kicker">About Council</div><h2 class="nh">What Victoria City Council does</h2>
    <div class="does">
     <div><b>Sets direction</b><span>Council adopts the Strategic Plan, the Official Community Plan and City policies.</span></div>
     <div><b>Controls the money</b><span>Council adopts the five-year Financial Plan each spring and sets property tax rates.</span></div>
     <div><b>Makes bylaws</b><span>Zoning, business licensing, parking, noise and other local rules are passed as bylaws.</span></div>
     <div><b>Hires the City Manager</b><span>Council's only direct employee, who runs the administration.</span></div>
     <div><b>Represents the city</b><span>The Mayor also sits on the Capital Regional District Board.</span></div></div>
    <div class="who4"><span><b>Mayor</b> chairs Council; one vote</span><span><b>Councillors</b> 8, elected citywide</span><span><b>City Manager</b> runs the administration</span><span><b>Police Board</b> oversees VicPD</span></div><span class="src">Source: <a href="${VIC_S.roles[1]}" target="_blank" rel="noopener">${VIC_S.roles[0]}</a></span></section>`,
  after:el=>{ el.insertAdjacentHTML("afterbegin",vicSwitch("victoria")); vicSwitchWire(el); const hg=el.querySelector(".hgrid"); if(hg) hg.insertAdjacentHTML("afterend",vscElectionHTML()); },
  geYear:"2022",LOG:VCC_LOG,logSrcs:[VCC_S.buzz,VCC_S.e22]};
pvWire(VCC_CFG);

/* Victoria: two pages. Who = Council chamber (#victoria). What & when = scorecard (#vicscore). */
function vicSwitch(cur){
  const b=(id,k,t,sub)=>`<button class="vsw ${cur===id?"on":""}" data-go="${id}" ${cur===id?'aria-current="page"':""}><span class="vswk">${k}</span><b>${t}</b><span class="vsws">${sub}</span></button>`;
  return `<nav class="vswitch" aria-label="City of Victoria pages">${b("victoria","City of Victoria","City Council","Mayor, councillors, City Manager, departments, election results")}${b("vicscore","City of Victoria","Scorecard","Plans, budgets and results, 2024–2026")}</nav>`;
}
function vicSwitchWire(el){ el.querySelectorAll(".vswitch [data-go]").forEach(b=>b.onclick=()=>{ if(!b.classList.contains("on")){ show(b.dataset.go); window.scrollTo(0,0); } }); }
function vicGoScore(tab){ show("vicscore"); const v=document.getElementById("vicscore"); if(v&&v._pick&&tab) v._pick(tab); window.scrollTo(0,0); }
function renderVicScorePage(){
  const el=document.getElementById("ch-vicscore"); if(!el) return;
  if(!el.dataset.built){ el.innerHTML=vicSwitch("vicscore")+`<section id="vicscore" class="nsec vicscore" aria-label="City of Victoria accountability scorecard"></section>`; vicSwitchWire(el); renderVicScore(); el.dataset.built="1"; }
}
