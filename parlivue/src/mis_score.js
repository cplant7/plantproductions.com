/* ================= CITY OF MISSISSAUGA · SCORECARD (same dashboard template as Victoria) =================
   All financial figures from the City's audited consolidated statements, in $000s as printed (converted to dollars below).
   Budget column = Note 20 "Budget Data" (the adopted budget restated to the accrual basis; it already includes amortization). */
const MSC_S={
  c25:["City of Mississauga: 2025 Consolidated Financial Statements","https://www.mississauga.ca/wp-content/uploads/2026/05/13210652/City-Consolidated_2025.pdf"],
  c24:["City of Mississauga: 2024 Consolidated Financial Statements","https://www.mississauga.ca/wp-content/uploads/2026/05/13210650/City-Consolidated_2024.pdf"],
  hl25:["City of Mississauga: 2025 Financial Report Highlights","https://www.mississauga.ca/wp-content/uploads/2026/05/21150948/financial-report-highlights-2025.pdf"],
  fs24:["City of Mississauga: 2024 Financial and Sustainability Report","https://www.mississauga.ca/wp-content/uploads/2025/06/09093313/2024-Financial-and-Sustainability-Report.pdf"],
  b26:["City of Mississauga: 2026 Budget","https://www.mississauga.ca/wp-content/uploads/2026/02/02134128/2026-budget.pdf"],
  nr26:["City of Mississauga: 2026 Budget adopted, January 28 2026","https://www.mississauga.ca/city-of-mississauga-news/news/mississaugas-2026-budget-adopted/"],
  tgt:["City of Mississauga: Growth forecasts and housing target","https://www.mississauga.ca/services-and-programs/planning-and-development/guide-to-city-planning-and-development/guiding-city-growth/growth-forecasts-and-housing-target/"]
};
const mK=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,v*1000]));
const MSC_TOT={
  rev:mK({b25:1451416,a25:1698201,b24:1297320,a24:1974204,a23:1389843}),
  exp:mK({b25:1189440,a25:1273523,b24:1064979,a24:1143201,a23:1082735}),
  sur:mK({b25:261976,a25:424678,b24:232341,a24:831003,a23:307108}),
  contrib:mK({a25:33956,a24:584165,a23:60379}),
  amort:mK({b25:182004,a25:184894,b24:157370,a24:169006}),
  capb:mK({b25:609250,b24:531309}), capa:mK({a25:576869,a24:926084}),
  cash:mK({a25:226681,a24:272070,a23:273785}),
  debt:mK({a25:365538,a24:260745,a23:208040}),
  acc:mK({a25:11109788,a24:10685110,a23:9854107})
};
/* Tax-levy (budget-basis) result reported by the City, and how it was handled */
const MSC_LEVY={
  25:{v:-5.4e6,why:"More winter weather events, lower transit ridership, higher labour costs and ongoing losses in Payment in Lieu of Taxes.",fix:"Covered by a $5.4M transfer from the Fiscal Stability Reserve.",src:"hl25"},
  24:{v:3.1e6,why:"Mainly higher-than-expected transit ridership, partly offset by ongoing losses in airport (GTAA) Payment in Lieu of Taxes.",fix:"The report pages read here do not say which reserve received the surplus.",src:"fs24"}
};
const MSC_FN=["General government","Protection services","Transportation services","Environmental services","Health services","Social and family services","Recreation and cultural services","Planning and development"];
const MSC_EXP={
  b25:[208086,188827,438736,37171,965,418,266276,48961].map(x=>x*1000),
  a25:[246945,196115,495967,32231,932,407,246665,54261].map(x=>x*1000),
  b24:[197666,175461,407338,22435,927,805,215578,44769].map(x=>x*1000),
  a24:[226940,170811,442770,26249,910,377,225750,49394].map(x=>x*1000),
  a23:[202606,164383,421694,24983,833,359,219601,48276].map(x=>x*1000)
};
/* Note 21: expenses by object, 2025 budget vs actual */
const MSC_OBJ25=[["Salaries, wages and employee benefits",706008,745259],["Contracted services",93684,144581],["Materials and supplies",80884,78415],["Rents and financial expenses",99044,93421],["External transfers to others",18620,14755],["Long-term debt interest and fees",9196,9781],["Amortization of tangible capital assets",182004,184894]].map(r=>[r[0],r[1]*1000,r[2]*1000]);
const MSC_REV25=[["Property taxes",750191,755065],["Payment in lieu of taxes",37787,36035],["Municipal Accommodation Tax",20000,23854],["User charges",308840,301200],["Recoveries from third parties",83569,132097],["Funding transfers from other governments",1875,6845],["Obligatory reserve fund revenue applied",174427,237490],["Investment income",29317,45284],["Penalties and interest on taxes",12610,25512],["Contributed and assumed tangible capital assets",0,33956],["Other",913,42158],["City's share of net income in Enersource",31887,58705]].map(r=>[r[0],r[1]*1000,r[2]*1000]);
const MSC_CARD=[
 {area:"Housing",g:"N",plan:"The Province's housing target for Mississauga: 120,000 new units.",
  ev:["4,725 building permits issued in 2024, with a construction value of over $2.6 billion.","4,772 building permits issued in 2025, with a construction value of over $2.2 billion.","Council approved Mayor's Housing Task Force actions in 2025, including reducing or eliminating development charges."],
  cav:"Permits are not completed homes. The City's housing target page does not report progress against the 120,000 target.",src:["tgt","fs24","hl25"],
  tr:["4,725 permits","4,772 permits","Progress vs target not reported"]},
 {area:"Roads, sidewalks & bridges (Move)",g:"T",plan:"Maintain City infrastructure in a state of good repair.",
  ev:["22.8 km of streets resurfaced and 5.3 km of new sidewalk in 2024.","29.5 km resurfaced, 3.8 km of new sidewalk and three bridges rehabilitated in 2025.","Goreway Drive overpass over the CN Rail corridor opened in 2025."],
  cav:"Infrastructure replacement value is $18.7 billion; the documents used do not give an infrastructure gap.",src:["fs24","hl25","b26"],
  tr:["22.8 km resurfaced","29.5 km resurfaced","Roads $117.9M capital, 2026"]},
 {area:"Transit (Move)",g:"X",plan:"Grow MiWay service and ridership.",
  ev:["2024: higher-than-expected ridership drove the tax-levy surplus.","2025: lower ridership contributed to the tax-levy deficit.","Seniors' (65+) ridership up 21% after free rides became permanent."],
  cav:"Total MiWay ridership figures are not in the documents used here.",src:["fs24","hl25","b26"],
  tr:["Ridership above forecast","Ridership below forecast","Transit $130.3M net, 2026"]},
 {area:"Community safety (Belong)",g:"T",plan:"Deliver fire, emergency and by-law services.",
  ev:["More than 17,000 fire safety inspections in 2025.","Fire & Emergency Services is the largest 2026 service budget: $182.8M net (23.2%).","The 2026 budget adds by-law enforcement officers."],
  cav:"Response-time results are not in the documents used here.",src:["hl25","b26","nr26"],
  tr:["Not in documents used","17,000+ fire inspections","Fire $182.8M net, 2026"]},
 {area:"Climate & environment (Green)",g:"T",plan:"Climate Change Action Plan (2019): become one of Canada's first net-zero cities.",
  ev:["Phase 2 of the hydrogen fuel cell electric bus pilot completed in 2024.","First electric-powered fire pumper added in 2025; fleet electrification cut 81.9 tonnes of CO₂.","Tree Cities of the World designation for the sixth year in a row."],
  cav:"Community-wide emissions totals are not reported in the documents used here.",src:["fs24","hl25"],
  tr:["Hydrogen bus pilot, phase 2","81.9 t CO₂ cut by fleet","No emissions total reported"]},
 {area:"Taxes & finances",g:"I",plan:"Fund City services through the annual budget.",
  ev:["Tax-funded services: $3.1M surplus in 2024; $5.4M deficit in 2025, covered from the Fiscal Stability Reserve.","AAA credit rating from S&P Global for the 22nd consecutive year (2025).","Long-term debt $365.5M at the end of 2025, up from $260.7M; $144.2M new debt issued in 2025."],
  cav:"Shown for context, not graded.",src:["fs24","hl25","c25"],
  tr:["$3.1M levy surplus","$5.4M levy deficit, reserve covered","2026 levy +4.39%; 2027 forecast +15.12%"]}
];
const MSC_CHECK=[
 ["Budget column in the statements","Correct","Note 20 restates the adopted budget to the accrual basis and adds amortization ($181.9M in 2025). Unlike Victoria, there is no overage from costs left out of the budget."],
 ["2024 annual surplus of $831.0M","Clarification","Includes $584.2M of contributed and assumed tangible capital assets: assets transferred to the City, recorded as revenue but not cash."],
 ["Capital acquired vs approved capital budget","Cannot validate","The approved capital budget funds multi-year projects, and acquisitions can include transferred assets. The two are not compared as a percentage here."],
 ["Tax-levy result 2025 (−$5.4M)","Correct","2025 Financial Report Highlights: deficit offset by a $5.4M transfer from the Fiscal Stability Reserve."],
 ["Housing target progress","Cannot validate","The City's target page gives the 120,000 target but no progress figures."]
];

function renderMisScore(){
  const el=document.getElementById("misscore"); if(!el||el.dataset.done) return; el.dataset.done="1";
  const T=MSC_TOT, A=k=>MSC_S[k]?`<a href="${MSC_S[k][1]}" target="_blank" rel="noopener">${MSC_S[k][0]}</a>`:"";
  const src=ks=>`<div class="src">Source: ${ks.map(A).join(" · ")}</div>`;
  const pf=x=>{const t=x.toFixed(1);return t.endsWith(".0")?t.slice(0,-2):t;};
  const vpill=(c,t)=>`<span class="dpill ${c}">${t}</span>`;
  const gauge=(pct,cls,lab)=>{const r=34,L=Math.PI*r,f=Math.min(pct,100)/100;return `<span class="dgauge ${cls}" role="img" aria-label="${lab}: ${pf(pct)}%"><svg viewBox="0 0 84 46"><path d="M8 42a34 34 0 0 1 68 0" class="gt"/><path d="M8 42a34 34 0 0 1 68 0" class="gf" stroke-dasharray="${(f*L).toFixed(1)} ${L.toFixed(1)}"/>${pct>100?`<path d="M8 42a34 34 0 0 1 68 0" class="go" stroke-dasharray="0 ${(L*0.985).toFixed(1)} ${(L*0.015).toFixed(1)}"/>`:""}</svg><b>${pf(pct)}%</b></span>`;};
  const plan=(k,y,good)=>{const pc=vsPct(T[k]["a"+y],T[k]["b"+y]),up=pc>0;return vpill(up===good?"ok":(k==="exp"?"off":"watch"),(k==="exp"&&up?"Over budget ":(up?"Above":"Below")+" plan ")+vsP(pc));};
  const gp=(k,good,lab,y)=>{const pc=T[k]["a"+y]/T[k]["b"+y]*100;return gauge(pc,((pc>100)===good)?"ok":(k==="exp"?"off":"watch"),lab);};
  const card=k=>`<div class="dkpi"><span class="dk-l">${k[0]}</span><b class="dk-v">${k[1]}</b><span class="dk-p">${k[2]}</span><span class="dk-s">${k[3]}</span>${k[4]||""}</div>`;
  const levy=y=>{const L=MSC_LEVY[y];return [`Tax-funded services · 20${y}`,(L.v<0?"−":"+")+vsM1(Math.abs(L.v)),vpill(L.v<0?"off":"ok",L.v<0?"Deficit":"Surplus"),L.v<0?L.fix:"Budget-basis result for services paid by the tax levy",""];};
  const yearCards=y=>`<div class="dsh-kpis k5" aria-label="20${y} actual vs plan">${[
    ["Revenue · 20"+y,vsM1(T.rev["a"+y]),plan("rev",y,true),"Plan "+vsM1(T.rev["b"+y])+(T.contrib["a"+y]>1e8?" · includes "+vsM1(T.contrib["a"+y])+" of transferred assets (non-cash)":""),gp("rev",true,"Revenue vs plan",y)],
    ["Expenses · 20"+y,vsM1(T.exp["a"+y]),plan("exp",y,false),"Plan "+vsM1(T.exp["b"+y]),gp("exp",false,"Expenses vs plan",y)],
    ["Annual surplus · 20"+y,vsM1(T.sur["a"+y]),plan("sur",y,true),"Plan "+vsM1(T.sur["b"+y])+(T.contrib["a"+y]>1e8?" · includes "+vsM1(T.contrib["a"+y])+" of transferred assets":"")+" · accrual surplus; the budget balances it with transfers to reserves and capital (Note 20)",gp("sur",true,"Surplus vs plan",y)],
    ["Capital assets acquired · 20"+y,vsM1(T.capa["a"+y]),vpill("neu","Approved "+vsM1(T.capb["b"+y])),"Approved capital funds multi-year projects, so no % is shown",""],
    levy(y)].map(card).join("")}</div>`;
  const kp26=`<div class="dsh-kpis k5" aria-label="2026 budget">${[
    ["Gross operating budget · 2026","$1,405.6M",vpill("neu","Net tax levy $789.4M"),"Adopted January 28, 2026",""],
    ["Capital budget · 2026","$545.1M",vpill("neu","10-year plan $5.77B"),"2026–2035 gross capital plan",""],
    ["Tax levy increase · 2026","4.39%",vpill("neu","Residential bill +1.61%"),"City share of the total bill; Region of Peel is separate",""],
    ["Largest service · 2026","$182.8M",vpill("neu","Fire & Emergency, 23.2%"),"Transit $130.3M · Roads $110.7M net",""],
    ["Report card",MSC_CARD.length+" areas",vpill("neu",MSC_CARD.filter(c=>c.g==="T").length+" in progress"),"Pillars: move, belong, connect, prosper, green",""]
  ].map(card).join("")}</div>`;
  const levyBox=y=>{const L=MSC_LEVY[y];return `<div class="why"><b>Budget basis, tax-funded services: ${L.v<0?"deficit":"surplus"} of ${vsM1(Math.abs(L.v))}.</b> ${L.why} ${L.fix}<span class="muted">Source: ${MSC_S[L.src][0]}.</span></div>`;};
  const fnTable=(y,cap)=>{const b=MSC_EXP["b"+y],a=MSC_EXP["a"+y],tb=b.reduce((s,x)=>s+x,0),ta=a.reduce((s,x)=>s+x,0);
    const row=(f,bb,aa,cls)=>{const v=aa-bb,p=vsPct(aa,bb);return `<tr${cls?` class="${cls}"`:""}><th scope="row">${f}</th><td>${vsM(bb)}</td><td>${vsM(aa)}</td><td class="vcell ${vplan("exp",p)}">${vsSgn(v,vsM)} <small>${vsP(p)}</small></td></tr>`;};
    return `<div class="sctwrap"><table class="sct"><caption>${cap}</caption><thead><tr><th scope="col">Function</th><th scope="col">Plan</th><th scope="col">Actual</th><th scope="col">Variance</th></tr></thead><tbody>${MSC_FN.map((f,i)=>row(f,b[i],a[i])).join("")}${row("Total",tb,ta,"tot")}</tbody></table></div>`;};
  const pv=(rows,k,cap,head)=>`<div class="sctwrap"><table class="sct"><caption>${cap}</caption><thead><tr><th scope="col">${head}</th><th scope="col">Plan</th><th scope="col">Actual</th><th scope="col">Variance</th></tr></thead><tbody>${rows.map(r=>{const p=r[1]?vsPct(r[2],r[1]):0;return `<tr><th scope="row">${r[0]}</th><td>${r[1]?vsM(r[1]):"—"}</td><td>${vsM(r[2])}</td><td class="vcell ${r[1]?vplan(k,p):""}">${vsSgn(r[2]-r[1],vsM)}${r[1]?` <small>${vsP(p)}</small>`:""}</td></tr>`}).join("")}</tbody></table></div>`;
  const head=y=>{const r=(l,k,ck=k)=>{const p=vsPct(T[k]["a"+y],T[k]["b"+y]);return `<tr><th scope="row">${l}</th><td>${vsM(T[k]["b"+y])}</td><td>${vsM(T[k]["a"+y])}</td><td class="vcell ${vplan(ck,p)}">${vsSgn(T[k]["a"+y]-T[k]["b"+y],vsM)} <small>${vsP(p)}</small></td></tr>`;};
    return `<div class="sctwrap"><table class="sct"><caption>20${y} plan vs actual (audited)</caption><thead><tr><th scope="col">Measure</th><th scope="col">Plan</th><th scope="col">Actual</th><th scope="col">Variance</th></tr></thead><tbody>${r("Revenue","rev")}${r("Expenses","exp")}${r("Annual surplus","sur")}${r("Amortization (included in expenses)","amort","exp")}</tbody></table></div>`;};
  const counts=Object.keys(VSC_GRADES).map(g=>[g,MSC_CARD.filter(c=>c.g===g).length]).filter(x=>x[1]);
  const panes={
   card:`<p class="vslede"><b>Summary.</b> From the City's audited statements and financial reports: expenses were over the audited budget by 7.3% in 2024 and 7.1% in 2025. On the budget basis Council votes on, tax-funded services ended 2024 with a $3.1M surplus and 2025 with a $5.4M deficit, which the City covered from its Fiscal Stability Reserve. The 2026 levy rises 4.39%, and the City forecasts 15.12% for 2027.</p>
     <section class="vsec"><div class="rollh"><h3 class="rollt">Goals and evidence</h3><span class="rolls">${MSC_CARD.length} areas, tracked 2024 → 2025 → now</span></div>
      <div class="gkey">${counts.map(([g,n])=>`${vgrade(g)}<span>${n}</span>`).join("")}</div>
      <div class="rclist">${MSC_CARD.map(c=>`<article class="rc2"><header><h4 class="rcname">${c.area}</h4>${vgrade(c.g)}</header><div class="rcb"><p class="rcplan"><span>Goal</span>${c.plan}</p><div class="rctrack">${["2024","2025","Now"].map((y,j)=>`<div><span>${y}</span>${c.tr[j]}</div>`).join("")}</div><ul>${c.ev.map(e=>`<li>${e}</li>`).join("")}</ul><p class="rccav">${c.cav}</p>${src(c.src)}</div></article>`).join("")}</div>
      <div class="note"><b>About the status labels.</b> The City aligns its plans to five pillars (move, belong, connect, prosper, green) and reports results by corporate priority. Few goals carry numeric targets, so labels reflect reported progress. "Not reported" means the documents used here don't measure progress against the goal.</div></section>`,
   y26:`<p class="vsp">Council adopted the 2026 Budget on January 28, 2026. The City's own forecast shows larger levy increases ahead: 15.12% in 2027, 9.07% in 2028 and 6.86% in 2029.</p>
     ${vRoll("Operating budget by service area","13 service areas · $789.4M net tax levy",`<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Service area</th><th scope="col">2026 net budget</th><th scope="col">Share</th></tr></thead><tbody><tr><th scope="row">Fire & Emergency Services</th><td>$182.8M</td><td>23.2%</td></tr><tr><th scope="row">Transit</th><td>$130.3M</td><td>16.5%</td></tr><tr><th scope="row">Roads</th><td>$110.7M</td><td>14.0%</td></tr><tr><th scope="row">Corporate Transactions</th><td>$82.6M</td><td>10.5%</td></tr><tr><th scope="row">General Government</th><td>$65.5M</td><td>8.3%</td></tr><tr><th scope="row">Parks, Forestry & Environment</th><td>$45.0M</td><td>5.7%</td></tr><tr><th scope="row">Information Technology</th><td>$41.2M</td><td>5.2%</td></tr><tr><th scope="row">Recreation & Culture</th><td>$34.0M</td><td>4.3%</td></tr><tr><th scope="row">Mississauga Library</th><td>$32.1M</td><td>4.1%</td></tr><tr><th scope="row">Facilities & Property Management</th><td>$24.7M</td><td>3.1%</td></tr><tr><th scope="row">Planning & Building</th><td>$18.3M</td><td>2.3%</td></tr><tr><th scope="row">Regulatory Services</th><td>$16.6M</td><td>2.1%</td></tr><tr><th scope="row">Mayor & Members of Council</th><td>$5.6M</td><td>0.7%</td></tr><tr class="tot"><th scope="row">Total net operating budget</th><td>$789.4M</td><td>100%</td></tr></tbody></table></div><div class="note">Net budget is the cost paid by the property tax levy, after fees and other revenue; the gross operating budget is $1,405.6M. The Stormwater Program ($51.8M) is funded by a separate charge and is not included.</div>${src(["b26"])}`,true)}
     ${vRoll("Tax levy forecast","City share, as published with the 2026 Budget",`<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Year</th><th scope="col">Levy increase</th><th scope="col">Residential bill impact</th></tr></thead><tbody><tr><th scope="row">2026 (adopted)</th><td>4.39%</td><td>1.61%</td></tr><tr><th scope="row">2027 (forecast)</th><td class="up">15.12%</td><td>5.55%</td></tr><tr><th scope="row">2028 (forecast)</th><td>9.07%</td><td>3.33%</td></tr><tr><th scope="row">2029 (forecast)</th><td>6.86%</td><td>2.52%</td></tr></tbody></table></div>${src(["b26"])}`,true)}`,
   y25:`${yearCards(25)}${levyBox(25)}
     ${vRoll("Plan vs actual: headline","Audited statements, accrual basis",head(25),true)}
     ${vRoll("Expenses by function","Plan vs actual",fnTable(25,"2025 · plan vs actual"),true)}
     ${vRoll("Expenses by type","Where the overspend sits",pv(MSC_OBJ25,"exp","2025 · Note 21","Type")+`<div class="note">Salaries, wages and benefits were $39.3M over budget and contracted services $50.9M over. Recoveries from third parties also came in $48.5M above budget; the statements do not link the two.</div>`,true)}
     ${vRoll("Revenue by source","Plan vs actual",pv(MSC_REV25,"rev","2025","Source"),false)}
     ${src(["c25","hl25"])}`,
   y24:`${yearCards(24)}${levyBox(24)}
     ${vRoll("Plan vs actual: headline","Audited statements, accrual basis",head(24),true)}
     ${vRoll("Expenses by function","Plan vs actual",fnTable(24,"2024 · plan vs actual"),true)}
     <div class="note">The 2024 surplus of $831.0M includes $584.2M of contributed and assumed tangible capital assets, recorded as revenue but not received as cash.</div>
     ${src(["c24","fs24"])}`,
   yoy:`${vRoll("High-level actuals, 2023–2025","Audited",`<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Measure</th><th scope="col">2023</th><th scope="col">2024</th><th scope="col">2025</th><th scope="col">2024 vs 2023</th><th scope="col">2025 vs 2024</th></tr></thead><tbody>
      ${[["Revenue","rev"],["Expenses","exp"],["Annual surplus","sur"],["Cash","cash"],["Long-term debt","debt"],["Accumulated surplus","acc"]].map(([l,k])=>{const t=T[k],gd=k==="exp"||k==="debt"?1:-1,c1=vsPct(t.a24,t.a23),c2=vsPct(t.a25,t.a24);return `<tr><th scope="row">${l}</th><td>${vsM(t.a23)}</td><td>${vsM(t.a24)}</td><td>${vsM(t.a25)}</td><td class="${vcls(gd*c1)}">${vsP(c1)}</td><td class="${vcls(gd*c2)}">${vsP(c2)}</td></tr>`}).join("")}</tbody></table></div>
      <div class="note">Green: change is good for the City's finances (more revenue, surplus, cash; less spending or debt). Red: the reverse. Revenue and surplus swing in 2024 because of $584.2M in transferred assets.</div>`,true)}
     ${vRoll("Expenses by function, 2025 vs 2024","Audited",vscYoYM("a24","a25",["2024","2025"]),false)}
     ${src(["c25","c24"])}`,
   check:`<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Item</th><th scope="col">Status</th><th scope="col">What the City documents show</th></tr></thead><tbody>
      ${MSC_CHECK.map(r=>`<tr><th scope="row">${r[0]}</th><td style="text-align:left"><span class="vd v-${r[1].toLowerCase().replace(/[^a-z]/g,"")}">${r[1]}</span></td><td style="text-align:left">${r[2]}</td></tr>`).join("")}</tbody></table></div>${src(["c25","c24","hl25","b26","tgt"])}`
  };
  const tabs=[["card","Report card","Goals and progress"],["y26","2026 plan","Budget and forecast"],["y25","2025 results","Plan vs actual"],["y24","2024 results","Plan vs actual"],["yoy","Year over year","2023–2025 actuals"],["check","Data validation","Sources checked"]];
  el.innerHTML=`<header class="dsh-head"><div><div class="kicker">City of Mississauga · Department dashboard</div><h2 class="nh">Council Scorecard 2024–2026</h2>
     <p class="pagelede">Plans, budgets and results from the City's audited statements and financial reports.</p></div>
     <div class="dsh-asof">Data as of Nov 1, 2026 · audited 2024 and 2025, adopted 2026 budget</div></header>
    <div class="dkey"><span><i class="ok"></i>Good: on or better than plan</span><span><i class="watch"></i>Caution: behind plan</span><span><i class="off"></i>Over budget</span><span class="muted">Gauge: actual as % of plan</span></div>
    <div class="dtiming"><b>About timing.</b> The City's financial year runs January to December. Audited results are published once a year, the following spring. Until then, current-year figures are budgets, not results. This page uses documents available on Nov 1, 2026: audited results for 2024 and 2025 and the adopted 2026 budget.</div>
    <div class="dsh-kh">2026 · current year budget<span>Actual results for each year are in its own section below.</span></div>
    ${kp26}
    <div class="dsh">
    <nav class="dsh-rail" role="tablist" aria-orientation="vertical" aria-label="Scorecard sections"><div class="dsh-rl">Sections</div>${tabs.map((t,i)=>`<button role="tab" id="mst-${t[0]}" aria-controls="msp-${t[0]}" aria-selected="${i?"false":"true"}" tabindex="${i?-1:0}" data-k="${t[0]}"><span>${t[1]}</span><small>${t[2]}</small></button>`).join("")}</nav>
    <div class="dsh-main">${tabs.map((t,i)=>`<div role="tabpanel" id="msp-${t[0]}" aria-labelledby="mst-${t[0]}" class="vspane" ${i?"hidden":""}><h3 class="dsh-ph">${t[1]}<small>${t[2]}</small></h3>${panes[t[0]]}</div>`).join("")}</div></div>`;
  const bs=[...el.querySelectorAll(".dsh-rail button")];
  const pick=b=>bs.forEach(x=>{const on=x===b; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; document.getElementById("msp-"+x.dataset.k).hidden=!on;});
  el._pick=k=>pick(bs.find(b=>b.dataset.k===k));
  bs.forEach((b,i)=>{ b.onclick=()=>pick(b); b.onkeydown=e=>{ const d=(e.key==="ArrowDown"||e.key==="ArrowRight")?1:(e.key==="ArrowUp"||e.key==="ArrowLeft")?-1:0; if(d){ const n=bs[(i+d+bs.length)%bs.length]; pick(n); n.focus(); e.preventDefault(); } }; });
}
function vscYoYM(p,c,yl){const b=MSC_EXP[p],a=MSC_EXP[c],tb=b.reduce((s,x)=>s+x,0),ta=a.reduce((s,x)=>s+x,0);
  return `<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Function</th><th scope="col">${yl[0]}</th><th scope="col">${yl[1]}</th><th scope="col">Change</th></tr></thead><tbody>${MSC_FN.map((f,i)=>{const q=vsPct(a[i],b[i]);return `<tr><th scope="row">${f}</th><td>${vsM(b[i])}</td><td>${vsM(a[i])}</td><td class="vcell ${vcls(q)}">${vsSgn(a[i]-b[i],vsM)} <small>${vsP(q)}</small></td></tr>`}).join("")}<tr class="tot"><th scope="row">Total</th><td>${vsM(tb)}</td><td>${vsM(ta)}</td><td class="vcell ${vcls(vsPct(ta,tb))}">${vsSgn(ta-tb,vsM)} <small>${vsP(vsPct(ta,tb))}</small></td></tr></tbody></table></div>`;}
/* Mississauga: two pages, like Victoria */
function misSwitch(cur){
  const b=(id,t,sub)=>`<button class="vsw ${cur===id?"on":""}" data-go="${id}" ${cur===id?'aria-current="page"':""}><span class="vswk">City of Mississauga</span><b>${t}</b><span class="vsws">${sub}</span></button>`;
  return `<nav class="vswitch" aria-label="City of Mississauga pages">${b("mississauga","City Council","Mayor, councillors, City Manager, commissioners")}${b("misscore","Scorecard","Plans, budgets and results, 2024–2026")}</nav>`;
}
function renderMisScorePage(){
  const el=document.getElementById("ch-misscore"); if(!el||el.dataset.built) return;
  el.innerHTML=misSwitch("misscore")+`<section id="misscore" class="nsec vicscore" aria-label="City of Mississauga accountability scorecard"></section>`;
  el.querySelectorAll(".vswitch [data-go]").forEach(b=>b.onclick=()=>{ if(!b.classList.contains("on")){ show(b.dataset.go); window.scrollTo(0,0); } });
  renderMisScore(); el.dataset.built="1";
}
