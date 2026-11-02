/* ================= GENERIC PROVINCIAL POWER MAP (Ontario design, exact desks from a seating plan) =================
   cfg = {id, pre, region, capital, gov (party key), govName, MIN, OUT, execId, execLabel, LG, OFFICERS, offTitle, S, plan,
          premier:{name,place,lede}, sec:{name,title,l1,l2,src,lede}, cabSub, title, sub, T(x,y)->[svgX,svgY],
          seats:{name:[x,y]}, chair:[x,y] (Speaker's chair, PDF units), aisle:[x0,x1,y0,y1] (PDF), table:[x,y] (PDF),
          sideLbl:{gov:[x,y],opp:[x,y]} (PDF), rowOf(m), deskW, deskH, notes:{name:text}, roleOf(m) } */
const PV={};
const PV_RM=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const PV_MID=-62, PV_VB=[-610,-530,1310,1000];
function pvS(cfg){ return PV[cfg.id]||(PV[cfg.id]={built:false,sel:null}); }
function pvData(cfg){
  const C=CH[cfg.id], G=C.groups, CAB={x:70,y:-500,w:620,cols:3,rh:28,head:74}, MIN={x:70,y:-78,w:620,cols:2,rh:26,head:74};
  const mins=cfg.MIN.slice(); C.cabOrder={}; mins.forEach((m,k)=>C.cabOrder[m.name]=k);
  chLayout(C);
  const mpps=C.members, byName={}; mpps.forEach(m=>{ byName[m.name]=m; });
  mpps.forEach(m=>{ const d=m===C.spk&&cfg.chair?cfg.chair:cfg.seats[m.name]; if(!d){ console.warn("no seat",m.name); m.px=0; m.py=0; return; }
    [m.px,m.py]=cfg.T(d[0],d[1]); m.dx=d[0]; m.dy=d[1]; if(m!==C.spk){ m.side=cfg.isGov(d[0],d[1])?"gov":"opp"; m.row=cfg.rowOf?cfg.rowOf(d[0],d[1]):null; } });
  const grid=(B,n,k)=>{ const per=Math.ceil(n/B.cols), cw=(B.w-24)/B.cols, c=Math.floor(k/per), r=k%per; return [B.x+24+c*cw, B.y+B.head+r*B.rh+B.rh/2]; };
  CAB.h=CAB.head+Math.ceil(mins.length/CAB.cols)*CAB.rh+12;
  mins.forEach((m,k)=>{ [m.x,m.y]=grid(CAB,mins.length,k); m.mpp=byName[m.name]||null; m.k=k; });
  const ministries=cfg.OUT.filter(o=>o.id!==cfg.execId);
  ministries.forEach(o=>{ const ms=mins.filter(m=>m.links.includes(o.id)); o.ms=ms; o.t=ms.length?d3.mean(ms,m=>m.k):99; });
  ministries.sort((p,q)=>p.t-q.t);
  MIN.y=CAB.y+CAB.h+30; MIN.h=MIN.head+Math.ceil(ministries.length/MIN.cols)*MIN.rh+12;
  ministries.forEach((o,k)=>{ [o.x,o.y]=grid(MIN,ministries.length,k);
    let sn=o.name.replace(/^(Ministry|Department) (of|for) (the )?/,""); if(sn.length>37) sn=sn.slice(0,sn.lastIndexOf(" ",35))+"…"; o.short=sn; });
  const premierOffices=cfg.OUT.filter(o=>o.id===cfg.execId); premierOffices.forEach(o=>{ o.x=PV_MID; o.y=40; o.ms=[]; });
  return {C,G,mpps,byName,mins,ministries,premierOffices,CAB,MIN,prem:byName[cfg.premier.name],premier:[PV_MID,-130],sec:[PV_MID,170]};
}
function pvKeyForMpp(cfg,i){ const D=pvS(cfg).D, m=D.mpps[i]; const mn=D.mins.find(x=>x.mpp===m); return mn?mn.id:m===D.prem?"premier":"m"+i; }
function pvMppOf(cfg,key){ const D=pvS(cfg).D; if(!key) return null; if(key==="premier") return D.prem; if(/^m\d+$/.test(key)) return D.mpps[+key.slice(1)]; const mn=D.mins.find(x=>x.id===key); return mn?mn.mpp:null; }
function pvBuild(cfg){
  const S=pvS(cfg), D=S.D=pvData(cfg), {G,C,CAB,MIN}=D, pre=cfg.pre, T=cfg.T;
  const svg=d3.select(`#${pre}-svg`); svg.selectAll("*").remove();
  const defs=svg.append("defs");
  ["ink","accent"].forEach(k=>defs.append("marker").attr("id",`${pre}-ar-`+k).attr("viewBox","0 0 10 10").attr("refX",8).attr("refY",5).attr("markerWidth",7).attr("markerHeight",7).attr("orient","auto-start-reverse")
    .append("path").attr("d","M0,0 L10,5 L0,10 z").attr("fill",k==="ink"?"var(--ink)":"var(--brass)"));
  const zg=svg.append("g"), g=zg.append("g");
  const card=(B,t1,t2)=>{ g.append("rect").attr("x",B.x).attr("y",B.y).attr("width",B.w).attr("height",B.h).attr("rx",16).attr("class","pmcard");
    const t=g.append("text").attr("x",B.x+22).attr("y",B.y+36).attr("class","pmcardh"); t.append("tspan").text(t1); t.append("tspan").attr("class","pmcardn").text("  ·  "+t2[0]);
    g.append("text").attr("x",B.x+22).attr("y",B.y+56).attr("class","pmcards").text(t2[1]); };
  card(CAB,cfg.cabTitle||"Cabinet",[`${D.mins.length} ${cfg.cabCount||"ministers"}`,cfg.cabSub]);
  card(MIN,cfg.minTitle||"Ministries",[String(D.ministries.length),cfg.minSub||"Each is run day to day by a deputy minister from the public service."]);
  // ---- chamber: desks from the seating plan ----
  const ch=g.append("g").attr("class","pmchamber");
  if(cfg.aisle){ const [a0,a1,b0,b1]=cfg.aisle, p=T(a0,b0), q=T(a1,b1); ch.append("rect").attr("x",Math.min(p[0],q[0])).attr("y",Math.min(p[1],q[1])).attr("width",Math.abs(q[0]-p[0])).attr("height",Math.abs(q[1]-p[1])).attr("rx",8).attr("fill","#ffffff07"); }
  if(cfg.table){ const [tx,ty]=T(cfg.table[0],cfg.table[1]); ch.append("rect").attr("x",tx-16).attr("y",ty-29).attr("width",32).attr("height",58).attr("rx",5).attr("fill","none").attr("stroke","var(--rule)");
    ch.append("text").attr("x",tx).attr("y",ty+45).attr("text-anchor","middle").attr("class","clbl").text("TABLE"); }
  const dw=cfg.deskW||40, dh=cfg.deskH||34;
  D.mpps.filter(m=>m!==C.spk&&m.dx!=null).forEach(m=>{ const front=m.row===1;
    ch.append("rect").attr("x",m.px-dw/2+2).attr("y",m.py-dh/2+2).attr("width",dw-4).attr("height",dh-4).attr("rx",9).attr("class",front?"pmdesk front":"pmdesk").attr("fill",front?"#222":"#1b1b1b");
    if(m.group!==cfg.gov) ch.append("rect").attr("x",m.px-dw/2).attr("y",m.py-dh/2).attr("width",dw).attr("height",dh).attr("rx",11).attr("class","pmblock").attr("stroke",G[m.group].color); });
  if(cfg.vacant) cfg.vacant.forEach(v=>{ const [vx,vy]=T(v[0],v[1]); ch.append("rect").attr("x",vx-dw/2+2).attr("y",vy-dh/2+2).attr("width",dw-4).attr("height",dh-4).attr("rx",9).attr("class","pmdesk").attr("fill","none").attr("stroke","var(--rule)").attr("stroke-dasharray","3 3"); });
  const [sx,sy]=[C.spk.px,C.spk.py];
  ch.append("rect").attr("x",sx-24).attr("y",sy-24).attr("width",48).attr("height",48).attr("rx",10).attr("fill","none").attr("stroke","var(--brass)").attr("stroke-width",2);
  const below=cfg.spkLabel==="below", sl=cfg.spkLabelSide||-1, sa=below?"middle":sl<0?"end":"start", lx0=below?sx:sx+sl*34, ly0=below?sy+42:sy-2;
  ch.append("text").attr("x",lx0).attr("y",ly0).attr("text-anchor",sa).attr("class","clbl brass").text(cfg.spkWord||"SPEAKER");
  ch.append("text").attr("x",lx0).attr("y",ly0+14).attr("text-anchor",sa).attr("class","clbl").text(C.spk.name.toUpperCase());
  const bot=cfg.bot;
  if(!cfg.noSides) [["gov",(cfg.sideNames||["GOVERNMENT"])[0],"SPEAKER'S RIGHT"],["opp",(cfg.sideNames||[0,"OPPOSITION"])[1],"SPEAKER'S LEFT"]].forEach(([k,a,b])=>{ const x=T(cfg.sideLbl[k][0],cfg.sideLbl[k][1]||0)[0];
    ch.append("text").attr("x",x).attr("y",bot+36).attr("text-anchor","middle").attr("class","clbl side").text(a);
    ch.append("text").attr("x",x).attr("y",bot+52).attr("text-anchor","middle").attr("class","clbl").text(b); });
  const cx=cfg.cx;
  { const t=ch.append("text").attr("x",cfg.titleX||cx).attr("y",cfg.titleY).attr("text-anchor","middle").attr("class","pmcardh"); t.append("tspan").text(cfg.title);
    ch.append("text").attr("x",cfg.titleX||cx).attr("y",cfg.titleY+22).attr("text-anchor","middle").attr("class","pmcards").text(cfg.sub); }
  ch.append("line").attr("x1",cfg.lineX[0]).attr("x2",cfg.lineX[1]).attr("y1",bot+16).attr("y2",bot+16).attr("stroke","var(--brass)").attr("stroke-width",2).attr("stroke-dasharray","4 5");
  // ---- flows ----
  const fl=g.append("g").attr("class","flows");
  const arrow=(d,cls,mk)=>fl.append("path").attr("d",d).attr("class","flow "+cls).attr("marker-end",`url(#${pre}-ar-${mk||"ink"})`);
  const lbl=(x,y,t,anchor,cls)=>fl.append("text").attr("x",x).attr("y",y).attr("text-anchor",anchor||"middle").attr("class",cls||"flowlbl").text(t);
  const [px,py]=D.premier;
  const cf=cfg.confPath(D.prem,px,py); arrow(cf.d,"f-conf","accent"); lbl(cf.lx,cf.ly,(cfg.confLbl||["Leader with the Assembly's"])[0],cf.anchor||"start"); lbl(cf.lx,cf.ly+14,(cfg.confLbl||[0,"confidence becomes Premier"])[1],cf.anchor||"start");
  arrow(`M${px+72},${py} C${px+110},${py} ${CAB.x-50},${CAB.y+CAB.h-60} ${CAB.x-6},${CAB.y+CAB.h-60}`,"f-app");
  lbl(px+80,py-32,(cfg.choosesLbl||["Chooses"])[0],"start","flowlbl big");lbl(px+80,py-16,(cfg.choosesLbl||[0,"Cabinet"])[1],"start","flowlbl big");
  arrow(`M${CAB.x+CAB.w/2},${CAB.y+CAB.h+2} L${CAB.x+CAB.w/2},${MIN.y-4}`,"f-app");
  lbl(CAB.x+CAB.w/2+12,MIN.y-10,cfg.dirLbl||"Ministers direct ministries","start","flowlbl big");
  const SL=[{key:"premier",x:px,y:py,m:D.prem},...D.mins.filter(mn=>mn.mpp).map(mn=>({key:mn.id,x:mn.x,y:mn.y,m:mn.mpp}))];
  const seatLinks=g.append("g").selectAll("path").data(SL).join("path").attr("class","seatlink")
    .attr("d",d=>`M${d.x-10},${d.y} C${d.x-240},${d.y} ${d.m.px+220},${d.m.py} ${d.m.px+12},${d.m.py}`);
  const spokes=g.append("g").selectAll("path").data(D.mins).join("path").attr("class","spoke ms").attr("d",m=>`M${px+40},${py} C${px+160},${py} ${m.x-120},${m.y} ${m.x-11},${m.y}`);
  const L=[]; D.mins.forEach(m=>m.links.forEach(l=>{ const o=D.ministries.find(x=>x.id===l); if(o) L.push({m,o}); }));
  const links=g.append("g").selectAll("path").data(L).join("path").attr("class","mlink").attr("d",d=>`M${d.m.x-11},${d.m.y} C${CAB.x-40},${d.m.y} ${MIN.x-40},${d.o.y} ${d.o.x-9},${d.o.y}`);
  S.psLines=g.append("g").selectAll("path").data(D.ministries).join("path").attr("class","psline").attr("d",o=>`M${D.sec[0]+80},${D.sec[1]} C${D.sec[0]+180},${D.sec[1]} ${o.x-120},${o.y} ${o.x-9},${o.y}`).attr("opacity",0);
  // ---- seats ----
  const mg=g.append("g").selectAll("g").data(D.mpps).join("g").attr("class","pmn mpp").attr("transform",m=>`translate(${m.px},${m.py})`).datum(m=>({type:"mpp",key:"m"+m.i,m}));
  mg.append("circle").attr("class","pdot").attr("r",PV_RM?11.5:0).attr("fill",x=>G[x.m.group].color);
  mg.filter(x=>x.m.hon).append("circle").attr("r",3.6).attr("fill","#0a0a0a").attr("pointer-events","none");
  // ---- Premier, office, Cabinet Secretary ----
  g.append("path").attr("class","spoke").attr("d",`M${px},${py+58} V${D.premierOffices[0].y-12} M${px},${D.premierOffices[0].y+40} V${D.sec[1]-21}`);
  const pr=g.append("g").attr("class","pmn premier").attr("transform",`translate(${px},${py})`).datum({type:"premier",key:"premier"});
  pr.append("rect").attr("x",-72).attr("y",-28).attr("width",144).attr("height",56).attr("rx",16).attr("class","prbox "+cfg.gov);
  pr.append("text").attr("y",8).attr("text-anchor","middle").attr("class","pminit").text(cfg.headWord||"Premier");
  g.append("text").attr("x",px).attr("y",py+50).attr("text-anchor","middle").attr("class","pmname").text(cfg.premier.name);
  const po=g.append("g").selectAll("g").data(D.premierOffices).join("g").attr("class","pmn office").attr("transform",o=>`translate(${o.x},${o.y})`).datum(o=>({type:"ministry",key:"o_"+o.id,o}));
  po.append("rect").attr("x",-11).attr("y",-11).attr("width",22).attr("height",22).attr("rx",5).attr("class","mbox");
  po.append("text").attr("y",30).attr("text-anchor","middle").attr("class","olbl big").text(cfg.execLabel);
  const sc=g.append("g").attr("class","pmn sec").attr("transform",`translate(${D.sec[0]},${D.sec[1]})`).datum({type:"sec",key:"sec"});
  sc.append("rect").attr("x",-84).attr("y",-20).attr("width",168).attr("height",40).attr("rx",20).attr("class","secbox");
  sc.append("text").attr("y",-2).attr("text-anchor","middle").attr("class","seclbl").text(cfg.sec.l1);
  sc.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text(cfg.sec.l2);
  // ---- the Crown and the officers ----
  const LGY=-400; D.lgPt=[px,LGY]; D.offPt=[cx,bot+94];
  g.append("path").attr("class","flow f-crown").attr("d",`M${px},${LGY+24} L${px},${py-32}`).attr("marker-end",`url(#${pre}-ar-ink)`);
  g.append("text").attr("x",px+8).attr("y",(LGY+py)/2+4).attr("class","flowlbl").text(cfg.crownLbl||"Appoints, on advice");
  const lg=g.append("g").attr("class","pmn crown").attr("transform",`translate(${px},${LGY})`).datum({type:"lg",key:"lg"});
  lg.append("rect").attr("x",-86).attr("y",-23).attr("width",172).attr("height",46).attr("rx",23).attr("class","crownbox");
  lg.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text(cfg.crown||"Lieutenant Governor");
  lg.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text(cfg.crownSub||"THE CROWN");
  g.append("path").attr("class","spoke").attr("d",`M${cx},${bot+18} V${bot+70}`);
  const of=g.append("g").attr("class","pmn officers").attr("transform",`translate(${cx},${bot+94})`).datum({type:"officers",key:"officers"});
  of.append("rect").attr("x",-170).attr("y",-24).attr("width",340).attr("height",48).attr("rx",24).attr("class","crownbox");
  of.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text(`${cfg.offLbl||"Officers of the Assembly"} · ${cfg.OFFICERS.length}`);
  of.append("text").attr("y",14).attr("text-anchor","middle").attr("class","clbl").text(cfg.offSub||"REPORT TO THE ASSEMBLY, NOT CABINET");
  // ---- ministers ----
  const mn=g.append("g").selectAll("g").data(D.mins).join("g").attr("class","pmn minister").attr("transform",m=>`translate(${m.x},${m.y})`).datum(m=>({type:"minister",key:m.id,m}));
  mn.append("rect").attr("x",-14).attr("y",-CAB.rh/2+2).attr("width",(CAB.w-24)/CAB.cols-8).attr("height",CAB.rh-4).attr("rx",7).attr("class","rowhit");
  mn.append("circle").attr("r",9.5).attr("fill",x=>G[(x.m.mpp&&x.m.mpp.group)||cfg.gov].color).attr("stroke","#ffffff80").attr("stroke-width",1);
  mn.append("circle").attr("r",3.2).attr("fill","#fff");
  mn.append("text").attr("class","mlbl2").attr("x",17).attr("dy","0.35em").text(x=>x.m.name);
  // ---- ministries ----
  const mi=g.append("g").selectAll("g").data(D.ministries).join("g").attr("class","pmn ministry").attr("transform",o=>`translate(${o.x},${o.y})`).datum(o=>({type:"ministry",key:"o_"+o.id,o}));
  mi.append("rect").attr("x",-14).attr("y",-MIN.rh/2+2).attr("width",(MIN.w-24)/MIN.cols-8).attr("height",MIN.rh-4).attr("rx",7).attr("class","rowhit");
  mi.append("rect").attr("x",-7).attr("y",-7).attr("width",14).attr("height",14).attr("rx",3.5).attr("class","mbox");
  mi.append("text").attr("class","mnlbl").attr("x",17).attr("dy","0.35em").text(x=>x.o.short);
  // ---- interaction ----
  const keyOf=d=>d.type==="mpp"?pvKeyForMpp(cfg,d.m.i):d.key;
  g.selectAll(".pmn").attr("tabindex",0).attr("role","button")
    .attr("aria-label",d=>d.type==="mpp"?`${d.m.name}, ${d.m.place}`:d.type==="minister"?`${d.m.name}, ${d.m.title}`:d.type==="ministry"?d.o.name:d.type==="premier"?`${cfg.premier.name}, Premier`:d.type==="sec"?`${cfg.sec.name}, ${cfg.sec.title}`:d.type==="lg"?`${cfg.LG.name}, ${cfg.LG.title}`:"Officers of the Assembly")
    .on("click",(e,d)=>pvSelect(cfg,keyOf(d),true)).on("keydown",(e,d)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); pvSelect(cfg,keyOf(d),true);} })
    .on("mouseenter",(e,d)=>{ pvTip(cfg,e,d); pvHighlight(cfg,keyOf(d)); }).on("mousemove",(e,d)=>pvTip(cfg,e,d))
    .on("mouseleave",()=>{ document.getElementById(`${pre}-tip`).hidden=true; pvHighlight(cfg,S.sel); });
  S.nodes=g.selectAll(".pmn"); S.links=links; S.spokes=spokes; S.flows=fl; S.seatLinks=seatLinks;
  S.zoom=d3.zoom().scaleExtent([1,6]).translateExtent([[PV_VB[0]-30,PV_VB[1]-30],[PV_VB[0]+PV_VB[2]+30,PV_VB[1]+PV_VB[3]+30]]).on("zoom",e=>zg.attr("transform",e.transform));
  svg.call(S.zoom).on("dblclick.zoom",null);
  if(!PV_RM){ const top=d3.min(D.mpps,m=>m.py);
    mg.select(".pdot").transition().delay(x=>200+(x.m.py-top)*1.3+Math.abs(x.m.px-cx)*.8).duration(380).ease(d3.easeBackOut.overshoot(1.8)).attr("r",11.5);
    fl.selectAll("path").each(function(){ const L=this.getTotalLength(); d3.select(this).attr("stroke-dasharray",`${L} ${L}`).attr("stroke-dashoffset",L).transition().delay(500).duration(1000).ease(d3.easeCubicOut).attr("stroke-dashoffset",0).on("end",function(){ d3.select(this).attr("stroke-dasharray",null); }); });
    mn.attr("opacity",0).transition().delay((x,i)=>1000+i*22).duration(300).attr("opacity",1);
    mi.attr("opacity",0).transition().delay((x,i)=>1400+i*20).duration(300).attr("opacity",1);
  }
}
function pvRelated(cfg,key){
  const D=pvS(cfg).D, s=new Set([key]); if(!key) return null;
  if(key==="premier"){ D.mins.forEach(m=>s.add(m.id)); D.premierOffices.forEach(o=>s.add("o_"+o.id)); s.add("m"+D.prem.i); s.add("sec"); return s; }
  if(key==="sec"){ D.ministries.forEach(o=>s.add("o_"+o.id)); D.premierOffices.forEach(o=>s.add("o_"+o.id)); s.add("premier"); return s; }
  if(key==="lg"){ s.add("premier"); D.mins.forEach(m=>s.add(m.id)); return s; }
  if(key==="officers"){ D.mpps.forEach(m=>s.add("m"+m.i)); return s; }
  if(key.startsWith("o_")){ const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key); o.ms.forEach(m=>{ s.add(m.id); if(m.mpp) s.add("m"+m.mpp.i); }); if(!o.ms.length){ if(cfg.deptRel) cfg.deptRel(o).forEach(k=>s.add(k)); else { s.add("premier"); s.add("m"+D.prem.i); } } return s; }
  if(/^m\d+$/.test(key)) return s;
  const mn=D.mins.find(x=>x.id===key); if(mn){ s.add("premier"); if(mn.mpp) s.add("m"+mn.mpp.i); mn.links.forEach(l=>s.add("o_"+l)); } return s;
}
function pvHighlight(cfg,key){
  const S=pvS(cfg), rel=pvRelated(cfg,key);
  S.nodes.classed("dim",d=>rel?!rel.has(d.key):false).classed("on",d=>d.key===key||(d.type==="mpp"&&pvMppOf(cfg,key)===d.m));
  S.links.classed("hot",d=>!!rel&&(key===d.m.id||key==="o_"+d.o.id)).classed("dim",d=>rel?!(rel.has(d.m.id)&&rel.has("o_"+d.o.id)):false);
  S.spokes.classed("hot",m=>key==="premier"||key===m.id).classed("dim",m=>rel?!(key==="premier"||rel.has(m.id)):false);
  S.seatLinks.classed("hot",d=>!!rel&&(d.key===key||(!!key&&key.startsWith("o_")&&rel.has(d.key)))).classed("dim",d=>!!rel&&key!=="premier"&&!rel.has(d.key));
  S.psLines.attr("opacity",key==="sec"?.6:0);
  S.flows.classed("dim",!!rel&&key!=="premier");
}
function pvRole(cfg,m){ const D=pvS(cfg).D; if(m===D.prem) return "Premier"; if(m===D.C.spk) return "Speaker"; const mn=D.mins.find(x=>x.mpp===m); if(mn) return mn.title; return (cfg.roles&&cfg.roles[m.name])||"MLA"; }
function pvTip(cfg,e,d){
  const t=document.getElementById(`${cfg.pre}-tip`), D=pvS(cfg).D, G=D.G; let h=cfg.tipHTML?cfg.tipHTML(d,D)||"":"";
  if(!h){
  if(d.type==="mpp") h=`<b>${d.m.name}</b><span>${d.m.place}</span><span class="tparty"><span class="pchip" style="--pc:${G[d.m.group].color}">${G[d.m.group].short}</span> ${pvRole(cfg,d.m)}</span>`;
  else if(d.type==="minister") h=`<b>${d.m.name}</b><span>${d.m.title}</span><span>MLA for ${d.m.mpp?d.m.mpp.place:""}</span>`;
  else if(d.type==="ministry") h=`<b>${d.o.name}</b><span>${d.o.heads.length?d.o.heads.map(x=>x.name).join(", "):"Deputy minister not confirmed here"}</span>`;
  else if(d.type==="premier") h=`<b>${cfg.premier.name}</b><span>Premier of ${cfg.region} · MLA for ${cfg.premier.place}</span>`;
  else if(d.type==="sec") h=`<b>${cfg.sec.name}</b><span>${cfg.sec.title}</span>`;
  else if(d.type==="lg") h=`<b>${cfg.LG.name}</b><span>${cfg.LG.title}</span>`;
  else h=`<b>Officers of the Assembly</b><span>${cfg.OFFICERS.map(o=>o.role).join(" · ")}</span>`;
  }
  if(cfg.memberWord) h=h.replace(/\bMLA(s?)\b/g,cfg.memberWord+"$1"); t.innerHTML=h; t.hidden=false; const r=document.getElementById(`${cfg.pre}-stage`).getBoundingClientRect(); let lx=e.clientX-r.left+16; if(lx>r.width-280) lx-=300; t.style.left=lx+"px"; t.style.top=(e.clientY-r.top+16)+"px";
}
function pvPanel(cfg,key){
  const D=pvS(cfg).D, G=D.G, C=D.C, el=document.getElementById(`${cfg.pre}-panel`), S=cfg.S; let h="";
  const seatLine=m=>m?`<div class="where"><div class="kicker">Seat in the Assembly</div><div><b>${m===C.spk?"Speaker's chair":m.side==="gov"?"Government side":"Opposition side"}</b>${m!==C.spk&&m.row?` · ${["","front","second","third","fourth"][m.row]} row`:""}</div><div class="muted" style="font-size:12px">Highlighted on the map. ${cfg.noPlan?"Grouped by party; no seating plan was available.":`From the Assembly's ${cfg.planDate} seating plan.`}</div></div>`:"";
  const head=(m,kicker,grp,place)=>{ const gr=grp||m.group; return `<div class="pband" style="--pc:${G[gr].color}"></div><div class="who"><div class="ava" style="--pc:${G[gr].color}" aria-hidden="true">${initials(m.name)}</div><div class="who-t"><div class="kicker">${kicker}</div><h2>${m.name}</h2><div class="party"><i style="background:${G[gr].color}"></i><span>${G[gr].name}${place?" · "+place:""}</span></div></div></div>`; };
  const dmList=o=>o.heads.length?`<ul class="list">${o.heads.map(x=>`<li class="item"><span class="nm">${x.name}</span><span class="rl">${x.role}</span>${srcA(S[x.src])}</li>`).join("")}</ul>`:`<p class="muted">Not confirmed in the sources checked for this page.</p>`;
  const c=chCounts(C), opp=cfg.oppLeader&&D.byName[cfg.oppLeader];
  const ov=cfg.panelHTML?cfg.panelHTML(key,D):null;
  if(ov!=null){ h=ov; }
  else if(!key){
    h=`<div class="kicker">Start here</div><h2>How power flows in ${cfg.region}</h2>
      <ol class="steps">${cfg.steps?cfg.steps.map(x=>`<li>${x}</li>`).join(""):`<li><b>Voters</b> in each of the ${cfg.total||C.members.length} ${cfg.placeNounPl} elect one MLA. The last general election was ${cfg.lastElection}.</li><li>The ${cfg.crown||"Lieutenant Governor"} asks the leader who holds the Assembly's confidence to form government. The <b>${cfg.govName} holds ${c[cfg.gov]||0} of ${cfg.total||C.members.length}</b> seats, past the ${C.majority} needed.</li><li><b>${cfg.premier.name}</b>, as Premier, chooses <b>Cabinet</b>, and the ${cfg.crown||"Lieutenant Governor"} appoints them on the Premier's advice.</li><li>Each minister directs one or more <b>${(cfg.minTitle||"ministries").toLowerCase()}</b>, which deputy ministers run day to day.</li>`}</ol>
      <h3>Key roles</h3><ul class="list"><li class="item"><button class="linkbtn" data-k="premier">${cfg.premier.name}</button><span class="rl">Premier</span></li>${opp?`<li class="item"><button class="linkbtn" data-k="m${opp.i}">${opp.name}</button><span class="rl">${cfg.oppLeaderTitle||"Leader of the Opposition"}</span></li>`:""}<li class="item"><button class="linkbtn" data-k="m${C.spk.i}">${C.spk.name}</button><span class="rl">Speaker</span></li><li class="item"><button class="linkbtn" data-k="lg">${cfg.LG.name}</button><span class="rl">${cfg.crown||"Lieutenant Governor"}</span></li></ul>
      <div class="note">Hover or tap anything. Pick a minister or ministry and a line runs back to the minister's seat.</div>${srcA(S.mla)}${srcA(S.cab)}`;
  } else if(key==="premier"){
    h=head(D.prem,`Premier of ${cfg.region}`,cfg.gov,cfg.premier.place)+`<div class="lede">${cfg.premier.lede}</div>
      <div class="statgrid" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="stat"><b>${D.mins.length}</b><span>Ministers</span></div><div class="stat"><b>${D.ministries.length}</b><span>${cfg.minTitle||"Ministries"}</span></div></div>
      <h3>Own office</h3><ul class="list">${D.premierOffices.map(o=>`<li class="item"><button class="linkbtn" data-k="o_${o.id}">${o.name}</button><span class="rl">${o.heads.length?o.heads[0].name:""}</span></li>`).join("")}</ul>${seatLine(D.prem)}${srcA(S.cab)}`;
  } else if(key==="lg"){
    h=`<div class="kicker">${cfg.crownKick||"The Crown · non-partisan"}</div><h2>${cfg.LG.name}</h2><div class="lede">${cfg.LG.title}${cfg.LG.since?" since "+cfg.LG.since:""}, ${cfg.crownRole||"representing the King in "+cfg.region}.</div>
      <h3>What the role does</h3><ul class="list"><li class="item"><span class="nm">Asks a leader to form government</span><span class="rl">The leader who holds the Assembly's confidence becomes Premier.</span></li>
      <li class="item"><span class="nm">Appoints Cabinet</span><span class="rl">Ministers are appointed on the Premier's advice.</span></li>
      <li class="item"><span class="nm">Gives Royal Assent</span><span class="rl">A bill passed by the Assembly becomes law once it receives Royal Assent.</span></li></ul>
      <div class="note">By convention, the ${cfg.crown||"Lieutenant Governor"} acts on the advice of the Premier and Cabinet, so there is no party colour here.</div>${srcA(cfg.LG.src)}`;
  } else if(key==="officers"){
    h=`<div class="kicker">Independent of government</div><h2>${cfg.offTitle||"Officers of the Legislative Assembly"}</h2><div class="lede">Appointed by and reporting to the whole Assembly, not to the Premier or Cabinet.</div>
      <ul class="list">${cfg.OFFICERS.map(o=>`<li class="item"><span class="nm">${o.name||`<span class="muted">Name not confirmed here</span>`}</span><span class="rl"><b>${o.role}</b> · ${o.what}</span>${srcA(o.src)}</li>`).join("")}</ul>`;
  } else if(key==="sec"){
    h=`<div class="kicker">Public service</div><h2>${cfg.sec.name}</h2><div class="lede">${cfg.sec.lede}</div>
      <div class="note">Public servants are non-partisan, so there is no party colour here.</div>${srcA(cfg.sec.src)}`;
  } else if(key.startsWith("o_")){
    const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key);
    h=`<div class="kicker">${o.id===cfg.execId?"Premier's office":(cfg.minNoun||"Ministry")+" · "+o.abbr}</div><h2>${o.name}</h2><h3>${o.ms.length>1?"Ministers":"Minister"}</h3>
      ${o.ms.length?`<ul class="list">${o.ms.map(m=>`<li class="item"><button class="linkbtn" data-k="${m.id}">${m.name}</button><span class="rl">${m.title}</span></li>`).join("")}</ul>`:`<ul class="list"><li class="item"><button class="linkbtn" data-k="premier">${cfg.premier.name}</button><span class="rl">Premier</span></li></ul>`}
      <h3>${o.id===cfg.execId?"Senior public servant":"Deputy minister"+(o.heads.length>1?"s":"")+" (public service)"}</h3>${dmList(o)}`;
  } else if(/^m\d+$/.test(key)){
    const m=D.mpps[+key.slice(1)], mn=D.mins.find(x=>x.mpp===m);
    if(mn) return pvPanel(cfg,mn.id); if(m===D.prem) return pvPanel(cfg,"premier");
    const role=m===C.spk?"Speaker of the Legislative Assembly":(cfg.roles&&cfg.roles[m.name])||"Member of the Legislative Assembly";
    const lede=m===C.spk?"Elected by MLAs to chair debates and keep order impartially. The Speaker votes only to break a tie."
      :(cfg.notes&&cfg.notes[m.name])||(cfg.memberLede&&cfg.memberLede[m.group])||(m.group===cfg.gov?`Sits with the governing ${cfg.govName}.`:G[m.group].name.startsWith("Independent")?"Sits as an independent member.":`Sits with the ${G[m.group].name}.`);
    h=head(m,role,null,m.place)+`<div class="lede">${lede}</div>
      <div class="role"><div class="kicker">About this role</div><p>Members of the Legislative Assembly represent one ${cfg.placeNoun} each in ${cfg.capital}, where they debate and vote on ${cfg.region}'s laws and budget and question the ${cfg.govWord||"provincial"} government.</p></div>${seatLine(m)}${srcA((cfg.noteSrc&&cfg.noteSrc[m.name])||S.mla)}`;
  } else {
    const mn=D.mins.find(x=>x.id===key);
    h=head(mn,"Cabinet minister",cfg.gov,mn.mpp?mn.mpp.place:null)+`<div class="lede">${mn.title}</div>${mn.note?`<div class="note">${mn.note}</div>`:""}
      <h3>Responsible for</h3>${mn.links.length?`<ul class="list">${mn.links.map(l=>{ const o=[...D.ministries,...D.premierOffices].find(x=>x.id===l); return o?`<li class="item"><button class="linkbtn" data-k="o_${o.id}">${o.name}</button><span class="rl">${o.heads.length?o.heads.map(x=>x.name+" · "+x.role).join("<br>"):"Deputy minister not confirmed here"}</span></li>`:""; }).join("")}</ul>`:`<p class="muted">No department of their own. The role is a responsibility within government rather than a department.</p>`}
      ${seatLine(mn.mpp)}${srcA(mn.src?S[mn.src]:S.cab)}`;
  }
  if(key) h+=`<button class="linkbtn" data-k="" style="font-size:13px">← How power flows</button>`;
  if(cfg.memberWord) h=h.replace(/\bMLA(s?)\b/g,cfg.memberWord+"$1"); el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); el.innerHTML=h;
  el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>pvSelect(cfg,b.dataset.k||null,!!b.dataset.k));
  if(cfg.afterPanel) cfg.afterPanel(el,key);
}
function pvPoint(cfg,key){ const D=pvS(cfg).D;
  if(key==="premier") return D.premier; if(key==="sec") return D.sec; if(key==="lg") return D.lgPt; if(key==="officers") return D.offPt;
  if(key.startsWith("o_")){ const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key); return [o.x,o.y]; }
  if(/^m\d+$/.test(key)){ const m=D.mpps[+key.slice(1)]; return [m.px,m.py]; }
  const mn=D.mins.find(x=>x.id===key); return mn?[mn.x,mn.y]:[0,0]; }
function pvSelect(cfg,key,zoom){
  const S=pvS(cfg); S.sel=key||null; pvHighlight(cfg,S.sel); pvPanel(cfg,S.sel);
  const st=chState[cfg.id], m=pvMppOf(cfg,S.sel); st.sel=m?m.i:null; st.panel=null; st.focus=null;
  chSummary(CH[cfg.id]); chList(CH[cfg.id]);
  const svg=d3.select(`#${cfg.pre}-svg`);
  if(zoom&&key&&/^m\d+$/.test(key)){ const [x,y]=pvPoint(cfg,key), k=2.6, cx=PV_VB[0]+PV_VB[2]/2, cy=PV_VB[1]+PV_VB[3]/2;
    svg.transition().duration(PV_RM?0:750).ease(d3.easeCubicInOut).call(S.zoom.transform,d3.zoomIdentity.translate(cx-x*k,cy-y*k).scale(k)); }
  else svg.transition().duration(PV_RM?0:600).call(S.zoom.transform,d3.zoomIdentity);
  if(key) document.getElementById(`${cfg.pre}-panel`).scrollIntoView({behavior:PV_RM?"auto":"smooth",block:"nearest"});
}
function pvFocus(cfg,fk){ if(!fk||fk.startsWith("ch:")) return; if(cfg.focusMap&&fk in cfg.focusMap){ fk=cfg.focusMap[fk]; if(!fk) return; } if(fk==="hub") return pvSelect(cfg,"premier",true); if(fk==="head") return pvSelect(cfg,"sec",true); pvSelect(cfg,fk,true); }
function pvSearchIndex(cfg){ const D=pvS(cfg).D, idx=[];
  D.mpps.forEach(m=>idx.push({k:pvKeyForMpp(cfg,m.i),label:m.name,sub:`${D.G[m.group].short} · ${m.place} · ${pvRole(cfg,m)}`}));
  [...D.ministries,...D.premierOffices].forEach(o=>{ idx.push({k:"o_"+o.id,label:o.name,sub:o.abbr}); o.heads.forEach(x=>idx.push({k:"o_"+o.id,label:x.name,sub:x.role+" · "+o.abbr})); });
  idx.push({k:"sec",label:cfg.sec.name,sub:cfg.sec.title},{k:"lg",label:cfg.LG.name,sub:cfg.LG.title});
  cfg.OFFICERS.forEach(o=>idx.push({k:"officers",label:o.name||o.role,sub:o.role}));
  return idx; }
function renderPvMap(cfg){
  const S=pvS(cfg), pre=cfg.pre; if(S.built) return;
  const slot=document.getElementById(`${pre}-slot`); if(!slot) return;
  slot.innerHTML=`<div class="pmbar ${pre}bar"><label class="search" for="${pre}-q"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg>
      <input id="${pre}-q" type="search" placeholder="${cfg.searchPh||`Search an ${cfg.memberWord||"MLA"}, ${cfg.placeNoun}, minister or ${(cfg.minNoun||"ministry").toLowerCase()}`}" autocomplete="off" aria-label="Search ${cfg.region}"><ul class="results" id="${pre}-res" hidden></ul></label>
      <div class="zbtn"><button id="${pre}-zin" aria-label="Zoom in" title="Zoom in">+</button><button id="${pre}-zout" aria-label="Zoom out" title="Zoom out">−</button><button id="${pre}-zr" aria-label="Reset the chamber" title="Reset the chamber" class="zreset"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7"/><path d="M3 2.5v3h3"/></svg><span>Reset</span></button></div></div>
    <div class="pmgrid"><div class="pmstage" id="${pre}-stage"><svg id="${pre}-svg" viewBox="${PV_VB.join(" ")}" role="img" aria-label="${cfg.region} power map: the Legislative Assembly, Premier, Cabinet and ${(cfg.minTitle||"ministries").toLowerCase()}"></svg><div class="tip" id="${pre}-tip" hidden></div></div>
      <aside class="hpanel pmpanel" id="${pre}-panel" aria-live="polite"></aside></div>`;
  pvBuild(cfg);
  const svg=d3.select(`#${pre}-svg`);
  document.getElementById(`${pre}-zin`).onclick=()=>svg.transition().duration(300).call(S.zoom.scaleBy,1.4);
  document.getElementById(`${pre}-zout`).onclick=()=>svg.transition().duration(300).call(S.zoom.scaleBy,1/1.4);
  document.getElementById(`${pre}-zr`).onclick=()=>pvSelect(cfg,null,false);
  const idx=pvSearchIndex(cfg), q=document.getElementById(`${pre}-q`), res=document.getElementById(`${pre}-res`);
  q.addEventListener("input",()=>{ const t=q.value.trim().toLowerCase(); if(!t){res.hidden=true;return}
    const hits=idx.filter(i=>(i.label+" "+i.sub).toLowerCase().includes(t)).slice(0,12);
    res.innerHTML=hits.length?hits.map((h,i)=>`<li><button data-i="${i}">${h.label}<small>${h.sub}</small></button></li>`).join(""):`<li style="padding:7px 10px;color:var(--muted)">No match</li>`; res.hidden=false;
    res.querySelectorAll("button").forEach(b=>b.onclick=()=>{ pvSelect(cfg,hits[+b.dataset.i].k,true); res.hidden=true; q.value=""; }); });
  q.addEventListener("keydown",e=>{ if(e.key==="Escape") res.hidden=true; if(e.key==="Enter"){ e.preventDefault(); const b=res.querySelector("button"); if(b) b.click(); } });
  document.addEventListener("click",e=>{ if(!e.target.closest(`.${pre}bar .search`)) res.hidden=true; });
  S.built=true;
}
/* generic page wrapper: summary, power map, About, changes log */
function renderPvLeg(cfg){
  const C=CH[cfg.id], st=chState[cfg.id], el=document.getElementById("ch-"+cfg.id);
  if(!st.built){
    el.innerHTML=`<section class="hsum" id="${cfg.id}-sum"></section>
     <section class="nsec pmwrap"><div class="kicker">Power map · ${cfg.capital}</div><h2 class="nh pmtitle">Elected Officials</h2>
       ${foldHTML(cfg.pre+"-fold","How to read this map","What each part means and how to explore it",
         cfg.foldLeft||[["The room on the left",`is where ${cfg.region}'s laws are made. Each dot is one MLA, a person voters chose to speak for their area. ${cfg.colourNote||"The colour shows their party."}`],
          ["The Premier","is the leader of the government. It is the leader who has the support of most MLAs."],
          ["Cabinet","is the Premier's team. Each minister is also an MLA with a seat in the room."],
          [cfg.minTitle||"Ministries",`are the ${cfg.minNoun==="Department"?"departments":"departments"} that do the work, like Health or Finance. Cabinet ministers are in charge of them, and a deputy minister runs each one every day.`]],
         cfg.foldRight||[["Point at","or tap any dot, name or box to see who it is."],["Click a minister","to draw a line to their seat and to what they are responsible for."],[`Click a ${(cfg.minNoun||"ministry").toLowerCase()}`,"to see who is in charge of it and where they sit."],["Search",`for any MLA, ${cfg.placeNoun}, minister or ${(cfg.minNoun||"ministry").toLowerCase()}. Details appear in the box under the map.`]],
         cfg.foldNote)}
       <div id="${cfg.pre}-slot"></div>
       <div class="src">${cfg.noPlan?"":`Every MLA is shown at their desk on the Assembly's ${cfg.planDate} seating plan. `}${cfg.planNote||""}</div>${srcA(cfg.S.plan)}</section>
     <div class="hgrid"><div class="hmain">${cfg.aboutHTML||`<section class="nsec"><div class="kicker">About the Assembly</div><h2 class="nh">What the Legislative Assembly does</h2>
        <div class="does">
         <div><b>Forms the government</b><span>The leader who can win the support of most MLAs becomes Premier and picks Cabinet. That is usually the leader of the party with the most seats.</span></div>
         <div><b>Makes laws</b><span>Bills are debated here and in committees, then need ${cfg.assent||"Royal Assent"} from the ${cfg.crown||"Lieutenant Governor"}. ${cfg.region} has no upper house.</span></div>
         <div><b>Holds the government to account</b><span>Opposition MLAs question ministers, most visibly in daily Question Period.</span></div>
         <div><b>Controls the money</b><span>Budgets, spending estimates and taxes must be approved by the Assembly.</span></div>
         <div><b>Represents ${cfg.region}</b><span>Each of the ${cfg.total||C.members.length} MLAs speaks for one ${cfg.placeNoun}.</span></div>
        </div>
        <div class="who4"><span><b>Speaker</b> elected by MLAs; keeps order impartially</span><span><b>Cabinet</b> leads ${(cfg.minTitle||"ministries").toLowerCase()}; front bench</span><span><b>Opposition</b> questions and proposes alternatives</span><span><b>Backbenchers</b> most MLAs; debate and sit on committees</span></div>
       </section>`}</div>
       <div class="hside">${cfg.ridingKey?ridingBtn(cfg.ridingKey):""}<section class="nsec"><div class="lgh"><h2 class="nh">Changes since the ${cfg.geYear} election</h2></div>
        <ol class="hlog">${cfg.LOG.length?"":`<li class="lgi"><span class="lg-t" style="padding:10px"><span class="muted">No changes in membership since the election.</span></span></li>`}${cfg.LOG.map(x=>{ const m=C.members.find(mm=>mm.name===x[2])||C.members.find(mm=>mm.place===x[3]); const chip=g=>g?`<span class="pchip" style="--pc:${C.groups[g].color}">${C.groups[g].short}</span>`:"";
          return `<li class="lgi"><button data-i="${m?m.i:""}"><span class="lg-t"><b>${x[2]}</b><span>${x[3]}</span><span class="muted">${x[6]}</span></span><span class="lg-c">${chip(x[4])}${x[4]?`<span class="arr">→</span>`:""}${chip(x[5])}</span></button></li>`; }).join("")}</ol>
        ${cfg.logSrcs.map(s=>srcA(s)).join("")}</section></div></div>`;
    if(cfg.memberWord) el.querySelectorAll(".nsec").forEach(x=>{ x.innerHTML=x.innerHTML.replace(/\bMLA(s?)\b/g,cfg.memberWord+"$1"); });
    el.querySelectorAll(".hlog [data-i]").forEach(b=>{ if(b.dataset.i!=="") b.onclick=()=>chSelect(C,+b.dataset.i,true); });
    renderPvMap(cfg); wireFold(cfg.pre+"-fold");
    if(cfg.after) cfg.after(el);
    st.built=true;
  }
  chSummary(C); chProfile(C); chList(C);
}
function pvWire(cfg){ const C=CH[cfg.id];
  C.map={svg:`#${cfg.pre}-svg`,panelId:`${cfg.pre}-panel`,stageId:`${cfg.pre}-stage`,st:()=>pvS(cfg),panel:k=>pvPanel(cfg,k),hl:k=>pvHighlight(cfg,k),select:(k,z)=>pvSelect(cfg,k,z),key:i=>pvKeyForMpp(cfg,i)};
  chState[cfg.id]={sel:null,focus:null,built:false}; PV_CFG[cfg.id]=cfg; }
const PV_CFG={};
