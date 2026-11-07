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
  return `<nav class="vswitch v3" aria-label="Government of Canada pages">${b("fedscore","Departments","31 departments and agencies: budgets, spending and results")}${b("fedbudget","Budget 2026","Tabled Nov 5, 2026: fiscal outlook, new measures and departments named")}${b("federal","Cabinet wheel","Prime Minister, ministers and the deputy heads of each department")}</nav>`;
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
const fSpend=(p,a)=>{if(!p) return {pc:null,cls:"",pill:fPill("neu","No budget figure")};const pc=(a-p)/p*100;return {pc,cls:vplan("exp",pc),pill:fPill(pc>0.05?"off":"ok",(pc>0.05?"Over budget ":"Within budget ")+vsP(pc))};};
/* targets: share met of those assessed (met + not met) */
const fTgt=c=>{const n=c["met"]+c["not met"];return n?{pct:c["met"]/n*100,n,cls:c["met"]/n>=.75?"ok":c["met"]/n>=.5?"watch":"off"}:{pct:null,n:0,cls:"neu"};};
const fLast=d=>d.hist.find(h=>h[0]==="2024–25");
/* display formatting only: "170000.0" → "170,000", "3.0/2025" → "Mar 2025"; the values themselves are unchanged */
const fVal=s=>{s=String(s??"").trim(); if(!/^-?\d+(\.\d+)?$/.test(s)) return fEsc(s); const n=Number(s), dec=(s.split(".")[1]||"").replace(/0+$/,"").length; return n.toLocaleString("en-CA",{minimumFractionDigits:dec,maximumFractionDigits:dec});};
const FMON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fBy=s=>{const m=String(s||"").match(/^(\d+)(?:\.0)?\/(\d{4})$/); return m&&+m[1]>=1&&+m[1]<=12?FMON[+m[1]-1]+" "+m[2]:fEsc(s);};
/* fiscal years are named by the year they start: 2024 = April 1, 2024 to March 31, 2025 (written 2024–25 by the Government of Canada) */
const FY=y=>String(y).slice(0,4);
const FYR=y=>{const a=+FY(y);return `FY ${a}–${String(a+1).slice(2)}: April 1, ${a} – March 31, ${a+1}`;};
const FYS=y=>{const a=+FY(y);return `Apr ${a} – Mar ${a+1}`;};
const FY_NOTE=`<p class="fynote fyhead"><b>Two kinds of dates appear here.</b> <b>Fiscal years</b> run April 1 to March 31 and are always written with “FY”: FY 2026–27 means April 1, 2026 to March 31, 2027. <b>Any year without “FY” is a calendar year</b>, such as Nov 5, 2026 or fall 2027. Budget 2026 is named for the calendar year it was tabled (Nov 5, 2026), not for a fiscal year. In text quoted from the Government of Canada, a range such as 2027-28 is a fiscal year. <b>Budgeted</b> is the planned spending in each department's Departmental Plan.</p>`;
/* unit from the goal's wording only: % for percentages, $ for dollars, hours/days where stated; otherwise the plain count */
const fUnit=t=>{t=String(t||"");
  if(/percentage points?/i.test(t)) return " pts";
  if(/^\s*%|%\s*(of|increase|decrease|change)\b|\bpercent(age)?\b|\(%\)/i.test(t)) return "%";
  if(/\$\s*billions?|billions of dollars|\(\$B\)/i.test(t)) return "$B";
  if(/\$\s*millions?|millions of dollars|\(\$M\)/i.test(t)) return "$M";
  if(/per dollar|per (each )?\$\d|\(in dollars\)|\(\$\)/i.test(t)) return "$";
  if(/\$|\bdollars?\b/i.test(t)) return "$?";
  if(/\(in hours\)|\(hours\)|\bnumber of hours\b|#\s*of hours/i.test(t)) return " hours";
  if(/\(in days\)|\(days\)|\bnumber of days\b|#\s*of days/i.test(t)) return " days";
  return "";};
/* adds the unit to a plain number only; the number itself is shown exactly as published (with separators) */
const fValU=(v,u)=>{const x=fVal(v); if(!u||!/^[-–−]?[\d,]+(\.\d+)?$/.test(x)) return x;
  const neg=/^[-–−]/.test(x), m=neg?x.slice(1):x, sg=neg?"−":"", n=Number(m.replace(/,/g,""));
  if(u==="$?") u=n>=1000?"$":""; if(!u) return x;
  if(u==="$") return sg+"$"+m; if(u==="$B") return sg+"$"+m+"B"; if(u==="$M") return sg+"$"+m+"M";
  return x+u;};
const fRep=(d,y,cat)=>(d.src||[]).find(s=>s.y===y&&s.cat===cat);
/* reporting transparency: share of large variances with an explanation; share of due indicators with a result */
const fRatio=(a,b)=>b?{pct:a/b*100,txt:a+" of "+b,cls:a/b>=.9?"dn":a/b>=.5?"cau":"up",kc:a/b>=.9?"ok":a/b>=.5?"watch":"off"}:{pct:null,txt:"—",cls:"",kc:"neu"};

function renderFedScorePage(){
  const el=document.getElementById("ch-fedscore"); if(!el) return;
  if(el.dataset.built) return; el.dataset.built="1";
  el.innerHTML=fedSwitch("fedscore")+`<section id="fedscore" class="nsec vicscore" aria-label="Federal departments scorecard"><p class="muted">Loading the departments…</p></section>`;
  el.querySelectorAll(".vswitch [data-go]").forEach(b=>b.onclick=()=>{ if(!b.classList.contains("on")){ show(b.dataset.go); window.scrollTo(0,0); } });
  Promise.all([fetch("fedscore.json").then(r=>{if(!r.ok) throw new Error(r.status); return r.json();}),loadB26().catch(()=>null)]).then(([j])=>{FSC=j; fedOverview();})
   .catch(()=>{document.getElementById("fedscore").innerHTML=`<p class="note">The department data could not be loaded. Please refresh the page.</p>`; el.dataset.built="";});
}
function fedHead(sub,intro){
  return `<header class="dsh-head"><div><div class="kicker">Government of Canada · Department dashboard</div><h2 class="nh">${sub||"Federal Departments Scorecard · FY 2024–25 to FY 2026–27"}</h2>
     ${intro||`<p class="pagelede">What each department budgeted to spend, the goals it set, and what it reported, from the Treasury Board's open data on Departmental Plans and Results Reports.</p>`}</div></header>
    ${FED_HOW}`;
}
/* "How to read this page": same show/hide style as the City of Victoria page ("How power flows in Victoria"); collapsed on page open */
const FED_HOW=`<details class="flowdd fedhow"><summary><span><h2>How to read this page</h2><span class="ddhint">Click to see how plans, budgets and results fit together</span></span><span class="ddarrow" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6l4 4 4-4"/></svg></span></summary>
  <ol class="steps">
   <li><b>Two parts: money and goals.</b> At the start of each year, a department makes a plan: what it wants to get done (its goals) and how much money it needs (its budget). At the end of the year, it adds up what it spent and what it got done. The difference shows what actually happened.</li>
   <li><b>Money.</b> Before the year starts, the department works out how much money it needs to reach its goals. That amount is the <b>budget</b>. After the year ends, the government reports what was really spent, checked by auditors in the Public Accounts. Those are the <b>actuals</b>. The <b>variance</b> is the difference between the budget and the actuals.</li>
   <li><b>Two kinds of dates.</b> Government money years are <b>fiscal years</b> and always have “FY” in front: FY 2024–25 means April 1, 2024 to March 31, 2025. A date without “FY” is a regular calendar year (January to December), such as Nov 5, 2024 or fall 2024. Budget 2026 is named for the day it was presented, Nov 5, 2026. In quotes from the Government of Canada, a range such as 2027-28 is a fiscal year.</li>
   <li><b>Goals.</b> Before the year starts, the department picks the projects and goals it will work on. After the year ends, it compares its goals with its results, so you can see what was done and what was not.</li>
  </ol>
  <div class="dkey"><span><i class="ok"></i>Green: within budget, or 75% or more of goals met</span><span><i class="watch"></i>Yellow: 50–74% of goals met</span><span><i class="off"></i>Red: over budget, or fewer than half of goals met</span><span class="muted">Half-circle gauge: spent as a % of the budget</span></div>
</details>`;
function fedTiming(){
  return `<div class="dtiming"><b>About timing.</b> The federal fiscal year runs April 1 to March 31. Results for a year are published in the Departmental Results Report the following fall. This page uses reported results for FY 2024–25 and budgets for FY 2025–26 and FY 2026–27; FY 2025–26 results are not yet published: the Public Accounts for that year must be tabled by Dec 31, 2026 under the <i>Financial Administration Act</i>, and had not been tabled as of Nov 5, 2026. The previous year's Public Accounts and Departmental Results Reports were tabled together on Nov 7, 2025. The budget is the spending planned at the start of the year; Parliament can approve more during the year through Supplementary Estimates, so this page shows spending above the start-of-year budget as over budget even when Parliament later approved the extra funds. Results are self-reported: each department sets its own indicators and targets and rates its own results, so rates are not comparable between departments. <b>Budget 2026 was tabled on Nov 5, 2026.</b> The FY 2026–27 budgets shown here come from the 2025–26 Departmental Plans and do not include its proposals; each department's Budget 2026 section lists the measures that name it.</div>`;
}
/* Public Accounts (audited): spending vs Parliament's total approval */
const paCell=a=>a?`<td class="vcell ${a.used<=a.auth?"dn":"up"}">${fPf(a.used/a.auth*100)}% <small>${fB(a.lapsed)} unspent</small></td>`:`<td><span class="muted">—</span></td>`;
function paBlock(d,h){ const a=d.pa24; if(!a||!FSC.pa24) return ""; const within=a.used<=a.auth, pc=a.used/a.auth*100, diff=h&&Math.abs(a.used-h[2])/a.used>0.005;
  const R=[["Budget at the start of the year (Main Estimates)",a.main],["Added during the year (Supplementary Estimates)",a.supp],["Other changes and transfers",a.adj],["Left over from earlier years",a.prev],["Total approved by Parliament",a.auth,"tot"],["Spent during the year",a.used],["Not spent: returned (lapsed)",a.lapsed],["Not spent: kept for later years",a.next]];
  const src=`<div class="src">Source: ${fA(FSC.pa24.src)} (Volume II, pp. 41–47)</div>`;
  const fund=vRoll("Where the money came from","FY 2024–25 · all the money Parliament approved, and what happened to it",`<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Item</th><th scope="col">Amount</th></tr></thead><tbody>${R.map(r=>`<tr${r[2]?' class="tot"':""}><th scope="row">${r[0]}</th><td>${r[1]<0?"−"+fB(-r[1]):fB(r[1])}</td></tr>`).join("")}</tbody></table></div>
   <div class="note">The over- and under-budget colours on this page compare spending with the budget set at the start of the year. Parliament can add more money during the year. This table compares spending with all the money Parliament approved. “Lapsed” means approved but not spent.${a.rows.length>1?" Figures combine the Public Accounts rows for "+fEsc(a.rows.join(" and "))+".":""}${diff?` The Public Accounts say ${fB(a.used)} was spent; the Departmental Results Report data used elsewhere on this page says ${fB(h[2])}. Both are shown as published.`:""}${h?"":" This department's FY 2024–25 results are not in the Departmental Results Report data, but it is in the Public Accounts."}</div>${src}`);
  const kp=vRoll("Spent vs. all money approved","FY 2024–25 · "+fPf(pc)+"% of the approved amount spent · audited Public Accounts, tabled Nov 7, 2025",`<div class="dsh-kpis k3">${[
    ["Approved by Parliament",fB(a.auth),fPill("neu","Start-of-year budget "+fB(a.main)),"The start-of-year budget plus money added during the year",""],
    ["Spent",fB(a.used),fPill(within?"ok":"off",within?"Within the approved amount":"More than the approved amount"),fPf(pc)+"% of the approved amount",fGauge(pc,within?"ok":"off","Spent vs approved")],
    ["Not spent (lapsed)",fB(a.lapsed),fPill("neu",fPf(a.lapsed/a.auth*100)+"% of the approved amount"),"Approved but not spent by March 31, 2025",""]].map(fCard).join("")}</div>${src}`);
  return [fund,kp]; }
function fedCycle(){
  const R=[
   ["Federal budget","Fall (since Budget 2025)","The government's economic priorities, projections and proposed new measures. It does not itself authorise spending.","Budget 2026 page"],
   ["Economic and fiscal update","Spring (since 2026)","Updated economic and fiscal projections.","Referenced on the Budget 2026 page"],
   ["Main Estimates","Tabled by March 1, before the fiscal year starts on April 1","The amounts Parliament is asked to approve for the coming fiscal year.","Basis of the “budgeted” amounts"],
   ["Departmental Plans","Shortly after the Main Estimates, before the fiscal year starts","Each department's priorities, expected results and resources over three years.","Budgeted spending, staff and goals"],
   ["Interim supply bill","Introduced by March 26","Funds the first three months of the fiscal year from the Main Estimates.","—"],
   ["Full supply bill","Introduced by June 23","Funds the rest of the Main Estimates.","—"],
   ["Supplementary Estimates","Usually spring, fall and winter (bills by June 23, Dec 10 and March 26)","Spending needs that were not ready for the Main Estimates or have since changed.","Not shown yet; the reason spending can exceed the “budgeted” amount"],
   ["Public Accounts of Canada","Fall, no later than Dec 31 after the fiscal year ends","Audited financial statements and actual spending by department.","Actual spending (FY 2025–26 not yet tabled)"],
   ["Departmental Results Reports","Fall, after the Public Accounts","Each department's actual results compared with its Departmental Plan.","Goals and results"]];
  return vRoll("Federal reporting cycle","When plans, approvals and results are published",`<div class="sctwrap"><table class="sct b26t"><thead><tr><th scope="col">Document</th><th scope="col">When</th><th scope="col">What it contains</th><th scope="col">On ParliVue</th></tr></thead><tbody>${R.map(r=>`<tr><th scope="row">${r[0]}</th><td class="b26x">${r[1]}</td><td class="b26x">${r[2]}</td><td class="b26x">${r[3]}</td></tr>`).join("")}</tbody></table></div>
    <div class="note">The fiscal year runs April 1 to March 31. Parliament approves spending through appropriation acts based on the Estimates; budgets and economic updates set out plans and projections but do not authorise spending.</div>
    <div class="src">Source: ${fA(["Treasury Board of Canada Secretariat: Reporting cycle (updated Aug 24, 2026)","https://www.canada.ca/en/treasury-board-secretariat/services/planned-government-spending/expenditure-management-system/reporting-cycle.html"])}</div>`,false);
}
function fedOverview(){
  const el=document.getElementById("fedscore"), D=FSC.depts;
  const have=D.filter(d=>fLast(d)), P=have.reduce((s,d)=>s+fLast(d)[1],0), A=have.reduce((s,d)=>s+fLast(d)[2],0);
  const over=have.filter(d=>fLast(d)[2]>fLast(d)[1]*1.0005).length;
  const PA=D.every(d=>d.pa24)?D.reduce((t,d)=>({auth:t.auth+d.pa24.auth,used:t.used+d.pa24.used,lapsed:t.lapsed+d.pa24.lapsed}),{auth:0,used:0,lapsed:0}):null;
  const overPA=have.filter(d=>fLast(d)[2]>fLast(d)[1]*1.0005&&d.pa24&&d.pa24.used>d.pa24.auth).length;
  const C=D.reduce((c,d)=>{c.m+=d.c24["met"];c.n+=d.c24["not met"];c.u+=d.c24["not available"]+d.c24["to be achieved"]+d.c24[""];return c;},{m:0,n:0,u:0});
  const TX=D.reduce((t,d)=>{t.x+=d.tr.bigx;t.b+=d.tr.big;return t;},{x:0,b:0});
  const p26=D.reduce((s,d)=>s+(d.plan.y26||0),0), p25=D.reduce((s,d)=>s+(d.plan.y25||0),0), tp=C.m/(C.m+C.n)*100, sp=fSpend(P,A);
  const kp=`<div class="dsh-kpis k5" aria-label="Federal summary">${[
    ["Budgeted spending · FY 2026–27",fB(p26),fPill("neu",(p26>=p25?"+":"−")+Math.abs((p26-p25)/p25*100).toFixed(1)+"% vs FY 2025–26"),(D.some(d=>d.plan.s26)?(D.length-D.filter(d=>d.plan.s26).length)+" departments from 2025–26 plan forecasts, "+D.filter(d=>d.plan.s26).length+" from 2026–27 plans":"31 departments · forecast in the 2025–26 Departmental Plans")+"; does not include Budget 2026 (Nov 5, 2026) proposals",""],
    ["Budgeted spending · FY 2025–26",fB(p25),fPill("neu","Results not yet published"),"Not yet reported in the open data",""],
    ["Actual spending · FY 2024–25",fB(A),sp.pill,"Budget "+fB(P)+" · "+have.length+" departments",fGauge(A/P*100,sp.cls==="up"?"off":"ok","Actual vs budget")],
    ["Departments over budget · FY 2024–25",over+" of "+have.length,fPill(over>have.length/2?"off":"watch",Math.round(over/have.length*100)+"%"),"Spent more than budgeted at the start of the year"+(PA?" · "+(overPA?(over-overPA)+" of these "+over:"all "+over)+" stayed within Parliament's total approval (Public Accounts)":""),""],
    ["Targets met · FY 2024–25",fN(C.m)+" of "+fN(C.m+C.n),fPill(tp>=75?"ok":tp>=50?"watch":"off",fPf(tp)+"% met"),fN(C.u)+" more not yet measurable",fGauge(tp,tp>=75?"ok":tp>=50?"watch":"off","Targets met")]
  ].map(fCard).join("")}</div>`;
  const rows=D.map(d=>{const h=fLast(d),s=h?fSpend(h[1],h[2]):null,t=fTgt(d.c24);
    return `<tr><th scope="row"><button class="linkbtn fdgo" data-id="${d.id}">${d.name}</button></th>
      <td>${h?fB(h[1]):"—"}</td><td>${h?fB(h[2]):"—"}</td>
      <td class="vcell ${s?s.cls:""}">${h&&s.pc!=null?vsSgn(h[2]-h[1],fB)+` <small>${vsP(s.pc)}</small>`:'<span class="muted">Not in open data</span>'}</td>
      <td class="vcell ${t.n?(t.cls==="ok"?"dn":t.cls==="off"?"up":"cau"):""}">${t.n?fPf(t.pct)+"%"+` <small>${d.c24["met"]} of ${t.n}</small>`:'<span class="muted">—</span>'}</td>
      <td class="vcell ${fRatio(d.tr.bigx,d.tr.big).cls}">${d.tr.big?fRatio(d.tr.bigx,d.tr.big).txt:'<span class="muted">—</span>'}</td>${paCell(d.pa24)}
      <td>${fB(d.plan.y25)}</td><td>${fB(d.plan.y26)}${d.plan.s26?`<small class="fcr">${fEsc(d.plan.s26)}</small>`:""}</td></tr>`;}).join("");
  el.innerHTML=fedHead()+`<div class="dsh-kh">FY 2026–27 · current fiscal year (April 1, 2026 – March 31, 2027)<span>FY 2024–25 is the latest year with reported results.</span></div>${kp}
    <div class="sctwrap"><table class="sct fedtbl"><caption>31 departments · select one for its dashboard</caption><thead><tr><th scope="col">Department</th><th scope="col">FY 2024–25 budgeted</th><th scope="col">FY 2024–25 actual</th><th scope="col">Variance</th><th scope="col">FY 2024–25 targets met</th><th scope="col">Variances explained</th><th scope="col">Spent vs Parliament's approval<small class="fth">Public Accounts, audited</small></th><th scope="col">FY 2025–26 budgeted<small class="fth">results not yet published</small></th><th scope="col">FY 2026–27 budgeted</th></tr></thead><tbody>${rows}
      <tr class="tot"><th scope="row">Total<small class="fcr">FY 2024–25 columns: ${have.length} departments with results in the open data${D.length>have.length?" (excludes "+D.filter(d=>!fLast(d)).map(d=>d.name).join(", ")+")":""} · FY 2025–26 and FY 2026–27 columns: all ${D.length}${D.some(d=>d.plan.s26)?" · FY 2026–27 column: see note below":""}</small></th><td>${fB(P)}</td><td>${fB(A)}</td><td class="vcell ${sp.cls}">${vsSgn(A-P,fB)} <small>${vsP(sp.pc)}</small></td><td>${fPf(tp)}% <small>${fN(C.m)} of ${fN(C.m+C.n)}</small></td><td>${TX.x} of ${TX.b}</td>${paCell(PA)}<td>${fB(p25)}</td><td>${fB(p26)}</td></tr></tbody></table></div>
    ${D.some(d=>d.plan.s26)?`<div class="note"><b>FY 2026–27 column.</b> Forecasts from the 2025–26 Departmental Plans, except ${D.filter(d=>d.plan.s26).map(d=>d.name).join(", ")} (2026–27 Departmental Plan).${D.find(d=>d.id===20&&d.plan.s26)&&D.find(d=>d.id===12&&d.plan.s26)?" Both Fisheries and Oceans Canada and National Defence reflect the Canadian Coast Guard's move between them on Sept 2, 2025, so the Coast Guard is counted once, under National Defence. Departments not yet updated may also have changed since their 2025–26 plans.":" The Canadian Coast Guard moved from Fisheries and Oceans Canada to National Defence on Sept 2, 2025; until both departments are updated from their 2026–27 plans, this total may leave it out or count it twice."}</div>`:""}
    ${fedTiming()}
    ${fedCycle()}
    ${PA?`<div class="note"><b>Spent vs Parliament's approval</b> compares FY 2024–25 spending with everything Parliament approved during the year (Main Estimates, Supplementary Estimates, transfers and amounts carried in), from the audited Public Accounts. The total row covers all 31 departments, including the Privy Council Office, which is not in the other FY 2024–25 columns. Across the whole Government of Canada, Parliament approved ${fB(FSC.pa24.tot.auth)} in budgetary spending for FY 2024–25; ${fB(FSC.pa24.tot.used)} was spent and ${fB(FSC.pa24.tot.lapsed)} lapsed. Source: ${fA(FSC.pa24.src)}.</div>`:""}
    <div class="note"><b>Targets met</b> counts indicators the department rated "met" out of those rated "met" or "not met". Indicators not yet measurable or due in a later year are left out of the percentage. <b>Variances explained</b> counts programs whose spending differed from budget by at least 10% and $1M, and how many of those carry the department’s explanation in the open data; a department may still explain them in the report itself. Finance Canada and Employment and Social Development Canada include large statutory transfers (for example, payments to provinces, Old Age Security and Employment Insurance), which dominate the totals.</div>
    <div class="src">Source: ${fA(FSC_SRC.rbpo)} · ${fA(FSC_SRC.pipo)} · open data updated Oct 4, 2026</div>`;
  el.querySelectorAll(".fdgo").forEach(b=>b.onclick=()=>{fedDept(+b.dataset.id); window.scrollTo(0,el.offsetTop-10);});
}
function fedDept(id,tab0){
  const el=document.getElementById("fedscore"), d=FSC.depts.find(x=>x.id===id), h=fLast(d), t=fTgt(d.c24);
  const sp=h?fSpend(h[1],h[2]):null;
  const ftep=h&&h[3]?h[4]/h[3]*100:null;
  const cards=`<div class="dsh-kh">This year is FY 2026–27 (April 1, 2026 – March 31, 2027)<span>Pick a year on the left to see more.</span></div>
   <div class="dsh-kpis k5">${[
    ["Budget · FY 2026–27",fB(d.plan.y26),fPill("neu",d.plan.f26?fN(d.plan.f26)+" staff planned":"Budget"),(d.plan.s26?"From the department's 2026–27 plan":"Estimate in the department's 2025–26 plan")+". Budget 2026 changes (Nov 5, 2026) not included.",""],
    ["Budget · FY 2025–26",fB(d.plan.y25),fPill("neu","Results not out yet"),"From the department's 2025–26 plan",""],
    ["Spent · FY 2024–25",h?fB(h[2]):"Not reported",h?sp.pill:fPill("neu","Not in open data"),h?"Budget was "+fB(h[1]):"FY 2024–25 results are not in the open data",h?fGauge(h[2]/h[1]*100,sp.cls==="up"?"off":"ok","Spent vs budget"):""],
    ["Staff · FY 2024–25",h?fN(h[4]):"—",h?fPill(h[4]>h[3]?"watch":"ok",(h[4]>h[3]?"Above":"Within")+" plan "+vsP((h[4]-h[3])/h[3]*100)):"",h?"Planned "+fN(h[3])+" full-time staff":"",h&&ftep?fGauge(ftep,h[4]>h[3]?"watch":"ok","Staff vs plan"):""],
    ["Goals met · FY 2024–25",t.n?d.c24["met"]+" of "+t.n:"—",t.n?fPill(t.cls,fPf(t.pct)+"% met"):fPill("neu","Not in open data"),(d.c24["not available"]+d.c24["to be achieved"]+d.c24[""])+" more can't be checked yet",t.n?fGauge(t.pct,t.cls,"Goals met"):""]
   ].map(fCard).join("")}</div>`;
  /* programs */
  const pr=d.progs.filter(p=>p.p||p.a).map(p=>({...p,v:p.a-p.p,pc:p.p?(p.a-p.p)/p.p*100:null}));
  const big=[...pr].sort((a,b)=>Math.abs(b.v)-Math.abs(a.v)).slice(0,6).filter(p=>Math.abs(p.v)>0);
  const progTbl=`<div class="sctwrap"><table class="sct"><caption>FY 2024–25 · budget vs. spent, every program</caption><thead><tr><th scope="col">Program</th><th scope="col">Budget</th><th scope="col">Spent</th><th scope="col">Difference</th></tr></thead><tbody>${pr.map(p=>`<tr><th scope="row">${fEsc(p.n)}<small class="fcr">${fEsc(p.cr)}</small></th><td>${fB(p.p)}</td><td>${fB(p.a)}</td><td class="vcell ${p.pc!=null?vplan("exp",p.pc):""}">${vsSgn(p.v,fB)}${p.pc!=null?` <small>${vsP(p.pc)}</small>`:""}</td></tr>`).join("")}</tbody></table></div>`;
  const why=big.length?`<div class="sctwrap"><table class="sct fexp"><caption>Biggest differences · in the department's own words</caption><thead><tr><th scope="col">Program</th><th scope="col">Difference</th><th scope="col">The department's reason</th></tr></thead><tbody>${big.map(p=>`<tr><th scope="row">${fEsc(p.n)}</th><td class="vcell ${p.pc!=null?vplan("exp",p.pc):""}">${vsSgn(p.v,fB)}</td><td>${p.x?fEsc(p.x):'<span class="muted">No reason given in the open data. See the 2024–25 Departmental Results Report under Sources.</span>'}</td></tr>`).join("")}</tbody></table></div>`:"";
  /* goals: one line per indicator, grouped by program area, with the department's own rating */
  const ST={"met":["Met","g-d"],"not met":["Not met","g-b"],"to be achieved":["Due later","g-x"],"not available":["Not reported","g-n"],"":["No rating","g-n"]};
  const after=(by,y)=>{const m=String(by||"").match(/^(\d+)(?:\.0)?\/(\d{4})$/); if(!m) return false; const yr=+m[2],mo=+m[1]; return yr>y+1||(yr===y+1&&mo>3);};
  const goalsHtml=(()=>{ const L=d.i24; if(!L.length) return `<p class="note">The FY 2024–25 goals for this organization are not in the open data. ${d.c23["met"]+d.c23["not met"]?`In FY 2023–24 it reported ${d.c23["met"]} of ${d.c23["met"]+d.c23["not met"]} assessed targets met.`:""}</p>`;
    const order=["met","not met","to be achieved","not available",""], cnt=order.map(k=>[k,L.filter(z=>z.s===k).length]).filter(x=>x[1]);
    const sum=`<div class="fgoal"><div class="fgoal-n"><b>${L.length}</b><span>goals for FY 2024–25</span></div>
       <div class="fgoal-r"><div class="fgoal-chips">${cnt.map(([k,n])=>`<span class="fgc"><span class="grade ${ST[k][1]}">${ST[k][0]}</span> <b>${n}</b></span>`).join("")}</div>
       <span class="dgrades" aria-hidden="true">${cnt.map(([k,n])=>`<i class="${ST[k][1]}" style="flex:${n}" title="${ST[k][0]}: ${n}"></i>`).join("")}</span></div></div>`;
    const areas=[...new Set(L.map(z=>z.act||"Other"))];
    const rows=areas.map(ar=>{const G=L.filter(z=>(z.act||"Other")===ar);return G.map((z,k)=>`<tr>${k?"":`<th scope="rowgroup" rowspan="${G.length}" class="farea">${fEsc(ar)}</th>`}<td class="fgd">${fEsc(z.i)}</td><td class="num">${z.t?fValU(z.t,fUnit(z.i)):'<span class="muted">—</span>'}${after(z.by,2024)?`<small>due ${fBy(z.by)}</small>`:""}</td><td class="num">${z.r?fValU(z.r,fUnit(z.i)):'<span class="muted">—</span>'}</td><td><span class="grade ${ST[z.s]?ST[z.s][1]:"g-n"}">${ST[z.s]?ST[z.s][0]:fEsc(z.s)}</span></td></tr>`).join("");}).join("");
    return sum+vRoll("Every goal, by program area",L.length+" goals · the target, the result and whether it was met",`<div class="sctwrap"><table class="sct fgoals"><caption>${L.length} goals · grouped by program area</caption><thead><tr><th scope="col">Program area</th><th scope="col">Goal</th><th scope="col" class="num">Target</th><th scope="col" class="num">Result</th><th scope="col">Status</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="note"><b>The department grades itself.</b> Each department picks its own goals (the Government of Canada calls them performance indicators), sets its own targets and says whether it met them. Treasury Board publishes them as they are. <i>Due later</i> means the department set a deadline after this year. Goals are worded and numbered exactly as published; %, $ and time units are added only where the goal's wording says so.</div>
      <div class="src">Source: ${fA(FSC_SRC.pipo)}</div>`); })();
  /* history */
  const hist=`<div class="sctwrap"><table class="sct"><caption>Budget vs. spent, and staff planned vs. actual, as published</caption><thead><tr><th scope="col">Fiscal year<small class="fth">April 1 to March 31</small></th><th scope="col">Budget</th><th scope="col">Spent</th><th scope="col">Difference</th><th scope="col">Staff planned</th><th scope="col">Staff actual</th></tr></thead><tbody>${d.hist.map(x=>{const pc=x[1]?(x[2]-x[1])/x[1]*100:null;return `<tr><th scope="row">FY ${fEsc(x[0])}</th><td>${fB(x[1])}</td><td>${fB(x[2])}</td><td class="vcell ${pc!=null?vplan("exp",pc):""}">${vsSgn(x[2]-x[1],fB)}${pc!=null?` <small>${vsP(pc)}</small>`:""}</td><td>${fN(x[3])}</td><td>${fN(x[4])}</td></tr>${x[5]&&x[5].v?`<tr class="fwhy"><td colspan="6"><b>Largest change: ${fEsc(x[5].n)} (${vsSgn(x[5].v,fB)}).</b> ${x[5].x?fEsc(x[5].x):'<span class="muted">No explanation in the open data.</span>'}</td></tr>`:""}`;}).join("")}
    <tr><th scope="row">FY 2025–26 <small>budget</small></th><td>${fB(d.plan.y25)}</td><td class="muted">Not yet published</td><td></td><td>${fN(d.plan.f25)}</td><td></td></tr>
    <tr><th scope="row">FY 2026–27 <small>budget</small></th><td>${fB(d.plan.y26)}</td><td></td><td></td><td>${fN(d.plan.f26)}</td><td></td></tr></tbody></table></div>
    <div class="note">Each row's budget is the one published with that year's results. Big differences can come from money added during the year (Supplementary Estimates), programs moved between departments, or one-time payments set by law. The department's own reasons for FY 2024–25 are in the FY 2024–25 section.</div>`;
  const srcTbl=`<div class="sctwrap"><table class="sct fsrc"><thead><tr><th scope="col">Report</th><th scope="col">Fiscal year</th><th scope="col">Used for</th></tr></thead><tbody>${[...new Map(d.src.map(s=>[s.u+s.y,s])).values()].map(s=>`<tr><th scope="row">${s.u?`<a href="${s.u}" target="_blank" rel="noopener">${fEsc(s.txt)}</a>`:fEsc(s.txt)}</th><td>${s.y}</td><td>${d.src.filter(z=>z.u===s.u&&z.y===s.y).map(z=>z.cat).join(", ")}</td></tr>`).join("")}</tbody></table></div>`;
  const tabs=[["b26","Budget 2026","Nov 5, 2026 · what's new for this department"],["y26","FY 2026–27","Apr 1, 2026 – Mar 31, 2027 · this year"],["y25","FY 2025–26","Apr 1, 2025 – Mar 31, 2026 · results not out yet"],["y24","FY 2024–25","Apr 1, 2024 – Mar 31, 2025 · final results"],["hist","Spending history","FY 2020–21 to FY 2024–25"],["src","Sources","Where the numbers come from"]];
  const unexpl=(()=>{const e=fRatio(d.tr.bigx,d.tr.big);const un=pr.filter(p=>Math.abs(p.v)>=1e6&&(p.p===0||Math.abs(p.v)/Math.max(p.p,1)>=.1)&&!p.x).sort((a,b)=>Math.abs(b.v)-Math.abs(a.v));
     return `${un.length?vRoll("Big differences with no reason given",un.length+" programs, FY 2024–25",`<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Program</th><th scope="col">Budget</th><th scope="col">Spent</th><th scope="col">Difference</th></tr></thead><tbody>${un.map(p=>`<tr><th scope="row">${fEsc(p.n)}</th><td>${fB(p.p)}</td><td>${fB(p.a)}</td><td class="vcell ${p.pc!=null?vplan("exp",p.pc):""}">${vsSgn(p.v,fB)}${p.pc!=null?` <small>${vsP(p.pc)}</small>`:""}</td></tr>`).join("")}</tbody></table></div><div class="note">The department may explain these in its 2024–25 Departmental Results Report. See Sources.</div>`,true):""}`;})();
  const sel=tabs.some(t=>t[0]===tab0)?tab0:"y26";
  const rep=(y,cat,lab)=>{const s=fRep(d,y,cat);return s&&s.u?`<a href="${s.u}" target="_blank" rel="noopener">${fEsc(s.txt)}</a>`:lab;};
  const crpTbl=(cols,cap)=>d.crp.length?`<div class="sctwrap"><table class="sct"><caption>${cap}</caption><thead><tr><th scope="col">Main area of work<small class="fth">core responsibility</small></th>${cols.map(c=>`<th scope="col">${c[0]}</th>`).join("")}</tr></thead><tbody>${d.crp.map(c=>`<tr><th scope="row">${fEsc(c[0])}</th>${cols.map(k=>`<td>${k[1](c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:"";
  const intro=`<p class="pagelede">${fEsc(d.ov)}</p>${d.ai||d.ai26?`<div class="why"><b>AI and digital.</b> ${fEsc(d.ai)}${d.ai26&&d.ai26.length?`<ul class="aiu">${d.ai26.map(x=>`<li>${fEsc(x[0])} <span class="muted">(${fEsc(x[1])}${x[2]?", p. "+x[2]:""})</span></li>`).join("")}</ul>`:`<span class="muted"> Budget 2026 (Nov 5, 2026) names no AI measure for this department.</span>`}</div>`:""}
     <div class="src">Source: ${rep("2025","Goals","2025–26 Departmental Plan")} · ${fA(FSC_SRC.ai)}${typeof B26_SRC!=="undefined"?" · "+fA(B26_SRC):""}</div>`;
  const panes={

   y26:`<p class="fynote">${FYR(2026)}.</p>${d.tabNotes&&d.tabNotes.y26?`<div class="why"><b>${fEsc(d.tabNotes.y26[0])}.</b> ${fEsc(d.tabNotes.y26[1])}</div>`:""}<div class="dsh-kpis k3">${[
       ["Budget",fB(d.plan.y26),fPill("neu",d.plan.cmp26?d.plan.cmp26:d.plan.y25?vsP((d.plan.y26-d.plan.y25)/d.plan.y25*100)+" vs FY 2025–26 budget":"Budget"),d.plan.s26?"From the "+d.plan.s26:"Estimate in the 2025–26 Departmental Plan",""],
       ["Staff planned",fN(d.plan.f26),fPill("neu",d.plan.cmp26?"Not comparable with FY 2025–26":d.plan.f25?vsP((d.plan.f26-d.plan.f25)/d.plan.f25*100)+" vs FY 2025–26":"Budget"),"Counted as full-time staff",""],
       ["Goals set",String(d.n26),fPill("neu","FY 2025–26: "+d.n25),"Goals the department set for FY 2026–27"+(d.dri26?` · the ${fEsc(d.plan.s26||"2026–27 Departmental Plan")} also lists ${d.dri26} department-wide goals (departmental result indicators)`:""),""]].map(fCard).join("")}</div>
     ${crpTbl([["FY 2026–27 budget",c=>fB(c[2])],["Change from FY 2025–26",c=>d.crpNote&&d.crpNote[c[0]]?`<span class="fcrn">${fEsc(d.crpNote[c[0]])}</span>`:c[1]?vsP((c[2]-c[1])/c[1]*100):"—"]],"FY 2026–27 · budget by main area of work")}
     ${d.plan.y27&&d.plan.s26?`<div class="sctwrap"><table class="sct"><caption>Money and staff planned for the next three years, from the ${d.plan.s26}</caption><thead><tr><th scope="col">Fiscal year</th><th scope="col">Money planned</th><th scope="col">Staff planned</th></tr></thead><tbody>${[["FY 2026–27",d.plan.y26,d.plan.f26],["FY 2027–28",d.plan.y27,d.plan.f27],["FY 2028–29",d.plan.y28,d.plan.f28]].map(r=>`<tr><th scope="row">${r[0]}</th><td>${fB(r[1])}</td><td>${fN(r[2])}</td></tr>`).join("")}</tbody></table></div>`:""}
     <p class="fynote">This year's results come out in fall 2027, in the 2026–27 Departmental Results Report. ${d.plan.s26?`The amounts above are from the ${d.plan.s26}. ${d.chg?fEsc(d.chg):""}`:"The amounts above are the estimate in the 2025–26 Departmental Plan. The 2026–27 plan's spending tables are not in the open data yet."} They do not include the changes in Budget 2026 (Nov 5, 2026). See the Budget 2026 section.</p>
     <div class="src">Source: ${fA(FSC_SRC.rbpo)} · ${rep("2026","Goals","2026–27 Departmental Plan")}</div>`,
   y25:`<p class="fynote">${FYR(2025)}.</p>${d.tabNotes&&d.tabNotes.y25?`<div class="why"><b>${fEsc(d.tabNotes.y25[0])}.</b> ${fEsc(d.tabNotes.y25[1])}</div>`:""}${d.plan.y25fc?`<div class="why"><b>Newer estimate.</b> The ${fEsc(d.plan.s26)} expects FY 2025–26 spending of ${fB(d.plan.y25fc)} and ${fN(d.plan.f25fc)} full-time staff. The plan at the start of the year was ${fB(d.plan.y25)} and ${fN(d.plan.f25)} staff. This is an estimate, not a final result.</div>`:""}<div class="dsh-kpis k3">${[
       ["Budget",fB(d.plan.y25),fPill("neu","Results not out yet"),"From the 2025–26 Departmental Plan",""],
       ["Staff planned",fN(d.plan.f25),fPill("neu","Plan"),"Counted as full-time staff",""],
       ["Goals set",String(d.n25),fPill("neu","FY 2024–25: "+d.i24.length),"Goals the department set for FY 2025–26",""]].map(fCard).join("")}</div>
     ${crpTbl([["FY 2025–26 budget",c=>fB(c[1])]],"FY 2025–26 · budget by main area of work")}
     <p class="fynote">This year ended March 31, 2026. What was really spent and done will show here once the 2025–26 Departmental Results Report is out.</p>
     <div class="why"><b>When will FY 2025–26 results be out?</b> The law (the <i>Financial Administration Act</i>) says the government's audited books, the Public Accounts of Canada, must be presented to Parliament by <b>Dec 31</b> after each year ends. For FY 2025–26, that is <b>Dec 31, 2026</b>. Treasury Board aims for Oct 15 each year, but as of Nov 5, 2026 they had not been presented. In the Senate on Oct 8, 2026, the Government Representative said they would come no later than Dec 31 and gave no earlier date. Last year's (FY 2024–25) came on Nov 7, 2025; the year before (FY 2023–24) on Dec 17, 2024. Each department's results report comes in the fall, after the Public Accounts.
       <div class="src">Sources: ${fA(["Senate of Canada, Debates, Oct 8, 2026","https://sencanada.ca/en/content/sen/chamber/451/debates/092db_2026-10-08-e"])} · ${fA(["Treasury Board Secretariat: Reporting cycle","https://www.canada.ca/en/treasury-board-secretariat/services/planned-government-spending/expenditure-management-system/reporting-cycle.html"])} · ${fA(["Treasury Board Secretariat, Question Period Note: Public Accounts of Canada 2025","https://search.open.canada.ca/qpnotes/record/tbs-sct%2CTBS-2025-QP-12-00008"])}</div></div>
     <div class="src">Source: ${fA(FSC_SRC.rbpo)} · ${rep("2025","Goals","2025–26 Departmental Plan")}</div>`,
   y24:`<p class="fynote">Click a section to open it.</p>`+(()=>{const pa=paBlock(d,h)||["",""];return pa[0]+pa[1];})()+(h?vRoll("Budget vs. spent, by program",(sp?sp.pill.replace(/<[^>]+>/g,"")+" · ":"")+"the biggest differences and the department's reasons",`${why}${vRoll("Every program","Budget vs. spent for each program",progTbl)}${unexpl}<div class="src">Source: ${fA(FSC_SRC.rbpo)}</div>`):`<p class="note">The FY 2024–25 spending for this organization is not in the open data. See its 2024–25 Departmental Results Report under Sources.</p>`)+
     vRoll("Goals and results",d.i24.length?d.i24.length+" goals · "+d.c24["met"]+" met, "+d.c24["not met"]+" not met":"Not in the open data",goalsHtml),
   b26:typeof fedBudgetPane==="function"?fedBudgetPane(d):"",
   hist:hist+`<div class="src">Source: ${fA(FSC_SRC.rbpo)}</div>`,
   src:`${srcTbl}<div class="note">Spending and goals come from the Treasury Board's open data, where this department is listed as ${fEsc(d.org)}. Some links open a list of reports; pick the named report and year there.</div><div class="src">Source: ${fA(FSC_SRC.rbpo)} · ${fA(FSC_SRC.pipo)}</div>`
  };
  el.innerHTML=`<button class="chipbtn fback">← All 31 departments</button>`+fedHead(d.name,intro)+cards+`<div class="dsh">
    <nav class="dsh-rail" role="tablist" aria-orientation="vertical" aria-label="Department sections"><div class="dsh-rl">Sections</div>${tabs.map((t,i)=>`<button role="tab" id="fdt-${t[0]}" aria-controls="fdp-${t[0]}" aria-selected="${t[0]===sel?"true":"false"}" tabindex="${t[0]===sel?0:-1}" data-k="${t[0]}"><span>${t[1]}</span><small>${t[2]}</small></button>`).join("")}</nav>
    <div class="dsh-main">${tabs.map((t,i)=>`<div role="tabpanel" id="fdp-${t[0]}" aria-labelledby="fdt-${t[0]}" class="vspane" ${t[0]===sel?"":"hidden"}><h3 class="dsh-ph">${t[1]}<small>${t[2]}</small></h3>${panes[t[0]]}</div>`).join("")}</div></div>`;
  el.querySelector(".fback").onclick=()=>{fedOverview(); window.scrollTo(0,el.offsetTop-10);};
  el.querySelectorAll(".b26go").forEach(b=>b.onclick=()=>{ show(b.dataset.go); window.scrollTo(0,0); });
  const bs=[...el.querySelectorAll(".dsh-rail button")];
  const pick=b=>bs.forEach(x=>{const on=x===b; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; document.getElementById("fdp-"+x.dataset.k).hidden=!on;});
  bs.forEach((b,i)=>{ b.onclick=()=>pick(b); b.onkeydown=e=>{ const k=(e.key==="ArrowDown"||e.key==="ArrowRight")?1:(e.key==="ArrowUp"||e.key==="ArrowLeft")?-1:0; if(k){ const n=bs[(i+k+bs.length)%bs.length]; pick(n); n.focus(); e.preventDefault(); } }; });
}
