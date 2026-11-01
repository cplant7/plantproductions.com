/* ================= ONTARIO CABINET (wheel) ================= */
const ON_S={
 cab:["CP24: Ford's new cabinet, Sep 10 2026","https://www.cp24.com/politics/queens-park/2026/09/10/premier-doug-ford-set-to-shuffle-his-cabinet-today/"],
 wiki:["Wikipedia: Ford ministry","https://en.wikipedia.org/wiki/Ford_ministry"],
 dm:["Ontario.ca: Meet the Secretary's team (deputy ministers)","https://www.ontario.ca/page/meet-secretarys-team"],
 sec:["Ontario.ca: Secretary of the Cabinet (updated May 2026)","https://www.ontario.ca/page/secretary-cabinet"],
 mpp:["Legislative Assembly of Ontario: Current MPPs","https://www.ola.org/en/members/current"]
};
// id|name as in the cabinet list|name as on ola.org|title|ministry ids
const ON_MIN_RAW=`sjones|Sylvia Jones|Sylvia Jones|Deputy Premier and Minister of Health|health
cooper|Michelle Cooper|Michelle Cooper|Associate Minister of Mental Health and Addictions|health
kusendova|Natalia Kusendova-Bashta|Natalia Kusendova-Bashta|Minister of Long-Term Care and Minister of Francophone Affairs|ltc,fa
rcho|Raymond Cho|Raymond Sung Joon Cho|Minister for Seniors and Accessibility|sa
calandra|Paul Calandra|Paul Calandra|Minister of Education|edu
quinn|Nolan Quinn|Nolan Quinn|Minister of Colleges, Universities, Research Excellence and Security|cu
parsa|Michael Parsa|Michael Parsa|Minister of Children, Community and Social Services|mccss
cwilliams|Charmaine Williams|Charmaine A. Williams|Associate Minister of Women's Social and Economic Opportunity|mccss
mcgregor|Graham McGregor|Graham McGregor|Minister of Citizenship and Multiculturalism|cm
bethlenfalvy|Peter Bethlenfalvy|Peter Bethlenfalvy|Minister of Finance|fin
surma|Kinga Surma|Kinga Surma|President of the Treasury Board|tbs
khanjin|Andrea Khanjin|Andrea Khanjin|Minister of Red Tape Reduction|rtr
crawford|Stephen Crawford|Stephen Crawford|Minister of Public and Business Service Delivery and Procurement|pbsdp
fedeli|Vic Fedeli|Victor Fedeli|Chair of Cabinet and Minister of Economic Development, Job Creation and Trade|edjct
tangri|Nina Tangri|Nina Tangri|Associate Minister of Small Business|edjct
thanigasalam|Vijay Thanigasalam|Vijay Thanigasalam|Associate Minister of Artificial Intelligence Adoption|edjct
tjones|Trevor Jones|Trevor Jones|Minister of Labour, Immigration, Training and Skills Development|lits
hamid|Zee Hamid|Zee Hamid|Minister of Tourism, Culture and Gaming|tcg
saunderson|Brian Saunderson|Brian Saunderson|Minister of Sport|sport
flack|Rob Flack|Rob Flack|Minister of Municipal Affairs and Housing|mah
gsmith|Graydon Smith|Graydon Smith|Associate Minister of Municipal Affairs and Housing|mah
piccini|David Piccini|David Piccini|Minister of Infrastructure|infra
sarkaria|Prabmeet Sarkaria|Prabmeet Singh Sarkaria|Minister of Transportation|mto
lthompson|Lisa Thompson|Lisa M. Thompson|Minister of Rural Affairs|rural
lecce|Stephen Lecce|Stephen Lecce|Minister of Energy and Mines|energy
rae|Matthew Rae|Matthew Rae|Associate Minister of Energy-Intensive Industries|energy
harris|Mike Harris|Mike Harris|Minister of Natural Resources|mnr
holland|Kevin Holland|Kevin Holland|Associate Minister of Forestry and Forest Products|mnr
oosterhoff|Sam Oosterhoff|Sam Oosterhoff|Minister of Agriculture, Food and Agribusiness|omafa
mccarthy|Todd McCarthy|Todd J. McCarthy|Minister of the Environment, Conservation and Parks|ecp
rickford|Greg Rickford|Greg Rickford|Minister of Indigenous Affairs and First Nations Economic Reconciliation; Minister Responsible for Ring of Fire Economic and Community Partnerships|ia
pirie|George Pirie|George Pirie|Minister of Northern Economic Development and Growth|ned
downey|Doug Downey|Doug Downey|Attorney General|ag
tibollo|Michael Tibollo|Michael A. Tibollo|Associate Attorney General|ag
kerzner|Michael Kerzner|Michael S. Kerzner|Solicitor General|sol
dunlop|Jill Dunlop|Jill Dunlop|Minister of Emergency Preparedness and Response|emerg`;
const ON_SECTORS=[
 {id:"centre",label:"Finance & Government",ids:["bethlenfalvy","surma","khanjin","crawford"]},
 {id:"econ",label:"Economy & Work",ids:["fedeli","tangri","thanigasalam","tjones","hamid","saunderson"]},
 {id:"infra",label:"Housing & Infrastructure",ids:["flack","gsmith","piccini","sarkaria","lthompson"]},
 {id:"res",label:"Resources & Environment",ids:["lecce","rae","harris","holland","oosterhoff","mccarthy"]},
 {id:"ind",label:"North & Reconciliation",ids:["rickford","pirie"]},
 {id:"people",label:"People & Communities",ids:["sjones","cooper","kusendova","rcho","calandra","quinn","parsa","cwilliams","mcgregor"]},
 {id:"global",label:"Justice & Safety",ids:["downey","tibollo","kerzner","dunlop"]}
];
const odm=(name,role,extra)=>({name,role,status:"A",src:"dm",...(extra||{})});
const ON_OUT=[
 {id:"cab",abbr:"Cabinet Office",name:"Cabinet Office",heads:[odm("Michelle E. DiEmanuele","Secretary of the Cabinet and Head of the Ontario Public Service",{src:"sec"}),odm("Shannon Fuller","Deputy Minister, Policy and Delivery; Associate Secretary of the Cabinet"),odm("John Ostrander","Deputy Minister, Public Service Renewal and Lean Excellence"),odm("Ali Veshkini","Deputy Minister of Legislative Affairs (also Infrastructure)")]},
 {id:"iga",abbr:"IGA",name:"Ministry of Intergovernmental Affairs",heads:[odm("Alexandra Sutton","Deputy Minister (also Deputy Minister, Communications, Cabinet Office)")]},
 {id:"fin",abbr:"FIN",name:"Ministry of Finance",heads:[odm("Gadi Mayman","Deputy Minister (acting, since July 2026)")]},
 {id:"tbs",abbr:"TBS",name:"Treasury Board Secretariat",heads:[odm("Carlene Alexander","Deputy Minister; Secretary of Treasury Board and Management Board of Cabinet")]},
 {id:"rtr",abbr:"RTR",name:"Ministry of Red Tape Reduction",heads:[odm("Maud Murray","Deputy Minister")]},
 {id:"pbsdp",abbr:"PBSDP",name:"Ministry of Public and Business Service Delivery and Procurement",heads:[odm("Samantha Poisson","Deputy Minister")]},
 {id:"edjct",abbr:"EDJCT",name:"Ministry of Economic Development, Job Creation and Trade",heads:[odm("JP Cadeau","Deputy Minister")]},
 {id:"lits",abbr:"LITSD",name:"Ministry of Labour, Immigration, Training and Skills Development",heads:[odm("Jonathan Lebi","Deputy Minister")]},
 {id:"tcg",abbr:"TCG",name:"Ministry of Tourism, Culture and Gaming",heads:[odm("Nancy Kennedy","Deputy Minister")]},
 {id:"sport",abbr:"SPORT",name:"Ministry of Sport",heads:[odm("Keith Palmer","Deputy Minister")]},
 {id:"mah",abbr:"MMAH",name:"Ministry of Municipal Affairs and Housing",heads:[odm("Martha Greenberg","Deputy Minister (also Rural Affairs)")]},
 {id:"infra",abbr:"INFRA",name:"Ministry of Infrastructure",heads:[odm("Ali Veshkini","Deputy Minister (also Legislative Affairs)")]},
 {id:"mto",abbr:"MTO",name:"Ministry of Transportation",heads:[odm("Bruce Macgregor","Deputy Minister (since March 2026)")]},
 {id:"rural",abbr:"RURAL",name:"Ministry of Rural Affairs",heads:[odm("Martha Greenberg","Deputy Minister (also Municipal Affairs and Housing)")]},
 {id:"energy",abbr:"ENERGY",name:"Ministry of Energy and Mines",heads:[odm("Susanna Laaksonen-Craig","Deputy Minister")]},
 {id:"mnr",abbr:"MNR",name:"Ministry of Natural Resources",heads:[odm("Drew Vanderduim","Deputy Minister (also Northern Economic Development)")]},
 {id:"omafa",abbr:"OMAFA",name:"Ministry of Agriculture, Food and Agribusiness",heads:[odm("Maud Murray","Acting Deputy Minister (since October 2026; also Red Tape Reduction)")]},
 {id:"ecp",abbr:"MECP",name:"Ministry of the Environment, Conservation and Parks",heads:[odm("Sarah Harrison","Deputy Minister")]},
 {id:"ia",abbr:"IAFNER",name:"Ministry of Indigenous Affairs and First Nations Economic Reconciliation",heads:[odm("Raj Dhir","Deputy Minister")]},
 {id:"ned",abbr:"NDMNEDG",name:"Ministry of Northern Economic Development and Growth",heads:[odm("Drew Vanderduim","Deputy Minister (also Natural Resources)")]},
 {id:"health",abbr:"HEALTH",name:"Ministry of Health",heads:[odm("Deborah Richardson","Deputy Minister")]},
 {id:"ltc",abbr:"LTC",name:"Ministry of Long-Term Care",heads:[odm("Peter Kaftarian","Deputy Minister (also Seniors and Accessibility)")]},
 {id:"fa",abbr:"OFA",name:"Ministry of Francophone Affairs",heads:[odm("Roda Muse","Deputy Minister")]},
 {id:"sa",abbr:"MSAA",name:"Ministry for Seniors and Accessibility",heads:[odm("Peter Kaftarian","Deputy Minister (also Long-Term Care)")]},
 {id:"edu",abbr:"EDU",name:"Ministry of Education",heads:[odm("Denise Cole","Deputy Minister")]},
 {id:"cu",abbr:"MCURES",name:"Ministry of Colleges, Universities, Research Excellence and Security",heads:[odm("David Wai","Deputy Minister")]},
 {id:"mccss",abbr:"MCCSS",name:"Ministry of Children, Community and Social Services",heads:[odm("Daniele Zanotti","Deputy Minister (also Women's Social and Economic Opportunity)")]},
 {id:"cm",abbr:"MCM",name:"Ministry of Citizenship and Multiculturalism",heads:[odm("Nosa Ero-Brown","Deputy Minister")]},
 {id:"ag",abbr:"MAG",name:"Ministry of the Attorney General",heads:[odm("David Corbett","Deputy Attorney General")]},
 {id:"sol",abbr:"SOLGEN",name:"Ministry of the Solicitor General",heads:[odm("Mario Di Tommaso","Deputy Solicitor General, Community Safety"),odm("Erin Hannah","Deputy Solicitor General, Correctional Services")]},
 {id:"emerg",abbr:"EPR",name:"Ministry of Emergency Preparedness and Response",heads:[odm("Matthew Pegg","Deputy Minister")]}
];
const ON_RIDING_BY_NAME={}; ON_RAW.split("\n").forEach(l=>{ const [n,r]=l.split("|"); ON_RIDING_BY_NAME[n.replace(/^Hon\. /,"")]=r; });
const ON_MIN=ON_MIN_RAW.split("\n").map(l=>{ const [id,name,ola,title,links]=l.split("|"); return {id,name,ola,title,links:links.split(","),riding:ON_RIDING_BY_NAME[ola]||null,assoc:/^Associate/.test(title)}; });
const ON_CAB_OLA=new Set(["Doug Ford",...ON_MIN.map(m=>m.ola)]);
