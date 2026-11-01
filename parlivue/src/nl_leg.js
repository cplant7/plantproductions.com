/* ================= NEWFOUNDLAND AND LABRADOR: HOUSE OF ASSEMBLY (no seating plan; grouped by party) ================= */
const NL_S={
 mla:["House of Assembly of Newfoundland and Labrador: Members","https://www.assembly.nl.ca/Members/YourMember/StoylesLucy.aspx"],
 plan:["Wikipedia: 51st General Assembly of Newfoundland and Labrador","https://en.wikipedia.org/wiki/51st_General_Assembly_of_Newfoundland_and_Labrador"],
 cab:["Wikipedia: Wakeham ministry (as of the August 20, 2026 shuffle)","https://en.wikipedia.org/wiki/Wakeham_ministry"],
 shuf:["Government of Newfoundland and Labrador: Premier Wakeham announces changes to Cabinet, August 20 2026","https://www.gov.nl.ca/releases/2026/exec/0820n02/"],
 ge:["Wikipedia: 2025 Newfoundland and Labrador general election","https://en.wikipedia.org/wiki/2025_Newfoundland_and_Labrador_general_election"],
 russell:["CBC News: Keith Russell announces split from PC party, September 2026","https://www.cbc.ca/news/canada/newfoundland-labrador/keith-russell-announces-split-from-pc-party-will-sit-as-an-independent-9.7342831"],
 dm:["Government of Newfoundland and Labrador news releases (deputy ministers), via a search summary supplied by the site owner","https://www.gov.nl.ca/releases/"],
 lg:["Wikipedia: 51st General Assembly of Newfoundland and Labrador","https://en.wikipedia.org/wiki/51st_General_Assembly_of_Newfoundland_and_Labrador"]
};
const NL_RAW=`Riley Balsom|Carbonear-Trinity-Bay de Verde|pc
Andrea Barbour|St. Barbe-L'Anse aux Meadows|pc
Mark Butt|Lewisporte-Twillingate|pc
Helen Conway Ottenheimer|Harbour Main|pc
Hal Cormier|St. George's-Humber|pc
Bernard Davis|Virginia Waters-Pleasantville|lib
Lisa Dempster|Cartwright-L'Anse au Clair|lib
Jim Dinn|St. John's Centre|ndp
Paul Dinn|Topsail-Paradise|pc
Jeff Dwyer|Placentia West-Bellevue|pc
Lela Evans|Torngat Mountains|pc
Bettina Ford|Gander|lib
Pleaman Forsey|Exploits|pc
Sherry Gambin-Walsh|Placentia-St. Mary's|lib
Mike Goosney|Humber-Gros Morne|pc
John Hogan|Windsor Lake|lib
Fred Hutton|Conception Bay East-Bell Island|lib
Eddie Joyce|Humber-Bay of Islands|ind
Michael King|Burgeo-La Poile|lib
Jamie Korab|Waterford Valley|lib
Paul Lane|Mount Pearl-Southlands|ind
Elvis Loveless|Fortune Bay-Cape La Hune|lib
Jim McKenna|Fogo Island-Cape Freels|pc
Loyola O'Driscoll|Ferryland|pc
Sheilagh O'Leary|St. John's East-Quidi Vidi|ndp
Lin Paddock|Baie Verte-Green Bay|pc
Craig Pardy|Bonavista|pc
Lloyd Parrott|Terra Nova|pc
Jim Parsons|Corner Brook|lib
Pam Parsons|Harbour Grace-Port de Grave|lib
Barry Petten|Conception Bay South|pc
Paul Pike|Burin-Grand Bank|lib
Joseph Power|Labrador West|pc
Keith Russell|Lake Melville|ind
Sarah Stoodley|Mount Scio|lib
Lucy Stoyles|Mount Pearl North|lib
Chris Tibbs|Grand Falls-Windsor-Buchans|pc
Tony Wakeham|Stephenville-Port au Port|pc
Joedy Wall|Cape St. Francis|pc
Keith White|St. John's West|lib`;
const NL_MIN=[
 {id:"petten",name:"Barry Petten",title:"Deputy Premier; Minister of Transportation and Infrastructure, Public Procurement, Municipal and Community Affairs, and Community Engagement; Deputy Government House Leader; Registrar General",links:["ti","mca"]},
 {id:"pardy",name:"Craig Pardy",title:"Minister of Finance; President of Treasury Board; Minister of Seniors; Minister responsible for the Public Service Commission, the Liquor Corporation and the Office of the Chief Information Officer",links:["fin"]},
 {id:"parrott",name:"Lloyd Parrott",title:"Minister of Energy and Mines, Government Services, Red Tape Reduction and Labour; Minister responsible for WorkplaceNL; Government House Leader",links:["em","gs"]},
 {id:"conway",name:"Helen Conway Ottenheimer",title:"Minister of Justice and Public Safety and Attorney General; responsible for the Access to Information and Protection of Privacy Office and the Human Rights Commission",links:["jps"]},
 {id:"wall",name:"Joedy Wall",title:"Minister of Health and Community Services and of Mental Health and Addictions; Minister responsible for NL Health Services",links:["hcs"]},
 {id:"pdinn",name:"Paul Dinn",title:"Minister of Education and Early Childhood Development; Minister of Advanced Education and Skills",links:["edu","aes"]},
 {id:"tibbs",name:"Chris Tibbs",title:"Minister of Housing, Social Supports and Well-Being, and Poverty Reduction; Minister responsible for the Status of Persons with Disabilities",links:["hss"]},
 {id:"paddock",name:"Lin Paddock",title:"Minister of Immigration, Jobs and Growth, Rural Development, and Francophone Affairs",links:["ijg"]},
 {id:"forsey",name:"Pleaman Forsey",title:"Minister of Forestry and Agriculture, Crown Lands, and Emergency Preparedness and Disaster Management",links:["fa"]},
 {id:"odriscoll",name:"Loyola O'Driscoll",title:"Minister of Fisheries and Aquaculture",links:["fish"]},
 {id:"evans",name:"Lela Evans",title:"Minister of Labrador Affairs and Indigenous Relations and Reconciliation; Minister of Women and Gender Equality",links:["lair"]},
 {id:"barbour",name:"Andrea Barbour",title:"Minister of Environment, Conservation and Climate Change; Minister responsible for the Multi-Materials Stewardship Board",links:["ecc"]},
 {id:"goosney",name:"Mike Goosney",title:"Minister of Tourism, Culture and Arts, and Sport, Recreation and Parks",links:["tca"]}
];
const NL_OUT=[
 {id:"exec",abbr:"EC",name:"Executive Council and Intergovernmental Affairs",heads:[]},
 {id:"ti",abbr:"TI",name:"Transportation and Infrastructure; Public Procurement",heads:[]},
 {id:"mca",abbr:"MCA",name:"Municipal and Community Affairs",heads:[]},
 {id:"fin",abbr:"FIN",name:"Finance and Treasury Board",heads:[{name:"David Drover",role:"Deputy Minister, Finance",src:"dm"},{name:"Craig Davis",role:"Deputy Minister, Seniors",src:"dm"}]},
 {id:"em",abbr:"EM",name:"Energy and Mines",heads:[]},
 {id:"gs",abbr:"GS",name:"Government Services and Labour",heads:[{name:"John Cowan",role:"Deputy Minister, Government Services",src:"dm"}]},
 {id:"jps",abbr:"JPS",name:"Justice and Public Safety",heads:[]},
 {id:"hcs",abbr:"HCS",name:"Health and Community Services",heads:[{name:"Tracy King",role:"Deputy Minister, Health and Community Services",src:"dm"}]},
 {id:"edu",abbr:"EECD",name:"Education and Early Childhood Development",heads:[{name:"Darrin Pike",role:"Deputy Minister, K-12 Education",src:"dm"}]},
 {id:"aes",abbr:"AES",name:"Advanced Education and Skills",heads:[{name:"Judith Hearn",role:"Deputy Minister, Advanced Education and Skills",src:"dm"}]},
 {id:"hss",abbr:"HSSW",name:"Housing, Social Supports and Well-Being",heads:[{name:"Jeannine Herritt",role:"Deputy Minister, Social Supports and Well-Being",src:"dm"}]},
 {id:"ijg",abbr:"IJG",name:"Immigration, Jobs and Growth",heads:[]},
 {id:"fa",abbr:"FA",name:"Forestry and Agriculture",heads:[{name:"Jamie Chippett",role:"Deputy Minister, Forestry, Agriculture, Lands, Fisheries and Aquaculture",src:"dm"}]},
 {id:"fish",abbr:"FISH",name:"Fisheries and Aquaculture",heads:[{name:"Jamie Chippett",role:"Deputy Minister, Forestry, Agriculture, Lands, Fisheries and Aquaculture",src:"dm"}]},
 {id:"lair",abbr:"LAIR",name:"Labrador Affairs and Indigenous Relations and Reconciliation",heads:[{name:"Colleen Stockley",role:"Deputy Minister, Indigenous Relations, Reconciliation and Labrador Affairs",src:"dm"}]},
 {id:"ecc",abbr:"ECCC",name:"Environment, Conservation and Climate Change",heads:[]},
 {id:"tca",abbr:"TCA",name:"Tourism, Culture and Arts; Sport, Recreation and Parks",heads:[]}
];
const NL_OFFICERS=[
 {role:"Auditor General",name:null,what:"Audits how the government spends public money.",src:NL_S.plan},
 {role:"Citizens' Representative",name:null,what:"Investigates complaints about provincial government services.",src:NL_S.plan},
 {role:"Child and Youth Advocate",name:null,what:"Speaks up for young people and reviews the services they receive.",src:NL_S.plan},
 {role:"Chief Electoral Officer and Commissioner for Legislative Standards",name:null,what:"Runs provincial elections and advises MHAs on conflicts of interest.",src:NL_S.plan},
 {role:"Information and Privacy Commissioner",name:null,what:"Oversees access-to-information and privacy laws.",src:NL_S.plan}
];
const NL_LOG=[["2026-09-14","cross","Keith Russell","Lake Melville","pc","ind","Left the PC caucus, September 2026; sits as an independent"]];
CH.nlleg={id:"nlleg",title:"House of Assembly of Newfoundland and Labrador",fr:"Chambre d'assemblée de Terre-Neuve-et-Labrador",kicker:"",rows:3,memberNoun:"MHA",placeNoun:"District",
  groups:{pc:{name:"Progressive Conservative Party of Newfoundland and Labrador",short:"PC",color:"var(--p-con)"},lib:{name:"Liberal Party of Newfoundland and Labrador",short:"LIB",color:"var(--p-lib)"},ndp:{name:"Newfoundland and Labrador New Democratic Party",short:"NDP",color:"var(--p-ndp)"},ind:{name:"Independent",short:"IND",color:"#9a9a9a"}},
  order:["pc","lib","ndp","ind"],govSide:["pc"],oppSide:["lib","ndp","ind"],speaker:"Paul Lane",leaders:["Tony Wakeham","John Hogan"],majority:21,gov:"pc",ge:{pc:21,lib:15,ndp:2,ind:2},geLabel:"October 14, 2025 election",src:NL_S.mla};
CH.nlleg.members=NL_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:NL_MIN.some(m=>m.name===n)||n==="Tony Wakeham",sort:n,group:p,place:r}; });
CH.nlleg.summary=(c,total)=>{ const gov=c.pc||0, others=total-gov-1, wm=gov-others;
  return [`<div class="hsub"><span class="majtag">PC government</span> <b>${gov}</b> of ${total} seats · the Speaker is an independent</div>`,
   `<div class="majbtn static"><span class="kicker">Working majority</span><span class="bign">${wm}</span><span class="src">PC MHAs minus all other MHAs, leaving out the Speaker (an independent). No vacancies.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>Tony Wakeham</dd><dt>Leader of the Opposition</dt><dd>John Hogan</dd><dt>Speaker</dt><dd>Paul Lane</dd><dt>Since election</dt><dd>1 party change</dd></dl>`]; };
// no seating plan: lay seats out by party, government on the Speaker's right
CH.nlleg.cabOrder={}; NL_MIN.forEach((m,k)=>CH.nlleg.cabOrder[m.name]=k);
chLayout(CH.nlleg);
const NL_MID=((CH.nlleg.X0-80)+CH.nlleg.W)/2;
const NL_SEATS={}; CH.nlleg.members.forEach(m=>{ if(m!==CH.nlleg.spk) NL_SEATS[m.name]=[m.x,m.y]; });
const NL_T=(x,y)=>[-340-y, x-NL_MID];
const NL_CFG={id:"nlleg",pre:"nl",region:"Newfoundland and Labrador",capital:"St. John's",gov:"pc",govName:"Progressive Conservative Party",
  MIN:NL_MIN,OUT:NL_OUT,execId:"exec",execLabel:"Executive Council",LG:{name:"Joan Marie Aylward",title:"Lieutenant Governor of Newfoundland and Labrador",since:"November 14, 2023",src:NL_S.lg},
  OFFICERS:NL_OFFICERS,offTitle:"Statutory officers of the House of Assembly",S:NL_S,minTitle:"Portfolios",minNoun:"Portfolio",dirLbl:"Ministers lead portfolios",
  minSub:"Grouped by minister. Deputy ministers are shown where known.",
  premier:{name:"Tony Wakeham",place:"Stephenville-Port au Port",lede:"Leader of the Progressive Conservative Party. Also President of Executive Council and Minister for Intergovernmental Affairs."},
  sec:{name:"Clerk of the Executive Council",title:"Head of the public service",l1:"Clerk",l2:"EXECUTIVE COUNCIL",src:NL_S.cab,
    lede:"Supports Cabinet and leads the deputy ministers. The current Clerk was not confirmed in the sources checked for this page."},
  oppLeader:"John Hogan",oppLeaderTitle:"Leader of the Official Opposition",
  roles:{"John Hogan":"Leader of the Official Opposition","Jim Dinn":"Leader, New Democratic Party caucus"},
  notes:{"John Hogan":"Leads the Liberal Official Opposition.","Keith Russell":"Elected as a Progressive Conservative in 2025. Left the PC caucus on September 14, 2026, at the start of the Churchill Falls debate, and sits as an independent.",
    "Eddie Joyce":"Elected as an independent."},
  noteSrc:{"Keith Russell":NL_S.russell},
  cabSub:"Chosen by the Premier from PC MHAs. As of the August 20, 2026 shuffle.",
  title:"House of Assembly",sub:"40 MHAs, 1 per district, representing the people of Newfoundland and Labrador",
  seats:NL_SEATS,T:NL_T,isGov:(x,y)=>y>0,rowOf:(x,y)=>Math.round((Math.abs(y)-48)/38)+1,chair:[CH.nlleg.X0-80,0],
  aisle:[CH.nlleg.X0-20,CH.nlleg.W+20,-28,28],table:null,sideLbl:{gov:[0,85],opp:[0,-85]},cx:-340,titleX:-340,titleY:NL_T(CH.nlleg.X0-80,0)[1]-140,bot:NL_T(CH.nlleg.W,0)[1]+30,lineX:[-560,-120],deskW:34,deskH:30,
  confPath:(m,px,py)=>{ const top=NL_T(CH.nlleg.X0-80,0)[1], hy=top-34, vx=-340; return {d:`M${m.px+14},${m.py} L${vx-14},${m.py} Q${vx},${m.py} ${vx},${m.py-14} L${vx},${hy+14} Q${vx},${hy} ${vx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,lx:-300,ly:hy-30}; },
  placeNoun:"district",placeNounPl:"districts",lastElection:"October 14, 2025",planDate:"(no published plan)",
  planNote:"No seating plan was available, so seats are grouped by party: government on the Speaker's right, opposition on the left. Positions within each group are approximate.",
  foldNote:"Cabinet as of the August 20, 2026 shuffle. Deputy ministers from a search summary of government releases, not yet checked against an official list.",
  geYear:"2025",LOG:NL_LOG,logSrcs:[NL_S.ge,NL_S.russell],memberWord:"MHA",noPlan:true};
pvWire(NL_CFG);
