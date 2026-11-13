/* Newfoundland and Labrador departments scorecard data (Nov 13 2026). DOLLARS, net of related revenue (the basis of the Estimates).
   NLP26 / NLP25: Report on the Program Expenditures and Revenues of the Consolidated Revenue Fund, departmental
   "Summary of Gross Expenditure and Unexpended Balances" blocks:
     FY 2025-26: https://www.gov.nl.ca/exec/tbs/files/Cash-Statements-2026-Web-Version-3.pdf (tabled Sept 29, 2026)
     FY 2024-25: https://www.gov.nl.ca/exec/tbs/files/Cash-Statements-2025-with-signed-letter-Final.pdf
     (FY 2024-25 Labrador Affairs read from the page image, printed p. 48.)
   Row: [name, original estimates (net), transfers of estimates, supplementary supply, total net expenditure]
   Checks: FY 2025-26 originals 11,079,420,900 and net expenditure 10,663,300,359 = Statement of Budgetary Contribution
   (11,079,421k / 10,663,300k); transfers add to zero. FY 2024-25: 9,957,612,100 / 9,652,176,490 (9,957,612k / 9,652,176k).
   NLE27: Estimates 2026-27, Summary of Current and Capital Account by Department (p. vii), net expenditure:
     https://www.gov.nl.ca/budget/2026/wp-content/uploads/sites/10/Estimates-2026.pdf
   NL_GOV: Consolidated Summary Financial Statements, March 31, 2026 (audited), THOUSANDS: [original budget, actual 2026, actual 2025]
     https://www.gov.nl.ca/exec/tbs/files/Consolidated-Summary-Financial-Statements-March-31-2026-Web.pdf */
const NLP26=[
 ["Consolidated Fund Services",1973999000,-385692200,0,1559002287],["Executive Council",420608800,-132138300,0,282020578],["Finance",34132700,-8144400,0,23801888],
 ["Government Services",33549600,0,0,30664857],["Labrador Affairs",18557200,300000,0,17234136],["Public Procurement Agency",2378200,0,0,1991154],
 ["Public Service Commission",11328300,256000,0,11396083],["Transportation and Infrastructure",1290572300,0,0,1120603497],["Legislature",41554200,0,0,35748688],
 ["Energy and Mines",51892900,40000,0,38894549],["Environment, Conservation and Climate Change",34894100,0,0,27110064],["Fisheries and Aquaculture",17874200,0,0,15276672],
 ["Forestry, Agriculture and Lands",86957500,43033000,0,109084929],["Jobs, Growth and Rural Development",155257674,-40000,0,116683750],["Tourism, Culture, Arts and Recreation",80567300,1861900,0,81500748],
 ["Education and Early Childhood Development",1232951026,0,0,1253164799],["Health and Community Services",4540249600,272693400,0,4796971348],["Justice and Public Safety",319278500,187047900,0,503751661],
 ["Municipal and Community Affairs",160839600,0,0,51517831],["Newfoundland and Labrador Housing Corporation",133656100,0,0,133656100],["Seniors",2997900,-80000,0,2548374],
 ["Social Supports and Well-Being",435324200,20862700,0,450676366]];
const NLP26_T=[11079420900,0,0,10663300359];
const NLP25=[
 ["Consolidated Fund Services",1309051300,-121268800,0,1201732961],["Digital Government and Service Newfoundland and Labrador",28907800,1184000,0,30186765],["Executive Council",286332400,-16500300,0,255880182],
 ["Finance",29791400,-22581000,0,22326254],["Labrador Affairs",18124300,0,0,16696714],["Public Procurement Agency",2327200,0,0,1937469],["Public Service Commission",11012800,0,0,10749848],
 ["Transportation and Infrastructure",1297987000,0,0,1219217561],["Legislature",35368200,317700,0,31220453],["Environment and Climate Change",42911000,0,0,21169638],
 ["Fisheries, Forestry and Agriculture",75898500,8046500,0,66308587],["Immigration, Population Growth and Skills",64643400,0,0,65189079],["Industry, Energy and Technology",156813300,665000,0,108477827],
 ["Tourism, Culture, Arts and Recreation",95138400,1668600,0,95096812],["Children, Seniors and Social Development",400921500,32279600,0,395719721],["Education",1094693800,8783800,0,1134000232],
 ["Health and Community Services",4362541100,81379800,0,4423432238],["Justice and Public Safety",338704400,26025100,0,361042913],["Municipal and Provincial Affairs",144706800,0,0,30053736],
 ["Newfoundland and Labrador Housing Corporation",161737500,0,0,161737500]];
const NLP25_T=[9957612100,0,0,9652176490];
const NLE27=[
 ["Consolidated Fund Services",1944792100],["Executive Council",322922500],["Finance",27134900],["Government Services",39659100],["Labrador Affairs",25181300],["Public Procurement Agency",2378200],
 ["Public Service Commission",11328300],["Transportation and Infrastructure",1283898600],["Legislature",35233800],["Energy and Mines",41118300],["Environment, Conservation and Climate Change",27897100],
 ["Fisheries and Aquaculture",12132900],["Forestry, Agriculture and Lands",85156600],["Jobs, Growth and Rural Development",107793900],["Tourism, Culture, Arts and Recreation",79103100],
 ["Education and Early Childhood Development",1332852600],["Health and Community Services",5425553700],["Justice and Public Safety",334582300],["Municipal and Community Affairs",157560400],
 ["Newfoundland and Labrador Housing Corporation",124999200],["Seniors",2875400],["Social Supports and Well-Being",439567800]];
const NLE27_T=11863722100;
const NL_GOV={
 rev:[["Taxation",4651832,5198583,4793259],["Investment",163717,233940,236893],["Fees and fines",585661,623072,590303],["Offshore royalties",1591364,1710076,1360410],["Miscellaneous",1068746,643513,655796],["Federal",2134218,2217006,1886603],["Net income of government business enterprises and partnership",474619,464837,842038]],
 revT:[10670157,11091027,10365302],
 exp:[["General Government Sector and Legislative Branch",2788942,2641711,2576057],["Resource Sector",731861,721683,692041],["Social Sector",7521108,8105180,7393841]],
 expT:[11041911,11468574,10661939],
 bal:[-371754,-377547,-296637],
 netDebt:[19449134,19015144,18435914]};
