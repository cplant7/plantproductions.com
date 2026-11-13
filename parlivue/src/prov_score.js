/* Provincial scorecards (Alberta, Saskatchewan, Manitoba, New Brunswick; more to follow).
   One renderer for every province, same layout as the Ontario and B.C. scorecards (Fisheries template):
   overview of all ministries → each ministry's page with FY 2026–27, FY 2025–26 and FY 2024–25 sections,
   Financials A Budget · B Additional funding · C Changes and transfers · E Total approved · Spent.
   Each province's data file is converted here into one common shape (amounts in dollars). */

const PSC_K=s=>String(s||"").toLowerCase().replace(/^(department|ministry) of (the )?/,"").replace(/[’']/g,"'").replace(/\s+/g," ").trim();
const PSC_T=a=>a.map(x=>x*1e3);

/* ---------- Alberta ---------- */
function pscAlberta(){
  const SRC={ar:["Ministry annual reports 2025–26 (Lapse/Encumbrance statements)","https://www.alberta.ca/government-and-ministry-annual-reports"],
    est:["2026–27 Government Estimates (Budget 2026)","https://open.alberta.ca/publications/budget-2026"],
    goa:["Government of Alberta Annual Report 2025–26","https://open.alberta.ca/dataset/7714457c-7527-443a-a7db-dd8c1c8ead86/resource/3d001693-e3c4-47ac-824c-604440df2eb0/download/goa-annual-report-2025-2026.pdf"]};
  const VL={E:"Expense vote",C:"Capital investment vote",F:"Financial transactions vote",K:"Contingency allocations"};
  const rows26=ABS.map(([c,n])=>{const l=ABL[c],E=l.E;
    return {k:c,n,T:PSC_T([E[0],E[1],E[2],E[3],E[4]]),P:[],
      votes:["E","C","F","K"].filter(k=>l[k]).map(k=>[VL[k],...PSC_T(l[k])]),
      note:(l.nosupp?"This ministry's report has one Adjustments column and no separate Supplementary Estimate column, so any supplementary funding is included in C. ":"")+(l.note?l.note:"")};});
  const rows27=ABS.map(([c,n,v,x])=>{const ct=x.find(r=>r[0]==="=Ministry Total")||x.find(r=>r[0]==="=Consolidated Total");
    return {k:c,n,T:[v.E[2]*1e3,v.E[0]*1e3],P:[],P2:x.filter(r=>r[0][0]!=="=").map(r=>[r[0],r[3]*1e3,r[1]*1e3]),T2:[ct[3]*1e3,ct[1]*1e3],
      votes:[["Expense vote",v.E[2]*1e3,v.E[0]*1e3],v.C?["Capital investment vote",v.C[2]*1e3,v.C[0]*1e3]:null,v.F?["Financial transactions vote",v.F[2]*1e3,v.F[0]*1e3]:null].filter(Boolean)};});
  return {id:"abscore",code:"AB",prov:"Alberta",pfx:"Province of Alberta",unit:"ministries",unit1:"ministry",
    lede:`Alberta's ministries deliver the Province's programs and services: hospitals and surgery, schools and child care, assisted living and social services, roads, courts and more. Each is led by a Cabinet minister.`,
    lede2:`Before each fiscal year, the Legislature approves each ministry's voted budget (the Government Estimates). After the year ends, each ministry's annual report shows what it was approved to spend and what it spent (the Lapse/Encumbrance statement). This page compares them for ${ABS.length} ministries.`,
    how:{A:"The voted estimate for the year, as approved in the Appropriation Act (Government Estimates, February 2025).",
      B:"Supplementary Estimates approved by the Legislature during the year (March 2026).",
      C:"Adjustments: amounts carried over from the year before, transfers between votes and Treasury Board approvals. The Contingency (a $4 billion fund in Budget 2025) was handed out to ministries during the year; those allocations are shown separately, by ministry, as Contingency allocations.",
      E:"Adjusted voted estimate: A + B + C.",S:"Voted actuals: what the ministry spent from its expense vote. Amortization and other non-cash amounts are not voted, so they are not included.",
      basis:"These are the ministries' voted expense amounts. They are not the Province's consolidated expense of $77.5 billion, which adds health, school and post-secondary bodies, pensions and debt costs."},
    y26:{lab:"FY 2025–26",src:SRC.ar,rows:rows26,progNote:"Alberta's annual reports show the expense vote by program in a table that is not yet captured here, so this section shows the vote totals."},
    y25:null,
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 budget",note:"The budget is the ministry's voted expense, the same basis as the FY 2025–26 results. The FY 2025–26 column is the Estimates' comparable figure, restated to the 2026 ministry structure, so it can differ slightly from the FY 2025–26 budget in that year's section. The table by program shows the ministry's total expense (voted and non-voted, including amortization and its agencies), which is larger."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Fiscal summary, whole government",src:SRC.goa,mul:1e6,G:AB_GOV,
      note:"The budget included a $4 billion contingency (in “Other”), which was fully allocated in the third quarter: $2 billion to health, $1.5 billion for agriculture and wildfire disasters and $0.5 billion to other areas. Revenue was above budget mainly from investment income, taxes, resource revenue and business enterprise income. Oil (WTI) averaged US$64.94 per barrel, against US$68.00 in the budget. Net financial debt was $33.6 billion at March 31, 2026."},
    srcs:[SRC.ar,SRC.est,SRC.goa]};
}

/* ---------- Saskatchewan ---------- */
function pscSask(){
  const SRC={pa26:["Public Accounts 2025–26, Volume 2: General Revenue Fund Details","https://publications.saskatchewan.ca/#/categories/893"],
    pa25:["Public Accounts 2024–25, Volume 2: General Revenue Fund Details","https://publications.saskatchewan.ca/#/categories/893"],
    v1:["Public Accounts 2025–26, Volume 1: Summary Financial Statements","https://publications.saskatchewan.ca/#/categories/893"],
    est:["2026–27 Saskatchewan Estimates","https://budget.saskatchewan.ca/f/f35e0zkmpjti2xix134z0h4bhmq9fw/2026-27-Estimates-WEB.pdf"]};
  const t5=V=>[V[0],V[2],V[1],V[3],V[8]];
  const conv=D=>D.map(([vote,n,V,CO,S])=>{ if(!CO) return {k:vote,n,T:t5(V),P:S.filter(s=>s[0]!=="NA").map(s=>[s[1],s[2][0],s[2][2],s[2][1]+s[2][3],s[2][4],s[2][9]])};
    const M=V.map((x,i)=>x-CO[i]);
    return {k:vote,n,T:t5(M),P:[],votes:[["Ministry appropriation",...t5(M)],["Commercial Operations (funded from its own revenue)",...t5(CO)]],
      votesNote:`${n} – Commercial Operations is a separate line in the Public Accounts, paid for from the revenue it earns (a statutory adjustment, with no voted budget). It is left out of this ministry's budget and spending so that “over budget” compares like with like.`,
      progNote:`Saskatchewan's program table for ${n} combines the ministry with its Commercial Operations, so it is not shown here; see the Financial Summary for the split.`}; });
  const vByName={}; SKP26.forEach(r=>vByName[PSC_K(r[1])]=r[0]);
  const rows27=SKE27.map(([n,s,P])=>({k:vByName[PSC_K(n)]??n,n,T:[s[2]*1e3,s[4]*1e3],P:P.map(p=>[p[0]+(p[3]?" (statutory)":""),p[1]*1e3,p[2]*1e3]),
    votes:[["Operating",s[0]*1e3,null],["Capital",s[1]*1e3,null]]}));
  return {id:"skscore",code:"SK",prov:"Saskatchewan",pfx:"Province of Saskatchewan",unit:"ministries and offices",unit1:"ministry",
    lede:`Saskatchewan's ministries and agencies deliver the Province's programs: health, education, social services, highways, community safety, agriculture and more. The Legislative Assembly's officers (such as the Provincial Auditor and Ombudsman) are included.`,
    lede2:`Before each fiscal year, the Legislature approves the Estimates. After the year ends, Volume 2 of the Public Accounts shows each ministry's appropriation and what it spent, by program (subvote). This page compares them for ${SKP26.length} ministries and offices.`,
    how:{A:"The appropriation in the Estimates.",B:"Special warrants and supplementary estimates approved during the year.",
      C:"Statutory adjustments: changes other laws allow without a new vote (for example debt interest, pension costs, or revenue that commercial operations may spend). At program level, C also includes virements: money moved between programs within the ministry, which add to zero.",
      E:"Revised appropriation: A + B + C.",S:"Total expenditure, the figure Saskatchewan compares with the appropriation: expense, plus capital assets bought, less amortization and other non-cash items.",
      basis:"These are General Revenue Fund amounts. They are not the Province's consolidated (summary) expense of $22.1 billion, which adds Crown corporations, health and education bodies."},
    y26:{lab:"FY 2025–26",src:SRC.pa26,rows:conv(SKP26),totNote:"Totals leave out the Highways and SaskBuilds and Procurement Commercial Operations (revenue-funded, about $524 million spent in FY 2025–26)."},
    y25:{lab:"FY 2024–25",src:SRC.pa25,rows:conv(SKP25),note:"Vote 73 was named Corrections, Policing and Public Safety in FY 2024–25."},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Estimates",note:"The FY 2025–26 column is restated in the 2026–27 Estimates for the current structure, so a few ministries differ from the appropriation in the FY 2025–26 section."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Summary statement of operations, whole government (audited)",src:SRC.v1,mul:1e3,G:SK_GOV,
      note:"Saskatchewan reported a deficit of $947 million against a budgeted surplus of $12 million. The Province's explanation: health expense rose with demand for services, retroactive pay from bargaining and physician compensation; protection of persons and property rose with wildfire response and evacuations; agriculture fell because better crop yields lowered crop insurance payouts. Net debt was $17.2 billion at March 31, 2026."},
    srcs:[SRC.pa26,SRC.pa25,SRC.est,SRC.v1]};
}

/* ---------- Manitoba ---------- */
function pscManitoba(){
  const SRC={r26:["Report on the Estimates of Expenditure and Supplementary Information 2025–26","https://www.gov.mb.ca/asset_library/en/finances/reesi-2025-26.pdf"],
    r25:["Report on the Estimates of Expenditure and Supplementary Information 2024–25","https://www.gov.mb.ca/asset_library/en/proactive/20242025/publicaccounts/reesi-report-2024-25.pdf"],
    ar:["Annual Report and Public Accounts 2025–26","https://www.gov.mb.ca/asset_library/en/finances/annual-report-and-public-accounts-2025-26.pdf"],
    est:["Estimates of Expenditure 2026/27","https://www.gov.mb.ca/asset_library/en/budget2026/estimates_budget2026.pdf"]};
  const tc=s=>s.toLowerCase().replace(/(^|[\s,\-(])([a-z])/g,(m,a,b)=>a+b.toUpperCase()).replace(/\b(And|Of|The|For|To|In|On|Of)\b/g,w=>w.toLowerCase()).replace(/^./,c=>c.toUpperCase());
  const conv=D=>D.map(([ro,n,t,a,P])=>({k:ro,n:tc(n),T:[a[0],a[1],a[2]+a[3],t[0],t[1]],P:P.map(p=>[p[1],p[2],p[3],p[4]+p[5],p[6],p[7]])}));
  const rows27=MBE27.map(([no,n,T,P])=>{const r=MBP26.find(x=>x[1]===n); return {k:r?r[0]:n,n:tc(n),T:[T[0]*1e3,T[1]*1e3],P:P.map(p=>[p[1],p[2]*1e3,p[3]*1e3])};});
  return {id:"mbscore",code:"MB",prov:"Manitoba",pfx:"Province of Manitoba",unit:"departments",unit1:"department",
    lede:`Manitoba's departments deliver the Province's programs: health, seniors and long-term care, education and child care, families, justice, highways and more. Each is led by a Cabinet minister. Some lines are service headings rather than departments (Enabling Appropriations, Emergency Expenditures, Tax Credits and Public Debt).`,
    lede2:`Before each fiscal year, the Legislature approves the Estimates of Expenditure. After the year ends, the Province reports each department's authority and spending by appropriation (the Report on the Estimates of Expenditure and Supplementary Information). This page compares them for ${MBP26.length} departments and service headings.`,
    how:{A:"The main estimate (printed Estimates). For statutory items such as public debt, it is the amount actually required.",B:"Special warrants approved during the year.",
      C:"Transfers from Enabling Appropriations (Internal Service Adjustments, a central fund for contingencies and costs not yet assigned) and virements (money moved between appropriations within a department). Across government these add to zero.",
      E:"Authorized: A + B + C.",S:"Expended, after recoveries from other bodies.",
      basis:"These are department appropriation amounts. The Province's summary (consolidated) expense of $25.9 billion is larger because it adds health authorities, school divisions, colleges and other reporting entities."},
    y26:{lab:"FY 2025–26",src:SRC.r26,rows:conv(MBP26)},
    y25:{lab:"FY 2024–25",src:SRC.r25,rows:conv(MBP25),note:"FY 2024–25 includes a one-time Tobacco Settlement expense of $425 million with no appropriation."},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Estimates",note:"Part A (operating) only. The FY 2025–26 column is the comparative shown in the 2026/27 Estimates, restated for the current structure."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Summary budget vs actual by department (consolidated), whole government",src:SRC.ar,mul:1e6,G:MB_GOV,
      note:"Consolidated figures include each department's reporting entities (health authorities, school divisions, colleges), so they are larger than the department amounts above. Emergency expenditures were $272 million against a $50 million budget. Net debt was $36.5 billion."},
    srcs:[SRC.r26,SRC.r25,SRC.est,SRC.ar]};
}

/* ---------- New Brunswick ---------- */
function pscNB(){
  const SRC={v2:["Public Accounts 2025, Volume II: Supplementary Information","https://www.gnb.ca/content/dam/GNB3/org/ftb-fct/doc/2025-public-accounts-vol-2-comptes-publics-vol-2.pdf"],
    v1:["Public Accounts 2026, Volume I: Consolidated Financial Statements","https://www.gnb.ca/content/dam/GNB3/org/ftb-fct/doc/public-accounts-vol-1-2026.pdf"],
    est:["Main Estimates 2026–2027","https://www.gnb.ca/content/dam/GNB3/gov/budget/docs/main-estimates-budget-principal-2026-2027.pdf"]};
  const rows25=NBP25.map(([n,v])=>({k:PSC_K(n),n,T:[v[0]*1e3,0,v[1]*1e3,v[2]*1e3,v[3]*1e3],P:[]}));
  const rows27=NBE27.map(([n,a,r,e])=>({k:PSC_K(n),n,T:[e*1e3,a*1e3],P:[],votes:[["FY 2025–26 revised forecast",r*1e3,null]]}));
  return {id:"nbscore",code:"NB",prov:"New Brunswick",pfx:"Province of New Brunswick",unit:"departments",unit1:"department",
    lede:`New Brunswick's departments deliver the Province's programs: health, education and early childhood development, social development, transportation, justice and public safety and more. Each is led by a Cabinet minister.`,
    lede2:`Before each fiscal year, the Legislature approves the Main Estimates. After the year ends, Volume II of the Public Accounts compares each department's budget with what it spent. This page compares them for ${NBP25.length} departments and other accounts.`,
    how:{A:"The Main Estimates (ordinary account).",B:"New Brunswick does not add funding during the year. Spending above the budget is approved afterwards through Supplementary Estimates (for FY 2024–25, tabled March 17, 2026), so B is shown as zero.",
      C:"Appropriation transfers: money moved to departments from central provisions in General Government (for example the salary provision), which add to zero across government.",
      E:"Budget after transfers: A + C.",S:"Actual ordinary account spending.",
      basis:"These are ordinary account amounts. The Province's consolidated expense ($14.9 billion in FY 2025–26) adds school districts, health authorities, nursing homes and other organizations."},
    latestNote:"New Brunswick's department results for FY 2025–26 (Public Accounts Volume II) had not been published when this page was built (November 2026; last year's was tabled December 19). The latest department results are for FY 2024–25. FY 2025–26 whole-government results are below.",
    y26:null,
    y25:{lab:"FY 2024–25",src:SRC.v2,rows:rows25,progNote:"Volume II shows spending by program, but its bilingual layout has not yet been checked line by line for this page, so this section shows department totals."},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Estimates",note:"Department totals, ordinary account. Departments were reorganized for 2026–27 (for example, Natural Resources and Energy Development became two departments), so some FY 2024–25 rows have no FY 2026–27 match."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Consolidated statement of operations, whole government (audited)",src:SRC.v1,mul:1e6,G:NB_GOV,
      note:"New Brunswick reported a deficit of $1.3 billion against a budgeted $549 million. The Province's explanation: revenue was $216.6 million below budget, mainly corporate income tax, HST and personal income tax; expense was $537.9 million above budget, largely health and social development. Net debt was $13.9 billion."},
    srcs:[SRC.v2,SRC.est,SRC.v1]};
}

const PSC={}; const PSC_FN={abscore:pscAlberta,skscore:pscSask,mbscore:pscManitoba,nbscore:pscNB};
const pscGet=id=>PSC[id]||(PSC[id]=PSC_FN[id]());
const pscSg=v=>v===0?fB(0):(v<0?"−":"+")+fB(Math.abs(v));

function pscHead(G,sub,intro){
  const h=G.how;
  return `<header class="dsh-head"><div><div class="kicker">${G.pfx} · ${G.unit1==="ministry"?"Ministry":"Department"} dashboard</div><h2 class="nh">${sub||G.prov+" "+(G.unit1==="ministry"?"Ministries":"Departments")+" Scorecard · FY 2024–25 to FY 2026–27"}</h2>
   ${intro||`<p class="pagelede">${G.lede}</p><p class="pagelede">${G.lede2}</p>`}</div></header>
   <details class="flowdd fedhow"><summary><span><h2>How to read this page</h2><span class="ddhint">Click to see how budgets and spending fit together</span></span><span class="ddarrow" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6l4 4 4-4"/></svg></span></summary>
   <ol class="steps">
    <li class="yrhl"><b>Fiscal years, not calendar years.</b> ${G.prov}'s year runs April 1 to March 31, the same as the federal government. FY 2025–26 means April 1, 2025 to March 31, 2026. City scorecards use calendar years (January to December).</li>
    <li><b>A · Budget.</b> ${h.A}</li><li><b>B · Additional funding.</b> ${h.B}</li><li><b>C · Changes and transfers.</b> ${h.C}</li>
    <li><b>E · Total approved.</b> ${h.E} <b>Spent:</b> ${h.S} “Over budget” compares spending with the start-of-year budget (A).</li>
    <li><b>Goals.</b> ${G.prov}'s ${G.unit} publish plans and annual reports with performance measures. They are being added to this page.</li>
    <li><b>Amounts.</b> All amounts are in millions of dollars ($M). ${h.basis}</li>
   </ol>
   <div class="fhowkey"><b>Colours</b><div class="dkey"><span><i class="ok"></i>On or under budget</span><span><i class="watch"></i>Caution</span><span><i class="off"></i>Over budget</span><span class="muted">Gauge: spent as % of budget</span></div></div></details>`;
}
function pscTbl(cap,head,rows,tot){return `<div class="sctwrap"><table class="sct fitems"><caption>${cap}</caption><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.length?rows.join(""):`<tr><td colspan="${head.length}" class="muted">None.</td></tr>`}${tot||""}</tbody></table></div>`;}

function renderPscPage(id){
  const el=document.getElementById("ch-"+id); if(!el) return;
  if(el.dataset.built) return; el.dataset.built="1";
  el.innerHTML=`<section id="${id}" class="nsec vicscore" aria-label="${pscGet(id).prov} scorecard"></section>`;
  pscOverview(id);
}
function pscGov(G){
  const g=G.gov, D=g.G, m=g.mul, row=(r,cls)=>`<tr${cls?` class="${cls}"`:""}><td>${fEsc(r[0])}</td>${fCol(r[1]*m,"")}${fCol(r[2]*m,"")}${fCol((r[2]-r[1])*m,"")}${fCol(r[3]*m,"")}</tr>`;
  const head=["Item","Budget FY 2025–26","Actual FY 2025–26","Difference","Actual FY 2024–25"];
  const body=pscTbl(G.prov+", whole government ($M)",head,[
    ...D.rev.map(r=>row(r)),`<tr class="tot"><th scope="row">Total revenue</th>${fCol(D.revT[0]*m,"")}${fCol(D.revT[1]*m,"")}${fCol((D.revT[1]-D.revT[0])*m,"")}${fCol(D.revT[2]*m,"")}</tr>`,
    ...D.exp.map(r=>`<tr><td>Expense: ${fEsc(r[0])}</td>${fCol(r[1]*m,"")}${fCol(r[2]*m,"")}${fCol((r[2]-r[1])*m,r[2]>r[1]?"up":"")}${fCol(r[3]*m,"")}</tr>`),
    `<tr class="tot"><th scope="row">Total expense</th>${fCol(D.expT[0]*m,"")}${fCol(D.expT[1]*m,"")}${fCol((D.expT[1]-D.expT[0])*m,D.expT[1]>D.expT[0]?"up":"")}${fCol(D.expT[2]*m,"")}</tr>`,
    `<tr class="tot"><th scope="row">Surplus / (deficit)</th>${fCol(D.bal[0]*m,"")}${fCol(D.bal[1]*m,"")}${fCol((D.bal[1]-D.bal[0])*m,"")}${fCol(D.bal[2]*m,"")}</tr>`]);
  const dA=D.bal[1]*m, dB=D.bal[0]*m;
  return fRoll("$","bs",g.title,g.sub,(dA<0?"Deficit ":"Surplus ")+fB(Math.abs(dA)),dA<dB?"up":"dn",body+`<p class="note">${g.note}</p><div class="src">Source: ${fA(g.src)}</div>`);
}
function pscOverview(id){
  const G=pscGet(id), el=document.getElementById(id), L=G.y26||G.y25, R=L.rows, Y=L.lab;
  const f27=k=>G.y27.rows.find(r=>r.k===k);
  const sum=f=>R.reduce((t,m)=>t+f(m),0);
  const b=sum(m=>m.T[0]), t=sum(m=>m.T[3]), a=sum(m=>m.T[4]);
  const e27=G.y27.rows.reduce((s,r)=>s+r.T[0],0), e26=G.y27.rows.reduce((s,r)=>s+r.T[1],0);
  const over=R.filter(m=>m.T[4]>m.T[0]+500).length, overT=R.filter(m=>m.T[4]>m.T[3]+500).length;
  const sp=fSpend(b,a), D=G.gov.G, mul=G.gov.mul, dA=D.bal[1]*mul, dB=D.bal[0]*mul;
  const kp=`<div class="dsh-kpis k4" aria-label="${G.prov} summary">${[
    ["Budget · FY 2026–27",fB(e27),fPill("neu",(e27>=e26?"+":"−")+Math.abs((e27-e26)/e26*100).toFixed(1)+"% vs FY 2025–26"),"2026–27 Estimates, "+G.unit+" total",""],
    ["Spent · "+Y,fB(a),sp.pill,"Budget was "+fB(b)+" · total approved "+fB(t),fGauge(a/b*100,sp.cls==="up"?"off":"ok","Spent vs budget")],
    ["Over budget · "+Y,over+" of "+R.length,fPill(over>R.length/2?"off":"watch",Math.round(over/R.length*100)+"%"),"Spent more than the start-of-year budget · "+overT+" spent more than the total approved",""],
    [(dA<0?"Deficit":"Surplus")+" · FY 2025–26",fB(Math.abs(dA)),fPill(dA>=dB?"ok":"off",dA>=dB?"Better than budget by "+fB(dA-dB):"Worse than budget by "+fB(dB-dA)),"Budget plan: "+(dB<0?"a "+fB(Math.abs(dB))+" deficit":"a "+fB(dB)+" surplus")+" (whole government)",""]
  ].map(fCard).join("")}</div>`;
  const rows=R.map((m,i)=>{const s=fSpend(m.T[0],m.T[4]),e=f27(m.k);
    return `<tr><th scope="row"><button class="linkbtn odgo" data-i="${i}">${fEsc(m.n)}</button></th><td>${fB(m.T[0])}</td><td>${fB(m.T[3])}</td><td>${fB(m.T[4])}</td>
     <td class="vcell ${s.cls}">${m.T[0]?vsSgn(m.T[4]-m.T[0],fB)+" <small>"+vsP(s.pc)+"</small>":'<span class="muted">No budget</span>'}</td><td>${e?fB(e.T[0]):'<span class="muted">—</span>'}</td></tr>`;}).join("");
  el.innerHTML=pscHead(G)+`<div class="dsh-kh">FY 2026–27 · current fiscal year (April 1, 2026 – March 31, 2027)<span><b class="fmil">All amounts in millions of dollars ($M).</b> ${G.latestNote||Y+" is the latest year with "+G.unit1+" results: they were released in fall 2026."}</span></div>${kp}
   <div class="sctwrap"><table class="sct fedtbl"><caption>${R.length} ${G.unit} · select one for its dashboard</caption><thead><tr><th scope="col">${G.unit1==="ministry"?"Ministry":"Department"}</th><th scope="col">Budget<small class="fth">${Y}</small></th><th scope="col">Total approved<small class="fth">${Y}</small></th><th scope="col">Spent<small class="fth">${Y}</small></th><th scope="col">Spent vs budget<small class="fth">${Y}</small></th><th scope="col">Budget<small class="fth">FY 2026–27</small></th></tr></thead><tbody>${rows}
    <tr class="tot"><th scope="row">Total</th><td>${fB(b)}</td><td>${fB(t)}</td><td>${fB(a)}</td><td class="vcell ${sp.cls}">${vsSgn(a-b,fB)} <small>${vsP(sp.pc)}</small></td><td>${fB(e27)}</td></tr></tbody></table></div>
   <div class="note">${L.totNote?L.totNote+" ":""}${G.how.basis} FY 2026–27 totals use the Estimates' own basis; see each ${G.unit1}'s FY 2026–27 section. A “—” in the FY 2026–27 column means the ${G.unit1} was renamed or reorganized and has no direct match.</div>
   <div class="src">Sources: ${G.srcs.map(fA).join(" · ")}</div>
   <h4 class="fgrp">Government-wide results</h4><div class="fstack">${pscGov(G)}</div>`;
  el.querySelectorAll(".odgo").forEach(btn=>btn.onclick=()=>{pscMin(id,+btn.dataset.i); window.scrollTo(0,el.offsetTop-10);});
}
function pscBlock(G,m,Yr){
  const [a,b,c,tot,sp]=m.T, s=fSpend(a,sp), src=`<div class="src">Source: ${fA(Yr.src)}</div>`, bd=(l,cl)=>`<span class="fbadge sm ${cl}">${l}</span>`;
  const money=`<div class="sctwrap"><table class="sct fmoney"><thead><tr><th scope="col">Item</th><th scope="col">Amount</th></tr></thead><tbody>
    <tr><th scope="row">${bd("A","bk")}Budget</th>${fCol(a,"")}</tr><tr><th scope="row">${bd("B","by")}Additional funding</th>${fCol(b,"cau")}</tr><tr><th scope="row">${bd("C","by")}Changes and transfers</th>${fCol(c,"cau")}</tr>
    <tr class="tot"><th scope="row">${bd("E","bk")}Total approved</th>${fCol(tot,"")}</tr><tr><th scope="row">Spent</th>${fCol(sp,s.cls)}</tr>
    <tr><th scope="row">${sp>tot?"Spent above total approved":"Approved but not spent"}</th>${fCol(Math.abs(tot-sp),sp>tot?"up":"")}</tr></tbody></table></div>`;
  const P=m.P.filter(r=>r[1]||r[4]||r[5]);
  const progA=P.length?pscTbl("A · Budget by program, "+Yr.lab,["Program","Budget"],P.map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[1],"")}</tr>`),`<tr class="tot"><th scope="row">Total</th>${fCol(a,"")}</tr>`):"";
  const progB=P.filter(r=>r[2]).map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[2],"cau")}</tr>`);
  const progC=P.filter(r=>r[3]).map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[3],"cau")}</tr>`);
  const pn=m.progNote||Yr.progNote; const progE=P.length?`<div class="sctwrap"><table class="sct fitems"><caption>E · By program, ${Yr.lab}</caption><thead><tr><th scope="col">Program</th><th scope="col">Total approved</th><th scope="col">Spent</th><th scope="col">Spent vs approved</th></tr></thead><tbody>${P.map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[4],"")}${fCol(r[5],"")}${fCol(r[5]-r[4],r[5]>r[4]?"up":"")}</tr>`).join("")}<tr class="tot"><th scope="row">Total</th>${fCol(tot,"")}${fCol(sp,"")}${fCol(sp-tot,sp>tot?"up":"")}</tr></tbody></table></div>`:`<p class="note">${fEsc(pn||"Program detail is not available for this year.")}</p>`;
  const votes=m.votes&&m.votes.length>1?pscTbl("All votes, "+Yr.lab,["Vote","Budget","Supplementary","Adjustments","Total approved","Spent"],m.votes.map(v=>`<tr><td>${v[0]}</td>${fCol(v[1],"")}${fCol(v[2],"cau")}${fCol(v[3],"cau")}${fCol(v[4],"")}${fCol(v[5],v[5]>v[4]?"up":"")}</tr>`))+`<p class="note">${m.votesNote||"The summary above uses the expense vote. Capital investment and financial transactions are voted separately. Contingency allocations are money Treasury Board assigned to this ministry during the year from the central Contingency."}</p>`:"";
  return {
   cards:`<div class="dsh-kpis k4">${[
    ["A · Budget",fB(a),fPill("neu","Estimates"),"",fGauge(100,"neu","Budget")],
    ["B + C · Changes",pscSg(b+c),fPill("watch",b+c<0?"Net reduction during the year":"Net addition during the year"),"Additional "+pscSg(b)+" · changes "+pscSg(c),a?fGauge(Math.abs(b+c)/Math.abs(a)*100,"watch","Change vs budget"):""],
    ["E · Total approved",fB(tot),fPill("neu",fB(a)+" "+(b+c<0?"−":"+")+" "+fB(Math.abs(b+c))),"",a?fGauge(tot/a*100,"neu","Approved vs budget"):""],
    ["Spent",fB(sp),a?s.pill:fPill("neu","No starting budget"),(sp>tot?"Above total approved by ":"Within total approved · not spent ")+fB(Math.abs(tot-sp)),a?fGauge(sp/a*100,s.cls==="up"?"off":"ok","Spent vs budget"):""]].map(fCard).join("")}</div>`,
   fin:`<h4 class="fgrp">Financials</h4><div class="fstack">`+
    fRoll("$","bs","Financial Summary","Where the funding came from, and what was spent",fB(sp)+" spent",sp>a?"up":"",money+votes+src)+
    fRoll("A","bk","Budget","Start-of-year budget"+(P.length?", by program":""),fB(a),"",(progA||`<p class="note">${fEsc(pn||"")}</p>`)+`<p class="note">${G.how.A}</p>`+src)+
    fRoll("B","by","Additional funding","Added during the year",pscSg(b),"cau",`<p class="note">${G.how.B}</p>`+(progB.length?pscTbl("B · By program, "+Yr.lab,["Program","Amount"],progB):"")+src)+
    fRoll("C","by","Changes and transfers","Moved in, moved out or adjusted",pscSg(c),"cau",`<p class="note">${G.how.C}</p>`+(progC.length?pscTbl("C · By program, "+Yr.lab,["Program","Amount"],progC):"")+src)+
    fRoll("E","bk","Totals","Total approved and spending"+(P.length?" by program":""),fB(tot)+" approved","",progE+src)+`</div>`};
}
function pscMin(id,i){
  const G=pscGet(id), el=document.getElementById(id), L=G.y26||G.y25, m=L.rows[i], k=m.k;
  const m25=G.y26&&G.y25?G.y25.rows.find(r=>r.k===k):null, e=G.y27.rows.find(r=>r.k===k);
  const s=fSpend(m.T[0],m.T[4]);
  const cards=`<div class="dsh-kh">This year is FY 2026–27 (April 1, 2026 – March 31, 2027)<span><b class="fmil">All amounts in millions of dollars ($M).</b> Pick a year on the left to see more.</span></div>
   <div class="dsh-kpis k3">${[
    ["Budget · FY 2026–27",e?fB(e.T[0]):"—",e?fPill("neu",(e.T[0]>=e.T[1]?"+":"−")+fB(Math.abs(e.T[0]-e.T[1]))+" vs FY 2025–26"):fPill("neu","No direct match"),"2026–27 Estimates",""],
    ["Spent · "+L.lab,fB(m.T[4]),m.T[0]?s.pill:fPill("neu","No starting budget"),"Budget was "+fB(m.T[0])+" · total approved "+fB(m.T[3]),m.T[0]?fGauge(m.T[4]/m.T[0]*100,s.cls==="up"?"off":"ok","Spent vs budget"):""],
    ["Total approved · "+L.lab,fB(m.T[3]),fPill(m.T[4]>m.T[3]?"off":"ok",m.T[4]>m.T[3]?"Spent above it by "+fB(m.T[4]-m.T[3]):"Not spent "+fB(m.T[3]-m.T[4])),"Budget plus changes during the year",""]].map(fCard).join("")}</div>`;
  const b1=pscBlock(G,m,L), b0=m25?pscBlock(G,m25,G.y25):null;
  const y27=e?`<p class="fynote">FY 2026–27: April 1, 2026 – March 31, 2027. Spending is reported after the year ends (fall 2027). Click a section to open it.</p>
     <div class="dsh-kpis k3">${[["A · Budget",fB(e.T[0]),fPill("neu","Estimates"),"",fGauge(100,"neu","Budget")],["Change from FY 2025–26",pscSg(e.T[0]-e.T[1]),fPill("watch","vs "+G.y27.prevLab),"",""],["Spent","—",fPill("watch","Not known yet"),"",""]].map(fCard).join("")}</div>
     <h4 class="fgrp">Financials</h4><div class="fstack">${fRoll("A","bk","Budget","Estimates"+(e.P.length||e.P2?", by program":""),fB(e.T[0]),"",
       (e.P.length?pscTbl("A · Budget by program, FY 2026–27",["Program",G.y27.prevLab,"FY 2026–27","Change"],e.P.map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[2],"")}${fCol(r[1],"")}${fCol(r[1]-r[2],"cau")}</tr>`),`<tr class="tot"><th scope="row">Total</th>${fCol(e.T[1],"")}${fCol(e.T[0],"")}${fCol(e.T[0]-e.T[1],"cau")}</tr>`):"")
       +(e.P2?pscTbl("Total expense by program, FY 2026–27 (voted and non-voted)",["Program",G.y27.prevLab,"FY 2026–27","Change"],e.P2.map(r=>`<tr><td>${fEsc(r[0])}</td>${fCol(r[2],"")}${fCol(r[1],"")}${fCol(r[1]-r[2],"cau")}</tr>`),`<tr class="tot"><th scope="row">Total expense</th>${fCol(e.T2[1],"")}${fCol(e.T2[0],"")}${fCol(e.T2[0]-e.T2[1],"cau")}</tr>`):"")
       +(e.votes?pscTbl("Other figures, FY 2026–27",["Item","Amount",G.y27.prevLab],e.votes.map(v=>`<tr><td>${v[0]}</td>${fCol(v[1],"")}${v[2]==null?"<td>—</td>":fCol(v[2],"")}</tr>`)):"")
       +`<p class="note">${G.y27.note}</p><div class="src">Source: ${fA(G.y27.src)}</div>`)}</div>
     <h4 class="fgrp">Goals</h4><p class="note">Performance measures from the ${G.unit1}'s plan are being added to this page.</p>`
    :`<p class="fynote">FY 2026–27: April 1, 2026 – March 31, 2027.</p><p class="note">This ${G.unit1} has no direct match in the 2026–27 Estimates (renamed, merged or reorganized). ${fEsc(G.y27.note)}</p>`;
  const tabs=[["y27","FY 2026–27","Apr 1, 2026 – Mar 31, 2027 · this year"]];
  const panes={y27};
  if(G.y26){ tabs.push(["y26","FY 2025–26","Apr 1, 2025 – Mar 31, 2026 · final results"]); panes.y26=`<p class="fynote">FY 2025–26: April 1, 2025 – March 31, 2026. Results released in fall 2026. Click a section to open it.</p>${b1.cards}${b1.fin}${m.note?`<p class="note">${fEsc(m.note)}</p>`:""}<h4 class="fgrp">Goals</h4><p class="note">Performance measures and results from the ${G.unit1}'s annual report are being added to this page.</p>`; }
  else tabs.push(["y26","FY 2025–26","Apr 1, 2025 – Mar 31, 2026 · not yet published"]), panes.y26=`<p class="note">${fEsc(G.latestNote||"")}</p>`;
  const y25b=G.y26?b0:b1, y25m=G.y26?m25:m;
  tabs.push(["y25","FY 2024–25","Apr 1, 2024 – Mar 31, 2025 · final results"]);
  panes.y25=y25b?`<p class="fynote">FY 2024–25: April 1, 2024 – March 31, 2025. Final results. Click a section to open it.</p>${G.y25.note?`<p class="note">${fEsc(G.y25.note)}</p>`:""}${y25m.n!==m.n?`<p class="note">In FY 2024–25 this was the ${fEsc(y25m.n)}.</p>`:""}${y25b.cards}${y25b.fin}`:`<p class="note">${G.y25?"No FY 2024–25 results for this "+G.unit1+" (it did not exist in its current form).":"FY 2024–25 results for "+G.prov+" are not on this page yet."}</p>`;
  const sel=G.y26?"y26":"y25";
  el.innerHTML=`<button class="chipbtn fback">← All ${L.rows.length} ${G.unit}</button>`+pscHead(G,m.n,`<p class="pagelede">${fEsc(m.n)}: budget and spending for FY 2024–25 to FY 2026–27.</p>`)+cards+`<div class="dsh">
    <nav class="dsh-rail" role="tablist" aria-orientation="vertical" aria-label="Sections"><div class="dsh-rl">Sections</div>${tabs.map(t=>`<button role="tab" id="pst-${t[0]}" aria-controls="psp-${t[0]}" aria-selected="${t[0]===sel}" tabindex="${t[0]===sel?0:-1}" data-k="${t[0]}"><span>${t[1]}</span><small>${t[2]}</small></button>`).join("")}</nav>
    <div class="dsh-main">${tabs.map(t=>`<div role="tabpanel" id="psp-${t[0]}" aria-labelledby="pst-${t[0]}" class="vspane" ${t[0]===sel?"":"hidden"}><h3 class="dsh-ph">${t[1]}<small>${t[2]}</small></h3>${panes[t[0]]}</div>`).join("")}</div></div>`;
  el.querySelector(".fback").onclick=()=>{pscOverview(id); window.scrollTo(0,el.offsetTop-10);};
  const bs=[...el.querySelectorAll(".dsh-rail button")];
  const pick=b=>bs.forEach(x=>{const on=x===b; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; el.querySelector("#psp-"+x.dataset.k).hidden=!on;});
  bs.forEach((b,j)=>{ b.onclick=()=>pick(b); b.onkeydown=ev=>{ const d=(ev.key==="ArrowDown"||ev.key==="ArrowRight")?1:(ev.key==="ArrowUp"||ev.key==="ArrowLeft")?-1:0; if(d){ const n=bs[(j+d+bs.length)%bs.length]; pick(n); n.focus(); ev.preventDefault(); } }; });
}
