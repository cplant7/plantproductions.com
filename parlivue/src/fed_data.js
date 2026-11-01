const S = {
  cab:["PM Cabinet page","https://www.pm.gc.ca/en/cabinet"],
  sos:["PM Secretaries of State page","https://www.pm.gc.ca/en/secretaries-state"],
  dec:["PM senior ranks announcement, Dec 19 2025","https://www.pm.gc.ca/en/news/news-releases/2025/12/19/prime-minister-carney-announces-changes-senior-ranks-public-service"],
  mar:["PM senior ranks announcement, Mar 4 2026","https://www.pm.gc.ca/en/news/news-releases/2026/03/04/prime-minister-carney-announces-changes-senior-ranks-public-service"],
  pco:["PCO org chart, Aug 17 2026","https://www.canada.ca/content/dam/pco-bcp/images/org/Org-August17-2026.pdf"],
  cra:["CRA Commissioner page (Jul 2026)","https://www.canada.ca/en/revenue-agency/corporate/about-canada-revenue-agency-cra/commissioners.html"],
  ised:["ISED management page","https://ised-isde.canada.ca/site/ised/en/our-ministers"],
  esdc:["ESDC official bio (updated Jan 2026)","https://www.canada.ca/en/employment-social-development/corporate/official-paul-thompson.html"],
  ps:["Public Safety DM page (updated Mar 2026)","https://www.securitepublique.gc.ca/cnt/bt/dpt-mnstr-en.aspx"],
  wage:["House committee witness, May 7 2026","https://openparliament.ca/committees/status-of-women/45-1/38/"],
  tbs:["TBS hospitality record, Dec 2025","https://search.open.canada.ca/hospitality/record/tbs-sct%2CH-2026-P10-004"],
  cir:["Senate committee witness, Feb 25 2026","https://sencanada.ca/en/content/sen/committee/451/appa/22ev-57529-e"],
  eccc:["ECCC DM page (updated Jul 2025)","https://www.canada.ca/en/environment-climate-change/corporate/structure/deputy-minister.html"],
  pspc:["PSPC DM page (updated Dec 2023)","https://www.canada.ca/en/public-services-procurement/corporate/organizational-structure/deputy-minister.html"],
  aafc:["Western Producer coverage, 2026","https://www.producer.com/tag/lawrence-hanson/"],
  hicc:["HICC DM page (undated)","https://housing-infrastructure.canada.ca/about-apropos/people-personnes/dm-sm-eng.html"],
  pch:["Canadian Heritage DM page","https://www.canada.ca/en/canadian-heritage/corporate/organization-structure/deputy-minister.html"],
  geds:["GEDS directory export (Oct 25 2026)","https://open.canada.ca/data/en/dataset/8ec4a9df-b76b-4a67-8f93-cdbc2e040098"],
  tc:["Transport Canada DM page (Mar 2026)","https://tc.canada.ca/en/corporate-services/our-deputy-minister"],
  vac:["VAC department officials page (Oct 2026)","https://www.veterans.gc.ca/en/about-vac/who-we-are/department-officials"],
  fednor:["FedNor President page (May 2026)","https://fednor.canada.ca/en/about-us/president-federal-economic-development-agency-northern-ontario"],
  acoa:["ACOA President page (updated Jul 2024)","https://www.canada.ca/en/atlantic-canada-opportunities/corporate/president.html"],
  prairies:["PrairiesCan President page (updated Sep 2025)","https://www.canada.ca/en/prairies-economic-development/corporate/about/deputy-head.html"]
};

const ministers = [
 {id:"carney",name:"Mark Carney",title:"Prime Minister of Canada",pm:true,depts:["pco"]},
 {id:"leblanc",name:"Dominic LeBlanc",title:"President of the King’s Privy Council for Canada and Minister responsible for Canada-U.S. Trade, Intergovernmental Affairs, Internal Trade and One Canadian Economy",depts:["pco"]},
 {id:"joly",name:"Mélanie Joly",title:"Minister of Industry and Minister responsible for Canada Economic Development for Quebec Regions",depts:["ised","ced"]},
 {id:"champagne",name:"François-Philippe Champagne",title:"Minister of Finance and National Revenue",depts:["fin","cra"]},
 {id:"anand",name:"Anita Anand",title:"Minister of Foreign Affairs",depts:["gac"]},
 {id:"hajdu",name:"Patty Hajdu",title:"Minister of Jobs and Families and Minister responsible for the Federal Economic Development Agency for Northern Ontario",depts:["esdc","fednor"]},
 {id:"miller",name:"Marc Miller",title:"Minister of Canadian Identity and Culture and Minister responsible for Official Languages",depts:["pch"]},
 {id:"fraser",name:"Sean Fraser",title:"Minister of Justice and Attorney General of Canada and Minister responsible for the Atlantic Canada Opportunities Agency",depts:["jus","acoa"]},
 {id:"anandasangaree",name:"Gary Anandasangaree",title:"Minister of Public Safety",depts:["ps"]},
 {id:"valdez",name:"Rechie Valdez",title:"Minister of Women and Gender Equality and Secretary of State (Small Business and Tourism)",depts:["wage"]},
 {id:"mackinnon",name:"Steven MacKinnon",title:"Minister of Transport and Leader of the Government in the House of Commons",depts:["tc"],note:"House Leader is a parliamentary role with no department of its own."},
 {id:"mcguinty",name:"David J. McGuinty",title:"Minister of National Defence",depts:["dnd"]},
 {id:"thompson",name:"Joanne Thompson",title:"Minister of Fisheries",depts:["dfo"]},
 {id:"ali",name:"Shafqat Ali",title:"President of the Treasury Board",depts:["tbs"]},
 {id:"alty",name:"Rebecca Alty",title:"Minister of Crown-Indigenous Relations",depts:["cirnac"]},
 {id:"chartrand",name:"Rebecca Chartrand",title:"Minister of Northern and Arctic Affairs and Minister responsible for the Canadian Northern Economic Development Agency",depts:["cirnac","cannor"]},
 {id:"dabrusin",name:"Julie Aviva Dabrusin",title:"Minister of the Environment, Climate Change and Nature",depts:["eccc"]},
 {id:"diab",name:"Lena Metlege Diab",title:"Minister of Immigration, Refugees and Citizenship",depts:["ircc"]},
 {id:"gullmasty",name:"Mandy Gull-Masty",title:"Minister of Indigenous Services",depts:["isc"]},
 {id:"hodgson",name:"Tim Hodgson",title:"Minister of Energy and Natural Resources",depts:["nrcan"]},
 {id:"lightbound",name:"Joël Lightbound",title:"Minister of Government Transformation, Public Works and Procurement and Québec Lieutenant",depts:["pspc"]},
 {id:"macdonald",name:"Heath MacDonald",title:"Minister of Agriculture and Agri-Food",depts:["aafc"]},
 {id:"mcknight",name:"Jill McKnight",title:"Minister of Veterans Affairs and Associate Minister of National Defence",depts:["vac","dnd"]},
 {id:"michel",name:"Marjorie Michel",title:"Minister of Health",depts:["hc"]},
 {id:"olszewski",name:"Eleanor Olszewski",title:"Minister of Emergency Management and Community Resilience and Minister responsible for Prairies Economic Development Canada",depts:["prairiescan"],note:"I couldn't confirm which department supports the emergency management portfolio, so no link is drawn for it."},
 {id:"robertson",name:"Gregor Robertson",title:"Minister of Housing and Infrastructure and Minister responsible for Pacific Economic Development Canada",depts:["hicc","pacifican"]},
 {id:"sidhu",name:"Maninder Sidhu",title:"Minister of International Trade",depts:["gac"]},
 {id:"solomon",name:"Evan Solomon",title:"Minister of Artificial Intelligence and Digital Innovation and Minister responsible for the Federal Economic Development Agency for Southern Ontario",depts:["ised","feddev"]}
];

const G = d => "GEDS record updated "+d;
const depts = [
 {id:"pco",abbr:"PCO",name:"Privy Council Office",heads:[
   {name:"Michael Sabia",role:"Clerk of the Privy Council and Secretary to the Cabinet",status:"A",src:"pco",also:G("Feb 2026")},
   {name:"Isabelle Mondou",role:"Deputy Clerk and Associate Secretary to the Cabinet",status:"A",src:"pco",also:G("Jan 2026")},
   {name:"Alison O’Leary",role:"Deputy Minister of Intergovernmental Affairs",status:"A",src:"pco",also:G("Jan 2026")}]},
 {id:"fin",abbr:"FIN",name:"Department of Finance Canada",heads:[{name:"Nick Leswick",role:"Deputy Minister of Finance",status:"A",src:"geds",also:"GEDS record updated Sep 2026; announced Dec 2025"}]},
 {id:"cra",abbr:"CRA",name:"Canada Revenue Agency",heads:[{name:"Heather Evans",role:"Commissioner of Revenue (effective Jul 13, 2026)",status:"A",src:"cra",also:G("Sep 2026")}]},
 {id:"gac",abbr:"GAC",name:"Global Affairs Canada",heads:[
   {name:"Arun Thangaraj",role:"Deputy Minister of Foreign Affairs",status:"A",src:"geds",also:"GEDS record updated Apr 2026; announced Mar 2026"},
   {name:"Glenn Purves",role:"Deputy Minister of International Trade",status:"A",src:"geds",also:"GEDS lists him in the DM International Trade office (Mar 2026); announced Mar 2026"},
   {name:"Cindy Termorshuizen",role:"Deputy Minister of International Development",status:"A",src:"geds",also:"GEDS record updated Apr 2026; announced Mar 2026"}]},
 {id:"ised",abbr:"ISED",name:"Innovation, Science and Economic Development Canada",heads:[{name:"Philip Jennings",role:"Deputy Minister",status:"A",src:"ised"}]},
 {id:"ced",abbr:"CED",name:"Canada Economic Development for Quebec Regions",heads:[{name:"Sony Perron",role:"Deputy Minister / President",status:"A",src:"ised",also:G("Oct 2026")}]},
 {id:"feddev",abbr:"FedDev",name:"Federal Economic Development Agency for Southern Ontario",heads:[{name:"Kaili Levesque",role:"President (also Associate Deputy Minister of ISED)",status:"A",src:"ised",also:"GEDS lists her in the President's office (Sep 2026)"}]},
 {id:"esdc",abbr:"ESDC",name:"Employment and Social Development Canada",heads:[
   {name:"Paul Thompson",role:"Deputy Minister of Employment and Social Development",status:"A",src:"esdc",also:G("Nov 2025")},
   {name:"Rob Wright",role:"Deputy Minister of Labour",status:"A",src:"geds",also:"GEDS record updated Feb 2026; announced Dec 2025"}]},
 {id:"fednor",abbr:"FedNor",name:"Federal Economic Development Agency for Northern Ontario",heads:[{name:"Valerie Gideon",role:"President (concurrently Deputy Minister of Crown-Indigenous Relations)",status:"A",src:"fednor",also:"Signed FedNor's financial report Jul 22, 2026; "+G("Sep 2026")}]},
 {id:"pch",abbr:"PCH",name:"Canadian Heritage",heads:[{name:"Francis Bilodeau",role:"Deputy Minister",status:"A",src:"pch",also:G("Jan 2026")}]},
 {id:"jus",abbr:"JUS",name:"Department of Justice Canada",heads:[{name:"Marie-Josée Hogue",role:"Deputy Minister and Deputy Attorney General",status:"A",src:"geds",also:"GEDS record updated Feb 2026; announced Dec 2025"}]},
 {id:"acoa",abbr:"ACOA",name:"Atlantic Canada Opportunities Agency",heads:[{name:"Laura Lee Langley",role:"President (since Jul 2024)",status:"C",src:"acoa",also:G("Jul 2024")}]},
 {id:"ps",abbr:"PS",name:"Public Safety Canada",heads:[{name:"Tricia Geddes",role:"Deputy Minister",status:"A",src:"ps",also:"Not listed in GEDS"}]},
 {id:"wage",abbr:"WAGE",name:"Women and Gender Equality Canada",heads:[{name:"Frances McRae",role:"Deputy Minister",status:"A",src:"wage",also:"Not listed in GEDS"}]},
 {id:"tc",abbr:"TC",name:"Transport Canada",heads:[{name:"Michael Vandergrift",role:"Deputy Minister (since Mar 2026)",status:"A",src:"tc"}]},
 {id:"dnd",abbr:"DND",name:"National Defence",heads:[
   {name:"Christiane (Chris) Fox",role:"Deputy Minister",status:"A",src:"geds",also:"GEDS record updated Apr 2026; announced Dec 2025"},
   {name:"Kevin Brosseau",role:"Senior Associate Deputy Minister (also Commissioner of the Canadian Coast Guard)",status:"A",src:"geds",also:"GEDS record updated Jun 2026; announced Mar 2026"}]},
 {id:"dfo",abbr:"DFO",name:"Fisheries and Oceans Canada",heads:[{name:"Paul MacKinnon",role:"Deputy Minister",status:"B",src:"mar",also:"Conflict: GEDS still lists Annette Gibbons, but that record dates from Aug 2024, before the announcement"}]},
 {id:"tbs",abbr:"TBS",name:"Treasury Board of Canada Secretariat",heads:[{name:"Bill Matthews",role:"Secretary of the Treasury Board",status:"C",src:"tbs",also:G("Jun 2024")}]},
 {id:"cirnac",abbr:"CIRNAC",name:"Crown-Indigenous Relations and Northern Affairs Canada",heads:[{name:"Valerie Gideon",role:"Deputy Minister (concurrently President of FedNor)",status:"A",src:"fednor",also:"Also a Senate committee witness as DM, Feb 2026"}]},
 {id:"cannor",abbr:"CanNor",name:"Canadian Northern Economic Development Agency",heads:[{name:"Jimi Onalik",role:"President and Deputy Minister",status:"A",src:"geds",also:G("May 2026")}]},
 {id:"eccc",abbr:"ECCC",name:"Environment and Climate Change Canada",heads:[{name:"Mollie Johnson",role:"Deputy Minister (since Jun 2025)",status:"C",src:"eccc",also:G("Jul 2025")}]},
 {id:"ircc",abbr:"IRCC",name:"Immigration, Refugees and Citizenship Canada",heads:[{name:"Ted Gallivan",role:"Deputy Minister",status:"A",src:"geds",also:"GEDS record updated May 2026; announced Mar 2026"}]},
 {id:"isc",abbr:"ISC",name:"Indigenous Services Canada",heads:[{name:"Michelle Kovacevic",role:"Deputy Minister",status:"A",src:"geds",also:"GEDS record updated May 2026; announced Dec 2025"}]},
 {id:"nrcan",abbr:"NRCan",name:"Natural Resources Canada",heads:[{name:"Greg Orencsak",role:"Deputy Minister",status:"A",src:"geds",also:"GEDS record updated Oct 2026; announced Dec 2025"}]},
 {id:"pspc",abbr:"PSPC",name:"Public Services and Procurement Canada",heads:[{name:"Arianne Reza",role:"Deputy Minister (since Nov 2023)",status:"C",src:"pspc",also:"Not listed in GEDS"}]},
 {id:"aafc",abbr:"AAFC",name:"Agriculture and Agri-Food Canada",heads:[{name:"Lawrence Hanson",role:"Deputy Minister",status:"C",src:"aafc",also:G("Jul 2024")}]},
 {id:"vac",abbr:"VAC",name:"Veterans Affairs Canada",heads:[{name:"Nancy Gardiner",role:"Deputy Minister (since Mar 23, 2026)",status:"A",src:"vac",also:"GEDS still shows the previous DM in a 2022 record"}]},
 {id:"hc",abbr:"HC",name:"Health Canada",heads:[{name:"Shalene Curtis-Micallef",role:"Deputy Minister",status:"A",src:"geds",also:"GEDS record updated Oct 2026; announced Dec 2025"}]},
 {id:"hicc",abbr:"HICC",name:"Housing, Infrastructure and Communities Canada",heads:[{name:"Paul Halucha",role:"Deputy Minister (since Dec 2024)",status:"C",src:"hicc",also:G("Dec 2025")}]},
 {id:"pacifican",abbr:"PacifiCan",name:"Pacific Economic Development Canada",heads:[{name:"Naina Sloan",role:"President",status:"A",src:"geds",also:G("Jun 2026")}]},
 {id:"prairiescan",abbr:"PrairiesCan",name:"Prairies Economic Development Canada",heads:[{name:"Diane Gray",role:"President (since Oct 2022)",status:"C",src:"prairies",also:G("Nov 2022")}]}
];

const secretaries = [
 ["Ruby Sahota","Combatting Crime"],["Buckley Belanger","Rural Development"],["Stephen Fuhr","Defence Procurement"],
 ["Anna Gainey","Children and Youth"],["Wayne Long","Canada Revenue Agency and Financial Institutions"],["Stephanie McLean","Seniors"],
 ["Nathalie Provost","Nature"],["Randeep Sarai","International Development"],["Adam van Koeverden","Sport"],["John Zerucelli","Labour"]
];



