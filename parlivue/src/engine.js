/* ================= ENGINE ================= */
const TAU=Math.PI*2, rPM=74, rOrbit=112, rM=262, rD=378, rRim=488;
const STATUS={A:"Verified",B:"Announced",C:"Re-check",U:"Not named"};
const C=id=>`var(--s-${id})`;
const P=(r,a)=>[r*Math.cos(a), r*Math.sin(a)];
const deg=a=>a*180/Math.PI;
const norm=a=>{a%=TAU;if(a<0)a+=TAU;return a};
const money=n=>"$"+(n>=1e7?(n/1e6).toFixed(1)+"M":n>=1e6?(n/1e6).toFixed(2)+"M":Math.round(n/1e3)+"K");
const moneyFull=n=>"$"+n.toLocaleString("en-CA");

/* ---------- role profiles (only checked sources are cited) ---------- */
const OAG=["Open and Accountable Government (PMO)","https://www.pm.gc.ca/en/news/backgrounders/2015/11/27/open-and-accountable-government"];
const ROLE={
 fed_pm:{text:"Head of the federal government. Chooses the members of Cabinet and leads the government's agenda in Parliament.",rel:[["Elected by","Voters of their riding, as a Member of Parliament"],["Holds office","As leader of the party with the confidence of the House of Commons"]],src:OAG},
 fed_min:{text:"A member of Cabinet, accountable to Parliament for the departments and agencies in their portfolio. Ministers set direction; deputy heads run the departments.",rel:[["Appointed by","The Governor General, on the Prime Minister's advice"]],src:OAG},
 fed_dh:{text:"Runs the organization day to day and gives the minister professional, non-partisan advice.",rel:[["Appointed by","The Governor in Council (the Governor General acting on Cabinet's advice)"]],src:["PCO: Appointments overview, 2025","https://www.canada.ca/en/privy-council/corporate/transparency/briefing-documents/prime-minister-2025/appointments-overview.html"]},
 fed_clerk:{text:"Holds three roles: deputy minister to the Prime Minister, Secretary to the Cabinet, and head of the federal public service. Recommends deputy minister appointments to the Prime Minister.",rel:[],src:["PCO: Role of the Clerk","https://www.canada.ca/en/privy-council/corporate/clerk/role.html"]},
 fed_sos:{text:"Secretaries of State lead specific issues within a Cabinet minister's portfolio. They are not members of Cabinet but may join Cabinet meetings when their issues come up.",rel:[],src:["PM: Secretaries of State","https://www.pm.gc.ca/en/secretaries-state"]},
 bc_premier:{text:"Head of the provincial government and leader of the Executive Council, BC's Cabinet.",rel:[["Elected by","Voters of their electoral district, as a Member of the Legislative Assembly"],["Holds office","As leader of the party with the confidence of the Legislature"]],src:BC_S.cab},
 bc_min:{text:"A member of the Executive Council, responsible to the Legislature for their ministry. The minister sets direction; the deputy minister runs the ministry.",rel:[],src:BC_S.cab},
 bc_dm:{text:"Runs the ministry day to day and advises the minister.",rel:[["Appointed by","The Lieutenant Governor in Council (Public Service Act, s. 12)"]],src:BC_S.psa},
 bc_head:{text:"Deputy Minister to the Premier, Cabinet Secretary and Head of the BC Public Service. Leads the Deputy Ministers' Council.",rel:[["Appointed by","The Lieutenant Governor in Council (Public Service Act, s. 12)"]],src:BC_S.dm},
 bc_mos:{text:"Ministers of State carry a specific area of responsibility. The official list doesn't say which ministry supports each one, so they appear as one group.",rel:[],src:BC_S.cab},
 vic_mayor:{text:"Head and chief executive officer of the City. Leads Council and chairs its meetings, establishes standing committees and appoints their members, and gives general direction to City officers on carrying out Council policy.",rel:[["Elected by","Victoria voters, for a four-year term"],["Also sits on","Capital Regional District Board (automatic appointment)"]],src:VIC_S.roles},
 vic_council:{text:"Councillors weigh the wellbeing of the whole community, help develop and evaluate City policies and services, and vote on Council decisions. They don't run departments: Council as a whole directs the City Manager.",rel:[["Elected by","Victoria voters, for a four-year term"]],src:VIC_S.roles},
 vic_cow:{text:"The Mayor and all eight councillors sitting as a committee. Council's advisory committees and panels are shown connected here.",rel:[],src:VIC_S.ar},
 vic_cm:{text:"The City's chief administrative officer, responsible for overall management of the City's administrative operations. The City Manager is Council's only direct employee; department directors report through this role.",rel:[["Appointed by","City Council"],["Legal basis","Community Charter, s. 147"]],src:VIC_S.cao},
 vic_head:{text:"Directs the department and reports to the City Manager.",rel:[],src:VIC_S.ar},
 vic_pboard:{text:"Provides civilian oversight of the Victoria Police Department for Victoria and Esquimalt. Under the Police Act it employs the department's members, oversees its finances, sets policy direction and handles policy and service complaints.",rel:[["Legal basis","Police Act (BC)"]],src:VIC_S.pb},
 vic_police:{text:"Leads the Victoria Police Department, which serves Victoria and Esquimalt.",rel:[["Employed by","Victoria and Esquimalt Police Board"]],src:VIC_S.pb},
 vic_lboard:{text:"Governs the Greater Victoria Public Library. The City of Victoria funds part of its budget.",rel:[],src:VIC_S.fp},
 mis_mayor:{text:"Head of Council and chief executive officer of the City. Chairs Council meetings and represents the City. The Mayor also sits on Peel Regional Council.",rel:[["Elected by","Mississauga voters, citywide, for a four-year term"],["Term","November 15, 2026 to November 14, 2030"]],src:MIS_S.council},
 mis_council:{text:"Each councillor represents one of 11 wards. Councillors vote on City bylaws, budgets and policies, and also serve on Peel Regional Council. They do not run departments: Council as a whole directs the City Manager.",rel:[["Elected by","Voters in their ward, for a four-year term"]],src:MIS_S.council},
 mis_cm:{text:"The City's most senior public servant. Leads the commissioners who run each department and reports to Council.",rel:[["Appointed by","City Council"]],src:MIS_S.lead},
 mis_comm:{text:"A commissioner leads one of the City's departments and reports to the City Manager.",rel:[["Reports to","City Manager"]],src:MIS_S.lead},
 mis_head:{text:"A City department or division. Commissioners lead the departments; three divisions report directly to the City Manager.",rel:[],src:MIS_S.lead},
 vic_adv:{text:"One of the City's boards and committees. See its page for its mandate and membership.",rel:[],src:null},
 on_premier:{text:"Head of Ontario's government and leader of the Executive Council (Cabinet). Doug Ford also serves as Minister of Intergovernmental Affairs.",rel:[["Elected by","Voters of Etobicoke North, as a Member of Provincial Parliament"],["Holds office","As leader of the party with the confidence of the Legislative Assembly"]],src:ON_S.wiki},
 on_min:{text:"A member of the Executive Council, responsible to the Legislative Assembly for their ministry. The minister sets direction; the deputy minister runs the ministry. Associate ministers support a lead minister on a specific file.",rel:[["Appointed by","The Lieutenant Governor, on the Premier's advice"]],src:ON_S.cab},
 on_dm:{text:"Runs the ministry day to day and advises the minister. Deputy ministers are career public servants, not elected.",rel:[],src:ON_S.dm},
 on_head:{text:"Secretary of the Cabinet and Head of the Ontario Public Service. Supports the Premier and Cabinet and leads Ontario's deputy ministers.",rel:[],src:ON_S.sec}
};
PARTY.onpc={name:"Progressive Conservative Party of Ontario",color:"var(--p-cpc)",src:ON_S.mpp};

/* ---------- datasets ---------- */
const FED_SECTORS=[
 {id:"centre",label:"Centre of Government",ids:["leblanc","ali","lightbound"]},
 {id:"econ",label:"Economy & Innovation",ids:["champagne","joly","solomon"]},
 {id:"infra",label:"Infrastructure & Regions",ids:["robertson","mackinnon","olszewski"]},
 {id:"res",label:"Resources & Environment",ids:["hodgson","dabrusin","thompson","macdonald"]},
 {id:"ind",label:"Indigenous & North",ids:["alty","chartrand","gullmasty"]},
 {id:"people",label:"People & Communities",ids:["hajdu","michel","diab","miller","valdez"]},
 {id:"global",label:"Global, Security & Justice",ids:["anand","sidhu","mcguinty","mcknight","anandasangaree","fraser"]}
];
const DS={
 federal:{id:"federal",tab:"Federal",stamp:"Federal · Snapshot Nov 1 2026",
   tagline:"Who steers the federal government of Canada: the Prime Minister, every Cabinet minister, and the deputy heads who run each department.",
   party:"lib", hub:{name:"Mark Carney",kicker:"PRIME MINISTER",l1:"Mark",l2:"Carney",title:"Prime Minister of Canada",role:"fed_pm",src:"cab"},
   S, sectors:FED_SECTORS, innerNoun:"Cabinet minister", outerNoun:"Department / agency", outerRole:"fed_dh",
   inner:ministers.filter(m=>!m.pm).map(m=>({id:m.id,name:m.name,title:m.title,links:m.depts,note:m.note,role:"fed_min",src:"cab"})),
   outer:depts, hubLinks:[],
   sats:[{key:"sos",pos:"top",label:"Secretaries of State",sub:"10 · OUTSIDE CABINET",color:"var(--muted)",role:"fed_sos",list:secretaries.map(s=>[s[0],"Secretary of State ("+s[1]+")"+(SOS_RIDING[s[0]]?" · "+SOS_RIDING[s[0]]:"")]),src:"sos"},
         {key:"clerk",pos:"bottom",label:"Clerk of the PC",sub:"PUBLIC SERVICE",color:"var(--brass)",ps:true,person:"Michael Sabia",title:"Clerk of the Privy Council and Secretary to the Cabinet",role:"fed_clerk",status:"A",src:"pco"}]},
 bc:{id:"bc",tab:"BC",stamp:"British Columbia · Snapshot Nov 1 2026",
   tagline:"Who steers the Government of British Columbia: the Premier, every Cabinet minister, and the deputy ministers who run each ministry.",
   party:"ndp", banner:BC_TRANSITION, hub:{name:"David Eby",kicker:"PREMIER",l1:"David",l2:"Eby",title:"Premier of British Columbia",role:"bc_premier",src:"cab"},
   S:BC_S, sectors:BC_SECTORS, innerNoun:"Cabinet minister", outerNoun:"Ministry", outerRole:"bc_dm",
   inner:BC_MIN.map(m=>({...m,role:"bc_min",src:"cab",short:m.id==="chandraherbert"?"Chandra Herbert":undefined})),
   outer:BC_OUT, hubLinks:["premier"],
   sats:[{key:"mos",pos:"top",label:"Ministers of State",sub:"3 · WITHIN PORTFOLIOS",color:"var(--muted)",role:"bc_mos",list:BC_MOS.map(m=>[m[0],"Minister of State for "+m[1]]),src:"cab"},
         {key:"head",pos:"bottom",label:"Head of Public Service",sub:"DEPUTY MINISTERS' COUNCIL",color:"var(--brass)",ps:true,person:"Shannon Salter",title:"Deputy Minister to the Premier, Cabinet Secretary and Head of the Public Service",role:"bc_head",status:"A",src:"dm"}]},
 victoria:{id:"victoria",tab:"Victoria",stamp:"City of Victoria · Snapshot Nov 1 2026",
   tagline:"Who runs the City of Victoria: the Mayor and Council, the City Manager and department directors, the independent boards, and where the 2026 budget goes.",
   party:"ind", hub:{name:"Marianne Alto",kicker:"MAYOR",l1:"Marianne",l2:"Alto",title:"Mayor of Victoria",role:"vic_mayor",src:"elec"},
   S:VIC_S, sectors:VIC_SECTORS, innerNoun:"Council & administration", outerNoun:"Department / body", outerRole:"vic_head",
   inner:VIC_IN, outer:VIC_OUT, hubLinks:[], budget:true,
   sats:[{key:"crd",pos:"top",label:"CRD Board",sub:"REGIONAL · MAYOR SITS ON IT",color:"var(--muted)",role:null,src:"guide",
          text:"The Capital Regional District Board governs regional services for Greater Victoria. The City automatically appoints its mayor to the board. The regional layer isn't mapped here yet."}]},
 mississauga:{id:"mississauga",tab:"Mississauga",stamp:"City of Mississauga · Snapshot Nov 1 2026",
   tagline:"Who runs the City of Mississauga: the Mayor-elect and Council for 2026 to 2030, the City Manager, the commissioners and the departments they lead.",
   party:"mun", banner:MIS_TRANSITION, hub:{name:"Alvin Tedjo",kicker:"MAYOR-ELECT",l1:"Alvin",l2:"Tedjo",title:"Mayor-elect of Mississauga (74,479 votes, 39.21%). Takes office November 15, 2026",role:"mis_mayor",src:"res"},
   S:MIS_S, sectors:MIS_SECTORS, innerNoun:"Council & administration", outerNoun:"Department / division", outerRole:"mis_head",
   inner:MIS_IN, outer:MIS_OUT, hubLinks:[],
   sats:[{key:"peel",pos:"top",label:"Peel Regional Council",sub:"REGIONAL · MAYOR AND ALL 11 COUNCILLORS SIT ON IT",color:"var(--muted)",role:null,src:"council",
          text:"The Region of Peel runs regional services such as water, waste, paramedics and social services, and funds Peel Regional Police. Mississauga's Mayor and all 11 councillors also sit on Regional Council. The regional layer is not mapped here yet."},
         {key:"reps",pos:"bottom",label:"MPs and MPPs",sub:"FEDERAL AND PROVINCIAL · 12 MEMBERS",color:"var(--muted)",role:null,src:"res",list:MIS_REPS,
          text:"Mississauga's six ridings each elect one MP to the House of Commons and one MPP to Queen's Park. See the House of Commons and Ontario pages for their seats."}]},
 ontario:{id:"ontario",tab:"Ontario",stamp:"Snapshot · Nov 1 2026",
   tagline:"Who steers the Government of Ontario: the Premier, every Cabinet and associate minister, and the deputy ministers who run each ministry.",
   party:"onpc", hub:{name:"Doug Ford",kicker:"PREMIER",l1:"Doug",l2:"Ford",title:"Premier of Ontario and Minister of Intergovernmental Affairs",role:"on_premier",src:"wiki",riding:"Etobicoke North"},
   S:ON_S, sectors:ON_SECTORS, innerNoun:"Cabinet minister", outerNoun:"Ministry", outerRole:"on_dm",
   inner:ON_MIN.map(m=>({id:m.id,name:m.name,title:m.title,links:m.links,riding:m.riding,role:"on_min",src:"cab",w:m.assoc?.8:1})),
   outer:ON_OUT, hubLinks:["cab","iga"],
   sats:[{key:"onhead",pos:"bottom",label:"Secretary of the Cabinet",sub:"HEAD OF THE OPS",color:"var(--brass)",ps:true,person:"Michelle E. DiEmanuele",title:"Secretary of the Cabinet and Head of the Ontario Public Service",role:"on_head",status:"A",src:"sec"}]}
};
// inner node role/short defaults for Victoria
VIC_IN.forEach(n=>{ if(n.role==="councillor"){n.role="vic_council";n.src="elec";n.status="A";}
  else n.role={cow:"vic_cow",cm:"vic_cm",pboard:"vic_pboard",lboard:"vic_lboard"}[n.role]; });

/* ---------- global UI refs ---------- */
const svg=d3.select("#svg"), stage=document.getElementById("stage"), panel=document.getElementById("panel"), tip=document.getElementById("tip");
const psBtn=document.getElementById("ps"), sizeBtn=document.getElementById("sizeby");
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const zoomG=svg.append("g"); let root=zoomG.append("g");
const zoom=d3.zoom().scaleExtent([1,4]).translateExtent([[-560,-560],[560,560]]).on("zoom",e=>zoomG.attr("transform",e.transform));
svg.call(zoom).on("dblclick.zoom",null);
document.getElementById("zin").onclick=()=>svg.transition().duration(220).call(zoom.scaleBy,1.35);
document.getElementById("zout").onclick=()=>svg.transition().duration(220).call(zoom.scaleBy,1/1.35);
document.getElementById("zfit").onclick=()=>svg.transition().duration(300).call(zoom.transform,d3.zoomIdentity);

let ds, I, O, secOf, parents, rot=0, current="hub", V={}, maxBudget=1;

function prep(d){
  I={}; d.inner.forEach(n=>I[n.id]=n);
  O={}; d.outer.forEach(n=>O[n.id]=n);
  secOf={}; d.sectors.forEach(s=>s.ids.forEach(id=>secOf[id]=s.id));
  parents={}; d.inner.forEach(n=>n.links.forEach(o=>(parents[o] ||= []).push(n.id)));
  d.outer.forEach(o=>{ o.sector = parents[o.id]? secOf[parents[o.id][0]] : d.sectors[0].id; });
  maxBudget=d3.max(d.outer,o=>o.budget||0)||1;
  // inner angles with weights and a gap between groups
  const GAP=0.7, total=d.sectors.reduce((a,s)=>a+s.ids.reduce((b,id)=>b+(I[id].w||1),0),0)+d.sectors.length*GAP, step=TAU/total;
  const w0=d.sectors[0].ids.reduce((b,id)=>b+(I[id].w||1),0);
  let cur=-Math.PI/2 - w0*step/2;
  d.sectors.forEach(s=>{ s.a0=cur; s.ids.forEach(id=>{ const w=I[id].w||1; I[id].a=cur+w*step/2; cur+=w*step; }); s.a1=cur; cur+=GAP*step; });
  // outer target = circular mean of parents; hub-only items sit at the top
  d.outer.forEach(o=>{ const ps=parents[o.id]; if(!ps){o.t=-Math.PI/2;return;} let x=0,y=0; ps.forEach(id=>{x+=Math.cos(I[id].a);y+=Math.sin(I[id].a)}); o.t=Math.atan2(y,x); });
  const arr=[...d.outer].sort((a,b)=>a.t-b.t); arr.forEach(o=>o.a=o.t);
  const min=TAU/arr.length*0.92;
  for(let it=0;it<500;it++){ let moved=false;
    for(let i=0;i<arr.length;i++){ const a=arr[i], b=arr[(i+1)%arr.length]; let diff=b.a-a.a; if(i===arr.length-1) diff+=TAU;
      if(diff<min){ const p=(min-diff)/2; a.a-=p; b.a+=p; moved=true; } }
    arr.forEach(o=>{ o.a+=(o.t-o.a)*0.02; }); if(!moved) break; }
}

const outerR=o=> (ds.budget && sizeBtn.getAttribute("aria-pressed")==="true" && o.budget) ? 6+15*Math.sqrt(o.budget/maxBudget) : 6.5;
const worst=h=>!h.length?"U":h.some(x=>x.status==="U")?"U":h.some(x=>x.status==="C")?"C":h.some(x=>x.status==="B")?"B":"A";
const stColor=s=>s==="A"?"var(--ok)":s==="B"?"var(--warn)":s==="C"?"var(--check)":"var(--muted)";
const shortName=n=>n.short||n.name.replace(/^(David J\.|Julie Aviva|Lena Metlege) /,"").split(" ").slice(-1)[0];

function build(){
  root.remove(); root=zoomG.append("g"); svg.select("defs").remove(); const defs=svg.append("defs");
  V={};
  const deco=root.append("g").attr("aria-hidden","true");
  [rM,rD].forEach(r=>deco.append("circle").attr("r",r).attr("fill","none").attr("stroke","var(--rule)"));
  deco.append("circle").attr("r",rOrbit).attr("fill","none").attr("stroke","var(--rule)").attr("stroke-dasharray","2 6");
  deco.append("circle").attr("r",rRim+8).attr("fill","none").attr("stroke","var(--rule)");
  V.ticks=root.append("g").attr("aria-hidden","true").selectAll("line").data(d3.range(180).map(i=>i/180*TAU)).join("line")
    .attr("stroke","var(--rule)").attr("stroke-width",(a,i)=>i%15===0?1.6:1).each(function(a,i){this.__r0=rRim+8;this.__r1=rRim+(i%15===0?18:13)});
  const gSector=root.append("g"), gSpoke=root.append("g"), gPS=root.append("g"), gLink=root.append("g"), gNodes=root.append("g");
  V.sec=gSector.selectAll("g").data(ds.sectors).join("g");
  V.sec.append("path").attr("class","wedge").attr("fill",s=>C(s.id)).attr("opacity",.06);
  V.sec.append("path").attr("class","band").attr("fill","none").attr("stroke",s=>C(s.id)).attr("stroke-width",6).attr("stroke-linecap","round");
  ds.sectors.forEach(s=>defs.append("path").attr("id","sp-"+s.id));
  V.sec.append("text").attr("font-family","var(--f-mono)").attr("font-size",12.5).attr("letter-spacing","0.12em").attr("fill",s=>C(s.id))
    .append("textPath").attr("href",s=>"#sp-"+s.id).attr("startOffset","50%").attr("text-anchor","middle").text(s=>s.label.toUpperCase());
  V.defs=defs;
  V.spokes=gSpoke.selectAll("line").data(ds.inner).join("line").attr("stroke","var(--rule)");
  const L=[]; ds.inner.forEach(n=>n.links.forEach(o=>L.push({i:n,o:O[o]})));
  V.links=gLink.selectAll("path").data(L).join("path").attr("fill","none").attr("stroke",l=>C(secOf[l.i.id])).attr("stroke-width",1.6).attr("stroke-opacity",.55);
  const psSat=ds.sats.find(s=>s.ps);
  psBtn.hidden=!psSat; sizeBtn.hidden=!ds.budget;
  V.ps=gPS.selectAll("path").data(psSat?ds.outer:[]).join("path").attr("fill","none").attr("stroke","var(--brass)").attr("stroke-dasharray","2 5").attr("opacity",0);

  const node=sel=>sel.attr("class","n").attr("tabindex",0).attr("role","button");
  // hub
  const h=node(gNodes.append("g")).datum({key:"hub"}).attr("aria-label",ds.hub.name+", "+ds.hub.title);
  h.append("circle").attr("class","hit").attr("r",rPM).attr("fill","var(--bg)").attr("stroke","var(--brass)").attr("stroke-width",2);
  h.append("circle").attr("r",rPM-8).attr("fill","none").attr("stroke","var(--brass)").attr("stroke-opacity",.35).attr("stroke-dasharray","1 4");
  h.append("text").attr("y",-12).attr("text-anchor","middle").attr("font-family","var(--f-mono)").attr("font-size",10.5).attr("letter-spacing","0.14em").attr("fill","var(--brass)").text(ds.hub.kicker);
  [ds.hub.l1,ds.hub.l2].forEach((t,i)=>h.append("text").attr("y",10+i*22).attr("text-anchor","middle").attr("font-family","var(--f-mark)").attr("font-weight",800).attr("font-size",t.length>7?18:21).attr("fill","var(--ink)").text(t));
  // satellites
  ds.sats.forEach(s=>{ s.pt=[0, s.pos==="top"?-rOrbit:rOrbit];
    const g=node(gNodes.append("g")).datum({key:s.key}).attr("transform",`translate(${s.pt})`).attr("aria-label",s.label);
    const w=Math.max(130, s.label.length*7.4+24, s.sub.length*6.4+24);
    g.append("rect").attr("class","hit").attr("x",-w/2).attr("y",-17).attr("width",w).attr("height",34).attr("rx",17).attr("fill","var(--surface)").attr("stroke",s.color).attr("stroke-width",1.5);
    g.append("text").attr("y",-1).attr("text-anchor","middle").attr("font-size",12).attr("font-weight",650).attr("fill","var(--ink)").text(s.label);
    g.append("text").attr("y",12).attr("text-anchor","middle").attr("font-size",9).attr("font-family","var(--f-mono)").attr("fill","var(--muted)").text(s.sub); });
  // inner
  V.inner=gNodes.selectAll("g.in").data(ds.inner).join("g").call(node).classed("in",true).datum(n=>({key:n.id,n})).attr("aria-label",x=>x.n.name+", "+x.n.title);
  V.inner.append("circle").attr("class","hit").attr("r",x=>x.n.w>2?12:10).attr("fill","var(--surface)").attr("stroke",x=>C(secOf[x.key])).attr("stroke-width",3);
  V.inner.append("circle").attr("r",x=>x.n.w>2?5:3.5).attr("fill",x=>C(secOf[x.key]));
  V.inner.append("text").attr("class","lbl").attr("font-size",13).attr("font-weight",x=>x.n.w>2?750:600).attr("fill","var(--ink)").attr("dy","0.35em").text(x=>shortName(x.n));
  // outer
  V.outer=gNodes.selectAll("g.out").data(ds.outer).join("g").call(node).classed("out",true).datum(o=>({key:"o_"+o.id,o})).attr("aria-label",x=>x.o.name);
  V.outer.append("circle").attr("class","hit ring").attr("fill","var(--bg)").attr("stroke",x=>x.o.kind==="advisory"?"var(--rule)":stColor(worst(x.o.heads))).attr("stroke-width",2).attr("stroke-dasharray",x=>x.o.kind==="advisory"?"2 2":null);
  V.outer.append("circle").attr("class","core").attr("fill",x=>C(x.o.sector)).attr("fill-opacity",x=>x.o.kind==="advisory"?.5:1);
  V.outer.append("text").attr("class","lbl").attr("font-size",13.5).attr("font-weight",700).attr("fill",x=>C(x.o.sector)).attr("dy","0.35em").text(x=>x.o.abbr);
  V.outer.append("text").attr("class","amt").attr("font-size",10.5).attr("font-family","var(--f-mono)").attr("fill","var(--muted)").attr("dy","1.6em").text(x=>ds.budget&&x.o.budget?money(x.o.budget):"");
  sizeNodes();

  gNodes.selectAll(".n").on("click",(e,x)=>select(x.key))
    .on("keydown",(e,x)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); select(x.key); } })
    .on("mouseenter mousemove",(e,x)=>showTip(e,x)).on("mouseleave",()=>tip.hidden=true);
  V.gNodes=gNodes;
}
function sizeNodes(){
  V.outer.select(".core").attr("r",x=>outerR(x.o));
  V.outer.select(".ring").attr("r",x=>outerR(x.o)+4.5);
  V.outer.select(".amt").attr("opacity",ds.budget&&sizeBtn.getAttribute("aria-pressed")==="true"?1:0);
}

/* ---------- layout ---------- */
function arcPath(r,a0,a1){ const [x0,y0]=P(r,a0),[x1,y1]=P(r,a1); return `M${x0},${y0} A${r},${r} 0 ${(a1-a0)>Math.PI?1:0} 1 ${x1},${y1}`; }
function wedge(r0,r1,a0,a1){ const lg=(a1-a0)>Math.PI?1:0; const [a,b]=P(r0,a0),[c,d]=P(r1,a0),[e,f]=P(r1,a1),[g,h]=P(r0,a1); return `M${a},${b} L${c},${d} A${r1},${r1} 0 ${lg} 1 ${e},${f} L${g},${h} A${r0},${r0} 0 ${lg} 0 ${a},${b}Z`; }
function radialText(sel,offset,inward){
  sel.attr("transform",function(){ const a=this.__a, flip=Math.cos(a)<0; return `rotate(${deg(a)}) translate(${offset(this)},0)`+(flip?" rotate(180)":""); })
     .attr("text-anchor",function(){ const flip=Math.cos(this.__a)<0; return inward?(flip?"start":"end"):(flip?"end":"start"); });
}
function layout(){
  V.ticks.each(function(a){ const [x0,y0]=P(this.__r0,a+rot),[x1,y1]=P(this.__r1,a+rot); this.setAttribute("x1",x0);this.setAttribute("y1",y0);this.setAttribute("x2",x1);this.setAttribute("y2",y1); });
  V.sec.select(".band").attr("d",s=>arcPath(rRim,s.a0+rot+.02,s.a1+rot-.02));
  V.sec.select(".wedge").attr("d",s=>wedge(rPM+6,rRim-8,s.a0+rot,s.a1+rot));
  ds.sectors.forEach(s=>{ const mid=norm((s.a0+s.a1)/2+rot), bottom=Math.sin(mid)>0.15;
    let d; if(bottom){ const R=rRim+36,[x1,y1]=P(R,s.a1+rot),[x0,y0]=P(R,s.a0+rot); d=`M${x1},${y1} A${R},${R} 0 ${(s.a1-s.a0)>Math.PI?1:0} 0 ${x0},${y0}`; } else d=arcPath(rRim+24,s.a0+rot,s.a1+rot);
    V.defs.select("#sp-"+s.id).attr("d",d); });
  V.spokes.attr("x1",n=>P(rPM,n.a+rot)[0]).attr("y1",n=>P(rPM,n.a+rot)[1]).attr("x2",n=>P(rM-12,n.a+rot)[0]).attr("y2",n=>P(rM-12,n.a+rot)[1]);
  V.links.attr("d",l=>{ const ai=l.i.a+rot, ao=l.o.a+rot; return `M${P(rM+12,ai)}C${P(rM+70,ai)} ${P(rD-70,ao)} ${P(rD-12,ao)}`; });
  const psSat=ds.sats.find(s=>s.ps);
  if(psSat) V.ps.attr("d",o=>{ const ao=o.a+rot; return `M${psSat.pt}Q${P(rD*0.55,ao)} ${P(rD-12,ao)}`; });
  V.inner.attr("transform",x=>`translate(${P(rM,x.n.a+rot)})`);
  V.inner.select(".lbl").each(function(x){this.__a=x.n.a+rot}).call(s=>radialText(s,()=>-18,true));
  V.outer.attr("transform",x=>`translate(${P(rD,x.o.a+rot)})`);
  V.outer.selectAll(".lbl,.amt").each(function(x){this.__a=x.o.a+rot; this.__r=outerR(x.o)}).call(s=>radialText(s,el=>el.__r+11,false));
}

/* ---------- rotation ---------- */
function rotateTo(target,dur=950){
  let delta=norm(target-rot); if(delta>Math.PI) delta-=TAU; const from=rot;
  if(reduce||dur===0){ rot=from+delta; layout(); return; }
  root.interrupt("spin"); root.transition("spin").duration(dur).ease(d3.easeCubicInOut).tween("rot",()=>t=>{ rot=from+delta*t; layout(); });
}

/* ---------- highlight ---------- */
const psOn=()=>psBtn.getAttribute("aria-pressed")==="true";
function related(key){
  const s=new Set([key]);
  if(key==="hub"){ ds.inner.forEach(n=>s.add(n.id)); ds.sats.forEach(x=>s.add(x.key)); ds.hubLinks.forEach(o=>s.add("o_"+o)); }
  else if(ds.sats.some(x=>x.key===key)){ s.add("hub"); if(ds.sats.find(x=>x.key===key).ps) ds.outer.forEach(o=>s.add("o_"+o.id)); }
  else if(key.startsWith("o_")){ const id=key.slice(2); (parents[id]||[]).forEach(p=>s.add(p)); if(ds.hubLinks.includes(id)) s.add("hub"); if(psOn()) ds.sats.filter(x=>x.ps).forEach(x=>s.add(x.key)); }
  else { s.add("hub"); I[key].links.forEach(o=>s.add("o_"+o)); }
  return s;
}
function paint(key){
  const s=related(key), all=key==="hub";
  V.gNodes.selectAll(".n").classed("dim",x=>!all&&!s.has(x.key));
  V.links.attr("stroke-opacity",l=>all?.5:(l.i.id===key||"o_"+l.o.id===key)?.95:.06).attr("stroke-width",l=>(l.i.id===key||"o_"+l.o.id===key)?2.6:1.6);
  V.spokes.attr("stroke",n=>n.id===key?"var(--brass)":"var(--rule)").attr("stroke-opacity",n=>all||n.id===key?1:.35);
  const psKey=(ds.sats.find(x=>x.ps)||{}).key;
  V.ps.attr("opacity",o=>!psOn()?0:(key===psKey||all||"o_"+o.id===key)?.75:.08);
  V.sec.attr("opacity",sc=>{ if(all) return 1; const sid=key.startsWith("o_")?O[key.slice(2)].sector:secOf[key]; return !sid||sid===sc.id?1:.3; });
}

/* ---------- panel ---------- */
const pill=s=>`<span class="pill ${s}">${STATUS[s]}</span>`;
const srcA=src=>src?`<span class="src">Source: <a href="${src[1]}" target="_blank" rel="noopener">${src[0]}</a></span>`:"";
const srcK=k=>k&&ds.S[k]?srcA(ds.S[k]):"";
const go=(key,label,cls="")=>`<button class="linkbtn ${cls}" data-go="${key}">${label}</button>`;
function roleBox(roleKey,extraRel=[]){
  const r=ROLE[roleKey]; if(!r) return "";
  const rel=[...r.rel,...extraRel];
  return `<div class="role"><div class="kicker">About this role</div><p>${r.text}</p>${rel.length?`<dl class="rel">${rel.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>`:""}${srcA(r.src)}</div>`;
}
function budgetBars(){
  const items=[...ds.outer.filter(o=>o.budget).map(o=>({key:"o_"+o.id,label:o.name,v:o.budget})),
    ...ds.inner.filter(n=>n.budget).map(n=>({key:n.id,label:n.budgetLabel||n.short||n.name,v:n.budget})),
    ...VIC_OTHER_BUDGET.map(b=>({label:b[0],v:b[1]}))].sort((a,b)=>b.v-a.v);
  const max=items[0].v, sum=items.reduce((a,b)=>a+b.v,0);
  const top=items.slice(0,5);
  return `<h3>2026 operating budget · ${money(VIC_TOTAL)} · top 5 of ${items.length}</h3><div class="bars">${top.map(it=>`<div class="bar"><span>${it.key?`<button data-go="${it.key}">${it.label}</button>`:it.label}</span><span class="amt">${money(it.v)}</span><div class="track"><div class="fill" style="width:${(it.v/max*100).toFixed(1)}%"></div></div></div>`).join("")}</div>
   <button class="linkbtn" id="to26" style="font-size:13.5px">All ${items.length} lines, with heads and mandates, in the scorecard's 2026 plan ↓</button>
   <div class="src">Capital spending ($160.1M in 2026) is separate.</div>${srcK("fp")}`;
}
function initials(n){ const w=n.replace(/\(.*?\)/g,"").trim().split(/\s+/); return (w[0][0]+(w.length>1?w[w.length-1][0]:"")).toUpperCase(); }
function personHead(kicker,name,partyKey,riding,tag=""){
  const p=PARTY[partyKey];
  return `<div class="who"><div class="ava" style="--pc:${p.color}" aria-hidden="true">${initials(name)}</div><div class="who-t"><div class="kicker">${kicker}</div><h2>${name}${tag}</h2>
    <div class="party"><i style="background:${p.color}"></i><span>${p.name}${riding?" · "+riding:""}</span></div></div></div>`;
}
function partySrc(partyKey,riding){
  const p=PARTY[partyKey]; const bits=[]; const rs=ds&&ds.id==="ontario"?ON_S.mpp:RIDING_SRC; if(p.src) bits.push(`<a href="${p.src[1]}" target="_blank" rel="noopener">${p.src[0]}</a>`); if(riding&&rs!==p.src) bits.push(`<a href="${rs[1]}" target="_blank" rel="noopener">${rs[0]}</a>`);
  return bits.length?`<span class="src">Party${riding?" and riding":""}: ${bits.join(" · ")}</span>`:"";
}
function render(key){
  let h="", accent="var(--brass)";
  const sat=ds.sats.find(x=>x.key===key);
  if(key==="hub"){
    const heads=ds.outer.flatMap(o=>o.heads); const ver=heads.filter(x=>x.status==="A").length;
    const hr=ds.id==="federal"?RIDING.carney:(ds.hub.riding||null); h=personHead("At the helm",ds.hub.name,ds.party,hr)+`<div class="lede">${ds.hub.title}.</div>`+partySrc(ds.party,hr);
    if(ds.id==="mississauga"){
      h+=`<div class="statgrid"><div class="stat"><b>11</b><span>Ward councillors</span></div><div class="stat"><b>5</b><span>Commissioners</span></div><div class="stat"><b>2</b><span>New to Council</span></div></div>
        <div class="note">Certified October 28, 2026. The new term begins November 15, 2026. Carolyn Parrish is mayor until then.</div><button class="chipbtn" onclick="show('misscore');window.scrollTo(0,0)">Council Scorecard 2024–2026 →</button>
        <h3>Council, 2026 to 2030</h3><ul class="list">${ds.inner.filter(n=>n.role==="mis_council").map(n=>`<li class="item">${go(n.id,n.name)}<span class="rl">${n.riding}${n.isNew?'<span class="newtag">NEW</span>':""}</span></li>`).join("")}</ul>
        <h3>Administration</h3><ul class="list"><li class="item">${go("cm","Geoff Wright")}<span class="rl">City Manager and Chief Administrative Officer</span></li></ul>
        ${roleBox(ds.hub.role)}${srcK("res")}`;
    } else if(ds.id==="victoria"){
      h+=`<div class="statgrid"><div class="stat"><b>8</b><span>Councillors</span></div><div class="stat"><b>${ds.outer.filter(o=>o.kind!=="advisory").length}</b><span>Departments & services</span></div><div class="stat"><b>${money(VIC_TOTAL)}</b><span>2026 operating</span></div></div>
        <div class="note">Elected Oct 17, 2026 (preliminary results). The new Council's four-year term begins at its inauguration on Nov 5, 2026.</div>
        <h3>Council</h3><ul class="list">${ds.inner.filter(n=>n.role==="vic_council").map(n=>`<li class="item">${go(n.id,n.name)}<span class="rl">Councillor${n.isNew?'<span class="newtag">NEW</span>':""}</span></li>`).join("")}</ul>
        <button class="scorelink" id="toscore">Council Scorecard 2024–2026 ↓</button>
        ${roleBox(ds.hub.role)}${srcK("elec")}
        <div style="--accent:var(--s-infra)">${budgetBars()}</div>`;
    } else {
      h+=`<div class="statgrid"><div class="stat"><b>${ds.inner.length}</b><span>Ministers</span></div><div class="stat"><b>${ds.outer.length}</b><span>${ds.id==="bc"?"Ministries":"Departments"}</span></div><div class="stat"><b>${ver}</b><span>Heads verified</span></div></div>
        ${roleBox(ds.hub.role, ds.id==="bc"?[["Deputy Premier","Niki Sharma"]]:[])}
        <h3>Reporting directly</h3><ul class="list">${ds.sats.map(s=>`<li class="item">${go(s.key,s.person?s.title.split(",")[0]:s.label)}<span class="rl">${s.person||s.sub}</span></li>`).join("")}${ds.hubLinks.map(o=>`<li class="item">${go("o_"+o,O[o].name)}<span class="rl">The ${ds.hub.kicker.toLowerCase()}'s own office</span></li>`).join("")}</ul>
        <div>${pill("A")} ${srcK(ds.hub.src)}</div>
        <div class="note">Click a ${ds.innerNoun.toLowerCase()} or ${ds.outerNoun.toLowerCase()} to spin it to the top of the wheel.</div>`;
    }
  } else if(sat){
    h=sat.person?personHead(sat.sub,sat.person,"ps"):`<div><div class="kicker">${sat.sub}</div><h2>${sat.label}</h2></div>`;
    if(sat.person) h+=`<div class="lede">${sat.title}</div><div>${pill(sat.status)} ${srcK(sat.src)}</div>`;
    if(sat.text) h+=`<div class="lede">${sat.text}</div>${srcK(sat.src)}`;
    if(sat.list) h+=`<ul class="list">${sat.list.map(x=>`<li class="item"><span class="nm">${x[0]}</span><span class="rl">${x[1]}</span></li>`).join("")}</ul>${srcK(sat.src)}`;
    h+=roleBox(sat.role,[["Answers to",go("hub",ds.hub.name)]]);
    if(sat.ps) h+=`<div class="note">Turn on <b>Public service line</b> to trace this role's link to every deputy head.</div>`;
  } else if(key.startsWith("o_")){
    const o=O[key.slice(2)]; accent=C(o.sector);
    const secL=ds.sectors.find(s=>s.id===o.sector).label;
    const ps=(parents[o.id]||[]).map(p=>go(p,I[p].name)).concat(ds.hubLinks.includes(o.id)?[go("hub",ds.hub.name)]:[]);
    h=`<div><div class="kicker"><span class="sector">${secL}</span><span>· ${o.kind==="advisory"?"Board / committee":ds.outerNoun}</span></div><h2>${o.name}</h2></div>`;
    if(o.desc) h+=`<div class="lede">${o.desc}</div>`;
    if(o.budget) h+=`<div class="statgrid" style="grid-template-columns:minmax(0,1fr)"><div class="stat"><b>${moneyFull(o.budget)}</b><span>2026 operating budget</span></div></div>`+
      (o.lines?`<div class="bars">${o.lines.map(l=>`<div class="bar"><span>${l[0]}</span><span class="amt">${money(l[1])}</span><div class="track"><div class="fill" style="width:${(l[1]/o.budget*100).toFixed(1)}%"></div></div></div>`).join("")}</div>`:"")+srcK("fp");
    if(o.kind!=="advisory"){
      h+=`<h3>${o.heads.length>1?"Leadership":"Head"}</h3>`;
      h+= o.heads.length? `<ul class="list">${o.heads.map(x=>`<li class="item"><span class="nm">${x.name}</span><span class="rl">${x.role}</span>${pill(x.status)}${srcK(x.src)}${x.also?`<span class="src">${x.also}</span>`:""}</li>`).join("")}</ul>`
        : `<div class="note">Not covered by the sources used here.</div>`;
    }
    if(o.note) h+=`<div class="note">${o.note}</div>`;
    const rk=ds.id==="mississauga"&&!o.heads.length?"mis_head":ds.id==="mississauga"?"mis_comm":o.id==="vicpd"?"vic_police":o.kind==="advisory"?"vic_adv":ds.outerRole;
    h+=roleBox(rk,[[ "Answers to", ps.join(", ")||"—" ]]);
    if(o.kind==="advisory") h+=srcK(o.src);
  } else {
    const n=I[key]; accent=C(secOf[key]);
    const secL=ds.sectors.find(s=>s.id===secOf[key]).label;
    const kick=`<span class="sector">${secL}</span><span>· ${n.role==="vic_council"?"Councillor":n.role==="mis_council"?"Councillor-elect · "+n.riding:n.role==="vic_cm"||n.role==="mis_cm"||n.role==="mis_comm"?"Public servant":ds.innerNoun}</span>`;
    const isPerson=["fed_min","bc_min","vic_council","vic_cm","on_min","mis_council","mis_cm","mis_comm"].includes(n.role);
    const pk=["vic_cm","mis_cm","mis_comm"].includes(n.role)?"ps":ds.party, rd=ds.id==="federal"?RIDING[n.id]:ds.id==="mississauga"?null:(n.riding||null);
    h=(isPerson?personHead(kick,n.name,pk,rd,n.isNew?'<span class="newtag">NEW</span>':""):`<div><div class="kicker">${kick}</div><h2>${n.name}</h2></div>`)+`<div class="lede">${n.title}</div>`+(isPerson&&pk!=="ps"?partySrc(pk,rd):"");
    if(n.budget) h+=`<div class="statgrid" style="grid-template-columns:minmax(0,1fr)"><div class="stat"><b>${moneyFull(n.budget)}</b><span>2026 operating budget (${n.budgetLabel||n.short||"office"})</span></div></div>${srcK("fp")}`;
    if(n.links.length) h+=`<h3>${["vic_cm","vic_pboard","vic_lboard","mis_cm","mis_comm"].includes(n.role)?"Oversees":n.role==="vic_cow"?"Connected bodies":"Responsible for"}</h3>
      <ul class="list">${n.links.map(o=>`<li class="item">${go("o_"+o,O[o].name)}<span class="rl">${O[o].heads[0]?O[o].heads[0].name+" · "+O[o].heads[0].role:O[o].budget?money(O[o].budget)+" in 2026":"Advisory body"}</span></li>`).join("")}</ul>`;
    if(n.note) h+=`<div class="note">${n.note}</div>`;
    h+=roleBox(n.role,[["Answers to",n.role==="vic_council"?"Victoria voters":n.role==="mis_council"?n.riding+" voters":n.role==="mis_comm"?go("cm","City Manager"):n.role==="mis_cm"?"City Council":go("hub",ds.hub.name)]]);
    if(n.status) h+=`<div>${pill(n.status)} ${srcK(n.src)}</div>`; else if(n.src) h+=`<div>${pill("A")} ${srcK(n.src)}</div>`;
  }
  const rel=NEWS.filter(n=>n.ents.some(x=>x[0]===ds.id&&x[1]===key));
  if(rel.length) h+=`<h3>In the news</h3><ul class="list">${rel.map(n=>`<li class="item"><span class="nm" style="font-size:14px">${n.title}</span><span class="rl">${fmtDate(n.date)} · <a href="${n.src[1]}" target="_blank" rel="noopener" style="color:inherit">${n.src[0]} ↗</a></span></li>`).join("")}</ul>`;
  if(ds.id==="ontario"&&(key==="hub"||I[key])){ const ola=key==="hub"?"Doug Ford":(ON_MIN.find(x=>x.id===key)||{}).ola; const cm=CH.ontario.members.find(x=>x.name===ola);
    if(cm) h+=`<div class="where"><div class="kicker">Where they sit at Queen's Park</div><div><b>${cm.side==="gov"?"Government side":"Opposition side"}</b> · row ${cm.row} from the aisle · desk ${cm.desk} from the Speaker <span class="muted">(from the Assembly's seating plan)</span></div><div class="muted">Riding: ${cm.place}</div><button class="chipbtn" id="toseat">Show on the Ontario power map →</button></div>`; }
  panel.style.setProperty("--accent",accent); panel.innerHTML=h;
  { const ts=document.getElementById("toscore"); if(ts) ts.onclick=()=>{ const v=document.getElementById("vicscore"); if(v) v.scrollIntoView({behavior:"smooth",block:"start"}); }; }
  { const t6=document.getElementById("to26"); if(t6) t6.onclick=()=>{ const v=document.getElementById("vicscore"); if(v){ if(v._pick) v._pick("y26"); v.scrollIntoView({behavior:"smooth",block:"start"}); } }; }
  const ts=document.getElementById("toseat"); if(ts) ts.onclick=()=>show("ontario",{focusKey:key});
  panel.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>select(b.dataset.go));
}

/* ---------- selection ---------- */
function select(key,{spin=true}={}){
  current=key; paint(key); render(key); if(!spin) return;
  if(key.startsWith("o_")) rotateTo(-Math.PI/2-O[key.slice(2)].a); else if(I[key]) rotateTo(-Math.PI/2-I[key].a);
}
psBtn.onclick=()=>{ psBtn.setAttribute("aria-pressed",psOn()?"false":"true"); paint(current); };
sizeBtn.onclick=()=>{ sizeBtn.setAttribute("aria-pressed",sizeBtn.getAttribute("aria-pressed")==="true"?"false":"true"); sizeNodes(); layout(); };
document.getElementById("home").onclick=()=>{ select("hub",{spin:false}); rotateTo(0); };

/* ---------- tooltip ---------- */
function showTip(e,x){
  let t="",s=""; const sat=ds.sats.find(q=>q.key===x.key);
  if(x.key==="hub"){t=ds.hub.name;s=ds.hub.title;}
  else if(sat){t=sat.person||sat.label;s=sat.person?sat.title:sat.sub;}
  else if(x.key.startsWith("o_")){const o=O[x.key.slice(2)];t=o.name;s=o.heads[0]?o.heads[0].name+" · "+o.heads[0].role:(o.budget?money(o.budget)+" · 2026 budget":"Board / committee");}
  else {t=I[x.key].name;s=I[x.key].title;}
  tip.innerHTML=`<b>${t}</b><span>${s}</span>`; tip.hidden=false;
  const r=stage.getBoundingClientRect(); let lx=e.clientX-r.left+14; if(lx>r.width-270) lx=e.clientX-r.left-270;
  tip.style.left=lx+"px"; tip.style.top=(e.clientY-r.top+14)+"px";
}

/* ---------- legend ---------- */
function legend(){
  const leg=document.getElementById("legend"); leg.innerHTML="";
  ds.sectors.forEach(s=>{ const b=document.createElement("button"); b.style.color=C(s.id); b.innerHTML=`<i style="background:${C(s.id)}"></i><span style="color:var(--ink)">${s.label}</span>`;
    b.onclick=()=>select(s.ids[Math.floor((s.ids.length-1)/2)]); leg.appendChild(b); });
  const n=document.createElement("span"); n.className="legendnote"; n.textContent="Colours group portfolios by theme, not by political party."; leg.appendChild(n);
}

/* ---------- tabs ---------- */
const tabs=[...document.querySelectorAll(".tabs button[data-tab]")];
const newsEl=document.getElementById("news"), bannerEl=document.getElementById("banner");
const wheelEls=[document.querySelector(".toolbar"),document.getElementById("legend"),document.querySelector(".main")];
const chEls={senate:document.getElementById("ch-senate"),ontario:document.getElementById("ch-ontario"),bcleg:document.getElementById("ch-bcleg"),skleg:document.getElementById("ch-skleg"),mbleg:document.getElementById("ch-mbleg"),nbleg:document.getElementById("ch-nbleg"),peleg:document.getElementById("ch-peleg"),ableg:document.getElementById("ch-ableg"),ykleg:document.getElementById("ch-ykleg"),nlleg:document.getElementById("ch-nlleg"),nsleg:document.getElementById("ch-nsleg"),ntleg:document.getElementById("ch-ntleg"),nuleg:document.getElementById("ch-nuleg"),victoria:document.getElementById("ch-victoria"),vicscore:document.getElementById("ch-vicscore"),misscore:document.getElementById("ch-misscore")};
const CH_META={misscore:["Snapshot · Nov 1 2026","City of Mississauga, ON · Council Scorecard 2024–2026","What the City planned, budgeted and reported: 2024 and 2025 audited results and the 2026 budget."],vicscore:["Snapshot · Nov 1 2026","City of Victoria, BC · Council Scorecard 2024–2026","What the City planned, budgeted and reported, and when: 2024 and 2025 results and the 2026 plan."],
  victoria:["Snapshot · Nov 1 2026","City of Victoria, BC · Council 2026–2030","The Mayor and eight councillors elected October 17, 2026, the City Manager, and every department with its 2026 budget."],
  senate:["Snapshot · Nov 1 2026","Parliament of Canada · Senate","All 105 Senate seats by parliamentary group, with every senator, their province and when they retire."],
  bcleg:["Snapshot · Nov 1 2026","Legislative Assembly of British Columbia · In transition","All 93 members-elect from the October 24, 2026 election, with the caretaker Cabinet and every ministry."],
  ntleg:["Snapshot · Nov 1 2026","Legislative Assembly of the Northwest Territories · 20th Assembly","All 19 seats in Yellowknife: a consensus government with no political parties."],
  nuleg:["Snapshot · Nov 1 2026","Legislative Assembly of Nunavut · 7th Assembly","All 22 seats in Iqaluit: a consensus government with no political parties."],
  nsleg:["Snapshot · Nov 1 2026","Nova Scotia House of Assembly · 65th General Assembly","All 56 seats in Halifax, with every MLA, the Cabinet and every department."],
  nlleg:["Snapshot · Nov 1 2026","House of Assembly of Newfoundland and Labrador · 51st General Assembly","All 40 seats in St. John's, with every MHA, the Cabinet and every portfolio. Seats are grouped by party."],
  ykleg:["Snapshot · Nov 1 2026","Yukon Legislative Assembly · 36th Legislative Assembly","All 21 seats in Whitehorse, with every MLA, the Cabinet and every department."],
  ableg:["Snapshot · Nov 1 2026","Legislative Assembly of Alberta · 31st Legislature","All 87 seats in Edmonton, with every MLA, the Cabinet and every ministry."],
  peleg:["Snapshot · Nov 1 2026","Legislative Assembly of Prince Edward Island · 67th General Assembly","All 27 seats in Charlottetown, with every MLA, the Cabinet and every department."],
  nbleg:["Snapshot · Nov 1 2026","Legislative Assembly of New Brunswick · 61st Legislature","All 49 seats in Fredericton, with every MLA, the Cabinet and every department."],
  mbleg:["Snapshot · Nov 1 2026","Legislative Assembly of Manitoba · 43rd Legislature","All 57 seats in Winnipeg, with every MLA, the Cabinet and every department."],
  skleg:["Snapshot · Nov 1 2026","Legislative Assembly of Saskatchewan · 30th Legislature","All 61 seats in Regina, with every MLA, the Cabinet and every ministry."],
  ontario:["Snapshot · Nov 1 2026","Legislative Assembly of Ontario · 44th Parliament","All 124 seats at Queen's Park, with every MPP, riding and party."]};
function show(id,{focusKey}={}){
  const homeE=document.getElementById("landing"); if(homeE) homeE.hidden=id!=="home";
  if(id==="home"){ tabs.forEach(b=>b.setAttribute("aria-selected",b.dataset.tab==="home"?"true":"false")); Object.values(chEls).forEach(el=>el.hidden=true);
    wheelHome(); wheelEls.forEach(el=>el.hidden=true); bannerEl.hidden=true; newsEl.hidden=true; commonsEl.hidden=true; const wf0=document.getElementById("wheelfoot"); if(wf0) wf0.hidden=true; renderHome();
    document.getElementById("tagline").textContent="Who sits where and who runs what, across Canada's governments."; document.getElementById("stamp").textContent="Snapshot · Nov 1 2026"; document.getElementById("scope").textContent="Federal · Provinces · Cities";
    try{ if(location.hash!=="#home") history.replaceState(null,"","#home"); }catch(e){} window.scrollTo(0,0); return; }
  const wf=document.getElementById("wheelfoot"); if(wf) wf.hidden=!!(chEls[id]||id==="commons"||id==="news");
  Object.values(chEls).forEach(el=>el.hidden=true);
  if(chEls[id]){ tabs.forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===id?"true":"false"));
    wheelHome(); wheelEls.forEach(el=>el.hidden=true); bannerEl.hidden=true; newsEl.hidden=true; commonsEl.hidden=true; chEls[id].hidden=false; renderChamber(id);
    if(id==="ontario") pmFocus(focusKey); if(id==="bcleg") bmFocus(focusKey); if(id==="skleg") smFocus(focusKey); if(PV_CFG[id]) pvFocus(PV_CFG[id],focusKey);
    const [stamp,scope,tag]=CH_META[id]; document.getElementById("stamp").textContent=stamp; document.getElementById("scope").textContent=scope; document.getElementById("tagline").textContent=tag;
    try{ if(location.hash!=="#"+id) history.replaceState(null,"","#"+id); }catch(e){} return; }
  if(id==="commons"){ tabs.forEach(b=>b.setAttribute("aria-selected",b.dataset.tab==="commons"?"true":"false"));
    wheelHome(); wheelEls.forEach(el=>el.hidden=true); bannerEl.hidden=true; newsEl.hidden=true; commonsEl.hidden=false; renderCommons();
    document.getElementById("tagline").textContent="All 343 seats in the House of Commons, laid out like the chamber, with every MP, riding and party.";
    document.getElementById("stamp").textContent="Snapshot · Nov 1 2026"; document.getElementById("scope").textContent="Parliament of Canada · 45th Parliament";
    try{ if(location.hash!=="#commons") history.replaceState(null,"","#commons"); }catch(e){} return; }
  commonsEl.hidden=true;
  if(id==="news"){ tabs.forEach(b=>b.setAttribute("aria-selected",b.dataset.tab==="news"?"true":"false"));
    wheelHome(); wheelEls.forEach(el=>el.hidden=true); bannerEl.hidden=true; newsEl.hidden=false; renderNews();
    document.getElementById("tagline").textContent="Federal news centred on Prime Minister Carney, linked to the ministers and departments on the federal wheel.";
    document.getElementById("stamp").textContent="News · Snapshot Nov 1 2026"; document.getElementById("scope").textContent="Federal";
    try{ if(location.hash!=="#news") history.replaceState(null,"","#news"); }catch(e){} window.scrollTo(0,0); return; }
  wheelHome(); wheelEls.forEach(el=>el.hidden=false); newsEl.hidden=true;
  if(id!=="onwheel"&&(!DS[id]||id==="ontario")) id="federal";
  const wid=id==="onwheel"?"ontario":id;
  if(wid==="ontario") onEnsureLayout();
  tabs.forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===id?"true":"false"));
  document.getElementById("tagline").textContent=DS[wid].tagline;
  document.getElementById("stamp").textContent=DS[wid].stamp;
  document.getElementById("scope").textContent={federal:"Government of Canada",bc:"Government of British Columbia",victoria:"City of Victoria, BC",mississauga:"City of Mississauga, ON",ontario:"Government of Ontario · Executive Council"}[wid];
  mountWheel(wid,focusKey);
  try{ if(location.hash!=="#"+id) history.replaceState(null,"","#"+id); }catch(e){}
}
function mountWheel(id,focusKey){
  ds=DS[id]; prep(ds);
  psBtn.setAttribute("aria-pressed","false");
  svg.call(zoom.transform,d3.zoomIdentity);
  if(ds.banner){ bannerEl.innerHTML=`<p>${ds.banner.text}</p><div class="src">Sources: ${ds.banner.srcs.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join(" · ")}</div>`; bannerEl.hidden=false; } else bannerEl.hidden=true;
  build(); legend();
  { const vs=document.getElementById("vicscore"); if(vs){ vs.hidden=id!=="victoria"; if(id==="victoria") renderVicScore(); } }
  rot=-0.9; layout(); select("hub",{spin:false});
  if(focusKey) select(focusKey); else rotateTo(0,1400);
}
// The wheel's DOM can be borrowed by the Ontario tab and returned afterwards
const wheelHomeAnchor=document.createComment("wheel-home"); document.querySelector(".toolbar").before(wheelHomeAnchor);
function wheelHome(){ wheelEls.forEach(el=>wheelHomeAnchor.parentNode.insertBefore(el,wheelHomeAnchor)); wheelHomeAnchor.parentNode.insertBefore(wheelHomeAnchor,wheelEls[0]); document.body.classList.remove("wheel-in-ontario"); }
function wheelToOntario(focusKey){
  const slot=document.getElementById("ontario-wheelslot"); if(!slot) return;
  wheelEls.forEach(el=>{ slot.appendChild(el); el.hidden=false; }); document.body.classList.add("wheel-in-ontario");
  const k=focusKey&&focusKey.startsWith("ch:")?null:focusKey;
  if(!ds||ds.id!=="ontario"||k) mountWheel("ontario",k);
}
tabs.forEach(b=>b.onclick=()=>{ document.querySelectorAll(".dd.open").forEach(d=>{ d.classList.remove("open"); d.querySelector(".ddbtn").setAttribute("aria-expanded","false"); }); show(b.dataset.tab); });
document.querySelectorAll(".dd").forEach(dd=>{ const btn=dd.querySelector(".ddbtn");
  const set=o=>{ document.querySelectorAll(".dd.open").forEach(x=>{ if(x!==dd){ x.classList.remove("open"); x.querySelector(".ddbtn").setAttribute("aria-expanded","false"); } }); dd.classList.toggle("open",o); btn.setAttribute("aria-expanded",o?"true":"false"); };
  btn.onclick=e=>{ e.stopPropagation(); set(!dd.classList.contains("open")); if(dd.classList.contains("open")){ const f=dd.querySelector(".ddmenu button"); if(f&&e.detail===0) f.focus(); } };
  dd.addEventListener("keydown",e=>{ if(e.key==="Escape"){ set(false); btn.focus(); } }); });
{ const br=document.querySelector(".brand"); if(br){ br.style.cursor="pointer"; br.setAttribute("title","Home"); br.addEventListener("click",()=>show("home")); } }
document.addEventListener("click",e=>{ if(!e.target.closest(".dd")&&!e.target.closest(".pvportal")) document.querySelectorAll(".dd.open").forEach(d=>{ d.classList.remove("open"); d.querySelector(".ddbtn").setAttribute("aria-expanded","false"); }); });
window.addEventListener("hashchange",()=>{ const id=location.hash.slice(1); if(id==="home"||id==="onwheel"||id==="bcleg"||id==="skleg"||chEls[id]||id==="news"||id==="commons"||id==="senate"||id==="ontario"||(DS[id]&&(!ds||ds.id!==id))) show(id); });

/* ---------- search across all tabs ---------- */
const index=[];
(function(){
  const add=(tab,key,label,sub)=>index.push({tab,key,label,sub});
  Object.values(DS).forEach(d=>{
    add(d.id,"hub",d.hub.name,d.hub.title);
    d.inner.forEach(n=>add(d.id,n.id,n.name,n.title));
    d.outer.forEach(o=>{ add(d.id,"o_"+o.id,o.name,o.abbr); o.heads.forEach(x=>{ if(x.status!=="U") add(d.id,"o_"+o.id,x.name,x.role+" · "+o.name); }); });
    d.sats.forEach(s=>{ add(d.id,s.key,s.person||s.label,s.title||s.sub); (s.list||[]).forEach(x=>add(d.id,s.key,x[0],x[1])); });
  });
})();
const TABNAME={federal:"Federal",bc:"BC",victoria:"Victoria",mississauga:"Mississauga",ontario:"Ontario"};
const q=document.getElementById("q"), res=document.getElementById("results");
q.addEventListener("input",()=>{
  const t=q.value.trim().toLowerCase(); if(!t){res.hidden=true;return}
  const hits=index.filter(i=>(i.label+" "+i.sub).toLowerCase().includes(t)).slice(0,14);
  res.innerHTML=hits.length?hits.map((h,i)=>`<li><button data-i="${i}">${h.label}<small>${TABNAME[h.tab]} · ${h.sub}</small></button></li>`).join(""):`<li style="padding:7px 10px;color:var(--muted)">No match</li>`;
  res.hidden=false;
  res.querySelectorAll("button").forEach(b=>b.onclick=()=>{ const h=hits[+b.dataset.i]; res.hidden=true; q.value="";
    const onWheelPage=!wheelEls[2].hidden; if(!ds||h.tab!==ds.id||!onWheelPage) show(h.tab==="ontario"&&onWheelPage&&ds&&ds.id==="ontario"?"onwheel":h.tab,{focusKey:h.key}); else select(h.key); });
});
q.addEventListener("keydown",e=>{ if(e.key==="Escape") res.hidden=true; if(e.key==="Enter"){ e.preventDefault(); const b=res.querySelector("button"); if(b) b.click(); } });
document.addEventListener("click",e=>{ if(!e.target.closest(".search")) res.hidden=true; });

/* ---------- news page ---------- */
const fmtDate=d=>new Date(d+"T12:00:00").toLocaleDateString("en-CA",{month:"short",day:"numeric",year:"numeric"});
const levelTab={Federal:"federal",BC:"bc",Victoria:"victoria",Mississauga:"mississauga"};
function entLabel([tab,key]){ const d=DS[tab]; if(key==="hub") return d.hub.name; if(key.startsWith("o_")){ const o=d.outer.find(x=>x.id===key.slice(2)); return o?o.name:key; } const n=d.inner.find(x=>x.id===key); return n?n.name:key; }
function entParty([tab,key]){ const d=DS[tab]; if(key.startsWith("o_")) return null; const n=d.inner.find(x=>x.id===key); if(key!=="hub"&&(!n||!["fed_min","bc_min","vic_council","mis_council"].includes(n.role))) return null; return d.party; }
const chip=e=>{ const p=entParty(e); return `<button class="echip" data-tab="${e[0]}" data-key="${e[1]}">${p?`<i style="background:${PARTY[p].color}"></i>`:'<i class="sq"></i>'}${entLabel(e)}</button>`; };
function renderNews(){
  const people=[]; const seen=new Set();
  NEWS.forEach(n=>{ n.ents.forEach(e=>{ const p=entParty(e); const k=e.join(":"); if(p&&!seen.has(k)){seen.add(k);people.push({e,name:entLabel(e),party:p});} }); (n.people||[]).forEach(([nm,p])=>{ if(!seen.has(nm)){seen.add(nm);people.push({name:nm,party:p});} }); });
  const unnamed=DS.federal.outer.flatMap(o=>o.heads).filter(h=>h.status==="U").length;
  const mins=people.filter(p=>p.e&&p.e[1]!=="hub").length, carneyN=NEWS.filter(n=>n.ents.some(e=>e[0]==="federal"&&e[1]==="hub")).length;
  const last=CHANGES[0].date, days=Math.round((new Date("2026-11-01")-new Date(last))/864e5);
  newsEl.innerHTML=`
   <section class="nsec"><h2 class="nh">Prime Minister Carney and the federal government</h2>
    <ol class="nlist">${NEWS.map(n=>`<li class="nitem"><div class="nmeta"><span class="lvl lvl-federal">${n.tag||n.level}</span><time datetime="${n.date}">${fmtDate(n.date)}</time></div>
      <h3>${n.title}</h3><p>${n.text}</p>
      <div class="chips">${n.ents.map(chip).join("")}${(n.people||[]).map(([nm,p])=>`<span class="echip static"><i style="background:${PARTY[p].color}"></i>${nm}</span>`).join("")}</div>
      <a class="nsrc" href="${n.src[1]}" target="_blank" rel="noopener">${n.src[0]} ↗</a></li>`).join("")}</ol></section>
   <aside class="nside">
    <section class="nsec"><h2 class="nh">Who's in the news</h2>
     <div class="faces">${people.map(p=>`<${p.e?"button":"span"} class="face" ${p.e?`data-tab="${p.e[0]}" data-key="${p.e[1]}"`:""}><span class="ava sm" style="--pc:${PARTY[p.party].color}">${initials(p.name)}</span><span>${p.name}</span></${p.e?"button":"span"}>`).join("")}</div>
     <div class="src">Outline colour shows the person's party. Grey means no party label.</div></section>
    <section class="nsec"><h2 class="nh">Federal leadership changes</h2>
     <div class="kpis"><div class="stat"><b>${carneyN}</b><span>Stories involving the Prime Minister</span></div><div class="stat"><b>${mins}</b><span>Ministers in the news</span></div><div class="stat"><b>${days}</b><span>Days since last senior change</span></div><div class="stat"><b>${DS.federal.inner.filter(n=>n.role==="fed_min").length}</b><span>Ministers in Cabinet</span></div></div>
     <ol class="clist">${CHANGES.map(c=>`<li class="citem"><div class="nmeta"><span class="lvl lvl-${levelTab[c.level]}">${c.level}</span><time datetime="${c.date}">${fmtDate(c.date)}</time></div>
       <button class="cseat" data-tab="${c.ent[0]}" data-key="${c.ent[1]}">${c.seat}</button>
       ${c.out?`<div class="cflow"><span class="cout">Out</span>${c.out}</div>`:""}<div class="cflow"><span class="cin">In</span>${c.in}</div>
       ${c.pending?`<div class="cpend">${c.pending}</div>`:""}<a class="nsrc" href="${c.src[1]}" target="_blank" rel="noopener">${c.src[0]} ↗</a></li>`).join("")}</ol></section>
   </aside>`;
  newsEl.querySelectorAll("[data-tab][data-key]").forEach(b=>b.onclick=()=>show(b.dataset.tab,{focusKey:b.dataset.key}));
}

/* ---------- start ---------- */
show((location.hash||"").slice(1)||"home");

/* ---------- masthead: page name + date under the wordmark, flag on the right, page description in the page ---------- */
const HFLAG={home:["CA","Canada"],commons:["CA","Canada"],senate:["CA","Canada"],federal:["CA","Canada"],news:["CA","Canada"],
  ontario:["ON","Ontario"],onwheel:["ON","Ontario"],mississauga:["ON","Ontario"],misscore:["ON","Ontario"],bcleg:["BC","British Columbia"],bc:["BC","British Columbia"],victoria:["BC","British Columbia"],vicscore:["BC","British Columbia"],
  skleg:["SK","Saskatchewan"],ableg:["AB","Alberta"],ykleg:["YT","Yukon"],nlleg:["NL","Newfoundland and Labrador"],nsleg:["NS","Nova Scotia"],ntleg:["NT","Northwest Territories"],nuleg:["NU","Nunavut"],mbleg:["MB","Manitoba"],nbleg:["NB","New Brunswick"],peleg:["PE","Prince Edward Island"]};
function syncHead(id){
  const st=document.getElementById("stamp").textContent, sc=document.getElementById("scope").textContent, tg=document.getElementById("tagline").textContent;
  const m=st.match(/([A-Z][a-z]{2}) (\d{1,2}) (\d{4})/), date=m?`${m[1]} ${m[2]}, ${m[3]}`:"";
  document.getElementById("headline").textContent=[id==="home"?"Federal · Provinces · Cities":sc,date].filter(Boolean).join(" · ");
  const f=HFLAG[id], fe=document.getElementById("hflag");
  if(f&&typeof PROV_FLAGS!=="undefined"&&PROV_FLAGS[f[0]]){ document.getElementById("hflag-img").src=PROV_FLAGS[f[0]]; document.getElementById("hflag-img").alt="Flag of "+f[1]; document.getElementById("hflag-cap").textContent=f[1]; fe.hidden=false; } else fe.hidden=true;
  const pl=document.getElementById("pagelede"), inPage=!!(chEls[id]||id==="commons"||id==="home");
  pl.textContent=tg; pl.hidden=inPage||!tg;
}
{ const _show=show; show=function(id,opts){ const r=_show(id,opts); try{ syncHead(id); }catch(e){} return r; }; }
syncHead((location.hash||"").slice(1)||"home");
