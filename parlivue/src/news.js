/* ================= PARTIES, RIDINGS, NEWS ================= */
const PARTY={
 lib:{name:"Liberal Party of Canada",color:"var(--p-lib)",src:["Wikipedia: 30th Canadian Ministry","https://en.wikipedia.org/wiki/30th_Canadian_Ministry"]},
 ndp:{name:"BC NDP",color:"var(--p-ndp)",src:["Wikipedia: Eby ministry","https://en.wikipedia.org/wiki/Eby_ministry"]},
 con:{name:"Conservative Party of BC",color:"var(--p-con)",src:null},
 ind:{name:"No party label (municipal)",color:"var(--p-ind)",src:["Capital Daily, Oct 17 2026 results","https://www.capitaldaily.ca/news/greater-victoria-municipal-election-results-2026"]},
 ps:{name:"Non-partisan public servant",color:"var(--rule)",src:null}
};
const RIDING_SRC=["House of Commons: Ministry list","https://www.ourcommons.ca/members/en/ministries"];
const RIDING={carney:"Nepean, ON",ali:"Brampton—Chinguacousy Park, ON",alty:"Northwest Territories",anand:"Oakville East, ON",anandasangaree:"Scarborough—Guildwood—Rouge Park, ON",
 champagne:"Saint-Maurice—Champlain, QC",chartrand:"Churchill—Keewatinook Aski, MB",dabrusin:"Toronto—Danforth, ON",diab:"Halifax West, NS",fraser:"Central Nova, NS",
 gullmasty:"Abitibi—Baie-James—Nunavik—Eeyou, QC",hajdu:"Thunder Bay—Superior North, ON",hodgson:"Markham—Thornhill, ON",joly:"Ahuntsic-Cartierville, QC",leblanc:"Beauséjour, NB",
 lightbound:"Louis-Hébert, QC",macdonald:"Malpeque, PE",mackinnon:"Gatineau, QC",mcguinty:"Ottawa South, ON",mcknight:"Delta, BC",michel:"Papineau, QC",
 miller:"Ville-Marie—Le Sud-Ouest—Île-des-Soeurs, QC",olszewski:"Edmonton Centre, AB",robertson:"Vancouver Fraserview—South Burnaby, BC",sidhu:"Brampton East, ON",
 solomon:"Toronto Centre, ON",thompson:"St. John's East, NL",valdez:"Mississauga—Streetsville, ON"};
const SOS_RIDING={"Ruby Sahota":"Brampton North—Caledon, ON","Buckley Belanger":"Desnethé—Missinippi—Churchill River, SK","Stephen Fuhr":"Kelowna, BC","Anna Gainey":"Notre-Dame-de-Grâce—Westmount, QC",
 "Wayne Long":"Saint John—Kennebecasis, NB","Stephanie McLean":"Esquimalt—Saanich—Sooke, BC","Nathalie Provost":"Châteauguay—Les Jardins-de-Napierville, QC","Randeep Sarai":"Surrey Centre, BC",
 "Adam van Koeverden":"Burlington North—Milton West, ON","John Zerucelli":"Etobicoke North, ON"};

const BC_TRANSITION={
 text:"<b>Government in transition.</b> BC's snap election on Oct 24, 2026 gave the BC Conservatives a majority in preliminary results. Lorne Doerkson is premier-designate; he can be sworn in once results are certified, expected Nov 18. David Eby, who resigned as NDP leader on election night, remains premier until then. This wheel shows the outgoing NDP Cabinet, which will be replaced.",
 srcs:[["The Hub, Oct 26 2026","https://thehub.ca/2026/10/26/b-c-conservatives-win-majority-as-ebys-snap-election-gamble-ends-ndp-rule/"],["Victoria Buzz, Oct 26 2026","https://victoriabuzz.com/2026/10/whats-next-for-premier-elect-doerkson-and-the-bc-conservatives/"],["Wikipedia: 2026 BC general election","https://en.wikipedia.org/wiki/2026_British_Columbia_general_election"]]
};
const NOT_RUNNING_SRC=["Wikipedia: 2026 BC general election","https://en.wikipedia.org/wiki/2026_British_Columbia_general_election"];

// News items: summaries are written here in plain words; follow the source link for the full story.
/* Key events: only those that change a scorecard (budgets, Public Accounts, elections, Cabinet changes). Newest first. */
const NEWS=[
 {date:"2026-11-05",tag:"Budget",title:"Federal Budget 2026 tabled",text:"The federal budget sets out fiscal projections and new measures by department. It is not yet in the FY 2026–27 department figures; see the Budget 2026 page.",
  ents:[["federal","hub"]],go:"fedbudget",src:["Government of Canada: Budget 2026","https://budget.canada.ca"]},
 {date:"2026-11-01",tag:"Election",title:"Six federal by-elections called for December 7",text:"By-elections will be held on December 7, 2026. Results may change seat counts in the House of Commons.",
  ents:[["federal","hub"]],src:["PMO, Nov 1 2026","https://www.pm.gc.ca/en/news/news-releases/2026/11/01/prime-minister-carney-announces-elections"]},
 {date:"2026-10-24",tag:"Election",title:"B.C. election: BC Conservatives win a majority (preliminary)",text:"Lorne Doerkson is premier-designate and can be sworn in once results are certified, expected Nov 18. New ministries and FY 2026–27 plans may follow.",
  ents:[],people:[["Lorne Doerkson","con"],["David Eby","ndp"]],go:"bcscore",src:BC_TRANSITION.srcs[0]},
 {date:"2026-03-26",tag:"Budget",title:"Ontario 2026 Budget tabled",text:"Ontario's fiscal plan for FY 2026–27 to FY 2028–29: a $13.8 billion deficit planned for FY 2026–27.",
  ents:[],go:"onscore",src:["2026 Ontario Budget","https://budget.ontario.ca/2026/brief.html"]},
 {date:"2026-02-17",tag:"Budget",title:"B.C. Budget 2026 tabled",text:"B.C.'s fiscal plan and Estimates for FY 2026–27, with service plans for each ministry.",
  ents:[],go:"bcscore",src:["B.C. Budget 2026","https://www.bcbudget.gov.bc.ca/2026/"]}
];
/* Coming up: scheduled releases that will update the scorecards */
const COMING=[
 ["Nov 18, 2026","B.C. election results expected to be certified"],
 ["Nov 20, 2026","New B.C. Cabinet expected"],
 ["Dec 7, 2026","Six federal by-elections"],
 ["By Dec 31, 2026","Public Accounts of Canada for FY 2025–26 (audited federal results)"],
 ["Spring 2027","Federal Main Estimates and 2027–28 Departmental Plans; B.C. and Ontario budgets"],
 ["Summer–fall 2027","B.C. and Ontario Public Accounts for FY 2026–27"]
];
/* Site updates: data changes on ParliVue. Add a line each time a scorecard's data changes. Newest first. */
const SITE_UPDATES=[
 ["2026-11-08","onscore","Ontario Ministries Scorecard added: 35 ministries and offices, FY 2024–25 and FY 2025–26 Public Accounts, FY 2026–27 Estimates by program, key performance indicators from the 2025–26 plans, 2026 Budget fiscal plan."],
 ["2026-11-08","bcscore","B.C. scorecard completed: FY 2024–25 and FY 2025–26 goals, FY 2026–27 service plan targets, Budget 2026 fiscal plan, and a \"What happened in FY 2025–26\" panel."],
 ["2026-11-08","vicscore","Victoria and Mississauga scorecards: \"What happened in 2025\" panels added; timing and status-label notes moved into How to read."],
 ["2026-11-08","fedscore","Federal scorecard: FY 2025–26 Financials (Main and Supplementary Estimates, transfers) for all 31 departments, labelled not audited yet; 2026–27 Departmental Plans added."],
 ["2026-11-07","fedscore","Federal scorecard: FY 2026–27 Financials for all 31 departments; FY 2024–25 line items from the Public Accounts 2025."],
 ["2026-11-07","bcscore","B.C. Ministries Scorecard added: 27 ministries and offices."]
];


// Leadership changes (person out → person in)
const CHANGES=[
 {date:"2026-07-13",level:"Federal",seat:"Commissioner of Revenue (CRA)",out:"Bob Hamilton",in:"Heather Evans",ent:["federal","o_cra"],src:["CRA Commissioner page","https://www.canada.ca/en/revenue-agency/corporate/about-canada-revenue-agency-cra/commissioners.html"]},
 {date:"2026-03-23",level:"Federal",seat:"Deputy Minister of Veterans Affairs",in:"Nancy Gardiner",ent:["federal","o_vac"],src:["VAC department officials","https://www.veterans.gc.ca/en/about-vac/who-we-are/department-officials"]},
 {date:"2026-03-04",level:"Federal",seat:"Seven deputy minister posts",in:"Thangaraj (Foreign Affairs), Purves (Trade), Termorshuizen (Development), Vandergrift (Transport), Gallivan (IRCC), MacKinnon (DFO), Gardiner (VAC)",ent:["federal","o_gac"],src:["PMO, Mar 4 2026","https://www.pm.gc.ca/en/news/news-releases/2026/03/04/prime-minister-carney-announces-changes-senior-ranks-public-service"]},
 {date:"2026-01-28",level:"Federal",seat:"Deputy Minister of National Defence",out:"Stefanie Beck",in:"Christiane Fox",ent:["federal","o_dnd"],src:["Wikipedia: Stefanie Beck","https://en.wikipedia.org/wiki/Stefanie_Beck"]}
];
