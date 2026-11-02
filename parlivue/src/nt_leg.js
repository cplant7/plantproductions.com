/* ================= NORTHWEST TERRITORIES: LEGISLATIVE ASSEMBLY (consensus government) ================= */
const NT_S={
 mla:["Wikipedia: 20th Northwest Territories Legislative Assembly","https://en.wikipedia.org/wiki/20th_Northwest_Territories_Legislative_Assembly"],
 plan:["Legislative Assembly of the Northwest Territories: Chamber seating plan (October 2026)","https://www.ntlegislativeassembly.ca/meet-members/mla/denny-rodgers"],
 cab:["Legislative Assembly of the NWT: Chamber seating plan, October 2026","https://www.ntlegislativeassembly.ca/meet-members/mla/denny-rodgers"],
 semmler:["CKLB Radio: Health Minister Lesa Semmler resigns, September 17 2026","https://cklbradio.com/2026/09/17/health-minister-lesa-semmler-resigns-from-20th-assembly/"],
 dm:["Government of the Northwest Territories announcements (deputy ministers, 2026), via a search summary supplied by the site owner","https://www.gov.nt.ca/en/newsroom"],
 rodgers:["CBC News: Denny Rodgers named N.W.T.'s new health and social services minister","https://www.cbc.ca/news/canada/north/denny-rodgers-named-n-w-t-s-new-health-and-social-services-minister-9.7390874"]
};
const NT_RAW=`Lucy Kuptana|Nunakput|cab|433|137
Denny Rodgers|Inuvik Boot Lake|cab|308|223
Vince McKay|Hay River South|cab|275|283
R.J. Simpson|Hay River North|cab|225|394
Caitlin Cleveland|Kam Lake|cab|241|462
Caroline Wawzonek|Yellowknife South|cab|323|549
Jay Macdonald|Thebacha|cab|422|631
Richard Edjericon|Tu Nedhe-Wiilideh|reg|820|169
Sheryl Yakeleya|Dehcho|reg|904|218
Daniel McNeely|Sahtu|reg|970|257
Robert Hawkins|Yellowknife Centre|reg|1025|302
Kieron Testart|Range Lake|reg|1060|397
Jane Weyallon Armstrong|Monfwi|reg|1052|447
Julian Morse|Frame Lake|reg|1024|504
Kate Reid|Great Slave|reg|967|544
George Nerysoo|Mackenzie Delta|reg|902|583
Shauna Morgan|Yellowknife North|reg|827|636
Shane Thompson|Nahendeh|reg|0|0`;
const NT_SEATS={}; NT_RAW.split("\n").forEach(l=>{ const [n,,,x,y]=l.split("|"); if(+x) NT_SEATS[n]=[+x,+y]; });
const NT_MIN=[
 {id:"wawzonek",name:"Caroline Wawzonek",title:"Deputy Premier; Minister of Finance and of Infrastructure; Minister responsible for the Northwest Territories Power Corporation",links:["fin","inf"]},
 {id:"macdonald",name:"Jay Macdonald",title:"Minister of Environment and Climate Change and of Justice; Government House Leader",links:["ecc","jus"]},
 {id:"rodgers",name:"Denny Rodgers",title:"Minister of Health and Social Services",links:["hss"],src:"rodgers",note:"Named Health and Social Services minister after Lesa Semmler resigned. The October 2026 seating plan still lists Lucy Kuptana as acting minister."},
 {id:"kuptana",name:"Lucy Kuptana",title:"Minister responsible for Housing Northwest Territories and the Status of Women",links:["hnwt"]},
 {id:"cleveland",name:"Caitlin Cleveland",title:"Minister of Industry, Tourism and Investment and of Education, Culture and Employment",links:["iti","ece"]},
 {id:"mckay",name:"Vince McKay",title:"Minister of Municipal and Community Affairs and of Infrastructure; responsible for the Workers' Safety and Compensation Commission and the Public Utilities Board",links:["maca","inf"]}
];
const NT_OUT=[
 {id:"exec",abbr:"EIA",name:"Executive and Indigenous Affairs",heads:[]},
 {id:"fin",abbr:"FIN",name:"Department of Finance",heads:[]},
 {id:"inf",abbr:"INF",name:"Department of Infrastructure",heads:[]},
 {id:"ecc",abbr:"ECC",name:"Department of Environment and Climate Change",heads:[]},
 {id:"jus",abbr:"JUS",name:"Department of Justice",heads:[{name:"Brad Patzer",role:"Deputy Minister from November 2, 2026, succeeding Charlene Doolittle",src:"dm"}]},
 {id:"hss",abbr:"HSS",name:"Department of Health and Social Services",heads:[]},
 {id:"hnwt",abbr:"HNWT",name:"Housing Northwest Territories",heads:[]},
 {id:"iti",abbr:"ITI",name:"Department of Industry, Tourism and Investment",heads:[]},
 {id:"ece",abbr:"ECE",name:"Department of Education, Culture and Employment",heads:[{name:"Shannon Barnett-Aikman",role:"Deputy Minister (from October 1, 2026)",src:"dm"}]},
 {id:"maca",abbr:"MACA",name:"Department of Municipal and Community Affairs",heads:[]}
];
const NT_OFFICERS=[
 {role:"Ombud",name:null,what:"Investigates complaints about unfair treatment by territorial bodies.",src:NT_S.mla},
 {role:"Information and Privacy Commissioner",name:null,what:"Oversees access-to-information and privacy laws.",src:NT_S.mla},
 {role:"Chief Electoral Officer",name:null,what:"Runs territorial elections through Elections NWT.",src:NT_S.mla},
 {role:"Integrity Commissioner",name:null,what:"Advises MLAs on conflicts of interest and investigates complaints.",src:NT_S.mla},
 {role:"Languages Commissioner",name:null,what:"Oversees the Official Languages Act; the NWT has 11 official languages.",src:NT_S.mla},
 {role:"Equal Pay Commissioner",name:null,what:"Handles complaints about pay equity in the public service.",src:NT_S.mla}
];
const NT_LOG=[["2026-09-17","vac","Lesa Semmler","Inuvik Twin Lakes","cab","vac","Resigned as MLA and Health Minister, September 2026; by-election pending"]];
CH.ntleg={id:"ntleg",title:"Legislative Assembly of the Northwest Territories",fr:"Assemblée législative des Territoires du Nord-Ouest",kicker:"",rows:2,memberNoun:"MLA",placeNoun:"Electoral district",
  groups:{cab:{name:"Cabinet (chosen by the Assembly)",short:"CAB",color:"#e2e2e2"},reg:{name:"Regular member",short:"REG",color:"#8a8a8a"},vac:{name:"Vacant",short:"VAC",color:"#3a3a3a"}},
  order:["cab","reg"],govSide:["cab"],oppSide:["reg"],speaker:"Shane Thompson",leaders:["R.J. Simpson"],majority:10,gov:"cab",src:NT_S.mla};
CH.ntleg.members=NT_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:p==="cab",sort:n,group:p,place:r}; });
CH.ntleg.summary=(c,total)=>[`<div class="hsub"><span class="majtag">Consensus government</span> No political parties · <b>${total}</b> of 19 seats filled · 1 vacant</div>`,
   `<div class="majbtn static"><span class="kicker">How it works</span><span class="bign" style="font-size:30px">No parties</span><span class="src">All MLAs are elected as independents. The whole Assembly chooses the Premier and Cabinet by secret ballot; the other MLAs act as a check on Cabinet.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>R.J. Simpson</dd><dt>Speaker</dt><dd>Shane Thompson</dd><dt>Cabinet</dt><dd>${c.cab||0} incl. Premier</dd><dt>Regular members</dt><dd>${(c.reg||0)-1} plus the Speaker</dd><dt>Vacant</dt><dd>Inuvik Twin Lakes</dd></dl>`];
const NT_T=(x,y)=>[-380+(x-625)*0.5, -280+(y-116)*0.85];
const NT_CFG={ridingKey:"nt",id:"ntleg",pre:"nt",region:"the Northwest Territories",capital:"Yellowknife",gov:"cab",govName:"Cabinet",govWord:"territorial",
  crown:"Commissioner",crownSub:"FEDERAL APPOINTEE",crownKick:"Commissioner of the Northwest Territories · non-partisan",crownRole:"appointed by the federal government. The Commissioner gives assent to bills and swears in the Premier and Cabinet",assent:"assent",
  MIN:NT_MIN,OUT:NT_OUT,execId:"exec",execLabel:"Executive and Indigenous Affairs",LG:{name:"Gerald Kisoun",title:"Commissioner of the Northwest Territories",since:"May 14, 2024",src:NT_S.mla},
  OFFICERS:NT_OFFICERS,offTitle:"Statutory officers of the Legislative Assembly",S:NT_S,minTitle:"Departments",minNoun:"Department",dirLbl:"Ministers direct departments",
  sideNames:["CABINET","REGULAR MEMBERS"],minSub:"Deputy ministers are shown where known.",colourNote:"Light dots are Cabinet; grey dots are regular MLAs. There are no political parties.",
  confLbl:["MLAs vote by secret ballot","to choose the Premier"],
  steps:["<b>Voters</b> in each of the 19 electoral districts elect one MLA, all as independents. The last general election was in November 2023.","After the election, <b>all MLAs vote by secret ballot</b> to choose the Premier and the other Cabinet ministers.","The <b>Premier</b> assigns each minister their departments. The Commissioner swears them in.","The <b>regular MLAs</b>, who are not in Cabinet, question ministers and review budgets, acting as an unofficial opposition."],
  memberLede:{reg:"A regular MLA, not in Cabinet. Regular members act as a check on Cabinet in the consensus system.",cab:"A member of Cabinet, chosen by a vote of all MLAs."},
  premier:{name:"R.J. Simpson",place:"Hay River North",lede:"Chosen as Premier by a vote of all MLAs in December 2023. Also responsible for Executive and Indigenous Affairs."},
  sec:{name:"Secretary to Cabinet",title:"Head of the public service",l1:"Secretary to Cabinet",l2:"PUBLIC SERVICE",src:NT_S.mla,lede:"Leads the public service and supports Cabinet. The current officeholder was not confirmed in the sources checked for this page."},
  roles:{"Jay Macdonald":"Government House Leader"},
  notes:{"Shane Thompson":"Elected Speaker by the Assembly in December 2023."},
  noteSrc:{"Denny Rodgers":NT_S.rodgers},
  cabSub:"Chosen by a vote of all MLAs. Portfolios from the October 2026 seating plan.",
  title:"Legislative Assembly of the NWT",sub:"19 seats, 1 per electoral district · consensus government, no parties",
  seats:NT_SEATS,T:NT_T,isGov:(x)=>x<625,rowOf:()=>1,chair:[625,116],spkLabel:"below",vacant:[[868,190]],
  aisle:null,table:[625,330],sideLbl:{gov:[300,0],opp:[960,0]},cx:-380,titleX:-380,titleY:-360,bot:205,lineX:[-600,-150],deskW:46,deskH:40,
  confPath:(m,px,py)=>{ const hy=-312, vx=-480; return {d:`M${m.px+14},${m.py} L${vx-14},${m.py} Q${vx},${m.py} ${vx},${m.py-14} L${vx},${hy+14} Q${vx},${hy} ${vx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,lx:-345,ly:-296}; },
  placeNoun:"electoral district",placeNounPl:"electoral districts",lastElection:"November 14, 2023",planDate:"October 2026",
  planNote:"Cabinet sits on the Speaker's right and regular members on the left. The dashed desk is the vacant Inuvik Twin Lakes seat.",
  foldNote:"Members and portfolios from the October 2026 chamber seating plan.",
  geYear:"2023",LOG:NT_LOG,logSrcs:[NT_S.semmler,NT_S.rodgers],total:19};
pvWire(NT_CFG);
