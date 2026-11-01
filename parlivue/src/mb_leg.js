/* ================= MANITOBA: LEGISLATIVE ASSEMBLY ================= */
const MB_S={
 mla:["Legislative Assembly of Manitoba: MLA alphabetical listing","https://www.gov.mb.ca/legislature/members/mla_list_alphabetical.html"],
 plan:["Legislative Assembly of Manitoba: Members (seating plan updated September 29, 2026)","https://www.gov.mb.ca/legislature/members/mla_list_alphabetical.html"],
 cab:["Legislative Assembly of Manitoba: Executive Council in order of precedence, October 2026 (PDF)","https://www.gov.mb.ca/legislature/members/pf/cabinet_pf.pdf"],
 news:["Province of Manitoba news release, September 28, 2026","https://news.gov.mb.ca/news/print,index.html?item=75538&posted=2026-09-28"],
 oic:["Manitoba Order in Council 169/2026: deputy ministers, July 20 2026 (PDF)","https://oic.gov.mb.ca/OICDocs/2026/07/President%20of%20the%20Executive%20Council.260720.Public%20Service%20Act.1692026.pdf"],
 off:["Legislative Assembly of Manitoba: Independent officers","https://www.gov.mb.ca/legislature/about/officers.html"],
 lg:["Wikipedia: Lieutenant Governor of Manitoba","https://en.wikipedia.org/wiki/Lieutenant_Governor_of_Manitoba"],
 khan:["PortageOnline: Obby Khan resigns as Manitoba PC leader, leaves caucus","https://www.portageonline.com/articles/obby-khan-resigns-as-manitoba-pc-leader-leaves-caucus"],
 lag:["CTV News: Manitoba Tory Bob Lagassé leaves caucus, plans to sit as Independent","https://www.ctvnews.ca/winnipeg/article/manitoba-tory-bob-lagasse-leaves-caucus-plans-to-sit-as-independent/"],
 was:["CBC News: Mark Wasyliw removed from NDP caucus","https://amp.cbc.ca/news/canada/manitoba/mark-wasyliw-removed-ndp-caucus-1.7324640"],
 tux:["Elections Manitoba: 2024 Tuxedo by-election results","https://www.electionsmanitoba.ca/en/Results/ByElections/2024Tuxedo"]
};
const MB_RAW=`Uzoma Asagwara|Union Station|ndp
Wayne Balcaen|Brandon West|pc
Jeff Bereza|Portage la Prairie|pc
Tyler Blashko|Lagimodière|ndp
Diljeet Brar|Burrows|ndp
Ian Bushie|Keewatinook|ndp
Jodie Byram|Agassiz|pc
Renée Cable|Southdale|ndp
Jennifer Chen|Fort Richmond|ndp
Carla Compton|Tuxedo|ndp
Kathleen Cook|Roblin|pc
Shannon Corbett|Transcona|ndp
Billie Cross|Seine River|ndp
Jelynn Dela Cruz|Radisson|ndp
JD Devgan|McPhillips|ndp
Wayne Ewasko|Lac du Bonnet|pc
Jennifer Flett|The Pas-Kameesak|ndp
Nahanni Fontaine|St. Johns|ndp
Kelvin Goertzen|Steinbach|pc
Josh Guenter|Borderland|pc
Carrie Hiebert|Morden-Winkler|pc
Derek Johnson|Interlake-Gimli|pc
Nellie Kennedy|Assiniboia|ndp
Obby Khan|Fort Whyte|ind
Wab Kinew|Fort Rouge|ndp
Trevor King|Lakeside|pc
Ron Kostyshyn|Dauphin|ndp
Bob Lagassé|Dawson Trail|ind
Cindy Lamoureux|Tyndall Park|lib
Tom Lindsey|Flin Flon|ndp
Robert Loiselle|St. Boniface|ndp
Jim Maloway|Elmwood|ndp
Malaya Marcelino|Notre Dame|ndp
Mike Moroz|River Heights|ndp
Jamie Moses|St. Vital|ndp
Mike Moyes|Riel|ndp
Konrad Narth|La Vérendrye|pc
Lisa Naylor|Wolseley|ndp
Greg Nesbitt|Riding Mountain|pc
Logan Oxenham|Kirkfield Park|ndp
David Pankratz|Waverley|ndp
Richard Perchotte|Selkirk|pc
Doyle Piwniuk|Turtle Mountain|pc
Eric Redhead|Thompson|ndp
Colleen Robbins|Spruce Woods|pc
Adrien Sala|St. James|ndp
Mintu Sandhu|The Maples|ndp
Tracy Schmidt|Rossmere|ndp
Rachelle Schott|Kildonan-River East|ndp
Ron Schuler|Springfield-Ritchot|pc
Glen Simard|Brandon East|ndp
Bernadette Smith|Point Douglas|ndp
Lauren Stone|Midland|pc
Mark Wasyliw|Fort Garry|ind
Jeff Wharton|Red River North|pc
Matt Wiebe|Concordia|ndp
Rick Wowchuk|Swan River|pc`;
// [x,y] = name position on the September 29, 2026 seating plan (PDF points)
const MB_SEATS={"Tom Lindsey":[94,79],"Ian Bushie":[232,76],"Nahanni Fontaine":[369,75],"Jennifer Flett":[93,137],"Glen Simard":[232,135],"Tracy Schmidt":[370,135],"Lauren Stone":[855,138],"Jennifer Chen":[93,195],"Malaya Marcelino":[230,195],"Matt Wiebe":[368,194],"Jeff Bereza":[855,196],"Rachelle Schott":[92,267],"Nellie Kennedy":[231,267],"JD Devgan":[93,328],"Wab Kinew":[369,256],"Adrien Sala":[392,376],"Renée Cable":[252,388],"Shannon Corbett":[110,391],"Logan Oxenham":[143,449],"Uzoma Asagwara":[372,314],"Jamie Moses":[231,328],"Konrad Narth":[856,260],"Kathleen Cook":[855,318],"Jodie Byram":[826,375],"Ron Kostyshyn":[435,437],"Lisa Naylor":[288,449],"Robert Loiselle":[791,439],"Bernadette Smith":[519,495],"Tyler Blashko":[184,509],"Billie Cross":[706,496],"Mike Moyes":[431,567],"Jelynn Dela Cruz":[265,589],"Diljeet Brar":[332,647],"Carla Compton":[707,629],"Jim Maloway":[519,725],"Cindy Lamoureux":[705,725],"Trevor King":[996,208],"Jeff Wharton":[1132,210],"Josh Guenter":[993,266],"Kelvin Goertzen":[1132,269],"Wayne Balcaen":[995,331],"Ron Schuler":[1134,328],"Richard Perchotte":[891,507],"Rick Wowchuk":[1106,389],"Greg Nesbitt":[1083,447],"Obby Khan":[959,590],"Mark Wasyliw":[894,649],"Eric Redhead":[380,708],"Doyle Piwniuk":[1132,148],"Carrie Hiebert":[936,454],"David Pankratz":[790,569],"Mike Moroz":[518,627],"Wayne Ewasko":[994,150],"Colleen Robbins":[964,390],"Mintu Sandhu":[337,507],"Derek Johnson":[855,78],"Bob Lagassé":[844,706]};
const MB_MIN=[
 {id:"asagwara",name:"Uzoma Asagwara",title:"Deputy Premier and Minister of Health, Seniors and Long-Term Care",links:["hslc"]},
 {id:"sala",name:"Adrien Sala",title:"Minister of Finance; Minister responsible for Manitoba Hydro and for the Manitoba Public Service",links:["fin","psc"]},
 {id:"wiebe",name:"Matt Wiebe",title:"Minister of Justice and Attorney General; Keeper of the Great Seal; Minister responsible for the Manitoba Public Insurance Corporation",links:["jus"]},
 {id:"fontaine",name:"Nahanni Fontaine",title:"Minister of Families; Minister responsible for Women and Gender Equity; Government House Leader",links:["fam"]},
 {id:"smith",name:"Bernadette Smith",title:"Minister of Housing, Addictions and Homelessness; Minister responsible for Mental Health",links:["hah"]},
 {id:"schmidt",name:"Tracy Schmidt",title:"Minister of Education and Early Childhood Learning",links:["edu"]},
 {id:"cable",name:"Renée Cable",title:"Minister of Advanced Education and Training",links:["aet"]},
 {id:"moses",name:"Jamie Moses",title:"Minister of Business, Mining, Trade and Job Creation",links:["bmt"]},
 {id:"marcelino",name:"Malaya Marcelino",title:"Minister of Labour and Immigration; Minister responsible for the Workers Compensation Board",links:["li"]},
 {id:"kostyshyn",name:"Ron Kostyshyn",title:"Minister of Agriculture",links:["agr"]},
 {id:"bushie",name:"Ian Bushie",title:"Minister of Natural Resources and Indigenous Futures",links:["nrif"]},
 {id:"moyes",name:"Mike Moyes",title:"Minister of Environment and Climate Change; Minister responsible for Efficiency Manitoba",links:["ecc"]},
 {id:"naylor",name:"Lisa Naylor",title:"Minister of Transportation and Infrastructure",links:["ti"]},
 {id:"simard",name:"Glen Simard",title:"Minister of Municipal and Northern Relations; Minister responsible for Francophone Affairs and for Manitoba Liquor and Lotteries",links:["mnr"]},
 {id:"sandhu",name:"Mintu Sandhu",title:"Minister of Public Service Delivery",links:["psd"]},
 {id:"kennedy",name:"Nellie Kennedy",title:"Minister of Sport, Culture, Heritage and Tourism",links:["scht"]},
 {id:"moroz",name:"Mike Moroz",title:"Minister of Innovation and New Technology",links:["int"]},
 {id:"pankratz",name:"David Pankratz",title:"Minister responsible for First Responder Initiatives",links:[],src:"news",note:"Added to Cabinet on September 28, 2026. The role does not come with a department of its own."},
 {id:"compton",name:"Carla Compton",title:"Minister responsible for Accessibility",links:[],src:"news",note:"Added to Cabinet on September 28, 2026. The role does not come with a department of its own."}
];
const mbd=(name,role)=>({name,role,src:"oic"});
const MB_OUT=[
 {id:"exec",abbr:"EC",name:"Executive Council",heads:[mbd("Sarah Thiele","Clerk of the Executive Council and Cabinet Secretary")]},
 {id:"iga",abbr:"IGA",name:"Department of Intergovernmental Affairs and International Relations",heads:[mbd("Daniel Blaikie","Deputy Minister of Intergovernmental Affairs")]},
 {id:"ir",abbr:"IR",name:"Indigenous Reconciliation",heads:[mbd("Amna Mackin","Deputy Minister for Indigenous Reconciliation")]},
 {id:"hslc",abbr:"HSLTC",name:"Department of Health, Seniors and Long-Term Care",heads:[mbd("Szilveszter Komlodi","Deputy Minister")]},
 {id:"fin",abbr:"FIN",name:"Department of Finance",heads:[mbd("Brenda Feng","Deputy Minister"),mbd("Ann Ulusoy","Secretary to Treasury Board")]},
 {id:"psc",abbr:"PSC",name:"Public Service Commission",heads:[mbd("Dana Rudy","Public Service Commissioner")]},
 {id:"jus",abbr:"JUS",name:"Department of Justice",heads:[mbd("Jeremy Akerstream, K.C.","Deputy Minister of Justice and Deputy Attorney General")]},
 {id:"fam",abbr:"FAM",name:"Department of Families",heads:[mbd("Michelle Dubik","Deputy Minister")]},
 {id:"hah",abbr:"HAH",name:"Department of Housing, Addictions and Homelessness",heads:[mbd("Charlene Paquin","Deputy Minister")]},
 {id:"edu",abbr:"EECL",name:"Department of Education and Early Childhood Learning",heads:[mbd("Mona Pandey","Deputy Minister")]},
 {id:"aet",abbr:"AET",name:"Department of Advanced Education and Training",heads:[mbd("Ryan Klos","Deputy Minister")]},
 {id:"bmt",abbr:"BMTJC",name:"Department of Business, Mining, Trade and Job Creation",heads:[mbd("Michael Jack","Deputy Minister")]},
 {id:"li",abbr:"LI",name:"Department of Labour and Immigration",heads:[mbd("Michelle Wallace","Deputy Minister")]},
 {id:"agr",abbr:"AGR",name:"Department of Agriculture",heads:[mbd("Scott Sinclair","Deputy Minister")]},
 {id:"nrif",abbr:"NRIF",name:"Department of Natural Resources and Indigenous Futures",heads:[mbd("Bruce Gray","Deputy Minister")]},
 {id:"ecc",abbr:"ECC",name:"Department of Environment and Climate Change",heads:[mbd("Jocelyn Baker","Deputy Minister")]},
 {id:"ti",abbr:"TI",name:"Department of Transportation and Infrastructure",heads:[mbd("Russ Andrushuk","Deputy Minister")]},
 {id:"mnr",abbr:"MNR",name:"Department of Municipal and Northern Relations",heads:[mbd("Maurice Bouvier","Deputy Minister")]},
 {id:"psd",abbr:"PSD",name:"Department of Public Service Delivery",heads:[mbd("Brenda DeSerranno","Deputy Minister")]},
 {id:"scht",abbr:"SCHT",name:"Department of Sport, Culture, Heritage and Tourism",heads:[mbd("Jeff Hnatiuk","Deputy Minister")]},
 {id:"int",abbr:"INT",name:"Department of Innovation and New Technology",heads:[mbd("Tyler Gooch","Deputy Minister")]}
];
const MB_OFFICERS=[
 {role:"Auditor General",name:"Tyson Shtykalo",what:"Audits how the government spends public money.",src:MB_S.off},
 {role:"Ombudsman",name:"Jill Perron",what:"Investigates complaints about unfair treatment by provincial and municipal bodies.",src:MB_S.off},
 {role:"Advocate for Children and Youth",name:"Sherry Gott",what:"Speaks up for young people and reviews services for children and youth.",src:MB_S.off},
 {role:"Seniors' Advocate",name:"Leigh Anne Caron",what:"Speaks up for older Manitobans and reviews services for seniors.",src:MB_S.off},
 {role:"Chief Electoral Officer",name:"Josh Watt",what:"Runs provincial elections through Elections Manitoba.",src:MB_S.off},
 {role:"Ethics Commissioner, Lobbyist Registrar and Information and Privacy Adjudicator",name:"Sherri Walsh",what:"Advises MLAs on conflicts of interest, keeps the lobbyist registry and decides access-to-information appeals.",src:MB_S.off}
];
const MB_LOG=[
 ["2024-06-18","bye","Carla Compton","Tuxedo","pc","ndp","Won the by-election for the NDP, June 2024"],
 ["2024-09-01","cross","Mark Wasyliw","Fort Garry","ndp","ind","Removed from the NDP caucus, September 2024"],
 ["2026-03-10","cross","Bob Lagassé","Dawson Trail","pc","ind","Left the PC caucus, March 2026"],
 ["2026-09-28","cross","Obby Khan","Fort Whyte","pc","ind","Resigned as PC leader and left caucus, September 2026"]
];
CH.mbleg={id:"mbleg",title:"Legislative Assembly of Manitoba",fr:"Assemblée législative du Manitoba",kicker:"",rows:4,memberNoun:"MLA",placeNoun:"Constituency",
  groups:{ndp:{name:"Manitoba New Democratic Party",short:"NDP",color:"var(--p-ndp)"},pc:{name:"Progressive Conservative Party of Manitoba",short:"PC",color:"var(--p-con)"},lib:{name:"Independent Liberal",short:"LIB",color:"var(--p-lib)"},ind:{name:"Independent",short:"IND",color:"#9a9a9a"}},
  order:["ndp","pc","lib","ind"],govSide:["ndp"],oppSide:["pc","lib","ind"],speaker:"Tom Lindsey",leaders:["Wab Kinew","Konrad Narth"],majority:29,gov:"ndp",ge:{ndp:34,pc:22,lib:1,ind:0},geLabel:"October 3, 2023 election",
  src:MB_S.mla};
CH.mbleg.members=MB_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:MB_MIN.some(m=>m.name===n)||n==="Wab Kinew",sort:n,group:p,place:r}; });
CH.mbleg.summary=(c,total)=>{ const gov=c.ndp||0, others=total-gov, wm=gov-1-others;
  return [`<div class="hsub"><span class="majtag">NDP majority</span> <b>${gov}</b> seats · ${gov-29} more than the 29 needed</div>`,
   `<div class="majbtn static"><span class="kicker">Working majority</span><span class="bign">${wm}</span><span class="src">NDP MLAs minus all other MLAs, leaving out the Speaker. No vacancies.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>Wab Kinew</dd><dt>Leader of the Opposition (interim)</dt><dd>Konrad Narth</dd><dt>Speaker</dt><dd>Tom Lindsey</dd><dt>Since election</dt><dd>3 party changes · 1 by-election</dd></dl>`]; };
const MB_T=(x,y)=>[-590+(x-92)*0.403, -250+(y-75)*0.846];
const MB_CFG={id:"mbleg",pre:"mm",region:"Manitoba",capital:"Winnipeg",gov:"ndp",govName:"Manitoba New Democratic Party",
  MIN:MB_MIN,OUT:MB_OUT,execId:"exec",execLabel:"Executive Council",LG:{name:"Anita Neville",title:"Lieutenant Governor of Manitoba",since:"October 24, 2022",src:MB_S.lg},
  OFFICERS:MB_OFFICERS,offTitle:"Independent officers of the Legislative Assembly",S:MB_S,minTitle:"Departments",minNoun:"Department",dirLbl:"Ministers direct departments",
  premier:{name:"Wab Kinew",place:"Fort Rouge",lede:"Leader of the Manitoba New Democratic Party. Also President of the Executive Council, Minister of Intergovernmental Affairs and International Relations, and Minister of Indigenous Reconciliation."},
  sec:{name:"Sarah Thiele",title:"Clerk of the Executive Council and Cabinet Secretary",l1:"Cabinet Secretary",l2:"CLERK OF THE EXECUTIVE COUNCIL",src:MB_S.oic,
    lede:"Clerk of the Executive Council and Cabinet Secretary. Supports Cabinet and works with the deputy ministers who run each department. A July 2026 order names Amna Mackin as Acting Clerk in her absence."},
  oppLeader:"Konrad Narth",oppLeaderTitle:"Interim Leader of the Official Opposition",
  roles:{"Konrad Narth":"Interim Leader of the Official Opposition","Derek Johnson":"Official Opposition House Leader"},
  notes:{"Konrad Narth":"Chosen by the Progressive Conservative caucus as interim leader after Obby Khan resigned on September 28, 2026.",
    "Obby Khan":"Resigned as Progressive Conservative leader on September 28, 2026 and left the caucus. Sits as an independent.",
    "Bob Lagassé":"Left the Progressive Conservative caucus in March 2026. Sits as an independent.",
    "Mark Wasyliw":"Removed from the NDP caucus in September 2024. Sits as an independent.",
    "Cindy Lamoureux":"Listed by the Assembly as an independent Liberal.",
    "Robert Loiselle":"Sits with the governing NDP. Named special envoy for military affairs on September 28, 2026."},
  noteSrc:{"Konrad Narth":MB_S.khan,"Obby Khan":MB_S.khan,"Bob Lagassé":MB_S.lag,"Mark Wasyliw":MB_S.was,"Robert Loiselle":MB_S.news},
  cabSub:"Chosen by the Premier from NDP MLAs. Two ministers were added on September 28, 2026.",
  title:"Legislative Assembly of Manitoba",sub:"57 MLAs, 1 per constituency, representing the people of Manitoba",
  seats:MB_SEATS,T:MB_T,isGov:(x)=>x<600,chair:[612,148],spkLabel:"below",vacant:[[94,79],[1034,507]],table:null,aisle:null,
  sideLbl:{gov:[230,0],opp:[995,0]},cx:MB_T(612,0)[0],titleX:-380,titleY:-322,bot:312,lineX:[-600,-150],deskW:44,deskH:34,
  confPath:(m,px,py)=>{ const fx=MB_T(520,0)[0], hy=-224; return {d:`M${m.px+14},${m.py} L${fx-14},${m.py} Q${fx},${m.py} ${fx},${m.py-14} L${fx},${hy+14} Q${fx},${hy} ${fx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,lx:-250,ly:-258}; },
  placeNoun:"constituency",placeNounPl:"constituencies",lastElection:"October 3, 2023",planDate:"September 29, 2026",
  planNote:"Dashed desks are empty. The Speaker is shown in the chair rather than at his own desk.",
  foldNote:"Cabinet from the Assembly's October 2026 precedence list and the September 28, 2026 news release; deputy ministers from a July 2026 Order in Council.",
  geYear:"2023",LOG:MB_LOG,logSrcs:[MB_S.tux,MB_S.was,MB_S.lag,MB_S.khan],ridingKey:"mb"};
pvWire(MB_CFG);
