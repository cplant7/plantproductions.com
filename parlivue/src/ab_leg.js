/* ================= ALBERTA: LEGISLATIVE ASSEMBLY ================= */
const AB_S={
 mla:["Legislative Assembly of Alberta: Members of the Legislative Assembly","https://www.assembly.ab.ca/members/members-of-the-legislative-assembly"],
 plan:["Legislative Assembly of Alberta: Seating plan, 31st Legislature, 2026 fall sitting (October 27, 2026)","https://www.assembly.ab.ca/members/members-of-the-legislative-assembly"],
 cab:["Legislative Assembly of Alberta: Seating plan with ministerial titles, October 27, 2026","https://www.assembly.ab.ca/members/members-of-the-legislative-assembly"],
 shuf:["Santis Health: Alberta cabinet shuffle, May 21 2026","https://santishealth.ca/insights/alberta-cabinet-shuffle-may-21-2026/"],
 dm:["Government of Alberta: Deputy Ministers' Council","https://www.alberta.ca/deputy-ministers-council"],
 off:["Legislative Assembly of Alberta: Independent officers of the Legislature","https://www.assembly.ab.ca/learn/the-legislative-assembly/roles/independent-officers-of-the-legislature"],
 lg:["Wikipedia: Lieutenant Governor of Alberta","https://en.wikipedia.org/wiki/Lieutenant_Governor_of_Alberta"],
 getson:["CTV News: Shane Getson quits Alberta legislature, October 26 2026","https://www.ctvnews.ca/edmonton/alberta-legislature/article/shane-getson-outspoken-ucp-backbencher-quits-alberta-legislature/"],
 guthrie:["Wikipedia: Peter Guthrie","https://en.wikipedia.org/wiki/Peter_Guthrie_(politician)"]
};
const AB_RAW=`Nagwan Al-Guneid|Calgary-Glenmore|ndp
Mickey Amery|Calgary-Cross|ucp
Brooks Arcand-Paul|Edmonton-West Henday|ndp
Jackie Armstrong-Homeniuk|Fort Saskatchewan-Vegreville|ucp
Diana Batten|Calgary-Acadia|ndp
Andrew Boitchenko|Drayton Valley-Devon|ucp
Parmeet Singh Boparai|Calgary-Falconridge|ndp
Eric Bouchard|Calgary-Lougheed|ucp
Gurtej Singh Brar|Edmonton-Ellerslie|ndp
Gurinder Brar|Calgary-North East|ndp
Jodi Calahoo Stonehouse|Edmonton-Rutherford|ndp
Kyle Campbell|Calgary-Shaw|ndp
Joe Ceci|Calgary-Buffalo|ndp
Amanda Chapman|Calgary-Beddington|ndp
Scott Cyr|Bonnyville-Cold Lake-St. Paul|ucp
Lorne Dach|Edmonton-McClung|ndp
Chantelle de Jonge|Chestermere-Strathmore|ucp
Jasvir Deol|Edmonton-Meadows|ndp
Devin Dreeshen|Innisfail-Sylvan Lake|ucp
Nolan Dyck|Grande Prairie|ucp
David Eggen|Edmonton-North West|ndp
Court Ellingson|Calgary-Foothills|ndp
Mike Ellis|Calgary-West|ucp
Sarah Elmeligi|Banff-Kananaskis|ndp
Janet Eremenko|Calgary-Currie|ndp
Tanya Fir|Calgary-Peigan|ucp
Kathleen Ganley|Calgary-Mountain View|ndp
Nate Glubish|Strathcona-Sherwood Park|ucp
Nicole Goehring|Edmonton-Castle Downs|ndp
Christina Gray|Edmonton-Mill Woods|ndp
Pete Guthrie|Airdrie-Cochrane|ptp
Sharif Haji|Edmonton-Decore|ndp
Julia Hayter|Calgary-Edgemont|ndp
Sarah Hoffman|Edmonton-Glenora|ndp
Nate Horner|Drumheller-Stettler|ucp
Rhiannon Hoyle|Edmonton-South|ndp
Grant Hunter|Taber-Warner|ucp
Nathan Ip|Edmonton-South West|ndp
Janis Irwin|Edmonton-Highlands-Norwood|ndp
Brian Jean|Fort McMurray-Lac La Biche|ucp
Jennifer Johnson|Lacombe-Ponoka|ucp
Matt Jones|Calgary-South East|ucp
Kyle Kasawski|Sherwood Park|ndp
Samir Kayande|Calgary-Elbow|ndp
Adriana LaGrange|Red Deer-North|ucp
Todd Loewen|Central Peace-Notley|ucp
Martin Long|West Yellowhead|ucp
Jackie Lovely|Camrose|ucp
Brandon Lunty|Leduc-Beaumont|ucp
Myles McDougall|Calgary-Fish Creek|ucp
Ric McIver|Calgary-Hays|ucp
Luanne Metz|Calgary-Varsity|ndp
Rob Miyashiro|Lethbridge-West|ndp
Dale Nally|Morinville-St. Albert|ucp
Naheed Nenshi|Edmonton-Strathcona|ndp
Nathan Neudorf|Lethbridge-East|ucp
Demetrios Nicolaides|Calgary-Bow|ucp
Jason Nixon|Rimbey-Rocky Mountain House-Sundre|ucp
Rakhi Pancholi|Edmonton-Whitemud|ndp
Chelsae Petrovic|Livingstone-Macleod|ucp
Angela Pitt|Airdrie-East|ucp
Marie Renaud|St. Albert|ndp
Garth Rowswell|Vermilion-Lloydminster-Wainwright|ucp
Irfan Sabir|Calgary-Bhullar-McCall|ndp
Rajan Sawhney|Calgary-North West|ucp
Tara Sawyer|Olds-Didsbury-Three Hills|ucp
Marlin Schmidt|Edmonton-Gold Bar|ndp
Joseph Schow|Cardston-Siksika|ucp
David Shepherd|Edmonton-City Centre|ndp
R.J. Sigurdson|Highwood|ucp
Lori Sigurdson|Edmonton-Riverview|ndp
Scott Sinclair|Lesser Slave Lake|ucp
Peter Singh|Calgary-East|ucp
Danielle Smith|Brooks-Medicine Hat|ucp
Jason Stephan|Red Deer-South|ucp
Heather Sweet|Edmonton-Manning|ndp
Lizette Tejada|Calgary-Klein|ndp
Searle Turton|Spruce Grove-Stony Plain|ucp
Glenn van Dijken|Athabasca-Barrhead-Westlock|ucp
Ron Wiebe|Grande Prairie-Wapiti|ucp
Dan Williams|Peace River|ucp
Rick Wilson|Maskwacis-Wetaskiwin|ucp
Peggy Wright|Edmonton-Beverly-Clareview|ndp
Justin Wright|Cypress-Medicine Hat|ucp
Tany Yao|Fort McMurray-Wood Buffalo|ucp
Muhammad Yaseen|Calgary-North|ucp`;
const AB_SEATS={"Nagwan Al-Guneid":[789,151],"Mickey Amery":[463,466],"Brooks Arcand-Paul":[789,185],"Jackie Armstrong-Homeniuk":[177,189],"Diana Batten":[930,220],"Andrew Boitchenko":[319,218],"Parmeet Singh Boparai":[930,115],"Eric Bouchard":[177,544],"Gurtej Singh Brar":[1072,220],"Gurinder Brar":[930,328],"Jodi Calahoo Stonehouse":[789,293],"Kyle Campbell":[1072,292],"Joe Ceci":[1072,364],"Amanda Chapman":[930,540],"Scott Cyr":[319,652],"Lorne Dach":[1072,434],"Chantelle de Jonge":[177,509],"Jasvir Deol":[1072,544],"Devin Dreeshen":[463,646],"Nolan Dyck":[177,364],"David Eggen":[789,328],"Court Ellingson":[789,472],"Mike Ellis":[463,429],"Sarah Elmeligi":[789,115],"Janet Eremenko":[930,472],"Tanya Fir":[463,682],"Kathleen Ganley":[930,364],"Nate Glubish":[463,254],"Nicole Goehring":[1072,328],"Christina Gray":[789,360],"Pete Guthrie":[930,688],"Sharif Haji":[789,545],"Julia Hayter":[930,152],"Sarah Hoffman":[789,257],"Nate Horner":[177,328],"Rhiannon Hoyle":[930,509],"Grant Hunter":[319,429],"Nathan Ip":[930,292],"Janis Irwin":[930,254],"Brian Jean":[463,614],"Jennifer Johnson":[177,221],"Matt Jones":[177,473],"Kyle Kasawski":[930,434],"Samir Kayande":[930,617],"Adriana LaGrange":[463,286],"Todd Loewen":[463,541],"Martin Long":[319,289],"Jackie Lovely":[177,653],"Brandon Lunty":[319,361],"Myles McDougall":[319,254],"Ric McIver":[626,62],"Luanne Metz":[1072,257],"Rob Miyashiro":[1072,509],"Dale Nally":[319,322],"Naheed Nenshi":[789,395],"Nathan Neudorf":[463,502],"Demetrios Nicolaides":[463,149],"Jason Nixon":[463,323],"Rakhi Pancholi":[789,431],"Chelsae Petrovic":[177,292],"Angela Pitt":[319,112],"Marie Renaud":[930,581],"Garth Rowswell":[319,614],"Irfan Sabir":[789,217],"Rajan Sawhney":[463,183],"Tara Sawyer":[319,470],"Marlin Schmidt":[1072,186],"Joseph Schow":[463,358],"David Shepherd":[789,506],"R.J. Sigurdson":[463,111],"Lori Sigurdson":[1072,473],"Scott Sinclair":[177,616],"Peter Singh":[177,580],"Danielle Smith":[463,395],"Jason Stephan":[319,185],"Heather Sweet":[789,616],"Lizette Tejada":[930,186],"Searle Turton":[319,542],"Glenn van Dijken":[319,148],"Ron Wiebe":[177,257],"Dan Williams":[463,215],"Rick Wilson":[463,577],"Peggy Wright":[789,580],"Justin Wright":[319,503],"Tany Yao":[177,431],"Muhammad Yaseen":[319,577]};
const AB_MIN=[
 {id:"ellis",name:"Mike Ellis",title:"Deputy Premier and Minister of Public Safety and Emergency Services",links:["pses"]},
 {id:"nixon",name:"Jason Nixon",title:"President of Treasury Board and Minister of Finance",links:["tbf"]},
 {id:"schow",name:"Joseph Schow",title:"Minister of Jobs, Economy, Trade and Immigration; Government House Leader",links:["jeti"]},
 {id:"amery",name:"Mickey Amery",title:"Minister of Justice; Deputy Government House Leader",links:["jus"]},
 {id:"rjsig",name:"R.J. Sigurdson",title:"Minister of Affordability and Utilities",links:["au"]},
 {id:"jean",name:"Brian Jean",title:"Minister of Energy and Minerals",links:["em"]},
 {id:"glubish",name:"Nate Glubish",title:"Minister of Technology and Innovation",links:["ti"]},
 {id:"lagrange",name:"Adriana LaGrange",title:"Minister of Hospital and Surgical Health Services",links:["hshs"]},
 {id:"jwright",name:"Justin Wright",title:"Minister of Primary and Preventative Health Services",links:["pphs"]},
 {id:"rwilson",name:"Rick Wilson",title:"Minister of Mental Health and Addiction",links:["mha"]},
 {id:"neudorf",name:"Nathan Neudorf",title:"Minister of Assisted Living and Social Services",links:["alss"]},
 {id:"turton",name:"Searle Turton",title:"Minister of Children and Family Services",links:["cfs"]},
 {id:"nicolaides",name:"Demetrios Nicolaides",title:"Minister of Education and Childcare",links:["edu"]},
 {id:"mcdougall",name:"Myles McDougall",title:"Minister of Advanced Education",links:["ae"]},
 {id:"williams",name:"Dan Williams",title:"Minister of Municipal Affairs; Deputy Government House Leader",links:["ma"]},
 {id:"sawhney",name:"Rajan Sawhney",title:"Minister of Indigenous Relations",links:["ir"]},
 {id:"long",name:"Martin Long",title:"Minister of Infrastructure",links:["inf"]},
 {id:"dreeshen",name:"Devin Dreeshen",title:"Minister of Transportation and Economic Corridors",links:["tec"]},
 {id:"hunter",name:"Grant Hunter",title:"Minister of Environment and Protected Areas",links:["epa"]},
 {id:"loewen",name:"Todd Loewen",title:"Minister of Forestry and Parks",links:["fp"]},
 {id:"sawyer",name:"Tara Sawyer",title:"Minister of Agriculture and Irrigation",links:["agr"]},
 {id:"nally",name:"Dale Nally",title:"Minister of Service Alberta and Red Tape Reduction",links:["sa"]},
 {id:"fir",name:"Tanya Fir",title:"Minister of Arts, Culture and Status of Women",links:["acsw"]},
 {id:"boitchenko",name:"Andrew Boitchenko",title:"Minister of Tourism and Sport",links:["ts"]},
 {id:"yaseen",name:"Muhammad Yaseen",title:"Associate Minister of Multiculturalism",links:[]}
];
const abd=(name,role)=>({name,role,src:"dm"});
const AB_OUT=[
 {id:"exec",abbr:"EC",name:"Executive Council",heads:[abd("Dale McFee","Deputy Minister, Executive Council"),abd("Chris Ewert","Deputy Clerk of Executive Council and Deputy Secretary to Cabinet")]},
 {id:"iir",abbr:"IIR",name:"Intergovernmental and International Relations",heads:[abd("Mark Kleefeld","Deputy Minister")]},
 {id:"pses",abbr:"PSES",name:"Ministry of Public Safety and Emergency Services",heads:[abd("Justin Krikler","Deputy Minister")]},
 {id:"tbf",abbr:"TBF",name:"Ministry of Treasury Board and Finance",heads:[abd("Liam Stone","Deputy Minister")]},
 {id:"jeti",abbr:"JETI",name:"Ministry of Jobs, Economy, Trade and Immigration",heads:[abd("Christopher McPherson","Deputy Minister")]},
 {id:"jus",abbr:"JUS",name:"Ministry of Justice",heads:[abd("Leah McDaniel","Acting Deputy Minister and Deputy Attorney General")]},
 {id:"au",abbr:"AU",name:"Ministry of Affordability and Utilities",heads:[abd("Bryce Stewart","Deputy Minister")]},
 {id:"em",abbr:"EM",name:"Ministry of Energy and Minerals",heads:[abd("Bob Murray","Acting Deputy Minister")]},
 {id:"ti",abbr:"TI",name:"Ministry of Technology and Innovation",heads:[abd("Janak Alford","Deputy Minister")]},
 {id:"hshs",abbr:"HSHS",name:"Ministry of Hospital and Surgical Health Services",heads:[abd("Evan Romanow","Deputy Minister")]},
 {id:"pphs",abbr:"PPHS",name:"Ministry of Primary and Preventative Health Services",heads:[abd("Matt Torigian","Deputy Minister")]},
 {id:"mha",abbr:"MHA",name:"Ministry of Mental Health and Addiction",heads:[abd("Jenn Anderson","Acting Deputy Minister")]},
 {id:"alss",abbr:"ALSS",name:"Ministry of Assisted Living and Social Services",heads:[abd("Dennis Cooley","Deputy Minister")]},
 {id:"cfs",abbr:"CFS",name:"Ministry of Children and Family Services",heads:[abd("Lisa Sadownik","Deputy Minister")]},
 {id:"edu",abbr:"EDC",name:"Ministry of Education and Childcare",heads:[abd("Lora Pillipow","Deputy Minister")]},
 {id:"ae",abbr:"AE",name:"Ministry of Advanced Education",heads:[abd("Shannon Marchand","Deputy Minister")]},
 {id:"ma",abbr:"MA",name:"Ministry of Municipal Affairs",heads:[abd("Jonah Mozeson","Deputy Minister")]},
 {id:"ir",abbr:"IR",name:"Ministry of Indigenous Relations",heads:[abd("Kim Capstick","Deputy Minister")]},
 {id:"inf",abbr:"INF",name:"Ministry of Infrastructure",heads:[abd("Darren Hedley","Deputy Minister")]},
 {id:"tec",abbr:"TEC",name:"Ministry of Transportation and Economic Corridors",heads:[abd("Paul Smith","Deputy Minister")]},
 {id:"epa",abbr:"EPA",name:"Ministry of Environment and Protected Areas",heads:[abd("Stephanie Clarke","Deputy Minister")]},
 {id:"fp",abbr:"FP",name:"Ministry of Forestry and Parks",heads:[abd("Ronda Goulden","Deputy Minister")]},
 {id:"agr",abbr:"AGI",name:"Ministry of Agriculture and Irrigation",heads:[abd("Jason Hale","Deputy Minister")]},
 {id:"sa",abbr:"SARTR",name:"Ministry of Service Alberta and Red Tape Reduction",heads:[abd("Brandy Cox","Deputy Minister")]},
 {id:"acsw",abbr:"ACSW",name:"Ministry of Arts, Culture and Status of Women",heads:[abd("Heather Caltagirone","Deputy Minister and Public Service Commissioner")]},
 {id:"ts",abbr:"TS",name:"Ministry of Tourism and Sport",heads:[abd("Paul Lamoureux","Acting Deputy Minister")]}
];
const AB_OFFICERS=[
 {role:"Auditor General",name:"Phillip D. Peters",what:"Audits government ministries, departments and most agencies.",src:AB_S.off},
 {role:"Chief Electoral Officer",name:"Gordon McClure",what:"Runs provincial elections, by-elections and referendums.",src:AB_S.off},
 {role:"Child and Youth Advocate",name:"Terri Pelton",what:"Speaks up for young people receiving designated government services.",src:AB_S.off},
 {role:"Ethics Commissioner",name:"Shawn McLeod",what:"Advises MLAs on conflicts of interest and reviews their financial disclosures.",src:AB_S.off},
 {role:"Information and Privacy Commissioner",name:"Diane McLeod",what:"Reviews access-to-information decisions and investigates privacy complaints.",src:AB_S.off},
 {role:"Ombudsman and Public Interest Commissioner",name:"Kevin Brezinski",what:"Investigates unfair decisions by public bodies and handles whistleblower complaints.",src:AB_S.off}
];
const AB_LOG=[
 ["","bye","Naheed Nenshi","Edmonton-Strathcona","ndp","ndp","By-election, NDP hold (replaced Rachel Notley)"],
 ["","bye","Rob Miyashiro","Lethbridge-West","ndp","ndp","By-election, NDP hold"],
 ["","bye","Gurtej Singh Brar","Edmonton-Ellerslie","ndp","ndp","By-election, NDP hold"],
 ["","bye","Kyle Campbell","Calgary-Shaw","ucp","ndp","By-election, NDP gain from UCP"],
 ["","bye","Tara Sawyer","Olds-Didsbury-Three Hills","ucp","ucp","By-election, UCP hold"],
 ["2025-04-01","cross","Pete Guthrie","Airdrie-Cochrane","ucp","ptp","Removed from the UCP caucus, April 2025; now leads the Progressive Tory Party"],
 ["2026-10-26","vac","Shane Getson","Lac Ste. Anne-Parkland","ucp","vac","Resigned, October 2026; the seat is vacant"]
];
CH.ableg={id:"ableg",title:"Legislative Assembly of Alberta",fr:"Assemblée législative de l'Alberta",kicker:"",rows:3,memberNoun:"MLA",placeNoun:"Constituency",
  groups:{ucp:{name:"United Conservative Party",short:"UCP",color:"var(--p-con)"},ndp:{name:"Alberta New Democratic Party",short:"NDP",color:"var(--p-ndp)"},ptp:{name:"Progressive Tory Party of Alberta",short:"PTP",color:"#9999FF"},vac:{name:"Vacant",short:"VAC",color:"#3a3a3a"}},
  order:["ucp","ndp","ptp"],govSide:["ucp"],oppSide:["ndp","ptp"],speaker:"Ric McIver",leaders:["Danielle Smith","Naheed Nenshi"],majority:44,gov:"ucp",ge:{ucp:49,ndp:38,ptp:0},geLabel:"May 29, 2023 election",src:AB_S.mla};
CH.ableg.members=AB_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:AB_MIN.some(m=>m.name===n)||n==="Danielle Smith",sort:n,group:p,place:r}; });
CH.ableg.summary=(c,total)=>{ const gov=c.ucp||0, others=total-gov, wm=gov-1-others;
  return [`<div class="hsub"><span class="majtag">UCP majority</span> <b>${gov}</b> seats · ${gov-44} more than the 44 needed</div>`,
   `<div class="majbtn static"><span class="kicker">Working majority</span><span class="bign">${wm}</span><span class="src">UCP MLAs minus all other MLAs, leaving out the Speaker. One seat is vacant.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>Danielle Smith</dd><dt>Leader of the Opposition</dt><dd>Naheed Nenshi</dd><dt>Speaker</dt><dd>Ric McIver</dd><dt>Vacant</dt><dd>Lac Ste. Anne-Parkland</dd></dl>`]; };
const AB_T=(x,y)=>[-575+(x-177)*0.447, -270+(y-62)*0.9];
const AB_CFG={id:"ableg",pre:"ab",region:"Alberta",capital:"Edmonton",gov:"ucp",govName:"United Conservative Party",
  MIN:AB_MIN,OUT:AB_OUT,execId:"exec",execLabel:"Executive Council",LG:{name:"Salma Lakhani",title:"Lieutenant Governor of Alberta",since:"August 26, 2020",src:AB_S.lg},
  OFFICERS:AB_OFFICERS,offTitle:"Independent officers of the Legislature",S:AB_S,
  premier:{name:"Danielle Smith",place:"Brooks-Medicine Hat",lede:"Leader of the United Conservative Party. Also President of Executive Council and Minister of Intergovernmental and International Relations."},
  sec:{name:"Dale McFee",title:"Deputy Minister, Executive Council",l1:"Deputy Minister",l2:"EXECUTIVE COUNCIL",src:AB_S.dm,
    lede:"Deputy Minister of Executive Council, the Premier's department. Works with the deputy ministers who run each ministry."},
  oppLeader:"Naheed Nenshi",oppLeaderTitle:"Leader of the Official Opposition",
  roles:{"Naheed Nenshi":"Leader of the Official Opposition","Christina Gray":"Official Opposition House Leader","Rakhi Pancholi":"Chief Opposition Whip","Angela Pitt":"Deputy Speaker and Chair of Committees","Glenn van Dijken":"Deputy Chair of Committees","Brandon Lunty":"Chief Government Whip","Tany Yao":"Deputy Government Whip","Pete Guthrie":"Leader, Progressive Tory Party"},
  notes:{"Naheed Nenshi":"Leads the Alberta NDP, the Official Opposition.",
    "Pete Guthrie":"Removed from the UCP caucus in April 2025. Now leads the Progressive Tory Party of Alberta.",
    "Scott Sinclair":"Left the UCP caucus in 2025 and returned to it in May 2026.",
    "Angela Pitt":"Sits with the governing UCP and serves as Deputy Speaker and Chair of Committees.",
    "Nate Horner":"Sits with the governing UCP. Stepped down as Minister of Finance in May 2026."},
  noteSrc:{"Pete Guthrie":AB_S.guthrie,"Scott Sinclair":AB_S.guthrie,"Nate Horner":AB_S.shuf},
  cabSub:"Chosen by the Premier from UCP MLAs. Titles as of October 27, 2026.",
  title:"Legislative Assembly of Alberta",sub:"87 seats, 1 per constituency, representing the people of Alberta",
  seats:AB_SEATS,T:AB_T,isGov:(x)=>x<626,rowOf:(x)=>({463:1,319:2,177:3,789:1,930:2,1072:3})[x],chair:[626,62],
  aisle:[510,745,95,710],table:[626,190],sideLbl:{gov:[319,0],opp:[930,0]},cx:AB_T(626,0)[0],titleX:-360,titleY:-342,bot:312,lineX:[-600,-150],deskW:54,deskH:30,
  confPath:(m,px,py)=>{ const hy=-302, vx=AB_T(530,0)[0]; return {d:`M${m.px+14},${m.py} L${vx-14},${m.py} Q${vx},${m.py} ${vx},${m.py-14} L${vx},${hy+14} Q${vx},${hy} ${vx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,lx:-330,ly:-286}; },
  placeNoun:"constituency",placeNounPl:"constituencies",lastElection:"May 29, 2023",planDate:"October 27, 2026",
  planNote:"Desks nearest the centre aisle are the front row.",
  foldNote:"Ministerial titles from the Assembly's October 27, 2026 seating plan; deputy ministers from the Deputy Ministers' Council page.",
  geYear:"2023",LOG:AB_LOG,logSrcs:[AB_S.mla,AB_S.guthrie,AB_S.getson],ridingKey:"ab",total:87};
pvWire(AB_CFG);
