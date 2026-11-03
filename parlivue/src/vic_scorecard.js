/* ================= CITY OF VICTORIA · ACCOUNTABILITY SCORECARD 2024–2026 =================
   Every figure below was checked against the City's audited statements (2024 and 2025 Annual Reports),
   the 2025–2029 and 2026–2030 Financial Plans, City web pages, or named news reports. Snapshot Nov 1 2026. */
const VSC_S={
  ar25:["2025 Annual Report (audited statements)","https://www.victoria.ca/media/file/annual-report-2025"],
  ar24:["2024 Annual Report (audited statements)","https://www.victoria.ca/media/file/annual-report-2024"],
  fp26:["2026–2030 Financial Plan","https://www.victoria.ca/media/file/2026-2030-financial-plan"],
  fp25:["2025–2029 Financial Plan","https://www.victoria.ca/media/file/2025-2029-financial-plan"],
  budget:["City Budget page","https://www.victoria.ca/city-government/city-budget"],
  tax25:["2025 Property Tax Info Sheet","https://www.victoria.ca/media/file/2025-property-tax-info-sheet"],
  tc24:["Times Colonist, 2024 budget vote","https://www.timescolonist.com/opinion/victoria-residents-face-793-per-cent-tax-hike-police-budget-passes-8180469"],
  draft26:["Greater Victoria Chamber, Jan 7 2026","https://victoriachamber.ca/government-local/victoria-seeks-feedback-on-huge-10-44-tax-increase/"],
  sp:["2023–2026 Strategic Plan","https://victoria.ca/media/file/strategic-plan-2023-2026"],
  ocp:["OCP Update page","https://engage.victoria.ca/ocpupdate"],
  pool:["Capital Daily, Feb 9 2025","https://capitaldaily.ca/news/taking-the-plunge-victorians-vote-yes-to-a-new-crystal-pool"],
  elec26:["City of Victoria, 2026 preliminary results","https://www.victoria.ca/city-government/news/victoria-election-2026-preliminary-results"],
  buzz:["Victoria Buzz, Oct 17 2026 (preliminary counts)","https://victoriabuzz.com/2026/10/marianne-alto-re-elected-victoria-mayor-as-council-results-bring-new-faces/"],
  elec22:["2022 Declaration of Official Results","https://www.victoria.ca/media/file/declaration-official-results-2022pdf"],
  amal:["Daily Hive, Oct 27 2026","https://dailyhive.com/vancouver/victoria-saanich-october-2026-amalgamation-plebiscite-election-results"],
  ca:["CTV News, Jun 24 2026","https://www.ctvnews.ca/vancouver/vancouver-island/article/province-halts-binding-victoria-saanich-merger-referendum"]
};
const vsM=n=>"$"+(n/1e6).toFixed(2)+"M";
const vsM1=n=>"$"+(n/1e6).toFixed(1)+"M";
const vsSgn=(n,f)=>(n>0?"+":n<0?"−":"")+f(Math.abs(n));
const vsPct=(a,b)=>((a-b)/b*100);
const vsP=(x)=>(x>0?"+":x<0?"−":"")+Math.abs(x).toFixed(1)+"%";

/* Expenses by function (audited). 2024r = 2024 as restated in the 2025 report. */
const VSC_FN=["General government","Protective services","Engineering & transportation","Environmental & public health","Social services & housing","Planning & development","Parks, recreation & facilities","Water utility","Sewer utility"];
const VSC_EXP={
  b25:[36251310,110748000,34353270,11435480,2489850,26563330,43788670,20589600,5167730],
  a25:[37880123,114377965,49132687,13984927,6628272,30376826,51117392,22909296,6860836],
  a24r:[35088935,108004997,45647987,11275293,3547914,27530740,50748545,19875368,7577064],
  b24:[42881150,98871790,31506840,10439410,2276870,25477260,35306230,19368390,4847660],
  a24:[35088935,108004997,45082807,11275293,4113094,26582622,51696663,19875368,7577064],
  a23:[27707915,97724786,40019766,10387184,3272815,22970043,48072553,19444103,5902287]
};
const VSC_TOT={
  rev:{b25:360749030,a25:377811148,b24:339226000,a24:356508636,a23:346308071},
  exp:{b25:291387240,a25:333268324,b24:270975600,a24:309296843,a23:275501453},
  sur:{b25:69361790,a25:44542824,b24:68250400,a24:47211793,a23:70806618},
  cap:{b25:164272000,a25:64167813,b24:153162000,a24:77224466,a23:105205048,a24r:73457247},
  cash:{a25:175830646,a24:121941832,a23:97276196},
  debt:{a25:58853765,a24:43885097,a23:48962799},
  acc:{a25:1068555215,a24:1024012391,a23:976800598},
  amort:{a25:24054331,a24:21701362}, capmaint:{a25:14682090,a24:12927531}
};
const VSC_REV25=[["Taxation",197688460,197787953],["Sale of goods and services",95312010,107701980],["Government transfers",25460230,19499883],["Investment income",8000000,14122897],["Licences and permits",9551850,11716142],["Fines and penalties",10365960,9346522],["Grants in lieu of taxes",8159000,8025574],["Other (rentals, DCCs, misc., actuarial)",6211520,9610197]];

/* Report card: the 2022–2026 Council against its own 2023–2026 Strategic Plan */
const VSC_GRADES={D:["Target met","g-d"],T:["In progress","g-t"],X:["Partly complete","g-x"],B:["Below plan","g-b"],N:["Not reported","g-n"],I:["For context","g-n"]};
const VSC_CARD=[
 {area:"Housing",g:"D",plan:"Enable more market and non-market housing; speed up approvals; plan for growth.",
  ev:["1,477 net-new homes in 2024 against a provincial target of 659.","882 net-new homes from Oct 2024 to Oct 2025; the City reports beating its provincial target for a second year.","New Official Community Plan, Victoria 2050, adopted Oct 2, 2025.","$4.49M received from CMHC's Housing Accelerator Fund in 2025."],
  cav:"Figures are net-new completions as reported by the City.",src:["ar24","ar25","ocp"]},
 {area:"Transportation",g:"T",plan:"Keep expanding the All Ages and Abilities bike network; better walking and transit.",
  ev:["6 km added to the AAA network in 2024 and 5.1 km in 2025.","11 new and 17 upgraded crosswalks in 2024; 17 installed or upgraded in 2025.","Pedestrian head-start signals at 20 more intersections; Blanshard Street South finished June 2025.","About 9.7 km of roads paved in 2024 and nearly 9 km in 2025."],
  cav:"Transit service is delivered by BC Transit.",src:["ar24","ar25"]},
 {area:"Parks, recreation & gathering spaces",g:"X",plan:"Begin major projects: a new Crystal Pool, Centennial Square, Ship Point, a new Central Library, a refreshed Royal Athletic Park.",
  ev:["Voters approved Crystal Pool borrowing of up to $168.9M on Feb 8, 2025 (58.7% yes, 21% turnout). Planning and design continue in 2026, with $12.0M in the 2026 capital budget.","851 Broughton Street secured as an interim recreation centre from late 2026.","Royal Athletic Park renewal carries $8.6M in the 2026 capital budget.","438 trees planted in 2024 and 476 added in 2025."],
  cav:"The 2025 Annual Report says Crystal Pool planning and design continue in 2026. Status of Centennial Square, Ship Point and the Central Library is not covered in the documents used here.",src:["pool","ar25","fp26"]},
 {area:"Community well-being & safety",g:"T",plan:"Develop and implement a community safety plan; support crisis response and neighbourhoods near shelters.",
  ev:["Community Safety and Wellbeing Plan endorsed July 2025: 99 recommendations, 11 priority actions.","$10.35M redirected within the 2025 budget to launch it; rollout continues in 2026.","30 more shelter spaces at Rock Bay Landing.","Fire responded to 12,199 calls in 2024 and 11,767 incidents in 2025."],
  cav:"The City reports that programs continue to roll out in 2026.",src:["ar25","ar24"]},
 {area:"Climate & environment",g:"T",plan:"Cut emissions from buildings, transportation and waste; set and track life-cycle targets.",
  ev:["34 fleet vehicles replaced with EVs in 2024, including the City's first electric fire truck.","About 92% of new fleet vehicles were electric in 2025; 100 EVs in service.","68 public Level 2 chargers (2024) and 14 public fast chargers (2025).","Beyond the Curb recycling pilot: 4,900 users, 11.5 tonnes over 31 weeks."],
  cav:"Community-wide emissions results are not covered in the documents used here.",src:["ar24","ar25"]},
 {area:"Economic health & downtown",g:"T",plan:"Strengthen downtown, support small business, streamline permits, continue governance reform.",
  ev:["$945,000 in OUR DWTN revitalization for a third straight year.","New Urban Clean Team and Victoria Storefront Activation program in 2025.","Victoria–Saanich Citizens' Assembly recommended amalgamation. On Oct 17, 2026 Victoria voted 62% yes; Saanich voted 68% no on the non-binding question."],
  cav:"Business outcomes are not covered in the documents used here.",src:["ar25","ca","amal"]},
 {area:"Truth & reconciliation",g:"N",plan:"Implement the City's 32 Calls to Action and TRC calls for local government.",ev:[],cav:"Progress on these commitments is not covered in the documents used here.",src:["sp"]},
 {area:"Arts, culture, music & sport",g:"N",plan:"Build the Arts and Innovation District; support venues, events and sport.",ev:[],cav:"Progress on these commitments is not covered in the documents used here.",src:["sp"]},
 {area:"Delivering the capital program",g:"B",plan:"Council's own capital plans: $153.2M for 2024 and $164.3M for 2025.",
  ev:["2024: $77.2M of capital assets acquired, 50% of plan.","2025: $64.2M acquired, 39% of plan.","Government transfers were $19.5M against $25.5M planned in 2025."],
  cav:"Capital projects often span several years. The annual reports don't list project-by-project timing.",src:["ar24","ar25"]},
 {area:"Taxes & finances",g:"I",plan:"Fund City services through the annual Financial Plan.",
  ev:["Overall property tax increase: 7.28% in 2026 and 6.99% in 2025 (City figures); 7.93% in 2024 as reported by the Times Colonist.","Police services account for 5.06 of the 7.28 points in 2026 and 3.23 of the 6.99 points in 2025. The police budget is prepared by the Victoria and Esquimalt Police Board.","Annual surplus each year: $47.2M (2024) and $44.5M (2025). Cash and equivalents $175.8M and long-term debt $58.9M at the end of 2025."],
  cav:"Shown for context, not graded.",src:["budget","tax25","tc24","ar25"]}
];

const VSC_TRACK={"Housing": ["1,477 homes vs target 659", "882 homes; target met again", "OCP adopted Oct 2025"], "Transportation": ["6 km AAA; 28 crosswalks", "5.1 km AAA; 17 crosswalks", "No 2026 report yet"], "Parks, recreation & gathering spaces": ["438 trees; pool upgrades", "Pool borrowing approved; 476 trees", "Pool design; $12.0M in 2026 budget"], "Community well-being & safety": ["12,199 fire calls", "Safety plan endorsed July 2025", "Rollout continues in 2026"], "Climate & environment": ["34 fleet EVs; 68 chargers", "~92% of new fleet electric", "No 2026 report yet"], "Economic health & downtown": ["Not in documents used", "Clean Team; storefront program", "Amalgamation vote Oct 17, 2026"], "Truth & reconciliation": ["Not reported", "Not reported", "Not reported"], "Arts, culture, music & sport": ["Not reported", "Not reported", "Not reported"], "Delivering the capital program": ["50% of plan", "39% of plan", "$160.1M capital budget"], "Taxes & finances": ["7.93% tax increase", "6.99% tax increase", "7.28% tax increase"]};
/* Who Victoria elected: 2022 term and Oct 17 2026 result (2026 counts preliminary) */
const VSC_PEOPLE=[
 ["Marianne Alto","Mayor",15090,12627,"Re-elected","44.69% in an 8-way race; Bruce McGuigan 34.30%"],
 ["Stephen Hammond","Councillor",10042,13729,"Re-elected","8th of 8 in 2022, topped the poll in 2026"],
 ["Matt Dell","Councillor",13899,13421,"Re-elected",""],
 ["Jeremy Caradonna","Councillor",14238,13257,"Re-elected","Topped the poll in 2022"],
 ["Marg Gardiner","Councillor",9255,12880,"Re-elected",""],
 ["Dave Thompson","Councillor",12271,12266,"Re-elected","8th, 20 votes ahead of 9th"],
 ["Krista Loughton","Councillor",12683,12246,"Not re-elected","Finished 9th, 20 votes behind 8th"],
 ["Susan Kim","Councillor",14005,null,"Not re-elected","2nd in 2022"],
 ["Chris Coleman","Councillor",10785,null,"Did not run",""],
 ["Jack Sandor","Councillor-elect",null,12951,"New",""],
 ["Melissa Cseszko","Councillor-elect",null,12720,"New",""],
 ["Wendy Bowkett","Councillor-elect",null,12297,"New",""]
];

/* 2026 plan */
const VSC_DEPT26=[
 ["Victoria Police Department","Fiona Wilson, Chief Constable",94989170,"Policing for Victoria and Esquimalt; overseen by the Police Board"],
 ["Engineering & Public Works (incl. water, sewer, stormwater)","William Doyle",80932610,"Streets, traffic, cycling and walking networks, and three utilities; over $2B of assets"],
 ["Corporate (city-wide costs)","",57472780,"Debt, insurance, transfers to reserves and other city-wide items"],
 ["Victoria Fire Department","Daniel Atkinson, Fire Chief",24468330,"24-hour emergency response from three stations"],
 ["Parks & Recreation","Derrick Newman",23875750,"138 parks, about 34,000 trees, recreation and permits"],
 ["Business & Community Relations","Kerri Moore",16033630,"Arts, culture, economic development, neighbourhoods, Victoria Conference Centre"],
 ["Community Safety, Wellbeing & Partnerships","Peter Rantucci",15991980,"Bylaw, the Community Safety and Wellbeing Plan, strategic real estate"],
 ["Finance (incl. Parking Services)","Susanne Thompson, Deputy City Manager & CFO",15252700,"Budgeting, accounting, procurement; parking brings in more than it costs"],
 ["Planning & Development","Karen Hoese",14008920,"Land use, housing, heritage, permits"],
 ["Facilities","Not named",8986220,"City buildings"],
 ["Information Technology","Mike Palmer, CIO",8406980,"Corporate systems"],
 ["Greater Victoria Public Library (City share)","",6859720,"Regional library board"],
 ["People & Culture","Jodi Jensen",5499760,"HR, health and safety"],
 ["Grants","",4360120,"Community and social grants"],
 ["Communications & Engagement","Sheldon Johnson",2891680,"Public communication and engagement"],
 ["Legislative Services","Curt Kingsley, City Clerk",2316750,"Council support, records, elections"],
 ["Legal Services","Stacey Grubb, City Solicitor",1381160,"Legal advice"],
 ["City Manager's Office","Jocelyn Jenkyns, City Manager",1277890,"Runs the administration for Council"],
 ["Council","Mayor and 8 councillors",945240,"Policy, taxes and the Financial Plan"],
 ["One-time items","",8108650,"Non-recurring 2026 spending"]
];
const VSC_CAP26=[["Facilities",36922000],["Transportation",36694000],["Equipment (fleet, IT, parking, fire)",22592000],["Sanitary sewers",19010000],["Stormwater",13179000],["Waterworks",12553000],["Structures",6764000],["Parks",6100000],["Other (police, real estate, VCC, remediation, contingency)",6266000]];
const VSC_PROJ26=[["Vehicle and heavy equipment replacement",12261000],["Crystal Pool replacement",12000000],["Major street rehabilitation",11500000],["Water mains replacement",10040000],["Sanitary system upgrades",9006000],["Storm mains replacement",8667000],["Royal Athletic Park renewal",8618000],["Multi-modal corridor improvements",8411000]];
const VSC_CAPYRS=[["2026",160080000],["2027",125127000],["2028",127481000],["2029",163231000],["2030",125884000]];



/* Data validation: research brief items checked against City documents */
const VSC_CHECK=[
 ["2025 revenue, expenses, surplus, cash and accumulated surplus","Validated","Match the audited 2025 statements."],
 ["2025 expenses by function, plan and actual","Validated","Match Note 18 and the Statement of Operations."],
 ["2025 actual expenses compared with the Financial Plan ($41.88M difference)","Clarification","The figure is correct. The operating budget leaves out amortization ($24.05M) and capital maintenance ($14.68M). Together they explain $38.7M of the difference. 2024 follows the same pattern."],
 ["Reasons for differences by function","Cannot validate","The Annual Report does not give reasons at the function level, so none are shown on this page."],
 ["Crystal Pool site and approval date","Corrected","Voters approved borrowing on Feb 8, 2025 to rebuild at the existing location. Planning began March 2025 (2025 Annual Report)."],
 ["2025 housing, community safety, downtown, cycling, fleet and fire figures","Validated","Confirmed in the 2025 Annual Report."],
 ["2026 budget by department","Updated","Replaced with the department totals in the 2026–2030 Financial Plan, including Police, Engineering & Public Works and Fire."],
 ["Current-year team","Updated","Names added from the City's Oct 17, 2026 preliminary election results."],
 ["2026 operating $394.1M, capital $160.1M, tax increase 7.28% (police 5.06 points)","Validated","Confirmed on the City Budget page and in the Financial Plan."],
 ["Capital budget 2026–2030","Validated","Matches the Financial Plan capital summary."],
 ["2024 analysis","Added","Built from the 2024 Annual Report."],
 ["2024 comparative figures","Note","The 2025 Annual Report restates some 2024 function totals and 2024 capital acquisitions ($77.2M to $73.5M). Totals are unchanged. Each table uses the figures from its own report."]
];
const vsA=k=>VSC_S[k]?`<a href="${VSC_S[k][1]}" target="_blank" rel="noopener">${VSC_S[k][0]}</a>`:"";
const vsSrc=ks=>`<div class="src">Source: ${ks.map(vsA).join(" · ")}</div>`;
const vgrade=g=>`<span class="grade ${VSC_GRADES[g][1]}">${VSC_GRADES[g][0]}</span>`;
/* plan vs actual: spending over plan = red; revenue, surplus or capital under plan = yellow (caution); better than plan = green */
const vplan=(k,p)=>Math.abs(p)<=0.05?"":k==="exp"?(p>0?"up":"dn"):(p<0?"cau":"dn");
const vcls=x=>x>0.05?"up":x<-0.05?"dn":"";

/* Amortization and capital maintenance by function (Segmented Information, Note 19). Neither is in the operating plan. */
const VSC_SEG={
  25:{am:[4284682,3115035,10919761,665179,0,677079,2585631,1132366,674598],cm:[1723950,171837,2891211,2823101,0,33309,3879467,2257194,902021]},
  24:{am:[3740589,2942779,9575286,600320,0,674561,2500539,1064813,602475],cm:[2063800,323537,4294625,974327,0,24552,2863606,610396,1772687]}
};
const vsMs=n=>"$"+(Math.abs(n)/1e6).toFixed(2)+"M";
function vscExplain(y,i,v){
  const s=VSC_SEG[y], am=s.am[i], cm=s.cm[i], acc=am+cm, rest=v-acc;
  if(!acc) return `The Annual Report doesn’t break this difference down.`;
  const parts=`${vsMs(acc)} is amortization${cm?" and capital maintenance":""}, an overage not in the operating budget`;
  if(Math.abs(rest)<0.05*Math.abs(v)||Math.abs(rest)<250000) return `${parts}. That explains the difference.`;
  return rest>0?`${parts}. The other ${vsMs(rest)} isn’t broken down in the Annual Report.`
              :`${parts}. Without them, spending was ${vsMs(rest)} under budget.`;
}
/* Row sparkline: % over (+) or under (−) budget in 2024 and 2025; the table's own year has the larger dot. */
const vsFnSpark=(i,y)=>{const v=[24,25].map(k=>vsPct(VSC_EXP["a"+k][i],VSC_EXP["b"+k][i])),M=Math.max(30,...v.map(Math.abs)),Y=x=>(12-x/M*10).toFixed(1),X=[8,62];
  return `<span class="fspark" title="Over (+) or under (−) budget: 2024 ${vsP(v[0])}, 2025 ${vsP(v[1])}"><svg viewBox="0 0 70 24" aria-hidden="true"><line x1="0" x2="70" y1="12" y2="12"/><polyline points="${X.map((x,j)=>x+","+Y(v[j])).join(" ")}"/>${X.map((x,j)=>`<circle cx="${x}" cy="${Y(v[j])}" r="${j===(y===25?1:0)?3.6:2.4}" class="${v[j]>0?"over":"under"}"/>`).join("")}</svg><span>’24 ${vsP(v[0])} · ’25 ${vsP(v[1])}</span></span>`;};
function vscFnTable(y,cap){
  const b=VSC_EXP["b"+y],a=VSC_EXP["a"+y]; const tb=b.reduce((s,x)=>s+x,0),ta=a.reduce((s,x)=>s+x,0);
  const mx=Math.max(...a.map((x,i)=>Math.abs(x-b[i])));
  return `<div class="sctwrap"><table class="sct fn"><caption>${cap}</caption><thead><tr><th scope="col">Function</th><th scope="col">Plan</th><th scope="col">Actual</th><th scope="col">Variance</th><th scope="col" class="exp">What explains it</th></tr></thead><tbody>
  ${VSC_FN.map((f,i)=>{const v=a[i]-b[i],p=vsPct(a[i],b[i]);return `<tr><th scope="row">${f}</th><td>${vsM(b[i])}</td><td>${vsM(a[i])}</td><td class="vcell ${vcls(p)}">${vsSgn(v,vsM)} <small>${vsP(p)}</small></td><td class="exp">${vscExplain(y,i,v)}</td></tr>`}).join("")}
  <tr class="tot"><th scope="row">Total</th><td>${vsM(tb)}</td><td>${vsM(ta)}</td><td class="${vcls(vsPct(ta,tb))}">${vsSgn(ta-tb,vsM)} <small>${vsP(vsPct(ta,tb))}</small></td><td class="exp">${vscExplain0(y,ta-tb)}</td></tr></tbody></table></div>`;
}
const vscExplain0=(y,gap)=>{const T=VSC_TOT,ex=T.amort["a"+y]+T.capmaint["a"+y];return `Overage not in the operating budget: ${vsMs(ex)} of this (${Math.round(ex/gap*100)}%): amortization ${vsMs(T.amort["a"+y])} and capital maintenance ${vsMs(T.capmaint["a"+y])}.`;};
function vscYoY(prevKey,curKey,cap,ylab){
  const b=VSC_EXP[prevKey],a=VSC_EXP[curKey]; const tb=b.reduce((s,x)=>s+x,0),ta=a.reduce((s,x)=>s+x,0);
  return `<div class="sctwrap"><table class="sct">${cap?`<caption>${cap}</caption>`:""}<thead><tr><th scope="col">Function</th><th scope="col">${ylab[0]}</th><th scope="col">${ylab[1]}</th><th scope="col">Change</th><th scope="col">%</th></tr></thead><tbody>
  ${VSC_FN.map((f,i)=>{const p=vsPct(a[i],b[i]);return `<tr><th scope="row">${f}</th><td>${vsM(b[i])}</td><td>${vsM(a[i])}</td><td>${vsSgn(a[i]-b[i],vsM)}</td><td class="${vcls(p)}">${vsP(p)}</td></tr>`}).join("")}
  <tr class="tot"><th scope="row">Total</th><td>${vsM(tb)}</td><td>${vsM(ta)}</td><td>${vsSgn(ta-tb,vsM)}</td><td class="${vcls(vsPct(ta,tb))}">${vsP(vsPct(ta,tb))}</td></tr></tbody></table></div>`;
}
const VSC_HNOTE={
  25:{rev:"Sale of goods and services +$12.39M and investment income +$6.12M; government transfers −$5.96M.",exp:"Mostly an overage not in the operating budget: amortization ($24.05M) and capital maintenance ($14.68M).",sur:"Result of the revenue and expense lines above.",cap:"Big projects often take several years, so spending lags the plan. The Annual Report doesn’t give project timing."},
  24:{rev:"Revenue by source is in Note 18 of the 2024 Annual Report.",exp:"Mostly an overage not in the operating budget: amortization ($21.70M) and capital maintenance ($12.93M).",sur:"Result of the revenue and expense lines above.",cap:"Big projects often take several years, so spending lags the plan. The Annual Report doesn’t give project timing."}
};
function vscHeadline(y){
  const T=VSC_TOT,b="b"+y,a="a"+y,N=VSC_HNOTE[y];
  const row=(l,k)=>`<tr><th scope="row">${l}</th><td>${vsM(T[k][b])}</td><td>${vsM(T[k][a])}</td><td class="${vplan(k,vsPct(T[k][a],T[k][b]))}">${vsSgn(T[k][a]-T[k][b],vsM)} <small>${vsP(vsPct(T[k][a],T[k][b]))}</small></td><td class="exp">${N[k]}</td></tr>`;
  return `<div class="sctwrap"><table class="sct fn"><caption>20${y} plan vs actual (audited)</caption><thead><tr><th scope="col">Measure</th><th scope="col">Plan</th><th scope="col">Actual</th><th scope="col">Variance</th><th scope="col" class="exp">What explains it</th></tr></thead><tbody>
   ${row("Revenue","rev")}${row("Expenses","exp")}${row("Annual surplus","sur")}${row("Capital assets acquired","cap")}</tbody></table></div>`;
}
const vscWhy=y=>{const T=VSC_TOT,a="a"+y,b="b"+y,gap=T.exp[a]-T.exp[b],ex=T.amort[a]+T.capmaint[a];
  return `<p class="vsp">The City’s budget and its audited year-end results count costs differently. Two costs appear in the results but not in the budget:</p><ul class="vsul"><li><b>Amortization</b> (${vsM(T.amort[a])}). The annual cost of roads, buildings, vehicles and equipment as they are used up over their useful life. It is recorded as an expense, but no cash leaves the City that year.</li><li><b>Capital maintenance</b> (${vsM(T.capmaint[a])}). Maintenance work funded through the capital budget but recorded as an operating expense in the audited results.</li></ul><p class="vsp">Together they explain ${vsM1(ex)}, or ${Math.round(ex/gap*100)}%, of the ${vsM1(gap)} gap between budgeted and actual expenses.</p><div class="src">Notes 18 and 19 of the audited statements.</div>`;};
/* Overage not in the operating budget: costs in the audited results that the operating budget did not include. Tracked year to year. */
function vscOverage(){
  const T=VSC_TOT,yr=[24,25].map(y=>{const g=T.exp["a"+y]-T.exp["b"+y],am=T.amort["a"+y],cm=T.capmaint["a"+y];return {y,g,am,cm,ov:am+cm,rest:g-am-cm};});
  const td=(f)=>yr.map(f).join("");
  return `<p class="vsp">Each year the audited results include costs not in the operating budget. This page tracks them as an <b>overage not in the operating budget</b>, so the 2026 figure can be compared when the City reports it.</p>
  <div class="sctwrap"><table class="sct fn"><thead><tr><th scope="col">Item</th><th scope="col">2024</th><th scope="col">2025</th><th scope="col">2026</th></tr></thead><tbody>
  <tr><th scope="row">Expenses over budget (total)</th>${td(o=>`<td class="up">${vsMs(o.g)}</td>`)}<td class="muted" rowspan="5">Not yet reported. 2026 actuals come with the 2026 Annual Report, published in 2027.</td></tr>
  <tr><th scope="row">Amortization <small>(no cash spent)</small></th>${td(o=>`<td>${vsMs(o.am)}</td>`)}</tr>
  <tr><th scope="row">Capital maintenance <small>(funded by the capital budget)</small></th>${td(o=>`<td>${vsMs(o.cm)}</td>`)}</tr>
  <tr class="tot"><th scope="row">Overage not in the operating budget</th>${td(o=>`<td class="up">${vsMs(o.ov)} <small>${Math.round(o.ov/o.g*100)}% of the total</small></td>`)}</tr>
  <tr><th scope="row">Remaining over budget, not explained in the Annual Report</th>${td(o=>`<td class="up">${vsMs(o.rest)}</td>`)}</tr>
  </tbody></table></div>
  <div class="why"><b>Our reading of 2025.</b> It appears the overage is mostly a difference in how costs are recorded, not new spending. Capital maintenance ($14.68M) was funded through the capital program, then recorded as an operating expense in the audited results. Amortization is not in the operating budget, but the statements’ own budget column estimated it at $16.5M; the actual was $24.05M, so the estimate was $7.6M low. Both reduced the reported surplus rather than requiring new tax money.<span class="muted">Based on Note 18, Note 19 and the Statement of Change in Net Financial Assets, 2025 Annual Report.</span></div>
  <div class="note"><b>What to watch in 2026:</b> whether the overage not in the operating budget keeps growing ($34.6M in 2024, $38.7M in 2025), and whether the unexplained remainder shrinks. The documents used here do not say whether the 2026 budget includes these costs.</div>${vsSrc(["ar24","ar25","fp26"])}`;
}
/* Election results: shown on the City Council page */
function vscElectionHTML(){ return `<section class="nsec elec"><div class="kicker">Election · October 17, 2026</div><h2 class="nh">Election results</h2><p class="vsp">Votes by member, 2022 and 2026. Turnout 41.44%.</p>
      <div class="sctwrap"><table class="sct"><caption>2026 counts are preliminary</caption><thead><tr><th scope="col">Member</th><th scope="col">Role</th><th scope="col">2022 votes</th><th scope="col">2026 votes</th><th scope="col">Result</th><th scope="col">Note</th></tr></thead><tbody>
      ${VSC_PEOPLE.map(p=>`<tr><th scope="row">${p[0]}</th><td>${p[1]}</td><td>${p[2]?p[2].toLocaleString("en-CA"):"—"}</td><td>${p[3]?p[3].toLocaleString("en-CA"):"—"}</td><td><span class="res r-${p[4].toLowerCase().replace(/[^a-z]/g,"")}">${p[4]}</span></td><td class="muted">${p[5]}</td></tr>`).join("")}</tbody></table></div>
      <div class="note">Council decides as a body. The new Council takes office on Nov 5, 2026.</div>
      ${vsSrc(["elec26","buzz","elec22","amal"])}</section>`; }
/* collapsible section */
const vRoll=(title,sub,body,open)=>`<details class="roll" open><summary><span class="rollh"><span class="rollt">${title}</span>${sub?`<span class="rolls">${sub}</span>`:""}</span><span class="rolltog"><span class="t-show">Show</span><span class="t-hide">Hide</span><span class="rollc" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6l4 4 4-4"/></svg></span></span></summary><div class="rollb">${body}</div></details>`;

function renderVicScore(){
  const el=document.getElementById("vicscore"); if(!el||el.dataset.done) return; el.dataset.done="1";
  const T=VSC_TOT, d26=VSC_DEPT26, tot26=394060040;
  const capPct=y=>Math.round(T.cap["a"+y]/T.cap["b"+y]*100);
  const counts=Object.keys(VSC_GRADES).map(g=>[g,VSC_CARD.filter(c=>c.g===g).length]).filter(x=>x[1]);
  const panes={
   card:`<div class="vsstory">
      <p class="vslede"><b>Summary.</b> From the City's 2024 and 2025 Annual Reports: Victoria reported 1,477 net-new homes in 2024 and 882 from October 2024 to October 2025, exceeding its provincial housing targets both years. Council adopted the Victoria 2050 Official Community Plan in October 2025 and endorsed the Community Safety and Wellbeing Plan in July 2025. The All Ages and Abilities cycling network grew by 6 km in 2024 and 5.1 km in 2025. Capital assets acquired were $77.2M in 2024 and $64.2M in 2025, against capital plans of $153.2M and $164.3M. On October 17, 2026, voters re-elected Mayor Alto and five councillors, and elected three new councillors.</p>
      <div class="vskpis">
        <div class="stat"><b>2,359</b><span>Net-new homes, 2024 + 2025</span></div>
        <div class="stat"><b>11.1 km</b><span>AAA bike network added</span></div>
        <div class="stat"><b>${capPct(24)}% · ${capPct(25)}%</b><span>Capital acquired vs plan, 2024 · 2025</span></div>
        <div class="stat"><b>7.28%</b><span>2026 tax increase (police 5.06 pts)</span></div>
      </div></div>
     <section class="vsec"><div class="rollh"><h3 class="rollt">Report card: 2023–2026 Strategic Plan</h3><span class="rolls">${VSC_CARD.length} areas of the Strategic Plan, with the evidence for each</span></div>
      <div class="gkey">${counts.map(([g,n])=>`${vgrade(g)}<span>${n}</span>`).join("")}</div>
       <div class="rclist">${VSC_CARD.map(c=>`<article class="rc2"><header><h4 class="rcname">${c.area}</h4>${vgrade(c.g)}</header>
         <div class="rcb"><p class="rcplan"><span>Strategic Plan</span>${c.plan}</p>${VSC_TRACK[c.area]?`<div class="rctrack">${["2024","2025","Now"].map((y,j)=>`<div><span>${y}</span>${VSC_TRACK[c.area][j]}</div>`).join("")}</div>`:""}
         ${c.ev.length?`<ul>${c.ev.map(e=>`<li>${e}</li>`).join("")}</ul>`:""}
         <p class="rccav">${c.cav}</p>${vsSrc(c.src)}</div></article>`).join("")}</div>
       <div class="note"><b>About the status labels.</b> Each label compares the 2023–2026 Strategic Plan with what the City reports in its Annual Reports and Financial Plans. The Strategic Plan sets few numeric targets, so labels reflect reported progress. "Not reported" means the documents used here don't cover that area.</div></section>`,

   y26:`<div class="vskpis">
       <div class="stat"><b>$394.1M</b><span>2026 operating budget, +8.87%</span></div>
       <div class="stat"><b>$160.1M</b><span>2026 capital budget</span></div>
       <div class="stat"><b>7.28%</b><span>Tax increase: police 5.06 pts, all else 2.22</span></div>
       <div class="stat"><b>+14.2%</b><span>Police budget, $83.2M → $95.0M</span></div></div>
     <p class="vsp">Council adopted the 2026–2030 Financial Plan on May 7, 2026. The Financial Plan lists each department's core services; the "Mandate" column reflects that.</p>
     ${vRoll("Operating budget by department","20 lines · $394.1M",
      `<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Department</th><th scope="col">Head</th><th scope="col">2026 budget</th><th scope="col">Share</th><th scope="col">Mandate</th></tr></thead><tbody>
      ${d26.map(r=>`<tr><th scope="row">${r[0]}</th><td>${r[1]||"—"}</td><td>${vsM(r[2])}</td><td>${(r[2]/tot26*100).toFixed(1)}%</td><td class="muted">${r[3]}</td></tr>`).join("")}
      <tr class="tot"><th scope="row">Total operating</th><td></td><td>${vsM(tot26)}</td><td>100%</td><td></td></tr></tbody></table></div>${vsSrc(["fp26","budget","fp25"])}`,true)}
     ${vRoll("Capital budget 2026","By category and largest projects · $160.1M",
      `<div class="two">
      <div class="sctwrap"><table class="sct"><caption>By category</caption><tbody>${VSC_CAP26.map(r=>`<tr><th scope="row">${r[0]}</th><td>${vsM(r[1])}</td></tr>`).join("")}<tr class="tot"><th scope="row">Total</th><td>$160.08M</td></tr></tbody></table></div>
      <div class="sctwrap"><table class="sct"><caption>Largest projects</caption><tbody>${VSC_PROJ26.map(r=>`<tr><th scope="row">${r[0]}</th><td>${vsM(r[1])}</td></tr>`).join("")}</tbody></table></div></div>${vsSrc(["fp26"])}`,false)}
     ${vRoll("Overage not in the operating budget: what to watch","2024 and 2025 actuals; 2026 not yet reported",vscOverage(),true)}
     ${vRoll("Capital plan 2026–2030","Five-year totals",
      `<div class="sctwrap"><table class="sct"><thead><tr>${VSC_CAPYRS.map(r=>`<th scope="col">${r[0]}</th>`).join("")}</tr></thead><tbody><tr>${VSC_CAPYRS.map(r=>`<td>${vsM1(r[1])}</td>`).join("")}</tr></tbody></table></div>
      <div class="note">For comparison, capital assets acquired were $64.2M in 2025 (2025 Annual Report).</div>${vsSrc(["fp26"])}`,false)}`,

   y25:`<div class="vskpis"><div class="stat"><b>+6.0%</b><span>Revenue vs 2024</span></div><div class="stat"><b>+7.8%</b><span>Expenses vs 2024</span></div><div class="stat"><b>$175.8M</b><span>Cash, up from $121.9M</span></div><div class="stat"><b>6.99%</b><span>2025 tax increase (police 3.23 pts)</span></div></div>
     ${vRoll("Plan vs actual: headline","Revenue, expenses, surplus and capital",vscHeadline(25),true)}
     ${vRoll("Overage not in the operating budget","Tracked 2024 → 2025 → 2026",vscOverage(),true)}
     ${vRoll("Expenses by function","Variance and what explains it",vscFnTable(25,"2025 · plan vs actual"),true)}
     ${vRoll("Revenue by source","Plan vs actual",
      `<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Source</th><th scope="col">Plan</th><th scope="col">Actual</th><th scope="col">Variance</th></tr></thead><tbody>
      ${VSC_REV25.map(r=>`<tr><th scope="row">${r[0]}</th><td>${vsM(r[1])}</td><td>${vsM(r[2])}</td><td class="${vplan("rev",vsPct(r[2],r[1]))}">${vsSgn(r[2]-r[1],vsM)}</td></tr>`).join("")}</tbody></table></div>`,false)}
     ${vRoll("Planned and completed projects","Capital plan $164.3M · acquired $64.2M",
      `<p class="vsp">The 2025 capital plan was $164.3M and capital assets acquired were $64.2M. Projects the City reports as completed in 2025 include Blanshard Street South, 5.1 km of cycling network, 17 crosswalks, 14 public fast chargers and fleet EVs. The City reports Crystal Pool planning and design continuing in 2026.</p>`,false)}
     ${vRoll("What the overage is","Amortization and capital maintenance",vscWhy(25),false)}
     ${vsSrc(["ar25","tax25"])}`,

   y24:`<div class="vskpis"><div class="stat"><b>+2.9%</b><span>Revenue vs 2023</span></div><div class="stat"><b>+12.3%</b><span>Expenses vs 2023</span></div><div class="stat"><b>${capPct(24)}%</b><span>Capital acquired vs plan</span></div><div class="stat"><b>7.93%</b><span>2024 tax increase (Times Colonist)</span></div></div>
     ${vRoll("Plan vs actual: headline","Revenue, expenses, surplus and capital",vscHeadline(24),true)}
     ${vRoll("Overage not in the operating budget","Tracked 2024 → 2025 → 2026",vscOverage(),false)}
     ${vRoll("Expenses by function","Variance and what explains it",vscFnTable(24,"2024 · plan vs actual, as first reported"),true)}
     ${vRoll("Reported results, 2024","And where each stands now",
      `<div class="sctwrap"><table class="sct st3"><thead><tr><th scope="col">Area</th><th scope="col">2024 result</th><th scope="col">2024</th><th scope="col">Latest available</th><th scope="col">Now</th></tr></thead><tbody>
      <tr><th scope="row">Housing</th><td>1,477 net-new homes vs a provincial target of 659; $4.58M from the Housing Reserve Fund toward 387 affordable and supportive units</td><td>${vgrade("D")}</td><td>882 net-new homes Oct 2024–Oct 2025; the City reports beating its target again. <span class="muted">(2025 Annual Report)</span></td><td>${vgrade("D")}</td></tr>
      <tr><th scope="row">Transportation</th><td>6 km of AAA bike network, 11 new and 17 upgraded crosswalks, 9.7 km paved</td><td>${vgrade("T")}</td><td>5.1 km more AAA network, 17 crosswalks, nearly 9 km paved; Blanshard Street South finished June 2025. <span class="muted">(2025 Annual Report)</span></td><td>${vgrade("T")}</td></tr>
      <tr><th scope="row">Fire</th><td>12,199 calls, 3,703 inspections, 10 firefighters hired (largest intake in 15+ years)</td><td>${vgrade("T")}</td><td>11,767 incidents in 2025. Ongoing service; no target set. <span class="muted">(2025 Annual Report)</span></td><td>${vgrade("T")}</td></tr>
      <tr><th scope="row">Climate</th><td>34 fleet EVs including the first electric fire truck; 39 corporate and 68 public Level 2 chargers; 438 trees</td><td>${vgrade("T")}</td><td>About 92% of new fleet vehicles electric in 2025; 14 public fast chargers. <span class="muted">(2025 Annual Report)</span></td><td>${vgrade("T")}</td></tr>
      <tr><th scope="row">Crystal Pool</th><td>Accessibility upgrades to the existing pool; replacement identified as a future priority</td><td>${vgrade("T")}</td><td>Borrowing approved Feb 8, 2025. Planning and design continue in 2026, with $12.0M in the 2026 capital budget. <span class="muted">(2025 Annual Report, 2026 Financial Plan)</span></td><td>${vgrade("T")}</td></tr>
      <tr><th scope="row">Official Community Plan</th><td>In public engagement</td><td>${vgrade("T")}</td><td>Completed: Victoria 2050 adopted Oct 2, 2025. <span class="muted">(City of Victoria)</span></td><td>${vgrade("D")}</td></tr>
      <tr><th scope="row">Capital program</th><td>$77.2M acquired vs $153.2M planned</td><td>${vgrade("B")}</td><td>2025: $64.2M acquired vs $164.3M planned (39%). <span class="muted">(2025 Annual Report)</span></td><td>${vgrade("B")}</td></tr>
      </tbody></table></div><div class="note"><b>Latest available</b> comes from the 2025 Annual Report and the 2026 Financial Plan. The City has not yet published a 2026 progress report, so nothing after those documents is shown.</div>`,false)}
     ${vRoll("What the overage is","Amortization and capital maintenance",vscWhy(24),false)}
     ${vsSrc(["ar24","tc24"])}`,

   yoy:`${vRoll("High-level actuals, 2023–2025","Audited",
      `<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Measure</th><th scope="col">2023</th><th scope="col">2024</th><th scope="col">2025</th><th scope="col">2024 vs 2023</th><th scope="col">2025 vs 2024</th></tr></thead><tbody>
      ${[["Revenue","rev"],["Expenses","exp"],["Annual surplus","sur"],["Capital assets acquired","cap"],["Cash and equivalents","cash"],["Long-term debt","debt"],["Accumulated surplus","acc"]].map(([l,k])=>{const t=T[k],a24=k==="cap"?t.a24r:t.a24;const gd=k==="exp"||k==="debt"?1:-1,c1=vsPct(t.a24,t.a23),c2=vsPct(t.a25,a24);return `<tr><th scope="row">${l}</th><td>${vsM(t.a23)}</td><td>${vsM(t.a24)}</td><td>${vsM(t.a25)}</td><td class="${vcls(gd*c1)}">${vsP(c1)}</td><td class="${vcls(gd*c2)}">${vsP(c2)}</td></tr>`}).join("")}</tbody></table></div>
      <div class="note">Green: change is good for the City’s finances (more revenue, surplus, cash or capital; less spending or debt). Red: the reverse. Capital 2025 vs 2024 uses the restated 2024 figure of $73.46M.</div>
      <p class="vsp">Expenses rose 12.3% in 2024 and 7.8% in 2025; revenue rose 2.9% and 6.0%. The annual surplus was $70.8M (2023), $47.2M (2024) and $44.5M (2025). Salaries, wages and benefits were $187.8M in 2025, 56% of expenses.</p>`,true)}
     ${vRoll("Expenses by function, 2025 vs 2024","2024 as restated in the 2025 Annual Report",vscYoY("a24r","a25","",["2024","2025"]),false)}
     ${vRoll("Expenses by function, 2024 vs 2023","2024 Annual Report",vscYoY("a23","a24","",["2023","2024"]),false)}
     ${vsSrc(["ar25","ar24"])}`,
   check:`<div class="sctwrap"><table class="sct"><thead><tr><th scope="col">Item</th><th scope="col">Status</th><th scope="col">What the City documents show</th></tr></thead><tbody>
      ${VSC_CHECK.map(r=>`<tr><th scope="row">${r[0]}</th><td><span class="vd v-${r[1].toLowerCase().replace(/[^a-z]/g,"")}">${r[1]}</span></td><td>${r[2]}</td></tr>`).join("")}</tbody></table></div>
     ${vsSrc(["ar25","ar24","fp26","budget","elec26"])}`
  };


  const tabs=[["card","Report card","Strategic Plan progress"],["y26","2026 plan","Budget by department"],["y25","2025 results","Plan vs actual"],["y24","2024 results","Plan vs actual"],["yoy","Year over year","2023–2025 actuals"],["check","Data validation","Sources checked"]];
  const met=VSC_CARD.filter(c=>c.g==="D").length;
  const vpill=(cls,txt)=>`<span class="dpill ${cls}">${txt}</span>`;
  const pf=x=>{const t=x.toFixed(1);return t.endsWith(".0")?t.slice(0,-2):t;};
  /* Half-circle gauge: actual as % of plan. Over 100% the arc fills and an outer tick marks the overrun. */
  const gauge=(pct,cls,lab)=>{const r=34,L=Math.PI*r,f=Math.min(pct,100)/100;return `<span class="dgauge ${cls}" role="img" aria-label="${lab}: ${pf(pct)}%"><svg viewBox="0 0 84 46"><path d="M8 42a34 34 0 0 1 68 0" class="gt"/><path d="M8 42a34 34 0 0 1 68 0" class="gf" stroke-dasharray="${(f*L).toFixed(1)} ${L.toFixed(1)}"/>${pct>100?`<path d="M8 42a34 34 0 0 1 68 0" class="go" stroke-dasharray="0 ${(L*0.985).toFixed(1)} ${(L*0.015).toFixed(1)}"/>`:""}</svg><b>${pf(pct)}%</b></span>`;};
  /* Variance sparkline: % variance from plan, 2024 and 2025 (the two audited plan years). */
  const vspark=(k,good)=>{const v=[24,25].map(y=>vsPct(T[k]["a"+y],T[k]["b"+y])),mx=Math.max(...v.map(Math.abs),1),Y=x=>14-x/mx*11,X=[6,84];
    const c=v.map(x=>(x>0)===good?"ok":"bad");
    return `<span class="dvar"><svg viewBox="0 0 90 28" aria-hidden="true"><line x1="0" x2="90" y1="14" y2="14" class="z"/><polyline points="${X.map((x,i)=>x+","+Y(v[i]).toFixed(1)).join(" ")}"/>${X.map((x,i)=>`<circle cx="${x}" cy="${Y(v[i]).toFixed(1)}" r="3" class="${c[i]}"/>`).join("")}</svg><span class="dk-y">Variance ’24 ${vsP(v[0])} · ’25 ${vsP(v[1])}</span></span>`;};
  const vsPlan=(k,y,good)=>{const a=T[k]["a"+y],b=T[k]["b"+y],pc=vsPct(a,b),up=pc>0;return vpill((up===good)?"ok":(k==="exp"?"off":"watch"),(k==="exp"&&up?"Over budget ":(up?"Above":"Below")+" plan ")+vsP(pc));};
  const gp=(k,good,lab)=>{const pc=T[k].a25/T[k].b25*100;return gauge(pc,((pc>100)===good)?"ok":(k==="exp"?"off":"watch"),lab);};
  const kp=[
    ["y25","Revenue · 2025",vsM1(T.rev.a25),vsPlan("rev",25,true),"Plan "+vsM1(T.rev.b25),gp("rev",true,"Revenue received vs plan")],
    ["y25","Expenses · 2025",vsM1(T.exp.a25),vsPlan("exp",25,false),"Plan "+vsM1(T.exp.b25)+" · $"+((T.amort.a25+T.capmaint.a25)/1e6).toFixed(1)+"M is an overage not in the operating budget",gp("exp",false,"Expenses vs plan")],
    ["y25","Annual surplus · 2025",vsM1(T.sur.a25),vsPlan("sur",25,true),"Plan "+vsM1(T.sur.b25),gp("sur",true,"Surplus vs plan")],
    ["y25","Capital acquired · 2025",vsM1(T.cap.a25),vpill("watch",capPct(25)+"% of plan"),"Plan "+vsM1(T.cap.b25),gp("cap",true,"Capital spent vs plan")],
    ["y26","Operating budget · 2026",vsM1(tot26),vpill("neu","+8.87%"),"Capital budget $160.1M",`<span class="dnone">No 2026 actuals yet. A gauge appears once the City reports 2026 results.</span>`],
    ["card","Strategic Plan · 2023–2026",VSC_CARD.length+" areas",vpill("neu",met+" target met"),counts.map(([g,n])=>n+" "+VSC_GRADES[g][0].toLowerCase()).join(" · "),`<span class="dgrades">${counts.map(([g,n])=>`<i class="${VSC_GRADES[g][1]}" style="flex:${n}" title="${VSC_GRADES[g][0]}: ${n}"></i>`).join("")}</span>`]
  ];
  el.innerHTML=`<header class="dsh-head"><div><div class="kicker">City of Victoria · Department dashboard</div><h2 class="nh">Council Scorecard 2024–2026</h2>
     <p class="pagelede">Plans, budgets and results from the City's audited statements, with progress on the 2023–2026 Strategic Plan.</p></div>
     <div class="dsh-asof">Data as of Nov 1, 2026 · audited 2024 and 2025, adopted 2026 plan</div></header>
    <div class="dkey"><span><i class="ok"></i>Good: on or better than plan</span><span><i class="watch"></i>Caution: behind plan</span><span><i class="off"></i>Over budget</span><span class="muted">Gauge: actual as % of plan</span></div>
    <div class="dtiming"><b>About timing.</b> The City’s financial year runs January to December. Actual results are published once a year, in the audited Annual Report released the following year. Until then, figures for the current year are budgets, not results. This page uses documents available on Nov 1, 2026: audited results for 2024 and 2025 and the adopted 2026 budget.</div>
    <div class="dsh-kpis" aria-label="Key figures">${kp.map(k=>`<button class="dkpi" data-go="${k[0]}"><span class="dk-l">${k[1]}</span><b class="dk-v">${k[2]}</b><span class="dk-p">${k[3]}</span><span class="dk-s">${k[4]}</span>${k[5]}</button>`).join("")}</div>
    <div class="dsh">
    <nav class="dsh-rail" role="tablist" aria-orientation="vertical" aria-label="Scorecard sections"><div class="dsh-rl">Sections</div>${tabs.map((t,i)=>`<button role="tab" id="vst-${t[0]}" aria-controls="vsp-${t[0]}" aria-selected="${i?"false":"true"}" tabindex="${i?-1:0}" data-k="${t[0]}"><span>${t[1]}</span><small>${t[2]}</small></button>`).join("")}</nav>
    <div class="dsh-main">${tabs.map((t,i)=>`<div role="tabpanel" id="vsp-${t[0]}" aria-labelledby="vst-${t[0]}" class="vspane" ${i?"hidden":""}><h3 class="dsh-ph">${t[1]}<small>${t[2]}</small></h3>${panes[t[0]]}</div>`).join("")}</div></div>`;
  const bs=[...el.querySelectorAll(".dsh-rail button")];
  const pick=b=>{ bs.forEach(x=>{const on=x===b; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; document.getElementById("vsp-"+x.dataset.k).hidden=!on;}); };
  el._pick=k=>pick(bs.find(b=>b.dataset.k===k));
  el.querySelectorAll(".dkpi").forEach(k=>k.onclick=()=>{el._pick(k.dataset.go); el.querySelector(".dsh").scrollIntoView({behavior:"smooth",block:"start"});});
  bs.forEach((b,i)=>{ b.onclick=()=>pick(b); b.onkeydown=e=>{ const d=(e.key==="ArrowDown"||e.key==="ArrowRight")?1:(e.key==="ArrowUp"||e.key==="ArrowLeft")?-1:0; if(d){ const n=bs[(i+d+bs.length)%bs.length]; pick(n); n.focus(); e.preventDefault(); } }; });
}
