/* Québec portfolios scorecard data (Nov 13 2026). THOUSANDS.
   QCP26 / QCP25: Public Accounts Volume 2 (English), Table 1 Authorized appropriations and Table 2 Expended appropriations, by portfolio:
     FY 2025-26: https://cdn-contenu.quebec.ca/cdn-contenu/adm/min/finances/publications-adm/Comptes-publics/EN/CPTEN_vol2-2025-2026.pdf (pp. 8, 11)
     FY 2024-25: https://cdn-contenu.quebec.ca/cdn-contenu/adm/min/finances/publications-adm/Comptes-publics/EN/CPTEN_vol2-2024-2025.pdf
     Row: [portfolio, [initial appropriation, supplementary appropriation, appropriation transfer, adjustments to permanent appropriation, total authorized], total expended (expenditure + investments)]
     Published row figures are rounded; some rows differ from the sum of their parts by $1 thousand.
     Totals FY 2025-26: 142,792,072 / 109,545 / 0 / 598,824 / 143,500,441, expended 138,988,835. FY 2024-25: authorized 137,502,334, expended 136,211,514.
   QCE27: Expenditure Budget 2026-2027 Vol. 3, Summary of Appropriations (p. 37): [portfolio, 2026-27 total appropriations, 2025-26 comparative appropriations]
     https://cdn-contenu.quebec.ca/cdn-contenu/adm/min/secretariat-du-conseil-du-tresor/publications-adm/budgets/2026-2027/en/3_estimates_expenditures_departments_and_bodies.pdf
   QC_GOV: Public Accounts Volume 1 2025-2026, consolidated statement of operations and change in net debt, MILLIONS [budget, results 2026, results 2025]:
     https://cdn-contenu.quebec.ca/cdn-contenu/adm/min/finances/publications-adm/Comptes-publics/EN/CPTEN_vol1-2025-2026.pdf */
const QCP26=[
 ["National Assembly", [209685, 5842, 0, -4007, 211520], 211520],
 ["Persons Appointed by the National Assembly", [176349, 72, 8264, -4350, 180335], 168261],
 ["Affaires municipales et Habitation", [3683093, 6227, 1185520, 55246, 4930086], 4930086],
 ["Agriculture, Pêcheries et Alimentation", [1280596, 13642, 0, 1105, 1295343], 1279484],
 ["Conseil du trésor et Administration gouvernementale", [22231337, 0, -15276692, -496406, 6458239], 2097432],
 ["Conseil exécutif", [571699, 0, 46616, 319, 618635], 617909],
 ["Culture et Communications", [823874, 0, 647802, 15246, 1486923], 1486923],
 ["Cybersécurité et Numérique", [253919, 0, 73296, 0, 327215], 296117],
 ["Économie, Innovation et Énergie", [1502561, 0, 635971, -1415, 2137116], 2129984],
 ["Éducation", [19829662, 0, 3341287, -182062, 22988887], 22988875],
 ["Emploi et Solidarité sociale", [5205475, 7250, 140500, 76592, 5429816], 5429816],
 ["Enseignement supérieur", [9051833, 0, 1022295, 20768, 10094896], 10094763],
 ["Environnement, Lutte contre les changements climatiques, Faune et Parcs", [571026, 16615, -162, -29, 587451], 578361],
 ["Famille", [4083342, 30026, 646052, 81, 4759500], 4759500],
 ["Finances", [7060327, 0, -48877, 695758, 7707209], 7704260],
 ["Immigration, Francisation et Intégration", [811149, 14035, -212583, 0, 612601], 588978],
 ["Justice", [1888910, 8008, 567150, -116502, 2347566], 2347563],
 ["Langue française", [81464, 0, 2047, 0, 83510], 83510],
 ["Relations internationales et Francophonie", [176260, 0, 4035, 246, 180540], 180534],
 ["Ressources naturelles et Forêts", [498509, 0, 189881, 4063, 692453], 692453],
 ["Santé et Services sociaux", [57033171, 0, 4236677, 488990, 61758838], 61721325],
 ["Sécurité publique", [2196911, 4516, 584612, 33878, 2819917], 2819917],
 ["Tourisme", [123862, 0, 326216, 11289, 461367], 461367],
 ["Transports et Mobilité durable", [3406854, 3311, 1868728, 16, 5278908], 5278908],
 ["Travail", [40205, 0, 11366, -1, 51570], 40986]];
const QCP25=[
 ["National Assembly", [198739, 3285, 0, -3953, 198071], 198071],
 ["Persons Appointed by the National Assembly", [152020, 417, 8074, -4836, 155675], 151345],
 ["Affaires municipales et Habitation", [3041050, 5482, 857023, 49830, 3953385], 3953385],
 ["Agriculture, Pêcheries et Alimentation", [1251432, 13551, 28341, 1364, 1294688], 1294688],
 ["Conseil du trésor et Administration gouvernementale", [20155656, 0, -16542433, -102884, 3510339], 2288310],
 ["Conseil exécutif", [719497, 0, 16391, 1228, 737116], 732585],
 ["Culture et Communications", [898872, 0, 394618, 29361, 1322851], 1320568],
 ["Cybersécurité et Numérique", [124203, 0, 81361, 0, 205564], 205564],
 ["Économie, Innovation et Énergie", [1550825, 0, 872335, -558, 2422603], 2396939],
 ["Éducation", [18903018, 0, 4194260, 411428, 23508706], 23508706],
 ["Emploi et Solidarité sociale", [5096606, 7250, 297286, 19937, 5421079], 5421079],
 ["Enseignement supérieur", [8964782, 0, 1394126, 118688, 10477597], 10477597],
 ["Environnement, Lutte contre les changements climatiques, Faune et Parcs", [590204, 15655, 514, -77, 606295], 592732],
 ["Famille", [3519230, 26311, 676729, -28, 4222243], 4222243],
 ["Finances", [6680462, 0, -43801, 566243, 7202904], 7200735],
 ["Immigration, Francisation et Intégration", [736686, 61915, -159107, -5, 639489], 639489],
 ["Justice", [1608172, 7533, 476744, 76586, 2169035], 2169035],
 ["Langue française", [68626, 0, 11173, 0, 79799], 79799],
 ["Relations internationales et Francophonie", [181527, 0, 4348, 216, 186091], 186091],
 ["Ressources naturelles et Forêts", [523636, 0, 155531, 47969, 727136], 727136],
 ["Santé et Services sociaux", [54555327, 0, 5769598, 721090, 61046016], 61029765],
 ["Sécurité publique", [2035753, 3499, 413115, 144922, 2597289], 2597289],
 ["Tourisme", [219029, 0, 299560, 13542, 532131], 532131],
 ["Transports et Mobilité durable", [3025270, 2616, 781439, 427593, 4236918], 4236918],
 ["Travail", [36540, 0, 12775, -1, 49314], 49314]];
const QCE27=[
 ["National Assembly", 219842.7, 208732.0],
 ["Persons Appointed by the National Assembly", 303109.1, 184856.9],
 ["Affaires municipales et Habitation", 3590662.1, 3766485.0],
 ["Agriculture, Pêcheries et Alimentation", 1265728.2, 1302717.5],
 ["Conseil du trésor, Administration gouvernementale et Efficacité de l'État", 19242734.7, 19610782.9],
 ["Conseil exécutif", 611357.1, 608924.4],
 ["Culture et Communications", 859071.9, 886322.8],
 ["Cybersécurité et Numérique", 176442.6, 278113.7],
 ["Économie, Innovation et Énergie", 1995851.9, 1792833.8],
 ["Éducation", 20289872.1, 20096186.6],
 ["Emploi et Solidarité sociale", 5178968.7, 5232274.6],
 ["Enseignement supérieur", 9555427.3, 9085674.1],
 ["Environnement, Lutte contre les changements climatiques, Faune et Parcs", 581311.1, 588081.3],
 ["Famille", 4731986.9, 4528871.7],
 ["Finances", 8106419.0, 7633035.5],
 ["Immigration, Francisation et Intégration", 799286.8, 824819.6],
 ["Justice", 1615568.5, 1671362.7],
 ["Langue française", 84072.5, 85372.0],
 ["Relations internationales et Francophonie", 152559.3, 159889.9],
 ["Ressources naturelles et Forêts", 513433.3, 539562.3],
 ["Santé et Services sociaux", 60450102.0, 58205926.6],
 ["Sécurité publique", 2058477.4, 2077228.0],
 ["Tourisme", 116030.2, 140054.9],
 ["Transports et Mobilité durable", 2949912.8, 3432753.5],
 ["Travail", 29577.9, 40205.2]];
const QC_GOV={rev:[["Income and property taxes",70023,74115,69081],["Consumption taxes",28922,29639,28377],["Duties, permits and royalties",6387,6708,6191],["Miscellaneous revenue",15132,14922,16252],["Revenue from government enterprises",5268,5241,5689],["Federal government transfers",30610,29803,30498]],revT:[156342,160428,156088],
 exp:[["Santé et Services sociaux",65527,65945,64227],["Éducation",23663,23541,23352],["Enseignement supérieur",11311,11183,11383],["Famille",9308,9633,9015],["Transports et Mobilité durable",7308,9176,7684],["Emploi et Solidarité sociale",5863,5811,5707],["Affaires municipales et Habitation",5623,5253,5005],["Économie, Innovation et Énergie",4521,4365,4769],["Environnement, Lutte contre les changements climatiques, Faune et Parcs",2436,1802,2181],["Other portfolios",20542,19073,17971],["Debt service",9670,10148,9969]],
 expT:[165772,165930,161263],contingency:[2000,0,0],bal:[-11430,-5502,-5175],netDebt:[-255003,-245907,-236163]};
