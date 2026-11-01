/* ================= BC POWER MAP (same design as Ontario) ================= */
const BM={built:false,sel:null};
const BM_RM=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const BM_MID=-62, BM_CX=-340;
const BM_CAB={x:70,y:-500,w:620,cols:3,rh:28,head:74};
const BM_MIN={x:70,y:-78,w:620,cols:2,rh:26,head:74};
const BM_VB=[-610,-530,1310,1000];

function bmData(){
  const C=CH.bcleg, G=C.groups;
  const mins=[]; BC_SECTORS.forEach(s=>s.ids.forEach(id=>mins.push(BC_MIN.find(m=>m.id===id))));
  C.cabOrder={}; mins.forEach((m,k)=>C.cabOrder[m.name]=k);
  chLayout(C);
  const mid=((C.X0-80)+C.W)/2;
  const P=(x,y)=>[BM_CX-y, x-mid];
  const mpps=C.members, byName={}; mpps.forEach(m=>{ byName[m.name]=m; [m.px,m.py]=P(m.x,m.y); });
  const grid=(B,n,k)=>{ const per=Math.ceil(n/B.cols), cw=(B.w-24)/B.cols, c=Math.floor(k/per), r=k%per; return [B.x+24+c*cw, B.y+B.head+r*B.rh+B.rh/2]; };
  BM_CAB.h=BM_CAB.head+Math.ceil(mins.length/BM_CAB.cols)*BM_CAB.rh+12;
  mins.forEach((m,k)=>{ [m.x,m.y]=grid(BM_CAB,mins.length,k); m.mpp=byName[m.name]||null; m.k=k; });
  const ministries=BC_OUT.filter(o=>o.id!=="premier");
  ministries.forEach(o=>{ const ms=mins.filter(m=>m.links.includes(o.id)); o.ms=ms; o.t=ms.length?d3.mean(ms,m=>m.k):99; });
  ministries.sort((p,q)=>p.t-q.t);
  BM_MIN.y=BM_CAB.y+BM_CAB.h+30;
  BM_MIN.h=BM_MIN.head+Math.ceil(ministries.length/BM_MIN.cols)*BM_MIN.rh+12;
  ministries.forEach((o,k)=>{ [o.x,o.y]=grid(BM_MIN,ministries.length,k);
    let sn=o.name.replace(/^Ministry (of|for) (the )?/,""); if(sn.length>37) sn=sn.slice(0,sn.lastIndexOf(" ",35))+"…"; o.short=sn; });
  const premierOffices=BC_OUT.filter(o=>o.id==="premier"); premierOffices.forEach(o=>{ o.x=BM_MID; o.y=96; o.ms=[]; });
  return {C,G,mpps,byName,mins,ministries,premierOffices,P,mid,eby:byName["David Eby"],doerk:byName["Lorne Doerkson"],
    premier:[BM_MID,-40], sec:[BM_MID,190], desig:[BM_MID,-150]};
}
function bmKeyForMpp(i){ const D=BM.D, m=D.mpps[i]; const mn=D.mins.find(x=>x.mpp===m); return mn?mn.id:m===D.eby?"premier":m===D.doerk?"designate":"m"+i; }
function bmMppOf(key){ const D=BM.D; if(!key) return null; if(key==="premier") return D.eby; if(key==="designate") return D.doerk; if(/^m\d+$/.test(key)) return D.mpps[+key.slice(1)]; const mn=D.mins.find(x=>x.id===key); return mn?mn.mpp:null; }

function bmBuild(){
  const D=BM.D=bmData(); const {G,C,P}=D;
  const svg=d3.select("#bm-svg"); svg.selectAll("*").remove();
  const defs=svg.append("defs");
  ["ink","accent"].forEach(k=>defs.append("marker").attr("id","bm-ar-"+k).attr("viewBox","0 0 10 10").attr("refX",8).attr("refY",5).attr("markerWidth",7).attr("markerHeight",7).attr("orient","auto-start-reverse")
    .append("path").attr("d","M0,0 L10,5 L0,10 z").attr("fill",k==="ink"?"var(--ink)":"var(--brass)"));
  const zg=svg.append("g"), g=zg.append("g");
  const card=(B,t1,t2)=>{ g.append("rect").attr("x",B.x).attr("y",B.y).attr("width",B.w).attr("height",B.h).attr("rx",16).attr("class","pmcard");
    const t=g.append("text").attr("x",B.x+22).attr("y",B.y+36).attr("class","pmcardh"); t.append("tspan").text(t1); t.append("tspan").attr("class","pmcardn").text("  ·  "+t2[0]);
    g.append("text").attr("x",B.x+22).attr("y",B.y+56).attr("class","pmcards").text(t2[1]); };
  const gone=D.mins.filter(m=>!m.mpp).length;
  card(BM_CAB,"Cabinet",[`${D.mins.length} ministers · caretaker`,`Eby's NDP Cabinet until a new one is sworn in. Hollow dots: ${gone} not re-elected.`]);
  card(BM_MIN,"Ministries",[String(D.ministries.length),"Each is run day to day by a deputy minister from the public service."]);
  // ---- chamber (grouped by party until a seating plan exists) ----
  const ch=g.append("g").attr("class","pmchamber");
  const rows=C.rows, gl=C.govList, ol=C.oppList;
  const rect=(x,y,w,h)=>{ const [a,b]=P(x,y), [c,d]=P(x+w,y+h); return {x:Math.min(a,c),y:Math.min(b,d),w:Math.abs(c-a),h:Math.abs(d-b)}; };
  const R=(sel,r,cls)=>sel.append("rect").attr("x",r.x).attr("y",r.y).attr("width",r.w).attr("height",r.h).attr("class",cls||null);
  const top=C.X0-D.mid, bot=C.W-D.mid;
  ch.append("rect").attr("x",BM_CX-30).attr("y",top-20).attr("width",60).attr("height",bot-top+40).attr("rx",8).attr("fill","#ffffff07");
  [[gl,1],[ol,-1]].forEach(([list,side])=>{ for(let r=0;r<rows;r++){ const row=list.slice(r*C.cols,(r+1)*C.cols); if(!row.length) continue; const y=side*C.rowY(r);
      if(r===0) R(ch,rect(C.colX(0)-26,y-22,C.colX(row.length-1)-C.colX(0)+52,44),"pmfront").attr("rx",12);
      const shade=[30,26,23,21,19,17][r];
      for(let c=0;c<row.length;c+=2){ const a=C.colX(c)-15, b=C.colX(Math.min(c+1,row.length-1))+15; R(ch,rect(a,y-15,b-a,30),r===0?"pmdesk front":"pmdesk").attr("rx",9).attr("fill",`rgb(${shade},${shade},${shade})`); }
      let s=0; for(let c=1;c<=row.length;c++){ if(c===row.length||row[c].group!==row[s].group){ const gr=row[s].group; if(gr!=="con") R(ch,rect(C.colX(s)-18,y-18.5,C.colX(c-1)-C.colX(s)+36,37),"pmblock").attr("rx",12).attr("stroke",G[gr].color); s=c; } }
  } });
  const [sx,sy]=P(C.X0-80,0);
  ch.append("rect").attr("x",sx-24).attr("y",sy-24).attr("width",48).attr("height",48).attr("rx",10).attr("fill","none").attr("stroke","var(--brass)").attr("stroke-width",2).attr("stroke-dasharray","4 4");
  ch.append("text").attr("x",sx+34).attr("y",sy-2).attr("class","clbl brass").text("SPEAKER");
  ch.append("text").attr("x",sx+34).attr("y",sy+12).attr("class","clbl").text("TO BE ELECTED");
  const oppRows=Math.ceil(ol.length/C.cols);
  const gx=d3.mean([BM_CX-C.rowY(0),BM_CX-C.rowY(rows-1)]), ox=d3.mean([BM_CX+C.rowY(0),BM_CX+C.rowY(oppRows-1)]);
  ch.append("text").attr("x",gx).attr("y",bot+48).attr("text-anchor","middle").attr("class","clbl side").text("INCOMING GOVERNMENT");
  ch.append("text").attr("x",gx).attr("y",bot+64).attr("text-anchor","middle").attr("class","clbl").text("SPEAKER'S RIGHT");
  ch.append("text").attr("x",ox).attr("y",bot+48).attr("text-anchor","middle").attr("class","clbl side").text("OPPOSITION");
  ch.append("text").attr("x",ox).attr("y",bot+64).attr("text-anchor","middle").attr("class","clbl").text("SPEAKER'S LEFT");
  { const t=ch.append("text").attr("x",BM_CX).attr("y",top-150).attr("text-anchor","middle").attr("class","pmcardh"); t.append("tspan").text("Legislative Assembly of BC");
    ch.append("text").attr("x",BM_CX).attr("y",top-128).attr("text-anchor","middle").attr("class","pmcards").text("93 MLAs-elect, 1 per riding · preliminary results"); }
  ch.append("line").attr("x1",BM_CX-C.rowY(rows-1)-16).attr("x2",BM_CX+C.rowY(oppRows-1)+16).attr("y1",bot+28).attr("y2",bot+28).attr("stroke","var(--brass)").attr("stroke-width",2).attr("stroke-dasharray","4 5");
  // ---- flows ----
  const fl=g.append("g").attr("class","flows");
  const arrow=(d,cls,mk)=>fl.append("path").attr("d",d).attr("class","flow "+cls).attr("marker-end",`url(#bm-ar-${mk||"ink"})`);
  const lbl=(x,y,t,anchor,cls)=>fl.append("text").attr("x",x).attr("y",y).attr("text-anchor",anchor||"middle").attr("class",cls||"flowlbl").text(t);
  const [px,py]=D.premier, [dx,dy]=D.desig, Dk=D.doerk;
  arrow(`M${Dk.px},${Dk.py-14} C${Dk.px},${top-150} -172,${top-150} -172,${top-40} L-172,${dy-30} C-172,${dy} ${dx-90},${dy} ${dx-60},${dy}`,"f-conf","accent");
  lbl(-180,dy-62,"Becomes Premier","end");lbl(-180,dy-48,"once certified","end");
  arrow(`M${px+72},${py} C${px+110},${py} ${BM_CAB.x-50},${BM_CAB.y+BM_CAB.h-60} ${BM_CAB.x-6},${BM_CAB.y+BM_CAB.h-60}`,"f-app");
  lbl(px+80,py-32,"Chose","start","flowlbl big");lbl(px+80,py-16,"Cabinet","start","flowlbl big");
  arrow(`M${BM_CAB.x+BM_CAB.w/2},${BM_CAB.y+BM_CAB.h+2} L${BM_CAB.x+BM_CAB.w/2},${BM_MIN.y-4}`,"f-app");
  lbl(BM_CAB.x+BM_CAB.w/2+12,BM_MIN.y-10,"Ministers direct ministries","start","flowlbl big");
  const SL=[{key:"premier",x:px,y:py,m:D.eby},...D.mins.filter(mn=>mn.mpp).map(mn=>({key:mn.id,x:mn.x,y:mn.y,m:mn.mpp}))];
  const seatLinks=g.append("g").selectAll("path").data(SL).join("path").attr("class","seatlink")
    .attr("d",d=>`M${d.x-10},${d.y} C${d.x-240},${d.y} ${d.m.px+220},${d.m.py} ${d.m.px+12},${d.m.py}`);
  const spokes=g.append("g").selectAll("path").data(D.mins).join("path").attr("class","spoke ms").attr("d",m=>`M${px+40},${py} C${px+160},${py} ${m.x-120},${m.y} ${m.x-11},${m.y}`);
  const L=[]; D.mins.forEach(m=>m.links.forEach(l=>{ const o=D.ministries.find(x=>x.id===l); if(o) L.push({m,o}); }));
  const links=g.append("g").selectAll("path").data(L).join("path").attr("class","mlink").attr("d",d=>`M${d.m.x-11},${d.m.y} C${BM_CAB.x-40},${d.m.y} ${BM_MIN.x-40},${d.o.y} ${d.o.x-9},${d.o.y}`);
  BM.psLines=g.append("g").selectAll("path").data(D.ministries).join("path").attr("class","psline").attr("d",o=>`M${D.sec[0]+80},${D.sec[1]} C${D.sec[0]+180},${D.sec[1]} ${o.x-120},${o.y} ${o.x-9},${o.y}`).attr("opacity",0);
  // ---- MLA seats ----
  const mg=g.append("g").selectAll("g").data(D.mpps).join("g").attr("class","pmn mpp").attr("transform",m=>`translate(${m.px},${m.py})`).datum(m=>({type:"mpp",key:"m"+m.i,m}));
  mg.append("circle").attr("class","pdot").attr("r",BM_RM?11.5:0).attr("fill",x=>G[x.m.group].color);
  mg.filter(x=>x.m.hon).append("circle").attr("r",3.6).attr("fill","#0a0a0a").attr("pointer-events","none");
  mg.filter(x=>x.m.place==="Ladysmith-Oceanside").append("circle").attr("r",15).attr("fill","none").attr("stroke","var(--ink)").attr("stroke-dasharray","3 2.5").attr("stroke-width",1.5).attr("pointer-events","none");
  // ---- Premier (caretaker), Premier-designate, office, Head of Public Service ----
  g.append("path").attr("class","spoke").attr("d",`M${px},${py+58} V${D.premierOffices[0].y-12} M${px},${D.premierOffices[0].y+40} V${D.sec[1]-21}`);
  const pr=g.append("g").attr("class","pmn premier").attr("transform",`translate(${px},${py})`).datum({type:"premier",key:"premier"});
  pr.append("rect").attr("x",-72).attr("y",-28).attr("width",144).attr("height",56).attr("rx",16).attr("class","prbox ndp");
  pr.append("text").attr("y",8).attr("text-anchor","middle").attr("class","pminit").text("Premier");
  g.append("text").attr("x",px).attr("y",py+50).attr("text-anchor","middle").attr("class","pmname").text("David Eby · caretaker");
  const de=g.append("g").attr("class","pmn premier").attr("transform",`translate(${dx},${dy})`).datum({type:"designate",key:"designate"});
  de.append("rect").attr("x",-56).attr("y",-22).attr("width",112).attr("height",44).attr("rx",14).attr("class","prbox desig");
  de.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text("Premier-designate");
  de.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text("LORNE DOERKSON");
  const po=g.append("g").selectAll("g").data(D.premierOffices).join("g").attr("class","pmn office").attr("transform",o=>`translate(${o.x},${o.y})`).datum(o=>({type:"ministry",key:"o_"+o.id,o}));
  po.append("rect").attr("x",-11).attr("y",-11).attr("width",22).attr("height",22).attr("rx",5).attr("class","mbox");
  po.append("text").attr("y",30).attr("text-anchor","middle").attr("class","olbl big").text("Office of the Premier");
  const sc=g.append("g").attr("class","pmn sec").attr("transform",`translate(${D.sec[0]},${D.sec[1]})`).datum({type:"sec",key:"sec"});
  sc.append("rect").attr("x",-84).attr("y",-20).attr("width",168).attr("height",40).attr("rx",20).attr("class","secbox");
  sc.append("text").attr("y",-2).attr("text-anchor","middle").attr("class","seclbl").text("Head of Public Service");
  sc.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text("CABINET SECRETARY");
  // ---- the Crown and the statutory officers ----
  const LGY=-400; D.lgPt=[px,LGY]; D.offPt=[BM_CX,bot+118];
  g.append("path").attr("class","flow f-crown").attr("d",`M${px},${LGY+24} L${px},${dy-24}`).attr("marker-end","url(#bm-ar-ink)");
  g.append("text").attr("x",px+8).attr("y",(LGY+dy)/2+4).attr("class","flowlbl").text("Appoints after Nov 18");
  g.append("path").attr("class","flow f-crown").attr("d",`M${px},${dy+24} L${px},${py-32}`);
  g.append("text").attr("x",px-8).attr("y",(dy+py)/2+4).attr("text-anchor","end").attr("class","flowlbl").text("Replaces caretaker");
  const lg=g.append("g").attr("class","pmn crown").attr("transform",`translate(${px},${LGY})`).datum({type:"lg",key:"lg"});
  lg.append("rect").attr("x",-86).attr("y",-23).attr("width",172).attr("height",46).attr("rx",23).attr("class","crownbox");
  lg.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text("Lieutenant Governor");
  lg.append("text").attr("y",13).attr("text-anchor","middle").attr("class","clbl").text("THE CROWN");
  g.append("path").attr("class","spoke").attr("d",`M${BM_CX},${bot+30} V${bot+94}`);
  const of=g.append("g").attr("class","pmn officers").attr("transform",`translate(${BM_CX},${bot+118})`).datum({type:"officers",key:"officers"});
  of.append("rect").attr("x",-170).attr("y",-24).attr("width",340).attr("height",48).attr("rx",24).attr("class","crownbox");
  of.append("text").attr("y",-3).attr("text-anchor","middle").attr("class","seclbl").text(`Statutory officers · ${BC_OFFICERS.length}`);
  of.append("text").attr("y",14).attr("text-anchor","middle").attr("class","clbl").text("REPORT TO THE LEGISLATURE, NOT CABINET");
  // ---- ministers ----
  const mn=g.append("g").selectAll("g").data(D.mins).join("g").attr("class",m=>"pmn minister"+(m.mpp?"":" gone")).attr("transform",m=>`translate(${m.x},${m.y})`).datum(m=>({type:"minister",key:m.id,m}));
  mn.append("rect").attr("x",-14).attr("y",-BM_CAB.rh/2+2).attr("width",(BM_CAB.w-24)/BM_CAB.cols-8).attr("height",BM_CAB.rh-4).attr("rx",7).attr("class","rowhit");
  mn.append("circle").attr("r",9.5).attr("fill",x=>x.m.mpp?"var(--p-ndp)":"none").attr("stroke",x=>x.m.mpp?"#ffffff80":"var(--p-ndp)").attr("stroke-width",x=>x.m.mpp?1:2);
  mn.filter(x=>x.m.mpp).append("circle").attr("r",3.2).attr("fill","#fff");
  mn.append("text").attr("class","mlbl2").attr("x",17).attr("dy","0.35em").text(x=>x.m.name);
  // ---- ministries ----
  const mi=g.append("g").selectAll("g").data(D.ministries).join("g").attr("class","pmn ministry").attr("transform",o=>`translate(${o.x},${o.y})`).datum(o=>({type:"ministry",key:"o_"+o.id,o}));
  mi.append("rect").attr("x",-14).attr("y",-BM_MIN.rh/2+2).attr("width",(BM_MIN.w-24)/BM_MIN.cols-8).attr("height",BM_MIN.rh-4).attr("rx",7).attr("class","rowhit");
  mi.append("rect").attr("x",-7).attr("y",-7).attr("width",14).attr("height",14).attr("rx",3.5).attr("class","mbox");
  mi.append("text").attr("class","mnlbl").attr("x",17).attr("dy","0.35em").text(x=>x.o.short);
  // ---- interaction ----
  const keyOf=d=>d.type==="mpp"?bmKeyForMpp(d.m.i):d.key;
  g.selectAll(".pmn").attr("tabindex",0).attr("role","button")
    .attr("aria-label",d=>d.type==="mpp"?`${d.m.name}, ${d.m.place}`:d.type==="minister"?`${d.m.name}, ${d.m.title}`:d.type==="ministry"?d.o.name:d.type==="premier"?"David Eby, Premier (caretaker)":d.type==="designate"?"Lorne Doerkson, Premier-designate":d.type==="sec"?"Head of the Public Service":d.type==="lg"?`${BC_LG.name}, ${BC_LG.title}`:"Statutory officers")
    .on("click",(e,d)=>bmSelect(keyOf(d),true)).on("keydown",(e,d)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); bmSelect(keyOf(d),true);} })
    .on("mouseenter",(e,d)=>{ bmTip(e,d); bmHighlight(keyOf(d)); }).on("mousemove",(e,d)=>bmTip(e,d))
    .on("mouseleave",()=>{ document.getElementById("bm-tip").hidden=true; bmHighlight(BM.sel); });
  BM.nodes=g.selectAll(".pmn"); BM.links=links; BM.spokes=spokes; BM.flows=fl; BM.seatLinks=seatLinks;
  BM.zoom=d3.zoom().scaleExtent([1,6]).translateExtent([[BM_VB[0]-30,BM_VB[1]-30],[BM_VB[0]+BM_VB[2]+30,BM_VB[1]+BM_VB[3]+30]]).on("zoom",e=>zg.attr("transform",e.transform));
  svg.call(BM.zoom).on("dblclick.zoom",null);
  if(!BM_RM){
    mg.select(".pdot").transition().delay(x=>200+(x.m.py-top)*1.3+Math.abs(x.m.px-BM_CX)*.8).duration(380).ease(d3.easeBackOut.overshoot(1.8)).attr("r",11.5);
    fl.selectAll("path").each(function(){ const L=this.getTotalLength(); d3.select(this).attr("stroke-dasharray",`${L} ${L}`).attr("stroke-dashoffset",L).transition().delay(500).duration(1000).ease(d3.easeCubicOut).attr("stroke-dashoffset",0).on("end",function(){ d3.select(this).attr("stroke-dasharray",null); }); });
    mn.attr("opacity",0).transition().delay((x,i)=>1000+i*22).duration(300).attr("opacity",1);
    mi.attr("opacity",0).transition().delay((x,i)=>1400+i*20).duration(300).attr("opacity",1);
  }
}
function bmRelated(key){
  const D=BM.D, s=new Set([key]); if(!key) return null;
  if(key==="premier"){ D.mins.forEach(m=>s.add(m.id)); D.premierOffices.forEach(o=>s.add("o_"+o.id)); s.add("m"+D.eby.i); s.add("sec"); return s; }
  if(key==="designate"){ s.add("m"+D.doerk.i); D.mpps.filter(m=>m.group==="con").forEach(m=>s.add("m"+m.i)); return s; }
  if(key==="sec"){ D.ministries.forEach(o=>s.add("o_"+o.id)); D.premierOffices.forEach(o=>s.add("o_"+o.id)); s.add("premier"); return s; }
  if(key==="lg"){ s.add("premier"); s.add("designate"); D.mins.forEach(m=>s.add(m.id)); return s; }
  if(key==="officers"){ D.mpps.forEach(m=>s.add("m"+m.i)); return s; }
  if(key.startsWith("o_")){ const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key); o.ms.forEach(m=>{ s.add(m.id); if(m.mpp) s.add("m"+m.mpp.i); }); if(!o.ms.length){ s.add("premier"); s.add("m"+D.eby.i); } return s; }
  if(/^m\d+$/.test(key)) return s;
  const mn=D.mins.find(x=>x.id===key); if(mn){ s.add("premier"); if(mn.mpp) s.add("m"+mn.mpp.i); mn.links.forEach(l=>s.add("o_"+l)); } return s;
}
function bmHighlight(key){
  const rel=bmRelated(key);
  BM.nodes.classed("dim",d=>rel?!rel.has(d.key):false).classed("on",d=>d.key===key||(d.type==="mpp"&&bmMppOf(key)===d.m));
  BM.links.classed("hot",d=>!!rel&&(key===d.m.id||key==="o_"+d.o.id)).classed("dim",d=>rel?!(rel.has(d.m.id)&&rel.has("o_"+d.o.id)):false);
  BM.spokes.classed("hot",m=>key==="premier"||key===m.id).classed("dim",m=>rel?!(key==="premier"||rel.has(m.id)):false);
  BM.seatLinks.classed("hot",d=>!!rel&&(d.key===key||(!!key&&key.startsWith("o_")&&rel.has(d.key)))).classed("dim",d=>!!rel&&key!=="premier"&&!rel.has(d.key));
  BM.psLines.attr("opacity",key==="sec"?.6:0);
  BM.flows.classed("dim",!!rel&&key!=="premier"&&key!=="designate");
}
function bmTip(e,d){
  const t=document.getElementById("bm-tip"), G=BM.D.G; let h="";
  if(d.type==="mpp"){ const mn=BM.D.mins.find(x=>x.mpp===d.m); h=`<b>${d.m.name}</b><span>${d.m.place}</span><span class="tparty"><span class="pchip" style="--pc:${G[d.m.group].color}">${G[d.m.group].short}</span>${d.m===BM.D.eby?" Premier (caretaker)":d.m===BM.D.doerk?" Premier-designate":mn?" "+mn.title:" MLA-elect"}</span>`; }
  else if(d.type==="minister") h=`<b>${d.m.name}</b><span>${d.m.title}</span><span>${d.m.mpp?"Re-elected in "+d.m.mpp.place:"Not among the members-elect"}</span>`;
  else if(d.type==="ministry") h=`<b>${d.o.name}</b><span>${d.o.heads.map(x=>x.name).join(", ")}</span>`;
  else if(d.type==="premier") h=`<b>David Eby</b><span>Premier, caretaker · re-elected in Vancouver-Point Grey</span>`;
  else if(d.type==="designate") h=`<b>Lorne Doerkson</b><span>Premier-designate · Conservative leader · Cariboo-Chilcotin</span>`;
  else if(d.type==="sec") h=`<b>Shannon Salter</b><span>Deputy Minister to the Premier, Cabinet Secretary and Head of the Public Service</span>`;
  else if(d.type==="lg") h=`<b>${BC_LG.name}</b><span>${BC_LG.title}</span>`;
  else h=`<b>Statutory officers</b><span>${BC_OFFICERS.map(o=>o.role).join(" · ")}</span>`;
  t.innerHTML=h; t.hidden=false; const r=document.getElementById("bm-stage").getBoundingClientRect(); let lx=e.clientX-r.left+16; if(lx>r.width-280) lx-=300; t.style.left=lx+"px"; t.style.top=(e.clientY-r.top+16)+"px";
}
function bmPanel(key){
  const D=BM.D, G=D.G, C=D.C, el=document.getElementById("bm-panel"); let h="";
  const seatLine=m=>m?`<div class="where"><div class="kicker">Seat in the Legislature</div><div><b>${m.side==="gov"?"Incoming government side":"Opposition side"}</b></div><div class="muted" style="font-size:12px">Highlighted on the map. Grouped by party until the Legislature publishes a seating plan.</div></div>`:"";
  const close=m=>m&&m.place==="Ladysmith-Oceanside"?`<div class="note warnnote">Too close to call: about a 13-vote margin in the initial count. It will be recounted during the final count, November 6 to 10. One results source already shows the Conservative candidate ahead.</div>`:"";
  const head=(m,kicker,grp,place)=>{ const gr=grp||m.group; return `<div class="pband" style="--pc:${G[gr].color}"></div><div class="who"><div class="ava" style="--pc:${G[gr].color}" aria-hidden="true">${initials(m.name)}</div><div class="who-t"><div class="kicker">${kicker}</div><h2>${m.name}</h2><div class="party"><i style="background:${G[gr].color}"></i><span>${G[gr].name}${place?" · "+place:""}</span></div></div></div>`; };
  const dmList=o=>`<ul class="list">${o.heads.map(x=>`<li class="item"><span class="nm">${x.name}</span><span class="rl">${x.role}</span>${srcA(BC_S[x.src])}</li>`).join("")}</ul>`;
  if(!key){
    const c=chCounts(C);
    h=`<div class="kicker">Start here</div><h2>How power flows in British Columbia</h2>
      <ol class="steps"><li><b>Voters</b> in each of the 93 ridings elected one MLA on October 24, 2026.</li><li>The Lieutenant Governor asks the leader who can hold the Legislature's confidence to form government. In the initial count the <b>Conservatives lead in ${c.con} of 93</b> ridings, past the 47 needed.</li><li>Until results are certified on November 18, <b>David Eby</b> stays on as caretaker Premier with his NDP Cabinet. <b>Lorne Doerkson</b> is Premier-designate.</li><li>Each minister directs one or more <b>ministries</b>, which deputy ministers run day to day. Those public servants stay on through the change of government.</li></ol>
      <h3>Key roles</h3><ul class="list"><li class="item"><button class="linkbtn" data-k="premier">David Eby</button><span class="rl">Premier (caretaker)</span></li><li class="item"><button class="linkbtn" data-k="designate">Lorne Doerkson</button><span class="rl">Premier-designate</span></li><li class="item"><button class="linkbtn" data-k="lg">${BC_LG.name}</button><span class="rl">Lieutenant Governor</span></li></ul>
      <div class="note">Hover or tap anything. Pick a minister or ministry and a line runs back to the minister's seat, if they were re-elected.</div>${srcA(BC_RES_SRC)}${srcA(BC_S.cab)}`;
  } else if(key==="premier"){
    h=head(D.eby,"Premier of British Columbia · caretaker","ndp","Vancouver-Point Grey")+`<div class="lede">Stays in office with his Cabinet until a new Premier is sworn in. He resigned as NDP leader on election night and was re-elected as an MLA.</div>
      <div class="statgrid" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="stat"><b>${D.mins.length}</b><span>Ministers</span></div><div class="stat"><b>${D.ministries.length+1}</b><span>Ministries and offices</span></div></div>
      <h3>His own office</h3><ul class="list">${D.premierOffices.map(o=>`<li class="item"><button class="linkbtn" data-k="o_${o.id}">${o.name}</button><span class="rl">${o.heads[0].name}</span></li>`).join("")}</ul>${seatLine(D.eby)}${srcA(BC_TRANSITION.srcs[0])}`;
  } else if(key==="designate"){
    h=head(D.doerk,"Premier-designate","con","Cariboo-Chilcotin")+`<div class="lede">Leader of the Conservative Party of British Columbia, which leads in ${chCounts(C).con} of 93 ridings in the initial count. He can be sworn in as Premier, with his own Cabinet, once results are certified on November 18.</div>
      ${seatLine(D.doerk)}${srcA(BC_TRANSITION.srcs[1])}${srcA(BC_RES_SRC)}`;
  } else if(key==="lg"){
    h=`<div class="kicker">The Crown · non-partisan</div><h2>${BC_LG.name}</h2><div class="lede">${BC_LG.title} since ${BC_LG.since}, representing the King in British Columbia.</div>
      <h3>What the role does</h3><ul class="list"><li class="item"><span class="nm">Asks a leader to form government</span><span class="rl">The leader who can hold the Legislature's confidence becomes Premier. That step comes after the results are certified.</span></li>
      <li class="item"><span class="nm">Appoints Cabinet</span><span class="rl">Ministers are appointed on the Premier's advice.</span></li>
      <li class="item"><span class="nm">Gives Royal Assent</span><span class="rl">A bill passed by the Legislature becomes law once it receives Royal Assent.</span></li></ul>
      <div class="note">By convention, the Lieutenant Governor acts on the advice of the Premier and Cabinet, so there is no party colour here.</div>${srcA(BC_LG.src)}`;
  } else if(key==="officers"){
    h=`<div class="kicker">Independent of government</div><h2>Statutory officers of the Legislature</h2><div class="lede">Appointed by and reporting to the whole Legislature, not to the Premier or Cabinet.</div>
      <ul class="list">${BC_OFFICERS.map(o=>`<li class="item"><span class="nm">${o.name||`<span class="muted">Name not confirmed here</span>`}</span><span class="rl"><b>${o.role}</b> · ${o.what}</span>${srcA(o.src)}</li>`).join("")}</ul>${srcA(BC_OFF_SRC)}`;
  } else if(key==="sec"){
    h=`<div class="kicker">Public service</div><h2>Shannon Salter</h2><div class="lede">Deputy Minister to the Premier, Cabinet Secretary and Head of the BC Public Service. Leads the deputy ministers who run each ministry, and supports the transfer of power to the new government.</div>
      <div class="note">Public servants are non-partisan, so there is no party colour here.</div>${srcA(BC_S.dm)}`;
  } else if(key.startsWith("o_")){
    const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key);
    h=`<div class="kicker">Ministry · ${o.abbr}</div><h2>${o.name}</h2><h3>Minister${o.ms.length>1?"s":""} (caretaker)</h3>
      ${o.ms.length?`<ul class="list">${o.ms.map(m=>`<li class="item"><button class="linkbtn" data-k="${m.id}">${m.name}</button><span class="rl">${m.title} · ${m.mpp?"re-elected in "+m.mpp.place:"not among the members-elect"}</span></li>`).join("")}</ul>`:`<ul class="list"><li class="item"><button class="linkbtn" data-k="premier">David Eby</button><span class="rl">Premier (caretaker)</span></li></ul>`}
      <h3>Deputy minister${o.heads.length>1?"s":""} (public service)</h3>${dmList(o)}`;
  } else if(/^m\d+$/.test(key)){
    const m=D.mpps[+key.slice(1)], mn=D.mins.find(x=>x.mpp===m);
    if(mn) return bmPanel(mn.id); if(m===D.eby) return bmPanel("premier"); if(m===D.doerk) return bmPanel("designate");
    const mos=BC_MOS.find(x=>x[0]===m.name);
    h=head(m,"MLA-elect",null,m.place)+`<div class="lede">${mos?`Minister of State for ${mos[1]} in the caretaker government. `:""}${m.group==="con"?"Elected for the incoming governing party.":"Elected for an opposition party."}</div>${close(m)}
      <div class="role"><div class="kicker">About this role</div><p>Members of the Legislative Assembly represent one riding each in Victoria, where they debate and vote on BC's laws and budget and question the provincial government.</p></div>${seatLine(m)}${srcA(BC_RES_SRC)}`;
  } else {
    const mn=D.mins.find(x=>x.id===key);
    h=head(mn,"Cabinet minister · caretaker","ndp",mn.mpp?mn.mpp.place:null)+`<div class="lede">${mn.title}</div>${mn.note?`<div class="note">${mn.note}</div>`:""}
      <h3>Responsible for</h3>${mn.links.length?`<ul class="list">${mn.links.map(l=>{ const o=[...D.ministries,...D.premierOffices].find(x=>x.id===l); return o?`<li class="item"><button class="linkbtn" data-k="o_${o.id}">${o.name}</button><span class="rl">${o.heads.map(x=>x.name+" · "+x.role.split(" (")[0]).join("<br>")}</span></li>`:""; }).join("")}</ul>`:`<p class="muted">No ministry of her own.</p>`}
      ${mn.mpp?seatLine(mn.mpp)+close(mn.mpp):`<div class="note">Not among the members-elect in the initial count, so this minister has no seat in the new Legislature. Ministers stay in office until a new Cabinet is sworn in.</div>`}${srcA(BC_S.cab)}`;
  }
  if(key) h+=`<button class="linkbtn" data-k="" style="font-size:13px">← How power flows</button>`;
  el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); el.innerHTML=h;
  el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>bmSelect(b.dataset.k||null,!!b.dataset.k));
}
function bmPoint(key){ const D=BM.D;
  if(key==="premier") return D.premier; if(key==="designate") return D.desig; if(key==="sec") return D.sec; if(key==="lg") return D.lgPt; if(key==="officers") return D.offPt;
  if(key.startsWith("o_")){ const o=[...D.ministries,...D.premierOffices].find(x=>"o_"+x.id===key); return [o.x,o.y]; }
  if(/^m\d+$/.test(key)){ const m=D.mpps[+key.slice(1)]; return [m.px,m.py]; }
  const mn=D.mins.find(x=>x.id===key); return mn?[mn.x,mn.y]:[0,0]; }
function bmSelect(key,zoom){
  BM.sel=key||null; bmHighlight(BM.sel); bmPanel(BM.sel);
  const st=chState.bcleg, m=bmMppOf(BM.sel); st.sel=m?m.i:null; st.panel=null; st.focus=null;
  chSummary(CH.bcleg); chList(CH.bcleg);
  const svg=d3.select("#bm-svg");
  if(zoom&&key&&/^m\d+$/.test(key)){ const [x,y]=bmPoint(key), k=2.6, cx=BM_VB[0]+BM_VB[2]/2, cy=BM_VB[1]+BM_VB[3]/2;
    svg.transition().duration(BM_RM?0:750).ease(d3.easeCubicInOut).call(BM.zoom.transform,d3.zoomIdentity.translate(cx-x*k,cy-y*k).scale(k)); }
  else svg.transition().duration(BM_RM?0:600).call(BM.zoom.transform,d3.zoomIdentity);
  if(key) document.getElementById("bm-panel").scrollIntoView({behavior:BM_RM?"auto":"smooth",block:"nearest"});
}
function bmFocus(fk){ if(!fk||fk.startsWith("ch:")) return; if(fk==="hub") return bmSelect("premier",true); if(fk==="head") return bmSelect("sec",true); bmSelect(fk,true); }
function bmSearchIndex(){ const D=BM.D, idx=[];
  D.mpps.forEach(m=>{ const mn=D.mins.find(x=>x.mpp===m); idx.push({k:bmKeyForMpp(m.i),label:m.name,sub:`${D.G[m.group].short} · ${m.place}${mn?" · "+mn.title:""}`}); });
  D.mins.filter(m=>!m.mpp).forEach(m=>idx.push({k:m.id,label:m.name,sub:m.title+" · not re-elected"}));
  [...D.ministries,...D.premierOffices].forEach(o=>{ idx.push({k:"o_"+o.id,label:o.name,sub:o.abbr}); o.heads.forEach(x=>idx.push({k:"o_"+o.id,label:x.name,sub:x.role+" · "+o.abbr})); });
  idx.push({k:"sec",label:"Shannon Salter",sub:"Head of the Public Service"},{k:"lg",label:BC_LG.name,sub:BC_LG.title});
  BC_OFFICERS.forEach(o=>idx.push({k:"officers",label:o.name||o.role,sub:o.role}));
  return idx; }
function renderBcMap(){
  if(BM.built) return;
  const slot=document.getElementById("bm-slot"); if(!slot) return;
  slot.innerHTML=`<div class="pmbar bmbar"><label class="search" for="bm-q"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg>
      <input id="bm-q" type="search" placeholder="Search an MLA, riding, minister or ministry" autocomplete="off" aria-label="Search British Columbia"><ul class="results" id="bm-res" hidden></ul></label>
      <div class="zbtn"><button id="bm-zin" aria-label="Zoom in" title="Zoom in">+</button><button id="bm-zout" aria-label="Zoom out" title="Zoom out">−</button><button id="bm-zr" aria-label="Reset view" title="Reset view" class="zreset"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7"/><path d="M3 2.5v3h3"/></svg><span>Reset</span></button></div></div>
    <div class="pmgrid"><div class="pmstage" id="bm-stage"><svg id="bm-svg" viewBox="${BM_VB.join(" ")}" role="img" aria-label="British Columbia power map: the Legislature, Premier, Cabinet and ministries"></svg><div class="tip" id="bm-tip" hidden></div></div>
      <aside class="hpanel pmpanel" id="bm-panel" aria-live="polite"></aside></div>`;
  bmBuild();
  const svg=d3.select("#bm-svg");
  document.getElementById("bm-zin").onclick=()=>svg.transition().duration(300).call(BM.zoom.scaleBy,1.4);
  document.getElementById("bm-zout").onclick=()=>svg.transition().duration(300).call(BM.zoom.scaleBy,1/1.4);
  document.getElementById("bm-zr").onclick=()=>bmSelect(null,false);
  const idx=bmSearchIndex(), q=document.getElementById("bm-q"), res=document.getElementById("bm-res");
  q.addEventListener("input",()=>{ const t=q.value.trim().toLowerCase(); if(!t){res.hidden=true;return}
    const hits=idx.filter(i=>(i.label+" "+i.sub).toLowerCase().includes(t)).slice(0,12);
    res.innerHTML=hits.length?hits.map((h,i)=>`<li><button data-i="${i}">${h.label}<small>${h.sub}</small></button></li>`).join(""):`<li style="padding:7px 10px;color:var(--muted)">No match</li>`; res.hidden=false;
    res.querySelectorAll("button").forEach(b=>b.onclick=()=>{ bmSelect(hits[+b.dataset.i].k,true); res.hidden=true; q.value=""; }); });
  q.addEventListener("keydown",e=>{ if(e.key==="Escape") res.hidden=true; if(e.key==="Enter"){ e.preventDefault(); const b=res.querySelector("button"); if(b) b.click(); } });
  document.addEventListener("click",e=>{ if(!e.target.closest(".bmbar .search")) res.hidden=true; });
  BM.built=true;
}
