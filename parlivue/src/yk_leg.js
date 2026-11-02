/* ================= YUKON: LEGISLATIVE ASSEMBLY ================= */
const YK_S={
 mla:["Wikipedia: 2025 Yukon general election (results by district)","https://en.wikipedia.org/wiki/2025_Yukon_general_election"],
 plan:["Yukon Legislative Assembly: Seating plan, 36th Legislative Assembly, effective August 19, 2026","https://yukonassembly.ca/mlas"],
 cab:["Yukon Legislative Assembly: Seating plan with ministerial portfolios, August 19, 2026","https://yukonassembly.ca/mlas"],
 dm1:["Government of Yukon: Senior leadership appointments, November 24 2025","https://yukon.ca/en/news/senior-leadership-appointments-government-yukon-public-service-november-24-2025"],
 dm2:["Yukon News: Deputy minister changes across four departments, February 13 2026","https://yukon-news.com/2026/02/13/yukon-announces-deputy-minister-changes-across-four-departments/"],
 dm3:["Government of Yukon: Senior leadership changes, May 2026","https://yukon.ca/en/news/senior-leadership-changes-government-yukon-public-service-may-2026"],
 dm4:["Government of Yukon: Senior leadership appointment, June 2026","https://yukon.ca/en/news/senior-leadership-appointment-government-yukon-public-service-june2026"],
 off:["Yukon Legislative Assembly: Independent officers","https://www.yukonassembly.ca/resources/independent-officers-yukon-legislative-assembly"],
 com:["Wikipedia: Commissioner of Yukon","https://en.wikipedia.org/wiki/Commissioner_of_Yukon"]
};
// [name, district, party, x, y] — positions in the plan's own units; the plan has the Speaker on the left, turned here so the Speaker is at the top
const YK_RAW=`Carmen Gustafson|Riverdale North|ndp|93|160
Justin Ziegler|Riverdale South|ndp|180|160
Lane Tredger|Whitehorse Centre|ndp|93|265
Kate White|Takhini|ndp|180|265
Brent McDonald|Klondike|ndp|265|265
Linda Moen|Mountainview|ndp|350|265
Debra-Leigh Reti|Vuntut Gwitchin|lib|505|265
Scott Kent|Copperbelt South|yp|105|500
Currie Dixon|Copperbelt North|yp|192|500
Cory Bellmore|Mayo-Tatchun|yp|278|500
Brad Cathers|Lake Laberge|yp|365|500
Linda Benoit|Whistle Bend South|yp|452|500
Ted Laking|Porter Creek Centre|yp|538|500
Patti McLeod|Watson Lake-Ross River-Faro|yp|65|610
Laura Lang|Whitehorse West|yp|150|610
Jen Gehmair|Marsh Lake-Mount Lorne-Golden Horn|yp|235|610
Wade Istchenko|Kluane|yp|320|610
Adam Gerle|Porter Creek South|yp|405|610
Doris Anderson|Porter Creek North|yp|490|610
Tyler Porter|Southern Lakes|yp|575|610
Yvonne Clarke|Whistle Bend North|yp|0|0`;
const YK_SEATS={}; YK_RAW.split("\n").forEach(l=>{ const [n,,,x,y]=l.split("|"); if(+x) YK_SEATS[n]=[+x,+y]; });
const YK_MIN=[
 {id:"kent",name:"Scott Kent",title:"Minister of Education; Government House Leader",links:["edu"]},
 {id:"lang",name:"Laura Lang",title:"Minister of Justice; Minister responsible for the French Language Services Directorate",links:["jus","flsd"]},
 {id:"bellmore",name:"Cory Bellmore",title:"Minister of Community Services; Minister responsible for the Yukon Lottery Commission",links:["cs"]},
 {id:"gehmair",name:"Jen Gehmair",title:"Minister of Economy, Tourism and Culture; Minister responsible for the Public Service Commission",links:["etc","psc"]},
 {id:"cathers",name:"Brad Cathers",title:"Minister of Health and Social Services",links:["hss"]},
 {id:"istchenko",name:"Wade Istchenko",title:"Minister of Environment",links:["env"]},
 {id:"benoit",name:"Linda Benoit",title:"Minister of Highways and Public Works",links:["hpw"]},
 {id:"laking",name:"Ted Laking",title:"Minister of Energy, Mines and Resources; Minister responsible for the Yukon Development Corporation",links:["emr"]}
];
const ykd=(name,role,src)=>({name,role,src});
const YK_OUT=[
 {id:"exec",abbr:"ECO",name:"Executive Council Office",heads:[ykd("Kelvin Leary","Senior Deputy Minister","dm1"),ykd("Brian L. MacDonald","Associate Deputy Minister (from June 15, 2026)","dm4")]},
 {id:"fin",abbr:"FIN",name:"Department of Finance",heads:[ykd("Jason Bilsky","Deputy Minister (from April 1, 2026)","dm2")]},
 {id:"edu",abbr:"EDU",name:"Department of Education",heads:[ykd("Paul Moore","Deputy Minister","dm2")]},
 {id:"jus",abbr:"JUS",name:"Department of Justice",heads:[]},
 {id:"flsd",abbr:"FLSD",name:"French Language Services Directorate",heads:[]},
 {id:"cs",abbr:"CS",name:"Department of Community Services",heads:[]},
 {id:"etc",abbr:"ETC",name:"Economy, Tourism and Culture",heads:[ykd("Sierra van der Meer","Deputy Minister, Economic Development; also oversees Tourism and Culture","dm2")]},
 {id:"psc",abbr:"PSC",name:"Public Service Commission",heads:[]},
 {id:"hss",abbr:"HSS",name:"Department of Health and Social Services",heads:[]},
 {id:"env",abbr:"ENV",name:"Department of Environment",heads:[ykd("Dennis Berry","Deputy Minister","dm2")]},
 {id:"hpw",abbr:"HPW",name:"Department of Highways and Public Works",heads:[]},
 {id:"emr",abbr:"EMR",name:"Department of Energy, Mines and Resources",heads:[ykd("Jeff O'Farrell","Deputy Minister; also President of the Yukon Development Corporation","dm3")]}
];
const YK_OFFICERS=[
 {role:"Ombudsman, Information and Privacy Commissioner and Public Interest Disclosure Commissioner",name:null,what:"Investigates unfair treatment by public bodies, oversees access-to-information and privacy law, and handles whistleblower disclosures.",src:YK_S.off},
 {role:"Conflict of Interest Commissioner",name:null,what:"Advises MLAs on conflicts of interest and investigates complaints.",src:YK_S.off},
 {role:"Child and Youth Advocate",name:null,what:"Speaks up for young people and reviews the services they receive.",src:YK_S.off},
 {role:"Chief Electoral Officer",name:null,what:"Runs territorial elections through Elections Yukon.",src:YK_S.off}
];
CH.ykleg={id:"ykleg",title:"Yukon Legislative Assembly",fr:"Assemblée législative du Yukon",kicker:"",rows:2,memberNoun:"MLA",placeNoun:"Electoral district",
  groups:{yp:{name:"Yukon Party",short:"YP",color:"#1f5aa6"},ndp:{name:"Yukon New Democratic Party",short:"NDP",color:"var(--p-ndp)"},lib:{name:"Yukon Liberal Party",short:"LIB",color:"var(--p-lib)"}},
  order:["yp","ndp","lib"],govSide:["yp"],oppSide:["ndp","lib"],speaker:"Yvonne Clarke",leaders:["Currie Dixon","Kate White"],majority:11,gov:"yp",ge:{yp:14,ndp:6,lib:1},geLabel:"November 3, 2025 election",src:YK_S.mla};
CH.ykleg.members=YK_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:YK_MIN.some(m=>m.name===n)||n==="Currie Dixon",sort:n,group:p,place:r}; });
CH.ykleg.summary=(c,total)=>{ const gov=c.yp||0, others=total-gov, wm=gov-1-others;
  return [`<div class="hsub"><span class="majtag">Yukon Party majority</span> <b>${gov}</b> seats · ${gov-11} more than the 11 needed</div>`,
   `<div class="majbtn static"><span class="kicker">Working majority</span><span class="bign">${wm}</span><span class="src">Yukon Party MLAs minus all other MLAs, leaving out the Speaker. No vacancies.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>Currie Dixon</dd><dt>Leader of the Opposition</dt><dd>Kate White</dd><dt>Speaker</dt><dd>Yvonne Clarke</dd><dt>Since election</dt><dd>No changes</dd></dl>`]; };
const YK_T=(x,y)=>[-400+(385-y)*0.8, -250+(x-65)*0.9];
const YK_CFG={id:"ykleg",pre:"yk",region:"Yukon",capital:"Whitehorse",gov:"yp",govName:"Yukon Party",govWord:"territorial",
  crown:"Commissioner",crownSub:"FEDERAL APPOINTEE",crownKick:"Commissioner of Yukon · non-partisan",crownRole:"appointed by the federal government. The Commissioner signs bills into law and swears in the Premier and Cabinet, much as a lieutenant governor does in a province",assent:"assent",
  MIN:YK_MIN,OUT:YK_OUT,execId:"exec",execLabel:"Executive Council Office",LG:{name:"Adeline Webber",title:"Commissioner of Yukon",since:"May 31, 2023",src:YK_S.com},
  OFFICERS:YK_OFFICERS,offTitle:"Independent officers of the Legislative Assembly",S:YK_S,minTitle:"Departments",minNoun:"Department",dirLbl:"Ministers direct departments",
  premier:{name:"Currie Dixon",place:"Copperbelt North",lede:"Leader of the Yukon Party. Also Minister of Finance and Minister responsible for the Executive Council Office."},
  sec:{name:"Kelvin Leary",title:"Senior Deputy Minister, Executive Council Office",l1:"Senior Deputy Minister",l2:"EXECUTIVE COUNCIL OFFICE",src:YK_S.dm1,
    lede:"Senior Deputy Minister of the Executive Council Office, the Premier's department. His appointment was extended to November 2030."},
  oppLeader:"Kate White",oppLeaderTitle:"Leader of the Official Opposition",
  roles:{"Kate White":"Leader of the Official Opposition","Lane Tredger":"Official Opposition House Leader","Debra-Leigh Reti":"Leader of the Third Party","Patti McLeod":"Deputy Speaker and Chair of Committee of the Whole","Tyler Porter":"Deputy Chair of Committee of the Whole"},
  notes:{"Kate White":"Leads the Yukon NDP, the Official Opposition.","Debra-Leigh Reti":"The only Liberal MLA, leading the third party. Her seat was confirmed by a recount on November 12, 2025.","Patti McLeod":"Sits with the governing Yukon Party and serves as Deputy Speaker."},
  cabSub:"Chosen by the Premier from Yukon Party MLAs.",
  title:"Yukon Legislative Assembly",sub:"21 MLAs, 1 per electoral district, representing the people of Yukon",
  seats:YK_SEATS,T:YK_T,isGov:(x,y)=>y>385,rowOf:(x,y)=>({500:1,610:2,265:1,160:2})[y],chair:[65,385],spkLabel:"below",
  vacant:[[505,160]],aisle:[60,600,330,440],table:[260,385],sideLbl:{gov:[0,555],opp:[0,212]},cx:-400,titleX:-400,titleY:-342,bot:250,lineX:[-600,-150],deskW:58,deskH:56,
  confPath:(m,px,py)=>{ const hy=-292, vx=-445; return {d:`M${m.px+14},${m.py} L${vx-14},${m.py} Q${vx},${m.py} ${vx},${m.py-14} L${vx},${hy+14} Q${vx},${hy} ${vx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,lx:-362,ly:-276}; },
  placeNoun:"electoral district",placeNounPl:"electoral districts",lastElection:"November 3, 2025",planDate:"August 19, 2026",
  planNote:"The plan is drawn with the Speaker on the left; it is turned here so the Speaker is at the top and the government on the Speaker's right. The dashed desk is the Speaker's own.",
  foldNote:"Portfolios from the Assembly's August 19, 2026 seating plan; deputy ministers from Government of Yukon announcements, November 2025 to June 2026.",
  geYear:"2025",LOG:[],logSrcs:[YK_S.mla],total:21};
pvWire(YK_CFG);
