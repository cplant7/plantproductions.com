/* ================= BRITISH COLUMBIA ================= */
const BC_S = {
  cab:["BC Executive Council page (updated Sep 8 2026)","https://www2.gov.bc.ca/gov/content/governments/organizational-structure/cabinet/cabinet-ministers"],
  dm:["BC Deputy Ministers' Council page (updated Oct 26 2026)","https://www2.gov.bc.ca/gov/content/governments/organizational-structure/cabinet/deputy-ministers"],
  aug:["BC Gov News, cabinet changes Aug 14 2026","https://news.gov.bc.ca/releases/2026PREM0057-000949"],
  psa:["Public Service Act, s. 12","https://free.bcpublications.ca/civix/document/id/consol3/consol3/96385_01"]
};
const BC_SECTORS=[
 {id:"centre",label:"Finance & Government",ids:["osborne","gibson","lore"]},
 {id:"econ",label:"Economy & Work",ids:["bailey","whiteside","kang"]},
 {id:"infra",label:"Housing & Infrastructure",ids:["boyle","ma","farnworth"]},
 {id:"res",label:"Resources & Energy",ids:["dix","parmar","brar","popham"]},
 {id:"ind",label:"Lands & Reconciliation",ids:["chandraherbert","neill","davidson"]},
 {id:"people",label:"People & Communities",ids:["kahlon","beare","sunner","wickens","malcolmson"]},
 {id:"global",label:"Safety & Justice",ids:["sharma","krieger","greene"]}
];
const BC_MIN=[
 {id:"osborne",name:"Josie Osborne",title:"Minister of Finance",links:["fin"],note:"Moved from Health to Finance on Aug 14, 2026."},
 {id:"gibson",name:"Diana Gibson",title:"Minister of Citizens' Services",links:["citz"]},
 {id:"lore",name:"Grace Lore",title:"Minister without Portfolio",links:[],note:"A Cabinet member with no ministry of her own, so no department link is drawn."},
 {id:"bailey",name:"Brenda Bailey",title:"Minister of Jobs and Economic Growth",links:["jedi"],note:"Did not seek re-election on Oct 24, 2026. Moved from Finance on Aug 14, 2026. The release says Adrian Dix will cover her portfolio while she is on leave. The ministry is listed as Jobs, Economic Development and Innovation on the deputy ministers' page."},
 {id:"whiteside",name:"Jennifer Whiteside",title:"Minister of Labour",links:["lbr"]},
 {id:"kang",name:"Anne Kang",title:"Minister of Tourism, Arts, Culture and Sport",links:["tacs"]},
 {id:"boyle",name:"Christine Boyle",title:"Minister of Housing and Municipal Affairs",links:["hma"]},
 {id:"ma",name:"Bowinn Ma",title:"Minister of Infrastructure",links:["inf"]},
 {id:"farnworth",name:"Mike Farnworth",title:"Minister of Transportation and Transit",links:["mott"]},
 {id:"dix",name:"Adrian Dix",title:"Minister of Energy and Climate Solutions and Minister responsible for Francophone Affairs",links:["ecs"],note:"Also covering the Jobs portfolio while Brenda Bailey is on leave (Aug 14, 2026 release)."},
 {id:"parmar",name:"Ravi Parmar",title:"Minister of Forests",links:["for"]},
 {id:"brar",name:"Jagrup Brar",title:"Minister of Mining and Critical Minerals",links:["mcm"]},
 {id:"popham",name:"Lana Popham",title:"Minister of Agriculture and Food",links:["agri"]},
 {id:"chandraherbert",name:"Spencer Chandra Herbert",title:"Minister of Indigenous Relations and Reconciliation",links:["irr"]},
 {id:"neill",name:"Randene Neill",title:"Minister of Water, Land and Resource Stewardship",links:["wlrs"]},
 {id:"davidson",name:"Tamara Davidson",title:"Minister of Environment and Parks",links:["env"]},
 {id:"kahlon",name:"Ravi Kahlon",title:"Minister of Health",links:["hlth"],note:"Moved from Jobs and Economic Growth to Health on Aug 14, 2026. Did not seek re-election on Oct 24, 2026."},
 {id:"beare",name:"Lisa Beare",title:"Minister of Education and Child Care",links:["ecc"]},
 {id:"sunner",name:"Jessie Sunner",title:"Minister of Post-Secondary Education and Future Skills",links:["psfs"]},
 {id:"wickens",name:"Jodie Wickens",title:"Minister of Children and Family Development",links:["mcfd"]},
 {id:"malcolmson",name:"Sheila Malcolmson",title:"Minister of Social Development and Poverty Reduction",links:["sdpr"]},
 {id:"sharma",name:"Niki Sharma",title:"Attorney General and Deputy Premier",links:["ag"]},
 {id:"krieger",name:"Nina Krieger",title:"Minister of Public Safety and Solicitor General",links:["pssg"]},
 {id:"greene",name:"Kelly Greene",title:"Minister of Emergency Management and Climate Readiness",links:["emcr"]}
];
const dm=(name,role,extra)=>({name,role,status:"A",src:"dm",...(extra||{})});
const BC_OUT=[
 {id:"premier",abbr:"Premier",name:"Office of the Premier",heads:[dm("Shannon Salter","Deputy Minister to the Premier, Cabinet Secretary and Head of the Public Service"),dm("Leslie Teramoto","Deputy Minister, Intergovernmental Relations Secretariat"),dm("Tom McCarthy","Deputy Minister, Policy and Coordination")]},
 {id:"fin",abbr:"FIN",name:"Ministry of Finance",heads:[dm("Jonathan Dubé","Acting Deputy Minister",{also:"The page's photo caption gives a different title (Associate Deputy Minister and Deputy Secretary to Treasury Board)."}),dm("Debbie Godfrey","Deputy Minister, Head of the BC Public Service Agency"),dm("Sage Aaron","Deputy Minister, Government Communications and Public Engagement")]},
 {id:"citz",abbr:"CITZ",name:"Ministry of Citizens' Services",heads:[dm("Hayden Lansdell","Deputy Minister")]},
 {id:"jedi",abbr:"JEDI",name:"Ministry of Jobs, Economic Development and Innovation",heads:[dm("Fazil Mihlar","Deputy Minister")]},
 {id:"lbr",abbr:"LBR",name:"Ministry of Labour",heads:[dm("Lorie Hrycuik","Deputy Minister")]},
 {id:"tacs",abbr:"TACS",name:"Ministry of Tourism, Arts, Culture and Sport",heads:[dm("Silas Brownsey","Deputy Minister")]},
 {id:"hma",abbr:"HMA",name:"Ministry of Housing and Municipal Affairs",heads:[dm("Teri Collins","Deputy Minister")]},
 {id:"inf",abbr:"INF",name:"Ministry of Infrastructure",heads:[dm("Bobbi Plecas","Deputy Minister")]},
 {id:"mott",abbr:"MOTT",name:"Ministry of Transportation and Transit",heads:[dm("Heather Wood","Deputy Minister")]},
 {id:"ecs",abbr:"ECS",name:"Ministry of Energy and Climate Solutions",heads:[dm("Peter Pokorny","Deputy Minister")]},
 {id:"for",abbr:"FOR",name:"Ministry of Forests",heads:[dm("Makenzie Leine","Deputy Minister")]},
 {id:"mcm",abbr:"MCM",name:"Ministry of Mining and Critical Minerals",heads:[dm("Nathaniel Amann-Blake","Deputy Minister")]},
 {id:"agri",abbr:"AGRI",name:"Ministry of Agriculture and Food",heads:[dm("Michelle Koski","Deputy Minister"),dm("Erin McEwan","Acting General Manager and CEO, Liquor Distribution Branch")]},
 {id:"irr",abbr:"IRR",name:"Ministry of Indigenous Relations and Reconciliation",heads:[dm("Alex MacLennan","Deputy Minister",{also:"The page's photo caption says Associate Deputy Minister."})]},
 {id:"wlrs",abbr:"WLRS",name:"Ministry of Water, Land and Resource Stewardship",heads:[dm("Lori Halls","Deputy Minister")]},
 {id:"env",abbr:"ENV",name:"Ministry of Environment and Parks",heads:[dm("Kevin Jardine","Deputy Minister")]},
 {id:"hlth",abbr:"HLTH",name:"Ministry of Health",heads:[dm("Cynthia Johansen","Deputy Minister")]},
 {id:"ecc",abbr:"ECC",name:"Ministry of Education and Child Care",heads:[dm("Kathryn Krishna","Deputy Minister")]},
 {id:"psfs",abbr:"PSFS",name:"Ministry of Post-Secondary Education and Future Skills",heads:[dm("Trevor Hughes","Deputy Minister")]},
 {id:"mcfd",abbr:"MCFD",name:"Ministry of Children and Family Development",heads:[dm("Keith M. Godin","Deputy Minister")]},
 {id:"sdpr",abbr:"SDPR",name:"Ministry of Social Development and Poverty Reduction",heads:[dm("Raymond Fieltsch","Acting Deputy Minister")]},
 {id:"ag",abbr:"AG",name:"Ministry of Attorney General",heads:[dm("Barbara Carmichael","Deputy Attorney General")]},
 {id:"pssg",abbr:"PSSG",name:"Ministry of Public Safety and Solicitor General",heads:[dm("Tara Richards","Deputy Solicitor General")]},
 {id:"emcr",abbr:"EMCR",name:"Ministry of Emergency Management and Climate Readiness",heads:[dm("Teresa Dobmeier","Deputy Minister")]}
];
const BC_MOS=[["Brittny Anderson","Local Governments and Rural Communities"],["Rick Glumac","Artificial Intelligence and New Technologies"],["Terry Yung","Community Safety and Integrated Services"]];

/* ================= CITY OF VICTORIA ================= */
const VIC_S = {
  elec:["City of Victoria, Election 2026 preliminary results","https://www.victoria.ca/city-government/news/victoria-election-2026-preliminary-results"],
  ar:["City of Victoria Annual Report 2025 (leadership as of Dec 31 2025)","https://www.victoria.ca/media/file/annual-report-2025"],
  fp:["2026–2030 Financial Plan (adopted May 7 2026)","https://www.victoria.ca/media/file/2026-2030-financial-plan"],
  budget:["City Budget page","https://www.victoria.ca/city-government/city-budget"],
  fire:["CTV News, Sep 30 2026","https://www.ctvnews.ca/vancouver/vancouver-island/article/victoria-fire-chief-flags-concerns-with-unions-civic-election-campaign/"],
  pb:["Victoria and Esquimalt Police Board page","https://www.victoria.ca/city-government/boards-and-committees/victoria-and-esquimalt-police-board"],
  adp:["Advisory Design Panel page","https://www.victoria.ca/city-government/boards-and-committees/advisory-design-panel"],
  hap:["Heritage Advisory Panel page","https://www.victoria.ca/city-government/boards-and-committees/heritage-advisory-panel"],
  aac:["Accessibility Advisory Committee page","https://www.victoria.ca/city-government/boards-and-committees/accessibility-advisory-committee"],
  rac:["Renters' Advisory Committee page","https://www.victoria.ca/city-government/boards-and-committees/renters-advisory-committee"],
  wca:["Welcoming City Advisory Committee page","https://www.victoria.ca/city-government/boards-and-committees/welcoming-city-advisory-committee"],
  aipp:["Art in Public Places Committee page","https://www.victoria.ca/city-government/boards-and-committees/art-public-places-committee"],
  bov:["Board of Variance page","https://www.victoria.ca/city-government/boards-and-committees/board-variance"],
  roles:["Province of BC: Mayor and councillors","https://www2.gov.bc.ca/gov/content/governments/local-governments/governance-powers/councils-boards/municipal-council-organization/mayor-councillors"],
  cao:["UBCM: Statutory officials (Community Charter s. 147)","https://www.ubcm.ca/sites/default/files/2022-12/19%20STATUTORY%20OFFICIALS.pdf"],
  guide:["2026 Candidate Profile Guide","https://www.victoria.ca/media/file/candidate-profile-guide-2026"]
};
const VIC_SECTORS=[
 {id:"centre",label:"Council",ids:["bowkett","caradonna","cseszko","dell","gardiner","hammond","sandor","thompson","cow"]},
 {id:"infra",label:"Administration",ids:["cm"]},
 {id:"global",label:"Independent Boards",ids:["pboard","lboard"]}
];
const cl=(id,name,isNew)=>({id,name,title:"Councillor",links:[],w:1,isNew,role:"councillor"});
const VIC_IN=[
 cl("bowkett","Wendy Bowkett",true), cl("caradonna","Jeremy Caradonna",false), cl("cseszko","Melissa Cseszko",true), cl("dell","Matt Dell",false),
 cl("gardiner","Marg Gardiner",false), cl("hammond","Stephen Hammond",false), cl("sandor","Jack Sandor",true), cl("thompson","Dave Thompson",false),
 {id:"cow",name:"Committee of the Whole",short:"Whole Council",title:"The Mayor and all eight councillors sitting as a committee",links:["adp","hap","bov","aac","rac","wca","aipp"],w:2.5,role:"cow",budget:945240,budgetLabel:"Council"},
 {id:"cm",name:"Jocelyn Jenkyns",short:"City Manager",title:"City Manager (Chief Administrative Officer)",links:["cswp","bcr","comms","epw","fac","finance","it","legal","leg","parks","pc","plan","fire"],w:13,role:"cm",budget:1277890,status:"A",src:"ar"},
 {id:"pboard",name:"Victoria and Esquimalt Police Board",short:"Police Board",title:"Civilian oversight of the Victoria Police Department",links:["vicpd"],w:1.6,role:"pboard",src:"pb"},
 {id:"lboard",name:"Greater Victoria Public Library Board",short:"Library Board",title:"Governs the regional library the City helps fund",links:["gvpl"],w:1.6,role:"lboard"}
];
const vh=(name,role,extra)=>({name,role,status:"A",src:"ar",...(extra||{})});
const VIC_OUT=[
 {id:"cswp",abbr:"Comm Safety",name:"Community Safety, Wellbeing and Partnerships",budget:15991980,heads:[vh("Peter Rantucci","Director, Community Safety, Wellbeing and Strategic Partnerships")],
   lines:[["Community Safety and Bylaw Services",9403800],["Corporate Planning and Strategic Projects",984230],["Initiatives",2786270],["Strategic Real Estate",2817680]]},
 {id:"bcr",abbr:"Business",name:"Business and Community Relations",budget:16033630,heads:[vh("Kerri Moore","Director, Business and Community Relations")],
   lines:[["Business and Community Relations",8258630],["Victoria Conference Centre event flow-through",7775000]]},
 {id:"comms",abbr:"Comms",name:"Communications and Engagement",budget:2891680,heads:[vh("Sheldon Johnson","Director, Communications and Engagement")]},
 {id:"epw",abbr:"Engineering",name:"Engineering and Public Works",budget:80932610,heads:[vh("William Doyle","Director, Engineering and Public Works")],
   lines:[["Engineering and Public Works",30897900],["Water Utility",28814990],["Sewer Utility",10767960],["Stormwater Utility",10451760]]},
 {id:"fac",abbr:"Facilities",name:"Facilities",budget:8986220,heads:[{name:"Not named",role:"The annual report's org chart shows a Facilities Director but gives no name",status:"U",src:"ar"}]},
 {id:"finance",abbr:"Finance",name:"Finance",budget:15252700,heads:[vh("Susanne Thompson","Deputy City Manager and Chief Financial Officer")],lines:[["Finance",5990660],["Parking Services",9262040]]},
 {id:"it",abbr:"IT",name:"Information Technology",budget:8406980,heads:[vh("Mike Palmer","Chief Information Officer")]},
 {id:"legal",abbr:"Legal",name:"Legal Services",budget:1381160,heads:[vh("Stacey Grubb","City Solicitor")]},
 {id:"leg",abbr:"Legislative",name:"Legislative Services",budget:2316750,heads:[vh("Curt Kingsley","City Clerk")]},
 {id:"parks",abbr:"Parks & Rec",name:"Parks and Recreation",budget:23875750,heads:[vh("Derrick Newman","Director, Parks and Recreation")]},
 {id:"pc",abbr:"People",name:"People and Culture",budget:5499760,heads:[vh("Jodi Jensen","Director, People and Culture")]},
 {id:"plan",abbr:"Planning",name:"Planning and Development",budget:14008920,heads:[vh("Karen Hoese","Director, Planning and Development")]},
 {id:"fire",abbr:"Fire",name:"Victoria Fire Department",budget:24468330,heads:[vh("Daniel Atkinson","Fire Chief",{also:"Also named as Fire Chief by CTV News on Sep 30, 2026."})]},
 {id:"vicpd",abbr:"VicPD",name:"Victoria Police Department",budget:94989170,heads:[vh("Fiona Wilson","Chief Constable")],note:"Serves Victoria and Esquimalt. The budget shown is the City of Victoria's line for police."},
 {id:"gvpl",abbr:"Library",name:"Greater Victoria Public Library",budget:6859720,heads:[],note:"The budget shown is the City of Victoria's contribution. Library leadership wasn't part of this research."},
 {id:"adp",abbr:"Design",name:"Advisory Design Panel",kind:"advisory",heads:[],src:"adp",desc:"Advises Council on the design merits of rezonings, development permits and special projects referred to it. Meets monthly."},
 {id:"hap",abbr:"Heritage",name:"Heritage Advisory Panel",kind:"advisory",heads:[],src:"hap"},
 {id:"bov",abbr:"Variance",name:"Board of Variance",kind:"advisory",heads:[],src:"bov"},
 {id:"aac",abbr:"Access",name:"Accessibility Advisory Committee",kind:"advisory",heads:[],src:"aac"},
 {id:"rac",abbr:"Renters",name:"Renters' Advisory Committee",kind:"advisory",heads:[],src:"rac"},
 {id:"wca",abbr:"Welcoming",name:"Welcoming City Advisory Committee",kind:"advisory",heads:[],src:"wca"},
 {id:"aipp",abbr:"Public Art",name:"Art in Public Places Committee",kind:"advisory",heads:[],src:"aipp"}
];
const VIC_OTHER_BUDGET=[["Corporate (city-wide costs)",57472780],["Grants",4360120],["One-time items",8108650]];
const VIC_TOTAL=394060040;
