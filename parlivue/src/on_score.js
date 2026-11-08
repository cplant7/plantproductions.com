/* Ontario Ministries Scorecard: same layout as the federal and B.C. scorecards (Fisheries template).
   Data: ONS (on_score_data.js) from the Public Accounts 2024–25 and 2025–26 (Ministry Statements and Schedules),
   the 2026–27 Expenditure Estimates and the 2025–26 Published Plans and Annual Reports. */
const ONS_SRC={
  pa26:["Public Accounts of Ontario 2025–26: Ministry Statements and Schedules","https://www.ontario.ca/files/2026-10/tbs-public-ministry-statements-and-schedules-2025-2026-en-2006-10-13.pdf"],
  pa25:["Public Accounts of Ontario 2024–25: Ministry Statements and Schedules","https://www.ontario.ca/files/2025-09/tbs-public-ministry-statements-and-schedules-2024-2025-en-2025-09-26.pdf"],
  cfs26:["Public Accounts of Ontario 2025–26: Consolidated Financial Statements","https://www.ontario.ca/page/public-accounts-2025-26-consolidated-financial-statements"],
  cfs25:["Public Accounts of Ontario 2024–25: Consolidated Financial Statements","https://www.ontario.ca/page/public-accounts-2024-25-consolidated-financial-statements"],
  est27:["Expenditure Estimates for the Province of Ontario, 2026–27, Volume 1","https://www.ontario.ca/page/expenditure-estimates-volume-1-table-contents-2026-2027"],
  ppar:["Published Plans and Annual Reports 2025–2026","https://www.ontario.ca/page/published-plans-and-annual-reports-2025-2026"],
  b26:["2026 Ontario Budget (March 26, 2026): Details of Ontario's Fiscal Plan","https://budget.ontario.ca/2026/brief.html"]
};
const ON_HOW=`<details class="flowdd fedhow"><summary><span><h2>How to read this page</h2><span class="ddhint">Click to see how budgets, spending and goals fit together</span></span><span class="ddarrow" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6l4 4 4-4"/></svg></span></summary>
  <ol class="steps">
   <li class="yrhl"><b>Fiscal years, not calendar years.</b> Ontario's year runs April 1 to March 31, the same as the federal government and B.C. Ontario writes it as 2025–26; FY 2025–26 means April 1, 2025 to March 31, 2026. City scorecards use calendar years (January to December).</li>
   <li><b>A · Budget.</b> The Expenditure Estimates for the year, including statutory spending (spending other laws allow without a yearly vote, such as interest on debt).</li>
   <li><b>B · Additional funding.</b> Money added during the year by Treasury Board orders, mostly drawn from the Contingency Fund held by Treasury Board Secretariat.</li>
   <li><b>C · Reductions and transfers.</b> Money taken away by Treasury Board orders, including money moved out to other ministries or programs.</li>
   <li><b>E · Total approved.</b> A + B + C (the "total appropriations" in the Public Accounts). <b>Spent</b> is the actual expense. "Over budget" compares spending with the start-of-year budget (A). Statutory spending can go above the approved amount without a new vote.</li>
   <li><b>Goals.</b> The key performance indicators each ministry published in its 2025–26 Published Plan and Annual Report: a baseline, the latest result and the target, with their dates. Ontario reports most of them without a met / not met status, so this page shows the numbers and does not score them.</li>
   <li><b>Amounts.</b> All amounts are in millions of dollars ($M). Spending is the ministry's own operating and capital expense. It does not include hospitals', school boards' or colleges' own spending, which the Province adds in its consolidated statements.</li>
  </ol>
  <div class="fhowkey"><b>Colours</b><div class="dkey"><span><i class="ok"></i>On or under budget</span><span><i class="watch"></i>Caution</span><span><i class="off"></i>Over budget</span><span class="muted">Gauge: spent as % of budget</span></div></div>
</details>`;
const onHead=(sub,intro)=>`<header class="dsh-head"><div><div class="kicker">Province of Ontario · Ministry dashboard</div><h2 class="nh">${sub||"Ontario Ministries Scorecard · FY 2024–25 to FY 2026–27"}</h2>
  ${intro||`<p class="pagelede">Ontario's ministries deliver the Province's programs and services: health care, schools, child care, social assistance, highways, transit, courts and more. Each is led by a Cabinet minister and staffed by the Ontario Public Service.</p>
  <p class="pagelede">Before each fiscal year, the Legislature reviews each ministry's budget (the Expenditure Estimates) and each ministry publishes a plan with key performance indicators. After the year ends, the Province reports what each ministry spent (the Public Accounts). This page compares them for 31 ministries and offices and 4 legislative offices.</p>`}</div></header>${ON_HOW}`;
const onSg=v=>v===0?fB(0):(v<0?"−":"+")+fB(Math.abs(v));
const onTbl=(cap,head,rows,tot)=>`<div class="sctwrap"><table class="sct fitems"><caption>${cap}</caption><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.length?rows.join(""):`<tr><td colspan="${head.length}" class="muted">None this year.</td></tr>`}${tot||""}</tbody></table></div>`;
const onGn=m=>m.goals&&m.goals.m?m.goals.m.length:0;
const onGl=m=>m.goals&&m.goals.m?m.goals.m.filter(x=>x[2]&&!/not available|new measure/i.test(x[2])).length:0;

function onYearPanel(){
  const body=pvYear([
   ["Key events",[
    ["Health","Health spent billions more than budgeted, the largest overage.",""],
    ["Wildfires","Forest fires again cost more than budgeted.",""],
    ["Emergencies","Emergency management cost about four times its starting budget.",""],
    ["Artificial intelligence","For FY 2026–27, a program names artificial intelligence for the first time, with about the same funding as last year.",""]]],
   ["What went well",[
    ["Deficit","The deficit came in lower than budgeted, because revenue was stronger than expected.",""],
    ["Within budget","More than half of ministries and offices stayed within their starting budgets.",""],
    ["Interest","Interest costs on the debt were lower than planned.",""]]],
   ["Areas to improve",[
    ["Spending over budget","16 of 35 ministries and offices spent more than their starting budget, and four spent more than their total approved funding.",""],
    ["Wildfire and emergency budgets","Budgets are set below what these cost, and the FY 2026–27 budgets are about the same.",""],
    ["Reporting on goals","Most ministries do not report whether their targets were met, so results are hard to judge.",""],
    ["Debt","Net debt rose by about $28 billion, to $455 billion.",""]]]
  ],[fA(ONS_SRC.pa26),fA(ONS_SRC.est27),fA(ONS_SRC.cfs26),fA(ONS_SRC.ppar)].join(" · "));
  return `<h4 class="fgrp">What happened in the year</h4><div class="fstack">${fRoll("i","bs","What happened in FY 2025–26","Highlights: key events, what went well, areas to improve","16 of 35 over budget","up",body)}</div>`;
}
function renderOnScorePage(){
  const el=document.getElementById("ch-onscore"); if(!el) return;
  if(el.dataset.built) return; el.dataset.built="1";
  el.innerHTML=`<section id="onscore" class="nsec vicscore" aria-label="Ontario ministries scorecard"></section>`;
  onOverview();
}
function onOverview(){
  const el=document.getElementById("onscore"), M=ONS, X=ONS_META;
  const sum=f=>M.reduce((t,m)=>t+f(m),0);
  const b26=sum(m=>m.pa26.T[0]), t26=sum(m=>m.pa26.T[3]), a26=sum(m=>m.pa26.T[4]);
  const e27=sum(m=>m.est27?m.est27.T[0]:0), e26r=sum(m=>m.est27?m.est27.T[1]:0);
  const over=M.filter(m=>m.pa26.T[4]>m.pa26.T[0]).length, overT=M.filter(m=>m.pa26.T[4]>m.pa26.T[3]+5e4).length;
  const gN=sum(onGn), gL=sum(onGl), gM=M.filter(m=>onGn(m)).length;
  const sp=fSpend(b26,a26), P=X.pa26, dB=P.budget.bal*1e6, dA=P.actual.bal*1e6;
  const kp=`<div class="dsh-kpis k5" aria-label="Ontario summary">${[
    ["Budget · FY 2026–27",fB(e27),fPill("neu",(e27>=e26r?"+":"−")+Math.abs((e27-e26r)/e26r*100).toFixed(1)+"% vs FY 2025–26"),"2026–27 Expenditure Estimates, ministries only",""],
    ["Spent · FY 2025–26",fB(a26),sp.pill,"Budget was "+fB(b26)+" · total approved "+fB(t26),fGauge(a26/b26*100,sp.cls==="up"?"off":"ok","Spent vs budget")],
    ["Over budget · FY 2025–26",over+" of "+M.length,fPill(over>M.length/2?"off":"watch",Math.round(over/M.length*100)+"%"),"Spent more than the start-of-year budget · "+overT+" spent more than the total approved",""],
    ["Deficit · FY 2025–26",fB(Math.abs(dA)),fPill(dA>=dB?"ok":"off",dA>=dB?"Smaller than budget by "+fB(dA-dB):"Larger than budget by "+fB(dB-dA)),"Budget plan was a "+fB(Math.abs(dB))+" deficit (whole government)",""],
    ["Goals · FY 2025–26 plans",gN+" measures",fPill("neu",gL+" with a latest result"),gM+" of "+M.length+" ministries and offices published measures with targets",""]
  ].map(fCard).join("")}</div>`;
  const rows=M.map(m=>{const p=m.pa26,s=fSpend(p.T[0],p.T[4]),n=onGn(m);
    return `<tr><th scope="row"><button class="linkbtn odgo" data-id="${m.id}">${m.name}</button></th><td>${fB(p.T[0])}</td><td>${fB(p.T[3])}</td><td>${fB(p.T[4])}</td>
      <td class="vcell ${s.cls}">${vsSgn(p.T[4]-p.T[0],fB)} <small>${vsP(s.pc)}</small></td>
      <td>${n?n+" <small>"+onGl(m)+" with result</small>":'<span class="muted">—</span>'}</td><td>${m.est27?fB(m.est27.T[0]):'<span class="muted">—</span>'}</td></tr>`;}).join("");
  const fis=X.b26, F=(v)=>fB(v*1e9);
  el.innerHTML=onHead()+`<div class="dsh-kh">FY 2026–27 · current fiscal year (April 1, 2026 – March 31, 2027)<span><b class="fmil">All amounts in millions of dollars ($M).</b> FY 2025–26 is the latest year with results: the Public Accounts were released in fall 2026.</span></div>${kp}
   <div class="sctwrap"><table class="sct fedtbl"><caption>35 ministries and offices · select one for its dashboard</caption><thead><tr><th scope="col">Ministry</th><th scope="col">Budget<small class="fth">FY 2025–26</small></th><th scope="col">Total approved<small class="fth">FY 2025–26</small></th><th scope="col">Spent<small class="fth">FY 2025–26</small></th><th scope="col">Spent vs budget<small class="fth">FY 2025–26</small></th><th scope="col">Goals<small class="fth">FY 2025–26 plan</small></th><th scope="col">Budget<small class="fth">FY 2026–27</small></th></tr></thead><tbody>${rows}
    <tr class="tot"><th scope="row">Total</th><td>${fB(b26)}</td><td>${fB(t26)}</td><td>${fB(a26)}</td><td class="vcell ${sp.cls}">${vsSgn(a26-b26,fB)} <small>${vsP(sp.pc)}</small></td><td>${gN}</td><td>${fB(e27)}</td></tr></tbody></table></div>
   <div class="note">The FY 2025–26 budget total includes Ontario's Contingency Fund (about $4.9 billion, held by Treasury Board Secretariat). Money drawn from it shows up as additional funding (B) in other ministries, so the total "spent vs budget" is lower than the sum of individual overruns. These are ministry totals, not the Province's consolidated expense of $236.3 billion, which adds hospitals, school boards, colleges and agencies. The four legislative offices have no FY 2026–27 figure in Volume 1 of the Estimates. Goals are the key performance indicators in each ministry's 2025–26 Published Plan; ministries left blank did not publish indicators with targets in table form.</div>
   <div class="src">Sources: ${fA(ONS_SRC.pa26)} · ${fA(ONS_SRC.pa25)} · ${fA(ONS_SRC.est27)} · ${fA(ONS_SRC.ppar)}</div>
   ${onYearPanel()}
   <h4 class="fgrp">Government-wide plans</h4><div class="fstack">
    ${fRoll("$","bs","2026 Budget fiscal plan","Revenue, expense and deficit, FY 2024–25 to FY 2028–29",onSg(fis.bal[2]*1e9)+" FY 2026–27","up",`<div class="sctwrap"><table class="sct fitems"><caption>Province of Ontario fiscal plan ($M)</caption><thead><tr><th scope="col">Item</th>${fis.cols.map(c=>`<th scope="col">${c}</th>`).join("")}</tr></thead><tbody>${[["Total revenue","rev"],["Program expense","prog"],["Interest on debt","int"],["Total expense","exp"],["Reserve","res"],["Surplus / (deficit)","bal"]].map(r=>`<tr><td>${r[0]}</td>${fis[r[1]].map(v=>`<td>${r[1]==="bal"?onSg(v*1e9):F(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="note">Whole-government figures, including hospitals, school boards, colleges and agencies. The budget shows these in billions with one decimal, so the $M figures here are rounded to the nearest $100M. The 2026 Budget was tabled March 26, 2026.</p><div class="src">Source: ${fA(ONS_SRC.b26)}</div>`)}
    ${fRoll("$","bs","FY 2025–26 results vs budget","Consolidated statement of operations, whole government",onSg(dA)+" deficit",dA<dB?"up":"dn",`<div class="sctwrap"><table class="sct fitems"><caption>Province of Ontario, FY 2025–26 ($M)</caption><thead><tr><th scope="col">Item</th><th scope="col">Budget</th><th scope="col">Actual</th><th scope="col">Difference</th></tr></thead><tbody>
       <tr><td>Total revenue</td>${fCol(P.budget.rev*1e6,"")}${fCol(P.actual.rev*1e6,"")}${fCol((P.actual.rev-P.budget.rev)*1e6,"")}</tr>
       ${Object.entries(P.sect).map(([k,v])=>`<tr><td>Expense: ${k}</td>${fCol(v[0]*1e6,"")}${fCol(v[1]*1e6,"")}${fCol((v[1]-v[0])*1e6,v[1]>v[0]?"up":"")}</tr>`).join("")}
       <tr class="tot"><th scope="row">Total expense</th>${fCol(P.budget.exp*1e6,"")}${fCol(P.actual.exp*1e6,"")}${fCol((P.actual.exp-P.budget.exp)*1e6,P.actual.exp>P.budget.exp?"up":"")}</tr>
       <tr><td>Reserve</td>${fCol(P.budget.res*1e6,"")}<td>—</td><td></td></tr>
       <tr class="tot"><th scope="row">Surplus / (deficit)</th>${fCol(dB,"")}${fCol(dA,"")}${fCol(dA-dB,"")}</tr></tbody></table></div>
       <p class="note">Health expense was $6.9 billion above budget; revenue was $4.7 billion above budget. Net debt rose from $427.1 billion to $455.0 billion. The FY 2024–25 actuals were restated in this report; the original FY 2024–25 deficit was $1.1 billion against a budgeted $9.8 billion.</p><div class="src">Sources: ${fA(ONS_SRC.cfs26)} · ${fA(ONS_SRC.cfs25)}</div>`)}
   </div>`;
  el.querySelectorAll(".odgo").forEach(b=>b.onclick=()=>{onMin(+b.dataset.id); window.scrollTo(0,el.offsetTop-10);});
}
/* one fiscal year of Public Accounts in the template layout */
function onPaBlock(p,yr,srcK,title){
  const [a,b,c,tot,sp]=p.T, s=fSpend(a,sp), src=`<div class="src">Source: ${fA(ONS_SRC[srcK])}</div>`, bd=(l,cl)=>`<span class="fbadge sm ${cl}">${l}</span>`;
  const st=p.st, oc=p.oc;
  const moneyTbl=`<div class="sctwrap"><table class="sct fmoney"><thead><tr><th scope="col">Item</th><th scope="col">Amount</th></tr></thead><tbody>
    <tr><th scope="row">${bd("A","bk")}Budget (Estimates)</th>${fCol(a,"")}</tr><tr><th scope="row">${bd("B","by")}Additional funding</th>${fCol(b,"cau")}</tr><tr><th scope="row">${bd("C","by")}Reductions and transfers</th>${fCol(c,"cau")}</tr>
    <tr class="tot"><th scope="row">${bd("E","bk")}Total approved</th>${fCol(tot,"")}</tr><tr><th scope="row">Spent</th>${fCol(sp,s.cls)}</tr>
    <tr><th scope="row">${sp>tot?"Spent above total approved":"Approved but not spent"}</th>${fCol(Math.abs(tot-sp),sp>tot?"up":"")}</tr></tbody></table></div>`;
  const ocTbl=onTbl("A · Budget by type, "+yr,["Type","Budget","Spent"],[`<tr><td>Operating expense</td>${fCol(oc[0][0],"")}${fCol(oc[0][1],"")}</tr>`,`<tr><td>Capital expense</td>${fCol(oc[1][0],"")}${fCol(oc[1][1],"")}</tr>`,`<tr><td>of which statutory (no yearly vote needed)</td>${fCol(st[0],"")}${fCol(st[1],st[1]>st[0]?"up":"")}</tr>`],`<tr class="tot"><th scope="row">Total</th>${fCol(a,"")}${fCol(sp,"")}</tr>`);
  const lab={O:"Operating",C:"Capital"};
  const rowsE=p.S.filter(r=>r[3]||r[4]).map(r=>`<tr><td>${fEsc(r[1])}<small class="muted"> · ${lab[r[0]]}</small></td>${fCol(r[3],"")}${fCol(r[4],"")}${fCol(r[4]-r[3],r[4]>r[3]?"up":"")}</tr>`);
  return {
   cards:`<div class="dsh-kpis k4">${[
    ["A · Budget",fB(a),fPill("neu","Estimates"),"",fGauge(100,"neu","Budget")],
    [b+c<0?"B–C · Net change":"B–C · Added",onSg(b+c),fPill("watch",b+c<0?"Net reduction during the year":"Funding added during the year"),"Added "+fB(b)+" · reduced "+fB(Math.abs(c)),a?fGauge(Math.abs(b+c)/Math.abs(a)*100,"watch","Change vs budget"):""],
    ["E · Total approved",fB(tot),fPill("neu",fB(a)+" "+(b+c<0?"−":"+")+" "+fB(Math.abs(b+c))),"",a?fGauge(tot/a*100,"neu","Approved vs budget"):""],
    ["Spent",fB(sp),a?s.pill:fPill("neu","No starting budget"),(sp>tot?"Above total approved by ":"Within total approved · not spent ")+fB(Math.abs(tot-sp)),a?fGauge(sp/a*100,s.cls==="up"?"off":"ok","Spent vs budget"):""]].map(fCard).join("")}</div>`,
   fin:`<h4 class="fgrp">Financials${title?" · "+fEsc(title):""}</h4><div class="fstack">`+
    fRoll("$","bs","Financial Summary","Where the funding came from, and what was spent",fB(sp)+" spent",sp>a?"up":"",moneyTbl+src)+
    fRoll("A","bk","Budget","Estimates, operating and capital",fB(a),"",ocTbl+`<p class="note">Statutory spending (for example ministers' salaries, bad debts, amortization or legal settlements) is allowed by other laws and can exceed the amount shown.</p>`+src)+
    fRoll("B","by","Additional funding","Treasury Board orders that added money",onSg(b),"cau",`<p class="note">Treasury Board can add money to a ministry's votes during the year, mostly from the Contingency Fund. The Public Accounts show the net change for each vote item; this is the sum of the increases.</p>`+onTbl("B · Additional funding, "+yr,["Source","Amount"],[`<tr><td>Treasury Board orders (increases)</td>${fCol(b,"cau")}</tr>`])+src)+
    fRoll("C","by","Reductions and transfers","Treasury Board orders that took money away",onSg(c),"cau",`<p class="note">Reductions include unused money returned and funding moved to other ministries or programs.</p>`+onTbl("C · Reductions and transfers, "+yr,["Change","Amount"],[`<tr><td>Treasury Board orders (reductions)</td>${fCol(c,"cau")}</tr>`])+src)+
    fRoll("E","bk","Totals","Total approved and spending by program",fB(tot)+" approved","",`<div class="sctwrap"><table class="sct fitems"><caption>E · By program, ${yr}</caption><thead><tr><th scope="col">Program</th><th scope="col">Total approved</th><th scope="col">Spent</th><th scope="col">Spent vs approved</th></tr></thead><tbody>${rowsE.join("")}<tr class="tot"><th scope="row">Total</th>${fCol(tot,"")}${fCol(sp,"")}${fCol(sp-tot,sp>tot?"up":"")}</tr></tbody></table></div>`+src)+`</div>`};
}
function onGoals(m){
  const g=m.goals;
  if(!g||(!g.m.length&&!g.sp.length)) return `<h4 class="fgrp">Goals</h4><p class="note">${m.est27?"This ministry's 2025–26 Published Plan and Annual Report does not list key performance indicators with targets in table form.":"This office does not publish a plan with key performance indicators."}</p>`;
  const st=g.m.some(x=>x[4]);
  const body=(g.m.length?`<div class="sctwrap"><table class="sct fitems"><caption>Key performance indicators, 2025–26 plan</caption><thead><tr><th scope="col">Measure</th><th scope="col">Baseline</th><th scope="col">Latest result</th><th scope="col">Target</th>${st?`<th scope="col">Ministry's status</th>`:""}</tr></thead><tbody>${g.m.map(x=>`<tr><td>${fEsc(x[0])}</td><td>${fEsc(x[1]||"—")}</td><td>${fEsc(x[2]||"—")}</td><td>${fEsc(x[3]||"—")}</td>${st?`<td>${x[4]?fPill(x[4]==="Achieved"?"ok":"watch",fEsc(x[4])):""}</td>`:""}</tr>`).join("")}</tbody></table></div><p class="note">Copied from the plan, with dates in brackets. Latest results often come from an earlier date than the target, so ParliVue does not mark them met or not met. "—" means the plan gave no value.${st?" The status column is the ministry's own.":""}</p>`:`<p class="note">No key performance indicators with targets in table form.</p>`)
    +(g.sp.length?`<p class="note"><b>Priorities named in the plan:</b> ${g.sp.map(fEsc).join(" · ")}</p>`:"");
  return `<h4 class="fgrp">Goals</h4><div class="fstack">`+fRoll(BC_GOAL,"bg","Goals and latest results","From the ministry's 2025–26 Published Plan and 2024–25 Annual Report",g.m.length?g.m.length+" measures":"Priorities only","",body+`<div class="src">Source: ${fA(ONS_SRC.ppar)}</div>`)+`</div>`;
}
function onMin(id,tab0){
  const el=document.getElementById("onscore"), m=ONS.find(x=>x.id===id), p=m.pa26, s=fSpend(p.T[0],p.T[4]), e=m.est27;
  const n=onGn(m);
  const cards=`<div class="dsh-kh">This year is FY 2026–27 (April 1, 2026 – March 31, 2027)<span><b class="fmil">All amounts in millions of dollars ($M).</b> Pick a year on the left to see more.</span></div>
   <div class="dsh-kpis k4">${[
    ["Budget · FY 2026–27",e?fB(e.T[0]):"—",e?fPill("neu",(e.T[0]>=e.T[1]?"+":"−")+fB(Math.abs(e.T[0]-e.T[1]))+" vs FY 2025–26"):fPill("neu","Not in Volume 1"),"2026–27 Expenditure Estimates",""],
    ["Spent · FY 2025–26",fB(p.T[4]),p.T[0]?s.pill:fPill("neu","No starting budget"),"Budget was "+fB(p.T[0])+" · total approved "+fB(p.T[3]),p.T[0]?fGauge(p.T[4]/p.T[0]*100,s.cls==="up"?"off":"ok","Spent vs budget"):""],
    ["Total approved · FY 2025–26",fB(p.T[3]),fPill(p.T[4]>p.T[3]?"off":"ok",p.T[4]>p.T[3]?"Spent above it by "+fB(p.T[4]-p.T[3]):"Not spent "+fB(p.T[3]-p.T[4])),"Budget plus Treasury Board changes",""],
    ["Goals · FY 2025–26 plan",n?n+" measures":"—",n?fPill("neu",onGl(m)+" with a latest result"):fPill("neu","No indicator table"),"Key performance indicators in the ministry's plan",""]].map(fCard).join("")}</div>`;
  const b26=onPaBlock(p,"FY 2025–26","pa26");
  const b25=m.pa25.map(q=>({q,b:onPaBlock(q,"FY 2024–25","pa25",m.pa25.length>1||q.name!==m.name?q.name:"")}));
  const rows27=c=>(e?e.P[c]:[]).map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[2],"")}${fCol(r[1],"")}${fCol(r[1]-r[2],"cau")}</tr>`);
  const tabs=[["y27","FY 2026–27","Apr 1, 2026 – Mar 31, 2027 · this year"],["y26","FY 2025–26","Apr 1, 2025 – Mar 31, 2026 · final results"],["y25","FY 2024–25","Apr 1, 2024 – Mar 31, 2025 · final results"]], sel=tab0||"y26";
  const panes={
   y27:e?`<p class="fynote">FY 2026–27: April 1, 2026 – March 31, 2027. Spending is reported after the year ends, in the Public Accounts (fall 2027). Click a section to open it.</p>
     <div class="dsh-kpis k4">${[["A · Budget",fB(e.T[0]),fPill("neu","Estimates"),"Operating "+fB(e.oc[0][0])+" · capital "+fB(e.oc[1][0]),fGauge(100,"neu","Budget")],["Change from FY 2025–26",onSg(e.T[0]-e.T[1]),fPill("watch","vs FY 2025–26 Estimates"),"",""],["Spent","—",fPill("watch","Not known yet"),"",""]].map(fCard).join("")}</div>
     <h4 class="fgrp">Financials</h4><div class="fstack">${fRoll("A","bk","Budget","Estimates, by program",fB(e.T[0]),"",onTbl("A · Operating expense, FY 2026–27",["Program","FY 2025–26","FY 2026–27","Change"],rows27("O"),`<tr class="tot"><th scope="row">Total operating</th>${fCol(e.oc[0][1],"")}${fCol(e.oc[0][0],"")}${fCol(e.oc[0][0]-e.oc[0][1],"cau")}</tr>`)+(e.P.C.length?onTbl("A · Capital expense, FY 2026–27",["Program","FY 2025–26","FY 2026–27","Change"],rows27("C"),`<tr class="tot"><th scope="row">Total capital</th>${fCol(e.oc[1][1],"")}${fCol(e.oc[1][0],"")}${fCol(e.oc[1][0]-e.oc[1][1],"cau")}</tr>`):"")+`<p class="note">The FY 2025–26 column is the Estimates as shown in this year's book, which Ontario adjusts to the current ministry structure, so it can differ from the FY 2025–26 budget in that year's section.</p><div class="src">Source: ${fA(ONS_SRC.est27)}</div>`)}</div>
     <h4 class="fgrp">Goals</h4><p class="note">The 2026–27 Published Plans and Annual Reports had not been released when this page was built (November 2026). The FY 2025–26 tab shows the latest published indicators.</p>`
     :`<p class="fynote">FY 2026–27: April 1, 2026 – March 31, 2027.</p><p class="note">Legislative offices are not in Volume 1 of the 2026–27 Expenditure Estimates. Their budgets are approved separately.</p>`,
   y26:`<p class="fynote">FY 2025–26: April 1, 2025 – March 31, 2026. Final results from the Public Accounts released in fall 2026. Ministry statements in the Public Accounts are unaudited schedules; the Province's consolidated statements are audited. Click a section to open it.</p>${b26.cards}${b26.fin}${m.note26?`<p class="note">${fEsc(m.note26)}</p>`:""}${m.new?`<p class="note">${fEsc(m.new)}</p>`:""}${onGoals(m)}`,
   y25:b25.length?`<p class="fynote">FY 2024–25: April 1, 2024 – March 31, 2025. Final results from the Public Accounts. Click a section to open it.</p>${m.renamed?`<p class="note">Ontario changed its ministry structure in 2025. ${b25.length>1?"FY 2024–25 figures are shown for the ministries that existed then: "+b25.map(x=>fEsc(x.q.name)).join(" and ")+". Their programs were combined into this ministry.":"FY 2024–25 figures are for the ministry as it was then: the "+fEsc(b25[0].q.name)+"."}</p>`:""}${b25.map(x=>(b25.length>1?x.b.cards:x.b.cards)+x.b.fin).join("")}<p class="note">Goals for FY 2024–25 are reported as the latest results in the 2025–26 plans (see the FY 2025–26 tab).</p>`:`<p class="note">${fEsc(m.new||"No FY 2024–25 results.")}</p>`
  };
  el.innerHTML=`<button class="chipbtn fback">← All 35 ministries and offices</button>`+onHead(m.name,`<p class="pagelede">${m.name}: budget, spending and goals for FY 2024–25 to FY 2026–27.</p>`)+cards+`<div class="dsh">
    <nav class="dsh-rail" role="tablist" aria-orientation="vertical" aria-label="Ministry sections"><div class="dsh-rl">Sections</div>${tabs.map(t=>`<button role="tab" id="odt-${t[0]}" aria-controls="odp-${t[0]}" aria-selected="${t[0]===sel}" tabindex="${t[0]===sel?0:-1}" data-k="${t[0]}"><span>${t[1]}</span><small>${t[2]}</small></button>`).join("")}</nav>
    <div class="dsh-main">${tabs.map(t=>`<div role="tabpanel" id="odp-${t[0]}" aria-labelledby="odt-${t[0]}" class="vspane" ${t[0]===sel?"":"hidden"}><h3 class="dsh-ph">${t[1]}<small>${t[2]}</small></h3>${panes[t[0]]}</div>`).join("")}</div></div>`;
  el.querySelector(".fback").onclick=()=>{onOverview(); window.scrollTo(0,el.offsetTop-10);};
  const bs=[...el.querySelectorAll(".dsh-rail button")];
  const pick=b=>bs.forEach(x=>{const on=x===b; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; document.getElementById("odp-"+x.dataset.k).hidden=!on;});
  bs.forEach((b,i)=>{ b.onclick=()=>pick(b); b.onkeydown=e=>{ const k=(e.key==="ArrowDown"||e.key==="ArrowRight")?1:(e.key==="ArrowUp"||e.key==="ArrowLeft")?-1:0; if(k){ const n=bs[(i+k+bs.length)%bs.length]; pick(n); n.focus(); e.preventDefault(); } }; });
}
