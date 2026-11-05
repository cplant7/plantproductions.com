/* ================= SASKATCHEWAN: LEGISLATIVE ASSEMBLY ================= */
const SK_S={
 mla:["Legislative Assembly of Saskatchewan: MLAs","https://www.legassembly.sk.ca/mlas"],
 plan:["Legislative Assembly of Saskatchewan: Seating plan, October 19, 2026 (PDF)","https://www.legassembly.sk.ca/media/i0mfyimz/seatingplan.pdf"],
 cab:["Government of Saskatchewan: Cabinet","https://www.saskatchewan.ca/government/government-structure/cabinet"],
 min:["Government of Saskatchewan: Ministries","https://www.saskatchewan.ca/government/government-structure/ministries"],
 dm:["Prairie Sky Strategy: deputy minister changes, June 9 2026","https://prairieskystrategy.ca/saskatchewan-government-signals-leadership-reset-with-senior-public-service-changes/"],
 dmh:["Government of Saskatchewan directory: Ministry of Health","https://www.saskatchewan.ca/government/directory?ou=08c082cb-0fb6-46ca-a19f-dbb3702aad40"],
 exec:["Government of Saskatchewan: Executive Council and Office of the Premier","https://www.saskatchewan.ca/government/government-structure/ministries/executive-council-and-office-of-the-premier"],
 lg:["Wikipedia: Lieutenant Governor of Saskatchewan","https://en.wikipedia.org/wiki/Lieutenant_Governor_of_Saskatchewan"],
 bie:["Legislative Assembly of Saskatchewan: Board of Internal Economy, January 26 2026 (PDF)","https://docs.legassembly.sk.ca/legdocs/Committees/BIE/Debates/30L/20260126Debates-BIE.pdf"],
 aud:["Provincial Auditor of Saskatchewan: Meet the Provincial Auditor","https://auditor.sk.ca/about/meet-the-provincial-auditor"],
 nip:["CBC News: Nippi-Albright to sit as an independent, May 2026","https://www.cbc.ca/news/canada/saskatoon/betty-nippi-albright-leaves-sask-ndp-independent-9.7188937"],
 ge:["Wikipedia: 2024 Saskatchewan general election","https://en.wikipedia.org/wiki/2024_Saskatchewan_general_election"]
};
const SK_RAW=`Chris Beaudry|Kelvington-Wadena|skp
Carla Beck|Regina Lakeview|ndp
Brent Blakley|Regina Wascana Plains|ndp
Bhajan Brar|Regina Pasqua|ndp
Kim Breckner|Saskatoon Riversdale|ndp
Terri Bromm|Carrot River Valley|skp
Noor Burki|Regina Coronation Park|ndp
Lori Carr|Estevan-Big Muddy|skp
David Chan|Yorkton|skp
Ken Cheveldayoff|Saskatoon Willowgrove|skp
April ChiefCalf|Saskatoon Westview|ndp
Jared Clarke|Regina Walsh Acres|ndp
Jeremy Cockrill|The Battlefords|skp
Meara Conway|Regina Elphinstone-Centre|ndp
Brad Crassweller|White City-Qu'Appelle|skp
Kim Gartner|Kindersley-Biggar|skp
Hugh Gordon|Saskatoon Silverspring|ndp
Todd Goudy|Melfort|skp
Tajinder Grewal|Saskatoon University-Sutherland|ndp
Daryl Harrison|Cannington|skp
Jeremy Harrison|Meadow Lake|skp
Racquel Hilbert|Humboldt-Watrous|skp
Everett Hindley|Swift Current|skp
Sally Housser|Regina University|ndp
Terry Jenson|Warman|skp
Keith Jorgenson|Saskatoon Churchill-Wildwood|ndp
Warren Kaeding|Melville-Saltcoats|skp
Kevin Kasun|Prince Albert Carlton|skp
Travis Keisig|Last Mountain-Touchwood|skp
Barret Kropf|Dakota-Arm River|skp
Leroy Laliberte|Athabasca|ndp
Matt Love|Saskatoon Eastview|ndp
David Marit|Wood River|skp
Jamie Martens|Martensville-Blairmore|skp
Don McBean|Saskatoon Chief Mistawasis|ndp
Blaine McLeod|Lumsden-Morse|skp
Tim McLeod|Moose Jaw North|skp
Jordan McPhail|Cumberland|ndp
Scott Moe|Rosthern-Shellbrook|skp
Vicki Mowat|Saskatoon Fairview|ndp
Betty Nippi-Albright|Saskatoon Centre|ind
Megan Patterson|Moose Jaw Wakamow|skp
Joan Pratchler|Regina Rochdale|ndp
Jim Reiter|Rosetown-Delisle|skp
Erika Ritchie|Saskatoon Nutana|ndp
Alana Ross|Prince Albert Northcote|skp
Darlene Rowden|Batoche|skp
Jacqueline Roy|Regina Northeast|ndp
Nicole Sarauer|Regina Douglas Park|ndp
Eric Schmalz|Saskatchewan Rivers|skp
Brittney Senger|Saskatoon Southeast|ndp
Doug Steele|Cypress Hills|skp
Nathaniel Teed|Saskatoon Meewasin|ndp
James Thorsteinson|Cut Knife-Turtleford|skp
Darcy Warrington|Saskatoon Stonebridge|ndp
Kevin Weedmark|Moosomin-Montmartre|skp
Michael Weger|Weyburn-Bengough|skp
Sean Wilson|Canora-Pelly|skp
Trent Wotherspoon|Regina Mount Royal|ndp
Aleana Young|Regina South Albert|ndp
Colleen Young|Lloydminster|skp`;
// ministers (Premier handled separately); order = how they appear on the Cabinet card
const SK_MIN=[
 {id:"reiter",name:"Jim Reiter",title:"Deputy Premier and Minister of Finance",links:["fin"]},
 {id:"jharrison",name:"Jeremy Harrison",title:"Minister of Crown Investments Corporation and its commercial Crown corporations; Minister responsible for the Public Service Commission and for Lotteries and Gaming Saskatchewan",links:["cic"]},
 {id:"wilson",name:"Sean Wilson",title:"Minister of SaskBuilds and Procurement; Minister responsible for the Global Transportation Hub Authority",links:["sbp"]},
 {id:"kaeding",name:"Warren Kaeding",title:"Minister of Trade and Export Development; Minister responsible for Innovation and for the Saskatchewan Liquor and Gaming Authority",links:["ted"]},
 {id:"beaudry",name:"Chris Beaudry",title:"Minister of Energy and Resources",links:["er"]},
 {id:"marit",name:"David Marit",title:"Minister of Agriculture; Minister responsible for Saskatchewan Crop Insurance Corporation and the Water Security Agency",links:["agr"]},
 {id:"rowden",name:"Darlene Rowden",title:"Minister of Environment",links:["env"]},
 {id:"gartner",name:"Kim Gartner",title:"Minister of Highways",links:["hwy"]},
 {id:"schmalz",name:"Eric Schmalz",title:"Minister of Government Relations and of Immigration and Career Training; Minister responsible for First Nations, Métis and Northern Affairs and the Provincial Capital Commission",links:["gr","ict"]},
 {id:"cockrill",name:"Jeremy Cockrill",title:"Minister of Health",links:["hlth"]},
 {id:"carr",name:"Lori Carr",title:"Minister of Mental Health and Addictions, Seniors and Rural and Remote Health",links:["hlth"]},
 {id:"hindley",name:"Everett Hindley",title:"Minister of Education",links:["edu"]},
 {id:"cheveldayoff",name:"Ken Cheveldayoff",title:"Minister of Advanced Education and of Labour Relations and Workplace Safety; Minister responsible for the Workers' Compensation Board",links:["adv","lrws"]},
 {id:"jenson",name:"Terry Jenson",title:"Minister of Social Services",links:["ss"]},
 {id:"ross",name:"Alana Ross",title:"Minister of Parks, Culture and Sport; Minister responsible for the Status of Women, Tourism Saskatchewan and Francophone Affairs",links:["pcs"]},
 {id:"tmcleod",name:"Tim McLeod",title:"Minister of Justice and Attorney General; Minister responsible for the Firearms Secretariat",links:["jus"]},
 {id:"martens",name:"Jamie Martens",title:"Provincial Secretary",links:[],note:"The Provincial Secretary has no ministry of her own on this page."},
 {id:"weger",name:"Michael Weger",title:"Minister of Community Safety; Minister responsible for the Saskatchewan Public Safety Agency",links:["cs"]}
];
const skd=(name,role,src)=>({name,role,src:src||"dm"});
const SK_OUT=[
 {id:"exec",abbr:"Executive Council",name:"Executive Council and Office of the Premier",heads:[skd("Raynelle Wilson","Deputy Minister to the Premier and Cabinet Secretary","exec")]},
 {id:"fin",abbr:"FIN",name:"Ministry of Finance",heads:[skd("Tracey Smith","Deputy Minister")]},
 {id:"cic",abbr:"CIC",name:"Crown Investments Corporation",heads:[]},
 {id:"sbp",abbr:"SBP",name:"Ministry of SaskBuilds and Procurement",heads:[skd("Kevin France","Deputy Minister")]},
 {id:"ted",abbr:"TED",name:"Ministry of Trade and Export Development",heads:[skd("Richelle Bourgoin","Deputy Minister")]},
 {id:"er",abbr:"ER",name:"Ministry of Energy and Resources",heads:[skd("Bill Greuel","Deputy Minister")]},
 {id:"agr",abbr:"AGR",name:"Ministry of Agriculture",heads:[skd("Shawn Jaques","Deputy Minister")]},
 {id:"env",abbr:"ENV",name:"Ministry of Environment",heads:[skd("Sharla Hordenchuk","Deputy Minister")]},
 {id:"hwy",abbr:"HWY",name:"Ministry of Highways",heads:[]},
 {id:"gr",abbr:"GR",name:"Ministry of Government Relations",heads:[skd("Drew Wilby","Deputy Minister")]},
 {id:"ict",abbr:"ICT",name:"Ministry of Immigration and Career Training",heads:[skd("Greg Tuer","Deputy Minister")]},
 {id:"hlth",abbr:"HLTH",name:"Ministry of Health",heads:[skd("Rebecca Carter","Deputy Minister","dmh")]},
 {id:"edu",abbr:"EDU",name:"Ministry of Education",heads:[skd("Louise Michaud","Deputy Minister")]},
 {id:"adv",abbr:"AE",name:"Ministry of Advanced Education",heads:[skd("Clint Repski","Deputy Minister")]},
 {id:"lrws",abbr:"LRWS",name:"Ministry of Labour Relations and Workplace Safety",heads:[skd("Laurier Donais","Deputy Minister")]},
 {id:"ss",abbr:"SS",name:"Ministry of Social Services",heads:[skd("Blair Wagar","Deputy Minister")]},
 {id:"pcs",abbr:"PCS",name:"Ministry of Parks, Culture and Sport",heads:[]},
 {id:"jus",abbr:"JUS",name:"Ministry of Justice and Attorney General",heads:[skd("Max Bilson","Deputy Minister"),skd("Josh Freistadt","Associate Deputy Minister")]},
 {id:"cs",abbr:"CS",name:"Ministry of Community Safety",heads:[skd("Kimberly Kratzig","Deputy Minister")]}
];
const SK_LG={name:"Bernadette McIntyre",title:"Lieutenant Governor of Saskatchewan",since:"January 31, 2025",src:SK_S.lg};
const SK_OFFICERS=[
 {role:"Provincial Auditor",name:"Tara Clemett",what:"Audits government ministries, Crown corporations and agencies, and reports to the Assembly.",src:SK_S.aud},
 {role:"Ombudsman and Public Interest Disclosure Commissioner",name:"Sharon Pratchler",what:"Investigates complaints about unfair treatment by provincial and municipal bodies, and handles whistleblower disclosures.",src:SK_S.bie},
 {role:"Advocate for Children and Youth",name:"Lisa Broda",what:"Speaks up for young people and reviews services for children and youth.",src:SK_S.bie},
 {role:"Chief Electoral Officer",name:"Michael Boda",what:"Runs provincial elections through Elections Saskatchewan.",src:SK_S.bie},
 {role:"Conflict of Interest Commissioner and Registrar of Lobbyists",name:"Maurice Herauf",what:"Advises MLAs on conflicts of interest, investigates complaints and keeps the lobbyist registry.",src:SK_S.bie},
 {role:"Information and Privacy Commissioner",name:"Grace Hession David",what:"Oversees access-to-information and privacy laws.",src:SK_S.bie}
];
const SK_GE24={skp:34,ndp:27,ind:0};
const SK_LOG=[["2026-05-06","cross","Betty Nippi-Albright","Saskatoon Centre","ndp","ind","Left the NDP caucus; now sits as an independent (reported May 2026)"]];
CH.skleg={id:"skleg",title:"Legislative Assembly of Saskatchewan",fr:"Assemblée législative de la Saskatchewan",kicker:"",rows:4,memberNoun:"MLA",placeNoun:"Constituency",
  groups:{skp:{name:"Saskatchewan Party",short:"SKP",color:"var(--p-skp)"},ndp:{name:"Saskatchewan New Democratic Party",short:"NDP",color:"var(--p-ndp)"},ind:{name:"Independent",short:"IND",color:"#9a9a9a"}},
  order:["skp","ndp","ind"],govSide:["skp"],oppSide:["ndp","ind"],speaker:"Todd Goudy",leaders:["Scott Moe","Carla Beck"],majority:31,gov:"skp",ge:SK_GE24,geLabel:"October 28, 2024 election",
  roles:[["Premier","Scott Moe"],["Speaker","Todd Goudy"],["Leader of the Opposition","Carla Beck"],["Deputy Premier","Jim Reiter"]],
  approx:"Every MLA is shown at their desk on the Assembly's October 19, 2026 seating plan. Desks closest to the centre aisle are the front row.",
  src:SK_S.mla};
CH.skleg.members=SK_RAW.split("\n").map((l,i)=>{ const [n,r,p]=l.split("|"); return {i,name:n,hon:SK_MIN.some(m=>m.name===n)||n==="Scott Moe",sort:n,group:p,place:r}; });
CH.skleg.map={svg:"#sm-svg",panelId:"sm-panel",stageId:"sm-stage",st:()=>SM,panel:k=>smPanel(k),hl:k=>smHighlight(k),select:(k,z)=>smSelect(k,z),key:i=>smKeyForMpp(i)};
CH.skleg.summary=(c,total)=>{ const gov=c.skp||0, others=total-gov, wm=gov-1-others;
  return [`<div class="hsub"><span class="majtag">Saskatchewan Party majority</span> <b>${gov}</b> seats · ${gov-31} more than the 31 needed</div>`,
   `<div class="majbtn static"><span class="kicker">Working majority</span><span class="bign">${wm}</span><span class="src">Saskatchewan Party MLAs minus all other MLAs, leaving out the Speaker. No vacancies.</span></div>
    <dl class="kv"><dt>Premier</dt><dd>Scott Moe</dd><dt>Leader of the Opposition</dt><dd>Carla Beck</dd><dt>Speaker</dt><dd>Todd Goudy</dd><dt>Since election</dt><dd>1 party change</dd></dl>`]; };
chState.skleg={sel:null,focus:null,built:false};

function renderSkLeg(){
  const C=CH.skleg, st=chState.skleg, el=document.getElementById("ch-skleg");
  if(!st.built){
    el.innerHTML=`<section class="hsum" id="skleg-sum"></section>
     ${minIndexHTML("skleg")}
     <section class="nsec pmwrap"><div class="kicker">Power map · Regina</div><h2 class="nh pmtitle">Elected Officials</h2>
       ${foldHTML("sk-fold","How to read this map","What each part means and how to explore it",
         [["The room on the left","is where Saskatchewan's laws are made. Each dot is one MLA, a person voters chose to speak for their area. The colour shows their party."],
          ["The Premier","is the leader of the government. It is the leader who has the support of most MLAs."],
          ["Cabinet","is the Premier's team. Each minister is also an MLA with a seat in the room."],
          ["Ministries","are the departments that do the work, like Health or Highways. Cabinet ministers are in charge of them, and a deputy minister runs each one every day."]],
         [["Point at","or tap any dot, name or box to see who it is."],["Click a minister","to draw a line to their seat and to the ministry they lead."],["Click a ministry","to see who is in charge of it and where they sit."],["Search","for any MLA, constituency, minister or ministry. Details appear in the box under the map."]],
         "Cabinet from the Government of Saskatchewan; deputy ministers from June 2026 announcements.")}
       <div id="sm-slot"></div>
       <div class="src">${C.approx} <a href="${SK_S.plan[1]}" target="_blank" rel="noopener">${SK_S.plan[0]}</a>.</div></section>
     <div class="hgrid"><div class="hmain"><section class="nsec"><div class="kicker">About the Assembly</div><h2 class="nh">What the Legislative Assembly does</h2>
        <div class="does">
         <div><b>Forms the government</b><span>The leader who can win the support of most MLAs becomes Premier and picks Cabinet. That is usually the leader of the party with the most seats.</span></div>
         <div><b>Makes laws</b><span>Bills are debated here and in committees, then need Royal Assent from the Lieutenant Governor. Saskatchewan has no upper house.</span></div>
         <div><b>Holds the government to account</b><span>Opposition MLAs question ministers, most visibly in daily Question Period.</span></div>
         <div><b>Controls the money</b><span>Budgets, spending estimates and taxes must be approved by the Assembly.</span></div>
         <div><b>Represents Saskatchewan</b><span>Each of the 61 MLAs speaks for one constituency.</span></div>
        </div>
        <div class="who4"><span><b>Speaker</b> elected by MLAs; keeps order impartially</span><span><b>Cabinet</b> leads ministries; front bench</span><span><b>Opposition</b> questions and proposes alternatives</span><span><b>Backbenchers</b> most MLAs; debate and sit on committees</span></div>
       </section></div>
       <div class="hside">${ridingBtn("sk")}<section class="nsec"><div class="lgh"><h2 class="nh">Changes since the 2024 election</h2></div>
        <ol class="hlog">${SK_LOG.map(x=>{ const m=C.members.find(mm=>mm.place===x[3]); const chip=g=>`<span class="pchip" style="--pc:${C.groups[g].color}">${C.groups[g].short}</span>`;
          return `<li class="lgi"><button data-i="${m?m.i:""}"><span class="lg-t"><b>${x[2]}</b><span>${x[3]}</span><span class="muted">${x[6]}</span></span><span class="lg-c">${chip(x[4])}<span class="arr">→</span>${chip(x[5])}</span></button></li>`; }).join("")}</ol>
        ${srcA(SK_S.nip)}${srcA(SK_S.ge)}</section></div></div>`;
    el.querySelectorAll(".hlog [data-i]").forEach(b=>{ if(b.dataset.i!=="") b.onclick=()=>chSelect(C,+b.dataset.i,true); });
    renderSkMap(); wireFold("sk-fold");
    minIndexProv("skleg","Saskatchewan","Ministries","Ministry",SK_OUT,SK_MIN,"Scott Moe",MI_SRC([SK_S.cab,SK_S.dm]));
    st.built=true;
  }
  chSummary(C); chProfile(C); chList(C);
}
