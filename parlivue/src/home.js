/* ================= HOME (landing) ================= */
let homeBuilt=false;
const homeEl=document.getElementById("landing");
function miniDots(groups,cols){ // groups: [[color,count],...] → small dot grid
  const out=[]; groups.forEach(([c,n])=>{ for(let i=0;i<n;i++) out.push(c); });
  const r=4.2, st=11, rows=Math.ceil(out.length/cols);
  return `<svg viewBox="0 0 ${cols*st} ${rows*st}" aria-hidden="true">${out.map((c,i)=>`<circle cx="${(i%cols)*st+st/2}" cy="${Math.floor(i/cols)*st+st/2}" r="${r}" fill="${c}"/>`).join("")}</svg>`;
}
const HOME_MAPS=[["commons","Federal"],["ab","Alberta"],["bc","British Columbia"],["mb","Manitoba"],["nb","New Brunswick"],["nl","Newfoundland and Labrador"],["nt","Northwest Territories"],["ns","Nova Scotia"],["nu","Nunavut"],["ontario","Ontario"],["pe","Prince Edward Island"],["sk","Saskatchewan"],["yk","Yukon"]];
function renderHome(){
  if(homeBuilt) return;
  const hc=counts(), sc=chCounts(CH.senate), oc=chCounts(CH.ontario);
  const hocG=HOC_ORDER.map(p=>[p==="vac"?"#3a3a3a":FPARTY[p].color,hc[p]||0]);
  const senG=CH.senate.order.map(g=>[g==="vac"?"#3a3a3a":CH.senate.groups[g].color,sc[g]||0]);
  const onG=CH.ontario.order.map(g=>[CH.ontario.groups[g].color,oc[g]||0]);
  const T=(cls,inner,tab)=>`<div class="ht ${cls}"${tab?` data-go="${tab}" role="link" tabindex="-1"`:""}>${inner}</div>`;
  const tiles={
    hoc:T("dots",`<b>343</b><span>MPs · House of Commons</span>${miniDots(hocG,19)}`,"commons"),
    sen:T("dots",`<b>105</b><span>Seats · Senate</span>${miniDots(senG,11)}`,"senate"),
    on:T("dots",`<b>124</b><span>MPPs · Ontario</span>${miniDots(onG,12)}`,"ontario"),
    cab:T("accent",`<b>${ministers.length-1}</b><span>Federal ministers</span>`,"commons"),
    dep:T("light",`<b>${depts.length}</b><span>Federal departments and agencies</span>`,"commons"),
    oncab:T("dark",`<b>${ON_MIN.length}</b><span>Ontario ministers</span>`,"ontario"),
    onmin:T("light",`<b>${ON_OUT.filter(o=>o.id!=="cab"&&o.id!=="iga").length}</b><span>Ontario ministries</span>`,"ontario"),
    who:T("accent",`<em>Who sits where</em>`,"commons"),
    run:T("dark",`<em>Who runs what</em>`,"fedscore"),
    vic:T("dark",`<b>9</b><span>Victoria council seats</span>`,"victoria"),
    bc:T("light",`<b>BC</b><span>Legislature</span>`,"bcleg"),
    mis:T("light",`<b>12</b><span>Mississauga council seats</span>`,"mississauga"),
    sos:T("dark",`<b>${secretaries.length}</b><span>Secretaries of State</span>`,"commons"),
    q:T("accent",`<em>Who answers to whom</em>`,"commons")
  };
  const col=(keys,dir,dur)=>`<div class="hcol ${dir}" style="--dur:${dur}s"><div class="hcol-in">${keys.map(k=>tiles[k]).join("")}${keys.map(k=>tiles[k]).join("")}</div></div>`;
  homeEl.innerHTML=`
   <section class="hero">
    <div class="hero-l">
     <h1 class="hero-h"><span class="hero-big">Canada</span>Parliament and Government</h1>
     <p class="hero-p">Explore how sovereignty and representation shape Canadian democracy. See who holds the seats, how laws are debated and how governments are held to account for their priorities and spending.</p>
     <div class="hero-cta">
      <button class="cta solid" data-go="commons">House of Commons <span class="ci">→</span></button>
      <button class="cta solid" data-go="senate">Senate <span class="ci">→</span></button>
      <button class="cta solid" data-go="ontario">Provinces <span class="ci">→</span></button>
     </div>
    </div>
    <div class="hero-r" aria-hidden="true">${col(["hoc","who","dep","oncab","vic"],"up",38)}${col(["cab","on","mis","run","sos"],"down",46)}${col(["sen","q","bc","onmin"],"up",42)}</div>
   </section>
   <section class="hcards">
    <div class="hstack">
    <article class="hcard"><div class="kicker">Federal · Parliament of Canada</div><h2>House of Commons of Canada</h2><p>All 343 seats as the chamber sits, the Prime Minister's Cabinet, and the departments each minister is responsible for.</p>
      <div class="hlinks"><button data-go="commons">House of Commons</button><button data-go="senate">Senate of Canada</button></div></article>
    <article class="hcard"><div class="kicker">What's new</div><h2>Updates</h2><p>What changed on ParliVue, and the budgets, public accounts and elections that affect the scorecards.</p>
      <div class="hlinks"><button data-go="news">Site updates and key events</button></div></article>
    </div>
    <article class="hcard"><div class="kicker">Provinces</div><h2>Provincial legislatures</h2><p>Each province's elected members, its Premier and Cabinet, and the ministries they run.</p>
      <div class="hlinks"><button data-go="ableg">Alberta</button><button data-go="ontario">Ontario</button><button data-go="bcleg">British Columbia</button><button data-go="skleg">Saskatchewan</button><button data-go="mbleg">Manitoba</button><button data-go="nbleg">New Brunswick</button><button data-go="nlleg">Newfoundland and Labrador</button><button data-go="nsleg">Nova Scotia</button><button data-go="ntleg">Northwest Territories</button><button data-go="nuleg">Nunavut</button><button data-go="peleg">Prince Edward Island</button><button data-go="ykleg">Yukon</button></div>
      <div class="kicker" style="margin-top:14px">Cities</div>
      <div class="hlinks"><button data-go="victoria">City of Victoria</button><button data-go="mississauga">City of Mississauga</button></div></article>
    <article class="hcard hmaps"><div class="kicker">Where the ridings are</div><h2>Riding maps</h2><p>Official maps of the electoral districts each member represents. Each opens on the elections agency's site.</p>
      <div class="hlinks">${HOME_MAPS.map(([k,l])=>`<a href="${RIDING_MAPS[k].src[1]}" target="_blank" rel="noopener" title="${RIDING_MAPS[k].title} · ${RIDING_MAPS[k].sub}">${l} ↗</a>`).join("")}</div></article>
    <article class="hcard"><div class="kicker">Goals and financials</div><h2>Scorecards</h2><p>What each government planned, budgeted and reported, compared year by year.</p>
      <div class="hlinks"><button data-go="vicscore">City of Victoria</button><button data-go="misscore">City of Mississauga</button><button data-go="fedscore">Federal departments</button><button data-go="fedbudget">Federal Budget 2026</button><button data-go="bcscore">British Columbia ministries</button><button data-go="onscore">Ontario ministries</button></div></article>
   </section>`;
  homeEl.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.go)));
  homeBuilt=true;
}
