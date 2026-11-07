/* ================= GOVERNMENT OF CANADA · BUDGET 2026 =================
   Data: Budget 2026, "Masters of our destiny", tabled November 5, 2026 (Department of Finance Canada),
   loaded on demand from budget2026.json. Department items list only measures where the budget itself names the
   department; wording is quoted from the budget. Page numbers are the printed page numbers of the budget PDF. */
const B26_SRC=["Budget 2026: Masters of our destiny (Department of Finance Canada, tabled Nov 5, 2026)","https://budget.canada.ca"];
let B26=null, B26_P=null;
function loadB26(){ if(B26) return Promise.resolve(B26); if(!B26_P) B26_P=fetch("budget2026.json").then(r=>{if(!r.ok) throw new Error(r.status); return r.json();}).then(j=>(B26=j)).catch(e=>{B26_P=null; throw e;}); return B26_P; }
/* $ formatting for budget tables: all in millions */
/* published in billions; shown in millions like every federal amount on ParliVue ($448.5B → $448,500M) */
const bB=n=>n==null?"—":(n<0?"−":"")+"$"+Math.round(Math.abs(n)*1000).toLocaleString("en-CA")+"M";
const bM=n=>n==null?"—":(n<0?"−":"")+"$"+Math.abs(n).toLocaleString("en-CA",{maximumFractionDigits:0})+"M";
const bP=n=>n==null?"—":(n<0?"−":"")+Math.abs(n).toFixed(1)+"%";
const bPg=(p,p2)=>`<span class="b26pg">p.&nbsp;${p}${p2&&p2!==p?"–"+p2:""}</span>`;
/* fiscal years named by the year they start, as elsewhere on ParliVue; the budget writes 2026-27 */
const bYH=y=>`FY ${y.replace("-","–")}`;
function b26Sec(id){ if(!B26) return ""; if(/^C\d$/.test(id)){ const c=B26.chapters.find(c=>c.n===+id[1]); return c?`Chapter ${c.n} · ${c.t} · chapter table`:""; }
  for(const c of B26.chapters){ const s=c.secs.find(s=>s.id===id); if(s) return `${s.id} ${s.t}`; } return ""; }
function b26ForDept(id){ const I=(B26?B26.items:[]).filter(x=>x.d.includes(id)); return {p:I.filter(x=>x.k==="p"),t:I.filter(x=>x.k==="t"),a:I.filter(x=>x.k==="a")}; }
const B26_NOTE=`<div class="note"><b>How this list is built.</b> It includes only measures where Budget 2026 names this department, quoted as written, with the page in the budget document. Many measures name a fund or program without naming the department that delivers it; those are not attributed here and are counted in the chapter totals on the <button class="linkbtn b26go" data-go="fedbudget">Budget 2026 page</button>. When the budget names several departments for one amount without dividing it, the full amount appears on each of their pages, so amounts here should not be added across departments. Most budget measures need Parliament's approval, through a budget implementation act or the Estimates, before money is spent.</div>`;

/* ---------- department dashboard: Budget 2026 tab ---------- */
function fedBudgetPane(d){
  if(!B26) return `<p class="note">The Budget 2026 data could not be loaded. Please refresh the page.</p>`;
  const G=b26ForDept(d.id), n=G.p.length+G.t.length+G.a.length;
  const tSum=G.t.reduce((s,x)=>s+x.tot+x.less,0), aSum=G.a.reduce((s,x)=>s+x.tot+x.less,0);
  const kp=`<div class="dsh-kpis k3">${[
    ["Named in the budget text",String(G.p.length),fPill("neu",G.p.length===1?"funding proposal":"funding proposals"),"Amounts as stated; fiscal periods differ by measure",""],
    ["Itemised in chapter tables",String(G.t.length),fPill("neu",G.t.length?bM(tSum)+" net":"None"),"FY 2026–27 to FY 2030–31, after listed offsets",""],
    ["Actions since the spring update",String(G.a.length),fPill("neu",G.a.length?bM(aSum)+" net":"None"),"Table A1.19 · FY 2026–27 to FY 2030–31, after listed offsets",""]
  ].map(fCard).join("")}</div>`;
  if(!n) return `<p class="vslede">Budget 2026 does not name ${fEsc(d.name)} in a funding measure, a chapter table item, or the list of policy actions since the Spring Economic Update 2026.</p>${kp}${B26_NOTE}<div class="src">Source: ${fA(B26_SRC)}</div>`;
  const pTbl=G.p.length?`<div class="sctwrap"><table class="sct b26t"><caption>${G.p.length} proposal${G.p.length>1?"s":""} naming ${fEsc(d.name)}</caption><thead><tr><th scope="col">Measure</th><th scope="col">Amount</th><th scope="col">What the budget says</th></tr></thead><tbody>${G.p.map(x=>`<tr><th scope="row">${fEsc(x.t)}<small class="fcr">${fEsc(b26Sec(x.s))} · ${bPg(x.pg)}</small>${x.d.length>1?`<small class="fcr">Also names: ${x.d.filter(k=>k!==d.id).map(k=>fEsc(B26.names[k])).join(", ")}</small>`:""}</th><td class="b26a">${fEsc(x.a)}</td><td class="b26x">“${fEsc(x.x)}”${x.c?`<small class="fcr">${fEsc(x.c)}</small>`:""}</td></tr>`).join("")}</tbody></table></div>`:"";
  const tTbl=G.t.length?`<div class="sctwrap"><table class="sct b26t"><caption>Chapter table items · millions of dollars, FY 2026–27 to FY 2030–31</caption><thead><tr><th scope="col">Measure</th><th scope="col">Total</th><th scope="col">Offsets</th><th scope="col">What the budget says</th></tr></thead><tbody>${G.t.map(x=>`<tr><th scope="row">${fEsc(x.t)}<small class="fcr">${fEsc(b26Sec(x.s))} · ${bPg(x.pg)}</small></th><td>${bM(x.tot)}</td><td${x.less?"":' class="b26z"'}>${x.less?bM(x.less):"—"}</td><td class="b26x">“${fEsc(x.x)}”</td></tr>`).join("")}</tbody></table></div>`:"";
  const aTbl=G.a.length?`<div class="sctwrap"><table class="sct b26t"><caption>Table A1.19 · policy actions since the Spring Economic Update 2026 · millions of dollars, FY 2026–27 to FY 2030–31</caption><thead><tr><th scope="col">Measure</th><th scope="col">Departments listed</th><th scope="col">Total</th><th scope="col">Offsets</th></tr></thead><tbody>${G.a.map(x=>`<tr><th scope="row">${fEsc(x.t)}<small class="fcr">${bPg(x.pg)}${x.prev?" · previously announced or in the Supplementary Estimates (A), FY 2026–27":""}</small>${x.x?`<small class="fcr">${fEsc(x.x)}</small>`:""}</th><td class="b26x">${fEsc(x.who)}</td><td>${bM(x.tot)}</td><td${x.less?"":' class="b26z"'}>${x.less?bM(x.less):"—"}</td></tr>`).join("")}</tbody></table></div>`:"";
  return `<p class="vslede">What Budget 2026, tabled Nov 5, 2026, proposes for ${fEsc(d.name)}, in the budget's own words.</p>${kp}
    ${pTbl?vRoll("Funding proposed in the budget text","Amounts and periods as written; 2027-28 etc. are fiscal years",pTbl,true):""}
    ${tTbl?vRoll("Itemised in the chapter tables","Five-year totals, FY 2026–27 to FY 2030–31",tTbl,true):""}
    ${aTbl?vRoll("Policy actions since the Spring Economic Update 2026","Annex 1, Table A1.19",aTbl,true):""}
    ${B26_NOTE}<div class="src">Source: ${fA(B26_SRC)} · Chapters 1–6 and Annex 1</div>`;
}

/* ---------- Budget 2026 page ---------- */
function renderFedBudgetPage(){
  const el=document.getElementById("ch-fedbudget"); if(!el) return;
  if(el.dataset.built) return; el.dataset.built="1";
  el.innerHTML=fedSwitch("fedbudget")+`<section id="fedbudget" class="nsec vicscore" aria-label="Federal Budget 2026"><p class="muted">Loading Budget 2026…</p></section>`;
  el.querySelectorAll(".vswitch [data-go]").forEach(b=>b.onclick=()=>{ if(!b.classList.contains("on")){ show(b.dataset.go); window.scrollTo(0,0); } });
  loadB26().then(fedBudgetOverview).catch(()=>{document.getElementById("fedbudget").innerHTML=`<p class="note">The Budget 2026 data could not be loaded. Please refresh the page.</p>`; el.dataset.built="";});
}
function fedBudgetOverview(){
  const el=document.getElementById("fedbudget"), F=B26.fiscal, Y=F.years, i=1;
  const mTot=B26.chapters.reduce((s,c)=>s+c.tot,0);
  const kp=`<div class="dsh-kpis k5" aria-label="Budget 2026 summary">${[
    ["Budgetary balance · FY 2026–27",bB(F.bal[i]),fPill("neu",bP(F.balp[i])+" of GDP"),"Projected deficit, April 1, 2026 – March 31, 2027",""],
    ["Revenues · FY 2026–27",bB(F.rev[i]),fPill("neu",(F.rev[i]>=F.rev[0]?"+":"−")+Math.abs((F.rev[i]-F.rev[0])/F.rev[0]*100).toFixed(1)+"% vs FY 2025–26"),"Budgetary revenues",""],
    ["Expenses · FY 2026–27",bB(F.prog[i]+F.pdc[i]),fPill("neu","Debt charges "+bB(F.pdc[i])),"Program expenses plus public debt charges, before net actuarial losses (gains)",""],
    ["Federal debt · FY 2026–27",bB(F.debt[i]),fPill("neu",bP(F.debtp[i])+" of GDP"),"Projected at the end of FY 2026–27 (March 31, 2027)",""],
    ["New measures · 5 years",bB(mTot/1000),fPill("neu","6 chapters"),"Net fiscal impact of Budget 2026 measures, FY 2026–27 to FY 2030–31",""]
  ].map(fCard).join("")}</div>`;
  const yh=Y.map(y=>`<th scope="col">${bYH(y)}</th>`).join("");
  const row=(lab,arr,fmt,cls)=>`<tr${cls?` class="${cls}"`:""}><th scope="row">${lab}</th>${arr.map(v=>v==null?`<td class="b26z">—</td>`:`<td>${fmt(v)}</td>`).join("")}</tr>`;
  const sumTbl=`<div class="sctwrap"><table class="sct"><caption>Summary statement of transactions · billions of dollars</caption><thead><tr><th scope="col">Item</th>${yh}</tr></thead><tbody>
    ${row("Budgetary revenues",F.rev,bB)}${row("Program expenses<small class='fcr'>excluding net actuarial losses (gains)</small>",F.prog,bB)}${row("Public debt charges",F.pdc,bB)}${row("Net actuarial losses (gains)",F.act,bB)}
    ${row("Budgetary balance",F.bal,bB,"tot")}${row("Budgetary balance, % of GDP",F.balp,bP)}${row("Federal debt",F.debt,bB)}${row("Federal debt, % of GDP",F.debtp,bP)}</tbody></table></div>
    <div class="note">FY 2025–26 (April 1, 2025 – March 31, 2026) is the government's estimate for the fiscal year just ended; later fiscal years are projections. Budgetary balance equals revenues less program expenses, public debt charges and net actuarial losses (gains).</div>
    <div class="src">Source: ${fA(B26_SRC)} · Annex 1, Table A1.8 (${bPg(F.pg.a18)})</div>`;
  const chgTbl=`<div class="sctwrap"><table class="sct"><caption>Budgetary balance: Spring Economic Update 2026 to Budget 2026 · billions of dollars</caption><thead><tr><th scope="col">Item</th>${yh}</tr></thead><tbody>
    ${row("Balance in the Spring Economic Update 2026",F.seu,bB)}${row("Economic and fiscal developments since then",F.dev,bB)}${row("Policy actions since the spring update",F.pol,bB)}${row("Budget 2026 measures",F.meas,bB)}${row("Budgetary balance in Budget 2026",F.bal,bB,"tot")}</tbody></table></div>
    <div class="note">A negative number lowers the balance (lower revenue or higher spending); a positive number raises it. Policy actions since the spring update are itemised in Table A1.19; the budget also includes a combined amount for measures it does not announce individually.</div>
    <div class="src">Source: ${fA(B26_SRC)} · Annex 1, Table A1.4 (${bPg(F.pg.a14)})</div>`;
  const opTbl=`<div class="sctwrap"><table class="sct"><caption>Day-to-day operating balance and capital investment · billions of dollars</caption><thead><tr><th scope="col">Item</th>${yh}</tr></thead><tbody>
    ${row("Day-to-day operating balance",F.opbal,bB,"tot")}${row("Capital investments",F.capinv,bB)}</tbody></table></div>
    <div class="note">The budget separates spending that builds capital (infrastructure, housing supply, research and development, and tax incentives for investment) from day-to-day operating spending. The operating balance adds the estimated revenue forgone through capital-focused tax measures back to revenues. These are the government's own classifications under its Capital Budgeting Framework.</div>
    <div class="src">Source: ${fA(B26_SRC)} · Annex 1, Tables A1.5 and A1.6 (${bPg(F.pg.a15)})</div>`;
  const chRows=B26.chapters.map(c=>`<tr class="tot"><th scope="row">Chapter ${c.n}: ${fEsc(c.t)}<small class="fcr">${bPg(c.pg0,c.pg)}</small></th>${c.yrs.map(v=>`<td>${bM(v)}</td>`).join("")}<td>${bM(c.tot)}</td></tr>`+
    c.secs.map(s=>`<tr><th scope="row" class="b26in">${/^\d/.test(s.id)?s.id+" ":""}${fEsc(s.t)}</th><td colspan="5"></td><td>${bM(s.tot)}</td></tr>`).join("")).join("");
  const sums=[0,1,2,3,4].map(k=>B26.chapters.reduce((s,c)=>s+c.yrs[k],0));
  const chTbl=`<div class="sctwrap"><table class="sct b26ch"><caption>Net fiscal impact of Budget 2026 measures · millions of dollars</caption><thead><tr><th scope="col">Chapter and section</th>${Y.slice(1).map(y=>`<th scope="col">${bYH(y)}</th>`).join("")}<th scope="col">Total</th></tr></thead><tbody>${chRows}
    <tr class="tot"><th scope="row">All Budget 2026 measures</th>${sums.map(v=>`<td>${bM(v)}</td>`).join("")}<td>${bM(mTot)}</td></tr></tbody></table></div>
    <div class="note">Net fiscal impact is the change to the budgetary balance: new spending and tax relief, less any amounts the budget sources from existing departmental funding, projected revenues or savings. Negative amounts (for example, section 6.3) are net savings or revenue. Totals may not add because of rounding in the budget's tables.</div>
    <div class="src">Source: ${fA(B26_SRC)} · chapter tables in Chapters 1–6</div>`;
  const D=Object.entries(B26.names).map(([id,name])=>({id:+id,name,...b26ForDept(+id)}));
  const dRows=D.map(x=>{const n=x.p.length+x.t.length+x.a.length;return `<tr><th scope="row"><button class="linkbtn b26d" data-id="${x.id}">${fEsc(x.name)}</button></th>${[x.p.length,x.t.length,x.a.length].map(v=>`<td${v?"":' class="b26z"'}>${v}</td>`).join("")}<td${n?"":' class="b26z"'}>${n||"Not named"}</td></tr>`;}).join("");
  const dTbl=`<div class="sctwrap"><table class="sct"><caption>Where Budget 2026 names each of the 31 departments · select one for its Budget 2026 section</caption><thead><tr><th scope="col">Department</th><th scope="col">Budget text</th><th scope="col">Chapter tables</th><th scope="col">Since spring update</th><th scope="col">Total</th></tr></thead><tbody>${dRows}</tbody></table></div>${B26_NOTE.replace(/ on the <button[^>]*>Budget 2026 page<\/button>/," above")}`;
  const K=B26.km, kmSrc=K?[K.t+" ("+K.pub+", "+K.date.slice(8).replace(/^0/,"")+" Nov "+K.date.slice(0,4)+")",K.url]:null;
  const kmTbl=K?K.groups.map(g=>`<div class="sctwrap"><table class="sct b26t b26km"><caption>${fEsc(g.h)} · ${g.items.length} measures</caption><thead><tr><th scope="col">Measure</th><th scope="col">As listed</th></tr></thead><tbody>${g.items.map(x=>`<tr><th scope="row">${fEsc(x.n)}</th><td class="b26x">${fEsc(x.x)}</td></tr>`).join("")}</tbody></table></div>`).join("")+
    `<div class="note">This is the Department of Finance's own selection and grouping of Budget 2026 measures, with its headings. Some figures combine several budget measures, cover different periods, or are on a cash basis, so they do not match the chapter totals on this page and should not be added together. Defence percentages are shares of GDP, not dollar amounts. A range such as 2027-28 is a fiscal year (April 1 – March 31), except a “benefit year”, which runs July 1 – June 30; other years are calendar years.</div><div class="src">Source: ${fA(kmSrc)} · ${fA(B26_SRC)}</div>`:"";
  el.innerHTML=`<header class="dsh-head"><div><div class="kicker">Government of Canada · Federal budget</div><h2 class="nh">Budget 2026: Masters of our destiny</h2>
     <p class="pagelede">The federal budget tabled in the House of Commons on November 5, 2026: the government's fiscal projections, the cost of its new measures by chapter, and which departments it names.</p></div></header>
    <div class="dtiming"><b>Which year is this budget for?</b> Budget 2026 is named for the calendar year it was tabled, not for a fiscal year. It was tabled on Nov 5, 2026, partway through FY 2026–27 (April 1, 2026 – March 31, 2027). It is a multi-year plan: its fiscal tables run from FY 2025–26 (just ended, shown as an estimate) to FY 2030–31, and most of its new funding starts in FY 2027–28 (April 1, 2027 – March 31, 2028), with some starting in FY 2026–27. Since Budget 2025 (tabled Nov 4, 2025), the Government of Canada tables budgets in the fall, with an economic update in the spring. Spending in the current fiscal year is approved separately by Parliament through the Main and Supplementary Estimates.</div>
    ${FY_NOTE.replace(" <b>Budgeted</b> is the planned spending in each department's Departmental Plan.","")}
    <div class="dsh-kh">FY 2026–27 · current fiscal year (April 1, 2026 – March 31, 2027)<span>Projections as published in Budget 2026 (Nov 5, 2026).</span></div>${kp}
    ${K?vRoll("Key measures","As listed by the Department of Finance · "+K.groups.reduce((n,g)=>n+g.items.length,0)+" measures",kmTbl,true):""}
    ${B26.ai?vRoll("Artificial intelligence in Budget 2026",B26.ai.length+" items · government-wide and by department",`<div class="sctwrap"><table class="sct b26t b26km"><thead><tr><th scope="col">Item</th><th scope="col">What the budget says</th></tr></thead><tbody>${B26.ai.map(x=>`<tr><th scope="row">${fEsc(x[0])}<small class="fcr">${bPg(x[2])}</small></th><td class="b26x">${fEsc(x[1])}</td></tr>`).join("")}</tbody></table></div><div class="note">Summarised from Budget 2026 in neutral wording, with page numbers. Some items were announced before the budget and are described in it as progress. Department-specific items also appear in the Overview of each department's dashboard.</div><div class="src">Source: ${fA(B26_SRC)}</div>`,false):""}
    ${vRoll("Revenues, expenses, balance and debt","FY 2025–26 to FY 2030–31 · Table A1.8",sumTbl,true)}
    ${B26.track?vRoll("Projections compared with results","Budgetary balance by fiscal year, as each document published it",(()=>{const T=B26.track;return `<div class="sctwrap"><table class="sct"><caption>Budgetary balance (deficit) · billions of dollars</caption><thead><tr><th scope="col">Published in</th>${T.years.map(y=>`<th scope="col">${bYH(y)}</th>`).join("")}</tr></thead><tbody>${T.rows.map((r,i)=>`<tr${i===T.rows.length-1?' class="tot"':""}><th scope="row">${fEsc(r[0])}<small class="fcr">${fEsc(r[2])}</small></th>${r[1].map((v,k)=>v==null?`<td class="b26z">${i===T.rows.length-1&&k===1?"Due by Dec 31, 2026":"—"}</td>`:`<td>${bB(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
    <div class="note">Each row is a forecast or result as published at the time. The FY 2024–25 audited deficit was ${bB(T.pa24.def)}: revenues of ${bB(T.pa24.rev)}, less program expenses of ${bB(T.pa24.prog)}, public debt charges of ${bB(T.pa24.pdc)} and net actuarial losses of ${bB(T.pa24.act)}. Audited results for FY 2025–26 are due in the Public Accounts by Dec 31, 2026; until then, Budget 2026's ${bB(T.rows[2][1][1])} for that year is an estimate. Budget 2026 also shows a federal debt of ${bB(B26.fiscal.debt[0])} (${bP(B26.fiscal.debtp[0])} of GDP) at March 31, 2026, as an estimate.</div>
    <div class="src">Sources: ${fA(B26_SRC)} · ${fA(["Budget 2025: Canada Strong (Department of Finance Canada, tabled Nov 4, 2025)","https://budget.canada.ca"])} · ${fA(["Public Accounts of Canada 2025","https://www.canada.ca/en/public-services-procurement/services/payments-accounting/public-accounts/2025.html"])}</div>`;})(),true):""}
    ${vRoll("What changed since the Spring Economic Update 2026","Table A1.4",chgTbl,true)}
    ${vRoll("Budget 2026 measures by chapter","Net fiscal impact, FY 2026–27 to FY 2030–31",chTbl,true)}
    ${vRoll("Operating balance and capital investment","Tables A1.5 and A1.6",opTbl,false)}
    ${vRoll("Departments named in Budget 2026","31 departments",dTbl,true)}
    <div class="dtiming"><b>About this page.</b> Figures are the government's projections as published in Budget 2026 and are not audited results. Actual revenues and spending are reported in the Public Accounts of Canada after each year ends. Budget measures are proposals; most need Parliament's approval before money is spent. Page numbers refer to the printed pages of the budget document.</div>
    <div class="src">Source: ${fA(B26_SRC)}</div>`;
  el.querySelectorAll(".b26d").forEach(b=>b.onclick=()=>fedGoDept(+b.dataset.id,"b26"));
}
/* open a department dashboard on a given tab, from any page */
function fedGoDept(id,tab){
  show("fedscore"); window.scrollTo(0,0);
  const go=()=>{ if(typeof fedDept==="function"&&FSC) fedDept(id,tab); else setTimeout(go,60); }; go();
}
