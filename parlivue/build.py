import sys
import os
d=os.path.join(os.path.dirname(os.path.abspath(__file__)),"src")+"/"
r=lambda f: open(d+f,encoding="utf-8").read()
s=r("shell2.html")
pm = sys.argv[1:]!=["nopm"]
s=s.replace("/*__FED__*/",r("fed_data.js")).replace("/*__BCVIC__*/",r("bcvic_data.js")+"\n"+r("vic_scorecard.js")).replace("/*__NEWS__*/",r("news.js")+"\n"+r("mis_data.js")+"\n"+r("flags.js"))
s=s.replace("/*__HOC__*/",r("hoc_data.js")+"\n"+r("hoc_plan.js")+"\n"+r("commons.js")+"\n"+r("fedmap.js")+"\n"+r("home.js"))
s=s.replace("/*__CH__*/",r("chambers_data.js")+"\n"+r("on_wheel.js")+"\n"+r("on_extra.js")+"\n"+r("on_desks.js")+"\n"+r("chambers.js")+"\n"+r("bc_elect.js")+"\n"+r("bc_leg.js")+"\n"+r("bcmap.js")+"\n"+r("sk_desks.js")+"\n"+r("sk_leg.js")+"\n"+r("skmap.js")+"\n"+r("provmap.js")+"\n"+r("mb_leg.js")+"\n"+r("nb_leg.js")+"\n"+r("pe_leg.js")+"\n"+r("ab_leg.js")+"\n"+r("yk_leg.js")+"\n"+r("nl_leg.js")+"\n"+r("ns_leg.js")+"\n"+r("nt_leg.js")+"\n"+r("nu_leg.js")+"\n"+r("vic_council.js")+("\n"+r("powermap.js") if pm else ""))
s=s.replace("/*__ENGINE__*/",r("engine.js"))
open(os.path.join(os.path.dirname(d[:-1]),"index.html"),"w",encoding="utf-8").write(s)
print(len(s))
