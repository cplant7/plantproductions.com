/* ================= SASKATCHEWAN POWER MAP (same design as Ontario) ================= */
const SM={built:false,sel:null};
const SM_RM=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const SM_MID=-62, SM_CX=-340;
const SM_CAB={x:70,y:-500,w:620,cols:3,rh:28,head:74};
const SM_MIN={x:70,y:-78,w:620,cols:2,rh:26,head:74};
const SM_VB=[-610,-530,1310,1000];

function smData(){
  const C=CH.skleg, G=C.groups;
  const mins=SK_MIN.slice();
  C.cabOrder={}; mins.forEach((m,k)=>C.cabOrder[m.name]=k);
  chLayout(C);
  const mid=((C.X0-80)+C.W)/2;
  const P=(x,y)=>[SM_CX-y, x-mid];
  const mpps=C.members, byName={}; mpps.forEach(m=>{ byName[m.name]=m; [m.px,m.py]=P(m.x,m.y); });
  const SKC={129:3,245:2,360:1,685:1,801:2,917:3};
  mpps.forEach(m=>{ const d=SK_DESKS[m.name]; if(!d) return; [m.px,m.py]=smDT(d[0],d[1]); m.dx=d[0]; m.dy=d[1];
    if(m!==C.spk){ m.side=d[0]<523?"gov":"opp"; m.row=SKC[d[0]]; } });
  const grid=(B,n,k)=>{ const per=Math.ceil(n/B.cols), cw=(B.w-24)/B.cols, c=Math.floor(k/per), r=k%per; return [B.x+24+c*cw, B.y+B.head+r*B.rh+B.rh/2]; };
  SM_CAB.h=SM_CAB.head+Math.ceil(mins.length/SM_CAB.cols)*SM_CAB.rh+12;
  mins.forEach((m,k)=>{ [m.x,m.y]=grid(SM_CAB,mins.length,k); m.mpp=byName[m.name]||null; m.k=k; });
  const ministries=SK_OUT.filter(o=>o.id!=="exec");
  ministries.forEach(o=>{ const ms=mins.filter(m=>m.links.includes(o.id)); o.ms=ms; o.t=ms.length?d3.mean(ms,m=>m.k):99; });
  ministries.sort((p,q)=>p.t-q.t);
  SM_MIN.y=SM_CAB.y+SM_CAB.h+30;
  SM_MIN.h=SM_MIN.head+Math.ceil(ministries.length/SM_MIN.cols)*SM_MIN.rh+12;
  ministries.forEach((o,k)=>{ [o.x,o.y]=grid(SM_MIN,ministries.length,k);
    let sn=o.name.replace(/^Ministry (of|for) (the )?/,""); if(sn.length>37) sn=sn.slice(0,sn.lastIndexOf(" ",35))+"…"; o.short=sn; });
  const premierOffices=SK_OUT.filter(o=>o.id==="exec"); premierOffices.forEach(o=>{ o.x=SM_MID; o.y=40; o.ms=[]; });
  return {C,G,mpps,byName,mins,ministries,premierOffices,P,mid,moe:byName["Scott Moe"],
    premier:[SM_MID,-130], sec:[SM_MID,170]};
}
const SM_DX=0.42, SM_DY=1.15, SM_Y0=-215, SM_DCX=SM_CX-22;
function smDT(x,y){ return [SM_DCX+(x-523)*SM_DX, SM_Y0+(y-57)*SM_DY]; }
function smKeyForMpp(i){ const D=SM.D, m=D.mpps[i]; const mn=D.mins.find(x=>x.mpp===m); return mn?mn.id:m===D.moe?"premier":"m"+i; }
function smMppOf(key){ const D=SM.D; if(!key) return null; if(key==="premier") return D.moe; if(/^m\d+$/.test(key)) return D.mpps[+key.slice(1)]; const mn=D.mins.find(x=>x.id===key); return mn?mn.mpp:null; }

function smBuild(){
  const D=SM.D=smData(); const {G,C,P}=D;
  const svg=d3.select("#sm-svg"); svg.selectAll("*").remove();
  const defs=svg.append("defs");
  ["ink","accent"].forEach(k=>defs.append("marker").attr("id","sm-ar-"+k).attr("viewBox","0 0 10 10").attr("refX",8).attr("refY",5).attr("markerWidth",7).attr("markerHeight",7).attr("orient","auto-start-reverse")
    .append("path").attr("d","M0,0 L10,5 L0,10 z").attr("fill",k==="ink"?"var(--ink)":"var(--brass)"));
  const zg=svg.append("g"), g=zg.append("g");
  const card=(B,t1,t2)=>{ g.append("rect").attr("x",B.x).attr("y",B.y).attr("width",B.w).attr("height",B.h).attr("rx",16).attr("class","pmcard");
    const t=g.append("text").attr("x",B.x+22).attr("y",B.y+36).attr("class","pmcardh"); t.append("tspan").text(t1); t.append("tspan").attr("class","pmcardn").text("  ·  "+t2[0]);
    g.append("text").attr("x",B.x+22).attr("y",B.y+56).attr("class","pmcards").text(t2[1]); };
  card(SM_CAB,"Cabinet",[`${D.mins.length} ministers`,"Chosen by the Premier from Saskatchewan Party MLAs. Last changed December 11, 2025."]);
  card(SM_MIN,"Ministries",[String(D.ministries.length),"Each is run day to day by a deputy minister from the public service."]);
  // ---- chamber: desks as in the Assembly's October 19, 2026 seating plan ----
  const ch=g.append("g").attr("class","pmchamber");
  const top=smDT(0,112)[1], bot=smDT(0,500)[1];
  const ax0=smDT(395,0)[0], ax1=smDT(651,0)[0];
  ch.append("rect").attr("x",ax0).attr("y",top).attr("width",ax1-ax0).attr("height",bot-top-6).attr("rx",8).attr("fill","#ffffff07");
  ch.append("rect").attr("x",SM_DCX-16).attr("y",smDT(0,140)[1]).attr("width",32).attr("height",58).attr("rx",5).attr("fill","none").attr("stroke","var(--rule)");
  ch.append("text").attr("x",SM_DCX).attr("y",smDT(0,140)[1]+74).attr("text-anchor","middle").attr("class","clbl").text("TABLE");
  // desks: two seats per desk, stacked, as on the plan
  const seated=D.mpps.filter(m=>m.dx!=null&&m!==C.spk), byCol=d3.group(seated,m=>m.dx), desks=[];
  byCol.forEach(list=>{ list.sort((a,b)=>a.dy-b.dy); for(let k=0;k<list.length;){ const a=list[k], b=list[k+1]; if(b&&b.dy-a.dy<36){ desks.push([a,b]); k+=2; } else { desks.push([a]); k+=1; } } });
  desks.forEach(dk=>{ const a=dk[0], z=dk[dk.length-1], front=a.row===1, gr=a.group;
    const x=a.px-22, y=a.py-17, w=44, h=z.py-a.py+34;
    ch.append("rect").attr("x",x+2).attr("y",y+2).attr("width",w-4).attr("height",h-4).attr("rx",9).attr("class",front?"pmdesk front":"pmdesk").attr("fill",front?"#222":"#1b1b1b");
    if(gr!=="skp") ch.append("rect").attr("x",x).attr("y",y).attr("width",w).attr("height",h).attr("rx",11).attr("class","pmblock").attr("stroke",G[gr].color); });
  const [sx,sy]=[C.spk.px,C.spk.py];
  ch.append("rect").attr("x",sx-24).attr("y",sy-24).attr("width",48).attr("height",48).attr("rx",10).attr("fill","none").attr("stroke","var(--brass)").attr("stroke-width",2);
  ch.append("text").attr("x",sx-34).attr("y",sy-2).attr("text-anchor","end").attr("class","clbl brass").text("SPEAKER");
  ch.append("text").attr("x",sx-34).attr("y",sy+12).attr("text-anchor","end").attr("class","clbl").text("TODD GOUDY");
  const gx=smDT(245,0)[0], ox=smDT(801,0)[0];
  ch.append("text").attr("x",gx).attr("y",bot+36).attr("text-anchor","middle").attr("class","clbl side").text("GOVERNMENT");
  ch.append("text").attr("x",gx).attr("y",bot+52).attr("text-anchor","middle").attr("class","clbl").text("SPEAKER'S RIGHT");
  ch.append("text").attr("x",ox).attr("y",bot+36).attr("text-anchor","middle").attr("class","clbl side").text("OPPOSITION");
  ch.append("text").attr("x",ox).attr("y",bot+52).attr("text-anchor","middle").attr("class","clbl").text("SPEAKER'S LEFT");
  { const t=ch.append("text").attr("x",SM_CX).attr("y",sy-74).attr("text-anchor","middle").attr("class","pmcardh"); t.append("tspan").text("Legislative Assembly of Saskatchewan");
    ch.append("text").attr("x",SM_CX).attr("y",sy-52).attr("text-anchor","middle").attr("class","pmcards").text("61 MLAs, 1 per constituency, representing the people of Saskatchewan"); }
  ch.append("line").attr("x1",smDT(100,0)[0]).attr("x2",smDT(946,0)[0]).attr("y1",bot+16).attr("y2",bot+16).attr("stroke","var(--brass)").attr("stroke-width",2).attr("stroke-dasharray","4 5");
  // ---- flows ----
  const fl=g.append("g").attr("class","flows");
  const arrow=(d,cls,mk)=>fl.append("path").attr("d",d).attr("class","flow "+cls).attr("marker-end",`url(#sm-ar-${mk||"ink"})`);
  const lbl=(x,y,t,anchor,cls)=>fl.append("text").attr("x",x).attr("y",y).attr("text-anchor",anchor||"middle").attr("class",cls||"flowlbl").text(t);
  const [px,py]=D.premier, Mo=D.moe;
  const hy=-164, vx=smDT(395,0)[0]+18;
  arrow(`M${Mo.px+14},${Mo.py} L${vx-14},${Mo.py} Q${vx},${Mo.py} ${vx},${Mo.py-14} L${vx},${hy+14} Q${vx},${hy} ${vx+14},${hy} L${px-120},${hy} C${px-95},${hy} ${px-100},${py} ${px-76},${py}`,"f-conf","accent");
  lbl(vx+70,hy-24,"Leader with the Assembly's","start");lbl(vx+70,hy-10,"confidence becomes Premier","start");
  arrow(`M${px+72},${py} C${px+110},${py} ${SM_CAB.x-50},${SM_CAB.y+SM_CAB.h-60} ${SM_CAB.x-6},${SM_CAB.y+SM_CAB.h-60}`,"f-app");
  lbl(px+80,py-32,"Chooses","start","flowlbl big");lbl(px+80,py-16,"Cabinet","start","flowlbl big");
  arrow(`M${SM_CAB.x+SM_CAB.w/2},${SM_CAB.y+SM_CAB.h+2} L${SM_CAB.x+SM_CAB.w/2},${SM_MIN.y-4}`,"f-app");
  lbl(SM_CAB.x+SM_CAB.w/2+12,SM_MIN.y-10,"Ministers direct ministries","start","flowlbl big");
  const SL=[{key:"premier",x:px,y:py,m:D.moe},...D.mins.filter(mn=>mn.mpp).map(mn=>({key:mn.id,x:mn.x,y:mn.y,m:mn.mpp}))];
  const seatLinks=g.append("g").selectAll("path").data(SL).join("path").attr("class","seatlink")
    .attr("d",d=>`M${d.x-10},${d.y} C${d.x-240},${d.y} ${d.m.px+220},${d.m.py} ${d.m.px+12},${d.m.py}`);
  const spokes=g.append("g").selectAll("path").data(D.mins).join("path").attr("class","spoke ms").attr("d",m=>`M${px+40},${py} C${px+160},${py} ${m.x-120},${m.y} ${m.x-11},${m.y}`);
  const L=[]; D.mins.forEach(m=>m.links.forEach(l=>{ const o=D.ministries.find(x=>x.id===l); if(o) L.push({m,o}); }));
  const links=g.append("g").selectAll("path").data(L).join("path").attr("class","mlink").attr("d",d=>`M${d.m.x-11},${d.m.y} C${SM_CAB.x-40},${d.m.y} ${SM_MIN.x-40},${d.o.y} ${d.o.x-9},${d.o.y}`);
  SM.psLines=g.append("g").selectAll("path").data(D.ministries).join("path").attr("class","psline").attr("d",o=>`M${D.sec[0]+80},${D.sec[1]} C${D.sec[0]+180},${D.sec[1]} ${o.x-120},${o.y} ${o.x-9},${o.y}`).attr("opacity",0);
  // ---- MLA seats ----
  const mg=g.append("g").selectAll("g").data(D.mpps).join("g").attr("class","pmn mpp").attr("transform",m=>`translate(${m.px},${m.py})`).datum(m=>({type:"mpp",key:"m"+m.i,m}));
  mg.append("circle").attr("class","pdot").attr("r",SM_RM?11.5:0).attr("fill",x=>G[x.m.group].color);
  mg.filter(x=>x.m.hon).append("circle").attr("r",3.6).attr("fill","#0a0a0a").attr("pointer-events","none");
  // ---- Premier, Executive Council, Cabinet Secretary ----
  g.append("path").attr("class","spoke").attr("d",`M${px},${py+58} V${D.premierOffices[0].y-12} M${px},${D.premierOffices[0].y+40} V${D.sec[1]-21}`);
  const pr=g.append("g").attr("class","pmn premier").attr("transform",`translate(${px},${py})`).datum({type:"premier",key:"premier"});
  pr.append("rect").attr("x",-72).attr("y",-28).attr("width",144).attr("height",56).attr("rx",16).attr("class","prbox skp");
  pr.append("text").attr("y",8).attr("text-anchor","middle").attr("class","pminit").text("Premier");
  g.append("text").attr("x",px).attr("y",py+50).attr("text-anchor","middle").attr("class","pmname").text("Scott Moe");
  const po=g.append("g").selectAll("g").data(D.premierOffices).join("g").attr("class","pmn office").attr("transform",o=>`translate(${o.x},${o.y})`).datum(o=>({type:"ministry",key:"o_"+o.id,o}));
  po.append("rect").attr("x",-11).attr("y",-11).attr("width",22).attr("height",22).attr("rx",5).attr("class","mbox");
  po.append("text").attr("y",30).attr("text-anchor","middle").attr("class","olbl big").text("Executive Council");
  const sc=g.append("g").attr("class","pmn sec").attr("transform",`translate(${D.sec[0]},${D.sec[1]})`).datum({type:"sec",key:"sec"});
  sc.append("rect").attr("x",-84).attr("y",-20).attr("width",168).attr("height",40).attr("rx",20).attr("class","secbox");
  sc.append("text").attr("y",-2).attr("text-anchor","middle").attr("class","seclbl").text("Cabinet Secretary");
  sc.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text("EXECUTIVE COUNCIL");
  // ---- the Crown and the statutory officers ----
  const LGY=-400; D.lgPt=[px,LGY]; D.offPt=[SM_DCX,bot+94];
  g.append("path").attr("class","flow f-crown").attr("d",`M${px},${LGY+24} L${px},${py-32}`).attr("marker-end","url(#sm-ar-ink)");
  g.append("text").attr("x",px+8).attr("y",(LGY+py)/2+4).attr("class","flowlbl").text("Appoints, on advice");
  const lg=g.append("g").attr("class","pmn crown").attr("transform",`translate(${px},${LGY})`).datum({type:"lg",key:"lg"});
  lg.append("rect").attr("x",-86).attr("y",-23).attr("width",172).attr("height",46).attr("rx",23).attr("class","crownbox");
  lg.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text("Lieutenant Governor");
  lg.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text("THE CROWN");
  g.append("path").attr("class","spoke").attr("d",`M${SM_DCX},${bot+18} V${bot+70}`);
  const of=g.append("g").attr("class","pmn officers").attr("transform",`translate(${SM_DCX},${bot+94})`).datum({type:"officers",key:"officers"});
  of.append("rect").attr("x",-170).attr("y",-24).attr("width",340).attr("height",48).attr("rx",24).attr("class","crownbox");
  of.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text(`Officers of the Assembly · ${SK_OFFICERS.length}`);
  of.append("text").attr("y",14).attr("text-anchor","middle").attr("class","clbl").text("REPORT TO THE ASSEMBLY, NOT CABINET");
  // ---- ministers ----
  const mn=g.append("g").selectAll("g").data(D.mins).join("g").attr("class",m=>"pmn minister"+(m.mpp?"":" gone")).attr("transform",m=>`translate(${m.x},${m.y})`).datum(m=>({type:"minister",key:m.id,m}));
  mn.append("rect").attr("x",-14).attr("y",-SM_CAB.rh/2+2).attr("width",(SM_CAB.w-24)/SM_CAB.cols-8).attr("height",SM_CAB.rh-4).attr("rx",7).attr("class","rowhit");
  mn.append("circle").attr("r",9.5).attr("fill",x=>x.m.mpp?"var(--p-skp)":"none").attr("stroke",x=>x.m.mpp?"#ffffff80":"var(--p-skp)").attr("stroke-width",x=>x.m.mpp?1:2);
  mn.filter(x=>x.m.mpp).append("circle").attr("r",3.2).attr("fill","#fff");
  mn.append("text").attr("class","mlbl2").attr("x",17).attr("dy","0.35em").text(x=>x.m.name);
  // ---- ministries ----
  const mi=g.append("g").selectAll("g").data(D.ministries).join("g").attr("class","pmn ministry").attr("transform",o=>`translate(${o.x},${o.y})`).datum(o=>({type:"ministry",key:"o_"+o.id,o}));
  mi.append("rect").attr("x",-14).attr("y",-SM_MIN.rh/2+2).attr("width",(SM_MIN.w-24)/SM_MIN.cols-8).attr("height",SM_MIN.rh-4).attr("rx",7).attr("class","rowhit");
  mi.append("rect").attr("x",-7).attr("y",-7).attr("width",14).attr("height",14).attr("rx",3.5).attr("class","mbox");
  mi.append("text").attr("class","mnlbl").attr("x",17).attr("dy","0.35em").text(x=>x.o.short);
  // ---- interaction ----
  const keyOf=d=>d.type==="mpp"?smKeyForMpp(d.m.i):d.key;
  g.selectAll(".pmn").attr("tabindex",0).attr("role","button")
    .attr("aria-label",d=>d.type==="mpp"?`${d.m.name}, ${d.m.place}`:d.type==="minister"?`${d.m.name}, ${d.m.title}`:d.type==="ministry"?d.o.name:d.type==="premier"?"Scott Moe, Premier":d.type==="sec"?"Raynelle Wilson, Cabinet Secretary":d.type==="lg"?`${SK_LG.name}, ${SK_LG.title}`:"Officers of the Assembly")
    .on("click",(e,d)=>smSelect(keyOf(d),true)).on("keydown",(e,d)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); smSelect(keyOf(d),true);} })
    .on("mouseenter",(e,d)=>{ smTip(e,d); smHighlight(keyOf(d)); }).on("mousemove",(e,d)=>smTip(e,d))
    .on("mouseleave",()=>{ document.getElementById("sm-tip").hidden=true; smHighlight(SM.sel); });
  SM.nodes=g.selectAll(".pmn"); SM.links=links; SM.spokes=spokes; SM.flows=fl; SM.seatLinks=seatLinks;
  SM.zoom=d3.zoom().scaleExtent([1,6]).translateExtent([[SM_VB[0]-30,SM_VB[1]-30],[SM_VB[0]+SM_VB[2]+30,SM_VB[1]+SM_VB[3]+30]]).on("zoom",e=>zg.attr("transform",e.transform));
  svg.call(SM.zoom).on("dblclick.zoom",null);
  if(!SM_RM){
    mg.select(".pdot").transition().delay(x=>200+(x.m.py-top)*1.3+Math.abs(x.m.px-SM_CX)*.8).duration(380).ease(d3.easeBackOut.overshoot(1.8)).attr("r",11.5);
    fl.selectAll("path").each(function(){ const L=this.getTotalLength(); d3.select(this).attr("stroke-dasharray",`${L} ${L}`).attr("stroke-dashoffset",L).transition().delay(500).duration(1000).ease(d3.easeCubicOut).attr("stroke-dashoffset",0).on("end",function(){ d3.select(this).attr("stroke-dasharray",null); }); });
    mn.attr("opacity",0).transition().delay((x,i)=>1000+i*22).duration(300).attr("opacity",1);
    mi.attr("opacity",0).transition().delay((x,i)=>1400+i*20).duration(300).attr("opacity",1);
  }
}
function smRelated(key){
  const D=SM.D, s=new Set([key]); if(!key) return null;
  if(key==="premier"){ D.mins.forEach(m=>s.add(m.id)); D.premierOffices.forEach(o=>s.add("o_"+o.id)); s.add("m"+D.moe.i); s.add("sec"); return s; }
  if(key==="sec"){ D.ministries.forEach(o=>s.add("o_"+o.id)); D.premierOffices.forEach(o=>s.add("o_"+o.id)); s.add("premier"); return s; }
  if(key==="lg"){ s.add("premier"); D.mins.forEach(m=>s.add(m.id)); return s; }
  if(key==="officers"){ D.mpps.forEach(m=>s.add("m"+m.i)); return s; }
  if(key.startsWith("o_")){ const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key); o.ms.forEach(m=>{ s.add(m.id); if(m.mpp) s.add("m"+m.mpp.i); }); if(!o.ms.length){ s.add("premier"); s.add("m"+D.moe.i); } return s; }
  if(/^m\d+$/.test(key)) return s;
  const mn=D.mins.find(x=>x.id===key); if(mn){ s.add("premier"); if(mn.mpp) s.add("m"+mn.mpp.i); mn.links.forEach(l=>s.add("o_"+l)); } return s;
}
function smHighlight(key){
  const rel=smRelated(key);
  SM.nodes.classed("dim",d=>rel?!rel.has(d.key):false).classed("on",d=>d.key===key||(d.type==="mpp"&&smMppOf(key)===d.m));
  SM.links.classed("hot",d=>!!rel&&(key===d.m.id||key==="o_"+d.o.id)).classed("dim",d=>rel?!(rel.has(d.m.id)&&rel.has("o_"+d.o.id)):false);
  SM.spokes.classed("hot",m=>key==="premier"||key===m.id).classed("dim",m=>rel?!(key==="premier"||rel.has(m.id)):false);
  SM.seatLinks.classed("hot",d=>!!rel&&(d.key===key||(!!key&&key.startsWith("o_")&&rel.has(d.key)))).classed("dim",d=>!!rel&&key!=="premier"&&!rel.has(d.key));
  SM.psLines.attr("opacity",key==="sec"?.6:0);
  SM.flows.classed("dim",!!rel&&key!=="premier");
}
function smTip(e,d){
  const t=document.getElementById("sm-tip"), D=SM.D, G=D.G; let h="";
  if(d.type==="mpp"){ const mn=D.mins.find(x=>x.mpp===d.m); h=`<b>${d.m.name}</b><span>${d.m.place}</span><span class="tparty"><span class="pchip" style="--pc:${G[d.m.group].color}">${G[d.m.group].short}</span>${d.m===D.moe?" Premier":d.m===D.C.spk?" Speaker":mn?" "+mn.title:" MLA"}</span>`; }
  else if(d.type==="minister") h=`<b>${d.m.name}</b><span>${d.m.title}</span><span>MLA for ${d.m.mpp?d.m.mpp.place:""}</span>`;
  else if(d.type==="ministry") h=`<b>${d.o.name}</b><span>${d.o.heads.length?d.o.heads.map(x=>x.name).join(", "):"Deputy minister not confirmed here"}</span>`;
  else if(d.type==="premier") h=`<b>Scott Moe</b><span>Premier of Saskatchewan · MLA for Rosthern-Shellbrook</span>`;
  else if(d.type==="sec") h=`<b>Raynelle Wilson</b><span>Deputy Minister to the Premier and Cabinet Secretary</span>`;
  else if(d.type==="lg") h=`<b>${SK_LG.name}</b><span>${SK_LG.title}</span>`;
  else h=`<b>Officers of the Assembly</b><span>${SK_OFFICERS.map(o=>o.role).join(" · ")}</span>`;
  t.innerHTML=h; t.hidden=false; const r=document.getElementById("sm-stage").getBoundingClientRect(); let lx=e.clientX-r.left+16; if(lx>r.width-280) lx-=300; t.style.left=lx+"px"; t.style.top=(e.clientY-r.top+16)+"px";
}
function smPanel(key){
  const D=SM.D, G=D.G, C=D.C, el=document.getElementById("sm-panel"); let h="";
  const seatLine=m=>m?`<div class="where"><div class="kicker">Seat in the Assembly</div><div><b>${m===C.spk?"Speaker's chair":m.side==="gov"?"Government side":"Opposition side"}</b>${m!==C.spk&&m.row?` · ${["","front","second","third"][m.row]} row from the aisle`:""}</div><div class="muted" style="font-size:12px">Highlighted on the map. From the Assembly's October 19, 2026 seating plan.</div></div>`:"";
  const head=(m,kicker,grp,place)=>{ const gr=grp||m.group; return `<div class="pband" style="--pc:${G[gr].color}"></div><div class="who"><div class="ava" style="--pc:${G[gr].color}" aria-hidden="true">${initials(m.name)}</div><div class="who-t"><div class="kicker">${kicker}</div><h2>${m.name}</h2><div class="party"><i style="background:${G[gr].color}"></i><span>${G[gr].name}${place?" · "+place:""}</span></div></div></div>`; };
  const dmList=o=>o.heads.length?`<ul class="list">${o.heads.map(x=>`<li class="item"><span class="nm">${x.name}</span><span class="rl">${x.role}</span>${srcA(SK_S[x.src])}</li>`).join("")}</ul>`:`<p class="muted">Not confirmed in the sources checked for this page.</p>`;
  if(!key){
    const c=chCounts(C);
    h=`<div class="kicker">Start here</div><h2>How power flows in Saskatchewan</h2>
      <ol class="steps"><li><b>Voters</b> in each of the 61 constituencies elect one MLA. The last general election was October 28, 2024.</li><li>The Lieutenant Governor asks the leader who holds the Assembly's confidence to form government. The <b>Saskatchewan Party holds ${c.skp||0} of 61</b> seats, past the 31 needed.</li><li><b>Scott Moe</b>, as Premier, chooses <b>Cabinet</b> from his party's MLAs, and the Lieutenant Governor appoints them on his advice.</li><li>Each minister directs one or more <b>ministries</b>, which deputy ministers run day to day.</li></ol>
      <h3>Key roles</h3><ul class="list"><li class="item"><button class="linkbtn" data-k="premier">Scott Moe</button><span class="rl">Premier</span></li><li class="item"><button class="linkbtn" data-k="m${D.byName["Carla Beck"].i}">Carla Beck</button><span class="rl">Leader of the Opposition</span></li><li class="item"><button class="linkbtn" data-k="m${C.spk.i}">Todd Goudy</button><span class="rl">Speaker</span></li><li class="item"><button class="linkbtn" data-k="lg">${SK_LG.name}</button><span class="rl">Lieutenant Governor</span></li></ul>
      <div class="note">Hover or tap anything. Pick a minister or ministry and a line runs back to the minister's seat.</div>${srcA(SK_S.mla)}${srcA(SK_S.cab)}`;
  } else if(key==="premier"){
    h=head(D.moe,"Premier of Saskatchewan","skp","Rosthern-Shellbrook")+`<div class="lede">Leader of the Saskatchewan Party. Also President of the Executive Council and Minister of Intergovernmental Affairs.</div>
      <div class="statgrid" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="stat"><b>${D.mins.length}</b><span>Ministers</span></div><div class="stat"><b>${D.ministries.length}</b><span>Ministries</span></div></div>
      <h3>His own office</h3><ul class="list">${D.premierOffices.map(o=>`<li class="item"><button class="linkbtn" data-k="o_${o.id}">${o.name}</button><span class="rl">${o.heads[0].name}</span></li>`).join("")}</ul>${seatLine(D.moe)}${srcA(SK_S.cab)}`;
  } else if(key==="lg"){
    h=`<div class="kicker">The Crown · non-partisan</div><h2>${SK_LG.name}</h2><div class="lede">${SK_LG.title} since ${SK_LG.since}, representing the King in Saskatchewan.</div>
      <h3>What the role does</h3><ul class="list"><li class="item"><span class="nm">Asks a leader to form government</span><span class="rl">The leader who holds the Assembly's confidence becomes Premier.</span></li>
      <li class="item"><span class="nm">Appoints Cabinet</span><span class="rl">Ministers are appointed on the Premier's advice.</span></li>
      <li class="item"><span class="nm">Gives Royal Assent</span><span class="rl">A bill passed by the Assembly becomes law once it receives Royal Assent.</span></li></ul>
      <div class="note">By convention, the Lieutenant Governor acts on the advice of the Premier and Cabinet, so there is no party colour here.</div>${srcA(SK_LG.src)}`;
  } else if(key==="officers"){
    h=`<div class="kicker">Independent of government</div><h2>Officers of the Legislative Assembly</h2><div class="lede">Appointed by and reporting to the whole Assembly, not to the Premier or Cabinet.</div>
      <ul class="list">${SK_OFFICERS.map(o=>`<li class="item"><span class="nm">${o.name}</span><span class="rl"><b>${o.role}</b> · ${o.what}</span>${srcA(o.src)}</li>`).join("")}</ul>`;
  } else if(key==="sec"){
    h=`<div class="kicker">Public service</div><h2>Raynelle Wilson</h2><div class="lede">Deputy Minister to the Premier and Cabinet Secretary. Supports Cabinet and works with the deputy ministers who run each ministry.</div>
      <div class="note">Public servants are non-partisan, so there is no party colour here.</div>${srcA(SK_S.exec)}`;
  } else if(key.startsWith("o_")){
    const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key);
    h=`<div class="kicker">${o.id==="exec"?"Premier's office":"Ministry · "+o.abbr}</div><h2>${o.name}</h2><h3>${o.ms.length>1?"Ministers":"Minister"}</h3>
      ${o.ms.length?`<ul class="list">${o.ms.map(m=>`<li class="item"><button class="linkbtn" data-k="${m.id}">${m.name}</button><span class="rl">${m.title}</span></li>`).join("")}</ul>`:`<ul class="list"><li class="item"><button class="linkbtn" data-k="premier">Scott Moe</button><span class="rl">Premier</span></li></ul>`}
      <h3>${o.id==="exec"?"Senior public servant":"Deputy minister"+(o.heads.length>1?"s":"")+" (public service)"}</h3>${dmList(o)}`;
  } else if(/^m\d+$/.test(key)){
    const m=D.mpps[+key.slice(1)], mn=D.mins.find(x=>x.mpp===m);
    if(mn) return smPanel(mn.id); if(m===D.moe) return smPanel("premier");
    const role=m===C.spk?"Speaker of the Legislative Assembly":m.name==="Carla Beck"?"Leader of the Opposition":"Member of the Legislative Assembly";
    const lede=m===C.spk?"Elected by MLAs to chair debates and keep order impartially. The Speaker votes only to break a tie."
      :m.name==="Carla Beck"?"Leader of the Saskatchewan New Democratic Party, the Official Opposition."
      :m.group==="ind"?"Sits as an independent. Elected for the NDP in 2024 and left the caucus in May 2026."
      :m.group==="skp"?"Sits with the governing Saskatchewan Party.":"Sits with the Official Opposition.";
    h=head(m,role,null,m.place)+`<div class="lede">${lede}</div>
      <div class="role"><div class="kicker">About this role</div><p>Members of the Legislative Assembly represent one constituency each in Regina, where they debate and vote on Saskatchewan's laws and budget and question the provincial government.</p></div>${seatLine(m)}${srcA(m.group==="ind"?SK_S.nip:SK_S.mla)}`;
  } else {
    const mn=D.mins.find(x=>x.id===key);
    h=head(mn,"Cabinet minister","skp",mn.mpp?mn.mpp.place:null)+`<div class="lede">${mn.title}</div>
      <h3>Responsible for</h3>${mn.links.length?"":`<p class="muted">${mn.title} is a Cabinet post without a ministry of its own on this page.</p>`}<ul class="list">${mn.links.map(l=>{ const o=[...D.ministries,...D.premierOffices].find(x=>x.id===l); return o?`<li class="item"><button class="linkbtn" data-k="o_${o.id}">${o.name}</button><span class="rl">${o.heads.length?o.heads.map(x=>x.name+" · "+x.role).join("<br>"):"Deputy minister not confirmed here"}</span></li>`:""; }).join("")}</ul>
      ${seatLine(mn.mpp)}${srcA(SK_S.cab)}`;
  }
  if(key) h+=`<button class="linkbtn" data-k="" style="font-size:13px">← How power flows</button>`;
  el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); el.innerHTML=h;
  el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>smSelect(b.dataset.k||null,!!b.dataset.k));
}
function smPoint(key){ const D=SM.D;
  if(key==="premier") return D.premier; if(key==="sec") return D.sec; if(key==="lg") return D.lgPt; if(key==="officers") return D.offPt;
  if(key.startsWith("o_")){ const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key); return [o.x,o.y]; }
  if(/^m\d+$/.test(key)){ const m=D.mpps[+key.slice(1)]; return [m.px,m.py]; }
  const mn=D.mins.find(x=>x.id===key); return mn?[mn.x,mn.y]:[0,0]; }
function smSelect(key,zoom){
  SM.sel=key||null; smHighlight(SM.sel); smPanel(SM.sel);
  const st=chState.skleg, m=smMppOf(SM.sel); st.sel=m?m.i:null; st.panel=null; st.focus=null;
  chSummary(CH.skleg); chList(CH.skleg);
  const svg=d3.select("#sm-svg");
  if(zoom&&key&&/^m\d+$/.test(key)){ const [x,y]=smPoint(key), k=2.6, cx=SM_VB[0]+SM_VB[2]/2, cy=SM_VB[1]+SM_VB[3]/2;
    svg.transition().duration(SM_RM?0:750).ease(d3.easeCubicInOut).call(SM.zoom.transform,d3.zoomIdentity.translate(cx-x*k,cy-y*k).scale(k)); }
  else svg.transition().duration(SM_RM?0:600).call(SM.zoom.transform,d3.zoomIdentity);
  if(key) document.getElementById("sm-panel").scrollIntoView({behavior:SM_RM?"auto":"smooth",block:"nearest"});
}
function smFocus(fk){ if(!fk||fk.startsWith("ch:")) return; if(fk==="hub") return smSelect("premier",true); if(fk==="head") return smSelect("sec",true); smSelect(fk,true); }
function smSearchIndex(){ const D=SM.D, idx=[];
  D.mpps.forEach(m=>{ const mn=D.mins.find(x=>x.mpp===m); idx.push({k:smKeyForMpp(m.i),label:m.name,sub:`${D.G[m.group].short} · ${m.place}${mn?" · "+mn.title:m===D.moe?" · Premier":m===D.C.spk?" · Speaker":""}`}); });
  [...D.ministries,...D.premierOffices].forEach(o=>{ idx.push({k:"o_"+o.id,label:o.name,sub:o.abbr}); o.heads.forEach(x=>idx.push({k:"o_"+o.id,label:x.name,sub:x.role+" · "+o.abbr})); });
  idx.push({k:"sec",label:"Raynelle Wilson",sub:"Cabinet Secretary"},{k:"lg",label:SK_LG.name,sub:SK_LG.title});
  SK_OFFICERS.forEach(o=>idx.push({k:"officers",label:o.name,sub:o.role}));
  return idx; }
function renderSkMap(){
  if(SM.built) return;
  const slot=document.getElementById("sm-slot"); if(!slot) return;
  slot.innerHTML=`<div class="pmbar smbar"><label class="search" for="sm-q"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg>
      <input id="sm-q" type="search" placeholder="Search an MLA, constituency, minister or ministry" autocomplete="off" aria-label="Search Saskatchewan"><ul class="results" id="sm-res" hidden></ul></label>
      <div class="zbtn"><button id="sm-zin" aria-label="Zoom in" title="Zoom in">+</button><button id="sm-zout" aria-label="Zoom out" title="Zoom out">−</button><button id="sm-zr" aria-label="Fit to screen" title="Fit to screen" class="zreset"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7"/><path d="M3 2.5v3h3"/></svg><span>Fit to screen</span></button></div></div>
    <div class="pmgrid"><div class="pmstage" id="sm-stage"><svg id="sm-svg" viewBox="${SM_VB.join(" ")}" role="img" aria-label="Saskatchewan power map: the Legislature, Premier, Cabinet and ministries"></svg><div class="tip" id="sm-tip" hidden></div></div>
      <aside class="hpanel pmpanel" id="sm-panel" aria-live="polite"></aside></div>`;
  smBuild();
  const svg=d3.select("#sm-svg");
  document.getElementById("sm-zin").onclick=()=>svg.transition().duration(300).call(SM.zoom.scaleBy,1.4);
  document.getElementById("sm-zout").onclick=()=>svg.transition().duration(300).call(SM.zoom.scaleBy,1/1.4);
  document.getElementById("sm-zr").onclick=()=>smSelect(null,false);
  const idx=smSearchIndex(), q=document.getElementById("sm-q"), res=document.getElementById("sm-res");
  q.addEventListener("input",()=>{ const t=q.value.trim().toLowerCase(); if(!t){res.hidden=true;return}
    const hits=idx.filter(i=>(i.label+" "+i.sub).toLowerCase().includes(t)).slice(0,12);
    res.innerHTML=hits.length?hits.map((h,i)=>`<li><button data-i="${i}">${h.label}<small>${h.sub}</small></button></li>`).join(""):`<li style="padding:7px 10px;color:var(--muted)">No match</li>`; res.hidden=false;
    res.querySelectorAll("button").forEach(b=>b.onclick=()=>{ smSelect(hits[+b.dataset.i].k,true); res.hidden=true; q.value=""; }); });
  q.addEventListener("keydown",e=>{ if(e.key==="Escape") res.hidden=true; if(e.key==="Enter"){ e.preventDefault(); const b=res.querySelector("button"); if(b) b.click(); } });
  document.addEventListener("click",e=>{ if(!e.target.closest(".smbar .search")) res.hidden=true; });
  SM.built=true;
}
