/* ================= ONTARIO: critics, Crown, officers, riding maps ================= */
const ON_CRIT_SRC={ndp:["Legislative Assembly of Ontario: Official opposition critics","https://www.ola.org/en/members/current/opposition-critics"],
  olp:["Legislative Assembly of Ontario: Third party critics","https://www.ola.org/en/members/current/third-party-critics"]};
// [MPP name as on ola.org member list, portfolio as listed by the Assembly, ministry ids it matches (by portfolio name)]
const ON_CRITICS_RAW=[
 ["Teresa J. Armstrong","Childcare and Pensions",["edu","fin"]],
 ["Jessica Bell","Finance",["fin"]],["Jessica Bell","Treasury Board",["tbs"]],
 ["Guy Bourgouin","Natural Resources and Forestry",["mnr"]],
 ["Jeff Burch","Municipal Affairs and Skilled Trades",["mah","lits"]],
 ["Catherine Fife","Economic Development, Job Creation and Trade",["edjct"]],
 ["Jennifer K. French","Infrastructure",["infra"]],["Jennifer K. French","Transportation",["mto"]],
 ["Wayne Gates","Long Term Care, Homecare and Retirement Homes",["ltc"]],
 ["France Gélinas","Health",["health"]],["France Gélinas","Francophone Affairs",["fa"]],
 ["Alexa Gilmour","Citizenship, Multiculturalism and Ontario Autism Program",["cm","mccss"]],["Alexa Gilmour","Women's Social and Economic Opportunity",["mccss"]],
 ["Chris Glover","Sport, Technology, Innovation and Democratic Reform",["sport"]],
 ["Lisa Gretzky","Children, Community and Social Services",["mccss"]],
 ["Terence Kernaghan","Small Business, Non-Profits and the Arts",["edjct","tcg"]],
 ["Robin Lennox","Mental Health, Addictions and Primary Care",["health"]],
 ["Sol Mamakwa","Northern Economic Development and Growth",["ned"]],["Sol Mamakwa","Indigenous and Treaty Relations",["ia"]],
 ["Catherine McKenney","Housing",["mah"]],
 ["Chandra Pasma","Education",["edu"]],
 ["Tom Rakocevic","Transit",["mto"]],["Tom Rakocevic","Auto Insurance Reform",["fin"]],["Tom Rakocevic","Public and Business Service Delivery, and Procurement",["pbsdp"]],
 ["Peggy Sattler","Colleges, Universities, Research Excellence and Security",["cu"]],
 ["Sandy Shaw","Tourism, Culture and Gaming",["tcg"]],
 ["Jennifer (Jennie) Stevens","Solicitor General, Veterans, Legions and Military Affairs",["sol"]],
 ["Marit Stiles","Intergovernmental Affairs",["iga"]],
 ["Peter Tabuns","Emergency Preparedness and Response",["emerg"]],["Peter Tabuns","Environment, Conservation and Parks",["ecp"]],
 ["John Vanthof","Rural Affairs",["rural"]],["John Vanthof","Agriculture, Food, Agribusiness",["omafa"]],
 ["Lise Vaugeois","Seniors, Accessibility, WSIB and Injured Workers",["sa","lits"]],
 ["Jamie West","Energy and Mines",["energy"]],["Jamie West","Labour",["lits"]],
 ["Kristyn Wong-Tam","Attorney General and 2SLGBTQI+ Issues",["ag"]],
 ["Stephen Blais","Infrastructure and Municipal Affairs",["infra","mah"]],["Stephen Blais","Middle Class Prosperity",[]],["Stephen Blais","Government Services, Procurement and Red Tape Reduction",["pbsdp","rtr"]],
 ["Stephanie Bowman","Tariffs and International Trade",["edjct"]],["Stephanie Bowman","Finance and Treasury Board",["fin","tbs"]],["Stephanie Bowman","Interprovincial Trade",[]],
 ["Rob Cerjanec","Tourism, Sport and Culture",["tcg","sport"]],["Rob Cerjanec","Economic Development and Innovation",["edjct"]],
 ["Lucille Collard","Attorney General",["ag"]],["Lucille Collard","Francophone Affairs",["fa"]],["Lucille Collard","French Language Education",["edu"]],
 ["Lee Fairclough","Addictions and Homelessness",["health"]],["Lee Fairclough","Mental Health",["health"]],["Lee Fairclough","Hospitals",["health"]],
 ["John Fraser","Education",["edu"]],["John Fraser","Labour",["lits"]],
 ["Andrea Hazell","Women",["mccss"]],["Andrea Hazell","Small Business",["edjct"]],["Andrea Hazell","Transportation",["mto"]],
 ["Ted Hsu","Energy",["energy"]],["Ted Hsu","Rural Affairs",["rural"]],["Ted Hsu","Agriculture",["omafa"]],["Ted Hsu","Natural Resources, Mining and Forestry",["mnr","energy"]],
 ["Karen McCrimmon","Public Safety, Cybersecurity and Crime Prevention",["sol"]],["Karen McCrimmon","Solicitor General",["sol"]],
 ["Mary-Margaret McMahon","Environment and Climate",["ecp"]],["Mary-Margaret McMahon","Emergency Management",["emerg"]],
 ["Adil Shamji","Indigenous Affairs",["ia"]],["Adil Shamji","Housing",["mah"]],["Adil Shamji","Primary Care, Urgent Care and Public Health",["health"]],
 ["Stephanie Smyth","Ethics, Integrity and Accountability",[]],["Stephanie Smyth","Northern Affairs",["ned"]],["Stephanie Smyth","Seniors and Accessibility",["sa"]],
 ["Jonathan Tsao","Citizenship and Immigration",["cm","lits"]],["Jonathan Tsao","Community, Social Services, Children and Youth",["mccss"]],
 ["Tyler Watt","Training, Colleges and University",["cu","lits"]],["Tyler Watt","Long Term Care",["ltc"]]
];
const ON_LG={name:"Edith Dumont",title:"Lieutenant Governor of Ontario",src:["Office of the Lieutenant Governor of Ontario, July 3 2026","https://lgontario.ca/en/lieutenant-governor-to-visit-the-city-of-kenora/"]};
const ON_OFFICERS=[
 {role:"Auditor General",name:"Shelley Spence",what:"Audits how the government and public bodies spend money and whether programs deliver value.",src:["Office of the Auditor General of Ontario","https://auditor.on.ca/en/content/aboutus/theauditorgeneral.html"]},
 {role:"Financial Accountability Officer",name:"Jeffrey Novak",what:"Gives MPPs independent analysis of the budget, the economy and the cost of government plans. In the role since November 3, 2023.",src:["Financial Accountability Office of Ontario","https://fao-on.org/en/about/meet-the-officer/"]},
 {role:"Chief Electoral Officer",name:"Greg Essensa",what:"Runs provincial elections and by-elections through Elections Ontario. Appointed in 2008.",src:["Elections Ontario: About us","https://elections.on.ca/en/about-us.html"]},
 {role:"Integrity Commissioner",name:"Cathryn Motherwell",what:"Advises MPPs on conflicts of interest, investigates complaints about members' conduct, and registers lobbyists. Appointed in 2025.",src:["Legislative Assembly of Ontario: appointment, 2025","https://www.ola.org/en/media-centre/news-releases-2025/cathryn-motherwell-appointed-ontario-integrity-commissioner"]},
 {role:"Information and Privacy Commissioner",name:"Patricia Kosseim",what:"Oversees access-to-information and privacy laws for provincial and municipal bodies.",src:["Law Times, 2026: IPC 2026–30 strategic plan","https://www.lawtimesnews.com/practice-areas/privacy-and-data/privacy-commissioner-will-focus-more-on-real-world-impact-under-202630-strategic-plan/393152"]},
 {role:"Ombudsman (Acting)",name:"Barbara Finlay",what:"Investigates complaints about provincial and municipal services. Acting Ombudsman since April 1, 2026, until the Assembly appoints a permanent Ombudsman.",src:["International Ombudsman Institute, 2026","https://www.theioi.org/ioi-news/current-news/deputy-ombudsman-becomes-acting-ombudsman-of-ontario"]}
];
const ON_CLERK={name:"Trevor Day",role:"Clerk of the Legislative Assembly",what:"Non-partisan head of the Assembly's staff and adviser to the Speaker on procedure. Clerk since July 1, 2023.",src:["Legislative Assembly of Ontario: new Clerk appointed, 2023","https://www.ola.org/en/media-centre/news-releases-2023/new-clerk-legislative-assembly-ontario-appointed"]};
const RIDING_MAPS={
 commons:{title:"Federal electoral districts",sub:"343 ridings · 2023 Representation Order",src:["Elections Canada: Map of federal electoral districts (PDF)","https://www.elections.ca/res/cir/mapsCorner/ZZ/parlimap_45_e.pdf"]},
 ontario:{title:"Ontario electoral districts",sub:"124 ridings",src:["Elections Ontario: Current electoral district maps","https://www.elections.on.ca/en/resource-centre/electoral-districts/current-electoral-district-maps.html"]},
 bc:{title:"British Columbia electoral districts",sub:"93 ridings",src:["Government of BC: Electoral districts (maps and data)","https://www2.gov.bc.ca/gov/content/data/geographic-data-services/land-use/administrative-boundaries/electoral-districts"]},
 nu:{title:"Nunavut constituencies",sub:"22 constituencies",src:["Legislative Assembly of Nunavut: Map of Nunavut constituencies","https://www.assembly.nu.ca/map-nunavut-constituencies"]},
 ab:{title:"Alberta electoral divisions",sub:"87 electoral divisions",src:["Government of Alberta: Alberta electoral divisions poster map","https://open.alberta.ca/publications/2019-alberta-electoral-divisions-poster-map"]},
 mb:{title:"Manitoba electoral divisions",sub:"57 electoral divisions",src:["Elections Manitoba: Electoral maps","https://www.electionsmanitoba.ca/en/Resources/Maps"]},
 nb:{title:"New Brunswick electoral districts",sub:"49 ridings · 2023 boundaries",src:["Government of New Brunswick: Electoral Boundaries and Representation Commission maps","https://www2.gnb.ca/content/gnb/en/corporate/promo/boundaries-representation-commission/proposed-maps.html"]},
 pe:{title:"Prince Edward Island electoral districts",sub:"27 districts",src:["Elections PEI: Provincial district and poll maps","https://www.electionspei.ca/provincial-election-by-elections/provincial-district-and-poll-maps"]},
 sk:{title:"Saskatchewan constituencies",sub:"61 constituencies · 2024 boundaries, also used in 2028",src:["Elections Saskatchewan: Constituency maps","https://www.elections.sk.ca/candidates-political-parties/maps/"]}
};
function ridingBtn(k){ const R=RIDING_MAPS[k]; return `<a class="rbtn" href="${R.src[1]}" target="_blank" rel="noopener" title="${R.title} · ${R.sub} · ${R.src[0].split(":")[0]}"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M4 10l12-4 16 6 12-4v30l-12 4-16-6-12 4z"/><path d="M16 6v30M32 12v30"/></svg><span>Riding map</span><span class="rbtn-s">${R.src[0].split(":")[0]} ↗</span></a>`; }
function ridingCard(k){ const R=RIDING_MAPS[k]; return `<a class="rmap" href="${R.src[1]}" target="_blank" rel="noopener"><span class="rmap-i" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 10l12-4 16 6 12-4v30l-12 4-16-6-12 4z"/><path d="M16 6v30M32 12v30"/><circle cx="24" cy="22" r="3.2" fill="currentColor" stroke="none"/></svg></span><span class="rmap-t"><span class="kicker">Riding map</span><b>${R.title}</b><span>${R.sub} · ${R.src[0].split(":")[0]} ↗</span></span></a>`; }
let ON_CRITICS=null;
function onCritics(){ if(ON_CRITICS) return ON_CRITICS; const C=CH.ontario;
  ON_CRITICS=ON_CRITICS_RAW.map(([n,port,ids])=>{ const m=C.members.find(x=>x.name===n); return {m,port,ids,party:m?m.group:null}; }).filter(x=>x.m); return ON_CRITICS; }
