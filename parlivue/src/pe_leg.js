/* ================= PRINCE EDWARD ISLAND: LEGISLATIVE ASSEMBLY ================= */
const PE_S={
 mla:["Legislative Assembly of Prince Edward Island: Members","https://www.assembly.pe.ca/members"],
 plan:["Legislative Assembly of Prince Edward Island: Members (seating plan, spring 2026)","https://www.assembly.pe.ca/members"],
 cab:["News Beep: Minor cabinet shuffle for P.E.I. Premier Rob Lantz, September 2 2026","https://www.newsbeep.com/716144/"],
 ga:["Wikipedia: 67th General Assembly of Prince Edward Island","https://en.wikipedia.org/wiki/67th_General_Assembly_of_Prince_Edward_Island"],
 bye:["Wikipedia: 2026 Cornwall-Meadowbank provincial by-election","https://en.wikipedia.org/wiki/2026_Cornwall-Meadowbank_provincial_by-election"],
 lg:["Wikipedia: Lieutenant Governor of Prince Edward Island","https://en.wikipedia.org/wiki/Lieutenant_Governor_of_Prince_Edward_Island"],
 eco:["Government of PEI: Executive Council Office","https://www.princeedwardisland.ca/en/topic/executive-council-office"],
 dm:["Government of PEI news (senior appointments, May–August 2026), via a search summary supplied by the site owner","https://www.princeedwardisland.ca/en/news"]
};
// [name, district, party, x, y] — positions from the spring 2026 plan, mirrored so the government sits on the Speaker's right
const PE_RAW=`Ernie Hudson|Alberton-Bloomfield|pc|320|115
Zack Bell|Charlottetown-Winsloe|pc|320|240
Matthew MacKay|Kensington-Malpeque|pc|320|372
Bloyce Thompson|Stanhope-Marshfield|pc|320|482
Rob Lantz|Charlottetown-Brighton|pc|320|600
Jill Burridge|Stratford-Keppoch|pc|320|760
Darlene Compton|Belfast-Murray River|pc|320|870
Kent Dollar|Brackley-Hunter River|pc|138|100
Jenn Redmond|Mermaid-Stratford|pc|138|225
Robin Croucher|Souris-Elmira|pc|138|375
Barb Ramsay|Summerside-South Drive|pc|138|485
Cory Deagle|Montague-Kilmuir|pc|138|597
Tyler DesRoches|Summerside-Wilmot|pc|138|870
Susie Dillon|Charlottetown-Belvedere|pc|950|270
Hilton MacLennan|Tyne Valley-Sherbrooke|pc|950|380
Hal Perry|Tignish-Palmer Road|lib|950|530
Gordon McNeilly|Charlottetown-West Royalty|lib|950|645
Karla Bernard|Charlottetown-Victoria Park|grn|950|785
Matthew MacFarlane|Borden-Kinkora|grn|950|890
Gilles Arsenault|Evangeline-Miscouche|ind|1122|115
Sidney MacEwen|Morell-Donagh|pc|1122|265
Brendan Curran|Georgetown-Pownal|pc|1122|370
Carolyn Simpson|Charlottetown-Hillsborough Park|lib|1122|530
Robert Henderson|O'Leary-Inverness|lib|1122|645
Tayte Willows|Cornwall-Meadowbank|grn|1122|770
Peter Bevan-Baker|New Haven-Rocky Point|grn|1122|890
Brad Trivers|Rustico-Emerald|pc|0|0`;
const PE_SEATS={}; PE_RAW.split("\n").forEach(l=>{ const [n,,,x,y]=l.split("|"); if(+x) PE_SEATS[n]=[+x,+y]; });
const PE_MIN=[
 {id:"burridge",name:"Jill Burridge",title:"Minister of Finance and Affordability; Minister responsible for Energy",links:["fin"]},
 {id:"thompson",name:"Bloyce Thompson",title:"Minister of Transportation and Infrastructure; Minister of Justice and Public Safety and Attorney General",links:["ti","jps"]},
 {id:"deagle",name:"Cory Deagle",title:"Minister of Health and Wellness",links:["hw"]},
 {id:"croucher",name:"Robin Croucher",title:"Minister of Education and Early Years",links:["edu"]},
 {id:"ramsay",name:"Barb Ramsay",title:"Minister of Social Development and Seniors",links:["sds"]},
 {id:"dollar",name:"Kent Dollar",title:"Minister of Housing and Communities",links:["hc"]},
 {id:"bell",name:"Zack Bell",title:"Minister of Economic Development, Trade and Artificial Intelligence; Minister responsible for Acadian and Francophone Affairs",links:["edt"]},
 {id:"redmond",name:"Jenn Redmond",title:"Minister of Workforce and Advanced Learning; Minister responsible for the Status of Women",links:["wal"]},
 {id:"hudson",name:"Ernie Hudson",title:"Minister of Fisheries, Rural Development and Tourism",links:["frt"]},
 {id:"compton",name:"Darlene Compton",title:"Minister of Land and Environment",links:["le"]},
 {id:"maclennan",name:"Hilton MacLennan",title:"Minister of Agriculture",links:["agr"],note:"Sworn in on September 2, 2026."}
];
const PE_OUT=[
 {id:"exec",abbr:"ECO",name:"Executive Council Office",heads:[]},
 {id:"fin",abbr:"FIN",name:"Department of Finance and Affordability",heads:[{name:"Jodi Zver",role:"Deputy Minister (from July 6, 2026)",src:"dm"},{name:"Doriann MacMillan",role:"Chief Executive Officer, PEI Energy Corporation (from August 21, 2026)",src:"dm"}]},
 {id:"ti",abbr:"TI",name:"Department of Transportation and Infrastructure",heads:[]},
 {id:"jps",abbr:"JPS",name:"Department of Justice and Public Safety",heads:[]},
 {id:"hw",abbr:"HW",name:"Department of Health and Wellness",heads:[]},
 {id:"edu",abbr:"EEY",name:"Department of Education and Early Years",heads:[{name:"Norbert Carpenter",role:"Deputy Minister (from August 21, 2026)",src:"dm"}]},
 {id:"sds",abbr:"SDS",name:"Department of Social Development and Seniors",heads:[{name:"Bobbi Jo Flynn",role:"Deputy Minister (from August 21, 2026)",src:"dm"}]},
 {id:"hc",abbr:"HC",name:"Department of Housing and Communities",heads:[]},
 {id:"edt",abbr:"EDTAI",name:"Department of Economic Development, Trade and Artificial Intelligence",heads:[{name:"Jennifer Evans",role:"Chief Executive Officer, Innovation PEI (from July 6, 2026)",src:"dm"}]},
 {id:"wal",abbr:"WAL",name:"Department of Workforce and Advanced Learning",heads:[]},
 {id:"frt",abbr:"FRT",name:"Department of Fisheries, Rural Development and Tourism",heads:[{name:"Brad Colwill",role:"Deputy Minister (from May 15, 2026)",src:"dm"}]},
 {id:"le",abbr:"LE",name:"Department of Land and Environment",heads:[{name:"Ryan Neale",role:"Deputy Minister (from August 21, 2026)",src:"dm"}]},
 {id:"agr",abbr:"AGR",name:"Department of Agriculture",heads:[]}
];
const PE_OFFICERS=[
 {role:"Auditor General",name:null,what:"Audits how the government spends public money.",src:PE_S.mla},
 {role:"Chief Electoral Officer",name:null,what:"Runs provincial elections through Elections PEI.",src:PE_S.mla},
 {role:"Information and Privacy Commissioner",name:null,what:"Oversees access-to-information and privacy laws.",src:PE_S.mla},
 {role:"Conflict of Interest Commissioner",name:null,what:"Advises MLAs on conflicts of interest and investigates complaints.",src:PE_S.mla},
 {role:"Child and Youth Advocate",name:null,what:"Speaks up for young people and reviews the services they receive.",src:PE_S.mla}
];
const PE_LOG=[
 ["2024-02-07","bye","Matthew MacFarlane","Borden-Kinkora","pc","grn","Won the by-election for the Greens, February 2024"],
 ["2025-08-12","bye","Carolyn Simpson","Charlottetown-Hillsborough Park","pc","lib","Won the by-election for the Liberals, August 2025"],
 ["2025-08-12","bye","Kent Dollar","Brackley-Hunter River","pc","pc","Held the seat for the PCs, August 2025"],
 ["2025-12-08","bye","Brendan Curran","Georgetown-Pownal","pc","pc","Held the seat for the PCs, December 2025"],
 ["2026-07-13","bye","Tayte Willows","Cornwall-Meadowbank","pc","grn","Won the by-election for the Greens, July 2026"],
 ["","cross","Gilles Arsenault","Evangeline-Miscouche","pc","ind","Elected as a PC in 2023; now sits as an independent"]
];
CH.peleg={id:"peleg",title:"Legislative Assembly of Prince Edward Island",fr:"Assemblée législative de l'Île-du-Prince-Édouard",kicker:"",rows:7,memberNoun:"MLA",placeNoun:"District",
  groups:{pc:{name:"Progressive Conservative Party of Prince Edward Island",short:"PC",color:"var(--p-con)"},lib:{name:"Liberal Party of Prince Edward Island",short:"LIB",color:"var(--p-lib)"},grn:{name:"Green Party of Prince Edward Island",short:"GRN",color:"var(--p-grn)"},ind:{name:"Independent",short:"IND",color:"#9a9a9a"}},
  order:["pc","lib","grn","ind"],govSide:["pc"],oppSide:["lib","grn","ind"],speaker:"Brad Trivers",leaders:["Rob Lantz","Hal Perry"],majority:14,gov:"pc",ge:{pc:22,lib:3,grn:2,ind:0},geLabel:"April 3, 2023 election",src:PE_S.mla};
CH.peleg.members=PE_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:PE_MIN.some(m=>m.name===n)||n==="Rob Lantz",sort:n,group:p,place:r}; });
CH.peleg.summary=(c,total)=>{ const gov=c.pc||0, others=total-gov, wm=gov-1-others;
  return [`<div class="hsub"><span class="majtag">PC majority</span> <b>${gov}</b> seats · ${gov-14} more than the 14 needed</div>`,
   `<div class="majbtn static"><span class="kicker">Working majority</span><span class="bign">${wm}</span><span class="src">PC MLAs minus all other MLAs, leaving out the Speaker. No vacancies.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>Rob Lantz</dd><dt>Leader of the Opposition</dt><dd>Hal Perry</dd><dt>Speaker</dt><dd>Brad Trivers</dd><dt>Since election</dt><dd>5 by-elections · 1 party change</dd></dl>`]; };
const PE_T=(x,y)=>[-575+(x-138)*0.407, -280+(y-85)*0.67];
const PE_CFG={id:"peleg",pre:"pe",region:"Prince Edward Island",capital:"Charlottetown",gov:"pc",govName:"Progressive Conservative Party",
  MIN:PE_MIN,OUT:PE_OUT,execId:"exec",execLabel:"Executive Council Office",LG:{name:"Wassim Salamoun",title:"Lieutenant Governor of Prince Edward Island",since:"October 17, 2024",src:PE_S.lg},
  OFFICERS:PE_OFFICERS,offTitle:"Officers of the Legislative Assembly",S:PE_S,minTitle:"Departments",minNoun:"Department",dirLbl:"Ministers direct departments",
  premier:{name:"Rob Lantz",place:"Charlottetown-Brighton",lede:"Leader of the Progressive Conservative Party of Prince Edward Island. Premier since February 9, 2026."},
  sec:{name:"Clerk of the Executive Council",title:"Head of the Executive Council Office",l1:"Clerk",l2:"EXECUTIVE COUNCIL",src:PE_S.eco,
    lede:"Supports Cabinet and works with the deputy ministers who run each department. The current Clerk was not confirmed in the sources checked for this page."},
  oppLeader:"Hal Perry",oppLeaderTitle:"Leader of the Official Opposition",
  roles:{"Hal Perry":"Leader of the Official Opposition","Matthew MacFarlane":"Leader of the Third Party","Susie Dillon":"Deputy Speaker","Matthew MacKay":"Government House Leader","Gordon McNeilly":"Opposition House Leader","Peter Bevan-Baker":"Third Party House Leader"},
  notes:{"Hal Perry":"Leads the Liberal Official Opposition.","Matthew MacFarlane":"Leads the Green Party caucus, the third party in the Assembly.",
    "Tayte Willows":"Won the Cornwall-Meadowbank by-election for the Greens on July 13, 2026. The spring 2026 seating plan predates this, so the desk shown is an estimate beside the other Green MLAs.",
    "Gilles Arsenault":"Elected as a Progressive Conservative in 2023. Now sits as an independent.","Susie Dillon":"Sits with the governing Progressive Conservatives and serves as Deputy Speaker."},
  noteSrc:{"Tayte Willows":PE_S.bye,"Gilles Arsenault":PE_S.ga},
  cabSub:"Chosen by the Premier from PC MLAs. As reported after the September 2, 2026 shuffle.",
  title:"Legislative Assembly of Prince Edward Island",sub:"27 MLAs, 1 per district, representing the people of PEI",
  seats:PE_SEATS,T:PE_T,isGov:(x)=>x<610,rowOf:(x)=>({320:1,138:2,950:1,1122:2})[x],chair:[610,85],spkLabel:"below",
  aisle:[420,860,60,940],table:[610,420],sideLbl:{gov:[229,0],opp:[1036,0]},cx:PE_T(610,0)[0],titleX:-318,titleY:-352,bot:290,lineX:[-600,-150],deskW:52,deskH:46,
  confPath:(m,px,py)=>{ const hy=-314, vx=PE_T(470,0)[0]; return {d:`M${m.px+14},${m.py} L${vx-14},${m.py} Q${vx},${m.py} ${vx},${m.py-14} L${vx},${hy+14} Q${vx},${hy} ${vx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,lx:-372,ly:-296}; },
  placeNoun:"district",placeNounPl:"districts",lastElection:"April 3, 2023",planDate:"spring 2026",
  planNote:"The plan is drawn sideways; it is turned here so the government sits on the Speaker's right, as on the other pages. Tayte Willows, elected in July 2026, is not on the plan, so her desk is estimated.",
  foldNote:"Cabinet as reported after the September 2, 2026 shuffle. Deputy ministers were not confirmed in the sources checked.",
  geYear:"2023",LOG:PE_LOG,ridingKey:"pe",logSrcs:[PE_S.ga,PE_S.bye]};
pvWire(PE_CFG);
