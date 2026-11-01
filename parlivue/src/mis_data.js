/* ================= CITY OF MISSISSAUGA ================= */
const MIS_S={
 res:["City of Mississauga: 2026 Official Certified Results Summary (PDF)","https://www.mississauga.ca/wp-content/uploads/sites/12/2026/10/28153013/2026-Official-Certified-Results-Summary-Report.pdf"],
 unoff:["City of Mississauga: Unofficial results for the 2026 municipal election","https://www.mississauga.ca/city-of-mississauga-news/news/mississauga-announces-unofficial-results-for-2026-municipal-election/"],
 lead:["City of Mississauga: Leadership team","https://www.mississauga.ca/our-organization/leadership-team/"],
 chg:["City of Mississauga: Changes to the senior leadership team, April 25 2025","https://www.mississauga.ca/city-of-mississauga-news/news/city-of-mississauga-announces-changes-to-its-senior-leadership-team/"],
 budget:["City of Mississauga: 2026 Budget adopted, January 28 2026","https://www.mississauga.ca/city-of-mississauga-news/news/mississaugas-2026-budget-adopted/"],
 wiki:["Wikipedia: 2026 Mississauga municipal election","https://en.wikipedia.org/wiki/2026_Mississauga_municipal_election"],
 mayor:["Wikipedia: Mayor of Mississauga","https://en.wikipedia.org/wiki/Mayor_of_Mississauga"],
 council:["Wikipedia: Mississauga City Council","https://en.wikipedia.org/wiki/Mississauga_City_Council"]
};
PARTY.mun={name:"No party label (municipal)",color:"var(--p-ind)",src:MIS_S.res};
const MIS_SECTORS=[
 {id:"centre",label:"Council",ids:["w1","w2","w3","w4","w5","w6","w7","w8","w9","w10","w11"]},
 {id:"infra",label:"Administration",ids:["cm"]},
 {id:"global",label:"Commissioners",ids:["c_corp","c_leg","c_comm","c_tw","c_pb"]}
];
// [ward, name, votes, share, new to council]
const MIS_WARDS=[[1,"Stephen Dasko","11,458","86.99%",false],[2,"Tom Ellard","4,434","30.44%",true],[3,"Chris Fonseca","8,760","57.87%",false],[4,"John Kovac","12,643","79.53%",false],
 [5,"Natalie Hart","7,331","42.36%",false],[6,"Joe Horneck","13,308","67.16%",false],[7,"Lucas Alves","4,460","26.21%",true],[8,"Matt Mahoney","14,007","74.84%",false],
 [9,"Martin Reid","11,758","74.02%",false],[10,"Sue McFadden","15,787","79.64%",false],[11,"Brad Butt","10,099","62.15%",false]];
const MIS_PREV={2:"Alvin Tedjo, who ran for mayor",7:"Dipika Damerla, who ran for mayor"};
const MIS_IN=[
 ...MIS_WARDS.map(([w,n,v,p,isNew])=>({id:"w"+w,name:n,title:`Councillor-elect, Ward ${w} · ${v} votes (${p})`,links:[],w:1,isNew,role:"mis_council",src:"res",status:"A",riding:"Ward "+w,
   note:(isNew?`New to Council. Ward ${w} was previously held by ${MIS_PREV[w]}. `:"Re-elected. ")+"Also sits on Peel Regional Council."})),
 {id:"cm",name:"Geoff Wright",short:"City Manager",title:"City Manager and Chief Administrative Officer",links:["fire","audit","comms","corp","legis","comm","tw","pb"],w:3,role:"mis_cm",status:"A",src:"lead"},
 {id:"c_corp",name:"Marisa Chiu",short:"Corporate Services",title:"Commissioner of Corporate Services, Chief Financial Officer and Treasurer",links:["corp"],w:1.2,role:"mis_comm",status:"A",src:"lead"},
 {id:"c_leg",name:"Graham Walsh",short:"Legislative Services",title:"City Solicitor and Commissioner of Legislative Services",links:["legis"],w:1.2,role:"mis_comm",status:"A",src:"lead"},
 {id:"c_comm",name:"Raj Sheth",short:"Community Services",title:"Commissioner of Community Services",links:["comm"],w:1.2,role:"mis_comm",status:"A",src:"lead"},
 {id:"c_tw",name:"Sam Rogers",short:"Transportation and Works",title:"Commissioner of Transportation and Works",links:["tw"],w:1.2,role:"mis_comm",status:"A",src:"lead"},
 {id:"c_pb",name:"Andrew Whittemore",short:"Planning and Building",title:"Commissioner of Planning and Building",links:["pb"],w:1.2,role:"mis_comm",status:"A",src:"lead"}
];
const mh=(name,role)=>({name,role,status:"A",src:"lead"});
const MIS_OUT=[
 {id:"corp",abbr:"Corporate",name:"Corporate Services",heads:[mh("Marisa Chiu","Commissioner of Corporate Services, Chief Financial Officer and Treasurer")],desc:"Divisions: Corporate Business Services, Finance, Information Technology."},
 {id:"legis",abbr:"Legislative",name:"Legislative Services",heads:[mh("Graham Walsh","City Solicitor and Commissioner of Legislative Services"),{name:"Diana Rusnov",role:"City Clerk (certified the 2026 election results)",status:"A",src:"res"}],desc:"Divisions: Human Resources, Legal Services, Legislative Services (including the City Clerk)."},
 {id:"comm",abbr:"Community",name:"Community Services",heads:[mh("Raj Sheth","Commissioner of Community Services")],desc:"Divisions: Enforcement, Facilities and Property Management, Library, Parks, Forestry and Environment, Recreation and Culture."},
 {id:"tw",abbr:"Transport",name:"Transportation and Works",heads:[mh("Sam Rogers","Commissioner of Transportation and Works")],desc:"Divisions: Infrastructure Planning and Engineering, MiWay (the City's transit system), Rapid Transit Office, Traffic Management and Municipal Parking, Works Operations and Maintenance."},
 {id:"pb",abbr:"Planning",name:"Planning and Building",heads:[mh("Andrew Whittemore","Commissioner of Planning and Building")],desc:"Divisions: Building, City Planning Strategies, Development and Design, Economic Development Office, Tourism."},
 {id:"fire",abbr:"Fire",name:"Fire and Emergency Services",heads:[],desc:"A division reporting to the City Manager."},
 {id:"audit",abbr:"Audit",name:"Internal Audit",heads:[],desc:"A division reporting to the City Manager."},
 {id:"comms",abbr:"Comms",name:"Strategic Communications and Initiatives",heads:[],desc:"A division reporting to the City Manager."}
];
const MIS_TRANSITION={text:"Mississauga voted on October 26, 2026, and the City Clerk certified the results on October 28. Alvin Tedjo was elected mayor. The new Council's term runs from November 15, 2026 to November 14, 2030. This page shows the incoming Council. Carolyn Parrish remains mayor until November 14.",
  srcs:[MIS_S.res,MIS_S.mayor]};
const MIS_REPS=[["Fares Al Soud","MP, Mississauga Centre (Liberal)"],["Peter Fonseca","MP, Mississauga East—Cooksville (Liberal)"],["Iqra Khalid","MP, Mississauga—Erin Mills (Liberal)"],["Charles Sousa","MP, Mississauga—Lakeshore (Liberal)"],["Iqwinder Gaheer","MP, Mississauga—Malton (Liberal)"],["Rechie Valdez","MP, Mississauga—Streetsville (Liberal)"],
 ["Natalia Kusendova-Bashta","MPP, Mississauga Centre (PC) · Minister of Long-Term Care"],["Silvia Gualtieri","MPP, Mississauga East—Cooksville (PC)"],["Sheref Sabawy","MPP, Mississauga—Erin Mills (PC)"],["Rudy Cuzzetto","MPP, Mississauga—Lakeshore (PC)"],["Deepak Anand","MPP, Mississauga—Malton (PC)"],["Nina Tangri","MPP, Mississauga—Streetsville (PC) · Associate Minister of Small Business"]];
