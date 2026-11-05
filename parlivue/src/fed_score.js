/* ================= GOVERNMENT OF CANADA · FEDERAL DEPARTMENTS SCORECARD =================
   Data: Treasury Board Secretariat, GC InfoBase open data (Departmental Plans and Departmental Results Reports),
   loaded on demand from fedscore.json. Overviews and report links: ParliVue 31-department source guide (Nov 1, 2026). */
const FSC_SRC={
  rbpo:["TBS GC InfoBase: Expenditures and FTEs by Program and by Organization (DP and DRR)","https://open.canada.ca/data/en/dataset/a35cf382-690c-4221-a971-cf0fd189a46f"],
  pipo:["TBS GC InfoBase: Performance Information by Program and by Organization (DP and DRR)","https://open.canada.ca/data/en/dataset/a35cf382-690c-4221-a971-cf0fd189a46f"],
  ai:["Government of Canada: AI Strategy for the Federal Public Service 2025–2027","https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/gc-ai-strategy-full-text.html"]
};
let FSC=null;
function fedSwitch(cur){
  const b=(id,t,sub)=>`<button class="vsw ${cur===id?"on":""}" data-go="${id}" ${cur===id?'aria-current="page"':""}><span class="vswk">Government of Canada</span><b>${t}</b><span class="vsws">${sub}</span></button>`;
  return `<nav class="vswitch" aria-label="Government of Canada pages">${b("fedscore","Departments","31 departments and agencies: plans, spending and results")}${b("federal","Cabinet wheel","Prime Minister, ministers and the deputy heads of each department")}</nav>`;
}
const fB=n=>n==null?"—":Math.abs(n)>=1e9?"$"+(n/1e9).toLocaleString("en-CA",{minimumFractionDigits:2,maximumFractionDigits:2})+"B":"$"+(n/1e6).toLocaleString("en-CA",{minimumFractionDigits:1,maximumFractionDigits:1})+"M";
const fN=n=>n==null?"—":Math.round(n).toLocaleString("en-CA");
const fPf=x=>{const t=x.toFixed(1);return t.endsWith(".0")?t.slice(0,-2):t;};
const fPill=(c,t)=>`<span class="dpill ${c}">${t}</span>`;
const fGauge=(pct,cls,lab)=>{const r=34,L=Math.PI*r,f=Math.max(0,Math.min(pct,100))/100;return `<span class="dgauge ${cls}" role="img" aria-label="${lab}: ${fPf(pct)}%"><svg viewBox="0 0 84 46"><path d="M8 42a34 34 0 0 1 68 0" class="gt"/><path d="M8 42a34 34 0 0 1 68 0" class="gf" stroke-dasharray="${(f*L).toFixed(1)} ${L.toFixed(1)}"/>${pct>100?`<path d="M8 42a34 34 0 0 1 68 0" class="go" stroke-dasharray="0 ${(L*0.985).toFixed(1)} ${(L*0.015).toFixed(1)}"/>`:""}</svg><b>${fPf(pct)}%</b></span>`;};
const fCard=k=>`<div class="dkpi"><span class="dk-l">${k[0]}</span><b class="dk-v">${k[1]}</b><span class="dk-p">${k[2]}</span><span class="dk-s">${k[3]}</span>${k[4]||""}</div>`;
const fA=s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`;
const fEsc=s=>String(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* spending vs plan: over = red, under = green (same rule as the city scorecards) */
const fSpend=(p,a)=>{if(!p) return {pc:null,cls:"",pill:fPill("neu","No plan figure")};const pc=(a-p)/p*100;return {pc,cls:vplan("exp",pc),pill:fPill(pc>0.05?"off":"ok",(pc>0.05?"Over plan ":"Within plan ")+vsP(pc))};};
/* targets: share met of those assessed (met + not met) */
const fTgt=c=>{const n=c["met"]+c["not met"];return n?{pct:c["met"]/n*100,n,cls:c["met"]/n>=.75?"ok":c["met"]/n>=.5?"watch":"off"}:{pct:null,n:0,cls:"neu"};};
const fLast=d=>d.hist.find(h=>h[0]==="2024–25");
/* display formatting only: "170000.0" → "170,000", "3.0/2025" → "Mar 2025"; the values themselves are unchanged */
const fVal=s=>{s=String(s??"").trim(); if(!/^-?\d+(\.\d+)?$/.test(s)) return fEsc(s); const n=Number(s), dec=(s.split(".")[1]||"").replace(/0+$/,"").length; return n.toLocaleString("en-CA",{minimumFractionDigits:dec,maximumFractionDigits:dec});};
const FMON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fBy=s=>{const m=String(s||"").match(/^(\d+)(?:\.0)?\/(\d{4})$/); return m&&+m[1]>=1&&+m[1]<=12?FMON[+m[1]-1]+" "+m[2]:fEsc(s);};
const fRep=(d,y,cat)=>(d.src||[]).find(s=>s.y===y&&s.cat===cat);
/* reporting transparency: share of large variances with an explanation; share of due indicators with a result */
const fRatio=(a,b)=>b?{pct:a/b*100,txt:a+" of "+b,cls:a/b>=.9?"dn":a/b>=.5?"cau":"up",kc:a/b>=.9?"ok":a/b>=.5?"watch":"off"}:{pct:null,txt:"—",cls:"",kc:"neu"};

function renderFedScorePage(){
  const el=document.getElementById("ch-fedscore"); if(!el) return;
  if(el.dataset.built) return; el.dataset.built="1";
  el.innerHTML=fedSwitch("fedscore")+`<section id="fedscore" class="nsec vicscore" aria-label="Federal departments scorecard"><p class="muted">Loading the departments…</p></section>`;
  el.querySelectorAll(".vswitch [data-go]").forEach(b=>b.onclick=()=>{ if(!b.classList.contains("on")){ show(b.dataset.go); window.scrollTo(0,0); } });
  fetch("fedscore.json").then(r=>{if(!r.ok) throw new Error(r.status); return r.json();}).then(j=>{FSC=j; fedOverview();})
   .catch(()=>{document.getElementById("fedscore").innerHTML=`<p class="note">The department data could not be loaded. Please refresh the page.</p>`; el.dataset.built="";});
}
function fedHead(sub){
  return `<header class="dsh-head"><div><div class="kicker">Government of Canada · Department dashboard</div><h2 class="nh">${sub||"Federal Departments Scorecard 2024–2027"}</h2>
     <p class="pagelede">What each department planned to spend and achieve, and what it reported, from the Treasury Board's open data on Departmental Plans and Results Reports.</p></div></header>
    <div class="dkey"><span><i class="ok"></i>Good: within plan, or 75%+ of targets met</span><span><i class="watch"></i>Caution: 50–74% of targets met</span><span><i class="off"></i>Over plan, or under 50% of targets met</span><span class="muted">Gauge: actual as % of plan</span></div>`;
}
function fedTiming(){
  return `<div class="dtiming"><b>About timing.</b> The federal fiscal year runs April 1 to March 31. Results for a year are published in the Departmental Results Report the following fall. This page uses reported results for 2024–25 and plans for 2025–26 and 2026–27; 2025–26 results are not yet in the open data. Planned spending is set at the start of the year; Parliament can approve more during the year through Supplementary Estimates, so this page shows spending above the start-of-year plan as over plan even when Parliament later approved the extra funds. Results are self-reported: each department sets its own indicators and targets and rates its own results, so rates are not comparable between departments. <b>The federal budget was scheduled for tabling on November 5, 2026</b> and may change the 2026–27 plans shown here.</div>`;
}
function fedOverview(){
  const el=document.getElementById("fedscore"), D=FSC.depts;
  const have=D.filter(d=>fLast(d)), P=have.reduce((s,d)=>s+fLast(d)[1],0), A=have.reduce((s,d)=>s+fLast(d)[2],0);
  const over=have.filter(d=>fLast(d)[2]>fLast(d)[1]*1.0005).length;
  const C=D.reduce((c,d)=>{c.m+=d.c24["met"];c.n+=d.c24["not met"];c.u+=d.c24["not available"]+d.c24["to be achieved"]+d.c24[""];return c;},{m:0,n:0,u:0});
  const TX=D.reduce((t,d)=>{t.x+=d.tr.bigx;t.b+=d.tr.big;return t;},{x:0,b:0});
  const p26=D.reduce((s,d)=>s+(d.plan.y26||0),0), p25=D.reduce((s,d)=>s+(d.plan.y25||0),0), tp=C.m/(C.m+C.n)*100, sp=fSpend(P,A);
  const kp=`<div class="dsh-kpis k5" aria-label="Federal summary">${[
    ["Planned spending · 2026–27",fB(p26),fPill("neu",(p26>=p25?"+":"−")+Math.abs((p26-p25)/p25*100).toFixed(1)+"% vs 2025–26"),"31 departments · forecast in the 2025–26 plans; may change with the Nov 5 budget",""],
    ["Planned spending · 2025–26",fB(p25),fPill("neu","Results due fall 2026"),"Not yet reported in the open data",""],
    ["Actual spending · 2024–25",fB(A),sp.pill,"Plan "+fB(P)+" · "+have.length+" departments",fGauge(A/P*100,sp.cls==="up"?"off":"ok","Actual vs plan")],
    ["Departments over plan · 2024–25",over+" of "+have.length,fPill(over>have.length/2?"off":"watch",Math.round(over/have.length*100)+"%"),"Spent more than planned at the start of the year",""],
    ["Targets met · 2024–25",fN(C.m)+" of "+fN(C.m+C.n),fPill(tp>=75?"ok":tp>=50?"watch":"off",fPf(tp)+"% met"),fN(C.u)+" more not yet measurable",fGauge(tp,tp>=75?"ok":tp>=50?"watch":"off","Targets met")]
  ].map(fCard).join("")}</div>`;
  const rows=D.map(d=>{const h=fLast(d),s=h?fSpend(h[1],h[2]):null,t=fTgt(d.c24);
    return `<tr><th scope="row"><button class="linkbtn fdgo" data-id="${d.id}">${d.name}</button></th>
      <td>${h?fB(h[1]):"—"}</td><td>${h?fB(h[2]):"—"}</td>
      <td class="vcell ${s?s.cls:""}">${h&&s.pc!=null?vsSgn(h[2]-h[1],fB)+` <small>${vsP(s.pc)}</small>`:'<span class="muted">Not in open data</span>'}</td>
      <td class="vcell ${t.n?(t.cls==="ok"?"dn":t.cls==="off"?"up":"cau"):""}">${t.n?fPf(t.pct)+"%"+` <small>${d.c24["met"]} of ${t.n}</small>`:'<span class="muted">—</span>'}</td>
      <td class="vcell ${fRatio(d.tr.bigx,d.tr.big).cls}">${d.tr.big?fRatio(d.tr.bigx,d.tr.big).txt:'<span class="muted">—</span>'}</td>
      <td>${fB(d.plan.y25)}</td><td>${fB(d.plan.y26)}</td></tr>`;}).join("");
  el.innerHTML=fedHead()+`<div class="dsh-kh">2026–27 · current year plan<span>2024–25 is the latest year with reported results.</span></div>${kp}
    <div class="sctwrap"><table class="sct fedtbl"><caption>31 departments · select one for its dashboard</caption><thead><tr><th scope="col">Department</th><th scope="col">2024–25 planned</th><th scope="col">2024–25 actual</th><th scope="col">Variance</th><th scope="col">Targets met</th><th scope="col">Variances explained</th><th scope="col">2025–26 planned<small class="fth">results due fall 2026</small></th><th scope="col">2026–27 planned</th></tr></thead><tbody>${rows}
      <tr class="tot"><th scope="row">Total<small class="fcr">2024–25 columns: ${have.length} departments with results in the open data${D.length>have.length?" (excludes "+D.filter(d=>!fLast(d)).map(d=>d.name).join(", ")+")":""} · 2025–26 and 2026–27 columns: all ${D.length}</small></th><td>${fB(P)}</td><td>${fB(A)}</td><td class="vcell ${sp.cls}">${vsSgn(A-P,fB)} <small>${vsP(sp.pc)}</small></td><td>${fPf(tp)}% <small>${fN(C.m)} of ${fN(C.m+C.n)}</small></td><td>${TX.x} of ${TX.b}</td><td>${fB(p25)}</td><td>${fB(p26)}</td></tr></tbody></table></div>
    ${fedTiming()}
    <div class="note"><b>Targets met</b> counts indicators the department rated "met" out of those rated "met" or "not met". Indicators not yet measurable or due in a later year are left out of the percentage. <b>Variances explained</b> counts programs whose spending differed from plan by at least 10% and $1M, and how many of those carry the department’s explanation in the open data; a department may still explain them in the report itself. Finance Canada and Employment and Social Development Canada include large statutory transfers (for example, payments to provinces, Old Age Security and Employment Insurance), which dominate the totals.</div>
    <div class="src">Source: ${fA(FSC_SRC.rbpo)} · ${fA(FSC_SRC.pipo)} · open data updated Oct 4, 2026</div>`;
  el.querySelectorAll(".fdgo").forEach(b=>b.onclick=()=>{fedDept(+b.dataset.id); window.scrollTo(0,el.offsetTop-10);});
}
function fedDept(id){
  const el=document.getElementById("fedscore"), d=FSC.depts.find(x=>x.id===id), h=fLast(d), t=fTgt(d.c24);
  const sp=h?fSpend(h[1],h[2]):null;
  const ftep=h&&h[3]?h[4]/h[3]*100:null;
  const cards=`<div class="dsh-kh">2026–27 · current year plan<span>Results for each year are in the sections below.</span></div>
   <div class="dsh-kpis k5">${[
    ["Planned spending · 2026–27",fB(d.plan.y26),fPill("neu",d.plan.f26?fN(d.plan.f26)+" planned staff (FTEs)":"Plan"),"Forecast in the 2025–26 plan · may change with the Nov 5 budget",""],
    ["Planned spending · 2025–26",fB(d.plan.y25),fPill("neu","Results due fall 2026"),"2025–26 Departmental Plan",""],
    ["Spending · 2024–25",h?fB(h[2]):"Not reported",h?sp.pill:fPill("neu","Not in open data"),h?"Plan "+fB(h[1]):"The 2024–25 results are not in the open data",h?fGauge(h[2]/h[1]*100,sp.cls==="up"?"off":"ok","Spending vs plan"):""],
    ["Staff (FTEs) · 2024–25",h?fN(h[4]):"—",h?fPill(h[4]>h[3]?"watch":"ok",(h[4]>h[3]?"Above":"Within")+" plan "+vsP((h[4]-h[3])/h[3]*100)):"",h?"Plan "+fN(h[3]):"",h&&ftep?fGauge(ftep,h[4]>h[3]?"watch":"ok","Staff vs plan"):""],
    ["Targets met · 2024–25",t.n?d.c24["met"]+" of "+t.n:"—",t.n?fPill(t.cls,fPf(t.pct)+"% met"):fPill("neu","Not in open data"),(d.c24["not available"]+d.c24["to be achieved"]+d.c24[""])+" more not yet measurable",t.n?fGauge(t.pct,t.cls,"Targets met"):""]
   ].map(fCard).join("")}</div>`;
  /* programs */
  const pr=d.progs.filter(p=>p.p||p.a).map(p=>({...p,v:p.a-p.p,pc:p.p?(p.a-p.p)/p.p*100:null}));
  const big=[...pr].sort((a,b)=>Math.abs(b.v)-Math.abs(a.v)).slice(0,6).filter(p=>Math.abs(p.v)>0);
  const progTbl=`<div class="sctwrap"><table class="sct"><caption>2024–25 · planned vs actual by program</caption><thead><tr><th scope="col">Program</th><th scope="col">Planned</th><th scope="col">Actual</th><th scope="col">Variance</th></tr></thead><tbody>${pr.map(p=>`<tr><th scope="row">${fEsc(p.n)}<small class="fcr">${fEsc(p.cr)}</small></th><td>${fB(p.p)}</td><td>${fB(p.a)}</td><td class="vcell ${p.pc!=null?vplan("exp",p.pc):""}">${vsSgn(p.v,fB)}${p.pc!=null?` <small>${vsP(p.pc)}</small>`:""}</td></tr>`).join("")}</tbody></table></div>`;
  const why=big.length?`<div class="sctwrap"><table class="sct fexp"><caption>Largest variances · the department's own explanation</caption><thead><tr><th scope="col">Program</th><th scope="col">Variance</th><th scope="col">What the department reported</th></tr></thead><tbody>${big.map(p=>`<tr><th scope="row">${fEsc(p.n)}</th><td class="vcell ${p.pc!=null?vplan("exp",p.pc):""}">${vsSgn(p.v,fB)}</td><td>${p.x?fEsc(p.x):'<span class="muted">No explanation in the open data; see the 2024–25 Departmental Results Report under Sources.</span>'}</td></tr>`).join("")}</tbody></table></div>`:"";
  /* indicators grouped by status */
  const grp=[["not met","Not met","off",true],["met","Met","ok",false],["not available","Not available","neu",false],["to be achieved","Due in a later year","neu",false],["","No status given","neu",false]];
  const indHtml=d.i24.length?grp.map(([k,l,c,open])=>{const L=d.i24.filter(z=>z.s===k);if(!L.length) return "";
    return `<details class="roll"${open?" open":""}><summary><span class="rollh"><span class="rollt">${l} · ${L.length}</span></span><span class="rollc" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6l4 4 4-4"/></svg></span></summary><div class="rollb"><div class="sctwrap"><table class="sct find"><thead><tr><th scope="col">Indicator</th><th scope="col">Target</th><th scope="col">Result</th></tr></thead><tbody>${L.map(z=>`<tr><th scope="row">${fEsc(z.i)}<small class="fcr">${fEsc(z.act)}</small></th><td>${fVal(z.t)}${z.by?`<small>by ${fBy(z.by)}</small>`:""}</td><td>${z.r?fVal(z.r):'<span class="muted">—</span>'}</td></tr>`).join("")}</tbody></table></div></div></details>`;}).join(""):`<p class="note">The 2024–25 results indicators for this organization are not in the open data. ${d.c23["met"]+d.c23["not met"]?`In 2023–24 it reported ${d.c23["met"]} of ${d.c23["met"]+d.c23["not met"]} assessed targets met.`:""}</p>`;
  /* history */
  const hist=`<div class="sctwrap"><table class="sct"><caption>Planned vs actual spending and staff, as published</caption><thead><tr><th scope="col">Fiscal year</th><th scope="col">Planned</th><th scope="col">Actual</th><th scope="col">Variance</th><th scope="col">Staff planned</th><th scope="col">Staff actual</th></tr></thead><tbody>${d.hist.map(x=>{const pc=x[1]?(x[2]-x[1])/x[1]*100:null;return `<tr><th scope="row">${x[0]}</th><td>${fB(x[1])}</td><td>${fB(x[2])}</td><td class="vcell ${pc!=null?vplan("exp",pc):""}">${vsSgn(x[2]-x[1],fB)}${pc!=null?` <small>${vsP(pc)}</small>`:""}</td><td>${fN(x[3])}</td><td>${fN(x[4])}</td></tr>${x[5]&&x[5].v?`<tr class="fwhy"><td colspan="6"><b>Largest change: ${fEsc(x[5].n)} (${vsSgn(x[5].v,fB)}).</b> ${x[5].x?fEsc(x[5].x):'<span class="muted">No explanation in the open data.</span>'}</td></tr>`:""}`;}).join("")}
    <tr><th scope="row">2025–26 <small>plan</small></th><td>${fB(d.plan.y25)}</td><td class="muted">Due fall 2026</td><td></td><td>${fN(d.plan.f25)}</td><td></td></tr>
    <tr><th scope="row">2026–27 <small>plan</small></th><td>${fB(d.plan.y26)}</td><td></td><td></td><td>${fN(d.plan.f26)}</td><td></td></tr></tbody></table></div>
    <div class="note">Each row's planned figure is the one published with that year's results. Large gaps can reflect funding added during the year through Supplementary Estimates, programs moved between departments, or one-time statutory payments. The department's own explanations are in the 2024–25 results section.</div>`;
  const srcTbl=`<div class="sctwrap"><table class="sct fsrc"><thead><tr><th scope="col">Report</th><th scope="col">Year</th><th scope="col">Use for</th></tr></thead><tbody>${[...new Map(d.src.map(s=>[s.u+s.y,s])).values()].map(s=>`<tr><th scope="row">${s.u?`<a href="${s.u}" target="_blank" rel="noopener">${fEsc(s.txt)}</a>`:fEsc(s.txt)}</th><td>${s.y}</td><td>${d.src.filter(z=>z.u===s.u&&z.y===s.y).map(z=>z.cat).join(", ")}</td></tr>`).join("")}</tbody></table></div>`;
  const tabs=[["ov","Overview","Mandate and AI"],["y26","2026–27","Current year · plan"],["y25","2025–26","Plan · results due fall 2026"],["y24","2024–25","Results · plan vs actual"],["hist","Spending history","2020–21 to 2024–25"],["src","Sources","Reports by year"]];
  const trHtml=(()=>{const e=fRatio(d.tr.bigx,d.tr.big),r=fRatio(d.tr.duer,d.tr.due);const un=pr.filter(p=>Math.abs(p.v)>=1e6&&(p.p===0||Math.abs(p.v)/Math.max(p.p,1)>=.1)&&!p.x).sort((a,b)=>Math.abs(b.v)-Math.abs(a.v));
     return `<div class="dsh-kpis k3">${[
       ["Large variances explained · 2024–25",e.txt,fPill(e.kc,e.pct==null?"None to explain":fPf(e.pct)+"%"),"Programs off plan by 10%+ and $1M+, with an explanation in the open data",e.pct!=null?fGauge(e.pct,e.kc,"Variances explained"):""],
       ["Results reported · 2024–25",r.txt,fPill(r.kc,r.pct==null?"No results due":fPf(r.pct)+"%"),"Indicators due this year with a result, rather than 'not available'",r.pct!=null?fGauge(r.pct,r.kc,"Results reported"):""],
       ["Indicators · plans","2025–26: "+d.n25,fPill("neu","2026–27: "+d.n26),"Number of indicators the department committed to; changes between years make trends harder to follow",""]].map(fCard).join("")}</div>
     <div class="note"><b>Self-reported.</b> Each department chooses its indicators, sets its targets and rates its own results. Treasury Board publishes them as departments submit them.</div>
     ${un.length?vRoll("Large variances with no explanation in the open data",un.length+" programs, 2024–25",`<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Program</th><th scope="col">Planned</th><th scope="col">Actual</th><th scope="col">Variance</th></tr></thead><tbody>${un.map(p=>`<tr><th scope="row">${fEsc(p.n)}</th><td>${fB(p.p)}</td><td>${fB(p.a)}</td><td class="vcell ${p.pc!=null?vplan("exp",p.pc):""}">${vsSgn(p.v,fB)}${p.pc!=null?` <small>${vsP(p.pc)}</small>`:""}</td></tr>`).join("")}</tbody></table></div><div class="note">The department may explain these in the text of its 2024–25 Departmental Results Report; see Sources.</div>`,true):""}
     <div class="src">Source: ${fA(FSC_SRC.rbpo)} · ${fA(FSC_SRC.pipo)}</div>`;})();
  const rep=(y,cat,lab)=>{const s=fRep(d,y,cat);return s&&s.u?`<a href="${s.u}" target="_blank" rel="noopener">${fEsc(s.txt)}</a>`:lab;};
  const crpTbl=(cols,cap)=>d.crp.length?`<div class="sctwrap"><table class="sct"><caption>${cap}</caption><thead><tr><th scope="col">Core responsibility</th>${cols.map(c=>`<th scope="col">${c[0]}</th>`).join("")}</tr></thead><tbody>${d.crp.map(c=>`<tr><th scope="row">${fEsc(c[0])}</th>${cols.map(k=>`<td>${k[1](c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:"";
  const panes={
   ov:`<p class="vslede">${fEsc(d.ov)}</p>${d.ai?`<div class="why"><b>AI and digital.</b> ${fEsc(d.ai)}</div>`:""}
     <div class="src">Source: ${rep("2025","Goals","2025–26 Departmental Plan")} · ${fA(FSC_SRC.ai)}</div>`,
   y26:`<div class="dsh-kpis k3">${[
       ["Planned spending",fB(d.plan.y26),fPill("neu",d.plan.y25?vsP((d.plan.y26-d.plan.y25)/d.plan.y25*100)+" vs 2025–26":"Plan"),"Forecast in the 2025–26 Departmental Plan",""],
       ["Planned staff (FTEs)",fN(d.plan.f26),fPill("neu",d.plan.f25?vsP((d.plan.f26-d.plan.f25)/d.plan.f25*100)+" vs 2025–26":"Plan"),"Full-time equivalents",""],
       ["Results indicators",String(d.n26),fPill("neu","2025–26: "+d.n25),"Indicators the department set for 2026–27",""]].map(fCard).join("")}</div>
     ${crpTbl([["2026–27 planned",c=>fB(c[2])],["Change from 2025–26",c=>c[1]?vsP((c[2]-c[1])/c[1]*100):"—"]],"2026–27 · planned spending by core responsibility")}
     <p class="fynote">The fiscal year runs April 1, 2026 to March 31, 2027. Results will be published in the 2026–27 Departmental Results Report in fall 2027. The amounts above are the forecast published in the 2025–26 Departmental Plan; the spending tables from the 2026–27 Departmental Plan are not yet in the open data. The federal budget scheduled for November 5, 2026 may change these plans.</p>
     <div class="src">Source: ${fA(FSC_SRC.rbpo)} · ${rep("2026","Goals","2026–27 Departmental Plan")}</div>`,
   y25:`<div class="dsh-kpis k3">${[
       ["Planned spending",fB(d.plan.y25),fPill("neu","Results due fall 2026"),"2025–26 Departmental Plan",""],
       ["Planned staff (FTEs)",fN(d.plan.f25),fPill("neu","Plan"),"Full-time equivalents",""],
       ["Results indicators",String(d.n25),fPill("neu","2024–25: "+d.i24.length),"Indicators the department set for 2025–26",""]].map(fCard).join("")}</div>
     ${crpTbl([["2025–26 planned",c=>fB(c[1])]],"2025–26 · planned spending by core responsibility")}
     <p class="fynote">The fiscal year ended March 31, 2026. Actual spending and results for 2025–26 will appear here once the 2025–26 Departmental Results Report is published and added to the open data, expected in fall 2026.</p>
     <div class="src">Source: ${fA(FSC_SRC.rbpo)} · ${rep("2025","Goals","2025–26 Departmental Plan")}</div>`,
   y24:h?`${why}${vRoll("Spending by program","Planned vs actual, 2024–25",progTbl,false)}
     <h4 class="fsh">Results indicators, 2024–25</h4>
     <p class="vsp">Each department sets indicators to measure progress on its goals, with a target and a date to reach it. After the year ends, it reports the result and rates each indicator. The tables below group the indicators by that rating. <b>Target</b> is the value the department aimed for and the date it set; <b>Result</b> is the value it reported. Units are as the department published them.</p>
     ${indHtml}<h4 class="fsh">Transparency</h4>${trHtml}`:`<p class="note">The 2024–25 spending and results for this organization are not in the open data. See its 2024–25 Departmental Results Report under Sources.</p>${indHtml}`,
   hist:hist+`<div class="src">Source: ${fA(FSC_SRC.rbpo)}</div>`,
   src:`${srcTbl}<div class="note">Spending and indicators come from the Treasury Board's open data, where this organization is listed as ${fEsc(d.org)}. Some report links open a publication index; choose the named report and year there.</div><div class="src">Source: ${fA(FSC_SRC.rbpo)} · ${fA(FSC_SRC.pipo)}</div>`
  };
  el.innerHTML=`<button class="chipbtn fback">← All 31 departments</button>`+fedHead(d.name)+cards+`<div class="dsh">
    <nav class="dsh-rail" role="tablist" aria-orientation="vertical" aria-label="Department sections"><div class="dsh-rl">Sections</div>${tabs.map((t,i)=>`<button role="tab" id="fdt-${t[0]}" aria-controls="fdp-${t[0]}" aria-selected="${i?"false":"true"}" tabindex="${i?-1:0}" data-k="${t[0]}"><span>${t[1]}</span><small>${t[2]}</small></button>`).join("")}</nav>
    <div class="dsh-main">${tabs.map((t,i)=>`<div role="tabpanel" id="fdp-${t[0]}" aria-labelledby="fdt-${t[0]}" class="vspane" ${i?"hidden":""}><h3 class="dsh-ph">${t[1]}<small>${t[2]}</small></h3>${panes[t[0]]}</div>`).join("")}</div></div>`;
  el.querySelector(".fback").onclick=()=>{fedOverview(); window.scrollTo(0,el.offsetTop-10);};
  const bs=[...el.querySelectorAll(".dsh-rail button")];
  const pick=b=>bs.forEach(x=>{const on=x===b; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; document.getElementById("fdp-"+x.dataset.k).hidden=!on;});
  bs.forEach((b,i)=>{ b.onclick=()=>pick(b); b.onkeydown=e=>{ const k=(e.key==="ArrowDown"||e.key==="ArrowRight")?1:(e.key==="ArrowUp"||e.key==="ArrowLeft")?-1:0; if(k){ const n=bs[(i+k+bs.length)%bs.length]; pick(n); n.focus(); e.preventDefault(); } }; });
}
