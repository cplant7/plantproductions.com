/* Nova Scotia departments scorecard data (Nov 13 2026). All amounts in THOUSANDS of dollars unless noted.
   NSP26 / NSP25: Public Accounts Volume 1 (General Revenue Fund), "Additional Appropriations by Resolution":
     FY 2025-26: https://notices.novascotia.ca/files/public-accounts/2026/pa-volume-1-financial-statements-2026.pdf (printed pp. 50-51)
     FY 2024-25: https://notices.novascotia.ca/files/public-accounts/2025/pa-volume-1-financial-statements-2025.pdf (printed pp. 53-54)
   Row: [name, [original estimate, additional appropriation approved during the year, actual, final additional appropriation required], sub-appropriations|null]
   Public Service is a group of separate resolutions; its sub-appropriations are kept as programs. Its row totals are the sums of the
   sub-appropriations, except FY 2025-26 actual, which uses the Departmental Expenses table (525,804; sub-lines add to 525,806 from rounding).
   NSO26/NSO25: Other Appropriations (debt servicing, refundable tax credits, pension valuation adjustment, contingency).
   NSK26/NSK25: Statutory Capital (capital purchase requirements, serial retirements).
   NSE27: Budget 2026-27 Estimates and Supplementary Detail, Departmental Expenses - Summary (p. 1.1):
     https://www.novascotia.ca/sites/default/files/documents/7-4172/budget-estimates-2026-27-en.pdf
     Row: [name, 2025-26 estimate, 2025-26 forecast, 2026-27 estimate]
   NS_GOV: Consolidated Statement of Operations (Statement 2) and Changes in Net Debt (Statement 3), FY 2025-26 Public Accounts Vol 1. THOUSANDS:
     [adjusted estimate 2026, actual 2026, actual 2025]. */
const NSP26=[
 ["Advanced Education",[732171,10448,740391,0]],
 ["Agriculture",[47946,3000,51544,599]],
 ["Communities, Culture, Tourism and Heritage",[168120,39750,208351,482]],
 ["Cyber Security and Digital Solutions",[283921,6439,283420,0]],
 ["Education and Early Childhood Development",[2225951,5188,2185650,0]],
 ["Emergency Management",[61060,3024,77865,13781]],
 ["Energy",[48613,5000,58269,4657]],
 ["Environment and Climate Change",[80124,0,72732,0]],
 ["Finance and Treasury Board",[48406,0,81919,33514]],
 ["Fisheries and Aquaculture",[15095,0,15093,0]],
 ["Growth and Development",[400214,3050,402951,0]],
 ["Health and Wellness",[5976833,416078,6361451,0]],
 ["Justice",[489245,15063,509557,5249]],
 ["Labour, Skills and Immigration",[246453,0,230188,0]],
 ["Municipal Affairs",[337882,0,278524,0]],
 ["Natural Resources",[112138,64927,175963,0]],
 ["Opportunities and Social Development",[1676809,0,1677049,240]],
 ["Public Service",[525274,20893,525804,749],[
  ["Elections Nova Scotia",[4770,1963,6728,0]],
  ["Executive Council",[17039,0,16090,0]],
  ["Freedom of Information and Protection of Privacy Review Office",[1327,0,1326,0]],
  ["Government Contributions to Benefit Plans",[8828,0,9576,749]],
  ["Human Rights Commission",[3080,0,3064,0]],
  ["Intergovernmental Affairs",[5498,0,5140,0]],
  ["Legislative Services",[26157,3999,29746,0]],
  ["Energy and Regulatory Boards Tribunal",[2334,0,2334,0]],
  ["Nova Scotia Police Complaints Commissioner",[453,0,453,0]],
  ["Nova Scotia Securities Commission",[3429,0,3370,0]],
  ["Office of Addictions and Mental Health",[363793,14931,361545,0]],
  ["Office of Equity and Anti-Racism",[4321,0,3987,0]],
  ["Office of Healthcare Professionals Recruitment",[8627,0,8566,0]],
  ["Office of L'nu Affairs",[5615,0,5563,0]],
  ["Office of the Auditor General",[6766,0,5916,0]],
  ["Office of the Ombudsman",[2300,0,2238,0]],
  ["Public Prosecution Service",[32092,0,31645,0]],
  ["Public Service Commission",[25699,0,25382,0]],
  ["Office of Service Efficiency",[3146,0,3137,0]]]],
 ["Public Works",[840141,2328,882920,40452]],
 ["Seniors and Long-Term Care",[1462480,83483,1538811,0]],
 ["Service Nova Scotia",[164805,8904,174974,1265]],
 ["Restructuring Costs",[551472,171975,1144079,420632]]];
const NSP26_T=[16495153,859550,17677505,521620];
const NSO26=[["Debt Servicing Costs",[908509,12880,896942,0]],["Refundable Tax Credits",[147960,15876,165302,1466]],["Pension Valuation Adjustment",[17079,0,-38002,0]],["Contingency",[200000,0,0,0]]];
const NSO26_T=[1273548,28756,1024242,1466];
const NSK26=[["Capital Purchase Requirements",[1873288,490024,2048595,0]],["Serial Retirements",[16655,0,14101,0]]];
const NSK26_T=[1889943,490024,2062696,0];

const NSP25=[
 ["Advanced Education",[725539,14536,739066,0]],
 ["Agriculture",[46682,0,57658,10977]],
 ["Communities, Culture, Tourism and Heritage",[171845,83184,242321,0]],
 ["Cyber Security and Digital Solutions",[276224,0,246549,0]],
 ["Education and Early Childhood Development",[1999180,17900,1998073,0]],
 ["Emergency Management",[30391,18293,48825,141]],
 ["Energy",[37873,2937,43752,2942]],
 ["Environment and Climate Change",[73876,7660,76400,0]],
 ["Finance and Treasury Board",[48790,0,228257,179467]],
 ["Fisheries and Aquaculture",[15951,0,16286,335]],
 ["Growth and Development",[370250,16784,416365,29332]],
 ["Health and Wellness",[5536898,231643,5778476,9935]],
 ["Justice",[464719,12187,485014,8109]],
 ["Labour, Skills and Immigration",[241644,4236,242527,0]],
 ["Municipal Affairs",[396515,0,314508,0]],
 ["Natural Resources",[103715,4909,112777,4154]],
 ["Opportunities and Social Development",[1579169,0,1613917,34748]],
 ["Public Service",[517397,26455,517070,1090],[
  ["Communications Nova Scotia",[6960,0,6640,0]],
  ["Elections Nova Scotia",[5412,15950,19776,0]],
  ["Executive Council",[11371,0,11133,0]],
  ["Freedom of Information and Protection of Privacy Review Office",[1281,0,1214,0]],
  ["Government Contributions to Benefit Plans",[9134,0,6798,0]],
  ["Human Rights Commission",[3044,0,3044,0]],
  ["Intergovernmental Affairs",[5744,0,5656,0]],
  ["Legislative Services",[25543,0,26632,1090]],
  ["Nova Scotia Police Complaints Commissioner",[2230,0,2230,0]],
  ["Nova Scotia Securities Commission",[444,0,444,0]],
  ["Nova Scotia Utility and Review Board",[3271,0,3241,0]],
  ["Office of Addictions and Mental Health",[359619,10505,349874,0]],
  ["Office of Equity and Anti-Racism",[3968,0,3680,0]],
  ["Office of Healthcare Professionals Recruitment",[8098,0,6462,0]],
  ["Office of L'nu Affairs",[4255,0,4140,0]],
  ["Office of the Auditor General",[6278,0,5738,0]],
  ["Office of the Ombudsman",[2200,0,2123,0]],
  ["Public Prosecution Service",[32075,0,31955,0]],
  ["Public Service Commission",[23833,0,23698,0]],
  ["Office of Service Efficiency",[2637,0,2592,0]]]],
 ["Public Works",[716170,34232,790161,39759]],
 ["Seniors and Long-Term Care",[1362710,68344,1411236,54]],
 ["Service Nova Scotia",[161138,63105,220613,0]],
 ["Restructuring Costs",[659765,0,661763,1998]]];
const NSP25_T=[15536441,606405,16261614,323041];
const NSO25=[["Debt Servicing Costs",[822863,46447,876312,7002]],["Refundable Tax Credits",[126316,52536,155908,0]],["Pension Valuation Adjustment",[33102,0,-16151,0]]];
const NSO25_T=[982281,98983,1016069,7002];
const NSK25=[["Capital Purchase Requirements",[1333994,268713,1941345,338638]],["Serial Retirements",[17422,0,16565,0]]];
const NSK25_T=[1351416,268713,1957910,338638];

const NSE27=[
 ["Advanced Education",732171,742619,542339],["Agriculture",47946,50946,48048],["Communities, Culture, Tourism and Heritage",168120,200699,162785],
 ["Cyber Security and Digital Solutions",283921,288357,322727],["Education and Early Childhood Development",2225951,2201128,2341678],["Emergency Management",61060,62799,60190],
 ["Energy",48613,53613,45982],["Environment and Climate Change",80124,78716,59877],["Finance and Treasury Board",48406,47687,48173],["Fisheries and Aquaculture",15095,15095,17933],
 ["Growth and Development",400214,404216,457047],["Health and Wellness",5976833,6337636,6714896],["Justice",489245,504308,536436],["Labour, Skills and Immigration",246453,246849,431995],
 ["Municipal Affairs",337882,275505,290004],["Natural Resources",112138,177065,131455],["Opportunities and Social Development",1676809,1672654,1784748],["Public Service",525274,536002,579386],
 ["Public Works",840141,842469,921085],["Seniors and Long-Term Care",1462480,1540847,1573127],["Service Nova Scotia",164805,174693,172758],["Restructuring Costs",551472,651397,527721]];
const NSE27_T=[16495153,17105300,17770390];

const NS_GOV={
 rev:[["Tax revenue",8831935,8989167,9302801],["Other provincial revenue",1820410,2010778,2187934],["Net income from government business enterprises",465447,471418,490867],["Investment income",225805,180728,231652],["Federal sources",6218127,6327771,6007425]],
 revT:[17561724,17979862,18220679],
 exp:[["Advanced Education",837260,854907,859641],["Agriculture",60333,79465,59658],["Communities, Culture, Tourism and Heritage",172989,211217,244034],["Cyber Security and Digital Solutions",283921,280372,241493],["Education and Early Childhood Development",2689809,2655073,2440009],["Emergency Management",71668,78956,51551],["Energy",48613,58142,43738],["Environment and Climate Change",154133,149185,148313],["Finance and Treasury Board",69706,86311,68683],["Fisheries and Aquaculture",15396,14379,13246],["Growth and Development",485168,481965,503132],["Health and Wellness",6408234,6833966,6359221],["Justice",492629,512508,486485],["Labour, Skills and Immigration",224037,199441,214949],["Municipal Affairs",337882,278524,314508],["Natural Resources",110502,176664,117532],["Opportunities and Social Development",1674544,1673130,1610816],["Public Service",196754,207308,201742],["Public Works",772705,806137,788528],["Seniors and Long-Term Care",1363033,1425571,1295527],["Service Nova Scotia",164887,174187,215028],["Restructuring Costs",551472,1144079,661765],["Pension valuation adjustment",17079,-40265,-16151],["Refundable tax credits",147960,165302,155907],["Net loss on disposal of Crown assets",0,10786,2023],["Debt servicing costs",908509,869591,874513]],
 expT:[18259223,19386901,17955891],
 contingency:[200000,0,0],
 bal:[-897499,-1407039,264788],
 netDebt:[-23413493,-24096694,-20843600]};
