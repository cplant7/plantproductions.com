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
    ar25:["Ministry annual reports 2024–25 (Lapse/Encumbrance statements)","https://www.alberta.ca/government-and-ministry-annual-reports"],
    goa:["Government of Alberta Annual Report 2025–26","https://open.alberta.ca/dataset/7714457c-7527-443a-a7db-dd8c1c8ead86/resource/3d001693-e3c4-47ac-824c-604440df2eb0/download/goa-annual-report-2025-2026.pdf"]};
  const VL={E:"Expense vote",C:"Capital investment vote",F:"Financial transactions vote",K:"Contingency allocations"};
  const rows26=ABS.map(([c,n])=>{const l=ABL[c],E=l.E;
    return {k:c,n,T:PSC_T([E[0],E[1],E[2],E[3],E[4]]),P:[],
      votes:["E","C","F","K"].filter(k=>l[k]).map(k=>[VL[k],...PSC_T(l[k])]),
      note:(l.nosupp?"This ministry's report has one Adjustments column and no separate Supplementary Estimate column, so any supplementary funding is included in C. ":"")+(l.note?l.note:"")};});
  const Y25N={ENGM:"The ministry's 2024–25 Lapse/Encumbrance statement shows expense-vote spending above the total approved, as printed.",
    INFR:"Changes and transfers include $410.0 million moved from the capital investment vote to the expense vote, as shown in the ministry's statement.",
    JETR:"In FY 2024–25 Immigration and Multiculturalism was a separate ministry; its results are not included here."};
  const rows25=Object.entries(ABL25).map(([n,l])=>({k:l.k,n,T:PSC_T(l.E),P:[],
      votes:["E","C","F","K"].filter(k=>l[k]).map(k=>[VL[k],...PSC_T(l[k])]),y25note:Y25N[l.k]||""}));
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
    y25:{lab:"FY 2024–25",src:SRC.ar25,rows:rows25,progNote:"Alberta's annual reports show the expense vote by program in a table that is not yet captured here, so this section shows the vote totals.",
      how:{A:"The voted estimate for the year, as approved in the Appropriation Act (Government Estimates, February 2024).",
        B:"Supplementary Estimates approved by the Legislature during the year.",
        C:"Adjustments: amounts carried over from the year before, transfers between votes and Treasury Board approvals. The Contingency ($2 billion, voted under Treasury Board and Finance) was handed out to ministries during the year; those allocations are shown separately, by ministry, as Contingency allocations."},
      note:"FY 2024–25 figures use the ministry structure of that year, from each ministry's 2024–25 annual report. Ministries were reorganized in 2025: the Health ministry and the Seniors, Community and Social Services ministry were split among new ministries, and Immigration and Multiculturalism joined Jobs, Economy and Trade, so some ministries have no FY 2024–25 match."},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 budget",note:"The budget is the ministry's voted expense, the same basis as the FY 2025–26 results. The FY 2025–26 column is the Estimates' comparable figure, restated to the 2026 ministry structure, so it can differ slightly from the FY 2025–26 budget in that year's section. The table by program shows the ministry's total expense (voted and non-voted, including amortization and its agencies), which is larger."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Fiscal summary, whole government",src:SRC.goa,mul:1e6,G:AB_GOV,
      note:"The budget included a $4 billion contingency (in “Other”), which was fully allocated in the third quarter: $2 billion to health, $1.5 billion for agriculture and wildfire disasters and $0.5 billion to other areas. Revenue was above budget mainly from investment income, taxes, resource revenue and business enterprise income. Oil (WTI) averaged US$64.94 per barrel, against US$68.00 in the budget. Net financial debt was $33.6 billion at March 31, 2026."},
    year:{title:"What happened in FY 2025–26",pill:"8 of 25 over budget",cls:"up",src:[SRC.goa,SRC.ar],secs:[
     ["Key events",[
      ["Contingency","Budget 2025 included a $4 billion contingency, fully allocated during the year: $2 billion to health, $1.5 billion for agriculture and wildfire disasters and $0.5 billion to other areas.",""],
      ["Disasters","Disaster and emergency expense was $1.4 billion: $0.6 billion in agriculture disaster support and $0.8 billion for wildfire response.","This was $0.5 billion lower than FY 2024–25, which the Province attributes mainly to lower agricultural insurance indemnities."],
      ["Oil prices","Oil (WTI) averaged US$64.94 per barrel, against US$68.00 budgeted. Resource revenue was still $0.9 billion above budget, at $17.9 billion.","The Province attributes this mainly to a significantly narrower oil price differential, which boosted bitumen royalties."]]],
     ["Met or beat the plan",[
      ["Surplus","The surplus was $2.2 billion, against a budgeted deficit of $5.2 billion.",""],
      ["Revenue","Revenue was $79.8 billion, $5.6 billion above budget, including $2.1 billion more investment income and $1.0 billion more tax revenue.",""],
      ["Expense","Total expense was $77.5 billion, $1.8 billion under budget.",""],
      ["Net debt","Net financial debt was $33.6 billion at March 31, 2026, against $40.7 billion budgeted.",""]]],
     ["Did not meet the plan",[
      ["Health","Health expense was $31.8 billion, $1.3 billion above budget.","The Province cites population growth, physician compensation, collective bargaining settlements and higher costs for new drugs and technology."],
      ["Spending over budget","8 of 25 ministries spent more than their start-of-year expense vote, led by Assisted Living and Social Services (+$539.3 million) and Primary and Preventative Health Services (+$501.0 million). Two spent more than their total approved expense vote: Primary and Preventative Health Services ($503.6 million over) and Agriculture and Irrigation ($10.5 million over).","The Province cites growth in demand for physician services, drugs and supplemental health benefits, and higher Agriculture Financial Services Corporation statutory program commitments."]]]]},
    goals:{map:AB_GOALS,notes:AB_GOAL_NOTES,src:n=>AB_GOAL_URL[n]?[n+" Annual Report 2025–26","https://open.alberta.ca/dataset/"+AB_GOAL_URL[n]+"-annual-report-2025-2026.pdf"]:null,
      sub:"From the ministry's 2025–26 annual report",cap:"Performance measures, FY 2025–26",
      how:"Each ministry's annual report gives results for the performance measures in its business plan, with targets. This page shows the measures with targets: the previous result, the FY 2025–26 target and the FY 2025–26 result, as printed. Performance indicators without targets are left out.",
      note:"Copied from the ministry's annual report. Some measures cover a calendar year or lag a year; the year is shown in brackets. For some measures a lower number is better (for example wait times), so ParliVue does not mark targets met or not met. “—” means the report gave no value.",
      next:"FY 2026–27 targets are in the ministry's 2026–29 business plan. Results come with the 2026–27 annual report (fall 2027). The FY 2025–26 tab shows the latest results.",
      none:"No performance measures with targets in table form were found in this ministry's 2025–26 annual report."},
    srcs:[SRC.ar,SRC.est,SRC.goa]};
}

/* ---------- Saskatchewan ---------- */
function pscSask(){
  const SRC={pa26:["Public Accounts 2025–26, Volume 2: General Revenue Fund Details","https://publications.saskatchewan.ca/#/categories/893"],
    pa25:["Public Accounts 2024–25, Volume 2: General Revenue Fund Details","https://publications.saskatchewan.ca/#/categories/893"],
    v1:["Public Accounts 2025–26, Volume 1: Summary Financial Statements","https://publications.saskatchewan.ca/#/categories/893"],
    est:["2026–27 Saskatchewan Estimates","https://budget.saskatchewan.ca/f/f35e0zkmpjti2xix134z0h4bhmq9fw/2026-27-Estimates-WEB.pdf"],
    nr:["Saskatchewan Releases Year End Financial Results (June 30, 2026)","https://www.saskatchewan.ca/government/news-and-media/2026/june/30/saskatchewan-releases-year-end-financial-results"]};
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
    year:{title:"What happened in FY 2025–26",pill:"13 of 34 over budget",cls:"up",src:[SRC.v1,SRC.pa26,SRC.nr],secs:[
     ["Key events",[
      ["Wildfires","Protection of persons and property expense was $1,499.4 million, against $1,094.8 million budgeted. Community Safety spent $1,170.4 million, against a start-of-year budget of $798.4 million.","The Province attributes the increase to wildfire response and evacuations."],
      ["Health care demand","Health expense was $8,671.6 million, against $8,004.9 million budgeted.","The Province cites demand for services, retroactive pay from bargaining and physician compensation."],
      ["Crop yields","Agriculture expense was $1,241.3 million, against $1,597.6 million budgeted.","The Province attributes this to better crop yields, which lowered crop insurance payouts."]]],
     ["Met or beat the plan",[
      ["Revenue","Revenue was $21,133.5 million, above the $21,056.1 million budgeted.",""],
      ["Within total approved","All 34 ministries and offices stayed within their total approved funding.",""]]],
     ["Did not meet the plan",[
      ["Deficit","The deficit was $947.5 million, against a budgeted surplus of $12.2 million. Expenses were $22,081.0 million, against $21,043.9 million budgeted.",""],
      ["Net debt","Net debt was $17,165 million at March 31, 2026, against $16,815 million budgeted.",""],
      ["Spending over budget","13 of 34 ministries and offices spent more than their start-of-year budget, led by Community Safety (+$372.0 million) and Health (+$312.6 million). The Saskatchewan Residential Fuel Charge line also spent $194.5 million, with no start-of-year budget.",""]]]]},
    goals:{map:SK_GOALS,src:n=>SK_GOAL_FMT[n]?[(/^(Innovation Saskatchewan|Tourism Saskatchewan|Water Security Agency|SaskBuilds Corporation|Public Service Commission|Firearms Secretariat)$/.test(n)?n:"Ministry of "+n)+" Annual Report 2025–26","https://publications.saskatchewan.ca/api/v1/products/129306/formats/"+SK_GOAL_FMT[n]+"/download"]:null,
      sub:"From the 2025–26 annual report",cap:"Performance measures with targets, FY 2025–26",
      how:"Each ministry's annual report gives results for the performance measures in its business plan. This page shows the measures that state a target: the target and the FY 2025–26 result, as printed, with the previous result where the report gives it.",
      note:"Taken from the annual report, which reports most measures in sentences rather than tables. Some measures cover a calendar year or longer-term targets (for example 2030). For some measures a lower number is better, so ParliVue does not mark targets met or not met. “—” means the report gave no value.",
      next:"FY 2026–27 targets are in the 2026–27 business plan. Results come with the 2026–27 annual report (summer 2027). The FY 2025–26 tab shows the latest results.",
      none:"This annual report gives results without numeric targets, or this office does not publish an annual report with performance measures, so none are shown here."},
    srcs:[SRC.pa26,SRC.pa25,SRC.est,SRC.v1,SRC.nr]};
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
    y25:{lab:"FY 2024–25",src:SRC.r25,rows:conv(MBP25).map(r=>r.n==="Families"||/^FAMILIES$/i.test(r.n)?{...r,y25note:"Manitoba's report shows $755.7 million spent in Administration and Finance against $5.7 million authorized. The Department's 2024/25 Annual Report attributes $750.1 million of other expenditures in Financial and Administrative Services (authority: $0.2 million) \u201cprimarily\u201d to \u201ca one-time year-end adjustment.\u201d"}:r),note:"FY 2024–25 includes a one-time Tobacco Settlement expense of $425 million with no appropriation."},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Estimates",note:"Part A (operating) only. The FY 2025–26 column is the comparative shown in the 2026/27 Estimates, restated for the current structure."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Summary budget vs actual by department (consolidated), whole government",src:SRC.ar,mul:1e6,G:MB_GOV,
      note:"Consolidated figures include each department's reporting entities (health authorities, school divisions, colleges), so they are larger than the department amounts above. Emergency expenditures were $272 million against a $50 million budget. Net debt was $36.5 billion."},
    year:{title:"What happened in FY 2025–26",pill:"15 of 25 over budget",cls:"up",src:[SRC.ar,SRC.r26],secs:[
     ["Key events",[
      ["Wildfires","Emergency expenditures were $222 million over budget, almost entirely for the 2025 wildfire season: 445 fires burned over 2.38 million hectares, with one of Manitoba's largest-ever evacuations.","The Province puts the total response cost at $321 million, including $54 million in Natural Resources and Indigenous Futures."],
      ["Manitoba Hydro","Net income from government business enterprises was $377 million, against $1,006 million budgeted. Manitoba Hydro reported a net loss of $446 million, against $220 million net income budgeted.","The Province cites drought, low reservoir storage and summer precipitation among the lowest on record, which lowered export revenue and raised fuel and power purchase costs."],
      ["Year-end adjustments","Families was $99 million over budget and Environment and Climate Change $77 million over (consolidated basis).","The Province attributes both mainly to one-time year-end adjustments."]]],
     ["Met or beat the plan",[
      ["Revenue","Revenue was $25,083 million, above the $25,056 million budgeted. Taxation revenue was $558 million above budget.",""],
      ["Agriculture","Agriculture expense was $380 million, against $550 million budgeted.","The Province cites lower AgriInsurance claims and favourable growing conditions."],
      ["Debt servicing","Debt servicing was $2,313 million, $24 million under budget.","The Province attributes this largely to lower interest rates."]]],
     ["Did not meet the plan",[
      ["Deficit","The deficit was $832 million, against $794 million budgeted. Expenses were $25,915 million, against $25,850 million budgeted.","The Province describes the deficit as in line with Budget 2025."],
      ["Net debt","Net debt was $36.5 billion, $39 million higher than budget.",""],
      ["Spending over budget","15 of 25 departments and service headings spent more than their start-of-year budget. Six spent more than their total approved funding, led by Environment and Climate Change (+$87.1 million) and Public Service Delivery (+$39.6 million).",""]]]]},
    goals:{map:MB_GOALS,src:n=>{const k=Object.keys(MB_GOAL_CODE).find(x=>PSC_K(x)===PSC_K(n));return k?[k+" Annual Report 2025–26","https://www.gov.mb.ca/asset_library/en/annualreports/2025_2026/annual-report-"+MB_GOAL_CODE[k]+"-25-26.pdf"]:null;},
      sub:"From the department's 2025–26 annual report",cap:"Performance measures, FY 2025–26",
      how:"Each department's annual report has a performance measurement table with the previous actuals, a target and the actual result. This page shows those measures, as printed. Some measures report a calendar year or the latest available year; that year is shown in brackets.",
      note:"Copied from the department's Performance Measures tables. Measures with no target or no result are left out. For some measures a lower number is better (for example wait times or recidivism), so ParliVue does not mark targets met or not met.",
      next:"FY 2026–27 targets are in the department's 2026–27 Supplement to the Estimates of Expenditure. Results come with the 2026–27 annual report (fall 2027). The FY 2025–26 tab shows the latest results.",
      none:"No performance measures with targets are shown for this line: either its 2025–26 annual report has none, or it is a service heading (such as Enabling Appropriations or Public Debt) without its own annual report."},
    srcs:[SRC.r26,SRC.r25,SRC.est,SRC.ar,["Manitoba Families Annual Report 2024/25 (p. 60)","https://www.gov.mb.ca/asset_library/en/annualreports/2024_2025/annual-report-fam-24-25.pdf"]]};
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
    year:{title:"What happened in FY 2025–26",pill:"Deficit above budget",cls:"up",src:[SRC.v1],secs:[
     ["Key events",[
      ["Health care","Health expense was $453 million (9.7%) above budget.","The Province cites the new physician services agreement, higher Regional Health Authority operating and personnel costs, and higher drug costs and claim volumes."],
      ["Tax revenue","Tax revenue was $365 million (5.5%) below budget.","The Province cites a lower New Brunswick share of national corporate taxable income, negative prior-year adjustments to HST and personal income tax, and the HST rebate for purpose-built rental housing."],
      ["Social development","Social development expense was $186 million (8.5%) above budget.","The Province cites child welfare placements, income security (including homelessness supports and shelters) and seniors and long-term care."]]],
     ["Met or beat the plan",[
      ["Education and training","Education and training expense was $70 million (2.2%) below budget.","The Province cites lower pension and other accounting adjustments and early learning and child care spending."],
      ["Other expenses","Other expenses were $132 million (5.8%) below budget.","The Province cites Regional Development Corporation projects not advancing as expected and delays in Opportunities New Brunswick client projects."],
      ["Other provincial revenue","Other provincial revenue was $191 million (21.6%) above budget.",""]]],
     ["Did not meet the plan",[
      ["Deficit","The deficit was $1,303.5 million, against $549.0 million budgeted. Expenses were $14.9 billion, $538 million above budget.",""],
      ["Provincial revenue","Revenue from provincial sources was $8.2 billion, $215 million below budget.",""],
      ["Net debt","Net debt was $13,907.6 million at March 31, 2026, against $12,819.4 million budgeted.",""],
      ["Central government","Central government expense was $99 million (9.1%) above budget.","The Province cites the injured workers liability accrual, tax revenue sharing agreements with First Nations and Service New Brunswick costs."]]]]},
    goals:{map:{},src:n=>["Measuring government progress (Government of New Brunswick)","https://www.gnb.ca/en/gov/government-priorities/measuring-progress.html"],
      how:"New Brunswick departments report performance measures in their annual reports. The FY 2025–26 reports had not been tabled when this page was built (November 2026; the 2024–25 reports were tabled between December 2025 and January 2026). The Government also tracks province-wide targets on its Measuring progress page.",
      next:"The Government's province-wide targets are on its Measuring progress page. Department results for FY 2026–27 come with the 2026–27 annual reports.",
      none:"New Brunswick's FY 2025–26 department annual reports had not been tabled when this page was built (November 2026; the 2024–25 reports were tabled between December 2025 and January 2026). The Government also tracks province-wide targets on its Measuring progress page."},
    srcs:[SRC.v2,SRC.est,SRC.v1]};
}

function pscNS(){
  const SRC={pa26:["Public Accounts 2026, Volume 1: Consolidated Financial Statements (FY 2025–26)","https://notices.novascotia.ca/files/public-accounts/2026/pa-volume-1-financial-statements-2026.pdf"],
    pa25:["Public Accounts 2025, Volume 1: Consolidated Financial Statements (FY 2024–25)","https://notices.novascotia.ca/files/public-accounts/2025/pa-volume-1-financial-statements-2025.pdf"],
    est:["Budget 2026–27: Estimates and Supplementary Detail","https://www.novascotia.ca/sites/default/files/documents/7-4172/budget-estimates-2026-27-en.pdf"]};
  const t5=v=>[v[0]*1e3,v[1]*1e3,0,(v[0]+v[1])*1e3,v[2]*1e3];
  const fin=(v,yr)=>v[3]?`Spending was above the total approved. The Public Accounts list a final additional appropriation of ${fB(v[3]*1e3)} required for year-end adjustments, which must be submitted to Cabinet (Governor in Council) within 15 days of the Public Accounts being tabled (Finance Act, s. 28(4)).`:"";
  const conv=P=>P.map(([n,v,sub])=>({k:PSC_K(n),n,T:t5(v),P:sub?sub.map(([sn,sv])=>[sn,...t5(sv)]):[],note:sub?sub.filter(x=>x[1][3]).map(([sn,sv])=>`${sn} spent above its total approved. The Public Accounts list a final additional appropriation of ${fB(sv[3]*1e3)} required for year-end adjustments, which must be submitted to Cabinet (Governor in Council) within 15 days of the Public Accounts being tabled (Finance Act, s. 28(4)).`).join(" "):fin(v),
    progNote:sub?"":"Nova Scotia's Public Accounts approve and report this "+"department as one appropriation (resolution), so there is no program breakdown here."}));
  const oth=(O,K,yr)=>"Not in the department totals: "+O.concat(K).map(([n,v])=>`${n} (budget ${fB(v[0]*1e3)}, spent ${v[2]<0?"−"+fB(-v[2]*1e3)+", a recovery":fB(v[2]*1e3)})`).join("; ")+".";
  const rows27=NSE27.map(([n,a,f,e])=>({k:PSC_K(n),n,T:[e*1e3,a*1e3],P:[],votes:[["FY 2025–26 forecast (February 2026)",f*1e3,null]]}));
  return {id:"nsscore",code:"NS",prov:"Nova Scotia",pfx:"Province of Nova Scotia",unit:"departments",unit1:"department",
    lede:`Nova Scotia's departments deliver the Province's programs: health and wellness, education and early childhood development, seniors and long-term care, opportunities and social development, public works and more. Each is led by a Cabinet minister. Smaller offices and agencies are grouped under Public Service.`,
    lede2:`Before each fiscal year, the House of Assembly approves the Estimates. After the year ends, Volume 1 of the Public Accounts lists each department's original estimate, the additional funding approved during the year and what it spent. This page compares them for ${NSP26.length} departments and accounts.`,
    how:{A:"The original Estimate approved in the Appropriations Act.",B:"Additional appropriations approved by Cabinet (Governor in Council) during the year, by Order in Council. Amounts spent above the total approved need a final additional appropriation after the year ends; these are noted for each department.",
      C:"Nova Scotia's Public Accounts do not show transfers between departments, so C is shown as zero.",
      E:"Budget plus additional appropriations: A + B.",S:"Actual departmental expense (General Revenue Fund).",
      basis:"These are General Revenue Fund amounts, before consolidation, on the same basis the Legislature approves. The Province's consolidated expense ($19.4 billion in FY 2025–26) adds health authorities, regional centres for education and other organizations. Restructuring Costs is a central provision (contract negotiations, workforce adjustment and government restructuring) rather than a department."},
    y26:{lab:"FY 2025–26",src:SRC.pa26,rows:conv(NSP26),totNote:oth(NSO26,NSK26)},
    y25:{lab:"FY 2024–25",src:SRC.pa25,rows:conv(NSP25),note:"The FY 2024–25 original estimates were restated for the departmental restructuring of December 12, 2024 (Order in Council 2024-425). Emergency Management became a department on September 20, 2024."},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Estimates",note:"Department totals from the Departmental Expenses Summary (General Revenue Fund). The 2026–27 Estimates also show a February 2026 forecast for FY 2025–26, listed above."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Consolidated statement of operations, whole government (audited)",src:SRC.pa26,mul:1e3,G:NS_GOV,
      note:"Nova Scotia reported a deficit of $1.41 billion. The budget plan was a $897.5 million deficit after a $200 million contingency, which is not included in the budget expense column above. Departments are shown here on a consolidated basis, so the amounts differ from the department table. Net debt was $24.1 billion at March 31, 2026 (budget: $23.4 billion)."},
    year:{title:"What happened in FY 2025–26",pill:"16 of 22 over budget",cls:"up",src:[SRC.pa26],secs:[
     ["Key events",[
      ["Wildfires","Natural Resources spent $63.8 million more than its estimate, including $32.0 million for large-scale forest fires. Emergency Management was $16.8 million over, mainly for Disaster Financial Assistance costs from the summer 2025 wildfires.","Federal recoveries were $67.7 million above estimate in Emergency Management, mainly wildfire costs recovered through the Disaster Financial Assistance Arrangements program."],
      ["Restructuring costs","Restructuring costs were $1,144.1 million, $592.6 million (107.5%) above the estimate.","The Province attributes this primarily to higher corporate initiatives."],
      ["Health care","Health and Wellness spent $384.6 million more than its estimate.","The Province cites $206.3 million for Nova Scotia Health and IWK inflation and staffing costs, and $136.4 million for physician services."]]],
     ["Met or beat the plan",[
      ["Revenue","Revenue was $17.98 billion, $418.1 million above the estimate.","The Province cites higher personal and corporate income tax, provincial recoveries and other federal transfers."],
      ["Debt servicing","Debt servicing costs were $869.6 million, $38.9 million under the estimate.",""],
      ["Under budget","Municipal Affairs spent $59.4 million less than its estimate and Education and Early Childhood Development $40.3 million less.","The Province cites the timing of federal infrastructure projects and early learning and child care initiatives deferred to the next year."]]],
     ["Did not meet the plan",[
      ["Deficit","The deficit was $1.41 billion, against $897.5 million budgeted. Expenses were $19.39 billion, $1.13 billion (6.2%) above the estimate.",""],
      ["Net debt","Net debt was $24.1 billion at March 31, 2026, against $23.4 billion budgeted.",""],
      ["Spending over budget","16 of 22 departments spent more than their start-of-year estimate. 11 spent more than their total approved funding and need final additional appropriations, led by Restructuring Costs ($420.6 million) and Public Works ($40.5 million).",""]]]]},
    goals:{map:{},src:n=>["Government Accountability Report 2025–26 (Government of Nova Scotia)","https://www.novascotia.ca/sites/default/files/documents/1-4368/government-accountability-report-2025-26-en.pdf"],
      how:"For FY 2025–26, Nova Scotia published one government-wide accountability report, organized by four priority areas. It describes outcomes in narrative form, with few numeric targets, rather than department performance measures, so this page links to it instead of showing a table.",
      next:"The 2026–27 Government Business Plan sets the plans and priorities for this year. Results come with the 2026–27 accountability report.",
      none:"For FY 2025–26, Nova Scotia published one government-wide accountability report, organized by priority area. It reports outcomes in narrative form, with few numeric targets, rather than department performance measures with targets, so none are shown here."},
    srcs:[SRC.pa26,SRC.pa25,SRC.est]};
}

function pscNL(){
  const SRC={r26:["Report on the Program Expenditures and Revenues of the Consolidated Revenue Fund, year ended March 31, 2026","https://www.gov.nl.ca/exec/tbs/files/Cash-Statements-2026-Web-Version-3.pdf"],
    r25:["Report on the Program Expenditures and Revenues of the Consolidated Revenue Fund, year ended March 31, 2025","https://www.gov.nl.ca/exec/tbs/files/Cash-Statements-2025-with-signed-letter-Final.pdf"],
    est:["Estimates of the Program Expenditure and Revenue of the Consolidated Revenue Fund 2026–27","https://www.gov.nl.ca/budget/2026/wp-content/uploads/sites/10/Estimates-2026.pdf"],
    fs:["Public Accounts: Consolidated Summary Financial Statements, March 31, 2026","https://www.gov.nl.ca/exec/tbs/files/Consolidated-Summary-Financial-Statements-March-31-2026-Web.pdf"]};
  const conv=(P,PP)=>P.map(([n,a,t,s,x])=>{const pp=PP&&PP[n];return {k:PSC_K(n),n,T:[a,s,t,a+s+t,x],P:pp?pp.map(([pn,o,am,ac])=>[pn,o,0,am-o,am,ac]):[],progNote:pp?"By program (subdivision), net of related revenue, from the department's Statement of Expenditure and Related Revenue. The report gives only the original and amended estimates by program, so B and C are shown together in C. Some names appear twice where a program has both current and capital lines.":"The report shows this department's spending by program and account; that detail is not yet captured here (ParliVue only shows program detail where the program totals add exactly to the department totals), so this section shows department totals."};});
  const o26=Object.fromEntries(NLP26.map(r=>[PSC_K(r[0]),r[1]]));
  const rows27=NLE27.map(([n,e])=>({k:PSC_K(n),n,T:[e,o26[PSC_K(n)]??0],P:[]}));
  return {id:"nlscore",code:"NL",prov:"Newfoundland and Labrador",pfx:"Province of Newfoundland and Labrador",unit:"departments",unit1:"department",
    lede:`Newfoundland and Labrador's departments deliver the Province's programs: health and community services, education and early childhood development, transportation and infrastructure, social supports, justice and more. Each is led by a Cabinet minister. Consolidated Fund Services covers debt servicing, pensions and other central payments.`,
    lede2:`Before each fiscal year, the House of Assembly approves the Estimates. After the year ends, the Report on the Program Expenditures and Revenues of the Consolidated Revenue Fund shows each department's original estimate, transfers during the year and what it spent. This page compares them for ${NLP26.length} departments and accounts.`,
    how:{A:"The original Estimates, net of related revenue (the revenue a department collects for its own programs).",B:"Supplementary supply approved by the House of Assembly during the year. There was none in FY 2025–26 or FY 2024–25.",
      C:"Transfers of estimates: money moved between departments during the year, including the contingency fund ($165.1 million of the $200 million provided in FY 2025–26 was transferred to departments) and central funds held by Treasury Board. Transfers add to zero across government.",
      E:"A + B + C.",S:"Actual net expenditure: current and capital spending less related revenue.",
      basis:"These are Consolidated Revenue Fund amounts on a modified cash basis, net of related revenue, the same basis as the Estimates. The Province's consolidated expense ($11.5 billion in FY 2025–26) is on an accrual basis and adds health authorities, school boards and other organizations."},
    latestNote:"FY 2025–26 is the latest year with department results: the report was tabled September 29, 2026.",
    y26:{lab:"FY 2025–26",src:SRC.r26,rows:conv(NLP26,NLPP26)},
    y25:{lab:"FY 2024–25",src:SRC.r25,rows:conv(NLP25),note:"Departments were reorganized after FY 2024–25, so several FY 2024–25 departments have different names and responsibilities."},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Estimates (original)",note:"Net expenditure (current and capital, less related revenue) from the Summary of Current and Capital Account by Department. The FY 2025–26 comparison is the original estimate from the Province's FY 2025–26 report."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Consolidated statement of operations, whole government (audited)",src:SRC.fs,mul:1e3,G:NL_GOV,
      note:"Newfoundland and Labrador reported a deficit of $377.5 million against a budgeted $371.8 million. Net debt was $19.0 billion at March 31, 2026 (budget: $19.4 billion)."},
    year:{title:"What happened in FY 2025–26",pill:"7 of 22 over budget",cls:"up",src:[SRC.fs,SRC.r26],secs:[
     ["Key events",[
      ["Offshore oil","Offshore royalties were $1,710.1 million, against $1,591.4 million budgeted.","The Province cites oil production 9.7 million barrels higher than projected, partly offset by lower oil prices (US$70.35 per barrel, against US$73.00 budgeted) and a higher exchange rate."],
      ["Tobacco settlement","Miscellaneous revenue was $425.3 million below budget.","The Province attributes this mainly to lower than expected tobacco settlement revenues."],
      ["Health care","Health and Community Services spent $4,797.0 million, against an original estimate of $4,540.2 million.","Across government, the Province cites healthcare recruitment, retention and service demands, and physician services."]]],
     ["Met or beat the plan",[
      ["Revenue","Revenue was $11,091.0 million, $420.8 million above budget. Taxation revenue was $546.8 million above budget.","The Province cites higher corporate income tax from offshore oil and gas corporations and higher personal income tax assessments."],
      ["Net debt","Net debt was $19.0 billion at March 31, 2026, against $19.4 billion budgeted.",""],
      ["Within total approved","21 of 22 departments stayed within their total approved funding.",""]]],
     ["Did not meet the plan",[
      ["Deficit","The deficit was $377.5 million, against $371.8 million budgeted. Expenses were $11,468.6 million, $426.6 million above budget.",""],
      ["Debt expense","Debt expense was $46.4 million above budget.","The Province cites higher than expected financing costs."],
      ["Spending over budget","7 of 22 departments spent more than their original estimate, led by Health and Community Services (+$256.7 million) and Justice and Public Safety (+$184.5 million). Education and Early Childhood Development spent $20.2 million more than its total approved funding.",""]]]]},
    goals:{map:{},src:n=>["Documents tabled in the House of Assembly, 51st General Assembly (includes 2025–26 annual reports)","https://assembly.nl.ca/HouseBusiness/Tabled/ga51session1.aspx"],
      how:"Newfoundland and Labrador departments report each year against the goals, objectives and indicators in their strategic plans. For FY 2025–26 these are mostly actions to complete (for example “will have implemented initiatives”) rather than numeric targets, so this page links to the annual reports instead of showing a table.",
      next:"The 2026–29 strategic plans set the goals for this year and the next two. Results come with the 2026–27 annual reports.",
      none:"Newfoundland and Labrador departments report against goals, objectives and indicators from their 2023–26 strategic plans. In the 2025–26 annual reports these are mostly actions to complete rather than numeric targets, so none are shown here. The annual reports are listed among the documents tabled in the House of Assembly."},
    srcs:[SRC.r26,SRC.r25,SRC.est,SRC.fs]};
}

function pscPE(){
  const SRC={v26:["Public Accounts 2026, Volume II: Operating Fund Financial Statements and Details of Revenues and Expenditures","https://wdf.princeedwardisland.ca/download/dms?objectId=8659d721-ef93-4ae6-bd04-abcbcd885b04&fileName=2026%20-%20PA%20-%20Volume%20II.pdf"],
    v25:["Public Accounts 2025, Volume II: Operating Fund Financial Statements and Details of Revenues and Expenditures","https://wdf.princeedwardisland.ca/download/dms?objectId=c5a7999a-c170-4033-80a0-88cf2aa6ba4f&fileName=2025%20-%20PA%20-%20Volume%20II.pdf"],
    est:["2026 Operating Estimates Book (FY 2026–27)","https://www.princeedwardisland.ca/sites/default/files/9350/2026%20Operating%20Estimates%20Book.pdf"],
    v1:["Public Accounts 2026, Volume I: Consolidated Financial Statements","https://wdf.princeedwardisland.ca/download/dms?objectId=a004bfb3-02dd-4f2e-8175-1a351960bb12&fileName=2026%20-%20PA%20-%20Volume%20I.pdf"]};
  const ALIAS={"la commission scolaire de langue française":"french language school board"};
  const K=n=>{const k=PSC_K(n);return ALIAS[k]||k;};
  const t5=(x,e)=>[e,0,0,e,x];
  const conv=P=>P.map(([n,x,e,pr])=>({k:K(n),n,T:t5(x,e),P:pr.map(([pn,px,pe])=>[pn,...t5(px,pe)]),
    progNote:pr.length?"":"This organization is funded as a single line in the Estimates, so there is no program breakdown."}));
  const rows27=PEE27.filter(r=>!/^Other Consolidated Agencies/.test(r[0])).map(([n,e,f,a])=>({k:K(n),n,T:[e,a],P:[],votes:[["FY 2025–26 forecast (Operating Estimates Book)",f,null]]}));
  return {id:"pescore",code:"PE",prov:"Prince Edward Island",pfx:"Province of Prince Edward Island",unit:"departments and agencies",unit1:"department",
    lede:`Prince Edward Island's departments, and the Crown agencies they fund (such as Health PEI, the Public Schools Branch and Innovation PEI), deliver the Province's programs. Each department is led by a Cabinet minister.`,
    lede2:`Before each fiscal year, the Legislative Assembly approves the Operating Estimates. After the year ends, Volume II of the Public Accounts lists each department's and agency's expenses next to its estimates, by program. This page compares them for ${PEP26.length} departments and agencies.`,
    how:{A:"The Operating Estimates for each department or agency, as shown in Volume II of the Public Accounts.",B:"Volume II shows spending next to the estimates only. It does not show funding added during the year, so B is shown as zero.",
      C:"Volume II does not show transfers between departments, so C is shown as zero.",
      E:"Same as A.",S:"Actual gross expenses of the Operating Fund (Volume II, unaudited).",
      basis:"These are Operating Fund amounts (gross expenses). Grants to Crown agencies such as Health PEI are counted once, as spending of the agency's line. Interest on debt and amortization are not included. The Province's consolidated expense ($3.7 billion in FY 2025–26) adds the agencies' own revenue and spending."},
    latestNote:"FY 2025–26 is the latest year with department results: Public Accounts Volume II for the year ended March 31, 2026.",
    y26:{lab:"FY 2025–26",src:SRC.v26,rows:conv(PEP26)},
    y25:{lab:"FY 2024–25",src:SRC.v25,rows:conv(PEP25),note:"The Public Service Commission was called the P.E.I. Public Service Commission in FY 2024–25."},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Estimates (restated)",note:"Program expenditure from the Expenditure Summary by Department. Several departments were renamed and reorganized for 2026–27 (for example, Finance became Finance and Affordability), so they have no direct match with FY 2025–26 rows. The FY 2025–26 estimates in the book are restated to the new structure. The book also lists $50.3 million for other consolidated agencies, not shown here."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Consolidated statement of operations, whole government (audited)",src:SRC.v1,mul:1e3,G:PE_GOV,
      note:"Prince Edward Island reported a deficit of $355.5 million against a budgeted $183.9 million. Net debt was $3.7 billion at March 31, 2026 (budget: $3.5 billion)."},
    year:{title:"What happened in FY 2025–26",pill:"10 of 26 over budget",cls:"up",src:[SRC.v1,SRC.v26],secs:[
     ["Key events",[
      ["Drought","Agriculture expense was $177.6 million, $64.1 million above budget.","The Province cites crop insurance claims for potatoes and soybeans after drought in the 2025 growing season. The losses triggered $31.8 million in reinsurance recoveries."],
      ["Health PEI","Health PEI spent $137.4 million more than budgeted (consolidated basis).","The Province cites agency and travel nurses ($42.9 million), salaries ($35.9 million) and medical supplies ($20.6 million)."],
      ["Sales tax","Sales tax revenue was $445.4 million, $74.3 million below budget.","The Province says expected positive adjustments to current and prior year entitlements did not materialize and became negative adjustments."]]],
     ["Met or beat the plan",[
      ["Revenue","Revenue was $3,316.2 million, $10.1 million above budget. Corporate income tax was $54.2 million above budget and personal income tax $21.7 million above.",""],
      ["Finance","Finance spent $27.7 million less than budgeted.","The Province says the tariff and trade contingency fund set up in the FY 2025–26 budget was not fully used."]]],
     ["Did not meet the plan",[
      ["Deficit","The deficit was $355.5 million, against $183.9 million budgeted. Expenses were $3,671.7 million, $181.7 million (5.2%) above budget.",""],
      ["Net debt","Net debt was $3.7 billion at March 31, 2026, against $3.5 billion budgeted.",""],
      ["Other revenue","Tobacco Agreement revenue was $35.8 million below budget and other federal transfers $20.0 million below.",""],
      ["Spending over budget","10 of 26 departments and agencies spent more than their estimate, led by Health PEI (+$139.7 million) and Social Development and Seniors (+$14.3 million).",""]]]]},
    goals:{map:{},src:n=>null,
      how:"ParliVue has not found performance measures with numeric targets in Prince Edward Island's department annual reports, which mainly describe the year's activities and some results. Goals are not shown for now.",
      next:"Department business plans for 2026–27 describe this year's priorities. Results come with the 2026–27 annual reports.",
      none:"ParliVue has not found performance measures with numeric targets in Prince Edward Island's department annual reports, which mainly describe the year's activities and some results, so none are shown here."},
    srcs:[SRC.v26,SRC.v25,SRC.est,SRC.v1]};
}

function pscYK(){
  const SRC={s26:["Yukon Public Accounts 2025–26, Schedule 4: Non-Consolidated Schedule of Expenses by Department","https://yukon.ca/sites/default/files/fin-2025-26-public-accounts-schedule-4-schedule-expenses-department.pdf"],
    s25:["Yukon Public Accounts 2024–25, Schedule 4: Non-Consolidated Schedule of Expenses by Department","https://open.yukon.ca/information/25581eb9-a0b5-4038-9568-b2588e861fbb/resource/ef895c00-db1a-40f0-933b-fc60b191cd2f/download/fin-2024-25-public-accounts-schedule-4-schedule-expenses-department.pdf"],
    est:["2026–27 Main Estimates","https://yukon.ca/sites/default/files/fin-2026-27-budget-main-estimates.pdf"],
    cf:["Yukon Public Accounts 2025–26: Government of Yukon consolidated financial statements","https://yukon.ca/sites/default/files/fin-2025-26-public-accounts-government-yukon-consolidated-financial-statements.pdf"],
    fsda:["Yukon Public Accounts 2025–26, Part 1: Financial Statement Discussion and Analysis","https://yukon.ca/sites/default/files/fin-2025-26-public-accounts-financial-statement-discussion-and-analysis.pdf"],
    sw:["Yukon Public Accounts 2025–26, Schedule 11: Schedule of Special Warrants","https://yukon.ca/sites/default/files/fin-2025-26-public-accounts-schedule-11-schedule-special-warrants.pdf"]};
  const add=(a,b)=>a.map((v,i)=>v+b[i]);
  const conv=P=>P.map(([n,om,cap,po,pc])=>({k:PSC_K(n),n,T:add(om,cap),
    P:[...po.map(p=>[p[0],...p.slice(1,6)]),...pc.map(p=>[p[0]+" (capital)",...p.slice(1,6)])],
    votes:[["Operation and maintenance",om[0],om[1],om[2],om[3],om[4]],cap.some(v=>v)?["Capital",cap[0],cap[1],cap[2],cap[3],cap[4]]:null].filter(Boolean),
    votesNote:"The summary above adds the operation and maintenance (O&M) and capital votes. Transfers between votes are shown as adjustments."}));
  const m26=Object.fromEntries(YKP26.map(r=>[PSC_K(r[0]),r[1][0]+r[2][0]]));
  const rows27=YKE27.map(([n,o,c])=>({k:PSC_K(n),n,T:[(o+c)*1e3,m26[PSC_K(n)]??0],P:[],votes:[["Operation and maintenance",o*1e3,null],["Capital",c*1e3,null]]}));
  return {id:"ykscore",code:"YT",prov:"Yukon",pfx:"Government of Yukon",unit:"departments and corporations",unit1:"department",
    lede:`Yukon's departments deliver the territorial government's programs: health and social services, education, highways and public works, community services, justice and more. Each is led by a minister. Some funding goes through territorial corporations such as the Yukon Development Corporation and Yukon Housing Corporation.`,
    lede2:`Before each fiscal year, the Legislative Assembly approves the Main Estimates, with separate votes for operation and maintenance (O&M) and capital. After the year ends, the Public Accounts (Schedule 4) show each department's main estimate, supplementary estimates, revised estimate and actual spending, by program. This page compares them for ${YKP26.length} departments and votes.`,
    how:{A:"The Main Estimates: O&M and capital votes added together.",B:"Supplementary Estimates approved during the year (they can also reduce a vote). In FY 2025–26 they include a $31.7 million special warrant issued in August 2025 (Schedule 11).",
      C:"Transfers between votes. Schedule 4 shows none for FY 2025–26 or FY 2024–25.",
      E:"Revised Estimates: A + B + C.",S:"Actual spending against the O&M and capital votes.",
      basis:"These are appropriation amounts, before the Public Accounts convert them to expenses (for example, capital purchases become assets and are expensed through amortization). Yukon Housing Corporation is shown net of rental revenues and recoveries, as in the schedule's totals. The territory's consolidated expense ($2.3 billion in FY 2025–26) adds the hospital corporation, Yukon University and other organizations."},
    latestNote:"FY 2025–26 is the latest year with department results: the Yukon Public Accounts 2025–26 were released in October 2026.",
    y26:{lab:"FY 2025–26",src:SRC.s26,rows:conv(YKP26),progNote:"Programs include O&M and capital lines; capital lines are marked."},
    y25:{lab:"FY 2024–25",src:SRC.s25,rows:conv(YKP25)},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Main Estimates",note:"Total appropriations (O&M plus capital) from the Total Appropriations Summary by Department/Corporation. Economic Development and Tourism and Culture were combined into Economic Development, Tourism and Culture for 2026–27. The 2026–27 Estimates show Yukon Housing Corporation's gross appropriation, while the Public Accounts rows above are net of its revenues and recoveries. The FY 2026–27 total includes $100 million for Government Contingencies, which has no row in the table."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Consolidated statement of operations, whole government (audited)",src:SRC.cf,mul:1e3,G:YK_GOV,
      note:"Yukon reported a surplus of $75.1 million against a budgeted $132.7 million. The surplus also includes an $8.4 million recovery of prior years' expenses, which is not one of the rows above. Net debt was $297.9 million at March 31, 2026."},
    year:{title:"What happened in FY 2025–26",pill:"7 of 21 over budget",cls:"up",src:[SRC.fsda,SRC.s26],secs:[
     ["Key events",[
      ["Victoria Gold","Natural resources expense was $283.9 million, against $143.3 million budgeted. It includes a $116.6 million valuation allowance on the loan receivable related to Victoria Gold Corp.","Revenue includes $45.0 million recognized for the Victoria Gold Corp. surety bond."],
      ["Community Services","Community Services received $46.0 million in supplementary funding, $34.6 million of it for Protective services. It spent $34.7 million more than its start-of-year budget.",""],
      ["Borrowing","Borrowings rose $391.8 million. Total debt was $810.6 million at March 31, 2026, 67.6% of the $1.2 billion borrowing limit.","The Government cites borrowing for major infrastructure projects and public facilities."]]],
     ["Met or beat the plan",[
      ["Revenue","Revenue was $2,330.3 million, $56.6 million above budget.","The Government cites higher taxes and general revenues, funding agreements and government business enterprise income, offset by lower transfers from the Government of Canada."],
      ["Within total approved","All 21 departments and corporations stayed within their total approved funding.",""],
      ["General government","General government expense was $250.8 million, against $329.8 million budgeted.",""]]],
     ["Did not meet the plan",[
      ["Surplus","The surplus was $75.1 million, against $132.7 million budgeted. Expenses (net of recoveries of prior years' expenses) were $2,255.2 million, $114.2 million (5.3%) above budget.",""],
      ["Net debt","Net debt was $297.9 million at March 31, 2026, up $70.7 million from a year earlier.",""],
      ["Spending over budget","7 of 21 departments and corporations spent more than their start-of-year budget, led by Community Services (+$34.7 million) and Health and Social Services (+$15.1 million).",""]]]]},
    goals:{map:{},src:n=>null,
      how:"ParliVue has not found published FY 2025–26 department performance measures with targets for Yukon. Goals are not shown for now.",
      next:"The 2026–27 budget documents set out this year's priorities.",
      none:"ParliVue has not found published FY 2025–26 department performance measures with targets for Yukon, so none are shown here."},
    srcs:[SRC.s26,SRC.s25,SRC.est,SRC.cf,SRC.fsda,SRC.sw]};
}

function pscNT(){
  const SRC={s26:["Public Accounts 2025–2026, Section II: Non-consolidated Financial Statements (Schedule 2)","https://www.fin.gov.nt.ca/sites/fin/files/2025-2026_public_accounts_section_ii_-_non-consolidated_financial_statements.pdf"],
    s25:["Public Accounts 2024–2025, Section II: Non-consolidated Financial Statements (Schedule 2)","https://www.fin.gov.nt.ca/sites/fin/files/resources/2024-2025_public_accounts_section_ii_-_non-consolidated_financial_statements.pdf"],
    est:["2026–2027 Supplementary Estimates (Operations Expenditures) No. 1: Summary of Appropriations (2026–27 Main Estimates column)","https://www.fin.gov.nt.ca/sites/fin/files/resources/supplementary_estimates_operations_expenditures_no_1_2026-2027.pdf"],
    tb:["2025–2026 Public Accounts Tables (Section I, consolidated)","https://www.fin.gov.nt.ca/sites/fin/files/2025-2026_public_accounts_tables.xlsx"]};
  const k3=a=>a.map(v=>v*1e3);
  const conv=P=>P.map(([n,T,pr,v])=>({k:PSC_K(n),n,T:k3(T),P:pr.map(p=>[p[0],...k3(p.slice(1,6))]),note:v?"The Public Accounts give this explanation of the difference between the total appropriation and spending: "+v:""}));
  const m26=Object.fromEntries(NTP26.map(r=>[PSC_K(r[0]),r[1][0]*1e3]));
  const rows27=NTE27.map(([n,e])=>({k:PSC_K(n),n,T:[e,m26[PSC_K(n)]??0],P:[]}));
  return {id:"ntscore",code:"NT",prov:"Northwest Territories",pfx:"Government of the Northwest Territories",unit:"departments",unit1:"department",
    lede:`The Northwest Territories' departments deliver the territorial government's programs: health and social services, education, culture and employment, infrastructure, environment and climate change, justice and more. Each is led by a minister.`,
    lede2:`Before each fiscal year, the Legislative Assembly approves the Main Estimates for operations expenditures. After the year ends, Section II of the Public Accounts (Schedule 2) shows each department's main estimates, supplementary estimates, transfers and spending, by activity, with an explanation of the overall variance. This page compares them for ${NTP26.length} departments.`,
    how:{A:"The Main Estimates (operations expenditures).",B:"Supplementary Estimates approved during the year.",
      C:"Transfers between activities and departments, as shown in Schedule 2. They add to zero across government in FY 2025–26.",
      E:"Total appropriation: A + B + C.",S:"Operating fund expenses (expenses less projects carried out on behalf of third parties).",
      basis:"These are non-consolidated operating amounts. Capital spending is approved separately in the Capital Estimates and is not included. The territory's consolidated expense ($3.1 billion in FY 2025–26) adds Housing NWT, health and education authorities and other organizations."},
    latestNote:"FY 2025–26 is the latest year with department results: Public Accounts 2025–2026, Section II.",
    y26:{lab:"FY 2025–26",src:SRC.s26,rows:conv(NTP26)},
    y25:{lab:"FY 2024–25",src:SRC.s25,rows:conv(NTP25)},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Main Estimates",note:"2026–27 Main Estimates for operations expenditures by department, as listed in Supplementary Estimates (Operations Expenditures) No. 1, 2026–2027 (tabled June 1, 2026)."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Consolidated statement of operations, whole government (audited)",src:SRC.tb,mul:1e3,G:NT_GOV,
      note:"The Northwest Territories reported a surplus of $21.2 million against a budgeted $200.5 million. Net debt was $2.0 billion at March 31, 2026 (budget: $1.8 billion)."},
    year:{title:"What happened in FY 2025–26",pill:"8 of 10 over budget",cls:"up",src:[SRC.s26,SRC.tb],secs:[
     ["Key events",[
      ["Wildfires","Environment and Climate Change received $74.2 million in supplementary estimates, $63.7 million of it for Wildlife and Forest Management.","The Government says the fire suppression supplementary appropriation was overestimated by $6.2 million."],
      ["Carbon tax offsets","Finance spent $48.9 million less than its total approved funding.","The Government attributes this primarily to the removal of Carbon Tax Offsets ($67 million)."],
      ["Energy projects delayed","Infrastructure's Energy and Strategic Initiatives spent $12.8 million of the $63.6 million approved.","The Government cites capital project delays ($51 million), including the Fort Providence Transmission Line ($37.8 million)."]]],
     ["Met or beat the plan",[
      ["Revenue","Revenue was $3,102.2 million, above the $3,020.7 million budgeted.",""],
      ["Within total approved","8 of 10 departments stayed within their total approved funding.",""],
      ["Under budget","Industry, Tourism and Investment and Infrastructure spent less than their start-of-year budgets.",""]]],
     ["Did not meet the plan",[
      ["Surplus","The surplus was $21.2 million, against $200.5 million budgeted. Expenses were $3,081.0 million, against $2,820.2 million budgeted.",""],
      ["Net debt","Net debt was $1,956.2 million at March 31, 2026, against $1,767.2 million budgeted.",""],
      ["Spending over budget","8 of 10 departments spent more than their start-of-year budget. Two spent more than their total approved funding: the Legislative Assembly and Health and Social Services.","For Health and Social Services, the Government cites higher costs for residents receiving hospital and physician care outside the NWT ($4.5 million)."]]]]},
    goals:{map:{},src:n=>["2026–27 GNWT Annual Business Plan Update (TD 449-20(1), tabled February 2026)","https://www.ntlegislativeassembly.ca/sites/default/files/tabled-documents/2026-02/TD%20449-20%281%292026-2027%20GNWT%20Annual%20Business%20Plan%20Update.pdf"],
      how:"The Northwest Territories reports progress on each department's mandate commitments in its Annual Business Plan Update, with measures, targets and progress to date. Many targets are actions or ongoing work rather than numeric results, so this page links to the update instead of showing a table.",
      next:"The 2026–27 Annual Business Plan Update (tabled February 2026) sets out this year's commitments, measures and targets.",
      none:"The Northwest Territories reports progress on each department's mandate commitments in its Annual Business Plan Update, with measures, targets and progress to date. Many targets are actions or ongoing work rather than numeric results, so none are shown here."},
    srcs:[SRC.s26,SRC.s25,SRC.est,SRC.tb]};
}

function pscNU(){
  const SRC={pa25:["2024–25 Public Accounts of Nunavut (Section III, Schedule B.1)","https://www.assembly.nu.ca/sites/default/files/2026-03/TD-002-7%281%29-EN-2024-25_Public_Accounts_of_Nunavut.pdf"],
    est:["2026–2027 Main Estimates","https://www.gov.nu.ca/sites/default/files/documents/2026-05/Main_Estimates_2026_2027_ENG.pdf"]};
  const ALIAS={"office of the legislative assembly":"legislative assembly"};
  const K=n=>{const k=PSC_K(n);return ALIAS[k]||k;};
  const k3=a=>a.map(v=>v*1e3);
  const rows25=NUP25.map(([n,om,cap,po])=>({k:K(n),n,T:k3(om),P:po.map(p=>[p[0],...k3(p.slice(1,6))]),
    progNote:"The Public Accounts break each department's operations and maintenance spending down by type of spending (compensation and benefits, grants and contributions, other), not by program.",
    votes:[["Operations and maintenance",...k3(om)],["Capital",...k3(cap)]],votesNote:"The summary above uses the operations and maintenance (O&M) appropriation, which matches the Main Estimates. Capital is voted separately and is shown here for reference. Transfers are shown as adjustments."}));
  const rows27=NUE27.map(([n,e,r,m])=>({k:K(n),n,T:[e*1e3,m*1e3],P:[],votes:[["FY 2025–26 revised estimates",r*1e3,null]]}));
  const cap=NUP25.reduce((t,r)=>[t[0]+r[2][0],t[1]+r[2][4]],[0,0]);
  return {id:"nuscore",code:"NU",prov:"Nunavut",pfx:"Government of Nunavut",unit:"departments",unit1:"department",
    lede:`Nunavut's departments deliver the territorial government's programs: health, education, family services, justice, community and infrastructure services and more. Each is led by a minister. The Nunavut Housing Corporation and Nunavut Arctic College are funded through their own appropriations.`,
    lede2:`Before each fiscal year, the Legislative Assembly approves the Main Estimates for operations and maintenance (O&M); capital is approved separately. After the year ends, the Public Accounts (Schedule B.1) show each department's original budget, supplementary appropriations, transfers, revised budget and actual spending. This page compares them for ${NUP25.length} departments.`,
    how:{A:"The original O&M budget (Main Estimates).",B:"Supplementary appropriations approved during the year.",
      C:"Transfers within a department's appropriation. They add to zero for each department.",
      E:"Revised budget: A + B + C.",S:"Actual O&M spending under approved appropriations.",
      basis:"These are O&M appropriation amounts, the same basis as the Main Estimates. Capital appropriations (for FY 2024–25, a $355.8 million original budget and $277.8 million spent) and spending funded by third-party agreements and revolving funds are not included. The territory's consolidated expense ($3.3 billion in FY 2024–25) adds Qulliq Energy Corporation, district education authorities and other organizations."},
    latestNote:"Nunavut's Public Accounts for FY 2025–26 had not been tabled when this page was built (November 2026); the FY 2024–25 Public Accounts were tabled in the Legislative Assembly in March 2026. The latest department results are for FY 2024–25.",
    y26:null,
    y25:{lab:"FY 2024–25",src:SRC.pa25,rows:rows25,totNote:"Totals are O&M only."},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 Main Estimates",note:"Operations and maintenance from the Summary of Operations and Maintenance Expenditures. In 2024–25 the Government created the Department of Transportation and Infrastructure Nunavut and the Department of Community Services; Community and Government Services and Economic Development and Transportation ceased to exist, so those rows have no FY 2026–27 match."},
    gov:{title:"FY 2024–25 results vs budget",sub:"Consolidated statement of operations, whole government (audited)",src:SRC.pa25,mul:1e3,G:NU_GOV,yl:"FY 2024–25",pl:"FY 2023–24",
      note:"Nunavut reported a surplus of $196.9 million for FY 2024–25 against a budgeted $43.4 million. Nunavut reported net financial assets (rather than net debt) of $742.0 million at March 31, 2025. FY 2025–26 results are not yet available."},
    year:{title:"What happened in FY 2024–25",pill:"5 of 14 over budget",cls:"up",src:[SRC.pa25],secs:[
     ["Key events",[
      ["Tobacco settlement","Revenue included $60.9 million in tobacco settlement proceeds.","The Government expects payments for the next 20 years, with significant uncertainty about their amount and timing."],
      ["Health care","Health expense was $917.7 million, against $719.2 million budgeted.","The Government cites demand for medical and social services, staffing needs, inflation in operating costs and greater reliance on service contracts."],
      ["Program delays","Community and Government Services spent $112.3 million less than budgeted, Finance $89.3 million less and Economic Development and Transportation $35.4 million less.","The Government cites delays in program implementation and procurement."]]],
     ["Met or beat the plan",[
      ["Surplus","The surplus was $196.9 million, against $43.4 million budgeted.",""],
      ["Revenue","Revenue was $3,470.7 million, $161.2 million above budget. Revenue generated by the Government of Nunavut was $151.6 million (25.3%) above budget.",""],
      ["Net financial assets","Net financial assets were $742.0 million at March 31, 2025, up $6.2 million from a year earlier.",""]]],
     ["Did not meet the plan",[
      ["Expenses","Expenses were $3,273.8 million, $7.7 million above budget.",""],
      ["Spending over budget","5 of 14 departments and agencies spent more than their operations and maintenance main estimates, led by Health (+$133.7 million) and Family Services (+$38.8 million). Four spent more than their total approved funding: Health ($47.3 million over), Family Services ($12.4 million), Community and Government Services ($7.2 million) and Economic Development and Transportation ($1.8 million).",""]]]]},
    goals:{map:{},src:n=>null,
      how:"ParliVue has not found published department performance measures with numeric targets for Nunavut. Goals are not shown for now.",
      next:"Department business plans set out this year's priorities.",
      none:"ParliVue has not found published department performance measures with numeric targets for Nunavut, so none are shown here."},
    srcs:[SRC.pa25,SRC.est]};
}

function pscQC(){
  const SRC={v26:["Public Accounts 2025-2026, Volume 2 (Tables 1 and 2)","https://cdn-contenu.quebec.ca/cdn-contenu/adm/min/finances/publications-adm/Comptes-publics/EN/CPTEN_vol2-2025-2026.pdf"],
    v25:["Public Accounts 2024-2025, Volume 2 (Tables 1 and 2)","https://cdn-contenu.quebec.ca/cdn-contenu/adm/min/finances/publications-adm/Comptes-publics/EN/CPTEN_vol2-2024-2025.pdf"],
    est:["Expenditure Budget 2026-2027, Vol. 3: Estimates and Expenditures of the Departments and Bodies (Summary of Appropriations)","https://cdn-contenu.quebec.ca/cdn-contenu/adm/min/secretariat-du-conseil-du-tresor/publications-adm/budgets/2026-2027/en/3_estimates_expenditures_departments_and_bodies.pdf"],
    v1:["Public Accounts 2025-2026, Volume 1: Consolidated Financial Statements","https://cdn-contenu.quebec.ca/cdn-contenu/adm/min/finances/publications-adm/Comptes-publics/EN/CPTEN_vol1-2025-2026.pdf"]};
  const ALIAS={"conseil du trésor, administration gouvernementale et efficacité de l'état":"conseil du trésor et administration gouvernementale"};
  const K=n=>{const k=PSC_K(n);return ALIAS[k]||k;};
  const k3=v=>v*1e3;
  const prov=n=>/^Conseil du trésor|^Conseil exécutif$|^Finances$|^Immigration, Francisation/.test(n)?"The 2026-2027 Expenditure Budget notes that this portfolio contains one or more provisions allowing transfers of appropriations to other portfolios. ":"";
  const conv=P=>P.map(([n,v,x])=>({k:K(n),n,T:[k3(v[0]),k3(v[1]),k3(v[2]+v[3]),k3(v[4]),k3(x)],P:[],
    note:prov(n)+`C combines appropriation transfers (${pscSg(k3(v[2]))}) and adjustments to permanent appropriations (${pscSg(k3(v[3]))}).`,
    progNote:"Volume 2 also reports each portfolio's authorized and expended appropriations by program, but not the initial budget by program, so this section shows portfolio totals."}));
  const rows27=QCE27.map(([n,e,c])=>({k:K(n),n,T:[k3(e),k3(c)],P:[]}));
  return {id:"qcscore",code:"QC",prov:"Québec",pfx:"Gouvernement du Québec",unit:"portfolios",unit1:"portfolio",unitS:"Portfolio",unitP:"Portfolios",
    lede:`Québec's government is organized into portfolios: each groups a department and the budget-funded bodies under one minister, such as Santé et Services sociaux, Éducation, Enseignement supérieur and Famille. Portfolio names are shown as the Government publishes them, in French.`,
    lede2:`Each spring the National Assembly approves the appropriations in the Expenditure Budget. After the year ends, Volume 2 of the Public Accounts shows each portfolio's initial appropriation, the changes during the year and the appropriations expended. This page compares them for ${QCP26.length} portfolios.`,
    how:{A:"The initial appropriation (annual and permanent appropriations at the start of the year).",B:"Supplementary appropriations.",
      C:"Appropriation transfers between portfolios (they add to zero) plus adjustments to permanent appropriations. Large transfers come from provisions, mainly in Conseil du trésor et Administration gouvernementale, that are moved to other portfolios during the year.",
      E:"Total authorized appropriation: A + B + C.",S:"Expended appropriations: expenditures and investments charged against appropriations.",
      basis:"These are general fund appropriation amounts. Debt service is mostly a permanent appropriation in Finances. The Government's consolidated expenditure ($165.9 billion in FY 2025–26) adds special funds, health and social services and education networks, and other bodies. Published portfolio figures are rounded, so some rows differ from the sum of their parts by $1 thousand."},
    latestNote:"FY 2025–26 is the latest year with portfolio results: Public Accounts 2025-2026, Volume 2.",
    y26:{lab:"FY 2025–26",src:SRC.v26,rows:conv(QCP26)},
    y25:{lab:"FY 2024–25",src:SRC.v25,rows:conv(QCP25)},
    y27:{src:SRC.est,rows:rows27,prevLab:"FY 2025–26 comparative appropriations",note:"Total appropriations from the Summary of Appropriations. The FY 2025–26 comparison is presented by the Government on the 2026-2027 budget structure. Conseil du trésor et Administration gouvernementale became Conseil du trésor, Administration gouvernementale et Efficacité de l'État."},
    gov:{title:"FY 2025–26 results vs budget",sub:"Consolidated statement of operations, whole government (audited)",src:SRC.v1,mul:1e6,G:QC_GOV,
      note:"Québec reported an annual operating deficit of $5.5 billion against a budgeted $11.4 billion, which included a $2.0 billion contingency reserve not shown in the expenditure column above. Net debt was $245.9 billion at March 31, 2026 (budget: $255.0 billion)."},
    year:{title:"What happened in FY 2025–26",pill:"21 of 25 over budget",cls:"up",src:[SRC.v1,SRC.v26],secs:[
     ["Key events",[
      ["Contingency reserve","The $2.0 billion contingency reserve in the budget was not used.","The Government says it was intended to offset the effects of slower-than-expected economic growth, among other things."],
      ["Public transit","Transports et Mobilité durable made $2.0 billion in advance payments for public transit, including $1.4 billion to the Société de transport de Montréal for the Blue line extension and $330 million to the City of Québec.",""],
      ["Hydro-Québec","Revenue from Hydro-Québec was $1.8 billion, in line with the forecast but $807 million lower than FY 2024–25.","The Government cites low runoff and extreme cold in winter 2026, which increased electricity purchases and reduced exports."]]],
     ["Met or beat the plan",[
      ["Deficit","The accounting deficit was $5.5 billion, against $11.4 billion budgeted. The budget balance under the Balanced Budget Act was a $7.8 billion deficit, against $13.6 billion budgeted.",""],
      ["Revenue","Revenue was $160.4 billion, $4.1 billion above budget, mostly from income and property taxes.","The Government cites nominal GDP growth of 4.7%, against 3.4% projected, with stronger growth in wages and corporate profits."],
      ["Portfolio spending","Portfolio expenditures were $155.8 billion, $320 million below the forecast.",""],
      ["Net debt","Net debt was $245.9 billion at March 31, 2026, against $255.0 billion budgeted.",""]]],
     ["Did not meet the plan",[
      ["Debt service","Debt service was $10.1 billion, $478 million above the forecast.","The Government cites higher-than-expected global long-term interest rates."],
      ["Federal transfers","Federal transfers were $807 million below budget, including $498 million less in health transfers.",""],
      ["Carbon market","Revenue from greenhouse gas emissions trading was $364 million below the forecast.","The Government cites a lower average price for units sold, linked to uncertainty about the California carbon market."],
      ["Spending over budget","21 of 25 portfolios spent more than their initial appropriations, mostly funded by transfers out of the Conseil du trésor portfolio ($15.3 billion), which holds the contingency fund. No department exceeded its annual appropriations. Special funds' expenditures exceeded the amounts approved by $2,604 million.",""]]]]},
    goals:{map:{},src:n=>null,
      how:"Québec departments report results against their strategic plan targets in an annual management report (rapport annuel de gestion). The 2025–26 reports had not been published when this page was built (November 2026).",
      next:"Results against strategic plan targets come with each department's annual management report.",
      none:"Québec departments report results against their strategic plan targets in an annual management report (rapport annuel de gestion). The 2025–26 reports had not been published when this page was built (November 2026), so none are shown here."},
    srcs:[SRC.v26,SRC.v25,SRC.est,SRC.v1]};
}

const PSC={}; const PSC_FN={abscore:pscAlberta,skscore:pscSask,mbscore:pscManitoba,nbscore:pscNB,nsscore:pscNS,nlscore:pscNL,pescore:pscPE,ykscore:pscYK,ntscore:pscNT,nuscore:pscNU,qcscore:pscQC};
const pscGet=id=>PSC[id]||(PSC[id]=PSC_FN[id]());
const pscSg=v=>v===0?fB(0):(v<0?"−":"+")+fB(Math.abs(v));

function pscHead(G,sub,intro){
  const h=G.how;
  return `<header class="dsh-head"><div><div class="kicker">${G.pfx} · ${G.unitS||(G.unit1==="ministry"?"Ministry":"Department")} dashboard</div><h2 class="nh">${sub||G.prov+" "+(G.unitP||(G.unit1==="ministry"?"Ministries":"Departments"))+" Scorecard · FY 2024–25 to FY 2026–27"}</h2>
   ${intro||`<p class="pagelede">${G.lede}</p><p class="pagelede">${G.lede2}</p>`}</div></header>
   <details class="flowdd fedhow"><summary><span><h2>How to read this page</h2><span class="ddhint">Click to see how budgets and spending fit together</span></span><span class="ddarrow" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6l4 4 4-4"/></svg></span></summary>
   <ol class="steps">
    <li class="yrhl"><b>Fiscal years, not calendar years.</b> ${G.prov}'s year runs April 1 to March 31, the same as the federal government. FY 2025–26 means April 1, 2025 to March 31, 2026. City scorecards use calendar years (January to December).</li>
    <li><b>A · Budget.</b> ${h.A}</li><li><b>B · Additional funding.</b> ${h.B}</li><li><b>C · Changes and transfers.</b> ${h.C}</li>
    <li><b>E · Total approved.</b> ${h.E} <b>Spent:</b> ${h.S} “Over budget” compares spending with the start-of-year budget (A).</li>
    <li><b>Goals.</b> ${G.goals?G.goals.how:`${G.prov}'s ${G.unit} publish plans and annual reports with performance measures. They are being added to this page.`}</li>
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
  const gy=g.yl||"FY 2025–26", gp=g.pl||"FY 2024–25";
  const head=["Item","Budget "+gy,"Actual "+gy,"Difference","Actual "+gp];
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
    [(dA<0?"Deficit":"Surplus")+" · "+(G.gov.yl||"FY 2025–26"),fB(Math.abs(dA)),fPill(dA>=dB?"ok":"off",dA>=dB?"Better than budget by "+fB(dA-dB):"Worse than budget by "+fB(dB-dA)),"Budget plan: "+(dB<0?"a "+fB(Math.abs(dB))+" deficit":"a "+fB(dB)+" surplus")+" (whole government)",""]
  ].map(fCard).join("")}</div>`;
  const rows=R.map((m,i)=>{const s=fSpend(m.T[0],m.T[4]),e=f27(m.k);
    return `<tr><th scope="row"><button class="linkbtn odgo" data-i="${i}">${fEsc(m.n)}</button></th><td>${fB(m.T[0])}</td><td>${fB(m.T[3])}</td><td>${fB(m.T[4])}</td>
     <td class="vcell ${s.cls}">${m.T[0]?vsSgn(m.T[4]-m.T[0],fB)+" <small>"+vsP(s.pc)+"</small>":'<span class="muted">No budget</span>'}</td><td>${e?fB(e.T[0]):'<span class="muted">—</span>'}</td></tr>`;}).join("");
  el.innerHTML=pscHead(G)+`<div class="dsh-kh">FY 2026–27 · current fiscal year (April 1, 2026 – March 31, 2027)<span><b class="fmil">All amounts in millions of dollars ($M).</b> ${G.latestNote||Y+" is the latest year with "+G.unit1+" results: they were released in fall 2026."}</span></div>${kp}
   <div class="sctwrap"><table class="sct fedtbl"><caption>${R.length} ${G.unit} · select one for its dashboard</caption><thead><tr><th scope="col">${G.unitS||(G.unit1==="ministry"?"Ministry":"Department")}</th><th scope="col">Budget<small class="fth">${Y}</small></th><th scope="col">Total approved<small class="fth">${Y}</small></th><th scope="col">Spent<small class="fth">${Y}</small></th><th scope="col">Spent vs budget<small class="fth">${Y}</small></th><th scope="col">Budget<small class="fth">FY 2026–27</small></th></tr></thead><tbody>${rows}
    <tr class="tot"><th scope="row">Total</th><td>${fB(b)}</td><td>${fB(t)}</td><td>${fB(a)}</td><td class="vcell ${sp.cls}">${vsSgn(a-b,fB)} <small>${vsP(sp.pc)}</small></td><td>${fB(e27)}</td></tr></tbody></table></div>
   <div class="note">${L.totNote?L.totNote+" ":""}${G.how.basis} FY 2026–27 totals use the Estimates' own basis; see each ${G.unit1}'s FY 2026–27 section. A “—” in the FY 2026–27 column means the ${G.unit1} was renamed or reorganized and has no direct match.</div>
   <div class="src">Sources: ${G.srcs.map(fA).join(" · ")}</div>
   ${G.year?`<h4 class="fgrp">What happened in the year</h4><div class="fstack">${fRoll("i","bs",G.year.title,"Highlights: key events and results against plan",G.year.pill||"",G.year.cls||"",pvYear(G.year.secs,G.year.src.map(fA).join(" · ")))}</div>`:""}
   <h4 class="fgrp">Government-wide results</h4><div class="fstack">${pscGov(G)}</div>`;
  el.querySelectorAll(".odgo").forEach(btn=>btn.onclick=()=>{pscMin(id,+btn.dataset.i); window.scrollTo(0,el.offsetTop-10);});
}
function pscBlock(G,m,Yr){
  const H=Yr.how?{...G.how,...Yr.how}:G.how;
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
    fRoll("A","bk","Budget","Start-of-year budget"+(P.length?", by program":""),fB(a),"",(progA||`<p class="note">${fEsc(pn||"")}</p>`)+`<p class="note">${H.A}</p>`+src)+
    fRoll("B","by","Additional funding","Added during the year",pscSg(b),"cau",`<p class="note">${H.B}</p>`+(progB.length?pscTbl("B · By program, "+Yr.lab,["Program","Amount"],progB):"")+src)+
    fRoll("C","by","Changes and transfers","Moved in, moved out or adjusted",pscSg(c),"cau",`<p class="note">${H.C}</p>`+(progC.length?pscTbl("C · By program, "+Yr.lab,["Program","Amount"],progC):"")+src)+
    fRoll("E","bk","Totals","Total approved and spending"+(P.length?" by program":""),fB(tot)+" approved","",progE+src)+`</div>`};
}

/* Goals: performance measures with targets, from each jurisdiction's annual reports. G.goals={map, how, sub, next, src(name)->[label,url], note} */
function pscGoals(G,m){
  const g=G.goals; if(!g) return `<h4 class="fgrp">Goals</h4><p class="note">Performance measures and results from the ${G.unit1}'s annual report are being added to this page.</p>`;
  const key=Object.keys(g.map).find(k=>PSC_K(k)===PSC_K(m.n)), L=key?g.map[key]:null, src=g.src(key||m.n);
  const sline=src?`<div class="src">Source: ${fA(src)}</div>`:"";
  if(!L||!L.length) return `<h4 class="fgrp">Goals</h4><p class="note">${(g.notes&&g.notes[key||m.n])||g.none||"No performance measures with targets were found in this "+G.unit1+"'s annual report."}</p>${sline}`;
  const pv=L.some(x=>x[1]&&x[1]!=="—"), tl='style="text-align:left"';
  const body=`<div class="sctwrap"><table class="sct fitems"><caption>${fEsc(g.cap||"Performance measures, FY 2025–26")}</caption><thead><tr><th scope="col" style="width:${pv?34:44}%">Measure</th>${pv?`<th scope="col" ${tl}>Previous result</th>`:""}<th scope="col" ${tl}>Target</th><th scope="col" ${tl}>Result</th></tr></thead><tbody>${L.map(x=>`<tr><td>${fEsc(x[0])}</td>${pv?`<td ${tl}>${fEsc(x[1]||"—")}</td>`:""}<td ${tl}>${fEsc(x[2]||"—")}</td><td ${tl}>${fEsc(x[3]||"—")}</td></tr>`).join("")}</tbody></table></div><p class="note">${g.note}</p>`;
  return `<h4 class="fgrp">Goals</h4><div class="fstack">`+fRoll(BC_GOAL,"bg","Goals and results",g.sub,L.length+(L.length===1?" measure":" measures"),"",body+sline)+`</div>`;
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
     ${G.goals?`<h4 class="fgrp">Goals</h4><p class="note">${G.goals.next}</p>`:`<h4 class="fgrp">Goals</h4><p class="note">Performance measures from the ${G.unit1}'s plan are being added to this page.</p>`}`
    :`<p class="fynote">FY 2026–27: April 1, 2026 – March 31, 2027.</p><p class="note">This ${G.unit1} has no direct match in the 2026–27 Estimates (renamed, merged or reorganized). ${fEsc(G.y27.note)}</p>`;
  const tabs=[["y27","FY 2026–27","Apr 1, 2026 – Mar 31, 2027 · this year"]];
  const panes={y27};
  if(G.y26){ tabs.push(["y26","FY 2025–26","Apr 1, 2025 – Mar 31, 2026 · final results"]); panes.y26=`<p class="fynote">FY 2025–26: April 1, 2025 – March 31, 2026. Results released in fall 2026. Click a section to open it.</p>${b1.cards}${b1.fin}${m.note?`<p class="note">${fEsc(m.note)}</p>`:""}${pscGoals(G,m)}`; }
  else tabs.push(["y26","FY 2025–26","Apr 1, 2025 – Mar 31, 2026 · not yet published"]), panes.y26=`<p class="note">${fEsc(G.latestNote||"")}</p>`;
  const y25b=G.y26?b0:b1, y25m=G.y26?m25:m;
  tabs.push(["y25","FY 2024–25","Apr 1, 2024 – Mar 31, 2025 · final results"]);
  panes.y25=y25b?`<p class="fynote">FY 2024–25: April 1, 2024 – March 31, 2025. Final results. Click a section to open it.</p>${G.y25.note?`<p class="note">${fEsc(G.y25.note)}</p>`:""}${y25m.y25note?`<p class="note">${fEsc(y25m.y25note)}</p>`:""}${y25m.n!==m.n?`<p class="note">In FY 2024–25 this ${G.unit1} was called ${fEsc(y25m.n)}.</p>`:""}${y25b.cards}${y25b.fin}`:`<p class="note">${G.y25?"No FY 2024–25 results for this "+G.unit1+" (it did not exist in its current form).":"FY 2024–25 results for "+G.prov+" are not on this page yet."}</p>`;
  const sel=G.y26?"y26":"y25";
  el.innerHTML=`<button class="chipbtn fback">← All ${L.rows.length} ${G.unit}</button>`+pscHead(G,m.n,`<p class="pagelede">${fEsc(m.n)}: budget and spending for FY 2024–25 to FY 2026–27.</p>`)+cards+`<div class="dsh">
    <nav class="dsh-rail" role="tablist" aria-orientation="vertical" aria-label="Sections"><div class="dsh-rl">Sections</div>${tabs.map(t=>`<button role="tab" id="pst-${t[0]}" aria-controls="psp-${t[0]}" aria-selected="${t[0]===sel}" tabindex="${t[0]===sel?0:-1}" data-k="${t[0]}"><span>${t[1]}</span><small>${t[2]}</small></button>`).join("")}</nav>
    <div class="dsh-main">${tabs.map(t=>`<div role="tabpanel" id="psp-${t[0]}" aria-labelledby="pst-${t[0]}" class="vspane" ${t[0]===sel?"":"hidden"}><h3 class="dsh-ph">${t[1]}<small>${t[2]}</small></h3>${panes[t[0]]}</div>`).join("")}</div></div>`;
  el.querySelector(".fback").onclick=()=>{pscOverview(id); window.scrollTo(0,el.offsetTop-10);};
  const bs=[...el.querySelectorAll(".dsh-rail button")];
  const pick=b=>bs.forEach(x=>{const on=x===b; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; el.querySelector("#psp-"+x.dataset.k).hidden=!on;});
  bs.forEach((b,j)=>{ b.onclick=()=>pick(b); b.onkeydown=ev=>{ const d=(ev.key==="ArrowDown"||ev.key==="ArrowRight")?1:(ev.key==="ArrowUp"||ev.key==="ArrowLeft")?-1:0; if(d){ const n=bs[(j+d+bs.length)%bs.length]; pick(n); n.focus(); ev.preventDefault(); } }; });
}
