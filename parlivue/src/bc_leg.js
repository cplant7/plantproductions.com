/* ================= BRITISH COLUMBIA: LEGISLATIVE ASSEMBLY (in transition) ================= */
const BC_RES_SRC=["BC Ballot: 2026 initial count by riding (Oct 26 2026)","https://bcballot.ca/results/"];
const BC_ODC_SRC=["Open Data Canada: BC election 2026 results (Oct 27 2026)","https://opendatacanada.ca/articles/bc-election-2026-results"];
const BC_WIKI_SRC=["Wikipedia: 2026 British Columbia general election","https://en.wikipedia.org/wiki/2026_British_Columbia_general_election"];
const BC_GE24={con:44,ndp:47,grn:2};
const BC_LG={name:"Wendy Lisogar-Cocchia",title:"Lieutenant Governor of British Columbia",since:"January 30, 2025",src:["Wikipedia: Lieutenant Governor of British Columbia","https://en.wikipedia.org/wiki/Lieutenant_Governor_of_British_Columbia"]};
const BC_OFF_SRC=["Legislative Assembly of BC: Statutory officers","https://www.leg.bc.ca/learn/discover-your-legislature/statutory-officers"];
const BC_OFFICERS=[
 {role:"Auditor General",name:"Bridget Parrish",what:"Audits how government spends public money. Sworn in December 1, 2025.",src:["Office of the Auditor General of BC","https://www.oag.bc.ca/"]},
 {role:"Ombudsperson",name:"Sandy Hermiston",what:"Investigates complaints about unfair treatment by public bodies. Six-year term from January 31, 2026.",src:["Wikipedia: BC Ombudsperson","https://en.wikipedia.org/wiki/British_Columbia_Ombudsperson"]},
 {role:"Information and Privacy Commissioner",name:"Michael Harvey",what:"Oversees access-to-information and privacy laws. Appointed May 2024 for six years.",src:["OIPC BC: The Commissioner","https://www.oipc.bc.ca/about/commissioner/"]},
 {role:"Representative for Children and Youth",name:"Jennifer Charlesworth",what:"Advocates for young people and reviews services for children and families.",src:["Representative for Children and Youth","https://www.rcybc.ca/"]},
 {role:"Human Rights Commissioner",name:"Kasari Govender",what:"Works to prevent discrimination and promote human rights in BC.",src:["BC's Office of the Human Rights Commissioner","https://bchumanrights.ca/"]},
 {role:"Police Complaint Commissioner",name:"Prabhu Rajan",what:"Oversees complaints and investigations about municipal police.",src:["Office of the Police Complaint Commissioner","https://opcc.bc.ca/"]},
 {role:"Chief Electoral Officer",name:null,what:"Heads Elections BC, which is running the final count for the October 24, 2026 election.",src:["Legislative Assembly of BC: Chief Electoral Officer","https://www.leg.bc.ca/learn/discover-your-legislature/statutory-officers/chief-electoral-officer"]},
 {role:"Conflict of Interest Commissioner",name:null,what:"Advises MLAs on conflicts of interest and investigates complaints.",src:["Legislative Assembly of BC: Conflict of Interest Commissioner","https://www.leg.bc.ca/learn/discover-your-legislature/statutory-officers/coi-commissioner"]}
];
const BC_TIMELINE=[
 ["2026-10-24","Election day","Snap general election for all 93 seats."],
 ["2026-10-26","Initial count complete","Conservatives lead in 63 ridings, the NDP in 28 and the Greens in 2. Some outlets report 64–27 after later updates."],
 ["2026-11-06","Final count begins","Elections BC counts absentee and mail-in ballots and recounts close races, including Ladysmith-Oceanside (13-vote margin), through November 10."],
 ["2026-11-18","Results returned","Members are declared elected. Lorne Doerkson can then be sworn in as Premier with a new Cabinet."]
];
CH.bcleg={id:"bcleg",title:"Legislative Assembly of British Columbia",fr:"Assemblée législative de la Colombie-Britannique",kicker:"",rows:5,memberNoun:"MLA",placeNoun:"Riding",
  groups:{con:{name:"Conservative Party of British Columbia",short:"CON",color:"var(--p-con)"},ndp:{name:"BC New Democratic Party",short:"NDP",color:"var(--p-ndp)"},grn:{name:"BC Green Party",short:"GRN",color:"var(--p-grn)"}},
  order:["con","ndp","grn"],govSide:["con"],oppSide:["ndp","grn"],speaker:"(none yet)",majority:47,gov:"con",ge:BC_GE24,geLabel:"October 19, 2024 election",
  roles:[["Premier (caretaker)","David Eby"],["Premier-designate","Lorne Doerkson"]],
  approx:"Members-elect from the initial count, not yet certified. Seats are grouped by party, with the incoming government on the Speaker's right. The Legislature will publish a seating plan after members are sworn in.",
  src:BC_RES_SRC};
CH.bcleg.members=BC_ELECT_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:BC_MIN.some(m=>m.name===n),sort:n,group:p,place:r}; });
CH.bcleg.map={svg:"#bm-svg",panelId:"bm-panel",stageId:"bm-stage",st:()=>BM,panel:k=>bmPanel(k),hl:k=>bmHighlight(k),select:(k,z)=>bmSelect(k,z),key:i=>bmKeyForMpp(i)};
CH.bcleg.summary=(c,total)=>{ const gov=c.con||0;
  return [`<div class="hsub"><span class="majtag">Conservative majority · preliminary</span> <b>${gov}</b> seats · ${gov-47} more than the 47 needed</div>`,
   `<div class="majbtn static"><span class="kicker">Status</span><span class="bign" style="font-size:34px">In transition</span><span class="src">Results are certified on November 18. Until a new Premier is sworn in, David Eby's NDP Cabinet stays in office as a caretaker government.</span></div>
    <dl class="kv"><dt>Premier (caretaker)</dt><dd>David Eby</dd><dt>Premier-designate</dt><dd>Lorne Doerkson</dd><dt>Final count</dt><dd>Nov 6–10, 2026</dd><dt>Results returned</dt><dd>Nov 18, 2026</dd></dl>`]; };

function renderBcLeg(){
  const C=CH.bcleg, st=chState.bcleg, el=document.getElementById("ch-bcleg");
  if(!st.built){
    el.innerHTML=`<section class="hsum" id="bcleg-sum"></section>
     <div class="banner bcban"><p>${BC_TRANSITION.text.replace("This wheel shows","This page shows")}</p><div class="src">Sources: ${BC_TRANSITION.srcs.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join(" · ")}</div></div>
     <section class="nsec pmwrap"><div class="kicker">Power map · Victoria, BC</div><h2 class="nh pmtitle">Elected Officials</h2>
       ${foldHTML("bc-fold","How to read this map","What each part means and how to explore it",
         [["The room on the left","shows the 93 members just elected. Each dot is one MLA, a person voters chose to speak for their area. The colour shows their party."],
          ["The Premier","is the leader of the government. Right now David Eby stays on as caretaker until the winner, Lorne Doerkson, is sworn in."],
          ["Cabinet","is the Premier's team. This is still Eby's Cabinet. Some ministers did not win a seat, so they have no dot in the room."],
          ["Ministries","are the departments that do the work, like Health or Forests. A deputy minister runs each one every day."]],
         [["Point at","or tap any dot, name or box to see who it is."],["Click a minister","to see their ministry and, if they were re-elected, their seat."],["Click a ministry","to see who is in charge of it."],["Search","for any MLA, riding, minister or ministry. Details appear in the box under the map."]],
         "Members-elect from the initial count (not yet certified). Cabinet and deputy ministers from the Government of BC.")}
       <div id="bm-slot"></div>
       <div class="src">${C.approx}</div></section>
     <div class="hgrid"><div class="hmain"><section class="nsec"><div class="kicker">About the Legislature</div><h2 class="nh">What the Legislative Assembly does</h2>
        <div class="does">
         <div><b>Forms the government</b><span>The leader who can win the support of most MLAs becomes Premier and picks Cabinet. That is usually the leader of the party with the most seats.</span></div>
         <div><b>Makes laws</b><span>Bills are debated here and in committees, then need Royal Assent from the Lieutenant Governor. BC has no upper house.</span></div>
         <div><b>Holds the government to account</b><span>Opposition MLAs question ministers, most visibly in daily Question Period.</span></div>
         <div><b>Controls the money</b><span>Budgets, spending estimates and taxes must be approved by the Assembly.</span></div>
         <div><b>Represents British Columbians</b><span>Each of the 93 MLAs speaks for one riding.</span></div>
        </div>
        <div class="who4"><span><b>Speaker</b> elected by MLAs when the new Legislature first meets</span><span><b>Cabinet</b> leads ministries; front bench</span><span><b>Opposition</b> questions and proposes alternatives</span><span><b>Backbenchers</b> most MLAs; debate and sit on committees</span></div>
       </section></div>
       <div class="hside">${ridingCard("bc")}<section class="nsec"><div class="lgh"><h2 class="nh">Transition timeline</h2></div>
        <ol class="hlog">${BC_TIMELINE.map(([d,t,x])=>`<li class="lgi"><button tabindex="-1"><span class="lg-t"><b>${t}</b><span class="muted">${fmtDate(d)} · ${x}</span></span></button></li>`).join("")}</ol>
        ${srcA(BC_RES_SRC)}${srcA(BC_ODC_SRC)}${srcA(BC_WIKI_SRC)}</section></div></div>`;
    renderBcMap(); wireFold("bc-fold");
    st.built=true;
  }
  chSummary(C); chProfile(C); chList(C);
}
