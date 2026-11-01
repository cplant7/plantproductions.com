/* ================= NUNAVUT: LEGISLATIVE ASSEMBLY (consensus government; no seating plan) ================= */
const NU_S={
 mla:["Legislative Assembly of Nunavut: Members","https://www.assembly.nu.ca/members/mla"],
 plan:["Legislative Assembly of Nunavut: Members","https://www.assembly.nu.ca/members/mla"],
 cab:["Government of Nunavut, Office of the Premier: Cabinet ministers","https://www.premier.gov.nu.ca/en/premiers-cabinet/cabinet-ministers"],
 map:["Legislative Assembly of Nunavut: Map of Nunavut constituencies","https://www.assembly.nu.ca/map-nunavut-constituencies"],
 dm:["Government of Nunavut (deputy ministers), via a search summary supplied by the site owner","https://www.gov.nu.ca/en/newsroom"],
 com:["Wikipedia: Commissioner of Nunavut","https://en.wikipedia.org/wiki/Commissioner_of_Nunavut"],
 la:["Wikipedia: Legislative Assembly of Nunavut","https://en.wikipedia.org/wiki/Legislative_Assembly_of_Nunavut"]
};
const NU_RAW=`John Main|Arviat North-Whale Cove|cab
George Hickes|Iqaluit-Tasiluk|cab
David Akeeagok|Iqaluit-Niaqunnguu|cab
Janet Pitsiulaaq Brewster|Iqaluit-Sinaa|cab
Gwen Healey Akearok|Iqaluit-Manirajak|cab
Brian Koonoo|Tununiq|cab
Cecile Nelvana Lyall|Netsilik|cab
Craig Simailak|Baker Lake|cab
Annie Tattuinee|Rankin Inlet South|cab
David Joanasie|South Baffin|reg
Hannah Angootealuk|Aivilik|reg
Edward Attagutaluk|Aggu|reg
Jason Iqaluq|Hudson Bay|reg
Jamie Kablutsiak|Arviat South|reg
Gordon Kautuk|Uqqummiut|reg
Simon Kuliktana|Kugluktuk|reg
Johnny Mike|Pangnirtung|reg
Fred Pedersen|Cambridge Bay|reg
David Porter|Gjoa Haven|reg
Abraham Qammaniq|Amittuq|reg
Alexander Sammurtok|Rankin Inlet North-Chesterfield Inlet|reg
Steven Taqtu|Quttiktuq|reg`;
const NU_MIN=[
 {id:"hickes",name:"George Hickes",title:"Deputy Premier; Minister of Justice and of Transportation and Infrastructure Nunavut; responsible for Labour and the Human Rights Tribunal",links:["jus","tin"]},
 {id:"akeeagok",name:"David Akeeagok",title:"Minister of Education; responsible for Nunavut Arctic College; Government House Leader",links:["edu"]},
 {id:"brewster",name:"Janet Pitsiulaaq Brewster",title:"Minister of Health; responsible for Suicide Prevention",links:["hlth"]},
 {id:"healey",name:"Gwen Healey Akearok",title:"Minister of Family Services; responsible for Qulliq Energy Corporation, the Status of Women, Homelessness and Poverty Reduction",links:["fs"]},
 {id:"koonoo",name:"Brian Koonoo",title:"Minister of Culture and Heritage, of Environment and of Languages; responsible for Energy",links:["ch","env"]},
 {id:"lyall",name:"Cecile Nelvana Lyall",title:"Minister responsible for the Nunavut Housing Corporation",links:["nhc"]},
 {id:"simailak",name:"Craig Simailak",title:"Minister of Community Services; responsible for the Nunavut Business Credit Corporation, Nunavut Development Corporation, Mines and Trade",links:["cs"]},
 {id:"tattuinee",name:"Annie Tattuinee",title:"Minister of Human Resources; responsible for the Workers' Safety and Compensation Commission",links:["hr"]}
];
const NU_OUT=[
 {id:"exec",abbr:"EIA",name:"Executive and Intergovernmental Affairs; Finance; Indigenous Affairs",heads:[{name:"Anna Fowler",role:"Deputy Minister and Secretary to Cabinet",src:"dm"}]},
 {id:"jus",abbr:"JUS",name:"Department of Justice",heads:[]},
 {id:"tin",abbr:"TIN",name:"Transportation and Infrastructure Nunavut",heads:[{name:"Eiryn Devereaux",role:"Deputy Minister, Transportation and Infrastructure",src:"dm"}]},
 {id:"edu",abbr:"EDU",name:"Department of Education",heads:[]},
 {id:"hlth",abbr:"HLTH",name:"Department of Health",heads:[]},
 {id:"fs",abbr:"FS",name:"Department of Family Services",heads:[]},
 {id:"ch",abbr:"CH",name:"Department of Culture and Heritage",heads:[{name:"Sandy Kownak",role:"Deputy Minister, Culture and Heritage",src:"dm"}]},
 {id:"env",abbr:"ENV",name:"Department of Environment",heads:[{name:"Michele LeBlanc-Havard",role:"Deputy Minister, Environment",src:"dm"}]},
 {id:"nhc",abbr:"NHC",name:"Nunavut Housing Corporation",heads:[{name:"Mathieu Parker",role:"President, Nunavut Housing Corporation",src:"dm"}]},
 {id:"cs",abbr:"CS",name:"Department of Community Services",heads:[{name:"Kyle Seeley",role:"Deputy Minister, Community Services",src:"dm"}]},
 {id:"hr",abbr:"HR",name:"Department of Human Resources",heads:[{name:"Kristie Cronin",role:"Deputy Minister, Human Resources",src:"dm"}]}
];
const NU_OFFICERS=[
 {role:"Chief Electoral Officer",name:null,what:"Runs territorial elections through Elections Nunavut.",src:NU_S.la},
 {role:"Information and Privacy Commissioner",name:null,what:"Oversees access-to-information and privacy laws.",src:NU_S.la},
 {role:"Integrity Commissioner",name:null,what:"Advises MLAs on conflicts of interest and investigates complaints.",src:NU_S.la},
 {role:"Languages Commissioner",name:null,what:"Protects language rights under Nunavut's official languages laws.",src:NU_S.la},
 {role:"Representative for Children and Youth",name:null,what:"Speaks up for young people and reviews the services they receive.",src:NU_S.la}
];
CH.nuleg={id:"nuleg",title:"Legislative Assembly of Nunavut",fr:"Assemblée législative du Nunavut",kicker:"",rows:2,memberNoun:"MLA",placeNoun:"Constituency",
  groups:{cab:{name:"Cabinet (chosen by the Assembly)",short:"CAB",color:"#e2e2e2"},reg:{name:"Regular member",short:"REG",color:"#8a8a8a"}},
  order:["cab","reg"],govSide:["cab"],oppSide:["reg"],speaker:"David Joanasie",leaders:["John Main"],majority:12,gov:"cab",src:NU_S.mla};
CH.nuleg.members=NU_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:p==="cab",sort:n,group:p,place:r}; });
CH.nuleg.summary=(c,total)=>[`<div class="hsub"><span class="majtag">Consensus government</span> No political parties · <b>${total}</b> MLAs</div>`,
   `<div class="majbtn static"><span class="kicker">How it works</span><span class="bign" style="font-size:30px">No parties</span><span class="src">All MLAs are elected as independents. The whole Assembly chooses the Premier and Cabinet; the other MLAs act as a check on Cabinet.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>John Main</dd><dt>Speaker</dt><dd>David Joanasie</dd><dt>Cabinet</dt><dd>${c.cab||0} incl. Premier</dd><dt>Regular members</dt><dd>${(c.reg||0)-1} plus the Speaker</dd></dl>`];
CH.nuleg.cabOrder={}; NU_MIN.forEach((m,k)=>CH.nuleg.cabOrder[m.name]=k);
chLayout(CH.nuleg);
const NU_MID=((CH.nuleg.X0-80)+CH.nuleg.W)/2;
const NU_SEATS={}; CH.nuleg.members.forEach(m=>{ if(m!==CH.nuleg.spk) NU_SEATS[m.name]=[m.x,m.y]; });
const NU_T=(x,y)=>[-340-y, x-NU_MID];
const NU_CFG={id:"nuleg",pre:"nu",region:"Nunavut",capital:"Iqaluit",gov:"cab",govName:"Cabinet",govWord:"territorial",
  crown:"Commissioner",crownSub:"FEDERAL APPOINTEE",crownKick:"Commissioner of Nunavut · non-partisan",crownRole:"appointed by the federal government. The Commissioner gives assent to bills and swears in the Premier and Cabinet",assent:"assent",
  MIN:NU_MIN,OUT:NU_OUT,execId:"exec",execLabel:"Premier's departments",LG:{name:"Lew Philip (acting)",title:"Commissioner of Nunavut (acting)",src:NU_S.com},
  OFFICERS:NU_OFFICERS,offTitle:"Independent officers of the Legislative Assembly",S:NU_S,minTitle:"Departments",minNoun:"Department",dirLbl:"Ministers direct departments",
  sideNames:["CABINET","REGULAR MEMBERS"],minSub:"Deputy ministers are shown where known.",colourNote:"Light dots are Cabinet; grey dots are regular MLAs. There are no political parties.",
  confLbl:["MLAs vote to choose","the Premier"],
  steps:["<b>Voters</b> in each of the 22 constituencies elect one MLA, all as independents. The last general election was October 27, 2025.","After the election, <b>all MLAs vote</b> to choose the Premier and the other Cabinet ministers.","The <b>Premier</b> assigns each minister their departments. The Commissioner swears them in.","The <b>regular MLAs</b>, who are not in Cabinet, question ministers and review budgets, acting as an unofficial opposition."],
  memberLede:{reg:"A regular MLA, not in Cabinet. Regular members act as a check on Cabinet in the consensus system.",cab:"A member of Cabinet, chosen by a vote of all MLAs."},
  premier:{name:"John Main",place:"Arviat North-Whale Cove",lede:"Chosen as Premier by the Assembly in November 2025. Also Minister of Executive and Intergovernmental Affairs, Finance and Indigenous Affairs, and responsible for Immigration and Seniors."},
  sec:{name:"Anna Fowler",title:"Deputy Minister and Secretary to Cabinet",l1:"Secretary to Cabinet",l2:"DEPUTY MINISTER",src:NU_S.dm,lede:"Deputy Minister and Secretary to Cabinet. Supports Cabinet and leads the public service. Name from a search summary, not yet checked against an official list."},
  roles:{"George Hickes":"Deputy Premier","David Akeeagok":"Government House Leader"},
  notes:{"David Joanasie":"Elected Speaker by the Assembly in November 2025."},
  cabSub:"Chosen by a vote of all MLAs. Portfolios from the Office of the Premier.",
  title:"Legislative Assembly of Nunavut",sub:"22 MLAs, 1 per constituency · consensus government, no parties",
  seats:NU_SEATS,T:NU_T,isGov:(x,y)=>y>0,rowOf:(x,y)=>Math.round((Math.abs(y)-48)/38)+1,chair:[CH.nuleg.X0-80,0],spkLabel:"below",
  aisle:[CH.nuleg.X0-20,CH.nuleg.W+20,-28,28],table:null,sideLbl:{gov:[0,120],opp:[0,-120]},cx:-340,titleX:-340,titleY:NU_T(CH.nuleg.X0-80,0)[1]-140,bot:NU_T(CH.nuleg.W,0)[1]+30,lineX:[-560,-120],deskW:34,deskH:30,
  confPath:(m,px,py)=>{ const top=NU_T(CH.nuleg.X0-80,0)[1], hy=top-34, vx=-340; return {d:`M${m.px+14},${m.py} L${vx-14},${m.py} Q${vx},${m.py} ${vx},${m.py-14} L${vx},${hy+14} Q${vx},${hy} ${vx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,lx:-300,ly:hy-30}; },
  placeNoun:"constituency",placeNounPl:"constituencies",lastElection:"October 27, 2025",planDate:"(no published plan)",noPlan:true,
  planNote:"No seating plan was available, so seats are grouped: Cabinet on the Speaker's right, regular members on the left. The real chamber is round.",
  foldNote:"Members from the Assembly's member list; portfolios from the Office of the Premier.",
  geYear:"2025",LOG:[],logSrcs:[NU_S.mla],ridingKey:"nu"};
pvWire(NU_CFG);
