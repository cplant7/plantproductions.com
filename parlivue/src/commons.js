/* ================= HOUSE OF COMMONS ================= */
const FPARTY={
 lib:{name:"Liberal",short:"LIB",color:"var(--p-lib)"}, cpc:{name:"Conservative",short:"CPC",color:"var(--p-cpc)"}, bq:{name:"Bloc Québécois",short:"BQ",color:"var(--p-bq)"},
 fndp:{name:"NDP",short:"NDP",color:"var(--p-fndp)"}, grn:{name:"Green",short:"GRN",color:"var(--p-grn)"}, ind:{name:"Independent",short:"IND",color:"var(--p-ind)"}, vac:{name:"Vacant",short:"VAC",color:"var(--p-vac)"}
};
const HOC_ORDER=["lib","cpc","bq","fndp","grn","vac"];
const ROLEH_SRC=["Learn about Parliament: The role of the House of Commons","https://learn.parl.ca/understanding-comprendre/en/how-parliament-works/the-role-of-the-house-of-commons/"];
const HOC_SRC=["House of Commons: Current constituencies","https://www.ourcommons.ca/members/en/constituencies"];
const PLAN_SRC=["House of Commons: Seating plan","https://www.ourcommons.ca/members/en/floorplan"];
const P45_SRC=["Wikipedia: 45th Canadian Parliament","https://en.wikipedia.org/wiki/45th_Canadian_Parliament"];
const GE25_SRC=["Wikipedia: 2025 Canadian federal election","https://en.wikipedia.org/wiki/2025_Canadian_federal_election"];
const BYE_SRC=["CBC News: Aug 31 2026 by-elections","https://www.cbc.ca/news/politics/livestory/live-updates-byelection-chicoutimi-le-fjord-vancouver-capilano-beaches-east-york-9.7327074"];
const GE25={lib:169,cpc:144,bq:22,fndp:7,grn:1,vac:0};
// Ridings whose holder changed party since the April 28, 2025 election (all others: same party as today)
const GE25_DIFF={"Acadie—Annapolis":"cpc","Markham—Unionville":"cpc","Edmonton Riverbend":"cpc","Nunavut":"fndp","Sarnia—Lambton—Bkejwanong":"cpc","Chicoutimi—Le Fjord":"cpc",
 "Brantford—Brant South":"cpc","Laurier—Sainte-Marie":"lib","Rosemont—La Petite-Patrie":"fndp","Saint-Hyacinthe—Bagot—Acton":"bq","Scarborough North":"lib","Yorkton—Melville":"cpc"};
const HOC_ROLES=[
 ["Speaker","Francis Scarpaleggia"],["Prime Minister","Mark Carney"],["Leader of the Opposition","Pierre Poilievre"],
 ["Government House Leader","Steven MacKinnon"],["Opposition House Leader","Andrew Scheer"],["Chief Government Whip","Mark Gerretsen"],
 ["Opposition Whip","Chris Warkentin"],["Bloc Québécois leader","Yves-François Blanchet"],["Green Party leader","Elizabeth May"]
];
// Changes log: [date, kind, name, riding, from, to, note, src]
const HOC_LOG=[
 ["2026-08-31","bye","Daniel Gobeil","Chicoutimi—Le Fjord","cpc","lib","By-election: Liberal gain from Conservative",BYE_SRC],
 ["2026-08-31","bye","Braeden Caley","North Vancouver—Capilano","lib","lib","By-election: Liberal hold",BYE_SRC],
 ["2026-08-31","bye","Tanveer Shahnawaz","Beaches—East York","lib","lib","By-election: Liberal hold",BYE_SRC],
 ["2026-07-07","vac","Richard Martel","Chicoutimi—Le Fjord","ind","vac","Resigned on appointment to the Senate",P45_SRC],
 ["2026-07-07","cross","Richard Martel","Chicoutimi—Le Fjord","cpc","ind","Left the Conservative caucus",P45_SRC],
 ["2026-07-07","vac","Nate Erskine-Smith","Beaches—East York","lib","vac","Resigned the seat",P45_SRC],
 ["2026-06-19","vac","Jonathan Wilkinson","North Vancouver—Capilano","lib","vac","Resigned the seat",P45_SRC],
 ["2026-06-19","vac","Simon-Pierre Savard-Tremblay","Saint-Hyacinthe—Bagot—Acton","ind","vac","Resigned the seat",P45_SRC],
 ["2026-05-28","cross","Simon-Pierre Savard-Tremblay","Saint-Hyacinthe—Bagot—Acton","bq","ind","Left the Bloc caucus",P45_SRC],
 ["2026-04-27","cross","Alexandre Boulerice","Rosemont—La Petite-Patrie","fndp","ind","Left to run provincially in Quebec",P45_SRC],
 ["2026-04-13","bye","Danielle Martin","University—Rosedale","lib","lib","By-election: Liberal hold",P45_SRC],
 ["2026-04-13","bye","Doly Begum","Scarborough Southwest","lib","lib","By-election: Liberal hold",P45_SRC],
 ["2026-04-13","bye","Tatiana Auguste","Terrebonne","lib","lib","By-election after the 2025 result was annulled",P45_SRC],
 ["2026-04-08","cross","Marilyn Gladu","Sarnia—Lambton—Bkejwanong","cpc","lib","Crossed the floor",P45_SRC],
 ["2026-03-10","cross","Lori Idlout","Nunavut","fndp","lib","Crossed the floor",P45_SRC],
 ["2026-02-18","cross","Matt Jeneroux","Edmonton Riverbend","cpc","lib","Crossed the floor",P45_SRC],
 ["2026-02-02","vac","Bill Blair","Scarborough Southwest","lib","vac","Resigned the seat",P45_SRC],
 ["2026-01-09","vac","Chrystia Freeland","University—Rosedale","lib","vac","Resigned the seat",P45_SRC],
 ["2025-12-11","cross","Michael Ma","Markham—Unionville","cpc","lib","Crossed the floor",P45_SRC],
 ["2025-11-04","cross","Chris d'Entremont","Acadie—Annapolis","cpc","lib","Crossed the floor",P45_SRC],
 ["2025-08-18","bye","Pierre Poilievre","Battle River—Crowfoot","cpc","cpc","By-election: Conservative hold",P45_SRC],
 ["2025-06-17","vac","Damien Kurek","Battle River—Crowfoot","cpc","vac","Resigned so the party leader could run",P45_SRC]
];
const HOC_UNDATED_VAC=[["Larry Brock","Brantford—Brant South","cpc"],["Steven Guilbeault","Laurier—Sainte-Marie","lib"],["Shaun Chen","Scarborough North","lib"],["Cathay Wagantall","Yorkton—Melville","cpc"]];
const PROVS=["BC","AB","SK","MB","ON","QC","NB","NS","PE","NL","YT","NT","NU"];
const PROVNAME={BC:"British Columbia",AB:"Alberta",SK:"Saskatchewan",MB:"Manitoba",ON:"Ontario",QC:"Quebec",NB:"New Brunswick",NS:"Nova Scotia",PE:"Prince Edward Island",NL:"Newfoundland and Labrador",YT:"Yukon",NT:"Northwest Territories",NU:"Nunavut"};
const seats=HOC_SEATS.map((s,i)=>({i,riding:s[0],prov:s[1],mp:s[2],party:s[3],ge:GE25_DIFF[s[0]]||s[3]}));
const fedMinisterByName={}; ministers.forEach(m=>fedMinisterByName[m.name.replace("Julie Aviva Dabrusin","Julie Dabrusin")]=m);
const roleByName={}; HOC_ROLES.forEach(([r,n])=>(roleByName[n] ||= []).push(r));
const sosByName={}; secretaries.forEach(s=>sosByName[s[0]]="Secretary of State ("+s[1]+")");
let hocHi=null; let hocPanel=null; let hocSel=null, hocBuilt=false, hocMode="plan", coalition=new Set(["lib"]), hocFocusParty=null, hocLogFilter="all";
const commonsEl=document.getElementById("commons");
const RM=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const COLS=30, STEP=30, PAIRGAP=10, AISLE=48, X0=-370, RSTEP=35;
const rowY=r=>AISLE+r*RSTEP+r*(r+1)*1.6;  // tiered: gaps widen toward the back rows
const colX=ci=>X0+ci*STEP+Math.floor(ci/2)*PAIRGAP;  // desks are shared in pairs: chairs 1–2, 3–4, …
const ROWW=colX(COLS-1)-X0;
const pchip=p=>`<span class="pchip" style="--pc:${FPARTY[p].color}">${FPARTY[p].short}</span>`;
let hz, hzG, rotG, hocRot=0; const LABELS=[];

function deskLayout(){
  HOC_DESKS.forEach((row,ri)=>{ const opp=ri<6, r=opp?ri:ri-6, side=opp?-1:1;
    row.forEach(([si,changed,prev],ci)=>{ const s=seats[si]; s.px=colX(ci); s.py=side*rowY(r); s.desk=Math.floor(ci/2)+1; s.side=opp?"opp":"gov"; s.row=r+1; s.chair=ci+1;
      s.deskNote = changed ? (s.party==="vac" ? `Vacant since ${prev} left. The published plan still shows ${prev} at this desk.` : `Won this riding after ${prev} left; shown at ${prev}'s desk, which the published plan has not updated.`)
        : (opp && s.party==="lib") ? "Now a Liberal. The published plan still shows this desk on the opposition side." : ""; }); });
  const sp=seats[HOC_SPEAKER]; sp.px=X0-78; sp.py=0; sp.side="speaker";
}
function coalitionLayout(){
  // government desks front-to-back, Speaker's end first; opposition likewise
  const gov=[], opp=[];
  for(let r=0;r<6;r++) for(let c=0;c<COLS;c++){ gov.push([colX(c), rowY(r)]); opp.push([colX(c), -rowY(r)]); }
  const govCap=HOC_DESKS.slice(6).reduce((a,r)=>a+r.length,0);
  const rank=s=>(HOC_ORDER.indexOf(s.party)*1000)+(fedMinisterByName[s.mp]?0:500)+(s.prov.charCodeAt(0));
  const members=seats.filter(s=>s.i!==HOC_SPEAKER);
  const inC=members.filter(s=>coalition.has(s.party)).sort((a,b)=>rank(a)-rank(b));
  const outC=members.filter(s=>!coalition.has(s.party)).sort((a,b)=>rank(a)-rank(b));
  const govSlots=gov.slice(0,govCap), oppSlots=opp.slice(0,343-1-govCap);
  // government benches first; overflow takes the far (Bar) end of the other side
  const forIn=[...govSlots, ...[...oppSlots].reverse()];
  inC.forEach((s,k)=>{ const p=forIn[k]; s.cx=p[0]; s.cy=p[1]; });
  const used=new Set(inC.map(s=>s.cx+","+s.cy));
  const forOut=[...oppSlots, ...[...govSlots].reverse()].filter(p=>!used.has(p[0]+","+p[1]));
  outC.forEach((s,k)=>{ const p=forOut[k]; s.cx=p[0]; s.cy=p[1]; });
  const sp=seats[HOC_SPEAKER]; sp.cx=X0-78; sp.cy=0;
}
function seatPos(s){ return hocMode==="plan"?[s.px,s.py]:[s.cx,s.cy]; }

function drawChamber(){
  deskLayout(); coalitionLayout();
  const svgH=d3.select("#hemi"); svgH.selectAll("*").remove();
  hzG=svgH.append("g"); rotG=hzG.append("g"); const g=rotG.append("g"); LABELS.length=0;
  // label helper: positions for landscape [x,y,anchor,base°] and portrait [x,y,anchor] (null = hidden), kept upright when the chamber rotates
  const lab=(parent,text,cls,L,Pt)=>{ const t=parent.append("text").attr("class",cls).text(text); LABELS.push({t,L,P:Pt}); return t; };
  const W=X0+ROWW+22;
  g.append("rect").attr("x",X0-20).attr("y",-AISLE+16).attr("width",ROWW+40).attr("height",2*AISLE-32).attr("rx",8).attr("fill","url(#aisle)");
  const defs=svgH.append("defs");
  const lg=defs.append("linearGradient").attr("id","aisle").attr("x1",0).attr("x2",1);
  lg.append("stop").attr("offset",0).attr("stop-color","var(--ink)").attr("stop-opacity",.08); lg.append("stop").attr("offset",1).attr("stop-color","var(--ink)").attr("stop-opacity",.01);
  const glow=defs.append("filter").attr("id","glow").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%");
  glow.append("feGaussianBlur").attr("stdDeviation",3.2).attr("result","b"); const m=glow.append("feMerge"); m.append("feMergeNode").attr("in","b"); m.append("feMergeNode").attr("in","SourceGraphic");
  g.append("rect").attr("x",X0+10).attr("y",-12).attr("width",150).attr("height",24).attr("rx",4).attr("fill","none").attr("stroke","var(--rule)");
  lab(g,"CLERK'S TABLE","clbl",[X0+85,4,"middle",0],null);
  // Mace rests on the Table; Sergeant-at-Arms sits in front of the Bar on the opposition side
  g.append("rect").attr("x",X0+172).attr("y",-3).attr("width",46).attr("height",6).attr("rx",3).attr("fill","var(--brass)").attr("opacity",.85);
  g.append("circle").attr("cx",X0+220).attr("cy",0).attr("r",5).attr("fill","var(--brass)").attr("opacity",.85);
  lab(g,"MACE","clbl brass",[X0+195,-8,"middle",0],[X0+195,-10,"middle"]);
  g.append("rect").attr("x",W-24).attr("y",-22).attr("width",22).attr("height",16).attr("rx",4).attr("fill","none").attr("stroke","var(--muted)");
  lab(g,"SERGEANT-AT-ARMS","clbl",[W-30,-10,"end",0],null);
  g.append("line").attr("x1",W+8).attr("x2",W+8).attr("y1",-rowY(5)-16).attr("y2",rowY(5)+16).attr("stroke","var(--brass)").attr("stroke-width",2).attr("stroke-dasharray","4 5");
  lab(g,"THE BAR","clbl brass",[W+26,0,"middle",90],[W+26,4,"middle"]);
  lab(g,"GOVERNMENT · SPEAKER'S RIGHT","clbl side",[X0,rowY(5)+38,"start",0],[W+50,rowY(2.5),"middle"]);
  lab(g,"OPPOSITION · SPEAKER'S LEFT","clbl side",[X0,-rowY(5)-28,"start",0],[W+50,-rowY(2.5),"middle"]);
  lab(g,"SPEAKER","clbl brass",[X0-78,-34,"middle",0],[X0-118,4,"middle"]);
  g.append("rect").attr("x",X0-102).attr("y",-24).attr("width",48).attr("height",48).attr("rx",10).attr("fill","none").attr("stroke","var(--brass)").attr("stroke-width",2);
  const deskG=g.append("g").attr("aria-hidden","true"), partyG=g.append("g").attr("aria-hidden","true");
  HOC_DESKS.forEach((row,ri)=>{ const opp=ri<6, r=opp?ri:ri-6, y=(opp?-1:1)*rowY(r);
    const front=r===0, shade=[30,26,23,21,19,17][r];
    if(front){ deskG.append("rect").attr("x",colX(0)-26).attr("y",y-22).attr("width",colX(row.length-1)-colX(0)+52).attr("height",44).attr("rx",12).attr("fill","var(--brass)").attr("fill-opacity",.07).attr("stroke","var(--brass)").attr("stroke-opacity",.45); }
    for(let ci=0;ci<row.length;ci+=2){ const x0=colX(ci)-15, x1=colX(Math.min(ci+1,row.length-1))+15;
      deskG.append("rect").attr("x",x0).attr("y",y-15).attr("width",x1-x0).attr("height",30).attr("rx",9).attr("class","pmdesk").attr("fill",`rgb(${shade},${shade},${shade})`).attr("stroke",front?"var(--brass)":"var(--rule)").attr("stroke-opacity",front?.6:1); }
    // party blocks: outline each run of same-party seats along the row
    let start=0; for(let ci=1;ci<=row.length;ci++){ const p=seats[row[start][0]].party; if(ci===row.length||seats[row[ci][0]].party!==p){
        const x0=colX(start)-18, x1=colX(ci-1)+18, solidSide=(opp?"x":"lib");
        if(!(opp===false&&p==="lib")) partyG.append("rect").attr("x",x0).attr("y",y-18.5).attr("width",x1-x0).attr("height",37).attr("rx",12).attr("fill","none").attr("stroke",FPARTY[p].color).attr("stroke-width",1.4).attr("stroke-opacity",.6);
        start=ci; } }
  });
  lab(deskG,"▲ OPPOSITION FRONT BENCH","clbl brass",[X0+ROWW*0.52,-17,"middle",0],null);
  lab(deskG,"▼ GOVERNMENT FRONT BENCH","clbl brass",[X0+ROWW*0.52,24,"middle",0],null);
  const dots=g.selectAll("g.seatg").data(seats).join("g").attr("class","seatg").attr("transform",s=>{ const [x,y]=seatPos(s); return `translate(${x},${y})`; });
  dots.append("circle").attr("class","seat").attr("r",RM?12.5:0)
    .attr("fill",s=>s.party==="vac"?"transparent":FPARTY[s.party].color).attr("stroke",s=>s.party==="vac"?"var(--muted)":"none").attr("stroke-width",1.5).attr("stroke-dasharray",s=>s.party==="vac"?"2 2":null)
    .attr("tabindex",0).attr("role","button").attr("aria-label",s=>(s.mp||"Vacant seat")+", "+s.riding)
    .on("click",(e,s)=>hocSelect(s.i,true)).on("keydown",(e,s)=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();hocSelect(s.i,true);} })
    .on("mouseenter",function(e,s){ if(!RM) d3.select(this).interrupt("hov").transition("hov").duration(160).attr("r",15.5); showHTip(e,s); })
    .on("mousemove",(e,s)=>showHTip(e,s))
    .on("mouseleave",function(e,s){ if(!RM) d3.select(this).transition("hov").duration(220).attr("r",s.i===hocSel?15.5:12.5); document.getElementById("htip").hidden=true; });
  dots.append("circle").attr("class","flagring").attr("r",15.5).attr("fill","none").attr("stroke","var(--ink)").attr("stroke-width",1.6).attr("stroke-dasharray","3 2.5").attr("opacity",0).attr("pointer-events","none");
  // entrance: seats fill in from the Speaker's end
  if(!RM) dots.select(".seat").transition().delay(s=>s.i===HOC_SPEAKER?0:120+ (seatPos(s)[0]-X0)*1.6 + Math.abs(seatPos(s)[1])*.6).duration(420).ease(d3.easeBackOut.overshoot(1.6)).attr("r",12.5);
  // zoom
  hz=d3.zoom().scaleExtent([1,5]).translateExtent([[-500,-312],[710,312]]).on("zoom",e=>hzG.attr("transform",e.transform));
  svgH.call(hz).on("dblclick.zoom",null);
  hocRot=90; setOrient(90,false); hz.on("zoom.links",()=>drawLinks(FM.hov||FM.sel));
  hocPaint();
}
const VB={0:[-500,-312,1210,624],90:[-312,-524,624,1250]};
function rotPt([x,y]){ return hocRot===90?[-y,x]:[x,y]; }
function placeLabels(dur){
  LABELS.forEach(({t,L,P})=>{ const spec=hocRot===90?P:L; const tt=dur?t.transition("rot").duration(dur).ease(d3.easeCubicInOut):t;
    if(!spec){ tt.attr("opacity",0); return; }
    const [x,y,anchor,base]=spec; t.attr("text-anchor",anchor);
    tt.attr("opacity",1).attr("x",x).attr("y",y).attr("transform",`rotate(${(base||0)-hocRot},${x},${y})`); });
}
function setOrient(rot,animate){
  const from=hocRot; hocRot=rot; const dur=animate&&!RM?900:0;
  const svgH=d3.select("#hemi");
  document.getElementById("hstage").classList.toggle("portrait",rot===90);
  svgH.call(hz.transform,d3.zoomIdentity);
  const v0=VB[from], v1=VB[rot];
  hz.translateExtent([[v1[0],v1[1]],[v1[0]+v1[2],v1[1]+v1[3]]]);
  if(dur){ svgH.transition("rot").duration(dur).ease(d3.easeCubicInOut).attrTween("viewBox",()=>t=>v0.map((a,k)=>a+(v1[k]-a)*t).join(" "));
    rotG.transition("rot").duration(dur).ease(d3.easeCubicInOut).attrTween("transform",()=>t=>`rotate(${from+(rot-from)*t})`); }
  else { svgH.attr("viewBox",v1.join(" ")); rotG.attr("transform",`rotate(${rot})`); }
  placeLabels(dur);
  const b=document.getElementById("hrot"); if(b) b.textContent=rot===90?"⟲ Speaker on the side":"⟳ Speaker at the top";
}
function showHTip(e,s){
  const t=document.getElementById("htip");
  t.innerHTML=`<b>${s.mp||"Vacant"}</b><span>${s.riding} · ${s.prov}</span><span class="tparty">${pchip(s.party)} ${s.i===HOC_SPEAKER?"Speaker":s.side==="gov"?"Government side":"Opposition side"}${s.row?` · row ${s.row}, desk ${s.desk} (chair ${s.chair})`:""}</span>${s.deskNote&&hocMode==="plan"?`<span class="twarn">${s.deskNote}</span>`:""}`;
  t.hidden=false; const r=document.getElementById("hstage").getBoundingClientRect(); let lx=e.clientX-r.left+16; if(lx>r.width-280) lx-=300; t.style.left=lx+"px"; t.style.top=(e.clientY-r.top+16)+"px";
}
function hocFilter(){
  const v=id=>{ const e=document.getElementById(id); return e?e.value:""; };
  const q=(v("hq")||"").trim().toLowerCase(), pv=v("hprov"), pt=v("hparty");
  return s=>(!pv||s.prov===pv)&&(!pt||s.party===pt)&&(!q||(s.riding+" "+s.mp).toLowerCase().includes(q));
}
function hocPaint(){
  const f=hocFilter();
  d3.selectAll("#hemi .seat").attr("opacity",s=>{ if(hocHi) return hocHi.has(s.i)?1:.12; if(hocFocusParty&&s.party!==hocFocusParty) return .1; return f(s)?1:.1; })
    .attr("filter",s=>s.i===hocSel?"url(#glow)":null)
    .attr("stroke",s=>s.i===hocSel?"var(--ink)":s.party==="vac"?"var(--muted)":"none").attr("stroke-width",s=>s.i===hocSel?3:1.5);
  if(!RM) d3.selectAll("#hemi .seat").filter(s=>s.i===hocSel).transition("hov").duration(200).attr("r",15.5);
  d3.selectAll("#hemi .flagring").attr("opacity",s=>hocMode==="plan"&&s.deskNote&&!hocFocusParty?.9:0);
}
function moveSeats(){
  const t=d3.selectAll("#hemi .seatg").transition("move").duration(RM?0:950).delay(s=>RM?0:(s.i%60)*6).ease(d3.easeCubicInOut)
    .attr("transform",s=>{ const [x,y]=seatPos(s); return `translate(${x},${y})`; });
  hocPaint();
}
function zoomToSeat(s){
  const svgH=d3.select("#hemi"); const [x,y]=rotPt(seatPos(s)); const k=2.6; const v=VB[hocRot]; const cx=v[0]+v[2]/2, cy=v[1]+v[3]/2;
  svgH.transition().duration(RM?0:750).ease(d3.easeCubicInOut).call(hz.transform, d3.zoomIdentity.translate(cx-x*k,cy-y*k).scale(k));
}

/* ---------- top summary ---------- */
function counts(){ const c={}; seats.forEach(s=>c[s.party]=(c[s.party]||0)+1); return c; }
function renderSummary(){
  const c=counts(), coal=[...coalition].reduce((a,p)=>a+(c[p]||0),0), need=172, maj=coal>=need;
  const others=343-(c.vac||0)-coal;
  const tiles=HOC_ORDER.map(p=>{ const d=(c[p]||0)-(GE25[p]||0); const on=coalition.has(p);
    return `<button class="ptile ${hocMode==="coalition"&&on?"on":""} ${hocFocusParty===p?"focus":""}" data-p="${p}" style="--pc:${FPARTY[p].color}" ${p==="vac"&&hocMode==="coalition"?"disabled":""}>
      <span class="pt-n">${FPARTY[p].short}</span><b>${c[p]||0}</b><span class="pt-d ${d>0?"up":d<0?"down":""}">${d>0?"+":""}${d===0?"±0":d}</span><span class="pt-go" aria-hidden="true">›</span></button>`; }).join("");
  document.getElementById("hsum").innerHTML=`
    <div class="hsum-l">
      <h2 class="hhead">House of Commons of Canada<span class="fr">Chambre des communes du Canada</span></h2><p class="hlede">All 343 seats in the House of Commons, laid out like the chamber, with every MP, riding and party.</p>
      <div class="hsub"><span class="majtag">Liberal majority</span> <b>${coal}</b> seats · ${maj?(coal===need?`exactly the ${need} needed`:`${coal-need} more than the ${need} needed`):`${need-coal} short of ${need}`}</div>
      <div class="mbar">${HOC_ORDER.map(p=>`<span style="--w:${(c[p]||0)/343*100}%;--pc:${FPARTY[p].color}" class="${hocMode==="coalition"&&!coalition.has(p)?"off":""}"></span>`).join("")}<i class="mline" style="left:${need/343*100}%"><em>${need}</em></i></div>
      <div class="ptiles">${tiles}</div>
      <div class="src">Change shown against the April 28, 2025 election (${Object.entries(GE25).filter(([p,n])=>n).map(([p,n])=>FPARTY[p].short+" "+n).join(" · ")}). ${hocMode==="coalition"?"Tap parties to add or remove them from the government benches.":'<b class="hint">Tap a party</b> to light up its seats and open its breakdown.'}</div>
    </div>
    <div class="hsum-r">
      <button class="majbtn ${hocPanel&&hocPanel.type==="majority"?"on":""}" id="majbtn"><span class="kicker">Working majority</span>
      <span class="bign">${(c.lib||0)-1-((343-(c.vac||0))-(c.lib||0))}</span>
      <span class="src">Liberal MPs minus all other MPs, leaving out the Speaker and ${c.vac} vacant seats.</span>
      <span class="hint">How is this calculated? ›</span></button>
      <dl class="kv"><dt>Prime Minister</dt><dd>Mark Carney</dd><dt>Leader of the Opposition</dt><dd>Pierre Poilievre</dd><dt>Speaker</dt><dd>Francis Scarpaleggia</dd><dt>Since election</dt><dd>${HOC_LOG.filter(x=>x[1]==="cross").length} party changes · ${HOC_LOG.filter(x=>x[1]==="bye").length} by-elections</dd></dl>
    </div>`;
  document.querySelectorAll("#hsum .ptile").forEach(b=>b.onclick=()=>{ const p=b.dataset.p;
    if(hocMode==="coalition"){ if(p==="vac") return; coalition.has(p)?coalition.delete(p):coalition.add(p); coalitionLayout(); moveSeats(); }
    else { fmClear(); const same=hocFocusParty===p; hocFocusParty = same?null:p; hocPanel = same?null:{type:"party",p}; hocSel=null; hocPaint(); hocProfile(); hocList(); }
    renderSummary(); });
  document.getElementById("majbtn").onclick=()=>{ fmClear(); const on=hocPanel&&hocPanel.type==="majority"; hocPanel=on?null:{type:"majority"}; hocFocusParty=null; hocSel=null; hocPaint(); hocProfile(); hocList(); renderSummary(); };
}

/* ---------- changes log ---------- */
function renderLog(){
  const items=HOC_LOG.filter(x=>hocLogFilter==="all"||x[1]===hocLogFilter);
  const byMonth=d3.groups(items,x=>x[0].slice(0,7));
  const mName=k=>new Date(k+"-15T12:00:00").toLocaleDateString("en-CA",{month:"long",year:"numeric"});
  document.getElementById("hlog").innerHTML=byMonth.map(([k,arr])=>`<li class="lgm">${mName(k)}</li>`+arr.map(x=>{ const st=seats.find(s=>s.riding===x[3]);
    return `<li class="lgi ${x[1]==="bye"?"bye":""}"><button data-i="${st?st.i:""}"><span class="lg-t"><b>${x[2]}</b><span>${x[3]}</span><span class="muted">${fmtDate(x[0])} · ${x[6]}</span></span>
      <span class="lg-c">${x[4]===x[5]?pchip(x[5]):pchip(x[4])+'<span class="arr">→</span>'+pchip(x[5])}</span></button></li>`; }).join("")).join("")
   + (hocLogFilter==="all"||hocLogFilter==="vac"?`<li class="lgm">Date not confirmed</li>`+HOC_UNDATED_VAC.map(([n,r,p])=>{ const st=seats.find(s=>s.riding===r); return `<li class="lgi"><button data-i="${st.i}"><span class="lg-t"><b>${n}</b><span>${r}</span><span class="muted">Seat now vacant</span></span><span class="lg-c">${pchip(p)}<span class="arr">→</span>${pchip("vac")}</span></button></li>`; }).join(""):"");
  document.querySelectorAll("#hlog [data-i]").forEach(b=>{ if(b.dataset.i!=="") b.onclick=()=>hocSelect(+b.dataset.i,true); });
  document.querySelectorAll(".lgf").forEach(b=>b.setAttribute("aria-pressed",b.dataset.f===hocLogFilter?"true":"false"));
}

/* ---------- table ---------- */
function hocList(){
  if(!document.getElementById("hrows")) return;
  const f=hocFilter(), rows=seats.filter(f);
  document.getElementById("hcount").textContent=`${rows.length} of ${seats.length} ridings`;
  document.getElementById("hrows").innerHTML=rows.map(s=>`<tr data-i="${s.i}" class="${s.i===hocSel?"sel":""}"><td><b>${s.mp||'<span class="muted">Vacant</span>'}</b>${fedMinisterByName[s.mp]?' <span class="tagm">Minister</span>':""}${s.i===HOC_SPEAKER?' <span class="tagm">Speaker</span>':""}</td><td>${s.riding}</td><td>${s.prov}</td><td>${pchip(s.ge)}</td><td>${pchip(s.party)}</td></tr>`).join("");
  document.querySelectorAll("#hrows tr").forEach(tr=>tr.onclick=()=>hocSelect(+tr.dataset.i,true));
  hocPaint();
}

/* ---------- side panel ---------- */
function hocProfile(){
  if(hocSel==null&&!hocPanel){ if(FM.D) fmPanel(FM.sel); return; }
  const el=document.getElementById("hpanel"); const s=hocSel==null?null:seats[hocSel];
  let h="";
  if(!s && hocPanel && hocPanel.type==="party"){ h=partyPanel(hocPanel.p); }
  else if(!s && hocPanel && hocPanel.type==="majority"){ h=majorityPanel(); }
  else if(!s){
    h=`<div class="kicker">The House</div><h2>Key roles</h2>
     <ul class="list">${HOC_ROLES.map(([r,n])=>{ const st=seats.find(x=>x.mp===n); return `<li class="item">${st?`<button class="linkbtn" data-i="${st.i}">${n}</button>`:`<span class="nm">${n}</span>`}<span class="rl">${r}</span></li>`; }).join("")}</ul>
     <span class="src">Roles: <a href="${P45_SRC[1]}" target="_blank" rel="noopener">${P45_SRC[0]}</a>. The Commons' own roles page could not be loaded from here.</span>
     <div class="note">Click any seat to zoom in and open that MP. Drag or pinch to pan and zoom the chamber.</div>`;
  } else {
    const p=FPARTY[s.party], min=fedMinisterByName[s.mp];
    const roles=[...(roleByName[s.mp]||[]), ...(min&&!min.pm?[min.title]:[]), ...(sosByName[s.mp]?[sosByName[s.mp]]:[])];
    if(s.mp&&!roles.length&&s.i!==HOC_SPEAKER) roles.push(s.row===1?"Front-bench seat":"Backbencher · sits behind the front bench and takes part in debates, Question Period and committees");
    const log=HOC_LOG.filter(x=>x[3]===s.riding);
    h=`<div class="pband" style="--pc:${p.color}"></div>`+(s.mp?`<div class="who"><div class="ava" style="--pc:${p.color}" aria-hidden="true">${initials(s.mp)}</div><div class="who-t"><div class="kicker">Member of Parliament</div><h2>${s.mp}</h2>
       <div class="party"><i style="background:${p.color}"></i><span>${p.name} · ${s.riding}, ${s.prov}</span></div></div></div>`
       :`<div class="kicker">Vacant seat</div><h2>${s.riding}</h2><div class="lede">${PROVNAME[s.prov]}. This seat has no MP right now.</div>`)+
      `<div class="statgrid" style="grid-template-columns:repeat(3,minmax(0,1fr))"><div class="stat"><b>${s.i===HOC_SPEAKER?"Chair":s.side==="gov"?"Gov.":"Opp."}</b><span>Side</span></div><div class="stat"><b>${s.row||"—"}</b><span>Row from aisle</span></div><div class="stat"><b>${s.desk||"—"}</b><span>Desk from Speaker${s.chair?` · chair ${s.chair}`:""}</span></div></div>
       ${s.deskNote?`<div class="note warnnote">${s.deskNote}</div>`:""}
       <div class="kv2"><span>2025 election</span>${pchip(s.ge)}<span class="arr">→</span><span>Now</span>${pchip(s.party)}</div>
       ${roles.length?`<h3>Roles</h3><ul class="list">${roles.map(r=>`<li class="item"><span class="nm" style="font-size:14px">${r}</span></li>`).join("")}</ul>`:""}
       ${log.length?`<h3>Changes in this riding</h3><ul class="list">${log.map(x=>`<li class="item"><span class="nm" style="font-size:14px">${x[2]}</span><span class="rl">${fmtDate(x[0])} · ${x[6]}</span></li>`).join("")}</ul>`:""}
       ${min?`<button class="chipbtn" id="towheel">Open on the federal wheel →</button>`:""}
       ${s.mp?`<div class="role"><div class="kicker">About this role</div><p>Members of Parliament represent one riding each in the House of Commons, where they debate and vote on laws and hold the government to account.</p><dl class="rel"><dt>Elected by</dt><dd>Voters of ${s.riding}</dd></dl></div>`:""}
       ${srcA(HOC_SRC)}${srcA(PLAN_SRC)}<button class="linkbtn" id="hback" style="font-size:13px">← How the government is run</button>`;
  }
  el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap");
  el.innerHTML=h+(hocSel!=null?PV_BACK:"");
  const tw=document.getElementById("towheel"); if(tw) tw.onclick=()=>show("federal",{focusKey:fedMinisterByName[s.mp].pm?"hub":fedMinisterByName[s.mp].id});
  const hb=document.getElementById("hback"); if(hb) hb.onclick=()=>{ hocSel=null; FM.sel=null; hocPaint(); hocProfile(); hocList(); d3.select("#hemi").transition().duration(RM?0:600).call(hz.transform,d3.zoomIdentity); };
  el.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>hocSelect(+b.dataset.i,true));
  const pb=document.getElementById("pclose"); if(pb) pb.onclick=()=>{ hocHi=null; hocPanel=null; hocFocusParty=null; hocPaint(); hocProfile(); renderSummary(); };
  const pl=document.getElementById("plist"); if(pl) pl.onclick=()=>{ document.getElementById("hparty").value=pl.dataset.p; hocList(); document.querySelector(".htable").scrollIntoView({behavior:RM?"auto":"smooth",block:"center"}); };
}
const PARTY_LEAD={lib:[["Leader","Mark Carney"]],cpc:[["Leader","Pierre Poilievre"]],bq:[["Leader","Yves-François Blanchet"]],fndp:[["Leader","Avi Lewis (not an MP)"],["Parliamentary leader","Don Davies"]],grn:[["Leader","Elizabeth May"]],vac:[]};
function partyPanel(p){
  const c=counts(), n=c[p]||0, ge=GE25[p]||0, d=n-ge, P=FPARTY[p];
  const byProv=d3.rollups(seats.filter(s=>s.party===p),v=>v.length,s=>s.prov).sort((a,b)=>b[1]-a[1]);
  const max=byProv.length?byProv[0][1]:1;
  const ev=HOC_LOG.filter(x=>x[4]===p||x[5]===p);
  const gov=seats.filter(s=>s.party===p&&s.side==="gov").length, opp=seats.filter(s=>s.party===p&&s.side==="opp").length;
  return `<div class="pband" style="--pc:${P.color}"></div><div class="kicker">${p==="vac"?"Seats":"Party"} · tap the tile again to clear</div>
   <h2>${p==="vac"?"Vacant seats":P.name}</h2>
   <div class="statgrid" style="grid-template-columns:repeat(3,minmax(0,1fr))"><div class="stat"><b>${n}</b><span>Seats now</span></div><div class="stat"><b>${ge}</b><span>Won in 2025</span></div><div class="stat"><b class="${d>0?"upc":d<0?"downc":""}">${d>0?"+":""}${d}</b><span>Change</span></div></div>
   ${PARTY_LEAD[p].length?`<dl class="kv">${PARTY_LEAD[p].map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join("")}<dt>Where they sit</dt><dd>${gov?gov+" government side":""}${gov&&opp?" · ":""}${opp?opp+" opposition side":""}</dd></dl>`:""}
   <h3>By province</h3><div class="bars" style="--accent:${P.color}">${byProv.map(([pv,k])=>`<div class="bar"><span>${PROVNAME[pv]}</span><span class="amt">${k}</span><div class="track"><div class="fill" style="width:${k/max*100}%"></div></div></div>`).join("")}</div>
   ${ev.length?`<h3>What changed since 2025</h3><ul class="list">${ev.map(x=>{ const st=seats.find(s=>s.riding===x[3]); return `<li class="item"><button class="linkbtn" data-i="${st.i}" style="font-size:14px">${x[2]}</button><span class="rl">${fmtDate(x[0])} · ${x[6]} ${pchip(x[4])} → ${pchip(x[5])}</span></li>`; }).join("")}</ul>`:""}

   <span class="src">Leaders: <a href="${P45_SRC[1]}" target="_blank" rel="noopener">${P45_SRC[0]}</a> · 2025 results: <a href="${GE25_SRC[1]}" target="_blank" rel="noopener">${GE25_SRC[0]}</a></span>
   <button class="linkbtn" id="pclose" style="font-size:13px">← How the government is run</button>`;
}
function majorityPanel(){
  const c=counts(), lib=c.lib||0, vac=c.vac||0, others=343-vac-lib;
  return `<div class="kicker">Working majority · how it is worked out</div><h2>${lib-1-others}</h2>
   <div class="lede">The number of votes the government can lose and still win, if every MP shows up and votes along party lines.</div>
   <div class="calc">
    <div><span>Liberal MPs</span><b>${lib}</b></div>
    <div><span>minus the Speaker (a Liberal who only votes to break a tie)</span><b>− 1</b></div>
    <div class="sum"><span>Liberal votes available</span><b>${lib-1}</b></div>
    <div><span>All other MPs (${HOC_ORDER.filter(p=>p!=="lib"&&p!=="vac").map(p=>`${FPARTY[p].short} ${c[p]||0}`).join(" + ")})</span><b>− ${others}</b></div>
    <div class="sum big"><span>Working majority</span><b>${lib-1-others}</b></div>
   </div>
   <div class="note">The ${vac} vacant seats have no vote until by-elections fill them. A majority of the full House is 172 seats, and the Liberals hold ${lib}, which is ${lib-172} over.</div>
   <button class="linkbtn" id="pclose" style="font-size:13px">← How the government is run</button>`;
}
function hocSelect(i,zoom){ const s0=seats[i], mm=s0&&fedMinisterByName[s0.mp]; if(mm&&FM.D){ fmSelect(mm.pm?"pm":mm.id); return; } const sk=FM.D&&FM.D.sos.find(x=>x.seat===s0); if(sk){ fmSelect(sk.id); return; } if(FM.D){ FM.sel=null; fmHighlight(null); } hocHi=null; hocPanel=null; hocFocusParty=null; renderSummary(); hocSel=i; hocProfile(); hocList(); if(zoom) zoomToSeat(seats[i]);
  if(window.innerWidth<980) document.getElementById("hpanel").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"}); }

function renderCommons(){
  if(!hocBuilt){
    commonsEl.innerHTML=`
     <section class="hsum" id="hsum"></section>
     <section class="nsec pmwrap cmwrap"><div class="kicker">Power map · Parliament Hill</div><h2 class="nh pmtitle">Elected Officials</h2>
      ${foldHTML("hoc-fold","How to read this map","What each part means and how to explore it",
        [["The room on the left","is the House of Commons in Ottawa, where Canada's federal laws are made. Each dot is one MP, a person voters chose to speak for their riding. The colour shows their party."],
         ["The Speaker","sits at the top and keeps order. The government sits on the Speaker's right and the opposition on the left. MPs share desks, two to a desk."],
         ["The Prime Minister","leads the government and chooses Cabinet. Each minister is also an MP with a seat in the room."],
         ["Departments","do the day-to-day work. Each has a responsible minister who answers to the House for it, and a public servant runs it every day."]],
        [["Point at","or tap any dot, name or box to see who it is."],["Click a minister","to draw a line to their seat and light up their departments."],["Click a department","to see which minister is responsible and where they sit."],["Search","for any MP, riding, minister, department or deputy head. Details appear in the box under the map."]],
        "Ministers and Secretaries of State from the Prime Minister's website; deputy heads cross-checked against GEDS.")}
      <div class="pmbar"><label class="search" for="fm-q"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg>
        <input id="fm-q" type="search" placeholder="Search an MP, riding, minister or department" autocomplete="off" aria-label="Search the House of Commons"><ul class="results" id="fm-res" hidden></ul></label>
        <div class="zbtn"><button id="hzin" aria-label="Zoom in" title="Zoom in">+</button><button id="hzout" aria-label="Zoom out" title="Zoom out">−</button><button id="hzr" aria-label="Reset the chamber" title="Reset the chamber" class="zreset"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7"/><path d="M3 2.5v3h3"/></svg><span>Reset</span></button></div></div>
      <div class="cmgrid" id="cmgrid">
        <div class="pmstage cmchamber"><div class="cmhead"><b>House of Commons of Canada</b><span>343 MPs, 1 per riding, representing the people of Canada</span></div>
          <div class="hstage" id="hstage"><svg id="hemi" viewBox="-312 -524 624 1250" role="img" aria-label="House of Commons chamber, seats by party"></svg><div class="tip" id="htip" hidden></div></div></div>
        <div class="pmstage cmcards" id="fm-stage"><svg id="fm-svg" role="img" aria-label="Federal Cabinet and departments"></svg></div>
        <svg class="cmlinks" id="cmlinks" aria-hidden="true"></svg>
      </div>
      <aside class="hpanel pmpanel" id="hpanel" aria-live="polite"></aside>
      <div class="src" id="hnote"></div>
     </section>
     <div class="hgrid"><div class="hmain">
       <section class="nsec"><div class="kicker">About the House</div><h2 class="nh">What the House of Commons does</h2>
        <div class="does">
         <div><b>Forms the government</b><span>The party with the most seats usually governs, and its leader becomes Prime Minister and picks Cabinet.</span></div>
         <div><b>Makes laws</b><span>Bills are debated here and in committees. They also need the Senate before Royal Assent.</span></div>
         <div><b>Holds the government to account</b><span>Opposition MPs question ministers, most visibly in daily Question Period.</span></div>
         <div><b>Controls the money</b><span>Budgets, spending estimates and taxes must be approved by the House.</span></div>
         <div><b>Represents Canadians</b><span>Each of the 343 MPs speaks for one riding.</span></div>
        </div>
        <div class="sits">
         <div><div class="kicker">When the House sits</div>
          <table class="hrs"><tbody><tr><td>Monday</td><td>11:00 a.m. – 6:30 p.m.</td></tr><tr><td>Tuesday</td><td>10:00 a.m. – 6:30 p.m.</td></tr><tr><td>Wednesday</td><td>2:00 p.m. – 6:30 p.m.</td></tr><tr><td>Thursday</td><td>10:00 a.m. – 6:30 p.m.</td></tr><tr><td>Friday</td><td>10:00 a.m. – 2:30 p.m.</td></tr></tbody></table>
          <span class="src">Usual hours under the Standing Orders; the House can extend or change them by special order. Sittings are hybrid, so MPs can take part in person or remotely.</span></div>
         <div class="qbox"><div class="kicker">Quorum</div><span class="bign">20</span><span class="src">MPs, counting the Speaker and those taking part remotely, are needed for the House to do business. If anyone calls quorum into question, the bells ring for up to 15 minutes; without 20, the Speaker adjourns to the next sitting day.</span></div>
         <div><div class="kicker">Who sits where</div><span class="src" style="font-size:13px">The Speaker assigns seats, working with the party whips. The Prime Minister and Cabinet take the front rows on the Speaker's right, with the Leader of the Opposition directly across. When a side is full, extra government MPs sit on the left nearest the Speaker, and extra opposition MPs sit on the right nearest the Bar. The Speaker also seats independents. The Mace lies on the Table whenever the House sits.</span></div>
        </div>
        ${srcA(["House of Commons Procedure and Practice, 4th ed. (2025), ch. 9: Sittings of the House","https://www.ourcommons.ca/procedure/procedure-and-practice-4/ch09-1-e.html"])}${srcA(["House of Commons: Our Procedure – Physical Setting","https://ourcommons.ca/procedure/our-procedure/PhysicalSetting/c_g_physicalsetting-e.html"])}
        <div class="who4"><span><b>Speaker</b> elected by MPs; keeps order impartially</span><span><b>Cabinet</b> run departments; front bench</span><span><b>Opposition</b> question and propose alternatives</span><span><b>Backbenchers</b> most MPs; debate and sit on committees</span></div>
        ${srcA(ROLEH_SRC)}
       </section>
     </div><div class="hside">${ridingBtn("commons")}
       <section class="nsec"><div class="lgh"><h2 class="nh">Changes since the 2025 election</h2></div>
        <div class="seg lgfs"><button class="lgf" data-f="all">All</button><button class="lgf" data-f="bye">By-elections</button><button class="lgf" data-f="cross">Party changes</button><button class="lgf" data-f="vac">Vacancies</button></div>
        <ol class="hlog" id="hlog"></ol>
        <span class="src">Sources: <a href="${P45_SRC[1]}" target="_blank" rel="noopener">${P45_SRC[0]}</a> · <a href="${BYE_SRC[1]}" target="_blank" rel="noopener">${BYE_SRC[0]}</a> · <a href="${GE25_SRC[1]}" target="_blank" rel="noopener">${GE25_SRC[0]}</a></span>
       </section>
     </div></div>`;
    drawChamber(); wireFold("hoc-fold"); renderFedMap(); window.addEventListener("resize",()=>drawLinks(FM.sel));
    document.getElementById("hzin").onclick=()=>d3.select("#hemi").transition().duration(300).call(hz.scaleBy,1.4);
    document.getElementById("hzout").onclick=()=>d3.select("#hemi").transition().duration(300).call(hz.scaleBy,1/1.4);
    document.getElementById("hzr").onclick=()=>{ if(typeof fmSelect==="function"&&FM.D) fmSelect(null); else { hocSel=null; hocProfile(); hocList(); hocPaint(); } d3.select("#hemi").transition().duration(RM?0:600).call(hz.transform,d3.zoomIdentity); };

    document.querySelectorAll(".lgf").forEach(b=>b.onclick=()=>{ hocLogFilter=b.dataset.f; renderLog(); });
    hocBuilt=true;
  }
  renderSummary(); renderLog(); setNote(); hocProfile(); hocList();
}
function setNote(){
  document.getElementById("hnote").innerHTML = `The Mace lies on the Table, and the Sergeant-at-Arms sits by the Bar on the opposition side. Outlines mark each party's block of seats. Desk positions: <a href="${PLAN_SRC[1]}" target="_blank" rel="noopener">${PLAN_SRC[0]}</a>.`;
}
