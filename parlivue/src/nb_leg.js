/* ================= NEW BRUNSWICK: LEGISLATIVE ASSEMBLY ================= */
const NB_S={
 mla:["Legislative Assembly of New Brunswick: Current members","https://www.legnb.ca/en/members/current"],
 plan:["Legislative Assembly of New Brunswick: Members (seating plan dated October 20, 2026)","https://www.legnb.ca/en/members/current"],
 cab:["Government of New Brunswick: Members of Executive Council","https://www.gnb.ca/en/gov/contacts/members-executive-council.html"],
 dm:["Government of New Brunswick: Senior government leadership changes, August 29 2025","https://www.gnb.ca/en/news/n-b.2025.08.senior-government-leadership-changes.html"],
 off:["Legislative Assembly of New Brunswick: Legislative officers","https://www.legnb.ca/en/legislative-officers"],
 lg:["Wikipedia: Lieutenant Governor of New Brunswick","https://en.wikipedia.org/wiki/Lieutenant_Governor_of_New_Brunswick"],
 leg:["Wikipedia: Legislative Assembly of New Brunswick","https://en.wikipedia.org/wiki/Legislative_Assembly_of_New_Brunswick"],
 bye:["Wikipedia: 2025 Miramichi West provincial by-election","https://en.wikipedia.org/wiki/2025_Miramichi_West_provincial_by-election"]
};
// [name, riding, party, column, row]  columns: Liberal side 1-4 from the wall to the aisle, Opposition side 5-6 from the aisle out
const NB_GRID=`Jacques LeBlanc|Shediac-Cap-Acadie|lib|1|1
Alexandre Cédric Doucet|Moncton East|lib|1|2
Natacha Vautour|Dieppe-Memramcook|lib|1|3
Tania Sodhi|Moncton Northwest|lib|1|4
Sam Johnston|Miramichi Bay-Neguac|lib|1|5
Luc Robichaud|Hautes-Terres-Nepisiguit|lib|1|6
Alyson Townsend|Rothesay|lib|2|1
Luke Randall|Fredericton North|lib|2|2
Aaron Kennedy|Quispamsis|lib|2|3
David Hickey|Saint John Harbour|lib|2|4
Kate Wilcott|Saint John West-Lancaster|lib|2|5
Eric Mallet|Shippagan-Les-Îles|lib|2|6
Guy Arseneault|Restigouche East|lib|2|7
Benoît Bourque|Beausoleil-Grand-Bouctouche-Kent|lib|2|8
Jean-Claude D'Amours|Edmundston-Vallée-des-Rivières|lib|3|1
Rob McKee|Moncton Centre|lib|3|2
Isabelle Thériault|Caraquet|lib|3|3
Chuck Chiasson|Grand Falls-Vallée-des-Rivières-Saint-Quentin|lib|3|4
Lyne Chantal Boudreau|Champdoré-Irishtown|lib|3|5
Keith Chiasson|Tracadie|lib|3|6
Pat Finnigan|Kent North|lib|3|7
John Herron|Hampton-Fundy-St. Martins|lib|3|8
Robert Gauvin|Shediac Bay-Dieppe|lib|4|1
Marco LeBlanc|Belle-Baie-Belledune|lib|4|2
Susan Holt|Fredericton South-Silverwood|lib|4|3
René Legacy|Bathurst|lib|4|4
Cindy Miles|Hanwell-New Maryland|lib|4|5
John Dornan|Saint John Portland-Simonds|lib|4|6
Claire Johnson|Moncton South|lib|4|7
Gilles LePage|Restigouche West|lib|4|8
Bill Hogan|Woodstock-Hartland|pc|5|1
Glen Savoie|Saint John East|pc|5|2
Margaret Johnson|Carleton-Victoria|pc|5|3
Tammy Scott-Wallace|Sussex-Three Rivers|pc|5|4
Don Monahan|Arcadia-Butternut Valley-Maple Hills|pc|5|5
Kris Austin|Fredericton-Grand Lake|pc|5|6
Richard Ames|Carleton-York|pc|5|7
Mary Wilson|Oromocto-Sunbury|pc|5|8
David Coon|Fredericton Lincoln|grn|5|9
Rob Weir|Riverview|pc|6|1
Michelle Conroy|Miramichi East|pc|6|2
Bill Oliver|Kings Centre|pc|6|3
Kevin Russell|Miramichi West|pc|6|4
Sherry Wilson|Albert-Riverview|pc|6|5
Ryan Cullins|Fredericton-York|pc|6|6
Kathy Bockus|Saint Croix|pc|6|7
Ian Lee|Fundy-The Isles-Saint John Lorneville|pc|6|8
Megan Mitton|Tantramar|grn|6|9
Francine Landry|Madawaska Les Lacs-Edmundston|lib|0|0`;
const NB_COLX=[0,108,219,329,439,795,906], NB_ROWY=r=>129+(r-1)*53.5;
const NB_SEATS={}; NB_GRID.split("\n").forEach(l=>{ const [n,,,c,r]=l.split("|"); if(+c) NB_SEATS[n]=[NB_COLX[+c],NB_ROWY(+r)]; });
const NB_MIN=[
 {id:"legacy",name:"René Legacy",title:"Deputy Premier; Minister of Finance and Treasury Board; Minister responsible for Energy and for the Right to Information and Protection of Privacy Act",links:["fin","en"]},
 {id:"dornan",name:"John Dornan",title:"Minister of Health",links:["hlth"]},
 {id:"cjohnson",name:"Claire Johnson",title:"Minister of Education and Early Childhood Development",links:["edu"]},
 {id:"mckee",name:"Rob McKee",title:"Minister of Justice and Attorney General; Minister responsible for Addictions and Mental Health Services",links:["jps"]},
 {id:"gauvin",name:"Robert Gauvin",title:"Minister of Public Safety; Minister responsible for la Francophonie",links:["jps"]},
 {id:"miles",name:"Cindy Miles",title:"Minister of Social Development; Minister responsible for the Economic and Social Inclusion Corporation",links:["sd"]},
 {id:"hickey",name:"David Hickey",title:"Minister responsible for the New Brunswick Housing Corporation",links:["nbhc"]},
 {id:"townsend",name:"Alyson Townsend",title:"Minister of Post-Secondary Education, Training and Labour; Minister responsible for the Research and Productivity Council and the Regulatory Accountability and Reporting Act",links:["petl"],note:"The Government of New Brunswick also lists Jean-Claude D'Amours as acting minister for this department."},
 {id:"damours",name:"Jean-Claude D'Amours",title:"Minister of Intergovernmental Affairs; Minister responsible for Immigration and for Military Affairs; Minister of Post-Secondary Education, Training and Labour (acting)",links:["iga","petl"]},
 {id:"cchiasson",name:"Chuck Chiasson",title:"Minister of Transportation and Infrastructure",links:["dti"]},
 {id:"kennedy",name:"Aaron Kennedy",title:"Minister of Local Government; Minister responsible for Service New Brunswick",links:["lg","snb"]},
 {id:"lepage",name:"Gilles LePage",title:"Minister of Environment and Climate Change; Minister responsible for the Regional Development Corporation",links:["ecc","rdc"]},
 {id:"herron",name:"John Herron",title:"Minister of Natural Resources",links:["nr"]},
 {id:"finnigan",name:"Pat Finnigan",title:"Minister of Agriculture, Aquaculture and Fisheries",links:["aaf"]},
 {id:"randall",name:"Luke Randall",title:"Minister responsible for Opportunities NB, for Economic Development and Small Business, and for NB Liquor and Cannabis NB",links:["onb"]},
 {id:"theriault",name:"Isabelle Thériault",title:"Minister of Tourism, Heritage and Culture",links:["thc"]},
 {id:"kchiasson",name:"Keith Chiasson",title:"Minister of Indigenous Affairs",links:["ia"]},
 {id:"boudreau",name:"Lyne Chantal Boudreau",title:"Minister responsible for Seniors and for Women and Gender Equity",links:[]}
];
const nbd=(name,role)=>({name,role,src:"dm"});
const NB_OUT=[
 {id:"exec",abbr:"ECO",name:"Executive Council Office",heads:[nbd("Joel Dickinson","Clerk of the Executive Council and Head of the Public Service"),nbd("Judy Wagner","Deputy Minister, Executive Council Office, and Secretary to Cabinet")]},
 {id:"fin",abbr:"FTB",name:"Department of Finance and Treasury Board",heads:[nbd("Travis Bergin","Deputy Minister")]},
 {id:"en",abbr:"EN",name:"Department of Energy",heads:[nbd("Jeff Hoyt","Deputy Minister")]},
 {id:"hlth",abbr:"HLTH",name:"Department of Health",heads:[nbd("Eric Beaulieu","Deputy Minister")]},
 {id:"edu",abbr:"EECD",name:"Department of Education and Early Childhood Development",heads:[nbd("Ryan Donaghy","Deputy Minister (anglophone sector)"),nbd("Julie Mason","Deputy Minister (francophone sector)")]},
 {id:"jps",abbr:"JPS",name:"Department of Justice and Public Safety",heads:[nbd("Michael Comeau","Deputy Minister and Deputy Attorney General")]},
 {id:"sd",abbr:"SD",name:"Department of Social Development",heads:[nbd("Jim Mehan","Deputy Minister")]},
 {id:"nbhc",abbr:"NBHC",name:"New Brunswick Housing Corporation",heads:[nbd("François Boutot","Chief Executive Officer")]},
 {id:"petl",abbr:"PETL",name:"Department of Post-Secondary Education, Training and Labour",heads:[nbd("Daniel Mills","Deputy Minister")]},
 {id:"iga",abbr:"IGA",name:"Department of Intergovernmental Affairs",heads:[nbd("Charles Ayles","Deputy Minister (acting)")]},
 {id:"dti",abbr:"DTI",name:"Department of Transportation and Infrastructure",heads:[nbd("Kelly Cain","Deputy Minister")]},
 {id:"lg",abbr:"LG",name:"Department of Local Government",heads:[nbd("Charbel Awad","Deputy Minister")]},
 {id:"snb",abbr:"SNB",name:"Service New Brunswick",heads:[nbd("Renée Laforest","Chief Executive Officer")]},
 {id:"ecc",abbr:"ECC",name:"Department of Environment and Climate Change",heads:[nbd("Charbel Awad","Deputy Minister")]},
 {id:"rdc",abbr:"RDC",name:"Regional Development Corporation",heads:[nbd("Rob Kelly","President (acting)")]},
 {id:"nr",abbr:"NR",name:"Department of Natural Resources",heads:[nbd("Cade Libby","Deputy Minister")]},
 {id:"aaf",abbr:"AAF",name:"Department of Agriculture, Aquaculture and Fisheries",heads:[nbd("Kathy Brewer-Dalton","Deputy Minister")]},
 {id:"onb",abbr:"ONB",name:"Opportunities NB",heads:[nbd("Traci Simmons","Chief Executive Officer; Deputy Minister responsible for Economic Development and Small Business")]},
 {id:"thc",abbr:"THC",name:"Department of Tourism, Heritage and Culture",heads:[nbd("Hélène Bouchard","Deputy Minister")]},
 {id:"ia",abbr:"IA",name:"Department of Indigenous Affairs",heads:[nbd("Martha O'Sullivan","Deputy Minister")]}
];
const NB_OFFICERS=[
 {role:"Auditor General",name:null,what:"Audits how the government spends public money.",src:NB_S.off},
 {role:"Ombud",name:null,what:"Investigates complaints about provincial and municipal services and oversees access-to-information laws.",src:NB_S.off},
 {role:"Child, Youth and Senior Advocate",name:null,what:"Speaks up for children, youth and seniors and reviews the services they receive.",src:NB_S.off},
 {role:"Commissioner of Official Languages",name:null,what:"Makes sure the province respects its duties in English and French.",src:NB_S.off},
 {role:"Integrity Commissioner",name:null,what:"Advises MLAs on conflicts of interest and investigates complaints.",src:NB_S.off},
 {role:"Chief Electoral Officer",name:null,what:"Runs provincial elections through Elections New Brunswick.",src:NB_S.off},
 {role:"Consumer Advocate for Insurance",name:null,what:"Helps consumers with insurance concerns.",src:NB_S.off}
];
const NB_LOG=[["2025-10-06","bye","Kevin Russell","Miramichi West","pc","pc","Held the seat for the PCs in a by-election, October 2025"]];
CH.nbleg={id:"nbleg",title:"Legislative Assembly of New Brunswick",fr:"Assemblée législative du Nouveau-Brunswick",kicker:"",rows:8,memberNoun:"MLA",placeNoun:"Riding",
  groups:{lib:{name:"New Brunswick Liberal Association",short:"LIB",color:"var(--p-lib)"},pc:{name:"Progressive Conservative Party of New Brunswick",short:"PC",color:"var(--p-con)"},grn:{name:"Green Party of New Brunswick",short:"GRN",color:"var(--p-grn)"}},
  order:["lib","pc","grn"],govSide:["lib"],oppSide:["pc","grn"],speaker:"Francine Landry",leaders:["Susan Holt","Glen Savoie"],majority:25,gov:"lib",ge:{lib:31,pc:16,grn:2},geLabel:"October 21, 2024 election",src:NB_S.mla};
CH.nbleg.members=NB_GRID.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:NB_MIN.some(m=>m.name===n)||n==="Susan Holt",sort:n,group:p,place:r}; });
CH.nbleg.summary=(c,total)=>{ const gov=c.lib||0, others=total-gov, wm=gov-1-others;
  return [`<div class="hsub"><span class="majtag">Liberal majority</span> <b>${gov}</b> seats · ${gov-25} more than the 25 needed</div>`,
   `<div class="majbtn static"><span class="kicker">Working majority</span><span class="bign">${wm}</span><span class="src">Liberal MLAs minus all other MLAs, leaving out the Speaker. No vacancies.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>Susan Holt</dd><dt>Leader of the Opposition</dt><dd>Glen Savoie</dd><dt>Speaker</dt><dd>Francine Landry</dd><dt>Since election</dt><dd>1 by-election, no change in seats</dd></dl>`]; };
const NB_T=(x,y)=>[-575+(x-108)*0.5, -220+(y-129)*0.98];
const NB_CFG={id:"nbleg",pre:"nm",region:"New Brunswick",capital:"Fredericton",gov:"lib",govName:"Liberal Party",
  MIN:NB_MIN,OUT:NB_OUT,execId:"exec",execLabel:"Executive Council Office",LG:{name:"Louise Imbeault",title:"Lieutenant Governor of New Brunswick",since:"January 22, 2025",src:NB_S.lg},
  OFFICERS:NB_OFFICERS,offTitle:"Legislative officers",S:NB_S,minTitle:"Departments",minNoun:"Department",dirLbl:"Ministers direct departments",
  premier:{name:"Susan Holt",place:"Fredericton South-Silverwood",lede:"Leader of the New Brunswick Liberal Association. Also President of the Executive Council and Minister responsible for Official Languages."},
  sec:{name:"Joel Dickinson",title:"Clerk of the Executive Council and Head of the Public Service",l1:"Head of Public Service",l2:"CLERK OF THE EXECUTIVE COUNCIL",src:NB_S.dm,
    lede:"Clerk of the Executive Council and Head of the Public Service since September 1, 2025. Leads the deputy ministers who run each department."},
  oppLeader:"Glen Savoie",oppLeaderTitle:"Leader of the Official Opposition",
  roles:{"Glen Savoie":"Leader of the Official Opposition","David Coon":"Green Party MLA"},
  notes:{"Glen Savoie":"Leads the Progressive Conservative Official Opposition.","Kevin Russell":"Elected in the Miramichi West by-election on October 6, 2025, holding the seat for the Progressive Conservatives."},
  noteSrc:{"Glen Savoie":NB_S.leg,"Kevin Russell":NB_S.bye},
  cabSub:"Chosen by the Premier from Liberal MLAs. Deputy ministers as announced in August 2025.",
  title:"Legislative Assembly of New Brunswick",sub:"49 MLAs, 1 per riding, representing the people of New Brunswick",
  seats:NB_SEATS,T:NB_T,isGov:(x)=>x<617,rowOf:(x)=>({439:1,329:2,219:3,108:4,795:1,906:2})[x],chair:[617,62],
  aisle:[468,742,105,590],table:[617,250],sideLbl:{gov:[270,0],opp:[850,0]},cx:NB_T(617,0)[0],titleX:-345,titleY:-346,bot:240,lineX:[-600,-150],deskW:50,deskH:42,
  confPath:(m,px,py)=>{ const hy=-252, vx=NB_T(490,0)[0]; return {d:`M${m.px+14},${m.py} L${vx-14},${m.py} Q${vx},${m.py} ${vx},${m.py-14} L${vx},${hy+14} Q${vx},${hy} ${vx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,lx:-262,ly:-300}; },
  placeNoun:"riding",placeNounPl:"ridings",lastElection:"October 21, 2024",planDate:"October 20, 2026",
  planNote:"Desks nearest the centre aisle are the front row.",
  foldNote:"Cabinet from the Government of New Brunswick; deputy ministers as announced in August 2025, the latest full list found.",
  geYear:"2024",LOG:NB_LOG,ridingKey:"nb",logSrcs:[NB_S.bye]};
pvWire(NB_CFG);
