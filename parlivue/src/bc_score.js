/* BC Ministries Scorecard: same layout as the federal Departments Scorecard (Fisheries template).
   Data: BCS (bc_score_data.js) from the Public Accounts 2024/25 and 2025/26 (CRF Supplementary Schedules),
   the 2026/27 Estimates (Budget 2026) and the 2025/26 Annual Service Plan Reports. */
const BC_SRC={
  pa26:["Province of B.C.: Public Accounts 2025/26, Consolidated Revenue Fund Supplementary Schedules","https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/government-finances/public-accounts/2025-26/pa-2025-26-crf-supplementary-schedules.pdf"],
  pa25:["Province of B.C.: Public Accounts 2024/25, Consolidated Revenue Fund Supplementary Schedules","https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/government-finances/public-accounts/2024-25/pa-2024-25-crf-supplementary-schedules.pdf"],
  est27:["Province of B.C.: Estimates, Fiscal Year Ending March 31, 2027 (Budget 2026)","https://www.bcbudget.gov.bc.ca/2026/pdf/2026_Estimates.pdf"],
  aspr:c=>["2025/26 Annual Service Plan Report","https://www.bcbudget.gov.bc.ca/Annual_Reports/2025_2026/pdf/ministry/"+c+".pdf"],
  aspr25:c=>["2024/25 Annual Service Plan Report","https://www.bcbudget.gov.bc.ca/Annual_Reports/2024_2025/pdf/ministry/"+c+".pdf"],
  sp27:c=>["2026/27 – 2028/29 Service Plan","https://www.bcbudget.gov.bc.ca/2026/sp/pdf/ministry/"+c+".pdf"],
  bfp26:["Province of B.C.: Budget and Fiscal Plan 2026/27 – 2028/29 (Feb 17, 2026)","https://www.bcbudget.gov.bc.ca/2026/pdf/2026_Budget_and_Fiscal_Plan.pdf"],
  est25:["Province of B.C.: Estimates, Fiscal Year Ending March 31, 2025 (Budget 2024)","https://www.bcbudget.gov.bc.ca/2024/pdf/2024_Estimates.pdf"],
  strat24:["Province of B.C.: Budget 2024 Strategic Plan","https://www.bcbudget.gov.bc.ca/2024/pdf/2024_Strategic_Plan.pdf"]
};
const BC_GOAL=`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="10" r="7.5"/><circle cx="10" cy="10" r="4"/><circle cx="10" cy="10" r="1" fill="currentColor"/></svg>`;
const bcIsC=k=>/reorganization|between accounts/i.test(k);
const bcSg=v=>v===0?fB(0):(v<0?"−":"+")+fB(Math.abs(v));
const bcGoalCount=(m,k)=>{const g=m[k||"goals"]||[];const met=g.filter(x=>x[3]==="met").length,not=g.filter(x=>x[3]==="not").length;return {met,not,n:met+not,other:g.length-met-not,pct:met+not?met/(met+not)*100:null};};
const bcGcls=p=>p==null?"neu":p>=75?"ok":p>=50?"watch":"off";
const bcTbl=(cap,head,rows,tot)=>`<div class="sctwrap"><table class="sct fitems"><caption>${cap}</caption><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.length?rows.join(""):`<tr><td colspan="${head.length}" class="muted">None this year.</td></tr>`}${tot||""}</tbody></table></div>`;
const bcHead=(sub,intro)=>`<header class="dsh-head"><div><div class="kicker">Province of British Columbia · Ministry dashboard</div><h2 class="nh">${sub||"BC Ministries Scorecard · FY 2024–25 to FY 2026–27"}</h2>
  ${intro||`<p class="pagelede">B.C.'s ministries carry out the Province's laws, programs and services: health care, schools, child protection, forests, highways and more. Each is led by a Cabinet minister and staffed by the BC Public Service.</p>
  <p class="pagelede">Before each fiscal year, the Legislature approves each ministry's budget (the Estimates) and each ministry publishes a service plan with goals and targets. After the year ends, the Province reports what each ministry spent (the Public Accounts) and how it did against its targets (the Annual Service Plan Reports). This page compares the two for 23 ministries, the Office of the Premier, the Legislative Assembly, the Officers of the Legislature, and debt interest.</p>`}</div></header>${BC_HOW}`;
const BC_HOW=`<details class="flowdd fedhow"><summary><span><h2>How to read this page</h2><span class="ddhint">Click to see how budgets, spending and goals fit together</span></span><span class="ddarrow" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6l4 4 4-4"/></svg></span></summary>
  <ol class="steps">
   <li class="yrhl"><b>Fiscal years, not calendar years.</b> B.C.'s year runs April 1 to March 31, the same as the federal government. B.C. writes it as 2025/26; this page writes FY 2025–26. FY 2025–26 means April 1, 2025 to March 31, 2026. City scorecards use calendar years (January to December).</li>
   <li><b>A · Budget.</b> The Estimates the Legislature approved before the year started.</li>
   <li><b>B · Additional funding.</b> Money added during the year: contingencies (a central fund for new or unexpected costs, such as wildfires) and statutory spending allowed by other laws.</li>
   <li><b>C · Changes and transfers.</b> Money moved between ministries when government reorganized, and transfers between a ministry's own accounts.</li>
   <li><b>E · Total approved.</b> A + B + C. <b>Spent</b> is the actual expense in the Public Accounts. "Over budget" compares spending with the start-of-year budget (A), even when extra funding was approved.</li>
   <li><b>Goals.</b> Each ministry's performance measures for the year, with the target and the result from its Annual Service Plan Report. The "met / not met" status is ParliVue's comparison of the result with the target; the reports themselves show the numbers.</li>
   <li><b>Amounts.</b> All amounts are in millions of dollars ($M). Spending is the ministry's own (Consolidated Revenue Fund) expense, net of recoveries; it does not include health authorities, school districts or Crown corporations' own spending.</li>
  </ol>
  <div class="fhowkey"><b>Colours</b><div class="dkey"><span><i class="ok"></i>Good: on or under budget, goal met</span><span><i class="watch"></i>Caution</span><span><i class="off"></i>Over budget, goal not met</span><span class="muted">Gauge: spent as % of budget</span></div></div>
</details>`;

/* "What happened in the year" panel (shared with the Ontario scorecard). secs: [[heading,[[title,figures,explanation],...]],...] */
const pvYear=(secs,src)=>secs.map(([h,L])=>`<h5 class="fyh">${h}</h5><ul class="steps fyl">${L.map(([t,n,x])=>`<li><b>${t}.</b> ${n}${x?`<br><small class="muted">${x}</small>`:""}</li>`).join("")}</ul>`).join("")+`<div class="src">Sources: ${src}</div>`;
const M_=v=>fB(v*1e6);
function bcYearPanel(){
  const qr=["Province of B.C.: 2026/27 First Quarterly Report (Sept 14, 2026)","https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/government-finances/quarterly-reports/2026-27_first_quarterly_report.pdf"];
  const body=pvYear([
   ["Key events, FY 2025–26",[
    ["Wildfires","Wildfires again cost far more than budgeted, close to three times the starting amount, as in the year before. The extra was approved during the year.",""],
    ["Disasters","Emergency response and recovery cost many times the small amount set aside at the start of the year.",""],
    ["Health","Demand for health services pushed spending above budget. In dollars, this was the largest single increase.",""],
    ["Treaties","Payments under treaties and other agreements with First Nations were more than double the budget.",""],
    ["Technology","Spending on government IT, data and connectivity rose, but it is small compared with the items above.",""],
    ["Reorganization","Support services from 23 ministries were brought together in Citizens' Services. This moved costs between ministries; it was not new spending.",""],
    ["Contingencies","Most unplanned costs were covered by the Contingencies vote, an amount set aside in the budget for unexpected costs. It gives ministries authority to spend; it is not an expense itself.",""]]],
   ["What went well",[
    ["Within budget","Seven ministries and offices, including Transportation and Transit and Social Development and Poverty Reduction, stayed within their starting budgets. Nearly all stayed within the total funding approved.",""],
    ["Goals","About six in ten goals with results were met. Public Safety and Solicitor General and the Attorney General met all of theirs.",""],
    ["Staff","The public service stayed below its planned staff level.",""]]],
   ["Areas to improve",[
    ["Spending above budget","20 of 27 ministries and offices spent more than their start-of-year budget; 17 by more than 5%.",""],
    ["Wildfire and disaster budgets","Fire Management and Emergency and Disaster Management Act budgets were well below actual spending in both FY 2024–25 and FY 2025–26, and the FY 2026–27 budgets are about the same.",""],
    ["Goals not met","44 goals not met. Health met 3 of 8; Housing and Municipal Affairs 3 of 9; Children and Family Development 1 of 4; Post–Secondary Education and Future Skills 1 of 4.","28 more results were not yet available when the reports were published."],
    ["Debt and interest","Cost of borrowing: budget "+M_(2762.1)+", spent "+M_(2858.3)+". Total provincial debt is forecast to rise from "+M_(154059)+" (FY 2025–26) to "+M_(234559)+" (FY 2028–29).","Budget 2026 fiscal plan."]]],
   ["Since the year ended",[
    ["First Quarterly Report, Sept 14, 2026","FY 2026–27 deficit forecast "+M_(13759)+", up "+M_(450)+" from Budget 2026 ("+M_(13309)+"). Expenses up "+M_(1239)+", mainly fire management and refundable tax credits; revenue up "+M_(789)+".","The report lists new U.S. tariffs, including softwood lumber duties, among the main risks to the forecast."],
    ["Provincial election, Oct 24, 2026","A new government was elected. Ministries and FY 2026–27 plans may change once the new cabinet is in place.",""]]]
  ],[fA(BC_SRC.pa26),fA(BC_SRC.pa25),fA(BC_SRC.est27),fA(BC_SRC.bfp26),fA(qr),`<a href="https://www.bcbudget.gov.bc.ca/Annual_Reports/2025_2026/" target="_blank" rel="noopener">2025/26 Annual Service Plan Reports</a>`].join(" · "));
  return `<h4 class="fgrp">What happened in the year</h4><div class="fstack">${fRoll("i","bs","What happened in FY 2025–26","Key events, what went well, areas to improve, and updates since",M_(3417.6)+" added during the year","cau",body)}</div>`;
}
function renderBcScorePage(){
  const el=document.getElementById("ch-bcscore"); if(!el) return;
  if(el.dataset.built) return; el.dataset.built="1";
  el.innerHTML=`<section id="bcscore" class="nsec vicscore" aria-label="BC ministries scorecard"></section>`;
  bcOverview();
}
function bcOverview(){
  const el=document.getElementById("bcscore"), M=BCS;
  const S=k=>M.reduce((t,m)=>t+(m[k]?m[k].T[0]:0),0), A=k=>M.reduce((t,m)=>t+(m[k]?m[k].T[3]:0),0);
  const b26=S("pa26"), a26=A("pa26"), t26=M.reduce((t,m)=>t+m.pa26.T[2],0), e27=M.reduce((t,m)=>t+m.est27.reduce((s,r)=>s+r[2],0),0), e26r=M.reduce((t,m)=>t+m.est27.reduce((s,r)=>s+r[1],0),0);
  const over=M.filter(m=>m.pa26.T[3]>m.pa26.T[0]).length, overT=M.filter(m=>m.pa26.T[3]>m.pa26.T[2]).length;
  const G=M.reduce((c,m)=>{const g=bcGoalCount(m);c.met+=g.met;c.not+=g.not;c.o+=g.other;return c;},{met:0,not:0,o:0}), gp=G.met/(G.met+G.not)*100;
  const sp=fSpend(b26,a26), F=BCS_META.fte["26"];
  const kp=`<div class="dsh-kpis k5" aria-label="BC summary">${[
    ["Budget · FY 2026–27",fB(e27),fPill("neu",(e27>=e26r?"+":"−")+Math.abs((e27-e26r)/e26r*100).toFixed(1)+"% vs FY 2025–26"),"2026/27 Estimates, Budget 2026 (Feb 2026)",""],
    ["Spent · FY 2025–26",fB(a26),sp.pill,"Budget was "+fB(b26)+" · total approved "+fB(t26),fGauge(a26/b26*100,sp.cls==="up"?"off":"ok","Spent vs budget")],
    ["Over budget · FY 2025–26",over+" of "+M.length,fPill(over>M.length/2?"off":"watch",Math.round(over/M.length*100)+"%"),"Spent more than the start-of-year budget · "+(overT?overT+" spent more than the total approved":"all stayed within the total approved"),""],
    ["Goals met · FY 2025–26",G.met+" of "+(G.met+G.not),fPill(bcGcls(gp),G.not+" not met"),G.o+" more not yet measurable or unclear",fGauge(gp,bcGcls(gp),"Goals met")],
    ["Staff · FY 2025–26",fN(F[0]),fPill(F[0]>F[1]?"watch":"ok",(F[0]>F[1]?"Above plan +":"Within plan −")+fN(Math.abs(F[0]-F[1]))),"Planned "+fN(F[1])+" full-time staff paid by the General Fund",fGauge(F[0]/F[1]*100,F[0]>F[1]?"watch":"ok","Staff vs plan")]
  ].map(fCard).join("")}</div>`;
  const rows=M.map(m=>{const p=m.pa26,s=fSpend(p.T[0],p.T[3]),g=bcGoalCount(m),e=m.est27.reduce((t,r)=>t+r[2],0);
    return `<tr><th scope="row"><button class="linkbtn bdgo" data-id="${m.id}">${m.name}</button></th><td>${fB(p.T[0])}</td><td>${fB(p.T[2])}</td><td>${fB(p.T[3])}</td>
      <td class="vcell ${s.cls}">${vsSgn(p.T[3]-p.T[0],fB)} <small>${vsP(s.pc)}</small></td>
      <td class="vcell ${g.n?(bcGcls(g.pct)==="ok"?"dn":bcGcls(g.pct)==="off"?"up":"cau"):""}">${g.n?fPf(g.pct)+"% <small>"+g.met+" of "+g.n+"</small>":'<span class="muted">—</span>'}</td><td>${fB(e)}</td></tr>`;}).join("");
  el.innerHTML=bcHead()+`<div class="dsh-kh">FY 2026–27 · current fiscal year (April 1, 2026 – March 31, 2027)<span><b class="fmil">All amounts in millions of dollars ($M).</b> FY 2025–26 is the latest year with results: the Public Accounts and Annual Service Plan Reports were released in July 2026.</span></div>${kp}
   <div class="sctwrap"><table class="sct fedtbl"><caption>27 ministries and offices · select one for its dashboard</caption><thead><tr><th scope="col">Ministry</th><th scope="col">Budget<small class="fth">FY 2025–26</small></th><th scope="col">Total approved<small class="fth">FY 2025–26</small></th><th scope="col">Spent<small class="fth">FY 2025–26</small></th><th scope="col">Spent vs budget<small class="fth">FY 2025–26</small></th><th scope="col">Goals met<small class="fth">FY 2025–26</small></th><th scope="col">Budget<small class="fth">FY 2026–27</small></th></tr></thead><tbody>${rows}
    <tr class="tot"><th scope="row">Total</th><td>${fB(b26)}</td><td>${fB(t26)}</td><td>${fB(a26)}</td><td class="vcell ${sp.cls}">${vsSgn(a26-b26,fB)} <small>${vsP(sp.pc)}</small></td><td>${fPf(gp)}% <small>${G.met} of ${G.met+G.not}</small></td><td>${fB(e27)}</td></tr></tbody></table></div>
   <div class="note">These totals cover ministry spending from the Consolidated Revenue Fund. "Other Appropriations" (central contingencies and capital funding held for all ministries) is left out, so they do not equal the Province's total expense of $94.7 billion in FY 2025–26. Goals: Infrastructure and Mining and Critical Minerals had no performance measures for FY 2025–26 because they were newly created. The Legislative Assembly, Officers of the Legislature and debt interest do not publish service plans.</div>
   <div class="src">Sources: ${fA(BC_SRC.pa26)} · ${fA(BC_SRC.pa25)} · ${fA(BC_SRC.est27)} · <a href="https://www.bcbudget.gov.bc.ca/Annual_Reports/2025_2026/" target="_blank" rel="noopener">2025/26 Annual Service Plan Reports</a></div>
   ${bcYearPanel()}
   <h4 class="fgrp">Government-wide plans</h4><div class="fstack">
    ${fRoll("$","bs","Budget 2026 fiscal plan","Revenue, expense, deficit, debt and staff, FY 2025–26 to FY 2028–29",bcSg(BCS_META.fiscal.rows[2][1][1]*1e6)+" deficit FY 2026–27","up",`<div class="sctwrap"><table class="sct fitems"><caption>Province of B.C. fiscal plan ($M)</caption><thead><tr><th scope="col">Item</th>${BCS_META.fiscal.cols.map(c=>`<th scope="col">${c}</th>`).join("")}</tr></thead><tbody>${BCS_META.fiscal.rows.map(r=>`<tr><td>${r[0]}</td>${r[1].map(v=>`<td>${/FTE/.test(r[0])?fN(v):fB(v*1e6)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="note">These are whole-government figures, including health authorities, school districts, universities and Crown corporations. Staff are full-time equivalents in ministries and special offices; the FY 2025–26 figure is the forecast adjusted for job action. Budget 2026 was tabled Feb 17, 2026.</p><div class="src">Source: ${fA(BC_SRC.bfp26)}, Table 1.1 and Table A13</div>`)}
    ${fRoll(BC_GOAL,"bg","Government priorities","Budget 2024 Strategic Plan, guiding FY 2024–25",BCS_META.strat24.length-1+" priorities","",`<ul class="steps">${BCS_META.strat24.map(x=>`<li>${fEsc(x)}</li>`).join("")}</ul><p class="note">Each ministry's service plan sets goals and measures under these priorities.</p><div class="src">Source: ${fA(BC_SRC.strat24)}</div>`)}
   </div>`;
  el.querySelectorAll(".bdgo").forEach(b=>b.onclick=()=>{bcMin(+b.dataset.id); window.scrollTo(0,el.offsetTop-10);});
}
/* one fiscal year of Public Accounts in the template layout */
function bcPaBlock(m,k,yr){
  const p=m[k]; if(!p) return null;
  const [a,o,tot,sp]=p.T, Bk=p.K.filter(x=>!bcIsC(x[0])), Ck=p.K.filter(x=>bcIsC(x[0])), b=Bk.reduce((t,x)=>t+x[1],0), c=Ck.reduce((t,x)=>t+x[1],0);
  const s=fSpend(a,sp), src=`<div class="src">Source: ${fA(BC_SRC[k])}</div>`, bd=(l,cl)=>`<span class="fbadge sm ${cl}">${l}</span>`;
  const moneyTbl=`<div class="sctwrap"><table class="sct fmoney"><thead><tr><th scope="col">Item</th><th scope="col">Amount</th></tr></thead><tbody>
    <tr><th scope="row">${bd("A","bk")}Budget (Estimates)</th>${fCol(a,"")}</tr><tr><th scope="row">${bd("B","by")}Additional funding</th>${fCol(b,"cau")}</tr><tr><th scope="row">${bd("C","by")}Changes and transfers</th>${fCol(c,"cau")}</tr>
    <tr class="tot"><th scope="row">${bd("E","bk")}Total approved</th>${fCol(tot,"")}</tr><tr><th scope="row">Spent</th>${fCol(sp,s.cls)}</tr>
    <tr><th scope="row">${sp>tot?"Spent above total approved":"Approved but not spent"}</th>${fCol(Math.abs(tot-sp),sp>tot?"up":"")}</tr></tbody></table></div>`;
  const rowsA=p.S.filter(r=>r[1]!==0).map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[1],"")}</tr>`);
  const rowsK=(L,cl)=>L.map(x=>`<tr><td>${fEsc(x[0])}</td>${fCol(x[1],cl)}</tr>`);
  const moved=p.S.filter(r=>/Transferred from|Transfer from Ministry/i.test(r[0])).map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[2],"cau")}</tr>`);
  const rowsE=p.S.map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[1],"")}${fCol(r[3],"")}${fCol(r[4],"")}${fCol(r[4]-r[3],r[4]>r[3]?"up":"")}</tr>`).concat(p.J?[`<tr><td>Adjustment of prior year accrual</td><td></td><td></td>${fCol(p.J,"")}<td></td></tr>`]:[]);
  return {
   cards:`<div class="dsh-kpis k4">${[
    ["A · Budget",fB(a),fPill("neu","Estimates"),"",fGauge(100,"neu","Budget")],
    [b+c<0?"B–C · Net change":"B–C · Added",bcSg(b+c),fPill("watch",b+c<0?"Net reduction during the year":"Funding added during the year"),"",a?fGauge(Math.abs(b+c)/Math.abs(a)*100,"watch","Change vs budget"):""],
    ["E · Total approved",fB(tot),fPill("neu",fB(a)+" "+(b+c<0?"−":"+")+" "+fB(Math.abs(b+c))),"",a?fGauge(tot/a*100,"neu","Approved vs budget"):""],
    ["Spent",fB(sp),a?s.pill:fPill("neu","No starting budget"),(sp>tot?"Above total approved by ":"Within total approved · not spent ")+fB(Math.abs(tot-sp)),a?fGauge(sp/a*100,s.cls==="up"?"off":"ok","Spent vs budget"):""]].map(fCard).join("")}</div>`,
   fin:`<h4 class="fgrp">Financials</h4><div class="fstack">`+
    fRoll("$","bs","Financial Summary","Where the funding came from, and what was spent",fB(sp)+" spent",sp>a?"up":"",moneyTbl+src)+
    fRoll("A","bk","Budget","Estimates, by core business",fB(a),"",bcTbl("A · Budget (Estimates), "+yr,["Core business","Amount"],rowsA,`<tr class="tot"><th scope="row">Total</th>${fCol(a,"")}</tr>`)+src)+
    fRoll("B","by","Additional funding","Contingencies and statutory spending",bcSg(b),"cau",bcTbl("B · Additional funding, "+yr,["Source","Amount"],rowsK(Bk,"cau"),`<tr class="tot"><th scope="row">Total</th>${fCol(b,"cau")}</tr>`)+src)+
    fRoll("C","by","Changes and transfers","Government reorganization and transfers between accounts",bcSg(c),"cau",bcTbl("C · Changes and transfers, "+yr,["Change","Amount"],rowsK(Ck,"cau"),`<tr class="tot"><th scope="row">Total</th>${fCol(c,"cau")}</tr>`)+(moved.length?bcTbl("Programs moved into this ministry during the year (funding approved)",["Program","Amount"],moved):"")+src)+
    fRoll("E","bk","Totals","Budget, total approved and spending by core business",fB(tot)+" approved","",`<div class="sctwrap"><table class="sct fitems"><caption>E · By core business, ${yr}</caption><thead><tr><th scope="col">Core business</th><th scope="col">Budget</th><th scope="col">Total approved</th><th scope="col">Spent</th><th scope="col">Spent vs approved</th></tr></thead><tbody>${rowsE.join("")}<tr class="tot"><th scope="row">Total</th>${fCol(a,"")}${fCol(tot,"")}${fCol(sp,"")}${fCol(sp-tot,sp>tot?"up":"")}</tr></tbody></table></div>`+src)+`</div>`};
}
function bcGoals(m,k,yr,srcK){
  const g=m[k], none=m[k==="goals"?"gnone":"gnone25"], note=m[k==="goals"?"gnote":"gnote25"], part=m[k==="goals"?"gpart":"gpart25"];
  if(!g) return `<h4 class="fgrp">Goals</h4><p class="note">This office does not publish an annual service plan report.</p>`;
  const c=bcGoalCount(m,k), lab={met:["ok","Met"],not:["off","Not met"],pending:["watch","Result not out yet"],na:["neu","Can't tell"]};
  const src=m.aspr?`<div class="src">Source: ${fA(BC_SRC[srcK](m.aspr))}</div>`:"";
  const body=g.length?`<div class="sctwrap"><table class="sct fitems"><caption>Performance measures, ${yr}</caption><thead><tr><th scope="col">Measure</th><th scope="col">Target</th><th scope="col">Result</th><th scope="col">Status</th></tr></thead><tbody>${g.map(x=>`<tr><td>${fEsc(x[0])}</td><td>${fEsc(x[1])}</td><td>${fEsc(x[2])}</td><td>${fPill(lab[x[3]][0],lab[x[3]][1])}</td></tr>`).join("")}</tbody></table></div><p class="note">Status is ParliVue's comparison of the result with the target. Measures with several parts are shown separately.${note?" "+fEsc(note):""}${part?" Some measures in the report are described in words rather than numbers, or could not be read cleanly, and are left out; see the report for the full list.":""}</p>`
    :`<p class="note">${fEsc(none||"See the report for this ministry's targets and results.")}</p>`;
  return `<h4 class="fgrp">Goals</h4><div class="fstack">`+fRoll(BC_GOAL,"bg","Goals and results",g.length?g.length+" measures in the ministry's report":"No measures this year",c.n?c.met+" of "+c.n+" met":"—",c.n?(bcGcls(c.pct)==="ok"?"dn":bcGcls(c.pct)==="off"?"up":"cau"):"",body+src)+`</div>`;
}
function bcGoals27(m){
  if(!m.goals27) return `<h4 class="fgrp">Goals</h4><p class="note">This office does not publish a service plan.</p>`;
  const body=`<div class="sctwrap"><table class="sct fitems"><caption>Targets for FY 2026–27</caption><thead><tr><th scope="col">Measure</th><th scope="col">FY 2026–27 target</th></tr></thead><tbody>${m.goals27.map(x=>`<tr><td>${fEsc(x[0])}</td><td>${fEsc(x[1])}</td></tr>`).join("")}</tbody></table></div><p class="note">Results come in the 2026/27 Annual Service Plan Report, due in summer 2027. Main measures shown; see the plan for the full list and the targets for FY 2027–28 and FY 2028–29.</p><div class="src">Source: ${fA(BC_SRC.sp27(m.sp||m.aspr))}</div>`;
  return `<h4 class="fgrp">Goals</h4><div class="fstack">`+fRoll(BC_GOAL,"bg","Goals and targets","From the ministry's 2026/27 – 2028/29 Service Plan",m.goals27.length+" targets","",body)+`</div>`;
}
function bcMin(id,tab0){
  const el=document.getElementById("bcscore"), m=BCS.find(x=>x.id===id), p=m.pa26, s=fSpend(p.T[0],p.T[3]), g=bcGoalCount(m);
  const e27=m.est27.reduce((t,r)=>t+r[2],0), e26r=m.est27.reduce((t,r)=>t+r[1],0);
  const cards=`<div class="dsh-kh">This year is FY 2026–27 (April 1, 2026 – March 31, 2027)<span><b class="fmil">All amounts in millions of dollars ($M).</b> Pick a year on the left to see more.</span></div>
   <div class="dsh-kpis k4">${[
    ["Budget · FY 2026–27",fB(e27),fPill("neu",(e27>=e26r?"+":"−")+fB(Math.abs(e27-e26r))+" vs FY 2025–26"),"2026/27 Estimates (Budget 2026)",""],
    ["Spent · FY 2025–26",fB(p.T[3]),p.T[0]?s.pill:fPill("neu","No starting budget"),"Budget was "+fB(p.T[0])+" · total approved "+fB(p.T[2]),p.T[0]?fGauge(p.T[3]/p.T[0]*100,s.cls==="up"?"off":"ok","Spent vs budget"):""],
    ["Goals met · FY 2025–26",g.n?g.met+" of "+g.n:"—",g.n?fPill(bcGcls(g.pct),g.not+" not met"):fPill("neu",m.goals?"See the report":"No service plan"),g.other?g.other+" more not yet measurable or unclear":"",g.n?fGauge(g.pct,bcGcls(g.pct),"Goals met"):""],
    ["Staff · FY 2025–26",m.fte26!=null?fN(m.fte26):"—",m.fte25!=null&&m.fte26!=null?fPill("neu",(m.fte26>=m.fte25?"+":"−")+fN(Math.abs(m.fte26-m.fte25))+" vs FY 2024–25"):"","Full-time equivalent staff paid by the General Fund",""]].map(fCard).join("")}</div>`;
  const b26=bcPaBlock(m,"pa26","FY 2025–26"), b25=bcPaBlock(m,"pa25","FY 2024–25");
  const rows27=m.est27.map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[1],"")}${fCol(r[2],"")}${fCol(r[2]-r[1],"cau")}</tr>`);
  const tabs=[["y27","FY 2026–27","Apr 1, 2026 – Mar 31, 2027 · this year"],["y26","FY 2025–26","Apr 1, 2025 – Mar 31, 2026 · final results"],["y25","FY 2024–25","Apr 1, 2024 – Mar 31, 2025 · final results"]], sel=tab0||"y26";
  const panes={
   y27:`<p class="fynote">FY 2026–27: April 1, 2026 – March 31, 2027. Spending is reported after the year ends, in the Public Accounts (summer 2027). Click a section to open it.</p>
     <div class="dsh-kpis k4">${[["A · Budget",fB(e27),fPill("neu","Estimates"),"",fGauge(100,"neu","Budget")],["Change from FY 2025–26",bcSg(e27-e26r),fPill("watch","vs restated FY 2025–26 budget"),"",""],["Spent","—",fPill("watch","Not known yet"),"",""]].map(fCard).join("")}</div>
     <h4 class="fgrp">Financials</h4><div class="fstack">${fRoll("A","bk","Budget","Estimates, by core business",fB(e27),"",bcTbl("A · Budget (Estimates), FY 2026–27",["Core business","FY 2025–26 (restated)","FY 2026–27","Change"],rows27,`<tr class="tot"><th scope="row">Total</th>${fCol(e26r,"")}${fCol(e27,"")}${fCol(e27-e26r,"cau")}</tr>`)+`<p class="note">The FY 2025–26 column is restated by the Province to match this year's ministry structure, so it can differ from the FY 2025–26 budget shown in that year's section.</p><div class="src">Source: ${fA(BC_SRC.est27)}</div>`)}</div>
     ${m.plan3?`<div class="sctwrap"><table class="sct fitems"><caption>Three-year plan, from Budget 2026</caption><thead><tr><th scope="col">Fiscal year</th><th scope="col">Planned expense</th></tr></thead><tbody>${["FY 2026–27 (budget)","FY 2027–28 (plan)","FY 2028–29 (plan)"].map((y,i)=>`<tr><td>${y}</td><td>${fB(m.plan3[i])}</td></tr>`).join("")}</tbody></table></div><div class="src">Source: ${fA(BC_SRC.bfp26)}, Table 1.3 (rounded to the nearest million)</div>`:""}
     ${bcGoals27(m)}
     <p class="note">B.C. adds funding during the year mostly through contingencies, which are reported in the Public Accounts after the year ends. The October 24, 2026 provincial election may lead to a new ministry structure.</p>`,
   y26:`<p class="fynote">FY 2025–26: April 1, 2025 – March 31, 2026. Final results from the Public Accounts released July 2026. Click a section to open it.</p>${b26.cards}${b26.fin}${m.note26?`<p class="note">${fEsc(m.note26)}</p>`:""}${bcGoals(m,"goals","FY 2025–26","aspr")}`,
   y25:b25?`<p class="fynote">FY 2024–25: April 1, 2024 – March 31, 2025. Final results from the Public Accounts. Click a section to open it.</p>${b25.cards}${b25.fin}${m.note25?`<p class="note">${fEsc(m.note25)}</p>`:""}${m.tabled25?`<p class="note">The FY 2024–25 budget was tabled in February 2024 under the ${fEsc(m.tabled25)}; ministries were reorganized in November 2024. <span class="src">Source: ${fA(BC_SRC.est25)}</span></p>`:""}${bcGoals(m,"goals25","FY 2024–25","aspr25")}`:`<p class="note">No FY 2024–25 results.</p>`
  };
  el.innerHTML=`<button class="chipbtn fback">← All 27 ministries and offices</button>`+bcHead(m.name,`<p class="pagelede">${m.name}: budget, spending and goals for FY 2024–25 to FY 2026–27.</p>`)+cards+`<div class="dsh">
    <nav class="dsh-rail" role="tablist" aria-orientation="vertical" aria-label="Ministry sections"><div class="dsh-rl">Sections</div>${tabs.map(t=>`<button role="tab" id="bdt-${t[0]}" aria-controls="bdp-${t[0]}" aria-selected="${t[0]===sel}" tabindex="${t[0]===sel?0:-1}" data-k="${t[0]}"><span>${t[1]}</span><small>${t[2]}</small></button>`).join("")}</nav>
    <div class="dsh-main">${tabs.map(t=>`<div role="tabpanel" id="bdp-${t[0]}" aria-labelledby="bdt-${t[0]}" class="vspane" ${t[0]===sel?"":"hidden"}><h3 class="dsh-ph">${t[1]}<small>${t[2]}</small></h3>${panes[t[0]]}</div>`).join("")}</div></div>`;
  el.querySelector(".fback").onclick=()=>{bcOverview(); window.scrollTo(0,el.offsetTop-10);};
  const bs=[...el.querySelectorAll(".dsh-rail button")];
  const pick=b=>bs.forEach(x=>{const on=x===b; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; document.getElementById("bdp-"+x.dataset.k).hidden=!on;});
  bs.forEach((b,i)=>{ b.onclick=()=>pick(b); b.onkeydown=e=>{ const k=(e.key==="ArrowDown"||e.key==="ArrowRight")?1:(e.key==="ArrowUp"||e.key==="ArrowLeft")?-1:0; if(k){ const n=bs[(i+k+bs.length)%bs.length]; pick(n); n.focus(); e.preventDefault(); } }; });
}
