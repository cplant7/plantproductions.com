/* ================= NOVA SCOTIA: HOUSE OF ASSEMBLY ================= */
const NS_S={
 mla:["Wikipedia: 65th General Assembly of Nova Scotia","https://en.wikipedia.org/wiki/65th_General_Assembly_of_Nova_Scotia"],
 plan:["Nova Scotia House of Assembly: Seating arrangements, No. 88, September 8, 2026","https://nslegislature.ca/about/officers-of-the-house"],
 cab:["Nova Scotia House of Assembly: Seating plan, Members of the Government, September 8, 2026","https://nslegislature.ca/about/officers-of-the-house"],
 eco:["Government of Nova Scotia: Executive Council Office","https://www.novascotia.ca/government/executive-council-office"],
 dm:["Government of Nova Scotia: Changes to senior leadership of the public service, January 9 2026","https://news.novascotia.ca/en/2026/01/09/changes-senior-leadership-public-service"],
 dm2:["Government of Nova Scotia (senior leadership), via a search summary supplied by the site owner","https://www.novascotia.ca/government/executive-council-office"],
 druhan:["Wikipedia: Becky Druhan","https://en.wikipedia.org/wiki/Becky_Druhan"]
};
const NS_RAW=`Susan Corkum-Greek|Lunenburg|pc|583|486
Nick Hilton|Yarmouth|pc|663|545
David Bowlby|Annapolis|pc|609|549
Dave Ritcey|Truro – Bible Hill – Millbrook – Salmon River|pc|744|425
Twila Grosse|Preston|pc|799|417
Tom Taggart|Colchester North|pc|745|483
Brad Johns|Sackville-Uniacke|pc|798|489
Fred Tilley|Northside – Westmount|pc|693|424
Marco MacLeod|Pictou West|pc|694|481
Michelle Thompson|Antigonish|pc|638|421
Barbara Adams|Eastern Passage|pc|582|425
Adegoke Fadare|Clayton Park West|pc|637|490
Tim Houston|Pictou East|pc|531|427
Leah Martin|Cole Harbour|pc|527|490
Dianne Timmins|Victoria – The Lakes|pc|558|552
Brendan Maguire|Halifax Atlantic|pc|450|423
Chris Palmer|Kings West|pc|450|483
Julie Vanexan|Kings South|pc|450|549
Derek Mombourquette|Sydney – Membertou|lib|824|198
Iain Rankin|Timberlea – Prospect|lib|771|196
Lisa Lachance|Halifax Citadel – Sable Island|ndp|634|196
Claudia Chender|Dartmouth South|ndp|580|195
Susan Leblanc|Dartmouth North|ndp|686|197
Kent Smith|Eastern Shore|pc|472|130
Tory Rushton|Cumberland South|pc|420|127
Greg Morrow|Guysborough – Tracadie|pc|364|127
Brian Wong|Waverley – Fall River – Beaver Bank|pc|310|127
Lina Hamid|Fairview – Clayton Park|ndp|669|69
Rod Wilson|Halifax – Armdale|ndp|617|71
Krista Gallagher|Halifax Chebucto|ndp|563|63
Becky Druhan|Lunenburg West|lib|770|132
Paul Wozney|Sackville – Cobequid|ndp|685|134
Suzy Hansen|Halifax Needham|ndp|633|128
Kendra Coombs|Cape Breton Centre – Whitney Pier|ndp|579|126
Claude Bourgeois|Chéticamp – Margarees – Pleasant Bay|pc|471|63
Danny MacGillivray|Pictou Centre|pc|414|70
Damian Stoilov|Bedford South|pc|359|67
Elizabeth Smith-McCrossin|Cumberland North|ind|207|60
Colton LeBlanc|Argyle|pc|495|191
Jill Balser|Digby – Annapolis|pc|442|199
John Lohr|Kings North|pc|396|418
Melissa Sheehy-Richard|Hants West|pc|394|488
Rick Burns|Hammonds Plains – Lucasville|pc|396|552
Scott Armstrong|Colchester – Musquodoboit Valley|pc|389|193
Kim Masland|Queens|pc|342|415
John A. MacDonald|Hants East|pc|343|483
Tim Outhit|Bedford Basin|pc|342|548
Tim Halman|Dartmouth East|pc|337|199
Nolan Young|Shelburne|pc|288|417
Ryan Robicheau|Clare|pc|288|487
Kyle MacQuarrie|Inverness|pc|289|553
John White|Glace Bay – Dominion|pc|284|196
Brian Comer|Cape Breton East|pc|235|425
Trevor Boudreau|Richmond|pc|234|480
Brad McGowan|Cole Harbour – Dartmouth|pc|234|551
Danielle Barkhouse|Chester – St. Margaret's|pc|0|0`;
const NS_SEATS={}; NS_RAW.split("\n").forEach(l=>{ const [n,,,x,y]=l.split("|"); if(+x) NS_SEATS[n]=[+x,+y]; });
const NS_MIN=[
 {id:"adams",name:"Barbara Adams",title:"Deputy Premier; Deputy President of the Executive Council; Minister of Seniors and Long-Term Care; Minister responsible for Military Relations",links:["sltc"]},
 {id:"lohr",name:"John Lohr",title:"Minister of Finance and Treasury Board; Minister of Labour Relations",links:["ftb"]},
 {id:"halman",name:"Tim Halman",title:"Minister of Environment and Climate Change; Minister of Service Efficiency; Chair of Treasury and Policy Board",links:["ecc"]},
 {id:"thompson",name:"Michelle Thompson",title:"Minister of Health and Wellness; responsible for the Office of Healthcare Professionals Recruitment and Healthcare Redevelopment",links:["hw"]},
 {id:"comer",name:"Brian Comer",title:"Minister of Addictions and Mental Health",links:["amh"]},
 {id:"maguire",name:"Brendan Maguire",title:"Minister of Education and Early Childhood Development",links:["edu"]},
 {id:"wong",name:"Brian Wong",title:"Minister of Advanced Education",links:["ae"]},
 {id:"armstrong",name:"Scott Armstrong",title:"Attorney General and Minister of Justice; Provincial Secretary; Minister of Equity and Anti-Racism",links:["jus"]},
 {id:"masland",name:"Kim Masland",title:"Minister of Emergency Management",links:["em"]},
 {id:"leblanc",name:"Colton LeBlanc",title:"Minister of Growth and Development; Minister of Acadian Affairs and Francophonie",links:["gd"]},
 {id:"young",name:"Nolan Young",title:"Minister of Labour, Skills and Immigration",links:["lsi"]},
 {id:"white",name:"John White",title:"Minister of Housing",links:["hou"]},
 {id:"macdonald",name:"John A. MacDonald",title:"Minister of Municipal Affairs",links:["ma"]},
 {id:"tilley",name:"Fred Tilley",title:"Minister of Public Works",links:["pw"]},
 {id:"rushton",name:"Tory Rushton",title:"Minister of Natural Resources",links:["nr"]},
 {id:"morrow",name:"Greg Morrow",title:"Minister of Agriculture",links:["agr"]},
 {id:"ksmith",name:"Kent Smith",title:"Minister of Fisheries and Aquaculture",links:["fa"]},
 {id:"corkum",name:"Susan Corkum-Greek",title:"Minister of Opportunities and Social Development",links:["osd"]},
 {id:"balser",name:"Jill Balser",title:"Minister of Cyber Security and Digital Solutions; Minister of Service Nova Scotia",links:["csds"]},
 {id:"ritcey",name:"Dave Ritcey",title:"Minister of Communities, Culture, Tourism and Heritage; Minister of Gaelic Affairs",links:["ccth"]},
 {id:"grosse",name:"Twila Grosse",title:"Minister of African Nova Scotian Affairs; Minister of the Public Service Commission",links:["ansa"]},
 {id:"martin",name:"Leah Martin",title:"Minister of Communications; Minister of L'nu Affairs; responsible for the Status of Women and for Youth",links:["lnu"]}
];
const nsd=(name,role,src)=>({name,role,src:src||"dm"});
const NS_OUT=[
 {id:"exec",abbr:"ECO",name:"Executive Council Office and Office of the Premier",heads:[nsd("Tracey Taweel","Clerk of the Executive Council and Executive Deputy Minister, Office of the Premier","eco"),nsd("Kathleen Trott","Deputy Minister, Executive Council Office, and Secretary to the Executive Council","eco")]},
 {id:"sltc",abbr:"SLTC",name:"Department of Seniors and Long-Term Care",heads:[]},
 {id:"ftb",abbr:"FTB",name:"Department of Finance and Treasury Board",heads:[nsd("Kelliann Dean","Deputy Minister","dm2")]},
 {id:"ecc",abbr:"ECC",name:"Department of Environment and Climate Change",heads:[]},
 {id:"hw",abbr:"HW",name:"Department of Health and Wellness",heads:[]},
 {id:"amh",abbr:"OAMH",name:"Office of Addictions and Mental Health",heads:[nsd("Jennifer Glennie","Deputy Minister (from January 12, 2026)")]},
 {id:"edu",abbr:"EECD",name:"Department of Education and Early Childhood Development",heads:[]},
 {id:"ae",abbr:"AE",name:"Department of Advanced Education",heads:[]},
 {id:"jus",abbr:"JUS",name:"Department of Justice",heads:[nsd("Alex Ikejiani","Deputy Minister (from January 12, 2026)")]},
 {id:"em",abbr:"EM",name:"Department of Emergency Management",heads:[]},
 {id:"gd",abbr:"GD",name:"Department of Growth and Development",heads:[]},
 {id:"lsi",abbr:"LSI",name:"Department of Labour, Skills and Immigration",heads:[]},
 {id:"hou",abbr:"HOU",name:"Department of Housing",heads:[]},
 {id:"ma",abbr:"MA",name:"Department of Municipal Affairs",heads:[]},
 {id:"pw",abbr:"PW",name:"Department of Public Works",heads:[]},
 {id:"nr",abbr:"NR",name:"Department of Natural Resources",heads:[]},
 {id:"agr",abbr:"AGR",name:"Department of Agriculture",heads:[]},
 {id:"fa",abbr:"FA",name:"Department of Fisheries and Aquaculture",heads:[]},
 {id:"osd",abbr:"OSD",name:"Department of Opportunities and Social Development",heads:[]},
 {id:"csds",abbr:"CSDS",name:"Cyber Security and Digital Solutions; Service Nova Scotia",heads:[]},
 {id:"ccth",abbr:"CCTH",name:"Department of Communities, Culture, Tourism and Heritage",heads:[]},
 {id:"ansa",abbr:"ANSA",name:"Office of African Nova Scotian Affairs",heads:[]},
 {id:"lnu",abbr:"L'nu",name:"Office of L'nu Affairs",heads:[]}
];
const NS_OFFICERS=[
 {role:"Auditor General",name:null,what:"Audits how the government spends public money.",src:["Nova Scotia House of Assembly: Auditor General","https://nslegislature.ca/about/supporting-offices/auditor-general"]},
 {role:"Ombudsman",name:null,what:"Investigates complaints about provincial and municipal services.",src:["Nova Scotia House of Assembly: Office of the Ombudsman","https://nslegislature.ca/about/supporting-offices/office-ombudsman"]},
 {role:"Conflict of Interest Commissioner",name:null,what:"Advises MLAs on conflicts of interest and investigates complaints.",src:["Nova Scotia House of Assembly: Conflict of Interest Commissioner","https://nslegislature.ca/about/supporting-offices/conflict-interest-commissioner"]},
 {role:"Chief Electoral Officer",name:null,what:"Runs provincial elections through Elections Nova Scotia.",src:["Nova Scotia House of Assembly: Elections Nova Scotia","https://nslegislature.ca/about/supporting-offices/elections-nova-scotia"]}
];
const NS_LOG=[
 ["2025-10-27","cross","Becky Druhan","Lunenburg West","pc","lib","Left the PC caucus, October 2025; joined the Liberals, May 2026"],
 ["2026-06-23","new","Claude Bourgeois","Chéticamp – Margarees – Pleasant Bay","","pc","Seated for the new district, June 2026"]
];
CH.nsleg={id:"nsleg",title:"Nova Scotia House of Assembly",fr:"Assemblée législative de la Nouvelle-Écosse",kicker:"",rows:3,memberNoun:"MLA",placeNoun:"Constituency",
  groups:{pc:{name:"Progressive Conservative Association of Nova Scotia",short:"PC",color:"var(--p-con)"},ndp:{name:"Nova Scotia New Democratic Party",short:"NDP",color:"var(--p-ndp)"},lib:{name:"Nova Scotia Liberal Party",short:"LIB",color:"var(--p-lib)"},ind:{name:"Independent",short:"IND",color:"#9a9a9a"}},
  order:["pc","ndp","lib","ind"],govSide:["pc"],oppSide:["ndp","lib","ind"],speaker:"Danielle Barkhouse",leaders:["Tim Houston","Claudia Chender"],majority:29,gov:"pc",ge:{pc:43,ndp:9,lib:2,ind:1},geLabel:"November 26, 2024 election",src:NS_S.mla};
CH.nsleg.members=NS_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:NS_MIN.some(m=>m.name===n)||n==="Tim Houston",sort:n,group:p,place:r}; });
CH.nsleg.summary=(c,total)=>{ const gov=c.pc||0, others=total-gov, wm=gov-1-others;
  return [`<div class="hsub"><span class="majtag">PC majority</span> <b>${gov}</b> seats · ${gov-29} more than the 29 needed</div>`,
   `<div class="majbtn static"><span class="kicker">Working majority</span><span class="bign">${wm}</span><span class="src">PC MLAs minus all other MLAs, leaving out the Speaker. No vacancies.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>Tim Houston</dd><dt>Leader of the Opposition</dt><dd>Claudia Chender</dd><dt>Speaker</dt><dd>Danielle Barkhouse</dd><dt>Since election</dt><dd>1 party change · 1 new seat</dd></dl>`]; };
const NS_T=(x,y)=>[-380+(311-y)*0.82, -260+(x-233)*0.85];
const NS_CFG={ridingKey:"ns",id:"nsleg",pre:"ns",region:"Nova Scotia",capital:"Halifax",gov:"pc",govName:"Progressive Conservative Association",
  MIN:NS_MIN,OUT:NS_OUT,execId:"exec",execLabel:"Executive Council Office",LG:{name:"Mike Savage",title:"Lieutenant Governor of Nova Scotia",src:NS_S.plan},
  OFFICERS:NS_OFFICERS,offTitle:"Independent officers of the House of Assembly",S:NS_S,minTitle:"Departments",minNoun:"Department",dirLbl:"Ministers direct departments",
  premier:{name:"Tim Houston",place:"Pictou East",lede:"Leader of the Progressive Conservative Association of Nova Scotia. Also President of the Executive Council and Minister of Intergovernmental Affairs, Trade and Energy."},
  sec:{name:"Tracey Taweel",title:"Clerk of the Executive Council and Head of the Public Service",l1:"Clerk",l2:"EXECUTIVE COUNCIL",src:NS_S.eco,
    lede:"Clerk of the Executive Council, Executive Deputy Minister of the Office of the Premier and Head of the Public Service. Kathleen Trott is Deputy Minister of the Executive Council Office and Secretary to the Executive Council."},
  oppLeader:"Claudia Chender",oppLeaderTitle:"Leader of the Official Opposition",
  roles:{"Claudia Chender":"Leader of the Official Opposition","Iain Rankin":"Interim Leader of the Liberal Party","Brad Johns":"Ministerial Assistant","Trevor Boudreau":"Ministerial Assistant"},
  notes:{"Claudia Chender":"Leads the Nova Scotia NDP, the Official Opposition.","Iain Rankin":"Interim leader of the Nova Scotia Liberal Party.",
    "Becky Druhan":"Elected as a Progressive Conservative in 2024. Left the PC caucus in October 2025 and joined the Liberals in May 2026.",
    "Claude Bourgeois":"Represents Chéticamp – Margarees – Pleasant Bay, a district created in 2026. Seated in June 2026.",
    "Elizabeth Smith-McCrossin":"Sits as an independent."},
  noteSrc:{"Becky Druhan":NS_S.druhan,"Claude Bourgeois":NS_S.mla},
  cabSub:"Chosen by the Premier from PC MLAs. As listed on the September 8, 2026 seating plan.",
  title:"Nova Scotia House of Assembly",sub:"56 MLAs, 1 per constituency, representing the people of Nova Scotia",
  seats:NS_SEATS,T:NS_T,isGov:(x,y)=>y>311,rowOf:(x,y)=>y>311?(y<450?1:y<520?2:3):(y>170?1:y>100?2:3),chair:[233,311],spkLabel:"below",
  aisle:[215,840,250,372],table:[345,311],sideLbl:{gov:[0,487],opp:[0,129]},cx:-380,titleX:-392,titleY:-372,bot:268,lineX:[-600,-150],deskW:46,deskH:40,
  confPath:(m,px,py)=>{ const hy=-300, vx=-405; return {d:`M${m.px+14},${m.py} L${vx-14},${m.py} Q${vx},${m.py} ${vx},${m.py-14} L${vx},${hy+14} Q${vx},${hy} ${vx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,lx:-330,ly:-322}; },
  placeNoun:"constituency",placeNounPl:"constituencies",lastElection:"November 26, 2024",planDate:"September 8, 2026",
  planNote:"The plan is drawn sideways; it is turned here so the Speaker is at the top and the government on the Speaker's right.",
  foldNote:"Cabinet from the September 8, 2026 seating plan. Most deputy ministers were not confirmed in the sources checked.",
  geYear:"2024",LOG:NS_LOG,logSrcs:[NS_S.mla,NS_S.druhan]};
pvWire(NS_CFG);
