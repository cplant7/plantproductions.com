/* ================= ONTARIO POWER MAP ================= */
// Left: the Legislature as it sits (Speaker at the top). Middle: People → Premier. Right: a Cabinet card above a Ministries card.
const PM={built:false,sel:null};
const PM_RM=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const PM_MID=-62;                                   // middle column (People, Premier)
const PM_WC=[PM_MID,-70];                           // People of Ontario
const PM_CX=-340;
const PM_DK=0.138, PM_DCX=1651, PM_DCY=2720; const pmDT=(x,y)=>[PM_CX+(x-PM_DCX)*PM_DK,(y-PM_DCY)*PM_DK];                                   // chamber aisle (x)
const PM_CAB={x:70,y:-500,w:620,cols:3,rh:28,head:74};
const PM_MIN={x:70,y:-78,w:620,cols:2,rh:26,head:74};
const PM_VB=[-610,-530,1310,1000];

function pmData(){
  const C=CH.ontario, G=C.groups;
  const mins=[]; ON_SECTORS.forEach(s=>s.ids.forEach(id=>mins.push(ON_MIN.find(m=>m.id===id))));
  C.cabOrder={"Doug Ford":-1}; mins.forEach((m,k)=>C.cabOrder[m.ola]=k);
  chLayout(C);
  const mid=((C.X0-80)+C.W)/2; PM.mid=mid;
  const P=(x,y)=>[PM_CX-y, x-mid];        // chamber coords → portrait (Speaker on top, government on the left)
  PM.P=P;
  PM.desk=onApplyDesks();
  const mpps=C.members; const byOla={}; mpps.forEach(m=>{ byOla[m.name]=m; [m.px,m.py]=PM.desk&&m.dx!=null?pmDT(m.dx,m.dy):P(m.x,m.y); });
  const grid=(B,n,k)=>{ const per=Math.ceil(n/B.cols), cw=(B.w-24)/B.cols, c=Math.floor(k/per), r=k%per; return [B.x+24+c*cw, B.y+B.head+r*B.rh+B.rh/2]; };
  PM_CAB.h=PM_CAB.head+Math.ceil(mins.length/PM_CAB.cols)*PM_CAB.rh+12;
  mins.forEach((m,k)=>{ [m.x,m.y]=grid(PM_CAB,mins.length,k); m.mpp=byOla[m.ola]; m.k=k; });
  const ministries=ON_OUT.filter(o=>o.id!=="cab"&&o.id!=="iga");
  ministries.forEach(o=>{ const ms=mins.filter(m=>m.links.includes(o.id)); o.ms=ms; o.t=ms.length?d3.mean(ms,m=>m.k):0; });
  ministries.sort((p,q)=>p.t-q.t);
  PM_MIN.y=PM_CAB.y+PM_CAB.h+30;
  PM_MIN.h=PM_MIN.head+Math.ceil(ministries.length/PM_MIN.cols)*PM_MIN.rh+12;
  ministries.forEach((o,k)=>{ [o.x,o.y]=grid(PM_MIN,ministries.length,k);
    let sn=o.name.replace(/^Ministry (of|for) (the )?/,""); o.short=sn; });
  const premierOffices=ON_OUT.filter(o=>o.id==="cab"||o.id==="iga");
  premierOffices.forEach((o,k)=>{ o.x=PM_MID+(k?54:-54); o.y=80; o.ms=[]; });
  return {C,G,mpps,byOla,spk:C.spk,mins,ministries,premierOffices,ford:byOla["Doug Ford"],P,mid,
    premier:[PM_MID,-40], sec:[PM_MID,190]};
}
function pmKeyForMpp(i){ const D=PM.D, m=D.mpps[i]; const mn=D.mins.find(x=>x.mpp===m); return mn?mn.id:m===D.ford?"premier":"m"+i; }
function pmMppOf(key){ const D=PM.D; if(!key) return null; if(key==="premier") return D.ford; if(/^m\d+$/.test(key)) return D.mpps[+key.slice(1)]; const mn=D.mins.find(x=>x.id===key); return mn?mn.mpp:null; }

function pmBuild(){
  const D=PM.D=pmData(); const {G,C,P,mid}=D;
  const svg=d3.select("#pm-svg"); svg.selectAll("*").remove();
  const defs=svg.append("defs");
  ["ink","accent"].forEach(k=>defs.append("marker").attr("id","pm-ar-"+k).attr("viewBox","0 0 10 10").attr("refX",8).attr("refY",5).attr("markerWidth",7).attr("markerHeight",7).attr("orient","auto-start-reverse")
    .append("path").attr("d","M0,0 L10,5 L0,10 z").attr("fill",k==="ink"?"var(--ink)":"var(--brass)"));
  const zg=svg.append("g"), g=zg.append("g");
  const card=(B,t1,t2)=>{ g.append("rect").attr("x",B.x).attr("y",B.y).attr("width",B.w).attr("height",B.h).attr("rx",16).attr("class","pmcard");
    const t=g.append("text").attr("x",B.x+22).attr("y",B.y+36).attr("class","pmcardh"); t.append("tspan").text(t1); t.append("tspan").attr("class","pmcardn").text("  ·  "+t2[0]);
    g.append("text").attr("x",B.x+22).attr("y",B.y+56).attr("class","pmcards").text(t2[1]); };
  card(PM_CAB,"Cabinet",["36 ministers","All are elected PC MPPs. Smaller dots are associate ministers."]);
  card(PM_MIN,"Ministries",["31","Each is run day to day by a deputy minister from the public service."]);
  // ---- chamber (portrait) ----
  const ch=g.append("g").attr("class","pmchamber");
  const rows=C.rows, gl=C.govList, ol=C.oppList;
  let top,bot,oppRows=3,gx,ox,lx1,lx2;
  if(PM.desk){
    const T=pmDT; top=(560-PM_DCY)*PM_DK+6; bot=(4883-PM_DCY)*PM_DK;
    const ax0=T(1427+24,0)[0], ax1=T(1875-24,0)[0];
    ch.append("rect").attr("x",ax0).attr("y",top+34).attr("width",ax1-ax0).attr("height",bot-top-34).attr("rx",8).attr("fill","#ffffff07");
    ch.append("rect").attr("x",PM_CX-18).attr("y",T(0,1050)[1]).attr("width",36).attr("height",62).attr("rx",5).attr("fill","none").attr("stroke","var(--rule)");
    ch.append("text").attr("x",PM_CX).attr("y",T(0,1050)[1]+78).attr("text-anchor","middle").attr("class","clbl").text("TABLE");
    ON_DESKS.desks.forEach(([x,y,w,h])=>{ const inn=D.mpps.filter(m=>m.dx>=x&&m.dx<=x+w&&m.dy>=y&&m.dy<=y+h); const gr=inn[0]?inn[0].group:null, front=inn[0]&&inn[0].row===1; const [a,b2]=T(x,y);
      ch.append("rect").attr("x",a+2).attr("y",b2+2).attr("width",w*PM_DK-4).attr("height",h*PM_DK-4).attr("rx",9).attr("class",front?"pmdesk front":"pmdesk").attr("fill",front?"#222":"#1b1b1b");
      if(gr&&gr!=="pc") ch.append("rect").attr("x",a).attr("y",b2).attr("width",w*PM_DK).attr("height",h*PM_DK).attr("rx",11).attr("class","pmblock").attr("stroke",G[gr].color); });
    const [sx,sy]=[D.spk.px,D.spk.py];
    ch.append("rect").attr("x",sx-24).attr("y",sy-24).attr("width",48).attr("height",48).attr("rx",10).attr("fill","none").attr("stroke","var(--brass)").attr("stroke-width",2);
    ch.append("text").attr("x",sx+34).attr("y",sy+4).attr("class","clbl brass").text("SPEAKER");
    gx=d3.mean([T(335,0)[0],T(1273,0)[0]]); ox=d3.mean([T(2029,0)[0],T(2968,0)[0]]); lx1=T(181,0)[0]-6; lx2=T(3121,0)[0]+6;
  } else {
  const rows=C.rows, gl=C.govList, ol=C.oppList;
  const rect=(x,y,w,h)=>{ const [a,b]=P(x,y), [c,d]=P(x+w,y+h); return {x:Math.min(a,c),y:Math.min(b,d),w:Math.abs(c-a),h:Math.abs(d-b)}; };
  const R=(sel,r,cls)=>sel.append("rect").attr("x",r.x).attr("y",r.y).attr("width",r.w).attr("height",r.h).attr("class",cls||null);
  top=C.X0-mid; bot=C.W-mid;
  ch.append("rect").attr("x",PM_CX-30).attr("y",top-20).attr("width",60).attr("height",bot-top+40).attr("rx",8).attr("fill","#ffffff08");
  [[gl,1],[ol,-1]].forEach(([list,side])=>{ for(let r=0;r<rows;r++){ const row=list.slice(r*C.cols,(r+1)*C.cols); if(!row.length) continue; const y=side*C.rowY(r);
      if(r===0) R(ch,rect(C.colX(0)-26,y-22,C.colX(row.length-1)-C.colX(0)+52,44),"pmfront").attr("rx",12);
      const shade=[30,26,23,21,19,17][r];
      for(let c=0;c<row.length;c+=2){ const a=C.colX(c)-15, b=C.colX(Math.min(c+1,row.length-1))+15; R(ch,rect(a,y-15,b-a,30),r===0?"pmdesk front":"pmdesk").attr("rx",9).attr("fill",`rgb(${shade},${shade},${shade})`); }
      let s=0; for(let c=1;c<=row.length;c++){ if(c===row.length||row[c].group!==row[s].group){ const gr=row[s].group; if(gr!=="pc") R(ch,rect(C.colX(s)-18,y-18.5,C.colX(c-1)-C.colX(s)+36,37),"pmblock").attr("rx",12).attr("stroke",G[gr].color); s=c; } }
  } });
  const [sx,sy]=P(D.spk.x,0);
  ch.append("rect").attr("x",sx-24).attr("y",sy-24).attr("width",48).attr("height",48).attr("rx",10).attr("fill","none").attr("stroke","var(--brass)").attr("stroke-width",2);
  ch.append("text").attr("x",sx+34).attr("y",sy+4).attr("class","clbl brass").text("SPEAKER");
  oppRows=Math.ceil(ol.length/C.cols);
  gx=d3.mean([PM_CX-C.rowY(0),PM_CX-C.rowY(rows-1)]);  ox=d3.mean([PM_CX+C.rowY(0),PM_CX+C.rowY(oppRows-1)]);
    lx1=PM_CX-C.rowY(rows-1)-16; lx2=PM_CX+C.rowY(oppRows-1)+16;
  }
  ch.append("text").attr("x",gx).attr("y",bot+48).attr("text-anchor","middle").attr("class","clbl side").text("GOVERNMENT");
  ch.append("text").attr("x",gx).attr("y",bot+64).attr("text-anchor","middle").attr("class","clbl").text("SPEAKER'S RIGHT");
  ch.append("text").attr("x",ox).attr("y",bot+48).attr("text-anchor","middle").attr("class","clbl side").text("OPPOSITION");
  ch.append("text").attr("x",ox).attr("y",bot+64).attr("text-anchor","middle").attr("class","clbl").text("SPEAKER'S LEFT");
  { const t=ch.append("text").attr("x",PM_CX).attr("y",top-150).attr("text-anchor","middle").attr("class","pmcardh"); t.append("tspan").text("Legislative Assembly of Ontario");
    ch.append("text").attr("x",PM_CX).attr("y",top-128).attr("text-anchor","middle").attr("class","pmcards").text("124 MPPs, 1 per riding, representing the People of Ontario"); }
  ch.append("line").attr("x1",lx1).attr("x2",lx2).attr("y1",bot+28).attr("y2",bot+28).attr("stroke","var(--brass)").attr("stroke-width",2).attr("stroke-dasharray","4 5");

  // ---- flows ----
  const fl=g.append("g").attr("class","flows");
  const arrow=(d,cls,mk)=>fl.append("path").attr("d",d).attr("class","flow "+cls).attr("marker-end",`url(#pm-ar-${mk||"ink"})`);
  const lbl=(x,y,t,anchor,cls)=>fl.append("text").attr("x",x).attr("y",y).attr("text-anchor",anchor||"middle").attr("class",cls||"flowlbl").text(t);
  const oppEdge=PM_CX+C.rowY(oppRows-1)+22, [wx,wy]=PM_WC;
  const F=D.ford, [px,py]=D.premier;
  arrow(`M${F.px},${F.py-16} C${F.px},${top-150} -172,${top-150} -172,${top-40} L-172,${py-70} C-172,${py-10} ${px-110},${py} ${px-76},${py}`,"f-conf","accent");
  lbl(-150,top-112,"Leader with the Assembly's","start");lbl(-150,top-97,"confidence becomes Premier","start");
  arrow(`M${px+72},${py} C${px+110},${py} ${PM_CAB.x-50},${PM_CAB.y+PM_CAB.h-60} ${PM_CAB.x-6},${PM_CAB.y+PM_CAB.h-60}`,"f-app");
  lbl(px+78,py+24,"Chooses","start","flowlbl big");lbl(px+78,py+40,"Cabinet","start","flowlbl big");
  arrow(`M${PM_CAB.x+PM_CAB.w/2},${PM_CAB.y+PM_CAB.h+2} L${PM_CAB.x+PM_CAB.w/2},${PM_MIN.y-4}`,"f-app");
  lbl(PM_CAB.x+PM_CAB.w/2+12,PM_MIN.y-10,"Ministers direct ministries","start","flowlbl big");
  // hidden until something is chosen: seat links, Premier spokes, minister → ministry links
  const SL=[{key:"premier",x:px,y:py,m:F},...D.mins.map(mn=>({key:mn.id,x:mn.x,y:mn.y,m:mn.mpp}))];
  const seatLinks=g.append("g").selectAll("path").data(SL).join("path").attr("class","seatlink")
    .attr("d",d=>`M${d.x-10},${d.y} C${d.x-240},${d.y} ${d.m.px+220},${d.m.py} ${d.m.px+12},${d.m.py}`);
  const spokes=g.append("g").selectAll("path").data(D.mins).join("path").attr("class","spoke ms").attr("d",m=>`M${px+40},${py} C${px+160},${py} ${m.x-120},${m.y} ${m.x-11},${m.y}`);
  const L=[]; D.mins.forEach(m=>m.links.forEach(l=>{ const o=D.ministries.find(x=>x.id===l); if(o) L.push({m,o}); }));
  const links=g.append("g").selectAll("path").data(L).join("path").attr("class","mlink").attr("d",d=>`M${d.m.x-11},${d.m.y} C${PM_CAB.x-40},${d.m.y} ${PM_MIN.x-40},${d.o.y} ${d.o.x-9},${d.o.y}`);
  PM.psLines=g.append("g").selectAll("path").data(D.ministries).join("path").attr("class","psline").attr("d",o=>`M${D.sec[0]+80},${D.sec[1]} C${D.sec[0]+180},${D.sec[1]} ${o.x-120},${o.y} ${o.x-9},${o.y}`).attr("opacity",0);

  // ---- MPP seats ----
  const mg=g.append("g").selectAll("g").data(D.mpps).join("g").attr("class","pmn mpp").attr("transform",m=>`translate(${m.px},${m.py})`).datum(m=>({type:"mpp",key:"m"+m.i,m}));
  mg.append("circle").attr("class","pdot").attr("r",PM_RM?11.5:0).attr("fill",x=>G[x.m.group].color);
  mg.filter(x=>x.m.hon).append("circle").attr("r",3.6).attr("fill","#0a0a0a").attr("pointer-events","none");
  // ---- Premier, offices, Secretary ----
  g.append("path").attr("class","spoke").attr("d",`M${px},${py+58} V${py+80} M${px-54},${D.premierOffices[0].y-12} V${py+80} H${px+54} V${D.premierOffices[0].y-12} M${px},${py+80} V${D.sec[1]-21}`);
  const pr=g.append("g").attr("class","pmn premier").attr("transform",`translate(${px},${py})`).datum({type:"premier",key:"premier"});
  pr.append("rect").attr("x",-72).attr("y",-28).attr("width",144).attr("height",56).attr("rx",16).attr("class","prbox");
  pr.append("text").attr("y",8).attr("text-anchor","middle").attr("class","pminit").text("Premier");
  g.append("text").attr("x",px).attr("y",py+50).attr("text-anchor","middle").attr("class","pmname").text("Doug Ford");
  const po=g.append("g").selectAll("g").data(D.premierOffices).join("g").attr("class","pmn office").attr("transform",o=>`translate(${o.x},${o.y})`).datum(o=>({type:"ministry",key:"o_"+o.id,o}));
  po.append("rect").attr("x",-11).attr("y",-11).attr("width",22).attr("height",22).attr("rx",5).attr("class","mbox");
  po.append("text").attr("y",30).attr("text-anchor","middle").attr("class","olbl big").text(x=>x.o.id==="cab"?"Cabinet Office":"IGA");
  const sc=g.append("g").attr("class","pmn sec").attr("transform",`translate(${D.sec[0]},${D.sec[1]})`).datum({type:"sec",key:"sec"});
  sc.append("rect").attr("x",-80).attr("y",-20).attr("width",160).attr("height",40).attr("rx",20).attr("class","secbox");
  sc.append("text").attr("y",-2).attr("text-anchor","middle").attr("class","seclbl").text("Secretary of Cabinet");
  sc.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text("PUBLIC SERVICE");
  // ---- the Crown and the officers of the Legislature ----
  const LGY=-210; D.lgPt=[px,LGY]; D.offPt=[PM_CX,bot+118];
  g.append("path").attr("class","flow f-crown").attr("d",`M${px},${LGY+24} L${px},${py-32}`).attr("marker-end","url(#pm-ar-ink)");
  g.append("text").attr("x",px+8).attr("y",(LGY+py)/2+4).attr("class","flowlbl").text("Appoints, on advice");
  const lg=g.append("g").attr("class","pmn crown").attr("transform",`translate(${px},${LGY})`).datum({type:"lg",key:"lg"});
  lg.append("rect").attr("x",-86).attr("y",-23).attr("width",172).attr("height",46).attr("rx",23).attr("class","crownbox");
  lg.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text("Lieutenant Governor");
  lg.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text("THE CROWN");
  g.append("path").attr("class","spoke").attr("d",`M${PM_CX},${bot+30} V${bot+94}`);
  const of=g.append("g").attr("class","pmn officers").attr("transform",`translate(${PM_CX},${bot+118})`).datum({type:"officers",key:"officers"});
  of.append("rect").attr("x",-170).attr("y",-24).attr("width",340).attr("height",48).attr("rx",24).attr("class","crownbox");
  of.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text("Officers of the Legislature · 6");
  of.append("text").attr("y",14).attr("text-anchor","middle").attr("class","clbl").text("REPORT TO THE ASSEMBLY, NOT CABINET");
  PM.critG=g.append("g").attr("class","critg");
  // ---- ministers ----
  const mn=g.append("g").selectAll("g").data(D.mins).join("g").attr("class","pmn minister").attr("transform",m=>`translate(${m.x},${m.y})`).datum(m=>({type:"minister",key:m.id,m}));
  mn.append("rect").attr("x",-14).attr("y",-PM_CAB.rh/2+2).attr("width",(PM_CAB.w-24)/PM_CAB.cols-8).attr("height",PM_CAB.rh-4).attr("rx",7).attr("class","rowhit");
  mn.append("circle").attr("r",m=>m.m.assoc?7:9.5).attr("fill","var(--p-cpc)").attr("stroke","#ffffff80").attr("stroke-width",1);
  mn.append("circle").attr("r",m=>m.m.assoc?2.4:3.2).attr("fill","#fff");
  mn.append("text").attr("class","mlbl2").attr("x",17).attr("dy","0.35em").text(x=>x.m.name);
  // ---- ministries ----
  const mi=g.append("g").selectAll("g").data(D.ministries).join("g").attr("class","pmn ministry").attr("transform",o=>`translate(${o.x},${o.y})`).datum(o=>({type:"ministry",key:"o_"+o.id,o}));
  mi.append("rect").attr("x",-14).attr("y",-PM_MIN.rh/2+2).attr("width",(PM_MIN.w-24)/PM_MIN.cols-8).attr("height",PM_MIN.rh-4).attr("rx",7).attr("class","rowhit");
  mi.append("rect").attr("x",-7).attr("y",-7).attr("width",14).attr("height",14).attr("rx",3.5).attr("class","mbox");
  mi.append("text").attr("class","mnlbl").attr("x",17).attr("dy","0.35em").text(x=>x.o.short);
  // ---- interaction ----
  const keyOf=d=>d.type==="mpp"?pmKeyForMpp(d.m.i):d.key;
  g.selectAll(".pmn").attr("tabindex",0).attr("role","button")
    .attr("aria-label",d=>d.type==="mpp"?`${d.m.name}, ${d.m.place}`:d.type==="minister"?`${d.m.name}, ${d.m.title}`:d.type==="ministry"?d.o.name:d.type==="premier"?"Doug Ford, Premier":d.type==="sec"?"Secretary of the Cabinet":d.type==="lg"?`${ON_LG.name}, ${ON_LG.title}`:d.type==="officers"?"Officers of the Legislature":"People of Ontario")
    .on("click",(e,d)=>pmSelect(keyOf(d),true)).on("keydown",(e,d)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); pmSelect(keyOf(d),true);} })
    .on("mouseenter",(e,d)=>{ pmTip(e,d); pmHighlight(keyOf(d)); }).on("mousemove",(e,d)=>pmTip(e,d))
    .on("mouseleave",()=>{ document.getElementById("pm-tip").hidden=true; pmHighlight(PM.sel); });
  PM.nodes=g.selectAll(".pmn"); PM.links=links; PM.spokes=spokes; PM.flows=fl; PM.seatLinks=seatLinks;
  PM.zoom=d3.zoom().scaleExtent([1,6]).translateExtent([[PM_VB[0]-30,PM_VB[1]-30],[PM_VB[0]+PM_VB[2]+30,PM_VB[1]+PM_VB[3]+30]]).on("zoom",e=>zg.attr("transform",e.transform));
  svg.call(PM.zoom).on("dblclick.zoom",null);
  if(!PM_RM){
    mg.select(".pdot").transition().delay(x=>200+(x.m.py-top)*1.3+Math.abs(x.m.px-PM_CX)*.8).duration(380).ease(d3.easeBackOut.overshoot(1.8)).attr("r",11.5);
    fl.selectAll("path").each(function(){ const L=this.getTotalLength(); d3.select(this).attr("stroke-dasharray",`${L} ${L}`).attr("stroke-dashoffset",L).transition().delay(500).duration(1000).ease(d3.easeCubicOut).attr("stroke-dashoffset",0).on("end",function(){ d3.select(this).attr("stroke-dasharray",null); }); });
    mn.attr("opacity",0).transition().delay((x,i)=>1000+i*22).duration(300).attr("opacity",1);
    mi.attr("opacity",0).transition().delay((x,i)=>1400+i*20).duration(300).attr("opacity",1);
  }
}

function pmRelated(key){
  const D=PM.D, s=new Set([key]);
  if(!key) return null;
  if(key==="people"){ D.mpps.forEach(m=>s.add("m"+m.i)); return s; }
  if(key==="premier"){ D.mins.forEach(m=>s.add(m.id)); D.premierOffices.forEach(o=>s.add("o_"+o.id)); s.add("m"+D.ford.i); s.add("sec"); return s; }
  if(key==="sec"){ D.ministries.forEach(o=>s.add("o_"+o.id)); D.premierOffices.forEach(o=>s.add("o_"+o.id)); s.add("premier"); return s; }
  if(key.startsWith("o_")){ const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key); o.ms.forEach(m=>{ s.add(m.id); s.add("m"+m.mpp.i); }); if(!o.ms.length){ s.add("premier"); s.add("m"+D.ford.i); } onCritics().filter(c=>c.ids.includes(o.id)).forEach(c=>s.add("m"+c.m.i)); return s; }
  if(key==="lg"){ s.add("premier"); D.mins.forEach(m=>s.add(m.id)); return s; }
  if(key==="officers"){ D.mpps.forEach(m=>s.add("m"+m.i)); return s; }
  if(/^m\d+$/.test(key)){ const m=D.mpps[+key.slice(1)]; onCritics().filter(c=>c.m===m).forEach(c=>c.ids.forEach(id=>s.add("o_"+id))); return s; }
  const mn=D.mins.find(x=>x.id===key); if(mn){ s.add("premier"); s.add("m"+mn.mpp.i); mn.links.forEach(l=>s.add("o_"+l)); } return s;
}
function pmHighlight(key){
  const rel=pmRelated(key);
  PM.nodes.classed("dim",d=>rel?!rel.has(d.key):false).classed("on",d=>d.key===key||(d.type==="mpp"&&pmMppOf(key)===d.m));
  PM.links.classed("hot",d=>!!rel&&(key===d.m.id||key==="o_"+d.o.id)).classed("dim",d=>rel?!(rel.has(d.m.id)&&rel.has("o_"+d.o.id)):false);
  PM.spokes.classed("hot",m=>key==="premier"||key===m.id).classed("dim",m=>rel?!(key==="premier"||rel.has(m.id)):false);
  PM.seatLinks.classed("hot",d=>!!rel&&(d.key===key||(!!key&&key.startsWith("o_")&&rel.has(d.key)))).classed("dim",d=>!!rel&&key!=="premier"&&!rel.has(d.key));
  PM.psLines.attr("opacity",key==="sec"?.6:0);
  PM.flows.classed("dim",!!rel&&key!=="people"&&key!=="premier");
  // opposition critics: dashed line from the ministry to each critic's seat
  const D=PM.D, pairs=[]; const allO=[...D.ministries,...D.premierOffices];
  if(key&&key.startsWith("o_")){ const o=allO.find(x=>"o_"+x.id===key); onCritics().filter(c=>c.ids.includes(o.id)).forEach(c=>{ if(!pairs.some(p=>p.c.m===c.m)) pairs.push({o,c}); }); }
  else if(key&&/^m\d+$/.test(key)){ const m=D.mpps[+key.slice(1)]; const seen=new Set(); onCritics().filter(c=>c.m===m).forEach(c=>c.ids.forEach(id=>{ if(seen.has(id)) return; seen.add(id); const o=allO.find(x=>x.id===id); if(o) pairs.push({o,c}); })); }
  PM.critG.selectAll("path").data(pairs).join("path").attr("class",p=>"critlink c-"+p.c.party).attr("d",({o,c})=>{ const ox=o.id==="cab"||o.id==="iga"?o.x-11:o.x-9; return `M${c.m.px+12},${c.m.py} C${c.m.px+260},${c.m.py} ${ox-160},${o.y} ${ox},${o.y}`; }).style("stroke",p=>D.G[p.c.party].color);
}
function pmTip(e,d){
  const t=document.getElementById("pm-tip"), G=PM.D.G; let h="";
  if(d.type==="mpp"){ const mn=PM.D.mins.find(x=>x.mpp===d.m); h=`<b>${d.m.name}</b><span>${d.m.place}</span><span class="tparty"><span class="pchip" style="--pc:${G[d.m.group].color}">${G[d.m.group].short}</span>${d.m===PM.D.spk?" Speaker":d.m===PM.D.ford?" Premier":mn?" "+mn.title:""}</span>`; }
  else if(d.type==="minister") h=`<b>${d.m.name}</b><span>${d.m.title}</span><span>MPP for ${d.m.riding}</span>`;
  else if(d.type==="ministry") h=`<b>${d.o.name}</b><span>${d.o.heads.map(x=>x.name).join(", ")}</span>`;
  else if(d.type==="premier") h=`<b>Doug Ford</b><span>Premier · MPP for Etobicoke North</span>`;
  else if(d.type==="sec") h=`<b>Michelle E. DiEmanuele</b><span>Secretary of the Cabinet</span>`;
  else if(d.type==="lg") h=`<b>${ON_LG.name}</b><span>${ON_LG.title}</span>`;
  else if(d.type==="officers") h=`<b>Officers of the Legislature</b><span>${ON_OFFICERS.map(o=>o.role).join(" · ")}</span>`;
  else h=`<b>People of Ontario</b><span>Eligible voters in 124 ridings each elect one MPP</span>`;
  t.innerHTML=h; t.hidden=false; const r=document.getElementById("pm-stage").getBoundingClientRect(); let lx=e.clientX-r.left+16; if(lx>r.width-280) lx-=300; t.style.left=lx+"px"; t.style.top=(e.clientY-r.top+16)+"px";
}

const PM_ABOUT_MPP="Members of Provincial Parliament represent one riding each at Queen's Park, where they debate and vote on Ontario's laws and budget and question the provincial government.";
function pmPanel(key){
  const D=PM.D, G=D.G, C=D.C, el=document.getElementById("pm-panel"); let h="";
  const seatLine=m=>`<div class="where"><div class="kicker">Seat in the Legislature</div><div><b>${m.side==="gov"?"Government side":m.side==="speaker"?"Speaker's chair":"Opposition side"}</b>${m.side!=="speaker"?` · row ${m.row} from the aisle · desk ${m.desk} from the Speaker`:""}</div><div class="muted" style="font-size:12px">Highlighted on the map. From the Assembly's seating plan, revised October 27, 2026.</div></div>`;
  const head=(m,kicker)=>`<div class="pband" style="--pc:${G[m.group].color}"></div><div class="who"><div class="ava" style="--pc:${G[m.group].color}" aria-hidden="true">${initials(m.name)}</div><div class="who-t"><div class="kicker">${kicker}</div><h2>${m.name}</h2><div class="party"><i style="background:${G[m.group].color}"></i><span>${G[m.group].name} · ${m.place}</span></div></div></div>`;
  const dmList=o=>`<ul class="list">${o.heads.map(x=>`<li class="item"><span class="nm">${x.name}</span><span class="rl">${x.role}</span>${srcA(ON_S[x.src])}</li>`).join("")}</ul>`;
  const otherRoles=m=>(C.roles||[]).filter(([k,n])=>n.replace(/^Hon\. /,"")===m.name&&k!=="Premier"&&k!=="Speaker").map(x=>x[0]);
  if(!key||key==="people"){
    const c=chCounts(C);
    h=`<div class="kicker">Start here</div><h2>How power flows in Ontario</h2>
      <ol class="steps"><li><b>Voters</b> in each of the 124 ridings elect one MPP.</li><li>The Lieutenant Governor asks the leader who can hold the Assembly's confidence to form government. That is usually the party with the most seats. <b>PC: ${c.pc} of 124</b>, past the 63 needed for a majority.</li><li>Its leader, <b>Doug Ford</b>, is Premier. He chooses <b>Cabinet</b> from his MPPs, and the Lieutenant Governor formally appoints them on his advice.</li><li>Each minister directs one or more <b>ministries</b>, which deputy ministers run day to day.</li></ol>
      <h3>Key roles</h3><ul class="list">${C.roles.map(([r,n])=>{ const mm=C.members.find(x=>("Hon. "+x.name)===n||x.name===n); return `<li class="item"><button class="linkbtn" data-k="${pmKeyForMpp(mm.i)}">${mm.name}</button><span class="rl">${r}</span></li>`; }).join("")}</ul>
      <div class="note">Hover or tap anything. Pick a minister or ministry and a line runs back to each minister's own seat, because every minister is also an elected MPP.</div>${srcA(ON_S.mpp)}${srcA(ON_S.cab)}`;
  } else if(key==="premier"){
    h=head(D.ford,"Premier of Ontario")+`<div class="lede">Leader of the Progressive Conservatives, the largest party, and Minister of Intergovernmental Affairs. Chooses Cabinet and leads the government's agenda.</div>
      <div class="statgrid" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="stat"><b>${D.mins.length}</b><span>Ministers and associates</span></div><div class="stat"><b>${D.ministries.length+2}</b><span>Ministries and offices</span></div></div>
      <h3>His own offices</h3><ul class="list">${D.premierOffices.map(o=>`<li class="item"><button class="linkbtn" data-k="o_${o.id}">${o.name}</button><span class="rl">${o.heads[0].name} · ${o.heads[0].role.split(" (")[0]}</span></li>`).join("")}</ul>
      ${seatLine(D.ford)}${srcA(ON_S.wiki)}`;
  } else if(key==="lg"){
    h=`<div class="kicker">The Crown · non-partisan</div><h2>${ON_LG.name}</h2><div class="lede">${ON_LG.title}, representing the King in Ontario.</div>
      <h3>What the role does</h3><ul class="list"><li class="item"><span class="nm">Asks a leader to form government</span><span class="rl">The leader who can hold the Assembly's confidence becomes Premier.</span></li>
      <li class="item"><span class="nm">Appoints Cabinet</span><span class="rl">Ministers are appointed on the Premier's advice.</span></li>
      <li class="item"><span class="nm">Gives Royal Assent</span><span class="rl">A bill passed by the Assembly becomes law once it receives Royal Assent.</span></li>
      <li class="item"><span class="nm">Opens and closes sessions</span><span class="rl">Reads the Speech from the Throne written by the government.</span></li></ul>
      <div class="note">By convention, the Lieutenant Governor acts on the advice of the Premier and Cabinet, so there is no party colour here.</div>${srcA(ON_LG.src)}`;
  } else if(key==="officers"){
    h=`<div class="kicker">Independent of government</div><h2>Officers of the Legislature</h2><div class="lede">Appointed by and reporting to the whole Assembly, not to the Premier or Cabinet. They watch over how government spends money, runs elections and treats the public.</div>
      <ul class="list">${ON_OFFICERS.map(o=>`<li class="item"><span class="nm">${o.name}</span><span class="rl"><b>${o.role}</b> · ${o.what}</span>${srcA(o.src)}</li>`).join("")}</ul>
      <h3>Assembly staff</h3><ul class="list"><li class="item"><span class="nm">${ON_CLERK.name}</span><span class="rl"><b>${ON_CLERK.role}</b> · ${ON_CLERK.what}</span>${srcA(ON_CLERK.src)}</li></ul>`;
  } else if(key==="sec"){
    h=`<div class="kicker">Public service</div><h2>Michelle E. DiEmanuele</h2><div class="lede">Secretary of the Cabinet and Head of the Ontario Public Service since June 2021. Supports the Premier and Cabinet and leads the deputy ministers who run each ministry.</div>
      <div class="note">Public servants are non-partisan, so there is no party colour here.</div>${srcA(ON_S.sec)}`;
  } else if(key.startsWith("o_")){
    const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key);
    h=`<div class="kicker">Ministry · ${o.abbr}</div><h2>${o.name}</h2><h3>Minister${o.ms.length>1?"s":""}</h3>
      ${o.ms.length?`<ul class="list">${o.ms.map(m=>`<li class="item"><button class="linkbtn" data-k="${m.id}">${m.name}</button><span class="rl">${m.title} · MPP for ${m.riding}</span></li>`).join("")}</ul>`:`<ul class="list"><li class="item"><button class="linkbtn" data-k="premier">Doug Ford</button><span class="rl">Premier</span></li></ul>`}
      <h3>Deputy minister${o.heads.length>1?"s":""} (public service)</h3>${dmList(o)}${critBlock(o)}`;
  } else if(/^m\d+$/.test(key)){
    const m=D.mpps[+key.slice(1)], mn=D.mins.find(x=>x.mpp===m);
    if(mn) return pmPanel(mn.id);
    if(m===D.ford) return pmPanel("premier");
    const roles=otherRoles(m);
    h=head(m,m===D.spk?"Speaker of the Assembly":"MPP")+(roles.length?`<h3>Role</h3><ul class="list"><li class="item"><span class="nm" style="font-size:14px">${roles.join(" · ")}</span></li></ul>`:"")
      +`<div class="lede">${m===D.spk?"Elected as a PC MPP, the Speaker presides over the Assembly and is expected to act impartially.":`${m.group==="pc"?"A government MPP who is not in Cabinet.":m.group==="ind"?"Sits as an independent.":"Sits in opposition."}`}</div>
      ${critOf(m)}<div class="role"><div class="kicker">About this role</div><p>${PM_ABOUT_MPP}</p></div>${seatLine(m)}${srcA(ON_S.mpp)}`;
  } else {
    const mn=D.mins.find(x=>x.id===key), roles=otherRoles(mn.mpp);
    h=head(mn.mpp,mn.assoc?"Associate minister · MPP":"Cabinet minister · MPP")+`<div class="lede">${mn.title}${roles.length?" · "+roles.join(" · "):""}</div>
      <h3>Responsible for</h3><ul class="list">${mn.links.map(l=>{ const o=[...D.ministries,...D.premierOffices].find(x=>x.id===l); return `<li class="item"><button class="linkbtn" data-k="o_${o.id}">${o.name}</button><span class="rl">${o.heads.map(x=>x.name+" · "+x.role.split(" (")[0]).join("<br>")}</span></li>`; }).join("")}</ul>
      ${seatLine(mn.mpp)}<div class="role"><div class="kicker">Two jobs</div><p>As a minister, ${mn.name.split(" ")[0]} directs ${mn.links.length>1?"these ministries":"this ministry"} and answers for ${mn.links.length>1?"them":"it"} in the Legislature. As an MPP, ${mn.name.split(" ")[0]} still represents ${mn.riding} and votes in the Assembly.</p></div>${srcA(ON_S.cab)}`;
  }
  if(key) h+=`<button class="linkbtn" data-k="" style="font-size:13px">← How power flows</button>`;
  function critBlock(o){ const cs=onCritics().filter(c=>c.ids.includes(o.id)); if(!cs.length) return "";
    const by=d3.groups(cs,c=>c.m);
    return `<h3>Opposition critics</h3><ul class="list">${by.map(([m,arr])=>`<li class="item"><button class="linkbtn" data-k="m${m.i}">${m.name}</button><span class="rl"><span class="pchip" style="--pc:${G[arr[0].party].color}">${G[arr[0].party].short}</span> Critic, ${arr.map(c=>c.port).join("; ")}</span></li>`).join("")}</ul>
      <div class="note">Critics question the minister and propose alternatives. Matched to this ministry by portfolio name. ${srcA(ON_CRIT_SRC.ndp)} ${srcA(ON_CRIT_SRC.olp)}</div>`; }
  function critOf(m){ const cs=onCritics().filter(c=>c.m===m); if(!cs.length) return "";
    return `<h3>${m.group==="ndp"?"Official Opposition critic":"Critic"}</h3><ul class="list">${cs.map(c=>`<li class="item"><span class="nm">${c.port}</span>${c.ids.length?`<span class="rl">Shadows: ${c.ids.map(id=>{ const o=[...D.ministries,...D.premierOffices].find(x=>x.id===id); return o?`<button class="linkbtn" data-k="o_${o.id}">${o.name}</button>`:""; }).join(", ")}</span>`:""}</li>`).join("")}</ul>${srcA(ON_CRIT_SRC[m.group==="ndp"?"ndp":"olp"])}`; }
  el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); el.innerHTML=h;
  el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>pmSelect(b.dataset.k||null,!!b.dataset.k));
}
function pmPoint(key){ const D=PM.D;
  if(key==="premier") return D.premier; if(key==="sec") return D.sec; if(key==="lg") return D.lgPt; if(key==="officers") return D.offPt; if(key==="people") return PM_WC;
  if(key.startsWith("o_")){ const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key); return [o.x,o.y]; }
  if(/^m\d+$/.test(key)){ const m=D.mpps[+key.slice(1)]; return [m.px,m.py]; }
  const mn=D.mins.find(x=>x.id===key); return mn?[(mn.x+mn.mpp.px)/2,(mn.y+mn.mpp.py)/2]:[0,0]; }
function pmSelect(key,zoom){ zoom=false;
  PM.sel=key||null; pmHighlight(PM.sel); pmPanel(PM.sel);
  const st=chState.ontario, m=pmMppOf(PM.sel); st.sel=m?m.i:null; st.panel=null; st.focus=null;
  chSummary(CH.ontario); chList(CH.ontario);
  const svg=d3.select("#pm-svg");
  if(zoom&&key&&/^m\d+$/.test(key)){ const [x,y]=pmPoint(key), mn=PM.D.mins.find(z=>z.id===key), k=2.6, cx=PM_VB[0]+PM_VB[2]/2, cy=PM_VB[1]+PM_VB[3]/2;
    svg.transition().duration(PM_RM?0:750).ease(d3.easeCubicInOut).call(PM.zoom.transform,d3.zoomIdentity.translate(cx-x*k,cy-y*k).scale(k)); }
  else svg.transition().duration(PM_RM?0:600).call(PM.zoom.transform,d3.zoomIdentity);
  if(key) document.getElementById("pm-panel").scrollIntoView({behavior:PM_RM?"auto":"smooth",block:"nearest"});
}
// map keys used elsewhere (global search, wheel ids) into power-map keys
function pmFocus(fk){ if(!fk||fk.startsWith("ch:")) return; if(fk==="hub") return pmSelect("premier",true); if(fk==="onhead") return pmSelect("sec",true); pmSelect(fk,true); }

function pmSearchIndex(){ const D=PM.D, idx=[];
  D.mpps.forEach(m=>{ const mn=D.mins.find(x=>x.mpp===m); idx.push({k:pmKeyForMpp(m.i),label:m.name,sub:`${D.G[m.group].short} · ${m.place}${mn?" · "+mn.title:""}`}); });
  [...D.ministries,...D.premierOffices].forEach(o=>{ idx.push({k:"o_"+o.id,label:o.name,sub:o.abbr}); o.heads.forEach(x=>idx.push({k:"o_"+o.id,label:x.name,sub:x.role+" · "+o.abbr})); });
  idx.push({k:"sec",label:"Michelle E. DiEmanuele",sub:"Secretary of the Cabinet"});
  idx.push({k:"lg",label:ON_LG.name,sub:ON_LG.title});
  ON_OFFICERS.forEach(o=>idx.push({k:"officers",label:o.name,sub:o.role})); idx.push({k:"officers",label:ON_CLERK.name,sub:ON_CLERK.role});
  onCritics().forEach(c=>idx.push({k:"m"+c.m.i,label:c.m.name,sub:`${D.G[c.party].short} critic · ${c.port}`}));
  return idx; }

function renderPowerMap(){
  if(PM.built) return;
  const slot=document.getElementById("pm-slot"); if(!slot) return;
  slot.innerHTML=`<div class="pmbar"><label class="search" for="pm-q"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg>
      <input id="pm-q" type="search" placeholder="Search an MPP, riding, minister or ministry" autocomplete="off" aria-label="Search Ontario"><ul class="results" id="pm-res" hidden></ul></label>
      <div class="zbtn"><button id="pm-zin" aria-label="Zoom in" title="Zoom in">+</button><button id="pm-zout" aria-label="Zoom out" title="Zoom out">−</button><button id="pm-zr" aria-label="Reset the chamber" title="Reset the chamber" class="zreset"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7"/><path d="M3 2.5v3h3"/></svg><span>Reset</span></button></div></div>
    <div class="pmgrid"><div class="pmstage" id="pm-stage"><svg id="pm-svg" viewBox="${PM_VB.join(" ")}" role="img" aria-label="Ontario power map: the Legislature, Premier, Cabinet and ministries"></svg><div class="tip" id="pm-tip" hidden></div></div>
      <aside class="hpanel pmpanel" id="pm-panel" aria-live="polite"></aside></div>`;
  pmBuild();
  const svg=d3.select("#pm-svg");
  document.getElementById("pm-zin").onclick=()=>svg.transition().duration(300).call(PM.zoom.scaleBy,1.4);
  document.getElementById("pm-zout").onclick=()=>svg.transition().duration(300).call(PM.zoom.scaleBy,1/1.4);
  document.getElementById("pm-zr").onclick=()=>pmSelect(null,false);
  const idx=pmSearchIndex(), q=document.getElementById("pm-q"), res=document.getElementById("pm-res");
  q.addEventListener("input",()=>{ const t=q.value.trim().toLowerCase(); if(!t){res.hidden=true;return}
    const hits=idx.filter(i=>(i.label+" "+i.sub).toLowerCase().includes(t)).slice(0,12);
    res.innerHTML=hits.length?hits.map((h,i)=>`<li><button data-i="${i}">${h.label}<small>${h.sub}</small></button></li>`).join(""):`<li style="padding:7px 10px;color:var(--muted)">No match</li>`; res.hidden=false;
    res.querySelectorAll("button").forEach(b=>b.onclick=()=>{ pmSelect(hits[+b.dataset.i].k,true); res.hidden=true; q.value=""; }); });
  q.addEventListener("keydown",e=>{ if(e.key==="Escape") res.hidden=true; if(e.key==="Enter"){ e.preventDefault(); const b=res.querySelector("button"); if(b) b.click(); } });
  document.addEventListener("click",e=>{ if(!e.target.closest(".pmbar .search")) res.hidden=true; });
  PM.built=true;
}
