/* ================= FEDERAL: WHO RUNS WHAT (House of Commons tab) ================= */
// Prime Minister → Cabinet → departments, with Secretaries of State and the Clerk. Ministers link to their seat in the seating plan above.
const FM={built:false,sel:null};
const FM_CAB={x:220,y:0,w:780,cols:3,rh:28,head:74};
const FM_DEP={x:220,w:780,cols:2,rh:26,head:74};
const FM_SOS={x:220,w:780,cols:2,rh:26,head:74};
const FM_PM=[96,190], FM_CLERK=[96,440], FM_GG=[96,44];
const FED_GG={name:"Louise Arbour",title:"Governor General of Canada",since:"June 8, 2026",src:["Wikipedia: Governor General of Canada","https://en.wikipedia.org/wiki/Governor_General_of_Canada"]};
const fmNorm=n=>n.replace("Julie Aviva Dabrusin","Julie Dabrusin");
function fmSeat(name){ return seats.find(s=>s.mp===fmNorm(name)); }

function fmData(){
  const pm=ministers.find(m=>m.pm), mins=ministers.filter(m=>!m.pm);
  const grid=(B,n,k)=>{ const per=Math.ceil(n/B.cols), cw=(B.w-24)/B.cols, c=Math.floor(k/per), r=k%per; return [B.x+24+c*cw, B.y+B.head+r*B.rh+B.rh/2]; };
  FM_CAB.h=FM_CAB.head+Math.ceil(mins.length/FM_CAB.cols)*FM_CAB.rh+12;
  mins.forEach((m,k)=>{ [m.x,m.y]=grid(FM_CAB,mins.length,k); m.k=k; m.seat=fmSeat(m.name); });
  pm.seat=fmSeat(pm.name);
  const ds=depts.map(d=>({...d,ms:ministers.filter(m=>m.depts.includes(d.id))}));
  ds.forEach(d=>{ const ks=d.ms.filter(m=>!m.pm).map(m=>m.k); d.t=ks.length?d3.mean(ks):-1; });
  ds.sort((a,b)=>a.t-b.t);
  FM_DEP.y=FM_CAB.y+FM_CAB.h+34; FM_DEP.h=FM_DEP.head+Math.ceil(ds.length/FM_DEP.cols)*FM_DEP.rh+12;
  ds.forEach((d,k)=>{ [d.x,d.y]=grid(FM_DEP,ds.length,k); let sn=({feddev:"FedDev Ontario (Southern Ontario)",fednor:"FedNor (Northern Ontario)"})[d.id]||d.name; d.short=sn; });
  const sos=secretaries.map(([name,area],k)=>({id:"sos"+k,name,area,seat:fmSeat(name)}));
  FM_SOS.y=FM_DEP.y+FM_DEP.h+34; FM_SOS.h=FM_SOS.head+Math.ceil(sos.length/FM_SOS.cols)*FM_SOS.rh+12;
  sos.forEach((s,k)=>{ [s.x,s.y]=grid(FM_SOS,sos.length,k); });
  const clerk=DS.federal.sats.find(x=>x.key==="clerk");
  return {pm,mins,ds,sos,clerk,H:FM_SOS.y+FM_SOS.h+10};
}

function fmBuild(){
  const D=FM.D=fmData();
  const svg=d3.select("#fm-svg").attr("viewBox",`0 -40 1010 ${D.H+50}`); svg.selectAll("*").remove();
  const defs=svg.append("defs");
  defs.append("marker").attr("id","fm-ar").attr("viewBox","0 0 10 10").attr("refX",8).attr("refY",5).attr("markerWidth",7).attr("markerHeight",7).attr("orient","auto-start-reverse")
    .append("path").attr("d","M0,0 L10,5 L0,10 z").attr("fill","var(--ink)");
  const g=svg.append("g");
  const card=(B,t1,t2,t3)=>{ g.append("rect").attr("x",B.x).attr("y",B.y).attr("width",B.w).attr("height",B.h).attr("rx",16).attr("class","pmcard");
    const t=g.append("text").attr("x",B.x+22).attr("y",B.y+36).attr("class","pmcardh"); t.append("tspan").text(t1); t.append("tspan").attr("class","pmcardn").text("  ·  "+t2);
    g.append("text").attr("x",B.x+22).attr("y",B.y+56).attr("class","pmcards").text(t3); };
  card(FM_CAB,"Cabinet",`${D.mins.length} ministers`,"All are elected Liberal MPs. Each answers to the House for their departments.");
  card(FM_DEP,"Departments and agencies",String(D.ds.length),"Each is run day to day by a deputy minister or president from the public service.");
  card(FM_SOS,"Secretaries of State",String(D.sos.length),"Not in Cabinet. Each helps ministers with one area of work.");
  const [px,py]=FM_PM, [cx,cy]=FM_CLERK;
  const fl=g.append("g").attr("class","flows");
  const arrow=d=>fl.append("path").attr("d",d).attr("class","flow f-app").attr("marker-end","url(#fm-ar)");
  const lbl=(x,y,t,anchor)=>fl.append("text").attr("x",x).attr("y",y).attr("text-anchor",anchor||"start").attr("class","flowlbl big").text(t);
  arrow(`M${px+90},${py} C${px+112},${py} ${FM_CAB.x-40},${py} ${FM_CAB.x-6},${py}`); lbl(px-60,py+76,"Chooses Cabinet","start");
  arrow(`M${FM_CAB.x+FM_CAB.w/2},${FM_CAB.y+FM_CAB.h+2} L${FM_CAB.x+FM_CAB.w/2},${FM_DEP.y-4}`); lbl(FM_CAB.x+FM_CAB.w/2+12,FM_DEP.y-12,"Ministers direct departments");
  g.append("line").attr("class","spoke").attr("x1",px).attr("y1",py+58).attr("x2",cx).attr("y2",cy-22);
  // hidden until chosen
  const spokes=g.append("g").selectAll("path").data(D.mins).join("path").attr("class","spoke ms").attr("d",m=>`M${px+90},${py} C${px+130},${py} ${m.x-110},${m.y} ${m.x-11},${m.y}`);
  const L=[]; ministers.forEach(m=>m.depts.forEach(id=>{ const d=D.ds.find(x=>x.id===id); if(d) L.push({m,d}); }));
  const links=g.append("g").selectAll("path").data(L).join("path").attr("class","mlink").attr("d",({m,d})=>m.pm
      ?`M${px+90},${py+10} C${FM_CAB.x-60},${py+40} ${FM_DEP.x-60},${d.y} ${d.x-9},${d.y}`
      :`M${m.x-11},${m.y} C${FM_CAB.x-40},${m.y} ${FM_DEP.x-40},${d.y} ${d.x-9},${d.y}`);
  const clerkLines=g.append("g").selectAll("path").data(D.ds).join("path").attr("class","psline").attr("d",d=>`M${cx+80},${cy} C${cx+150},${cy} ${d.x-90},${d.y} ${d.x-9},${d.y}`).attr("opacity",0);
  // Prime Minister
  const pr=g.append("g").attr("class","pmn premier").attr("transform",`translate(${px},${py})`).datum({type:"pm",key:"pm"});
  pr.append("rect").attr("x",-90).attr("y",-30).attr("width",180).attr("height",60).attr("rx",16).attr("class","prbox lib");
  pr.append("text").attr("y",7).attr("text-anchor","middle").attr("class","pminit").text("Prime Minister");
  g.append("text").attr("x",px).attr("y",py+52).attr("text-anchor","middle").attr("class","pmname").text(D.pm.name);
  // the Crown
  const [gx2,gy2]=FM_GG;
  g.append("path").attr("class","flow f-crown").attr("d",`M${gx2},${gy2+23} L${gx2},${py-34}`).attr("marker-end","url(#fm-ar)");
  g.append("text").attr("x",gx2+8).attr("y",(gy2+py)/2+2).attr("class","flowlbl").text("Appoints, on advice");
  const gg=g.append("g").attr("class","pmn crown").attr("transform",`translate(${gx2},${gy2})`).datum({type:"gg",key:"gg"});
  gg.append("rect").attr("x",-86).attr("y",-23).attr("width",172).attr("height",46).attr("rx",23).attr("class","crownbox");
  gg.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text("Governor General");
  gg.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text("THE CROWN");
  // Clerk
  const ck=g.append("g").attr("class","pmn sec").attr("transform",`translate(${cx},${cy})`).datum({type:"clerk",key:"clerk"});
  ck.append("rect").attr("x",-94).attr("y",-22).attr("width",188).attr("height",44).attr("rx",22).attr("class","secbox");
  ck.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text("Clerk of the Privy Council");
  ck.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text("PUBLIC SERVICE");
  // rows
  const row=(sel,B)=>sel.append("rect").attr("x",-14).attr("y",-B.rh/2+2).attr("width",(B.w-24)/B.cols-8).attr("height",B.rh-4).attr("rx",7).attr("class","rowhit");
  const mn=g.append("g").selectAll("g").data(D.mins).join("g").attr("class","pmn minister").attr("transform",m=>`translate(${m.x},${m.y})`).datum(m=>({type:"minister",key:m.id,m}));
  row(mn,FM_CAB); mn.append("circle").attr("r",9.5).attr("fill","var(--p-lib)").attr("stroke","#ffffff80");
  mn.append("circle").attr("r",3.2).attr("fill","#fff"); mn.append("text").attr("class","mlbl2").attr("x",17).attr("dy","0.35em").text(x=>x.m.name);
  const di=g.append("g").selectAll("g").data(D.ds).join("g").attr("class","pmn ministry").attr("transform",d=>`translate(${d.x},${d.y})`).datum(d=>({type:"dept",key:"d_"+d.id,d}));
  row(di,FM_DEP); di.append("rect").attr("x",-7).attr("y",-7).attr("width",14).attr("height",14).attr("rx",3.5).attr("class","mbox");
  di.append("text").attr("class","mnlbl").attr("x",17).attr("dy","0.35em").text(x=>x.d.short);
  const so=g.append("g").selectAll("g").data(D.sos).join("g").attr("class","pmn minister").attr("transform",s=>`translate(${s.x},${s.y})`).datum(s=>({type:"sos",key:s.id,s}));
  row(so,FM_SOS); so.append("circle").attr("r",7).attr("fill","none").attr("stroke","var(--p-lib)").attr("stroke-width",2.2);
  const st=so.append("text").attr("class","mlbl2").attr("x",17).attr("dy","0.35em"); st.append("tspan").text(x=>x.s.name); st.append("tspan").attr("class","sosarea").text(x=>{ const a=x.s.area, room=44-x.s.name.length; return "  "+(a.length>room?a.slice(0,a.lastIndexOf(" ",room-2))+"…":a); });
  // interaction
  g.selectAll(".pmn").attr("tabindex",0).attr("role","button")
    .attr("aria-label",d=>d.type==="gg"?`${FED_GG.name}, ${FED_GG.title}`:d.type==="minister"?`${d.m.name}, ${d.m.title}`:d.type==="dept"?d.d.name:d.type==="sos"?`${d.s.name}, Secretary of State (${d.s.area})`:d.type==="pm"?`${D.pm.name}, Prime Minister`:"Clerk of the Privy Council")
    .on("click",(e,d)=>fmSelect(d.key)).on("keydown",(e,d)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); fmSelect(d.key);} })
    .on("mouseenter",(e,d)=>fmHighlight(d.key)).on("mouseleave",()=>{ fmHighlight(FM.sel); FM.hov=null; });
  Object.assign(FM,{nodes:g.selectAll(".pmn"),spokes,links,clerkLines});
}
function fmRelated(key){ const D=FM.D, s=new Set([key]); if(!key) return null;
  if(key==="pm"){ D.mins.forEach(m=>s.add(m.id)); s.add("d_pco"); s.add("clerk"); return s; }
  if(key==="gg"){ s.add("pm"); D.mins.forEach(m=>s.add(m.id)); return s; }
  if(key==="clerk"){ D.ds.forEach(d=>s.add("d_"+d.id)); s.add("pm"); return s; }
  if(key.startsWith("d_")){ const d=D.ds.find(x=>"d_"+x.id===key); d.ms.forEach(m=>s.add(m.pm?"pm":m.id)); return s; }
  const m=D.mins.find(x=>x.id===key); if(m){ s.add("pm"); m.depts.forEach(id=>s.add("d_"+id)); } return s; }
function fmClear(){ hocHi=null; if(FM.D){ FM.sel=null; fmHighlight(null); } }
function fmHighlight(key){ const rel=fmRelated(key); FM.hov=key; drawLinks(key);
  FM.nodes.classed("dim",d=>rel?!rel.has(d.key):false).classed("on",d=>d.key===key);
  FM.links.classed("hot",({m,d})=>!!key&&(key===m.id||key==="d_"+d.id||(key==="pm"&&m.pm))).classed("dim",({m,d})=>rel?!(rel.has(m.pm?"pm":m.id)&&rel.has("d_"+d.id)):false);
  FM.spokes.classed("hot",m=>key==="pm"||key===m.id);
  FM.clerkLines.attr("opacity",key==="clerk"?.6:0);
}
function fmSeatsFor(key){ const D=FM.D; if(!key) return null;
  if(key==="pm") return [D.pm.seat]; const m=D.mins.find(x=>x.id===key); if(m) return [m.seat];
  const s=D.sos.find(x=>x.id===key); if(s) return [s.seat];
  if(key.startsWith("d_")) return D.ds.find(x=>"d_"+x.id===key).ms.map(m=>m.seat); return null; }
function fmPanel(key){
  const D=FM.D, el=document.getElementById("hpanel"); let h="";
  const head=(name,seat,kicker)=>`<div class="pband" style="--pc:var(--p-lib)"></div><div class="who"><div class="ava" style="--pc:var(--p-lib)" aria-hidden="true">${initials(name)}</div><div class="who-t"><div class="kicker">${kicker}</div><h2>${name}</h2><div class="party"><i style="background:var(--p-lib)"></i><span>Liberal Party of Canada${seat?" · "+seat.riding:""}</span></div></div></div>`;
  const seatBox=seat=>seat?`<div class="where"><div class="kicker">Seat in the House</div><div><b>${seat.side==="gov"?"Government side":"Opposition side"}</b>${seat.row?` · row ${seat.row} · desk ${seat.desk}`:""}</div></div>`:"";
  const deptLine=d=>`<li class="item"><button class="linkbtn" data-k="d_${d.id}">${d.name}</button><span class="rl">${d.heads.map(x=>x.name+" · "+x.role).join("<br>")}</span></li>`;
  if(!key){
    h=`<div class="kicker">Start here</div><h2>How the federal government is run</h2>
      <ol class="steps"><li><b>Voters</b> in each of the 343 ridings elect one MP.</li><li>The Governor General asks the leader who can hold the confidence of the House to form government. <b>Mark Carney</b> is Prime Minister.</li><li>The Prime Minister chooses <b>Cabinet</b>. The Governor General formally appoints the ministers on his advice.</li><li>Each minister is responsible for one or more <b>departments</b>. A deputy minister from the public service runs each one day to day. Ministers do not report the department's work to the Prime Minister alone: they answer to the House of Commons for it.</li></ol>
      <h3>Key roles in the House</h3><ul class="list">${HOC_ROLES.map(([r,n])=>{ const st=seats.find(x=>x.mp===n); return `<li class="item">${st?`<button class="linkbtn" data-i="${st.i}">${n}</button>`:`<span class="nm">${n}</span>`}<span class="rl">${r}</span></li>`; }).join("")}</ul>
      <div class="note">Click a minister to draw a line to their seat and light up their departments. Click any other seat to open that MP.</div>${srcA(S.cab)}${srcA(S.geds)}${srcA(P45_SRC)}`;
  } else if(key==="pm"){
    const pco=D.ds.find(d=>d.id==="pco");
    h=head(D.pm.name,D.pm.seat,"Prime Minister of Canada")+`<div class="lede">Leads the government and chooses Cabinet. The Privy Council Office is the Prime Minister's own department and supports Cabinet as a whole.</div>
      <h3>His own department</h3><ul class="list">${deptLine(pco)}</ul>${seatBox(D.pm.seat)}${srcA(S.cab)}`;
  } else if(key==="gg"){
    h=`<div class="kicker">The Crown · non-partisan</div><h2>${FED_GG.name}</h2><div class="lede">${FED_GG.title} since ${FED_GG.since}, representing the King in Canada.</div>
      <h3>What the role does</h3><ul class="list"><li class="item"><span class="nm">Asks a leader to form government</span><span class="rl">The leader who can hold the confidence of the House becomes Prime Minister.</span></li>
      <li class="item"><span class="nm">Appoints Cabinet</span><span class="rl">Ministers are appointed on the Prime Minister's advice.</span></li>
      <li class="item"><span class="nm">Gives Royal Assent</span><span class="rl">A bill passed by the House and the Senate becomes law once it receives Royal Assent.</span></li>
      <li class="item"><span class="nm">Appoints senators</span><span class="rl">On the Prime Minister's advice.</span></li></ul>
      <div class="note">By convention, the Governor General acts on the advice of the Prime Minister and Cabinet, so there is no party colour here.</div>${srcA(FED_GG.src)}`;
  } else if(key==="clerk"){
    h=`<div class="kicker">Public service</div><h2>${D.clerk.person}</h2><div class="lede">${D.clerk.title}. Head of the federal public service. Deputy ministers across government report to the Clerk on how their departments are run, and to their minister on policy.</div>
      <div class="note">Public servants are non-partisan, so there is no party colour here.</div>${srcA(S.pco)}`;
  } else if(key.startsWith("d_")){
    const d=D.ds.find(x=>"d_"+x.id===key);
    h=`<div class="kicker">Department · ${d.abbr}</div><h2>${d.name}</h2><h3>Responsible minister${d.ms.length>1?"s":""}</h3>
      <ul class="list">${d.ms.map(m=>`<li class="item"><button class="linkbtn" data-k="${m.pm?"pm":m.id}">${m.name}</button><span class="rl">${m.title}</span></li>`).join("")}</ul>
      <h3>Run day to day by (public service)</h3><ul class="list">${d.heads.map(x=>`<li class="item"><span class="nm">${x.name}</span><span class="rl">${x.role}</span>${pill(x.status)}${srcA(S[x.src])}</li>`).join("")}</ul>`;
  } else if(key.startsWith("sos")){
    const s=D.sos.find(x=>x.id===key);
    h=head(s.name,s.seat,"Secretary of State · MP")+`<div class="lede">Secretary of State (${s.area}). Secretaries of State are part of the Ministry but not members of Cabinet. Each helps ministers with one area of work.</div>${seatBox(s.seat)}${srcA(S.sos)}`;
  } else {
    const m=D.mins.find(x=>x.id===key);
    h=head(m.name,m.seat,"Cabinet minister · MP")+`<div class="lede">${m.title}</div>
      <h3>Responsible for</h3><ul class="list">${m.depts.map(id=>deptLine(D.ds.find(d=>d.id===id))).join("")}</ul>${m.note?`<div class="note">${m.note.replace(/couldn't/g,"could not")}</div>`:""}
      ${seatBox(m.seat)}<div class="role"><div class="kicker">Two jobs</div><p>As a minister, ${m.name.split(" ")[0]} is responsible for ${m.depts.length>1?"these departments":"this department"} and answers for ${m.depts.length>1?"them":"it"} in the House. As an MP, ${m.name.split(" ")[0]} still represents ${m.seat?m.seat.riding:"a riding"} and votes in the House.</p></div>${srcA(S.cab)}`;
  }
  if(key) h+=`<button class="linkbtn" data-k="" style="font-size:13px">← How the government is run</button>`;
  el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); el.innerHTML=h+(key?PV_BACK:"");
  el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>fmSelect(b.dataset.k||null));
  el.querySelectorAll("[data-seat]").forEach(b=>b.onclick=()=>{ document.getElementById("hstage").scrollIntoView({behavior:RM?"auto":"smooth",block:"center"}); zoomToSeat(seats[+b.dataset.seat]); });
  el.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>hocSelect(+b.dataset.i,true));
}
function fmSelect(key){
  FM.sel=key||null; hocSel=null; hocPanel=null; hocFocusParty=null; renderSummary();
  const ss=fmSeatsFor(FM.sel); hocHi=ss?new Set(ss.filter(Boolean).map(s=>s.i)):null; hocPaint();
  fmPanel(FM.sel);
  const svgH=d3.select("#hemi"); svgH.call(hz.transform,d3.zoomIdentity);
  fmHighlight(FM.sel); FM.hov=null;
  if(key) document.getElementById("hpanel").scrollIntoView({behavior:RM?"auto":"smooth",block:"nearest"});
}
function drawLinks(key){
  const ov=document.getElementById("cmlinks"), grid=document.getElementById("cmgrid"); if(!ov||!grid||!FM.D) return;
  const box=grid.getBoundingClientRect(); ov.setAttribute("viewBox",`0 0 ${box.width} ${box.height}`);
  const D=FM.D, pairs=[];
  if(key&&!/^clerk$/.test(key)){
    const svgEl=document.getElementById("fm-svg"), ctm=svgEl.getScreenCTM();
    const pt=(x,y)=>{ const p=svgEl.createSVGPoint(); p.x=x; p.y=y; const q=p.matrixTransform(ctm); return [q.x-box.left,q.y-box.top]; };
    const seatPt=s=>{ const c=d3.selectAll("#hemi .seat").filter(d=>d===s).node(); if(!c) return null; const r=c.getBoundingClientRect(); return [r.left+r.width/2-box.left,r.top+r.height/2-box.top]; };
    const add=(seat,x,y)=>{ if(!seat) return; const a=seatPt(seat); if(a) pairs.push([a,pt(x,y)]); };
    const pmPt=[FM_PM[0]-90,FM_PM[1]];
    if(key==="pm") add(D.pm.seat,...pmPt);
    else if(key.startsWith("d_")) D.ds.find(d=>"d_"+d.id===key).ms.forEach(m=>m.pm?add(m.seat,...pmPt):add(m.seat,m.x-11,m.y));
    else { const m=D.mins.find(x=>x.id===key)||D.sos.find(x=>x.id===key); if(m) add(m.seat,m.x-11,m.y); }
  }
  d3.select(ov).selectAll("path").data(pairs).join(enter=>enter.append("path").attr("class","cmlink"))
    .attr("d",([a,b])=>{ const dx=Math.max(60,(b[0]-a[0])*.45); return `M${a[0]},${a[1]} C${a[0]+dx},${a[1]} ${b[0]-dx},${b[1]} ${b[0]},${b[1]}`; });
  d3.select(ov).selectAll("circle").data(pairs).join("circle").attr("class","cmdot").attr("r",4).attr("cx",d=>d[1][0]).attr("cy",d=>d[1][1]);
}
function fmSearchIndex(){ const D=FM.D, idx=[{k:"gg",label:FED_GG.name,sub:FED_GG.title},{k:"pm",label:D.pm.name,sub:"Prime Minister"},{k:"clerk",label:D.clerk.person,sub:"Clerk of the Privy Council"}];
  seats.forEach(s=>{ if(!fedMinisterByName[s.mp]&&!D.sos.some(x=>x.seat===s)) idx.push({k:"seat:"+s.i,label:s.mp||"Vacant seat",sub:`${FPARTY[s.party].short} · ${s.riding}, ${s.prov}`}); });
  D.mins.forEach(m=>idx.push({k:m.id,label:m.name,sub:m.title}));
  D.ds.forEach(d=>{ idx.push({k:"d_"+d.id,label:d.name,sub:d.abbr}); d.heads.forEach(x=>idx.push({k:"d_"+d.id,label:x.name,sub:x.role+" · "+d.abbr})); });
  D.sos.forEach(s=>idx.push({k:s.id,label:s.name,sub:"Secretary of State ("+s.area+")"}));
  return idx; }
function renderFedMap(){
  if(FM.built) return; if(!document.getElementById("fm-svg")) return;
  fmBuild(); fmPanel(null);
  const go=k=>k.startsWith("seat:")?hocSelect(+k.slice(5),true):fmSelect(k);
  const idx=fmSearchIndex(), q=document.getElementById("fm-q"), res=document.getElementById("fm-res");
  q.addEventListener("input",()=>{ const t=q.value.trim().toLowerCase(); if(!t){res.hidden=true;return}
    const hits=idx.filter(i=>(i.label+" "+i.sub).toLowerCase().includes(t)).slice(0,12);
    res.innerHTML=hits.length?hits.map((h,i)=>`<li><button data-i="${i}">${h.label}<small>${h.sub}</small></button></li>`).join(""):`<li style="padding:7px 10px;color:var(--muted)">No match</li>`; res.hidden=false;
    res.querySelectorAll("button").forEach(b=>b.onclick=()=>{ go(hits[+b.dataset.i].k); res.hidden=true; q.value=""; }); });
  q.addEventListener("keydown",e=>{ if(e.key==="Escape") res.hidden=true; if(e.key==="Enter"){ e.preventDefault(); const b=res.querySelector("button"); if(b) b.click(); } });
  document.addEventListener("click",e=>{ if(!e.target.closest(".cmwrap .search")) res.hidden=true; });
  FM.built=true;
}
