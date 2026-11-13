/* Prince Edward Island departments scorecard data (Nov 13 2026). DOLLARS unless noted.
   PEP26 / PEP25: Public Accounts Volume II (Operating Fund, unaudited), Details of Ordinary Expenses with Estimates (gross expenses vs estimates):
     FY 2025-26: https://wdf.princeedwardisland.ca/download/dms?objectId=8659d721-ef93-4ae6-bd04-abcbcd885b04&fileName=2026%20-%20PA%20-%20Volume%20II.pdf
     FY 2024-25: https://wdf.princeedwardisland.ca/download/dms?objectId=c5a7999a-c170-4033-80a0-88cf2aa6ba4f&fileName=2025%20-%20PA%20-%20Volume%20II.pdf
     Row: [entity, expenses, estimates, programs [name, expenses, estimates]]. Departments and the Crown agencies they fund are separate rows, as in the Estimates.
     Checks: FY 2025-26 3,144,580,491 / 3,017,652,100 vs Statement of Operations total program expenses 3,144,579k / budget 3,017,653k.
     FY 2024-25 2,823,769,122 / 2,754,162,500 vs 2,823,772k / 2,754,163k. FY 2024-25 'P.E.I. Public Service Commission' renamed to match FY 2025-26.
   PEE27: 2026 Operating Estimates Book, Expenditure Summary by Department (pp. 12-13):
     https://www.princeedwardisland.ca/sites/default/files/9350/2026%20Operating%20Estimates%20Book.pdf
     Row: [name, 2026-27 estimate, 2025-26 forecast, 2025-26 estimate (restated)]. Crown agencies (indented in the source) follow their department.
   PEE27_GOV: Budget Summary (p. 9).
   PE_GOV: Public Accounts Volume I 2026 (audited consolidated), THOUSANDS [budget, actual 2026, actual 2025]:
     https://wdf.princeedwardisland.ca/download/dms?objectId=a004bfb3-02dd-4f2e-8175-1a351960bb12&fileName=2026%20-%20PA%20-%20Volume%20I.pdf */
const PEE27=[
 ["Agriculture",23861800,24776500,24018500],["P.E.I. Agricultural Insurance Corporation",59089700,127134100,60903100],
 ["Economic Development, Trade and Artificial Intelligence",990300,977300,977300],["Innovation PEI",77726300,83625300,72232800],
 ["Education and Early Years",131390700,115844000,114998000],["La Commission scolaire de langue française",29593700,28902800,28002800],["Public Schools Branch",344000800,329797100,322197100],
 ["Executive Council",12759600,12326300,12550800],
 ["Finance and Affordability",116814100,92543700,94601900],["Employee Benefits",35180900,34318400,35124200],["General Government",49471000,37071200,49814500],["Public Service Commission",14480600,14885000,14155700],
 ["Fisheries, Rural Development and Tourism",20630500,20999400,21509800],["Tourism PEI",34906100,35957300,34333500],
 ["Health and Wellness",171645400,164395500,166843300],["Health PEI",1241970500,1177752600,1071382000],
 ["Housing and Communities",53560800,51253300,51398100],["P.E.I. Housing Corporation",73031300,76123100,76218600],
 ["Justice and Public Safety",97584600,94827700,92012400],["Land and Environment",38203700,42341000,41032000],
 ["Social Development and Seniors",246922200,241767700,226747500],
 ["Transportation, Infrastructure and Energy",279124200,317427700,317724900],
 ["Workforce and Advanced Learning",184776200,173185400,179121500],["Employment Development Agency",7259600,7393000,7411800],["P.E.I. Student Financial Assistance Corporation",16036200,16299100,16736100],
 ["Legislative Assembly",16249400,15614900,15187300],["Other Consolidated Agencies (Sch. A)",50320000,65740200,64487900]];
const PEE27_T=[3427580200,3403279600,3211723400];
const PEE27_GOV={rev:[["Provincial own sources",1892069400,1827135700,1886412400],["Government of Canada",1355892800,1308029400,1321274500],["Other consolidated agencies",73891600,81828300,77038300],["Net surplus of government business enterprises",64413300,53698400,58372100]],
 revT:[3386267100,3270691800,3343097300],progT:[3427580200,3403279600,3211723400],interest:[201376800,170784300,169652800],amort:[167275300,146200000,145658800],
 expT:[3796232300,3720263900,3527035000],bal:[-409965200,-449572100,-183937700]};
const PEP26=[
 ["Agriculture", 24144046, 24018500, [["Department Management", 497704, 676900], ["Agriculture Resources", 17484853, 16565000], ["Strategic Policy and Evaluation", 1418398, 1972600], ["Animal and Plant Health", 4743091, 4804000]]],
 ["P.E.I. Agricultural Insurance Corporation", 18453712, 17776000, []],
 ["Economic Development, Innovation and Trade", 943860, 977300, []],
 ["Innovation PEI", 81750000, 70414100, []],
 ["Education and Early Years", 113371827, 117259700, [["Finance and Administration", 8995106, 8228100], ["External Relations and Educational Services", 2969939, 3099000], ["English Education, Programs and Services", 8325798, 7630300], ["French Education, Programs and Services", 4527138, 4069300], ["Early Childhood Development", 81687499, 87586000], ["Joint Consortium for School Health", 227635, 250000], ["Provincial Libraries", 3942240, 3626500], ["Public Archives and Records Office", 2696472, 2770500]]],
 ["Public Schools Branch", 333119030, 321797100, []],
 ["French Language School Board", 28819818, 27802800, []],
 ["Environment, Energy and Climate Action", 117327867, 119331800, [["Corporate Services", 833506, 830800], ["Forests, Fish and Wildlife", 15754457, 16064200], ["Environment Regulatory", 13975442, 12517000], ["Sustainability", 85546773, 88711200], ["Acadian and Francophone Affairs", 1217689, 1208600]]],
 ["Executive Council", 12319459, 12550800, [["Office of the Premier", 1146136, 1273900], ["Executive Council Office", 1944997, 2220500], ["Intergovernmental and Public Affairs", 4241342, 4258300], ["Communications and Public Engagement", 4986984, 4798100]]],
 ["Finance", 89517569, 94181100, [["Department Management", 771527, 1071400], ["Pensions and Capital Management", 2102663, 2987300], ["Economics, Statistics and Federal Fiscal Relations", 10669160, 11274200], ["Office of the Comptroller", 4923635, 2651200], ["Taxation and Property Records", 5220787, 5783000], ["Treasury Board Secretariat", 65829797, 70414000]]],
 ["General Government", 26646340, 48332500, []],
 ["Employee Benefits", 33167828, 34438200, [["Medical/Life Benefits", 516712, 502500], ["Employee Future Benefits", 26909209, 18248000], ["Government Pension Expense", 5328916, 15233000], ["Pension Management", 412991, 454700]]],
 ["Fisheries, Tourism, Sport and Culture", 20903399, 21509800, [["Corporate Services", 690121, 596100], ["Marine Fisheries and Seafood Services", 1589819, 1679700], ["Aquaculture", 2152446, 2907400], ["Rural and Regional Development", 9373828, 9477800], ["Sport, Recreation and Physical Activity", 4364602, 4445200], ["Cultural History and Heritage", 316012, 358100], ["P.E.I. Museum and Heritage Foundation", 2416571, 2045500]]],
 ["Tourism PEI", 20133683, 20795900, []],
 ["Health and Wellness", 155876122, 166370600, [["Minister and Deputy Minister's Office", 654896, 639700], ["Community Health and Policy", 50073153, 54826500], ["Pharmacy Services", 72228347, 76196100], ["Health Workforce Development", 2769824, 3823500], ["Chief Public Health Office", 14556770, 14312900], ["Mental Health and Addictions Office", 12560097, 13229300], ["Health Innovation", 3033035, 3342600]]],
 ["Health PEI", 1175821395, 1036096900, []],
 ["Housing, Land and Communities", 58643851, 58946500, [["Minister and Deputy Minister's Office", 541542, 519600], ["Corporate Services", 1804109, 2022000], ["Land Division", 6247581, 7438800], ["Municipal Affairs", 50050619, 48966100]]],
 ["P.E.I. Housing Corporation", 52370967, 44586800, []],
 ["Justice and Public Safety", 94292352, 92698400, [["Department Management", 676620, 725200], ["Justice Policy, Planning and FPT Relations", 3033083, 3707400], ["Financial and Consumer Services", 2221281, 2379500], ["Legal and Legislative Services", 3128007, 3074700], ["Emergency Management Organization", 4911092, 5241600], ["Public Safety and Policing", 34038082, 33449800], ["Legal Aid", 2697942, 2678500], ["Crown Attorneys", 2166782, 2137800], ["Community and Correctional Services", 29238834, 26967800], ["Family Law, Court Services and Access and Privacy Services Office", 12180629, 12336100]]],
 ["Legislative Assembly", 14741481, 15187300, [["Legislative Services", 4663613, 4870700], ["Members", 2808000, 2945700], ["Office of the Auditor General", 3687745, 3844100], ["Office of the Child and Youth Advocate", 1087321, 1173900], ["Office of the Conflict of Interest Commissioner", 67357, 62800], ["Office of the Information and Privacy Commissioner", 664758, 722100], ["Office of the Ombudsperson and Public Interest Disclosure Commissioner", 719467, 799200], ["Elections PEI", 1043220, 768800]]],
 ["Public Service Commission", 14546275, 14424900, [["Management", 365490, 377400], ["HR Management and Labour Relations", 4728827, 4521500], ["Talent Attraction, Acquisition and Classification", 3968186, 4037400], ["Organizational Development, Culture and HR Planning", 3220540, 3157900], ["Administration, Corporate HRMS and Payroll", 2263232, 2330700]]],
 ["Social Development and Seniors", 232005659, 217705700, [["Minister and Deputy Minister's Office", 502704, 453400], ["Strategy, Policy and Seniors", 12317530, 12527600], ["Social Programs", 178182472, 168126300], ["Child and Family Services", 41002953, 36598400]]],
 ["Transportation and Infrastructure", 224724298, 232735800, [["Corporate Services", 5332135, 5293300], ["Highway Safety", 5175229, 4478100], ["Land and Environment", 2771088, 3414700], ["Highway Maintenance", 83773932, 72491700], ["Building Services", 34109852, 36459400], ["Health - Building Infrastructure", 3535, 919900], ["Capital Projects Division", 15650536, 14596000], ["Service PEI", 6981834, 6126300], ["Infrastructure and FPT Relations", 70926157, 88956400]]],
 ["Workforce, Advanced Learning and Population", 176992095, 183565700, [["General Administration", 626967, 679800], ["Population and Settlement", 3443562, 3702200], ["Labour and Industrial Relations", 1423562, 1484300], ["Workforce Development", 34905137, 36305500], ["Post-Secondary and Continuing Education", 130533280, 135075100], ["Interministerial Women's Secretariat", 6059587, 6318800]]],
 ["Employment Development Agency", 7406260, 7411800, []],
 ["P.E.I. Student Financial Assistance Corporation", 16541298, 16736100, []]];
const PEP25=[
 ["Agriculture", 19185528, 22675800, [["Department Management", 521703, 712100], ["Agriculture Resources", 12621821, 15482000], ["Strategic Policy and Evaluation", 1560177, 2002000], ["Animal and Plant Health", 4481827, 4479700]]],
 ["P.E.I. Agricultural Insurance Corporation", 18805650, 16294900, []],
 ["Economic Development, Innovation and Trade", 1779525, 3088800, [["Department Management", 751996, 1901800], ["Acadian and Francophone Affairs", 1027529, 1187000]]],
 ["Innovation PEI", 76269538, 64366600, []],
 ["Education and Early Years", 124116207, 110348900, [["Finance and Administration", 7651185, 7795100], ["External Relations and Educational Services", 2699261, 2833400], ["English Education, Programs, and Services", 7929486, 7409800], ["French Education, Programs, and Services", 4610784, 3717300], ["Early Childhood Development", 88987375, 75709900], ["Joint Consortium for School Health", 320773, 252800], ["Provincial Libraries", 3394332, 3544400], ["Public Archives and Records Office", 2500451, 2760500], ["Interministerial Women's Secretariat", 6022560, 6325700]]],
 ["Public Schools Branch", 311051303, 296800500, []],
 ["French Language School Board", 26922939, 25160700, []],
 ["Environment, Energy and Climate Action", 134470883, 123278200, [["Corporate Services", 978036, 959800], ["Forests, Fish, and Wildlife", 14973191, 15969600], ["Environment Regulatory", 13737815, 14446600], ["Sustainability", 104781841, 91902200]]],
 ["Executive Council", 11753506, 12571300, [["Office of the Premier", 1347961, 1238400], ["Executive Council Office", 2113861, 2360900], ["Intergovernmental and Public Affairs", 3789435, 4149600], ["Communications and Public Engagement", 4502249, 4822400]]],
 ["Finance", 80586742, 82340900, [["Department Management", 785217, 949000], ["Pensions and Capital Management", 1951422, 2282600], ["Economics, Statistics, and Federal Fiscal Relations", 11436528, 10447100], ["Office of the Comptroller", 5809111, 2315000], ["Taxation and Property Records", 5069556, 5718900], ["Treasury Board Secretariat", 55534908, 60628300]]],
 ["General Government", 20654540, 18587900, []],
 ["Employee Benefits", 27787726, 41226500, [["Medical / Life Benefits", 412364, 502500], ["Employee Future Benefits", 16951750, 19588000], ["Government Pension Expense", 9979329, 20626000], ["Pension Management", 444283, 510000]]],
 ["Fisheries, Tourism, Sport and Culture", 22536189, 23784000, [["Corporate Services", 710442, 582800], ["Marine Fisheries and Seafood Services", 1482410, 1754700], ["Aquaculture", 2492310, 3353200], ["Rural and Regional Development", 11469176, 11830600], ["Sport, Recreation, and Physical Activity", 4205654, 4254900], ["Cultural History and Heritage", 239487, 237000], ["P.E.I. Museum and Heritage Foundation", 1936710, 1770800]]],
 ["Tourism PEI", 20409722, 20464800, []],
 ["Health and Wellness", 146412074, 162087000, [["Minister and Deputy Minister's Office", 608627, 649100], ["Community Health and Policy", 45881350, 53971300], ["Pharmacy Services", 61183501, 64695100], ["Health Workforce and Recruitment", 8764873, 9386600], ["Chief Public Health Office", 12553696, 11980100], ["Mental Health and Addictions Office", 12604083, 13024400], ["Health Innovation", 4815944, 8380400]]],
 ["Health PEI", 958682500, 925168500, []],
 ["Housing, Land and Communities", 49359709, 49438300, [["Minister and Deputy Minister's Office", 409100, 500000], ["Corporate Services", 1644618, 1562400], ["Land Division", 4838482, 6631400], ["Municipal Affairs", 42467509, 40744500]]],
 ["P.E.I. Housing Corporation", 52618413, 50174600, []],
 ["Justice and Public Safety", 85567949, 88184400, [["Department Management", 657403, 715100], ["Justice Policy, Planning, and FPT Relations", 3034314, 3588300], ["Financial and Consumer Services", 1864984, 2262100], ["Legal and Legislative Services", 3016656, 3256700], ["Emergency Management Organization", 2921562, 2802500], ["Public Safety and Policing", 31755686, 34050000], ["Legal Aid", 2416073, 2629300], ["Crown Attorneys", 1930971, 2006200], ["Community and Correctional Services", 26306722, 24719100], ["Family Law, Court Serv., and Access and Privacy Serv. Office", 11663578, 12155100]]],
 ["Legislative Assembly", 13048492, 14027400, [["Legislative Services", 4142618, 4399500], ["Members", 2864273, 2864700], ["Office of the Auditor General", 3196158, 3573000], ["Office of the Child and Youth Advocate", 1032962, 1186500], ["Office of the Conflict of Interest Commissioner", 58573, 61000], ["Office of the Information and Privacy Commissioner", 530731, 620200], ["Office of the Ombud. and Public Interest Disclosure Comm.", 676534, 763500], ["Elections PEI", 546643, 559000]]],
 ["Public Service Commission", 11803620, 12813500, [["Management", 367178, 366200], ["HR Management and Labour Relations", 4383915, 4652900], ["Staffing, Classification, and Organizational Development", 5336530, 5634000], ["Administration, Corporate HRMS, and Payroll", 1715997, 2160400]]],
 ["Social Development and Seniors", 212175727, 176745900, [["Minister and Deputy Minister's Office", 481959, 443100], ["Strategy, Policy, and Seniors", 11107074, 9607800], ["Social Programs", 164096553, 134431900], ["Child and Family Services", 36490141, 32263100]]],
 ["Transportation and Infrastructure", 224413449, 240750200, [["Corporate Services", 933196, 877200], ["Highway Safety", 4314395, 4030600], ["Land and Environment", 3266258, 3464900], ["Highway Maintenance", 72760369, 67861600], ["Public Works and Planning", 30647076, 33749800], ["Capital Projects Division", 18121581, 12774100], ["Service PEI", 5460267, 5313800], ["Infrastructure, Policy, and Planning", 88910307, 112678200]]],
 ["Workforce, Advanced Learning and Population", 151342311, 151622800, [["General Administration", 555087, 1332500], ["Population and Settlement", 2700528, 4315000], ["Labour and Industrial Relations", 1145585, 1496100], ["Workforce Development", 37951098, 35369400], ["Post-Secondary and Continuing Education", 108990013, 109109800]]],
 ["Employment Development Agency", 7152242, 7155500, []],
 ["P.E.I. Student Financial Assistance Corporation", 14862638, 15004600, []]];
const PE_GOV={
 rev:[["Taxes",1640053,1643104,1517188],["Licenses and permits",50497,49819,46264],["Fees and services",91015,91340,87947],["Sales",42916,46825,42382],["Investment income",23752,32255,33090],["Other income",67398,77101,103329],["Government of Canada",1321050,1308433,1219332],["Government business enterprises",58317,53657,61140],["Sinking fund earnings",11100,13714,12812]],
 revT:[3306098,3316248,3123484],
 exp:[["Agriculture",113492,177584,110086],["Economic Development, Innovation and Trade",82423,95152,90296],["Education and Early Years",465494,475198,453648],["Environment, Energy and Climate Action",118367,117328,135499],["Executive Council",12551,12319,11754],["Finance",180745,152969,135350],["Fisheries, Tourism, Sport and Culture",56554,57425,55635],["Health and Wellness",1235748,1362804,1162021],["Housing, Land and Communities",131877,131235,118293],["Justice and Public Safety",92708,94418,85443],["Legislative Assembly",15187,14741,13048],["Public Service Commission",14425,14546,11804],["Social Development and Seniors",217677,231980,212150],["Transportation and Infrastructure",230758,223055,222881],["Workforce, Advanced Learning and Population",206718,200769,178590],["Interest charges on debt",169653,170437,163422],["Interest charges on capital obligations",0,122,136],["Amortization of tangible capital assets",144459,138570,126220],["Accretion expense",1200,1100,1129]],
 expT:[3490036,3671752,3287405],
 bal:[-183938,-355504,-163921],
 netDebt:[-3549854,-3694751,-3027816]};
