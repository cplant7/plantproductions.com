/* ================= SENATE & ONTARIO CHAMBERS ================= */
const SEN_SRC=["Senate of Canada: Senators list and standings","https://sencanada.ca/en/senators/?v=list"];
const SEN_ROLE_SRC=["Learn about Parliament: The role of the Senate","https://learn.parl.ca/understanding-comprendre/en/how-parliament-works/the-role-of-the-senate"];
const SEN_SPK_SRC=["Senate of Canada: The Speaker","https://sencanada.ca/en/speakers/raymonde-gagne/biography/"];
const ON_SRC=["Legislative Assembly of Ontario: Current MPPs","https://www.ola.org/en/members/current"];
const ON_ROLES_SRC=["Wikipedia: 44th Parliament of Ontario","https://en.wikipedia.org/wiki/44th_Parliament_of_Ontario"];
const ON_PLAN_SRC=["Legislative Assembly of Ontario: Seating plan, Oct 27 2026 (PDF)","https://www.ola.org/sites/default/files/attachments/Seating%20Plan%2044th%20Parliament%201st%20Session%20October%2027%202026.pdf"];

const CH={
 senate:{
  id:"senate", title:"Senate of Canada", fr:"Sénat du Canada", kicker:"", rows:5, memberNoun:"Senator", placeNoun:"Province",
  groups:{GRO:{name:"Government Representative's Office",short:"GRO",color:"#f2f2f2"},PSG:{name:"Progressive Senate Group",short:"PSG",color:"#7fcbb6"},
   ISG:{name:"Independent Senators Group",short:"ISG",color:"#aebdcb"},CSG:{name:"Canadian Senators Group",short:"CSG",color:"#cdb98d"},
   C:{name:"Conservative Party of Canada",short:"C",color:"var(--p-cpc)"},NA:{name:"Non-affiliated",short:"NA",color:"#7d7d7d"},vac:{name:"Vacant",short:"VAC",color:"var(--p-vac)"}},
  order:["ISG","PSG","CSG","C","GRO","NA","vac"],
  govSide:["GRO","PSG","ISG"], oppSide:["C","CSG","NA","vac"],
  speaker:"Gagné, Raymonde",
  approx:"Seats are grouped by parliamentary group on each side, with the Government Representative's Office on the Speaker's right and the Conservative opposition facing them. Exact desk assignments are not published in a form I could read, so positions within each block are approximate.",
  src:SEN_SRC
 },
 ontario:{
  id:"ontario", title:"Legislative Assembly of Ontario", fr:"Assemblée législative de l'Ontario", kicker:"", rows:5, memberNoun:"MPP", placeNoun:"Riding",
  groups:{pc:{name:"Progressive Conservative Party of Ontario",short:"PC",color:"var(--p-cpc)"},ndp:{name:"Ontario New Democratic Party",short:"NDP",color:"var(--p-fndp)"},
   olp:{name:"Ontario Liberal Party",short:"OLP",color:"var(--p-lib)"},gpo:{name:"Green Party of Ontario",short:"GPO",color:"var(--p-grn)"},ind:{name:"Independent",short:"IND",color:"#9a9a9a"}},
  order:["pc","ndp","olp","gpo","ind"],
  govSide:["pc"], oppSide:["ndp","olp","gpo","ind"],
  speaker:"Hon. Donna Skelly", majority:63, gov:"pc",
  roles:[["Premier","Hon. Doug Ford"],["Speaker","Hon. Donna Skelly"],["Leader of the Opposition","Marit Stiles"],["Government House Leader","Hon. Steve Clark"],["Opposition House Leader","John Vanthof"]],
  approx:"Desk positions from the Assembly's seating plan for the 44th Parliament, 1st Session, revised October 27, 2026. Government sits on the Speaker's right, opposition on the left.",
  src:ON_SRC
 }
};
// build member lists
CH.senate.members=SEN_RAW.split("\n").map((l,i)=>{ const [n,g,prov,app,ret,adv]=l.split("|"); const [last,first]=n.split(", ");
CH.senate.flip=false;
  return {i,name:`${first} ${last}`,sort:n,group:g,place:prov,appointed:app,retires:ret,advisor:adv}; });
Object.entries(SEN_VACANT).forEach(([prov,k])=>{ for(let j=0;j<k;j++) CH.senate.members.push({i:CH.senate.members.length,name:"",sort:"~",group:"vac",place:prov}); });
CH.ontario.members=ON_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); const nm=n.replace(/^Hon\. /,""); return {i,name:nm,hon:ON_CAB_OLA.has(nm),sort:nm,group:p,place:r}; });


function onApplyDesks(){ const C=CH.ontario; if(typeof ON_DESKS==="undefined") return false; const by={}; C.members.forEach(m=>by[m.name]=m);
  ON_DESKS.seats.forEach(([n,cx,cy,row,pos])=>{ const m=by[n]; if(!m) return; m.dx=cx; m.dy=cy; m.side=cx<PM_DCX?"gov":"opp"; m.row=row; m.desk=pos; });
  if(C.spk){ C.spk.dx=PM_DCX; C.spk.dy=560; C.spk.side="speaker"; } return true; }
function onEnsureLayout(){ const C=CH.ontario; if(C.govList){ onApplyDesks(); return; } const mins=[]; ON_SECTORS.forEach(s=>s.ids.forEach(id=>mins.push(ON_MIN.find(m=>m.id===id)))); C.cabOrder={"Doug Ford":-1}; mins.forEach((m,k)=>C.cabOrder[m.ola]=k); chLayout(C); onApplyDesks(); }
/* ---------- shared: "How to read" fold ---------- */
function foldHTML(id,title,sub,left,right,note){
  const li=a=>a.map(([b,t])=>`<li><b>${b}</b> ${t}</li>`).join("");
  return `<div class="pmfold" id="${id}"><button class="pmfold-h" id="${id}-btn" aria-expanded="false" aria-controls="${id}-b"><span class="pmfold-i" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="8" r="6.5"/><path d="M8 7v4M8 4.6v.1"/></svg></span><span class="pmfold-t"><b>${title}</b><span>${sub}</span></span><span class="pmfold-c" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg></span></button>
   <div class="pmfold-b" id="${id}-b" role="region"><div class="pmfold-in"><div class="pmhow"><div><h3>What you are looking at</h3><ul>${li(left)}</ul></div><div><h3>How to use it</h3><ul>${li(right)}</ul>${note?`<div class="src">${note}</div>`:""}</div></div></div></div></div>`;
}
function wireFold(id){ const f=document.getElementById(id), btn=document.getElementById(id+"-btn"); if(!f||!btn) return;
  const set=o=>{ f.classList.toggle("open",o); btn.setAttribute("aria-expanded",o?"true":"false"); };
  set(false); btn.onclick=e=>{ e.stopPropagation(); set(!f.classList.contains("open")); };
  document.addEventListener("click",e=>{ if(f.classList.contains("open")&&!f.contains(e.target)) set(false); });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&f.classList.contains("open")){ set(false); btn.focus(); } }); }

/* ---------- Ontario: changes since the February 27, 2025 election ---------- */
const ON_GE25={pc:80,ndp:27,olp:14,gpo:2,ind:1};
const ON_LOG_SRC=["Wikipedia: 44th Parliament of Ontario","https://en.wikipedia.org/wiki/44th_Parliament_of_Ontario"];
const ON_SO_SRC=["Legislative Assembly of Ontario: Standing Orders","https://www.ola.org/en/legislative-business/standing-orders"];
// [date, type, name, riding, from, to, note]
const ON_LOG=[
 ["2026-09-03","bye","Fatima Shaban","Scarborough Southwest","ndp","ndp","By-election: NDP hold"],
 ["2026-09-03","bye","Susan Lahey","York—Simcoe","pc","pc","By-election: PC hold"],
 ["2026-09-03","bye","Jeff Beattie","Hamilton East—Stoney Creek","pc","pc","By-election: PC hold"],
 ["2026-06-05","vac","Caroline Mulroney","York—Simcoe","pc","vac","Resigned; seat filled at the September 3 by-election"],
 ["2026-06-05","vac","Neil Lumsden","Hamilton East—Stoney Creek","pc","vac","Resigned; seat filled at the September 3 by-election"],
 ["2026-02-03","vac","Doly Begum","Scarborough Southwest","ndp","vac","Resigned; seat filled at the September 3 by-election"],
 ["2025-09-22","cross","Chris Scott","Sault Ste. Marie","pc","ind","Removed from the PC caucus; now sits as an independent"]
];
let onLogFilter="all";
function onChip(g){ const G=g==="vac"?{short:"VAC",color:"var(--p-vac)"}:CH.ontario.groups[g]; return `<span class="pchip" style="--pc:${G.color}">${G.short}</span>`; }
function renderOnLog(){
  const C=CH.ontario, items=ON_LOG.filter(x=>onLogFilter==="all"||x[1]===onLogFilter);
  const byMonth=d3.groups(items,x=>x[0].slice(0,7));
  const mName=k=>new Date(k+"-15T12:00:00").toLocaleDateString("en-CA",{month:"long",year:"numeric"});
  const el=document.getElementById("onlog"); if(!el) return;
  el.innerHTML=byMonth.map(([k,arr])=>`<li class="lgm">${mName(k)}</li>`+arr.map(x=>{ const m=C.members.find(mm=>mm.place===x[3]);
    return `<li class="lgi ${x[1]==="bye"?"bye":""}"><button data-i="${m?m.i:""}"><span class="lg-t"><b>${x[2]}</b><span>${x[3]}</span><span class="muted">${fmtDate(x[0])} · ${x[6]}</span></span>
      <span class="lg-c">${x[4]===x[5]?onChip(x[5]):onChip(x[4])+'<span class="arr">→</span>'+onChip(x[5])}</span></button></li>`; }).join("")).join("");
  el.querySelectorAll("[data-i]").forEach(b=>{ if(b.dataset.i!=="") b.onclick=()=>chSelect(C,+b.dataset.i,true); });
  document.querySelectorAll(".onlgf").forEach(b=>b.setAttribute("aria-pressed",b.dataset.f===onLogFilter?"true":"false"));
}

const chState={senate:{sel:null,focus:null,built:false},ontario:{sel:null,focus:null,built:false},bcleg:{sel:null,focus:null,built:false}};
CH.ontario.map={svg:"#pm-svg",panelId:"pm-panel",stageId:"pm-stage",st:()=>PM,panel:k=>pmPanel(k),hl:k=>pmHighlight(k),select:(k,z)=>pmSelect(k,z),key:i=>pmKeyForMpp(i)};

function chLayout(C){
  const M=C.members, spk=M.find(m=>(C.id==="senate"?m.sort:("Hon. "+m.name))===C.speaker||m.sort===C.speaker);
  C.spk=spk;
  const rest=M.filter(m=>m!==spk);
  const roleRank=m=>{ if(C.leaders){ if(C.leaders.includes(m.name)) return 0; if(m.hon) return 1; } if(C.id==="ontario"){ if(m.name==="Doug Ford") return 0; if(m.name==="Marit Stiles") return 0; if(m.hon) return 1; } return 2; };
  const sortIn=(a,b)=>roleRank(a)-roleRank(b)||(C.cabOrder&&a.hon&&b.hon?(C.cabOrder[a.name]??99)-(C.cabOrder[b.name]??99):0)||a.sort.localeCompare(b.sort);
  const cap=Math.ceil(rest.length/2);
  let gov=[], opp=[];
  C.govSide.forEach(g=>gov.push(...rest.filter(m=>m.group===g).sort(sortIn)));
  C.oppSide.forEach(g=>opp.push(...rest.filter(m=>m.group===g).sort(sortIn)));
  if(C.id==="senate"){ while(gov.length>cap){ opp.splice(opp.findIndex(m=>m.group==="vac")>=0?opp.findIndex(m=>m.group==="vac"):opp.length,0,gov.pop()); } }
  const cols=Math.ceil(Math.max(gov.length,opp.length)/C.rows); C.cols=cols+(cols%2);
  const STEP=30,PG=10,X0=-(C.cols*STEP+(C.cols/2)*PG)/2+20, AIS=48;
  const colX=c=>X0+c*STEP+Math.floor(c/2)*PG, rowY=r=>AIS+r*35+r*(r+1)*1.6;
  C.colX=colX; C.rowY=rowY; C.X0=X0; C.W=colX(C.cols-1);
  const place=(list,side)=>list.forEach((m,k)=>{ const r=Math.floor(k/C.cols), c=k%C.cols; m.x=colX(c); m.y=side*rowY(r); m.side=side>0?"gov":"opp"; m.row=r+1; m.desk=Math.floor(c/2)+1; });
  const F=C.flip?-1:1; place(gov,F); gov.forEach(m=>m.side="gov"); place(opp,-F); opp.forEach(m=>m.side="opp"); if(spk){ spk.x=X0-80; spk.y=0; spk.side="speaker"; }
  C.govList=gov; C.oppList=opp;
}

function chCounts(C){ const c={}; C.members.forEach(m=>c[m.group]=(c[m.group]||0)+1); return c; }
function chFilter(C){ const qe=document.getElementById(C.id+"-q"), ge=document.getElementById(C.id+"-g"); const q=((qe&&qe.value)||"").trim().toLowerCase(), g=ge?ge.value:"";
  return m=>(!g||m.group===g)&&(!q||(m.name+" "+m.place).toLowerCase().includes(q)); }

function chDraw(C){
  chLayout(C);
  const svg=d3.select("#"+C.id+"-svg"); svg.selectAll("*").remove();
  C.portrait=(C.id==="senate"); const H=C.rowY(C.rows-1)+60, need=(C.W+80)-(C.X0-140), Wd=C.portrait?need:Math.max(need,900), x0=(C.X0-140)-(Wd-need)/2;
  C.portrait=(C.id==="senate");
  svg.attr("viewBox",C.portrait?`${-H} ${x0} ${2*H} ${Wd}`:`${x0} ${-H} ${Wd} ${2*H}`);
  const z=svg.append("g"), g=z.append("g"); if(C.portrait) g.attr("transform","rotate(90)");
  g.append("rect").attr("x",C.X0-20).attr("y",-30).attr("width",C.W-C.X0+40).attr("height",60).attr("rx",8).attr("fill","#ffffff08");
  g.append("text").attr("x",C.X0-80).attr("y",-34).attr("text-anchor","middle").attr("class","clbl brass").text("SPEAKER");
  g.append("rect").attr("x",C.X0-104).attr("y",-24).attr("width",48).attr("height",48).attr("rx",10).attr("fill","none").attr("stroke","var(--brass)").attr("stroke-width",2);
  const F=C.flip?-1:1, lo=C.rowY(C.rows-1)+40, hi=-C.rowY(C.rows-1)-30;
  g.append("text").attr("x",C.X0).attr("y",F>0?lo:hi).attr("class","clbl side").text("GOVERNMENT SIDE · SPEAKER'S RIGHT");
  g.append("text").attr("x",C.X0).attr("y",F>0?hi:lo).attr("class","clbl side").text("OPPOSITION SIDE · SPEAKER'S LEFT");
  g.append("line").attr("x1",C.W+30).attr("x2",C.W+30).attr("y1",-C.rowY(C.rows-1)-16).attr("y2",C.rowY(C.rows-1)+16).attr("stroke","var(--brass)").attr("stroke-width",2).attr("stroke-dasharray","4 5");
  const dg=g.append("g").attr("aria-hidden","true"), pg=g.append("g").attr("aria-hidden","true");
  [[C.govList,F],[C.oppList,-F]].forEach(([list,side])=>{ for(let r=0;r<C.rows;r++){ const row=list.slice(r*C.cols,(r+1)*C.cols); if(!row.length) continue; const y=side*C.rowY(r);
      if(r===0) dg.append("rect").attr("x",C.colX(0)-26).attr("y",y-22).attr("width",C.colX(row.length-1)-C.colX(0)+52).attr("height",44).attr("rx",12).attr("fill","var(--brass)").attr("fill-opacity",.07).attr("stroke","var(--brass)").attr("stroke-opacity",.45);
      const shade=[30,26,23,21,19,17][r];
      for(let c=0;c<row.length;c+=2){ const a=C.colX(c)-15, b=C.colX(Math.min(c+1,row.length-1))+15; dg.append("rect").attr("class","pmdesk").attr("x",a).attr("y",y-15).attr("width",b-a).attr("height",30).attr("rx",9).attr("fill",`rgb(${shade},${shade},${shade})`).attr("stroke",r===0?"var(--brass)":"var(--rule)").attr("stroke-opacity",r===0?.6:1); }
      let s=0; for(let c=1;c<=row.length;c++){ if(c===row.length||row[c].group!==row[s].group){ const gr=row[s].group; if(!(C.id==="ontario"&&gr==="pc")) pg.append("rect").attr("x",C.colX(s)-18).attr("y",y-18.5).attr("width",C.colX(c-1)-C.colX(s)+36).attr("height",37).attr("rx",12).attr("fill","none").attr("stroke",C.groups[gr].color).attr("stroke-width",1.4).attr("stroke-opacity",.6); s=c; } }
      dg.append("text").attr("x",C.colX(0)-34).attr("y",y+4).attr("text-anchor","end").attr("class","clbl").text(r+1);
  } });
  const dots=g.selectAll("circle.seat").data(C.members).join("circle").attr("class","seat").attr("cx",m=>m.x).attr("cy",m=>m.y).attr("r",RM?12.5:0)
    .attr("fill",m=>m.group==="vac"?"transparent":C.groups[m.group].color).attr("stroke",m=>m.group==="vac"?"var(--muted)":"none").attr("stroke-width",1.5).attr("stroke-dasharray",m=>m.group==="vac"?"2 2":null)
    .attr("tabindex",0).attr("role","button").attr("aria-label",m=>(m.name||"Vacant seat")+", "+m.place)
    .on("click",(e,m)=>chSelect(C,m.i,true)).on("keydown",(e,m)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); chSelect(C,m.i,true);} })
    .on("mouseenter",function(e,m){ if(!RM) d3.select(this).transition("h").duration(150).attr("r",15.5); chTip(C,e,m); }).on("mousemove",(e,m)=>chTip(C,e,m))
    .on("mouseleave",function(e,m){ if(!RM) d3.select(this).transition("h").duration(200).attr("r",chState[C.id].sel===m.i?15.5:12.5); document.getElementById(C.id+"-tip").hidden=true; });
  if(!RM) dots.transition().delay(m=>120+(m.x-C.X0)*1.6+Math.abs(m.y)*.6).duration(420).ease(d3.easeBackOut.overshoot(1.6)).attr("r",12.5);
  const _vb=svg.node().viewBox.baseVal; C.zoom=d3.zoom().scaleExtent([1,5]).translateExtent([[_vb.x,_vb.y],[_vb.x+_vb.width,_vb.y+_vb.height]]).on("zoom",e=>z.attr("transform",e.transform)); svg.call(C.zoom).on("dblclick.zoom",null);
  if(C.portrait){ g.selectAll("text.side,text.brass").remove(); g.selectAll("text").each(function(){ const t=d3.select(this); const x=+t.attr("x")||0, y=+t.attr("y")||0; t.attr("transform",`rotate(-90,${x},${y})`).attr("text-anchor","middle"); });
    const lg=z.insert("g",":first-child").attr("aria-hidden","true"), ry=C.rowY(C.rows-1);
    lg.append("text").attr("x",0).attr("y",C.X0-114).attr("text-anchor","middle").attr("class","clbl brass").text("SPEAKER");
    lg.append("text").attr("x",-(C.rowY(0)+ry)/2).attr("y",C.W+62).attr("text-anchor","middle").attr("class","clbl side").text("GOVERNMENT SIDE");
    lg.append("text").attr("x",(C.rowY(0)+ry)/2).attr("y",C.W+62).attr("text-anchor","middle").attr("class","clbl side").text("OPPOSITION SIDE"); }
  chPaint(C);
}
function chTip(C,e,m){ const t=document.getElementById(C.id+"-tip"); const G=C.groups[m.group];
  t.innerHTML=`<b>${m.name||"Vacant"}</b><span>${m.place}</span><span class="tparty"><span class="pchip" style="--pc:${G.color}">${G.short}</span> ${m===C.spk?"Speaker":m.side==="gov"?"Government side":"Opposition side"}</span>`;
  t.hidden=false; const r=document.getElementById(C.id+"-stage").getBoundingClientRect(); let lx=e.clientX-r.left+16; if(lx>r.width-280) lx-=300; t.style.left=lx+"px"; t.style.top=(e.clientY-r.top+16)+"px"; }
function chPaint(C){ const st=chState[C.id], f=chFilter(C);
  if(C.map){ d3.selectAll(C.map.svg+" .mpp").classed("pfade",d=>(st.focus&&d.m.group!==st.focus)||!f(d.m)); return; }
  d3.selectAll(`#${C.id}-svg .seat`).attr("opacity",m=>(st.focus&&m.group!==st.focus)?.1:f(m)?1:.1)
    .attr("stroke",m=>m.i===st.sel?"var(--ink)":m.group==="vac"?"var(--muted)":"none").attr("stroke-width",m=>m.i===st.sel?3:1.5); }
function chRole(C,m){
  if(m===C.spk) return C.id==="senate"?"Speaker of the Senate":"Speaker";
  if(C.id==="ontario"){ const r=(C.roles||[]).filter(([k,n])=>n.replace(/^Hon\. /,"")===m.name).map(x=>x[0]); const mn=ON_MIN.find(x=>x.ola===m.name); if(mn) r.push(mn.title); return r.join(" · "); }
  if(m.group==="GRO") return "Government Representative's Office";
  return "";
}
function chSummary(C){
  const c=chCounts(C), st=chState[C.id], total=C.members.length;
  const GE=C.id==="ontario"?ON_GE25:C.ge||null;
  const tiles=C.order.filter(g=>c[g]).map(g=>{ const d=GE?(c[g]||0)-(GE[g]||0):null; return `<button class="ptile ${st.focus===g?"focus":""}" data-g="${g}" style="--pc:${C.groups[g].color}"><span class="pt-n">${C.groups[g].short}</span><b>${c[g]}</b>${GE?`<span class="pt-d ${d>0?"up":d<0?"down":""}">${d>0?"+":""}${d===0?"±0":d}</span>`:""}<span class="pt-go" aria-hidden="true">›</span></button>`; }).join("");
  let left, right;
  if(C.id==="ontario"){ const gov=c.pc||0, others=total-gov; const wm=gov-1-others;
    left=`<div class="hsub"><span class="majtag">PC majority</span> <b>${gov}</b> seats · ${gov-C.majority} more than the ${C.majority} needed</div>`;
    right=`<button class="majbtn" id="${C.id}-maj"><span class="kicker">Working majority</span><span class="bign">${wm}</span><span class="src">PC MPPs minus all other MPPs, leaving out the Speaker. No vacancies.</span><span class="hint">How is this calculated? ›</span></button>
      <dl class="kv"><dt>Premier</dt><dd>Doug Ford</dd><dt>Leader of the Opposition</dt><dd>Marit Stiles</dd><dt>Speaker</dt><dd>Donna Skelly</dd><dt>Since election</dt><dd>${ON_LOG.filter(x=>x[1]==="cross").length} party change · ${ON_LOG.filter(x=>x[1]==="bye").length} by-elections</dd></dl>`; }
  else if(C.summary){ [left,right]=C.summary(c,total); }
  else { left=`<div class="hsub"><b>${total-(c.vac||0)}</b> of ${total} seats filled · ${c.vac} vacant · senators are appointed, not elected</div>`;
    right=`<div class="kicker">Largest group</div><span class="bign">${c.ISG}</span><span class="src">Independent Senators Group. No group has a majority (53 of 105), and most senators do not belong to a political party.</span>
      <dl class="kv"><dt>Speaker</dt><dd>Raymonde Gagné</dd><dt>Appointed by</dt><dd>Governor General, on the PM's advice</dd><dt>Serve until</dt><dd>Age 75</dd></dl>`; }
  document.getElementById(C.id+"-sum").innerHTML=`<div class="hsum-l">${C.kicker?`<div class="kicker">${C.kicker}</div>`:""}<h2 class="hhead">${C.title}<span class="fr">${C.fr}</span></h2>${typeof CH_META!=="undefined"&&CH_META[C.id]?`<p class="hlede">${CH_META[C.id][2]}</p>`:""}${left}
    <div class="mbar">${C.order.map(g=>`<span style="--w:${(c[g]||0)/total*100}%;--pc:${C.groups[g].color}"></span>`).join("")}${C.majority?`<i class="mline" style="left:${C.majority/total*100}%"><em>${C.majority}</em></i>`:`<i class="mline" style="left:${53/105*100}%"><em>53</em></i>`}</div>
    <div class="ptiles">${tiles}</div><div class="src">${GE?`Change shown against the ${C.geLabel||"February 27, 2025 election"} (${C.order.map(g=>C.groups[g].short+" "+GE[g]).join(" · ")}). `:""}<b class="hint">Tap a ${C.tileWord||(C.id==="senate"?"group":"party")}</b> to light up its seats and open its breakdown.</div></div><div class="hsum-r">${right}</div>`;
  document.querySelectorAll(`#${C.id}-sum .ptile`).forEach(b=>b.onclick=()=>{ const g=b.dataset.g; st.focus=st.focus===g?null:g; st.panel=st.focus?{type:"group",g}:null; st.sel=null; chPaint(C); chProfile(C); chSummary(C); if(C.map&&st.focus){ const sg=document.getElementById(C.map.stageId); if(sg) sg.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"}); } });
  const mb=document.getElementById(C.id+"-maj"); if(mb) mb.onclick=()=>{ st.panel={type:"maj"}; st.focus=null; st.sel=null; chPaint(C); chProfile(C); };
}
function chList(C){ if(!document.getElementById(C.id+"-rows")){ chPaint(C); return; } const st=chState[C.id], f=chFilter(C), rows=C.members.filter(f).sort((a,b)=>a.sort.localeCompare(b.sort));
  document.getElementById(C.id+"-count").textContent=`${rows.length} of ${C.members.length} seats`;
  document.getElementById(C.id+"-rows").innerHTML=rows.map(m=>`<tr data-i="${m.i}" class="${m.i===st.sel?"sel":""}"><td><b>${m.name||'<span class="muted">Vacant</span>'}</b>${chRole(C,m)?` <span class="tagm">${m===C.spk?"Speaker":C.id==="ontario"&&m.hon?"Cabinet":"GRO"}</span>`:""}</td><td>${m.place}</td><td><span class="pchip" style="--pc:${C.groups[m.group].color}">${C.groups[m.group].short}</span></td>${C.id==="senate"?`<td>${m.retires?m.retires.slice(0,4):""}</td>`:""}</tr>`).join("");
  document.querySelectorAll(`#${C.id}-rows tr`).forEach(tr=>tr.onclick=()=>chSelect(C,+tr.dataset.i,true)); chPaint(C); }
function chProfile(C){
  const st=chState[C.id], c=chCounts(C); let h="";
  const MP=C.map;
  if(MP&&!(st.panel&&!st.sel)){ if(MP.st().D) MP.panel(MP.st().sel); return; }
  const el=document.getElementById(MP?MP.panelId:C.id+"-panel");
  if(MP&&MP.st().D){ MP.st().sel=null; MP.hl(null); d3.select(MP.svg).transition().duration(RM?0:500).call(MP.st().zoom.transform,d3.zoomIdentity); }
  const m=st.sel==null?null:C.members[st.sel];
  if(m){ const G=C.groups[m.group], role=chRole(C,m);
    const age75=m.retires?fmtDate(m.retires):null;
    h=`<div class="pband" style="--pc:${G.color}"></div>`+(m.name?`<div class="who"><div class="ava" style="--pc:${G.color}" aria-hidden="true">${initials(m.name)}</div><div class="who-t"><div class="kicker">${C.memberNoun}</div><h2>${m.name}</h2><div class="party"><i style="background:${G.color}"></i><span>${G.name} · ${m.place}</span></div></div></div>`
       :`<div class="kicker">Vacant seat</div><h2>${m.place}</h2><div class="lede">This ${C.id==="senate"?"Senate seat":"seat"} is empty until someone is ${C.id==="senate"?"appointed":"elected"}.</div>`)
     +(role?`<h3>Role</h3><ul class="list"><li class="item"><span class="nm" style="font-size:14px">${role}</span></li></ul>`:"")
     +(C.id==="senate"&&m.name?`<div class="statgrid" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="stat"><b>${m.appointed.slice(0,4)}</b><span>Appointed</span></div><div class="stat"><b>${m.retires.slice(0,4)}</b><span>Retires at 75 (${age75})</span></div></div><div class="kv2"><span>Appointed on the advice of Prime Minister ${m.advisor}</span></div>`:"")
     +`<div class="role"><div class="kicker">About this role</div><p>${C.id==="senate"?"Senators review and can amend or reject bills passed by the House, study public issues in committee, and represent their region. They are appointed by the Governor General on the Prime Minister's advice and serve until 75.":"Members of Provincial Parliament represent one riding each at Queen's Park, where they debate and vote on Ontario's laws and budget and question the provincial government."}</p>${C.id==="senate"?srcA(SEN_ROLE_SRC):""}</div>
      ${m.side!=="speaker"?`<div class="note">${m.side==="gov"?"Government":"Opposition"} side · row ${m.row} · desk ${m.desk} <span class="muted">(approximate, grouped by ${C.id==="senate"?"group":"party"})</span></div>`:""}
      ${C.id==="ontario"&&(m.hon)?`<button class="chipbtn" id="${C.id}-towheel">Show on the power map ↑</button>`:""}
      ${srcA(C.src)}<button class="linkbtn" id="${C.id}-back" style="font-size:13px">← Back</button>`; }
  else if(st.panel&&st.panel.type==="group"){ const g=st.panel.g, G=C.groups[g], ms=C.members.filter(x=>x.group===g);
    const by=d3.rollups(ms,v=>v.length,x=>C.breakFn?C.breakFn(x):C.id==="senate"?x.place:(x.hon?"Cabinet":"Other members")).sort((a,b)=>b[1]-a[1]); const mx=by.length?by[0][1]:1;
    h=`<div class="pband" style="--pc:${G.color}"></div><div class="kicker">${C.id==="senate"?"Group":"Party"} · tap the tile again to clear</div><h2>${G.name}</h2>
      <div class="statgrid" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="stat"><b>${ms.length}</b><span>Seats</span></div><div class="stat"><b>${Math.round(ms.length/C.members.length*100)}%</b><span>of the ${C.bodyWord||(C.id==="senate"?"Senate":"Assembly")}</span></div></div>
      <h3>${C.id==="senate"?"By province or territory":"Breakdown"}</h3><div class="bars" style="--accent:${G.color}">${by.map(([k,v])=>`<div class="bar"><span>${k}</span><span class="amt">${v}</span><div class="track"><div class="fill" style="width:${v/mx*100}%"></div></div></div>`).join("")}</div>
      ${C.id!=="ontario"?`<button class="chipbtn" id="${C.id}-plist">List all ${ms.length} in the table ↓</button>`:""}${srcA(C.src)}<button class="linkbtn" id="${C.id}-back" style="font-size:13px">← Back</button>`; }
  else if(st.panel&&st.panel.type==="maj"){ const gov=c.pc, others=C.members.length-gov;
    h=`<div class="kicker">Working majority · how it is worked out</div><h2>${gov-1-others}</h2><div class="lede">How many votes the government can lose and still win, if every MPP votes along party lines.</div>
      <div class="calc"><div><span>PC MPPs</span><b>${gov}</b></div><div><span>minus the Speaker</span><b>− 1</b></div><div class="sum"><span>PC votes available</span><b>${gov-1}</b></div>
      <div><span>All other MPPs (${C.order.filter(g=>g!=="pc").map(g=>`${C.groups[g].short} ${c[g]||0}`).join(" + ")})</span><b>− ${others}</b></div><div class="sum big"><span>Working majority</span><b>${gov-1-others}</b></div></div>
      ${srcA(C.src)}<button class="linkbtn" id="${C.id}-back" style="font-size:13px">← Back</button>`; }
  else { const roles=C.id==="ontario"?C.roles:[["Speaker of the Senate","Gagné, Raymonde"],...C.members.filter(x=>x.group==="GRO").map(x=>["Government Representative's Office",x.sort])];
    h=`<div class="kicker">The ${C.id==="senate"?"Senate":"Assembly"}</div><h2>Key roles</h2><ul class="list">${roles.map(([r,n])=>{ const mm=C.members.find(x=>x.sort===n||("Hon. "+x.name)===n||x.name===n); return `<li class="item">${mm?`<button class="linkbtn" data-i="${mm.i}">${mm.name}</button>`:`<span class="nm">${n}</span>`}<span class="rl">${r}</span></li>`; }).join("")}</ul>
      ${srcA(C.id==="ontario"?ON_ROLES_SRC:SEN_SPK_SRC)}
      ${C.id==="senate"?`<div class="note">Most senators do not belong to a political party. Only the Conservatives sit as a party caucus; the other groups are parliamentary groups that senators join for committee work and organization.</div>`:""}
      <div class="note">Click any seat to open that ${C.id==="senate"?"senator":"MPP"}.</div>`; }
  el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); el.innerHTML=h;
  el.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>chSelect(C,+b.dataset.i,true));
  const tw=document.getElementById(C.id+"-towheel"); if(tw&&m) tw.onclick=()=>{ const mn=ON_MIN.find(x=>x.ola===m.name); document.getElementById("pm-stage").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"}); pmSelect(m.name==="Doug Ford"?"premier":mn.id,true); };
  const bk=document.getElementById(C.id+"-back"); if(bk) bk.onclick=()=>{ st.sel=null; st.panel=null; st.focus=null; if(C.map){ C.map.select(null,false); return; } chSummary(C); chProfile(C); chList(C); d3.select("#"+C.id+"-svg").transition().duration(RM?0:500).call(C.zoom.transform,d3.zoomIdentity); };
  const pl=document.getElementById(C.id+"-plist"); if(pl) pl.onclick=()=>{ document.getElementById(C.id+"-g").value=st.panel.g; chList(C); document.getElementById(C.id+"-tbl").scrollIntoView({behavior:RM?"auto":"smooth",block:"center"}); };
}
function chSelect(C,i,zoom){ zoom=false; if(C.map){ document.getElementById(C.map.stageId).scrollIntoView({behavior:RM?"auto":"smooth",block:"center"}); return C.map.select(C.map.key(i),zoom); } const st=chState[C.id]; st.sel=i; st.panel=null; st.focus=null; chSummary(C); chProfile(C); chList(C);
  if(zoom){ const m=C.members[i], svg=d3.select("#"+C.id+"-svg"), vb=svg.attr("viewBox").split(" ").map(Number), k=2.6, cx=vb[0]+vb[2]/2, cy=vb[1]+vb[3]/2;
    const mx=C.portrait?-m.y:m.x, my=C.portrait?m.x:m.y; svg.transition().duration(RM?0:750).ease(d3.easeCubicInOut).call(C.zoom.transform,d3.zoomIdentity.translate(cx-mx*k,cy-my*k).scale(k)); }
  if(window.innerWidth<980) document.getElementById(C.id+"-panel").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"}); }

function renderChamber(id){
  if(id==="vicscore") return renderVicScorePage();
  if(id==="misscore") return renderMisScorePage();
  if(id==="fedscore") return renderFedScorePage();
  if(id==="bcleg") return renderBcLeg();
  if(id==="skleg") return renderSkLeg();
  if(typeof PV_CFG!=="undefined"&&PV_CFG[id]) return renderPvLeg(PV_CFG[id]);
  const C=CH[id], st=chState[id], el=document.getElementById("ch-"+id);
  if(!st.built&&id==="ontario"){
    el.innerHTML=`<section class="hsum" id="${id}-sum"></section>
     <section class="nsec pmwrap"><div class="kicker">Power map · Queen's Park</div><h2 class="nh pmtitle">Elected Officials</h2>
       ${foldHTML("on-fold","How to read this map","What each part means and how to explore it",
         [["The room on the left","is where Ontario's laws are made. Each dot is one MPP, a person voters chose to speak for their area. The colour shows their party."],
          ["The Premier","is the leader of the government. It is the leader who has the support of most MPPs."],
          ["Cabinet","is the Premier's team. Each minister is also an MPP with a seat in the room."],
          ["Ministries","are the departments that do the work, like Health or Education. Cabinet ministers are in charge of them, and a deputy minister runs each one every day."]],
         [["Point at","or tap any dot, name or box to see who it is."],["Click a minister","to draw a line to their seat and to the ministry they lead."],["Click a ministry","to see who is in charge of it and where they sit."],["Search","for any MPP, riding, minister or ministry. Details appear in the box under the map."]],
         "Ministers are from the September 10, 2026 shuffle; deputy ministers from Ontario's own directory.")}
       <div id="pm-slot"></div>
       <div class="src">${C.approx} Seating plan: <a href="${ON_PLAN_SRC[1]}" target="_blank" rel="noopener">${ON_PLAN_SRC[0]}</a>.</div></section>`;
    renderPowerMap();
    wireFold("on-fold");
    el.insertAdjacentHTML("beforeend",`<div class="hgrid"><div class="hmain"><section class="nsec"><div class="kicker">About the Assembly</div><h2 class="nh">What the Legislative Assembly does</h2>
        <div class="does">
         <div><b>Forms the government</b><span>The leader who can win the support of most MPPs becomes Premier and picks Cabinet. That is usually the leader of the party with the most seats.</span></div>
         <div><b>Makes laws</b><span>Bills are debated here and in committees, then need Royal Assent from the Lieutenant Governor. Ontario has no Senate or upper house.</span></div>
         <div><b>Holds the government to account</b><span>Opposition MPPs question ministers, most visibly in daily Question Period.</span></div>
         <div><b>Controls the money</b><span>Budgets, spending estimates and taxes must be approved by the Assembly.</span></div>
         <div><b>Represents Ontarians</b><span>Each of the 124 MPPs speaks for one riding.</span></div>
        </div>
        <div class="sits">
         <div><div class="kicker">When the Assembly sits</div>
          <table class="hrs"><tbody><tr><td>Monday</td><td>10:15 a.m. – 6:00 p.m.</td></tr><tr><td>Tuesday</td><td>9:00 a.m. – evening</td></tr><tr><td>Wednesday</td><td>9:00 a.m. – evening</td></tr><tr><td>Thursday</td><td>9:00 a.m. – evening</td></tr><tr><td>Friday</td><td>Not a regular sitting day</td></tr></tbody></table>
          <span class="src">Regular hours under Standing Order 9. Tuesday to Thursday, private members' business starts at 6:00 p.m. and the House adjourns when it ends. The Assembly can change its hours.</span></div>
         <div class="qbox"><div class="kicker">Quorum</div><span class="bign">12</span><span class="src">MPPs, including the Speaker, must be present for the House to meet (Standing Order 12).</span></div>
         <div><div class="kicker">Question Period</div><span class="src" style="font-size:13px">Question Period is part of the morning routine, which starts at 10:15 a.m. It lasts up to 60 minutes, including supplementary questions. Government MPPs sit on the Speaker's right and opposition MPPs on the left, with Cabinet and opposition leaders in the front rows.</span></div>
        </div>
        ${srcA(ON_SO_SRC)}
        <div class="who4"><span><b>Speaker</b> elected by MPPs; keeps order impartially</span><span><b>Cabinet</b> leads ministries; front bench</span><span><b>Opposition</b> questions and proposes alternatives</span><span><b>Backbenchers</b> most MPPs; debate and sit on committees</span></div>
       </section></div>
       <div class="hside">${ridingBtn("ontario")}<section class="nsec"><div class="lgh"><h2 class="nh">Changes since the 2025 election</h2></div>
        <div class="seg lgfs"><button class="onlgf" data-f="all">All</button><button class="onlgf" data-f="bye">By-elections</button><button class="onlgf" data-f="cross">Party changes</button><button class="onlgf" data-f="vac">Vacancies</button></div>
        <ol class="hlog" id="onlog"></ol>${srcA(ON_LOG_SRC)}</section></div></div>`);
    document.querySelectorAll(".onlgf").forEach(b=>b.onclick=()=>{ onLogFilter=b.dataset.f; renderOnLog(); });
    renderOnLog();
    st.built=true;
  }
  if(!st.built){
    el.innerHTML=`<section class="hsum" id="${id}-sum"></section>
     <div class="hgrid"><div class="hmain">
       <div class="nsec hchamber"><div class="kicker">Seating plan · ${C.title}</div><h2 class="nh pmtitle">Who sits where</h2>
         ${foldHTML(id+"-fold","How to read this seating plan","What the dots mean and how to explore them",
           [["The room","is the Senate chamber in Ottawa. Each dot is one of the 105 seats. Senators are appointed, not elected."],
            ["The colour","shows the senator's parliamentary group. Most senators belong to a group, not a political party."],
            ["The Speaker","sits at the head of the room. The Government Representative's Office sits on the Speaker's right, and the Conservative opposition faces them."],
            ["Dashed circles","are empty seats waiting for a new senator."]],
           [["Point at","or tap any dot to see who sits there."],["Click a seat","to open that senator's details."],["Tap a group","above the seating plan to light up its seats and open its breakdown."],["Search","the list below to find a senator or province."]],
           "")}
         <div class="hbar"><div class="kicker">Two seats to a desk</div>
         <div class="zbtn">${id==="senate"?"":`<button id="${id}-flip" class="rotbtn" title="Swap which side is at the top">⇅ Flip chamber</button>`}<button id="${id}-zin" aria-label="Zoom in" title="Zoom in">+</button><button id="${id}-zout" aria-label="Zoom out" title="Zoom out">−</button><button id="${id}-zr" aria-label="Reset the chamber" title="Reset the chamber" class="zreset"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7"/><path d="M3 2.5v3h3"/></svg><span>Reset</span></button></div></div>
         <div class="hstage" id="${id}-stage"><svg id="${id}-svg" role="img" aria-label="${C.title} chamber"></svg><div class="tip" id="${id}-tip" hidden></div></div>
         <div class="src">${C.approx}${id==="ontario"?` Seating plan: <a href="${ON_PLAN_SRC[1]}" target="_blank" rel="noopener">${ON_PLAN_SRC[0]}</a>.`:""}</div></div>
       <div class="nsec"><div class="hfilters"><input id="${id}-q" type="search" placeholder="Find a ${id==="senate"?"senator":"MPP"} or ${C.placeNoun.toLowerCase()}" aria-label="Search">
         <select id="${id}-g" aria-label="Group"><option value="">All ${id==="senate"?"groups":"parties"}</option>${C.order.map(g=>`<option value="${g}">${C.groups[g].name}</option>`).join("")}</select><span class="src" id="${id}-count"></span></div>
         <div class="htable" id="${id}-tbl"><table><thead><tr><th>${C.memberNoun}</th><th>${C.placeNoun}</th><th>${id==="senate"?"Group":"Party"}</th>${id==="senate"?"<th>Retires</th>":""}</tr></thead><tbody id="${id}-rows"></tbody></table></div>${srcA(C.src)}</div>
       ${id==="senate"?`<section class="nsec"><div class="kicker">About the Senate</div><h2 class="nh">What the Senate does</h2><div class="does">
         <div><b>Reviews laws</b><span>Every bill must pass the Senate and the House in the same form before Royal Assent. Senators can amend or reject bills.</span></div>
         <div><b>Studies issues</b><span>Committees hear witnesses and report on public issues such as mental health and aging.</span></div>
         <div><b>Represents regions</b><span>The 105 seats are divided among the provinces and territories, not by population.</span></div>
         <div><b>Speaks for minorities</b><span>Senators raise the interests of groups that can be overlooked in the elected House.</span></div></div>${srcA(SEN_ROLE_SRC)}</section>`:""}
     </div><div class="hside"><aside class="nsec hpanel" id="${id}-panel" aria-live="polite"></aside></div></div>`;
    chDraw(C); wireFold(id+"-fold");
    ["q","g"].forEach(k=>document.getElementById(`${id}-${k}`).addEventListener("input",()=>chList(C)));
    const svg=d3.select("#"+id+"-svg");
    document.getElementById(id+"-zin").onclick=()=>svg.transition().duration(300).call(C.zoom.scaleBy,1.4);
    document.getElementById(id+"-zout").onclick=()=>svg.transition().duration(300).call(C.zoom.scaleBy,1/1.4);
    const fb=document.getElementById(id+"-flip"); if(fb) fb.onclick=()=>{ C.flip=!C.flip; try{ localStorage.setItem("pv-flip-"+id,C.flip?"1":"0"); }catch(e){} chDraw(C); };
    document.getElementById(id+"-zr").onclick=()=>{ const bk=document.getElementById(id+"-back"); if(bk&&chState[id]&&chState[id].sel!=null) bk.click(); svg.transition().duration(RM?0:600).call(C.zoom.transform,d3.zoomIdentity); };
    st.built=true;
  }
  chSummary(C); chProfile(C); chList(C);
}
