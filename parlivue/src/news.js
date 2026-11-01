/* ================= PARTIES, RIDINGS, NEWS ================= */
const PARTY={
 lib:{name:"Liberal Party of Canada",color:"var(--p-lib)",src:["Wikipedia: 30th Canadian Ministry","https://en.wikipedia.org/wiki/30th_Canadian_Ministry"]},
 ndp:{name:"BC NDP",color:"var(--p-ndp)",src:["Wikipedia: Eby ministry","https://en.wikipedia.org/wiki/Eby_ministry"]},
 con:{name:"Conservative Party of BC",color:"var(--p-con)",src:null},
 ind:{name:"No party label (municipal)",color:"var(--p-ind)",src:["Capital Daily, Oct 17 2026 results","https://www.capitaldaily.ca/news/greater-victoria-municipal-election-results-2026"]},
 ps:{name:"Non-partisan public servant",color:"var(--rule)",src:null}
};
const RIDING_SRC=["House of Commons: Ministry list","https://www.ourcommons.ca/members/en/ministries"];
const RIDING={carney:"Nepean, ON",ali:"Brampton—Chinguacousy Park, ON",alty:"Northwest Territories",anand:"Oakville East, ON",anandasangaree:"Scarborough—Guildwood—Rouge Park, ON",
 champagne:"Saint-Maurice—Champlain, QC",chartrand:"Churchill—Keewatinook Aski, MB",dabrusin:"Toronto—Danforth, ON",diab:"Halifax West, NS",fraser:"Central Nova, NS",
 gullmasty:"Abitibi—Baie-James—Nunavik—Eeyou, QC",hajdu:"Thunder Bay—Superior North, ON",hodgson:"Markham—Thornhill, ON",joly:"Ahuntsic-Cartierville, QC",leblanc:"Beauséjour, NB",
 lightbound:"Louis-Hébert, QC",macdonald:"Malpeque, PE",mackinnon:"Gatineau, QC",mcguinty:"Ottawa South, ON",mcknight:"Delta, BC",michel:"Papineau, QC",
 miller:"Ville-Marie—Le Sud-Ouest—Île-des-Soeurs, QC",olszewski:"Edmonton Centre, AB",robertson:"Vancouver Fraserview—South Burnaby, BC",sidhu:"Brampton East, ON",
 solomon:"Toronto Centre, ON",thompson:"St. John's East, NL",valdez:"Mississauga—Streetsville, ON"};
const SOS_RIDING={"Ruby Sahota":"Brampton North—Caledon, ON","Buckley Belanger":"Desnethé—Missinippi—Churchill River, SK","Stephen Fuhr":"Kelowna, BC","Anna Gainey":"Notre-Dame-de-Grâce—Westmount, QC",
 "Wayne Long":"Saint John—Kennebecasis, NB","Stephanie McLean":"Esquimalt—Saanich—Sooke, BC","Nathalie Provost":"Châteauguay—Les Jardins-de-Napierville, QC","Randeep Sarai":"Surrey Centre, BC",
 "Adam van Koeverden":"Burlington North—Milton West, ON","John Zerucelli":"Etobicoke North, ON"};

const BC_TRANSITION={
 text:"<b>Government in transition.</b> BC's snap election on Oct 24, 2026 gave the BC Conservatives a majority in preliminary results. Lorne Doerkson is premier-designate; he can be sworn in once results are certified, expected Nov 18. David Eby, who resigned as NDP leader on election night, remains premier until then. This wheel shows the outgoing NDP Cabinet, which will be replaced.",
 srcs:[["The Hub, Oct 26 2026","https://thehub.ca/2026/10/26/b-c-conservatives-win-majority-as-ebys-snap-election-gamble-ends-ndp-rule/"],["Victoria Buzz, Oct 26 2026","https://victoriabuzz.com/2026/10/whats-next-for-premier-elect-doerkson-and-the-bc-conservatives/"],["Wikipedia: 2026 BC general election","https://en.wikipedia.org/wiki/2026_British_Columbia_general_election"]]
};
const NOT_RUNNING_SRC=["Wikipedia: 2026 BC general election","https://en.wikipedia.org/wiki/2026_British_Columbia_general_election"];

// News items: summaries are written here in plain words; follow the source link for the full story.
const NEWS=[
 {date:"2026-11-01",tag:"Parliament",title:"Six federal by-elections called for December 7",text:"The Prime Minister announced by-elections on December 7, 2026 in Brantford—Brant South, Laurier—Sainte-Marie, Rosemont—La Petite-Patrie, Saint-Hyacinthe—Bagot—Acton, Scarborough North and Yorkton—Melville.",
  ents:[["federal","hub"]],src:["PMO, Nov 1 2026","https://www.pm.gc.ca/en/news/news-releases/2026/11/01/prime-minister-carney-announces-elections"]},
 {date:"2026-10-31",tag:"Trade",title:"Carney says Canada won't rush a U.S. trade deal",text:"Speaking during the Canada–EU summit in Montréal, the Prime Minister said Canada would not sign a U.S. trade agreement that isn't in its interest: \"if there's not something that's in Canada's interest, we're not going to do it just for the sake of it.\" He also pointed to the economic partnership with the United Arab Emirates, \"negotiated in 47 days.\"",
  ents:[["federal","hub"]],src:["Bloomberg via The Spokesman-Review, Oct 31 2026","https://www.spokesman.com/stories/2026/oct/31/carney-says-no-hurry-on-trade-deal-if-us-wont-offe/"]},
 {date:"2026-10-30",tag:"Trade",title:"Canada and the EU launch an Alliance for the Future",text:"At the Canada–EU summit in Montréal, Prime Minister Carney, Commission President von der Leyen and Council President Costa launched an economic and security alliance. They concluded talks on digital trade and competition agreements and agreed on critical minerals investment, border security and defence cooperation. Carney expects to conclude associate-membership talks in June; the joint declaration does not use that term.",
  ents:[["federal","hub"],["federal","anand"],["federal","sidhu"],["federal","o_gac"]],src:["AP via ABC News, Oct 30 2026","https://abcnews.com/International/wireStory/prime-minister-carney-expects-conclude-talks-june-making-137703585"]},
 {date:"2026-10-29",tag:"Security",title:"First national security strategy in over 20 years",text:"The Plan for a Stronger Canada sets five priorities: economic security, foreign policy, rebuilding the Canadian Armed Forces, public safety and modern intelligence. It includes $10.9 billion over five years to upgrade digital systems at National Defence, the Armed Forces and the Communications Security Establishment.",
  ents:[["federal","hub"],["federal","mcguinty"],["federal","anandasangaree"],["federal","o_dnd"],["federal","o_ps"]],src:["PMO, Oct 29 2026","https://www.pm.gc.ca/en/news/news-releases/2026/10/29/prime-minister-carney-launches-plan-stronger-canada-strengthen"]},
 {date:"2026-10-29",tag:"Economy",title:"Up to $1.6 billion for Cohere",text:"The federal government plans to invest up to $1.6 billion in Toronto-founded AI company Cohere, alongside private investors. AI Minister Evan Solomon is named in the announcement.",
  ents:[["federal","hub"],["federal","solomon"],["federal","o_ised"]],src:["PMO speech, Oct 29 2026","https://www.pm.gc.ca/en/news/speeches/2026/10/29/prime-minister-carney-announces-landmark-investment-cohere-scale-secure"]},
 {date:"2026-10-28",tag:"Parliament",title:"Conservatives seek to call Carney before Finance committee",text:"A Conservative opposition-day motion asked the House to call the Prime Minister to testify before the Standing Committee on Finance on deficits, debt interest and taxes. The Liberals hold a majority, so the motion was not expected to pass. The House also debated Bill C-34, the Safe Social Media Act.",
  ents:[["federal","hub"],["federal","champagne"]],src:["The Hub, Oct 28 2026","https://thehub.ca/2026/10/28/parliament-today-vote-on-conservative-push-to-put-carney-before-the-finance-committee/"]},
 {date:"2026-10-28",tag:"Diplomacy",title:"Carney to attend Commonwealth summit, Nov 2–4",text:"The Prime Minister will attend the Commonwealth Heads of Government Meeting in St. John's, Antigua and Barbuda, focused on trade, investment, climate cooperation and collective security.",
  ents:[["federal","hub"],["federal","anand"]],src:["PMO, Oct 28 2026","https://www.pm.gc.ca/en/news/news-releases/2026/10/28/prime-minister-carney-attend-commonwealth-heads-government-meeting"]},
 {date:"2026-10-26",tag:"Indigenous",title:"First Nations leaders meet First Ministers",text:"The first meeting of its kind in two decades discussed a possible First Nations Sovereign Wealth Fund, economic opportunities from major projects, and reforming or replacing the Indian Act. Funding for emergency preparedness, policing and workforce programs was announced.",
  ents:[["federal","hub"],["federal","alty"],["federal","gullmasty"],["federal","anandasangaree"],["federal","o_isc"]],src:["PMO, Oct 26 2026","https://www.pm.gc.ca/en/news/news-releases/2026/10/26/prime-minister-carney-convenes-first-nations-leadership-and-first"]},
 {date:"2026-10-26",tag:"Diplomacy",title:"Crown Prince of Abu Dhabi visits Ottawa",text:"Sheikh Khaled bin Mohamed bin Zayed Al Nahyan visited Oct 26–27. The leaders planned to widen cooperation with the United Arab Emirates into defence, energy, critical minerals and artificial intelligence, building on recent trade and investment agreements.",
  ents:[["federal","hub"],["federal","sidhu"]],src:["PMO, Oct 25 2026","https://www.pm.gc.ca/en/news/news-releases/2026/10/25/prime-minister-carney-welcome-crown-prince-abu-dhabi-strengthen"]},
 {date:"2026-10-21",tag:"Trade",title:"$8.7 billion Canada–Ontario plan against tariffs",text:"Prime Minister Carney and Premier Ford launched a joint plan for steel, autos and critical minerals. It creates a Joint Steel Action Fund ($3.55 billion federal, $1.67 billion Ontario), $2.5 billion for auto production lines, and matched funding of up to $1 billion for Ring of Fire roads.",
  ents:[["federal","hub"],["federal","joly"],["federal","hodgson"]],people:[["Doug Ford","onpc"]],src:["PMO, Oct 21 2026","https://www.pm.gc.ca/en/news/news-releases/2026/10/21/prime-minister-carney-and-premier-ford-launch-new-action-plan-protect"]},
 {date:"2026-10-20",tag:"Unity",title:"Alberta votes to stay in Canada",text:"In a non-binding vote on Oct 19, unofficial results showed about 75% of Albertans chose to remain a province rather than start a process toward separation. Carney called it a great result for Canada. He had campaigned at a unity rally in Calgary the week before.",
  ents:[["federal","hub"]],src:["NPR via WUNC, Oct 20 2026","https://www.wunc.org/2026-10-20/alberta-voters-reject-a-move-toward-independence-in-referendum-backing-canadian-unity"]},
 {date:"2026-10-11",tag:"Diplomacy",title:"Carney speaks with President Trump",text:"The Prime Minister's Office published a readout of a call between the Prime Minister and the U.S. President.",
  ents:[["federal","hub"],["federal","leblanc"]],src:["PMO readout, Oct 11 2026","https://www.pm.gc.ca/en/news/readouts/2026/10/11/prime-minister-carney-speaks-president-united-states-donald-j-trump"]},
 {date:"2026-10-08",tag:"Parliament",title:"Major projects bill C-39 clears first vote",text:"A key bill in the government's economic agenda passed second reading 296 to 26. Conservatives voted with the Liberals to send it to a special committee for study.",
  ents:[["federal","hub"],["federal","mackinnon"]],src:["CTV News, Oct 8 2026","https://www.ctvnews.ca/politics/article/major-government-economic-legislation-c-39-clears-first-vote/"]},
 {date:"2026-10-08",tag:"Housing",title:"$2 billion to retrofit one million homes",text:"A new National Heat Pump Rebate offers eligible households up to $10,000. A separate stream aims to retrofit 280,000 apartment units through CMHC and the Canada Infrastructure Bank.",
  ents:[["federal","hub"],["federal","robertson"],["federal","dabrusin"]],src:["PMO, Oct 8 2026","https://www.pm.gc.ca/en/news/news-releases/2026/10/08/prime-minister-carney-announces-landmark-investment-retrofit-one"]}
];

// Leadership changes (person out → person in)
const CHANGES=[
 {date:"2026-07-13",level:"Federal",seat:"Commissioner of Revenue (CRA)",out:"Bob Hamilton",in:"Heather Evans",ent:["federal","o_cra"],src:["CRA Commissioner page","https://www.canada.ca/en/revenue-agency/corporate/about-canada-revenue-agency-cra/commissioners.html"]},
 {date:"2026-03-23",level:"Federal",seat:"Deputy Minister of Veterans Affairs",in:"Nancy Gardiner",ent:["federal","o_vac"],src:["VAC department officials","https://www.veterans.gc.ca/en/about-vac/who-we-are/department-officials"]},
 {date:"2026-03-04",level:"Federal",seat:"Seven deputy minister posts",in:"Thangaraj (Foreign Affairs), Purves (Trade), Termorshuizen (Development), Vandergrift (Transport), Gallivan (IRCC), MacKinnon (DFO), Gardiner (VAC)",ent:["federal","o_gac"],src:["PMO, Mar 4 2026","https://www.pm.gc.ca/en/news/news-releases/2026/03/04/prime-minister-carney-announces-changes-senior-ranks-public-service"]},
 {date:"2026-01-28",level:"Federal",seat:"Deputy Minister of National Defence",out:"Stefanie Beck",in:"Christiane Fox",ent:["federal","o_dnd"],src:["Wikipedia: Stefanie Beck","https://en.wikipedia.org/wiki/Stefanie_Beck"]}
];
