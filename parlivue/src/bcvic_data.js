/* ================= BRITISH COLUMBIA ================= */
const BC_S = {
  cab:["The Canadian Press: List of the new B.C. Conservative cabinet (Nov 20 2026, via InfoNews)","https://infonews.ca/news/7990273/a-list-of-who-is-in-the-new-british-columbia-conservative-cabinet/"],
  mrn:["Maple Ridge News: B.C. Conservatives form government as new cabinet ministers are sworn in (Nov 20 2026)","https://mapleridgenews.com/2026/11/20/b-c-conservatives-form-government-as-new-cabinet-ministers-are-sworn-in/"],
  dm:["BC Deputy Ministers' Council page (updated Oct 26 2026, before the change of government)","https://www2.gov.bc.ca/gov/content/governments/organizational-structure/cabinet/deputy-ministers"],
  psa:["Public Service Act, s. 12","https://free.bcpublications.ca/civix/document/id/consol3/consol3/96385_01"]
};
const BC_SECTORS=[
 {id:"centre",label:"Finance & Government",ids:["milobar","banman"]},
 {id:"econ",label:"Economy & Work",ids:["dew","kneufeld"]},
 {id:"infra",label:"Housing & Infrastructure",ids:["ounsted","halford"]},
 {id:"res",label:"Resources & Energy",ids:["lneufeld","giddens","paton","wilson"]},
 {id:"ind",label:"Lands & Reconciliation",ids:["mcinnis","warbus"]},
 {id:"people",label:"People & Communities",ids:["peterson","block","loewen","rattee"]},
 {id:"global",label:"Safety & Justice",ids:["elliott","sahota"]}
];
/* Doerkson Cabinet, sworn in Nov 20, 2026. Titles follow The Canadian Press list; the Government of BC had not yet published its Executive Council page. */
const BC_MIN=[
 {id:"rattee",name:"Claire Rattée",short:"Rattée",title:"Minister of Social Development and Deputy Premier",links:["sd"]},
 {id:"milobar",name:"Peter Milobar",title:"Minister of Finance",links:["fin"]},
 {id:"mcinnis",name:"Scott McInnis",title:"Minister of Indigenous Relations and Reconciliation",links:["irr"]},
 {id:"peterson",name:"Ryan Peterson",title:"Minister of Health",links:["hlth"]},
 {id:"paton",name:"Ian Paton",title:"Minister of Agriculture",links:["agri"]},
 {id:"banman",name:"Bruce Banman",title:"Minister of Citizens' Services and Technology",links:["cst"],note:"One news report (Maple Ridge News) lists Gavin Dew for this ministry. The Canadian Press list, used here, names Bruce Banman."},
 {id:"dew",name:"Gavin Dew",title:"Minister of Economic Development and Tourism",links:["edt"]},
 {id:"lneufeld",name:"Larry Neufeld",short:"L. Neufeld",title:"Minister of Energy, Mines and Petroleum Resources",links:["emp"]},
 {id:"kneufeld",name:"Korky Neufeld",short:"K. Neufeld",title:"Minister of Post-Secondary Education and Labour",links:["psel"]},
 {id:"warbus",name:"A'aliya Warbus",title:"Minister of Environment",links:["env"]},
 {id:"loewen",name:"Kristina Loewen",title:"Minister of Children and Family Development",links:["mcfd"]},
 {id:"block",name:"Lynne Block",title:"Minister of Education and Child Care",links:["ecc"]},
 {id:"giddens",name:"Kiel Giddens",title:"Minister of Forests",links:["for"]},
 {id:"ounsted",name:"Cathie Ounsted",title:"Minister of Local Government, Housing, Sport and Culture",links:["lhsc"]},
 {id:"halford",name:"Trevor Halford",title:"Minister of Transportation and Infrastructure",links:["ti"]},
 {id:"sahota",name:"Jessy Sahota",title:"Minister of Public Safety and Solicitor General",links:["pssg"]},
 {id:"wilson",name:"Donegal Wilson",title:"Minister of Water, Land and Natural Resource Operations",links:["wlnro"]},
 {id:"elliott",name:"Caroline Elliott",title:"Attorney General",links:["ag"]}
];
const dm=(name,role,extra)=>({name,role,status:"A",src:"dm",...(extra||{})});
/* Deputy ministers: the new government had not announced its deputy ministers on Nov 20, 2026.
   Where a ministry kept its name, the deputy listed on Oct 26, 2026 is shown and labelled as such. */
const DM_OLD=" (listed Oct 26, 2026; not yet confirmed by the new government)";
const dmo=(name,role)=>dm(name,role+DM_OLD,{status:"C"});
const BC_OUT=[
 {id:"premier",abbr:"Premier",name:"Office of the Premier",heads:[dmo("Shannon Salter","Deputy Minister to the Premier, Cabinet Secretary and Head of the Public Service")]},
 {id:"sd",abbr:"SD",name:"Ministry of Social Development",heads:[],desc:"New ministry name. Previously Social Development and Poverty Reduction."},
 {id:"fin",abbr:"FIN",name:"Ministry of Finance",heads:[dmo("Jonathan Dubé","Acting Deputy Minister")]},
 {id:"irr",abbr:"IRR",name:"Ministry of Indigenous Relations and Reconciliation",heads:[dmo("Alex MacLennan","Deputy Minister")]},
 {id:"hlth",abbr:"HLTH",name:"Ministry of Health",heads:[dmo("Cynthia Johansen","Deputy Minister")]},
 {id:"agri",abbr:"AGRI",name:"Ministry of Agriculture",heads:[],desc:"New ministry name. Previously Agriculture and Food."},
 {id:"cst",abbr:"CST",name:"Ministry of Citizens' Services and Technology",heads:[],desc:"New ministry name. Previously Citizens' Services."},
 {id:"edt",abbr:"EDT",name:"Ministry of Economic Development and Tourism",heads:[],desc:"New ministry."},
 {id:"emp",abbr:"EMPR",name:"Ministry of Energy, Mines and Petroleum Resources",heads:[],desc:"New ministry."},
 {id:"psel",abbr:"PSEL",name:"Ministry of Post-Secondary Education and Labour",heads:[],desc:"New ministry."},
 {id:"env",abbr:"ENV",name:"Ministry of Environment",heads:[],desc:"New ministry name. Previously Environment and Parks."},
 {id:"mcfd",abbr:"MCFD",name:"Ministry of Children and Family Development",heads:[dmo("Keith M. Godin","Deputy Minister")]},
 {id:"ecc",abbr:"ECC",name:"Ministry of Education and Child Care",heads:[dmo("Kathryn Krishna","Deputy Minister")]},
 {id:"for",abbr:"FOR",name:"Ministry of Forests",heads:[dmo("Makenzie Leine","Deputy Minister")]},
 {id:"lhsc",abbr:"LGHSC",name:"Ministry of Local Government, Housing, Sport and Culture",heads:[],desc:"New ministry."},
 {id:"ti",abbr:"TI",name:"Ministry of Transportation and Infrastructure",heads:[],desc:"New ministry."},
 {id:"pssg",abbr:"PSSG",name:"Ministry of Public Safety and Solicitor General",heads:[dmo("Tara Richards","Deputy Solicitor General")]},
 {id:"wlnro",abbr:"WLNRO",name:"Ministry of Water, Land and Natural Resource Operations",heads:[],desc:"New ministry."},
 {id:"ag",abbr:"AG",name:"Ministry of Attorney General",heads:[dmo("Barbara Carmichael","Deputy Attorney General")]}
];
const BC_MOS=[["Harman Bhangu","Labour"],["Carson Binda","Red Tape Reduction"],["Ward Stamer","Emergency Management"],["Anna Kindy","Rural Development"],["Pete Davis","Mining"],["Zeeshan Wahla","Housing"]];
const BC_PS=[["Rosalyn Bird","Armed Forces and Veterans Affairs"],["Margareta Dovgal","Children and Youth with Special Needs"],["Steve Kooner","Insurance Corporation of British Columbia"],["Misty Van Popta","Infrastructure"],["Megan Knight","Metro Vancouver"],["Tracy St. Claire","Rural Health"],["Sharon Hartwell","Seniors"],["Mandeep Dhaliwal","Sport and Culture"],["Sacha Peter","Technology and Innovation"],["Jody Toor","Tourism"],["Harj Dhaliwal","TransLink"],["Bryan Tepper","Urban Policing"]];

/* ================= CITY OF VICTORIA ================= */
const VIC_S = {
  elec:["City of Victoria: 2026 Declaration of Official Election Results (certified Oct 21, 2026)","https://www.victoria.ca/media/file/declaration-official-results-2026-municipal-election"],
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
